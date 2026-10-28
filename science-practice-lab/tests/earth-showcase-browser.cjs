const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const directory=path.join(__dirname,'..','validation','earth','showcase');fs.mkdirSync(directory,{recursive:true});
const base='http://127.0.0.1:8765/science-practice-lab/?topic=earth';
const scenarios=[
 {goal:'climate',format:'sort',id:'climate-07',layout:'earth-climate-sort',zones:2},
 {goal:'evidence',format:'match',id:'evidence-12',layout:'earth-storm-match',zones:4},
 {goal:'evidence',format:'label',id:'evidence-14',layout:'earth-forecast-lab',zones:3},
 {goal:'impacts',format:'label',id:'impacts-13',layout:'earth-coast-lab',zones:4},
];
const current=page=>page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});
async function put(page,q,touch){
 for(const item of q.data.items){
  const choice=page.locator('[data-piece="'+item.id+'"]');
  const destination=page.locator('[data-zone="'+q.answer[item.id]+'"]');
  if(touch){await choice.tap();await destination.locator('.zone-drop-action').tap();}
  else{await choice.click();await destination.locator('.zone-drop-action').click();}
  const response=await page.evaluate(id=>{const s=ScienceLab.getState(),q=s.run.queue[s.run.pos];return s.run.entries[q].response[id];},item.id);
  assert.equal(response,q.answer[item.id],'Placement failed '+q.id+':'+item.id);
 }
}
async function checkScreenshot(page,scenario,width){
 assert.equal(await page.locator('.earth-showcase.'+scenario.layout).count(),1,'Visual shell missing for '+scenario.id);
 assert.equal(await page.locator('.q-meta .format-pill').count(),1);
 assert.equal(await page.locator('.earth-workspace').count(),1);
 assert.equal(await page.locator('.earth-showcase-zones [data-zone]').count(),scenario.zones);
 assert.equal(await page.locator('#feedback-area').innerText(),'','Answers leaked before submission');
 if(['earth-coast-lab','earth-forecast-lab'].includes(scenario.layout)){
  assert.equal(await page.locator('.evidence-pane').count(),1);
  assert((await page.locator('.evidence-pane svg').count())+(await page.locator('.evidence-pane .scene-art img').count())>0,'Missing visual evidence');
 }
 const dims=await page.evaluate(()=>({screen:innerWidth,scroll:document.documentElement.scrollWidth,card:document.querySelector('.earth-showcase').getBoundingClientRect().width}));
 assert(dims.scroll<=dims.screen+2,'Horizontal overflow '+scenario.id+' '+width+JSON.stringify(dims));
 await page.screenshot({path:path.join(directory,scenario.id+'-'+width+'.png'),fullPage:true,animations:'disabled'});
}
(async()=>{
 const browser=await chromium.launch({headless:true});let checked=0;
 for(const [width,height,touch] of [[1366,768,false],[390,740,true],[320,568,true]]){
  for(const scenario of scenarios){
   const context=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base,{waitUntil:'networkidle'});
   await page.locator('#format-open').click();
   await page.locator('#format-filter').selectOption(scenario.format);
   await page.locator('#round-size').selectOption('all');
   await page.locator('.goal-card [data-start="'+scenario.goal+'"]').click();
   const queue=await page.evaluate(()=>ScienceLab.getState().run.queue);
   assert.equal(queue.length,2,scenario.goal+'/'+scenario.format+' should have two questions');
   let visited=false;
   for(let index=0;index<queue.length;index++){
    const q=await current(page);
    if(q.id===scenario.id){
     visited=true;
     await checkScreenshot(page,scenario,width);
     if(q.id==='climate-07'){
      assert.equal(await page.locator('.picture-bank .picture-piece').count(),4);
      assert.equal(await page.locator('.earth-showcase-zones .zone-illustration').count(),0);
      const imageOk=await page.locator('.picture-bank img').evaluateAll(async imgs=>Promise.all(imgs.map(async im=>{try{await im.decode()}catch{}return im.naturalWidth>0})));
      assert.deepEqual(imageOk,[true,true,true,true], 'Climate driver images did not load');
     }
     if(q.id==='evidence-12'){
      assert.equal(await page.locator('.picture-bank .picture-piece').count(),4,'Missing four weather photo cards');
      const imgs=await page.locator('.picture-bank img').evaluateAll(async els=>Promise.all(els.map(async img=>{try{await img.decode()}catch{}return img.naturalWidth>0})));
      assert.deepEqual(imgs,[true,true,true,true],'One or more weather photographs did not load');
      assert.equal(await page.locator('.earth-storm-match .zone-illustration').count(),0,'Answer destination repeats clue imagery');
     }
     if(q.id==='evidence-14'){
      assert.equal(await page.locator('.evidence-pane .scene-art').count(),3,'Expect three real forecasting pictures');
      const imgs=await page.locator('.evidence-pane .scene-art img').evaluateAll(async els=>Promise.all(els.map(async img=>{try{await img.decode()}catch{}return img.naturalWidth>0})));
      assert.deepEqual(imgs,[true,true,true],'Forecast equipment photos did not load');
     }

     await put(page,q,touch);checked++;
    }else{
     await put(page,q,touch);
    }
    await page.locator('#check-answer').click();
    assert.match(await page.locator('#feedback-area').innerText(),/That’s right/);
    await page.locator('#check-answer').click();
   }
   assert(visited,scenario.id+' never shown');
   assert.equal(await page.locator('.result-review').count(),2);
   assert.deepEqual(errors,[],scenario.id+' runtime JS errors');
   await context.close();
  }
 }
 await browser.close();
 fs.writeFileSync(path.join(directory,'report.json'),JSON.stringify({passed:true,checked,viewports:[1366,390,320],targets:scenarios.map(s=>s.id)},null,2));
 console.log('PASS four colourful Earth Systems question layouts in three viewport widths; all drop/tap answers correct ('+checked+')');
})().catch(error=>{console.error(error);process.exit(1)});
