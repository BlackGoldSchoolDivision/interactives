const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..'),out=path.join(root,'validation','energy');
fs.mkdirSync(out,{recursive:true});
const audit=path.join(out,'question-review');fs.mkdirSync(audit,{recursive:true});
const base='http://127.0.0.1:8765/science-practice-lab/';
let checks=0;
async function noOverflow(page,label){const dim=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert(dim.scroll<=dim.width+2,label+' horizontal overflow: '+JSON.stringify(dim));checks++;}
async function question(page){return page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});}

async function captureQuestion(page,file){
 const style=await page.addStyleTag({content:'.question-actions{position:static!important}.masthead{position:static!important}'});
 try{await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:file,animations:'disabled',fullPage:true});}
 finally{await style.evaluate(el=>el.remove());}
}


async function checkQuestionImages(page,id){
 const loaded=await page.locator('.question-card img').evaluateAll(imgs=>Promise.all(imgs.map(async img=>{await img.decode();return img.naturalWidth>0;})));
 assert(loaded.every(Boolean),'Question image failed '+id);
 const crops=await page.locator('.question-card .scene-art').evaluateAll(els=>els.map(el=>{const a=el.getBoundingClientRect(),b=el.querySelector('img').getBoundingClientRect();return a.width>30&&a.height>30&&b.left<=a.left+2&&b.top<=a.top+2&&b.right>=a.right-2&&b.bottom>=a.bottom-2;}));
 assert(crops.every(Boolean),'Image crop does not cover its panel '+id);
 if(loaded.length)checks++;
}

async function solve(page,q){
 if(['single','multi','hotspot'].includes(q.type)){for(const i of q.type==='multi'?q.answer:[q.answer])await page.locator('[data-choice="'+i+'"]').click();}
 else if(q.type==='numeric')await page.locator('#number-input').fill(String(q.answer));
 else if(q.type==='dropdown'){for(let i=0;i<q.answer.length;i++)await page.locator('[data-blank="'+i+'"]').selectOption(q.answer[i]);}
 else if(q.type==='order'){for(let to=0;to<q.answer.length;to++){let order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));while(order.indexOf(q.answer[to])>to){await page.locator('[data-move="'+q.answer[to]+'"][data-direction="-1"]').click();order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));}}}
 else {for(const item of q.data.items){await page.locator('[data-piece="'+item.id+'"]').click();const zone=page.locator('[data-zone="'+q.answer[item.id]+'"]');await zone.focus();await page.keyboard.press('Enter');}}
}

async function nativeDrop(page,item,zone){
 await page.evaluate(()=>{
  window.__scienceDragTrace=[];window.__scienceDragListener=e=>{window.__scienceDragTrace.push({event:e.type,target:e.target.closest('[data-zone]')?.dataset.zone||e.target.closest('[data-piece]')?.dataset.piece||e.target.tagName});window.__scienceDragTrace=window.__scienceDragTrace.slice(-12);};
  for(const type of ['dragstart','dragenter','dragover','drop','dragend'])document.addEventListener(type,window.__scienceDragListener,true);
 });
 const source=page.locator('[data-piece="'+item+'"]'),target=page.locator('[data-zone="'+zone+'"]');
 try{
  await source.hover();const start=await source.boundingBox();await page.mouse.down();
  // Begin the native drag while the source is still under the pointer, before target scrolling.
  await page.mouse.move(start.x+start.width/2+10,start.y+start.height/2,{steps:5});
  // Playwright documents two target moves for reliable native dragover delivery.
  await target.hover();await target.hover();const box=await target.boundingBox();await page.mouse.move(box.x+box.width/2+2,box.y+box.height/2+2);await page.mouse.up();
 }finally{
  await page.mouse.up();
  const trace=await page.evaluate(()=>{for(const type of ['dragstart','dragenter','dragover','drop','dragend'])document.removeEventListener(type,window.__scienceDragListener,true);return window.__scienceDragTrace;});
  if(!trace.some(e=>e.event==='drop'))console.log('Native drop trace',JSON.stringify({item,zone,trace}));
 }
}

