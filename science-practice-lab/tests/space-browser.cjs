const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const folder=path.join(__dirname,'..','validation','space');fs.mkdirSync(folder,{recursive:true});
const base='http://127.0.0.1:8765/science-practice-lab/?topic=space';
const current=page=>page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});
async function answer(page,q){
 if(['single','hotspot','multi'].includes(q.type)){for(const i of q.type==='multi'?q.answer:[q.answer])await page.locator('[data-choice="'+i+'"]').click();}
 else if(q.type==='numeric')await page.locator('#number-input').fill(String(q.answer));
 else if(q.type==='dropdown'){for(let i=0;i<q.answer.length;i++)await page.locator('[data-blank="'+i+'"]').selectOption(q.answer[i]);}
 else if(q.type==='order'){for(let i=0;i<q.answer.length;i++){
  let ids=await page.locator('[data-order-id]').evaluateAll(els=>els.map(el=>el.dataset.orderId));
  while(ids.indexOf(q.answer[i])>i){await page.locator('[data-move="'+q.answer[i]+'"][data-direction="-1"]').click();ids=await page.locator('[data-order-id]').evaluateAll(els=>els.map(el=>el.dataset.orderId));}
 }}
 else for(const item of q.data.items){
  await page.locator('[data-piece="'+item.id+'"]').click();
  await page.locator('[data-zone="'+q.answer[item.id]+'"]').focus();await page.keyboard.press('Enter');
 }
}
async function tour(page,count,capture=false){
 const types=new Set();
 for(let i=0;i<count;i++){
  const q=await current(page);types.add(q.type);
  const bounds=await page.evaluate(()=>({vw:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(bounds.scroll<=bounds.vw+2,q.id+' horizontal overflow '+JSON.stringify(bounds));
  if(q.data.diagram){assert(await page.locator('.space-svg').count()>0,'Missing SVG diagram '+q.id);
   if(capture&&['planetary-13','planetary-14','exploration-13','exploration-14'].includes(q.id))await page.screenshot({path:path.join(folder,q.id+'-'+bounds.vw+'.png'),fullPage:true});
  }
  await answer(page,q);
  assert(!(await page.locator('#check-answer').isDisabled()),q.id+' incomplete');
  await page.locator('#check-answer').click();
  assert.match(await page.locator('#feedback-area').innerText(),/That’s right/,q.id+' wrong');
  await page.locator('#check-answer').click();
 }
 assert.equal(await page.locator('.result-review').count(),count);
 return types.size;
}
(async()=>{
 const browser=await chromium.launch({headless:true});let checks=0;
 const ctx=await browser.newContext({viewport:{width:1366,height:768},reducedMotion:'reduce'});
 const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 assert.equal((await page.evaluate(()=>ScienceLab.getState())).topic,'space');
 assert.equal(await page.locator('.goal-card').count(),2);
 assert.equal(await page.locator('.unit-tab').count(),5);
 await page.screenshot({path:path.join(folder,'home-desktop.png'),fullPage:true});
 await page.locator('#round-size').selectOption('all');
 await page.locator('.home-actions [data-start="all"]').click();
 assert.equal((await page.evaluate(()=>ScienceLab.getState().run.queue)).length,36);
 assert.equal(await tour(page,36,true),9);checks+=36;
 await page.locator('#teacher-open').click();
 assert.equal(await page.locator('.source-outcome').count(),26);
 assert.deepEqual(errors,[]);await ctx.close();
 for(const [width,height] of [[390,740],[320,568]]){
  const mobile=await browser.newContext({viewport:{width,height},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  const p=await mobile.newPage(),mobileErrors=[];p.on('pageerror',e=>mobileErrors.push(e.message));
  await p.goto(base,{waitUntil:'networkidle'});
  assert.equal(await p.locator('.goal-card').count(),2);
  if(width===390)await p.screenshot({path:path.join(folder,'home-phone.png'),fullPage:true});
  await p.locator('.goal-card [data-start="exploration"]').click();
  assert.equal(await tour(p,9,true),9);checks+=9;
  assert.deepEqual(mobileErrors,[]);await mobile.close();
 }
 await browser.close();
 fs.writeFileSync(path.join(folder,'report.json'),JSON.stringify({passed:true,unit:'space',questionChecks:checks,formats:9,viewports:[1366,390,320]},null,2));
 console.log('PASS Space 36 questions plus mobile format tours: '+checks+' scored checks');
})().catch(e=>{console.error(e);process.exit(1)});
