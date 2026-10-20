const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..'),out=path.join(root,'validation');
fs.mkdirSync(out,{recursive:true});
const base='http://127.0.0.1:8765/science-practice-lab/';
let checks=0;
async function noOverflow(page,label){const dim=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(dim.scroll<=dim.width+2,label+' horizontal overflow: '+JSON.stringify(dim));checks++;}
async function question(page){return page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});}
async function solve(page,q){
 if(['single','multi','hotspot'].includes(q.type)){for(const i of q.type==='multi'?q.answer:[q.answer])await page.locator('[data-choice="'+i+'"]').click();}
 else if(q.type==='numeric')await page.locator('#number-input').fill(String(q.answer));
 else if(q.type==='dropdown'){for(let i=0;i<q.answer.length;i++)await page.locator('[data-blank="'+i+'"]').selectOption(q.answer[i]);}
 else if(q.type==='order'){for(let to=0;to<q.answer.length;to++){let order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));while(order.indexOf(q.answer[to])>to){await page.locator('[data-move="'+q.answer[to]+'"][data-direction="-1"]').click();order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));}}}
 else {for(const item of q.data.items){await page.locator('[data-piece="'+item.id+'"]').click();const zone=page.locator('[data-zone="'+q.answer[item.id]+'"]');await zone.focus();await page.keyboard.press('Enter');}}
}
async function round(page,n,mode='learn',capture=false){
 const seen=new Set();
 for(let i=0;i<n;i++){const q=await question(page);seen.add(q.type);await noOverflow(page,q.id);
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
 if(index===0){await page.locator('#round-size').selectOption('all');await page.locator('[data-start="all"]').click();assert.equal((await page.evaluate(()=>ScienceLab.getState().run.queue)).length,54);await round(page,54,'learn',true);await page.screenshot({path:path.join(out,'results-desktop.png'),fullPage:true});}
 else {await page.locator('.goal-card [data-start="particles"]').click();assert.equal((await round(page,9)).size,9);}
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
 await context.close();await browser.close();
 fs.writeFileSync(path.join(out,'browser-report.json'),JSON.stringify({passed:true,viewports,questionChecks:checks,errors},null,2));console.log('TOTAL '+checks+' checks');
})().catch(e=>{console.error(e);process.exit(1);});