async function round(page,n,mode='learn',capture=false){
 const seen=new Set();
 for(let i=0;i<n;i++){const q=await question(page);seen.add(q.type);await noOverflow(page,q.id);await checkQuestionImages(page,q.id);
 if(capture&&(q.data.photo||q.data.zoneImages)){
  const savedImageRun=await page.evaluate(()=>ScienceLab.getState().run);
  await page.setViewportSize({width:320,height:568});await noOverflow(page,'image question at 320 '+q.id);await checkQuestionImages(page,q.id);
  assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run),savedImageRun,'Image layout resize lost state '+q.id);
  await page.setViewportSize({width:1366,height:650});
 }
 
 if(capture&&critical.has(q.id)){
  await captureQuestion(page,path.join(audit,q.id+'.png'));
  if(q.visual||q.data.diagram||q.data.optionVisuals||q.data.table||q.data.scenePair||q.data.photo||q.data.zoneImages){
   const snapshot=await page.evaluate(()=>ScienceLab.getState().run);
   await page.setViewportSize({width:390,height:667});await noOverflow(page,'visual phone '+q.id);
   assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run),snapshot,'Visual resize changed state '+q.id);
   await captureQuestion(page,path.join(audit,q.id+'-phone.png'));
   await page.setViewportSize({width:1366,height:650});
  }
 }

 if(capture&&q.type==='sort'&&!fs.existsSync(path.join(out,'question-sort-desktop.png')))await page.screenshot({path:path.join(out,'question-sort-desktop.png'),fullPage:true});
 if(capture&&q.data.optionVisuals&&q.group==='temperature')await page.screenshot({path:path.join(out,'question-image-thermometers.png'),fullPage:true});
 if(capture&&q.type==='sort'){await page.locator('.bank').evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));const item=q.data.items[0];await nativeDrop(page,item.id,q.answer[item.id]);assert.equal(await page.evaluate(id=>{const s=ScienceLab.getState();return s.run.entries[s.run.queue[s.run.pos]].response[id];},item.id),q.answer[item.id],'Native dragging failed '+q.id);checks++;}
 await solve(page,q);assert(!(await page.locator('#check-answer').isDisabled()),'Check remains disabled '+q.id);
 if(capture&&q.type==='sort'){const before=await page.evaluate(()=>ScienceLab.getState().run.entries[ScienceLab.getState().run.queue[ScienceLab.getState().run.pos]].response);await page.setViewportSize({width:390,height:667});assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run.entries[ScienceLab.getState().run.queue[ScienceLab.getState().run.pos]].response),before,'Resize lost response');await noOverflow(page,'resize '+q.id);if(!fs.existsSync(path.join(out,'question-sort-phone.png')))await page.screenshot({path:path.join(out,'question-sort-phone.png'),fullPage:true});await page.setViewportSize({width:1366,height:650});}
 await page.locator('#check-answer').click();
 if(mode==='learn'){assert.match(await page.locator('#feedback-area').innerText(),/That’s right/,'Correct answer not accepted '+q.id);await page.locator('#check-answer').click();}
 else if(i<n-1)assert.equal(await page.locator('#feedback-area').innerText(),'','Test mode leaked feedback');
 checks++;
 }
 assert(await page.locator('#results').isVisible(),'Missing completed state');await noOverflow(page,'results');return seen;
}

