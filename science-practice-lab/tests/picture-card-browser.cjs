const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const out=path.join(__dirname,'..','validation','energy','picture-drag');fs.mkdirSync(out,{recursive:true});
const url='http://127.0.0.1:8765/science-practice-lab/?topic=energy';
async function dropByMouse(page,item,zone){
 const source=page.locator('[data-piece="'+item+'"]'),target=page.locator('[data-zone="'+zone+'"]');
 await source.hover();await page.mouse.down();
 const start=await source.boundingBox();await page.mouse.move(start.x+start.width/2+9,start.y+start.height/2,{steps:6});
 await target.hover();await target.hover();
 const b=await target.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:4});await page.mouse.up();
}
async function checkImages(page,id){
 const all=await page.locator('.picture-piece .piece-picture img').evaluateAll(async nodes=>Promise.all(nodes.map(async im=>{try{await im.decode()}catch{}return im.naturalWidth>0&&im.naturalHeight>0})));
 assert(all.every(Boolean),id+' image failed to load');return all.length;
}
async function current(page){return page.evaluate(()=>{const s=ScienceLab.getState();return ScienceLab.data.questions.find(q=>q.id===s.run.queue[s.run.pos]);});}
async function solve(page,q,method){
 for(let i=0;i<q.data.items.length;i++){
  const item=q.data.items[i],zone=q.answer[item.id],p=page.locator('[data-piece="'+item.id+'"]'),z=page.locator('[data-zone="'+zone+'"]');
  if(method==='drag'&&i===0)await dropByMouse(page,item.id,zone);
  else if(method==='touch'){await p.tap();await z.tap();}
  else if(method==='keyboard'&&i===0){await p.focus();await page.keyboard.press('Enter');await z.focus();await page.keyboard.press('Enter');}
  else{await p.click();await z.click();}
  const value=await page.evaluate(id=>{const s=ScienceLab.getState();return s.run.entries[s.run.queue[s.run.pos]].response[id];},item.id);
  assert.equal(value,zone,'Placement failed '+q.id+'/'+item.id);
 }
}
(async()=>{
 const browser=await chromium.launch({headless:true});let checks=0;
 for(const [width,height,touch] of [[1366,768,false],[390,740,true],[320,568,true]]){
  for(const type of ['sort','match']){
   const ctx=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'});
   const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(url,{waitUntil:'networkidle'});
   await page.locator('#format-open').click();await page.locator('#format-filter').selectOption(type);
   await page.locator('#round-size').selectOption('all');
   await page.locator('.goal-card [data-start="forces"]').click();
   const queue=await page.evaluate(()=>ScienceLab.getState().run.queue);
   assert.equal(queue.length,2,'Expected two force '+type+' questions');
   let illustrated=0;
   for(let i=0;i<queue.length;i++){
    const q=await current(page),visual=!!q.data.itemVisuals;
    if(visual){
     illustrated++;assert.equal(await page.locator('.picture-piece').count(),4,q.id+' missing picture cards');
     assert.equal(await checkImages(page,q.id),4);
     assert.equal(await page.locator('.zone-illustration').count(),0,'Duplicate answer photographs '+q.id);
     const overflow=await page.evaluate(()=>[document.documentElement.scrollWidth,window.innerWidth]);
     assert(overflow[0]<=overflow[1]+2,'horizontal scrolling at '+width+' '+q.id+' '+overflow);
     if(i===0||visual)await page.screenshot({path:path.join(out,q.id+'-'+width+'.png'),fullPage:true});
    }
    await solve(page,q,visual?(touch?'touch':'drag'):'click');
    await page.locator('#check-answer').click();assert.match(await page.locator('#feedback-area').innerText(),/That’s right/);
    await page.locator('#check-answer').click();checks++;
   }
   assert(illustrated>=1,'No image card in '+type);
   assert.equal(await page.locator('.result-review').count(),2);
   assert.deepEqual(errors,[],'Browser JavaScript errors');
   await ctx.close();
  }
 }
 await browser.close();
 fs.writeFileSync(path.join(out,'test-summary.json'),JSON.stringify({passed:true,checks,viewports:['1366x768','390x740','320x568'],formats:['sort','match']},null,2));
 console.log('PASS photo-card native mouse dragging, mobile tap placement and browser layouts: '+checks+' scored questions');
})().catch(e=>{console.error(e);process.exit(1)});
