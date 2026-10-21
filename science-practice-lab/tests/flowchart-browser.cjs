const {chromium}=require('playwright'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const folder=path.join(__dirname,'..','validation','energy','flowcharts');fs.mkdirSync(folder,{recursive:true});
const root='http://127.0.0.1:8765/science-practice-lab/?topic=energy';
async function current(page){return page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});}
async function answer(page,q,method){
 for(const [i,item] of q.data.items.entries()){
  const target=q.answer[item.id],card=page.locator('[data-piece="'+item.id+'"]'),zone=page.locator('[data-zone="'+target+'"]');
  if(method==='touch'){await card.tap();await zone.locator('.zone-drop-action').tap();}
  else if(method==='keyboard'&&i===0){await card.focus();await page.keyboard.press('Enter');await zone.focus();await page.keyboard.press('Enter');}
  else{await card.click();await zone.locator('.zone-drop-action').click();}
  const actual=await page.evaluate(id=>{const s=ScienceLab.getState();return s.run.entries[s.run.queue[s.run.pos]].response[id];},item.id);
  assert.equal(actual,target,q.id+' did not place '+item.id+' into '+target);
 }
}
(async()=>{
 const browser=await chromium.launch({headless:true});let checks=0;
 for(const [w,h,touch] of [[1366,720,false],[390,740,true],[320,568,true]]){
  for(const [format,targetId,layout] of [['sort','management-07','energy-branch-diagram'],['label','management-13','energy-stage-diagram']]){
   const ctx=await browser.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
   page.on('pageerror',err=>errors.push(err.message));
   await page.goto(root,{waitUntil:'networkidle'});
   await page.locator('#format-open').click();await page.locator('#format-filter').selectOption(format);await page.locator('#round-size').selectOption('all');
   await page.locator('.goal-card [data-start="management"]').click();
   assert.equal((await page.evaluate(()=>ScienceLab.getState().run.queue)).length,2);
   let found=false;
   for(let k=0;k<2;k++){
    const q=await current(page);
    if(q.id===targetId){
     found=true;
     const board=page.locator('.'+layout);
     assert.equal(await board.count(),1,q.id+' flowchart missing');
     assert.equal(await board.locator('[data-zone]').count(),q.data.zones.length);
     assert.equal(await board.locator('.zone-drop-action').count(),q.data.zones.length);
     assert.equal(await board.locator('.zone-pieces .piece').count(),0,'Diagram filled before response');
     if(q.id==='management-07'){
      assert.equal(await page.locator('.picture-bank .picture-piece').count(),2);
      const good=await page.locator('.picture-bank img').evaluateAll(async nodes=>Promise.all(nodes.map(async img=>{try{await img.decode();}catch{}return img.naturalWidth>0})));
      assert.deepEqual(good,[true,true],'Flowchart source image not loaded');
     }else{
      const before=await board.innerText();
      assert(!before.includes('Resource: wind'));assert(!before.includes('Output: electricity'));assert(!before.includes('Daily use: lighting'));
     }
     const width=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
     assert(width<=2,'Flowchart horizontal overflow '+q.id+' '+w+' '+width);
     await page.screenshot({path:path.join(folder,q.id+'-'+w+'.png'),fullPage:true});
    }
    await answer(page,q,touch?'touch':'keyboard');
    await page.locator('#check-answer').click();
    assert.match(await page.locator('#feedback-area').innerText(),/That’s right/);
    await page.locator('#check-answer').click();checks++;
   }
   assert(found,'Target '+targetId+' not visited');
   assert.equal(await page.locator('.result-review').count(),2);
   assert.deepEqual(errors,[]);
   await ctx.close();
  }
 }
 await browser.close();fs.writeFileSync(path.join(folder,'report.json'),JSON.stringify({success:true,checks,viewports:[1366,390,320],pilots:['management-07','management-13']},null,2));
 console.log('PASS two science flowchart pilots, including touch/keyboard placement and no leaked stages: '+checks+' questions scored');
})().catch(e=>{console.error(e);process.exit(1);});