const critical=new Set(["forces-02","forces-13","forces-14","forces-17","properties-02","properties-14","reactions-02","reactions-13","reactions-18","choices-02","choices-13","management-02","management-13","management-17","forces-08","forces-12","forces-09","properties-01","properties-13","reactions-14","management-09","management-15"]);
(async()=>{
 const browser=await chromium.launch({headless:true}),errors=[];
 const viewports=[[1366,650],[1024,540],[768,900],[390,667],[320,568],[640,360]];
 const context=await browser.newContext({viewport:{width:1366,height:650},reducedMotion:'reduce'}),page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'?topic=energy',{waitUntil:'networkidle'});
 assert.equal((await page.evaluate(()=>ScienceLab.getState())).topic,'energy');assert.equal(await page.locator('.goal-card').count(),5);
 assert.equal(await page.locator('.unit-tab').count(),2);await noOverflow(page,'Energy home desktop');
 assert(await page.locator('.hero-image').evaluate(i=>i.complete&&i.naturalWidth>0));
 await page.screenshot({path:path.join(out,'home-desktop.png'),fullPage:true});
 await page.evaluate(()=>document.body.style.zoom='125%');await noOverflow(page,'Energy 125 percent zoom');await page.evaluate(()=>document.body.style.zoom='');
 // Switching topics keeps each unit's draft answer, checked answers and round.
 await page.locator('.goal-card [data-start="forces"]').click();await page.locator('[data-choice="0"]').click();
 const energyDraft=await page.evaluate(()=>ScienceLab.getState().run);
 await page.locator('[data-topic="matter"]').click();assert.equal(await page.locator('.goal-card').count(),3);
 await page.locator('.goal-card [data-start="particles"]').click();let q=await question(page);await solve(page,q);await page.locator('#check-answer').click();
 const matterSaved=await page.evaluate(()=>ScienceLab.getState());
 await page.locator('[data-topic="energy"]').click();await page.locator('#resume').click();
 assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run),energyDraft,'Switching lost Energy draft');
 await page.reload({waitUntil:'networkidle'});assert.equal((await page.evaluate(()=>ScienceLab.getState())).topic,'energy');await page.locator('#resume').click();
 assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run),energyDraft,'Reload lost Energy draft');
 await page.locator('#start-menu').click();await page.locator('#round-size').selectOption('all');await page.locator('[data-start="all"]').click();await page.locator('#leave-confirm').click();
 assert.equal((await page.evaluate(()=>ScienceLab.getState().run.queue)).length,90);
 await round(page,90,'learn',true);assert.equal(await page.locator('.result-review').count(),90);
 assert.equal((await page.evaluate(()=>Object.values(ScienceLab.getState().run.entries).filter(e=>e.correct).length)),90);
 await page.screenshot({path:path.join(out,'results-desktop.png'),fullPage:true});
 await page.locator('#teacher-open').click();assert.equal(await page.locator('.source-outcome').count(),40);
 await page.locator('#reset-progress').click();await page.locator('#reset-progress').click();await page.keyboard.press('Escape');
 assert.equal(Object.keys((await page.evaluate(()=>ScienceLab.getState())).progress).length,0);
 await page.locator('[data-topic="matter"]').click();await page.locator('#resume').click();
 const matterRestored=await page.evaluate(()=>ScienceLab.getState());assert.deepEqual(matterRestored.run,matterSaved.run,'Clearing Energy changed the Matter round');assert.deepEqual(matterRestored.progress,matterSaved.progress,'Clearing Energy changed Matter progress');
 checks+=12;await context.close();console.log('PASS all 90 Energy questions, images, topic isolation, saved drafts and scoped reset');
 const groups=['forces','properties','reactions','choices','management'];
 for(let i=0;i<viewports.length;i++){
  const [width,height]=viewports[i],ctx=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'?topic=energy',{waitUntil:'networkidle'});await noOverflow(p,'Energy home '+width+'x'+height);assert.equal(await p.locator('.goal-card').count(),5);
  if(width===390)await p.screenshot({path:path.join(out,'home-phone.png'),fullPage:true});
  if(i===4)await p.locator('[data-mode="test"]').click();
  await p.locator('.goal-card [data-start="'+groups[i%groups.length]+'"]').click();
  const saved=await p.evaluate(()=>ScienceLab.getState().run);await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
  const menu=await p.locator('#start-menu').boundingBox();assert(menu&&menu.y>=0&&menu.y+menu.height<=height,'Energy menu off-screen '+width+'x'+height);
  await p.locator('#start-menu').click();await p.locator('#resume').click();assert.deepEqual(await p.evaluate(()=>ScienceLab.getState().run),saved);
  assert.equal((await round(p,9,i===4?'test':'learn')).size,9);
  if(i===4)assert.equal(await p.locator('.result-review').count(),9);
  await p.locator('#start-menu').click();assert(!(await p.locator('#resume').count()));
  checks+=3;await ctx.close();console.log('PASS Energy format tour at '+width+'x'+height);
 }
 assert.equal(errors.length,0,errors.join('\n'));await browser.close();
 fs.writeFileSync(path.join(out,'browser-report.json'),JSON.stringify({passed:true,unit:'energy',bankQuestions:90,curriculumStatements:40,viewports,questionChecks:checks,errors},null,2));console.log('TOTAL Energy '+checks+' checks');
})().catch(e=>{console.error(e);process.exit(1);});
