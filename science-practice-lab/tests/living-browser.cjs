const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const folder=path.join(__dirname,'..','validation','living');fs.mkdirSync(folder,{recursive:true});
const base='http://127.0.0.1:8765/science-practice-lab/?topic=living';
const current=page=>page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});
async function answer(page,q){
 if(['single','hotspot','multi'].includes(q.type)){for(const i of q.type==='multi'?q.answer:[q.answer])await page.locator('[data-choice="'+i+'"]').click();}
 else if(q.type==='numeric')await page.locator('#number-input').fill(String(q.answer));
 else if(q.type==='dropdown'){for(let i=0;i<q.answer.length;i++)await page.locator('[data-blank="'+i+'"]').selectOption(q.answer[i]);}
 else if(q.type==='order'){for(let i=0;i<q.answer.length;i++){let ids=await page.locator('[data-order-id]').evaluateAll(els=>els.map(el=>el.dataset.orderId));while(ids.indexOf(q.answer[i])>i){await page.locator('[data-move="'+q.answer[i]+'"][data-direction="-1"]').click();ids=await page.locator('[data-order-id]').evaluateAll(els=>els.map(el=>el.dataset.orderId));}}}
 else{for(const it of q.data.items){await page.locator('[data-piece="'+it.id+'"]').click();await page.locator('[data-zone="'+q.answer[it.id]+'"]').focus();await page.keyboard.press('Enter');}}
}
async function tour(page,size,capture=false){
 const counts=new Set();let total=0;
 for(let index=0;index<size;index++){
  const q=await current(page);counts.add(q.type);
  const dimensions=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(dimensions.scroll<=dimensions.viewport+2,'Horizontal overflow '+q.id+': '+JSON.stringify(dimensions));
  if(q.data.diagram){
   const diagram=page.locator('.living-diagram,.living-chain,.living-photosynthesis-context');
   assert(await diagram.count()>0,'No visual rendered for '+q.id);
   if(capture&&['ecosystems-13','ecosystems-14','photosynthesis-13','relationships-13','relationships-14'].includes(q.id))
    await page.screenshot({path:path.join(folder,q.id+'-'+dimensions.viewport+'.png'),fullPage:true});
  }
  await answer(page,q);
  assert(!(await page.locator('#check-answer').isDisabled()),'Incomplete answer '+q.id);
  await page.locator('#check-answer').click();
  assert.match(await page.locator('#feedback-area').innerText(),/That’s right/,'Question wrong '+q.id);
  await page.locator('#check-answer').click();total++;
 }
 assert.equal(await page.locator('.result-review').count(),size);
 return {total,formats:counts.size};
}
(async()=>{
 const browser=await chromium.launch({headless:true});let total=0;
 const desktop=await browser.newContext({viewport:{width:1366,height:760},reducedMotion:'reduce'}),p=await desktop.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base,{waitUntil:'networkidle'});
 assert.equal((await p.evaluate(()=>ScienceLab.getState())).topic,'living');
 assert.equal(await p.locator('.goal-card').count(),3);assert.equal(await p.locator('.unit-tab').count(),5);
 await p.screenshot({path:path.join(folder,'home-desktop.png'),fullPage:true});
 await p.locator('#round-size').selectOption('all');await p.locator('.home-actions [data-start="all"]').click();
 assert.equal((await p.evaluate(()=>ScienceLab.getState().run.queue)).length,54);
 const all=await tour(p,54,true);assert.equal(all.formats,9);total+=all.total;
 await p.locator('#teacher-open').click();assert.equal(await p.locator('.source-outcome').count(),36);
 assert.deepEqual(errors,[]);await desktop.close();
 for(const [width,height] of [[390,740],[320,568]]){
  const context=await browser.newContext({viewport:{width,height},hasTouch:true,isMobile:true,reducedMotion:'reduce'}),page=await context.newPage(),errs=[];
  page.on('pageerror',e=>errs.push(e.message));await page.goto(base,{waitUntil:'networkidle'});
  assert.equal(await page.locator('.goal-card').count(),3);
  if(width===390)await page.screenshot({path:path.join(folder,'home-phone.png'),fullPage:true});
  await page.locator('.goal-card [data-start="photosynthesis"]').click();
  const r=await tour(page,9,true);assert.equal(r.formats,9);total+=r.total;
  assert.deepEqual(errs,[]);await context.close();
 }
 await browser.close();fs.writeFileSync(path.join(folder,'report.json'),JSON.stringify({passed:true,questionChecks:total,formats:9,viewports:[1366,390,320]},null,2));
 console.log('PASS Living Systems 54 questions and mobile nine-format tours: '+total+' scored checks');
})().catch(e=>{console.error(e);process.exit(1);});
