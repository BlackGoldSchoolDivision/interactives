const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..','validation','matter','showcase');fs.mkdirSync(root,{recursive:true});
const base='http://127.0.0.1:8765/science-practice-lab/?topic=matter';
const scenes=[
 {id:'particles-02',goal:'particles',type:'single',layout:'matter-particle-cards'},
 {id:'particles-12',goal:'particles',type:'match',layout:'matter-phase-match'},
 {id:'particles-13',goal:'particles',type:'label',layout:'matter-phase-diagram'},
 {id:'temperature-02',goal:'temperature',type:'single',layout:'matter-thermometer-cards'},
 {id:'temperature-13',goal:'temperature',type:'label',layout:'matter-thermometer-diagram'},
 {id:'expansion-02',goal:'expansion',type:'single',layout:'matter-ice-models'}
];
const current=page=>page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});
async function solve(page,q,touch){
 if(['single','hotspot','multi'].includes(q.type)){
  for(const i of q.type==='multi'?q.answer:[q.answer]){
   if(touch)await page.locator('[data-choice="'+i+'"]').tap();
   else await page.locator('[data-choice="'+i+'"]').click();
  }
 }else if(q.type==='numeric')await page.locator('#number-input').fill(String(q.answer));
 else if(q.type==='dropdown')for(let i=0;i<q.answer.length;i++)await page.locator('[data-blank="'+i+'"]').selectOption(q.answer[i]);
 else if(q.type==='order'){
  for(let i=0;i<q.answer.length;i++){
   let current=await page.locator('[data-order-id]').evaluateAll(els=>els.map(x=>x.dataset.orderId));
   while(current.indexOf(q.answer[i])>i){await page.locator('[data-move="'+q.answer[i]+'"][data-direction="-1"]').click();current=await page.locator('[data-order-id]').evaluateAll(els=>els.map(x=>x.dataset.orderId));}
  }
 }else{
  for(const item of q.data.items){
   const card=page.locator('[data-piece="'+item.id+'"]'),zone=page.locator('[data-zone="'+q.answer[item.id]+'"]');
   if(touch){await card.tap();await zone.locator('.zone-drop-action').tap();}
   else{await card.click();await zone.locator('.zone-drop-action').click();}
   const actual=await page.evaluate(id=>{const state=ScienceLab.getState();return state.run.entries[state.run.queue[state.run.pos]].response[id];},item.id);
   assert.equal(actual,q.answer[item.id],q.id+' placed incorrectly '+item.id);
  }
 }
}
async function preview(page,scenario,width){
 const card=page.locator('.question-card.matter-showcase.'+scenario.layout);
 assert.equal(await card.count(),1,scenario.id+' missing actual live showcase');
 assert.equal(await page.locator('.matter-showcase-banner').count(),1);
 assert.equal(await page.locator('.matter-workspace').count(),1);
 assert.equal(await page.locator('#answer-area').count(),1);
 assert.equal(await page.locator('#feedback-area').innerText(),'','Early answer disclosure '+scenario.id);
 const dims=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
 assert(dims.scroll<=dims.viewport+2,'Overflow '+scenario.id+' '+width+' '+JSON.stringify(dims));
 if(scenario.id==='particles-12'){
  assert.equal(await page.locator('.picture-bank .picture-piece').count(),4);
  assert.equal(await page.locator('.zone-illustration').count(),0);
  const decoded=await page.locator('.picture-bank img').evaluateAll(async imgs=>Promise.all(imgs.map(async im=>{try{await im.decode()}catch{}return im.naturalWidth>0&&im.naturalHeight>0})));
  assert.deepEqual(decoded,[true,true,true,true],'Missing phase change photo');
 }
 if(scenario.id==='particles-02')assert.equal(await page.locator('.matter-work-task .image-choice').count(),4);
 if(scenario.id==='temperature-02')assert.equal(await page.locator('.matter-work-task .thermo-svg').count(),4);
 if(scenario.id==='particles-13')assert((await page.locator('.matter-work-visual .phase-grid').count())===1);
 if(scenario.id==='temperature-13')assert((await page.locator('.matter-work-visual .thermo-svg').count())>=1);
 if(scenario.id==='expansion-02'){
  assert.equal(await page.locator('.matter-work-task .volume-svg').count(),4);
  assert.equal(await page.locator('.matter-work-visual .raster-strip-card').count(),2);
 }
 await page.screenshot({path:path.join(root,scenario.id+'-'+width+'.png'),fullPage:true,animations:'disabled'});
}
(async()=>{
 const browser=await chromium.launch({headless:true});let checks=0;
 for(const [width,height,touch]of [[1366,750,false],[390,740,true],[320,568,true]]){
  for(const scenario of scenes){
   const ctx=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'});
   const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base,{waitUntil:'networkidle'});
   await page.locator('#format-open').click();
   await page.locator('#format-filter').selectOption(scenario.type);
   await page.locator('#round-size').selectOption('all');
   await page.locator('.goal-card [data-start="'+scenario.goal+'"]').click();
   assert.equal((await page.evaluate(()=>ScienceLab.getState().run.queue)).length,2);
   let seen=false;
   for(let i=0;i<2;i++){
    const q=await current(page);
    if(q.id===scenario.id){seen=true;await preview(page,scenario,width);checks++;}
    await solve(page,q,touch);
    await page.locator('#check-answer').click();
    assert.match(await page.locator('#feedback-area').innerText(),/That’s right/,q.id+' answer wrong');
    await page.locator('#check-answer').click();
   }
   assert(seen,'Never visited '+scenario.id);
   assert.equal(await page.locator('.result-review').count(),2);
   assert.deepEqual(errors,[],scenario.id+' browser errors');
   await ctx.close();
  }
 }
 await browser.close();
 fs.writeFileSync(path.join(root,'report.json'),JSON.stringify({passed:true,showcases:scenes.map(x=>x.id),checks,viewports:[1366,390,320]},null,2));
 console.log('PASS six Matter visual showcases, pictured answer cards and touch/keyboard at 1366/390/320 px: '+checks);
})().catch(e=>{console.error(e);process.exit(1)});
