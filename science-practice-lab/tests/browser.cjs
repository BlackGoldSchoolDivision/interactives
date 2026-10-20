const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..'),out=path.join(root,'validation');
fs.mkdirSync(out,{recursive:true});
const audit=path.join(out,'question-review');fs.mkdirSync(audit,{recursive:true});
const base='http://127.0.0.1:8765/science-practice-lab/';
let checks=0;
async function noOverflow(page,label){const dim=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(dim.scroll<=dim.width+2,label+' horizontal overflow: '+JSON.stringify(dim));checks++;}
async function question(page){return page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});}

async function captureQuestion(page,file){
 const style=await page.addStyleTag({content:'.question-actions{position:static!important}.masthead{position:static!important}'});
 try{await page.evaluate(()=>window.scrollTo(0,0));await page.locator('.question-card').screenshot({path:file,animations:'disabled'});}
 finally{await style.evaluate(el=>el.remove());}
}


async function checkQuestionImages(page,id){
 const loaded=await page.locator('.question-card img').evaluateAll(imgs=>Promise.all(imgs.map(async img=>{await img.decode();return img.naturalWidth>0;})));
 assert(loaded.every(Boolean),'Question image failed '+id);if(loaded.length)checks++;
}

async function solve(page,q){
 if(['single','multi','hotspot'].includes(q.type)){for(const i of q.type==='multi'?q.answer:[q.answer])await page.locator('[data-choice="'+i+'"]').click();}
 else if(q.type==='numeric')await page.locator('#number-input').fill(String(q.answer));
 else if(q.type==='dropdown'){for(let i=0;i<q.answer.length;i++)await page.locator('[data-blank="'+i+'"]').selectOption(q.answer[i]);}
 else if(q.type==='order'){for(let to=0;to<q.answer.length;to++){let order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));while(order.indexOf(q.answer[to])>to){await page.locator('[data-move="'+q.answer[to]+'"][data-direction="-1"]').click();order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));}}}
 else {for(const item of q.data.items){await page.locator('[data-piece="'+item.id+'"]').click();const zone=page.locator('[data-zone="'+q.answer[item.id]+'"]');await zone.focus();await page.keyboard.press('Enter');}}
}
async function round(page,n,mode='learn',capture=false){
 const seen=new Set();
 for(let i=0;i<n;i++){const q=await question(page);seen.add(q.type);await noOverflow(page,q.id);await checkQuestionImages(page,q.id);
 if(capture){
  await captureQuestion(page,path.join(audit,q.id+'.png'));
  if(q.visual||q.data.diagram||q.data.optionVisuals||q.data.table||q.data.scenePair){
   const snapshot=await page.evaluate(()=>ScienceLab.getState().run);
   await page.setViewportSize({width:390,height:667});await noOverflow(page,'visual phone '+q.id);
   assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run),snapshot,'Visual resize changed state '+q.id);
   await captureQuestion(page,path.join(audit,q.id+'-phone.png'));
   await page.setViewportSize({width:1366,height:650});
  }
 }

 if(capture&&q.type==='sort'&&!fs.existsSync(path.join(out,'question-sort-desktop.png')))await page.screenshot({path:path.join(out,'question-sort-desktop.png'),fullPage:true});
 if(capture&&q.data.optionVisuals&&q.group==='temperature')await page.screenshot({path:path.join(out,'question-image-thermometers.png'),fullPage:true});
 if(capture&&q.type==='sort'){const item=q.data.items[0];await page.locator('[data-piece="'+item.id+'"]').dragTo(page.locator('[data-zone="'+q.answer[item.id]+'"]'));assert.equal(await page.evaluate(id=>{const s=ScienceLab.getState();return s.run.entries[s.run.queue[s.run.pos]].response[id];},item.id),q.answer[item.id],'Native dragging failed');checks++;}
 await solve(page,q);assert(!(await page.locator('#check-answer').isDisabled()),'Check remains disabled '+q.id);
 if(capture&&q.type==='sort'){const before=await page.evaluate(()=>ScienceLab.getState().run.entries[ScienceLab.getState().run.queue[ScienceLab.getState().run.pos]].response);await page.setViewportSize({width:390,height:667});assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run.entries[ScienceLab.getState().run.queue[ScienceLab.getState().run.pos]].response),before,'Resize lost response');await noOverflow(page,'resize '+q.id);if(!fs.existsSync(path.join(out,'question-sort-phone.png')))await page.screenshot({path:path.join(out,'question-sort-phone.png'),fullPage:true});await page.setViewportSize({width:1366,height:650});}
 await page.locator('#check-answer').click();
 if(mode==='learn'){assert.match(await page.locator('#feedback-area').innerText(),/That’s right/,'Correct answer not accepted '+q.id);await page.locator('#check-answer').click();}
 else if(i<n-1)assert.equal(await page.locator('#feedback-area').innerText(),'','Test mode leaked feedback');
 checks++;
 }
 assert(await page.locator('#results').isVisible(),'Missing completed state');await noOverflow(page,'results');return seen;
}
(async()=>{
 const browser=await chromium.launch({headless:true});const errors=[];
 const viewports=[[1366,650],[1024,540],[768,900],[390,667],[320,568],[640,360]];
 for(let index=0;index<viewports.length;index++){
 const [width,height]=viewports[index];const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 assert((await page.goto(base,{waitUntil:'networkidle'})).ok());await page.waitForSelector('.goal-card [data-start="particles"]');
 await noOverflow(page,'home '+width+'x'+height);assert.equal(await page.locator('.goal-card').count(),3);
 const loaded=await page.locator('.hero-image').evaluate(img=>img.complete&&img.naturalWidth>0);assert(loaded,'Missing photographic banner');
 if(index===0)await page.screenshot({path:path.join(out,'home-desktop.png'),fullPage:true});
 if(width===390)await page.screenshot({path:path.join(out,'home-phone.png'),fullPage:true});
 // The start-menu route must remain visible after scrolling, and preserve an unanswered choice.
 await page.locator('.goal-card [data-start="particles"]').click();
 await page.locator('[data-choice="0"]').click();
 const saved=await page.evaluate(()=>ScienceLab.getState().run);
 await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
 const menuRect=await page.locator('#start-menu').boundingBox();
 assert(menuRect&&menuRect.y>=0&&menuRect.y+menuRect.height<=height,'Start menu not visible while scrolling at '+width+'x'+height);
 await page.locator('#start-menu').click();
 assert(await page.locator('#home').isVisible(),'Start menu did not show the menu');
 assert(await page.locator('#resume').isVisible(),'Saved round missing');
 await page.locator('#resume').click();
 assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run),saved,'Menu navigation changed the round or answer');
 await page.locator('#round-home').click();
 assert(await page.locator('#home').isVisible(),'Question footer did not return to menu');
 checks+=4;
 if(index===0){await page.locator('#round-size').selectOption('all');await page.locator('[data-start="all"]').click();await page.locator('#leave-confirm').click();assert.equal((await page.evaluate(()=>ScienceLab.getState().run.queue)).length,54);await round(page,54,'learn',true);await page.screenshot({path:path.join(out,'results-desktop.png'),fullPage:true});}
 else {await page.locator('#resume').click();assert.equal((await round(page,9)).size,9);}
 await page.locator('#start-menu').click();assert(await page.locator('#home').isVisible(),'Results menu route failed');assert(!(await page.locator('#resume').count()),'Completed round incorrectly resumable');checks++;
 assert.equal(errors.length,0,errors.join('\n'));console.log('PASS full responsive play at '+width+'x'+height);await context.close();
 }
 // Wrong answer, explanation, retry, reload/resume, keyboard placement, review and hidden test feedback.
 const context=await browser.newContext({viewport:{width:1024,height:540}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});await page.locator('.goal-card [data-start="particles"]').click();let q=await question(page);
 const wrong=(q.answer+1)%q.data.options.length;await page.locator('[data-choice="'+wrong+'"]').click();await page.locator('#check-answer').click();assert.match(await page.locator('#feedback-area').innerText(),/Try again/);
 await solve(page,q);await page.locator('#check-answer').click();assert.match(await page.locator('#feedback-area').innerText(),/That’s right/);
 await page.reload({waitUntil:'networkidle'});assert(await page.locator('#resume').isVisible());await page.locator('#resume').click();assert.equal((await question(page)).id,q.id);assert.match(await page.locator('#feedback-area').innerText(),/That’s right/);
 // Reflow under increased CSS zoom without losing a saved answer.
 await page.evaluate(()=>document.body.style.zoom='125%');await noOverflow(page,'125 percent zoom');await page.evaluate(()=>document.body.style.zoom='');
 await page.locator('#round-home').click();await page.locator('[data-mode="test"]').click();await page.locator('.goal-card [data-start="temperature"]').click();await page.locator('#leave-confirm').click();
 await round(page,9,'test');assert.equal(await page.locator('.result-review').count(),9);
 await page.locator('#teacher-open').click();assert(await page.locator('#teacher-dialog').isVisible());assert.equal(await page.locator('.source-outcome').count(),29);await page.keyboard.press('Escape');
 assert.equal(errors.length,0,errors.join('\n'));console.log('PASS wrong answers, retry, resume, test feedback, curriculum mapping, zoom and dialogs');

 await context.close();
 // A saved answer to an older question must not appear correct under a revised task.
 const migration=await browser.newContext({viewport:{width:390,height:667}}),mp=await migration.newPage();
 await mp.goto(base,{waitUntil:'networkidle'});
 await mp.addInitScript(()=>{
  const e=response=>({response,attempts:1,submitted:true,checked:true,correct:true,firstCorrect:true,revealed:false,hinted:false,flagged:false,visited:true});
  localStorage.setItem('science-practice-lab-matter-v1',JSON.stringify({version:'matter-1.0',settings:{mode:'learn',count:'9',format:'all'},progress:{'particles-17':{seen:true,correct:true},'temperature-18':{seen:true,correct:true}},run:{queue:['particles-17','temperature-18'],pos:1,group:'all',mode:'learn',finished:false,entries:{'particles-17':e('236'),'temperature-18':e('14')}}}));
 });
 await mp.reload({waitUntil:'networkidle'});assert(await mp.locator('#content-note').isVisible());
 await mp.locator('#resume').click();assert.equal((await question(mp)).id,'temperature-18');assert.equal(await mp.locator('#number-input').inputValue(),'');
 assert.equal((await mp.evaluate(()=>ScienceLab.getState())).progress['particles-17'].correct,true);assert.equal(await mp.locator('#feedback-area').innerText(),'');
 await mp.locator('#number-input').fill('-4');await mp.locator('#check-answer').click();assert.match(await mp.locator('#feedback-area').innerText(),/That’s right/);checks+=5;
 await migration.close();await browser.close();
 fs.writeFileSync(path.join(out,'browser-report.json'),JSON.stringify({passed:true,viewports,questionChecks:checks,errors},null,2));console.log('TOTAL '+checks+' checks');
})().catch(e=>{console.error(e);process.exit(1);});