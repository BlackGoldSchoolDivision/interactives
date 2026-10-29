'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const banks={en:require('../topics'),fr:require('../fr/topics')},assets=require('../visuals').assets;
const out=path.join(__dirname,'../validation/drag-preview');fs.mkdirSync(out,{recursive:true});
const errors=[];let checks=0;
const address=(lang,topic,id)=>'http://127.0.0.1:8765/science-practice-lab'+(lang==='fr'?'-fr':'')+'/?topic='+topic+'&set='+id+'&mode=learn';
async function response(page,id){return page.evaluate(id=>ScienceLab.getState().run.entries[id].response,id);}
async function overflow(page,label){const dims=await page.evaluate(()=>[document.documentElement.scrollWidth,innerWidth]);assert(dims[0]<=dims[1]+2,label+' overflow '+dims);}
async function tapPlace(page,item,zone,touch=false){const p=page.locator('[data-piece="'+item+'"]'),z=page.locator('[data-zone="'+zone+'"] .zone-drop-action');if(touch){await p.tap();await z.tap();}else{await p.click();await z.click();}}
async function nativeStart(page,item){
 await page.evaluate(()=>{window.__dragCapture=null;window.__drawCapture=null;});
 const source=page.locator('[data-piece="'+item+'"]');await source.hover();const start=await source.boundingBox();await page.mouse.down();await page.mouse.move(start.x+start.width/2+12,start.y+start.height/2,{steps:6});
 await page.waitForFunction(()=>window.__dragCapture,{timeout:5000});
 const capture=await page.evaluate(()=>({drag:window.__dragCapture,draw:window.__drawCapture,active:document.querySelectorAll('.drag-source').length}));
 assert.equal(capture.drag.tag,'CANVAS');assert.equal(capture.drag.piece,item);assert.equal(capture.active,1);assert(capture.drag.width<=240);assert(capture.drag.height<=242);assert(capture.draw,'Missing single-photo crop');
 return capture;
}
async function nativeEnd(page,target){await target.hover();await target.hover();const rect=await target.boundingBox();await page.mouse.move(rect.x+rect.width/2,rect.y+rect.height/2,{steps:4});await page.mouse.up();assert.equal(await page.locator('.picture-drag-preview,.drag-source').count(),0,'Drag feedback was not cleaned up');}
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const lang of ['en','fr'])for(const [topic,id]of [['matter','particles-12'],['energy','forces-07'],['energy','forces-11']]){
  const context=await browser.newContext({viewport:{width:1366,height:650},deviceScaleFactor:lang==='fr'?2:1,reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   const setImage=DataTransfer.prototype.setDragImage,drawImage=CanvasRenderingContext2D.prototype.drawImage;
   CanvasRenderingContext2D.prototype.drawImage=function(image,...args){if(this.canvas.classList.contains('picture-drag-preview'))window.__drawCapture={args,naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight};return drawImage.call(this,image,...args);};
   DataTransfer.prototype.setDragImage=function(node,x,y){window.__dragCapture={tag:node.tagName,piece:node.dataset.dragPiece,width:node.width,height:node.height,x,y,image:node.toDataURL('image/png')};return setImage.call(this,node,x,y);};
  });
  const q=banks[lang].find(t=>t.id===topic).data.questions.find(q=>q.id===id);
  await page.goto(address(lang,topic,id));await page.locator('#start-assignment').click();await page.locator('.piece-picture img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  // Match the reported state: only Melting and Condensation remain in the bank.
  if(id==='particles-12'){await tapPlace(page,'b','freeze');await tapPlace(page,'c','evaporate');assert.equal(await page.locator('.bank .picture-piece').count(),2);}
  if(lang==='fr')await page.evaluate(()=>document.body.style.zoom='125%');
  const item=q.data.items[0].id,before=await response(page,id),capture=await nativeStart(page,item),visual=q.data.itemVisuals[item],asset=assets[visual.asset];
  const frame=asset.frames?.[visual.panel]||[(visual.panel%asset.cols)/asset.cols,Math.floor(visual.panel/asset.cols)/asset.rows,1/asset.cols,1/asset.rows];
  const actual=[capture.draw.args[0]/capture.draw.naturalWidth,capture.draw.args[1]/capture.draw.naturalHeight,capture.draw.args[2]/capture.draw.naturalWidth,capture.draw.args[3]/capture.draw.naturalHeight];
  for(let i=0;i<4;i++)assert(Math.abs(actual[i]-frame[i])<.002,lang+' '+id+' sampled neighbouring panels '+actual);
  fs.writeFileSync(path.join(out,lang+'-'+id+'-floating-card.png'),Buffer.from(capture.drag.image.split(',')[1],'base64'));
  await nativeEnd(page,page.locator('[data-zone="'+q.answer[item]+'"]'));
  assert.deepEqual(await response(page,id),{...before,[item]:q.answer[item]},'Moving one image changed another answer');
  if(id==='particles-12'){
   assert.equal(await page.locator('.bank .picture-piece').count(),1);
   // A card can be dragged back from a destination without moving its neighbours.
   await nativeStart(page,item);await nativeEnd(page,page.locator('.bank'));assert.deepEqual(await response(page,id),before);
   const unchanged=await response(page,id);await nativeStart(page,'d');await page.keyboard.press('Escape');await page.mouse.up();assert.equal(await page.locator('.picture-drag-preview,.drag-source').count(),0);assert.deepEqual(await response(page,id),unchanged,'Cancelling a drag changed answers');
  }
  for(const entry of q.data.items){if((await response(page,id))[entry.id]!==q.answer[entry.id])await tapPlace(page,entry.id,q.answer[entry.id]);}
  await page.locator('#check-answer').click();assert.match(await page.locator('#feedback-area').innerText(),lang==='fr'?/C’est bien ça/:/That’s right/);await overflow(page,lang+' '+id);
  await page.locator('#check-answer').click();assert(await page.locator('#results').isVisible());checks++;await context.close();
 }
 const sizes=[[1366,650],[1024,540],[768,900],[390,667],[320,568],[640,360]];
 for(const[i,[width,height]]of sizes.entries()){
  const lang=i%2?'fr':'en',touch=width<650,context=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(address(lang,'matter','particles-12'));await page.locator('#start-assignment').click();await overflow(page,'Question 12 '+width+'x'+height);
  await tapPlace(page,'b','freeze',touch);await tapPlace(page,'c','evaporate',touch);const saved=await response(page,'particles-12');
  await page.setViewportSize({width:width===320?1366:320,height:568});await overflow(page,'Question 12 resize');assert.deepEqual(await response(page,'particles-12'),saved);await page.setViewportSize({width,height});
  await tapPlace(page,'a','melt',touch);await tapPlace(page,'d','condense',touch);assert.equal(await page.locator('.picture-drag-preview').count(),0);await page.locator('#check-answer').click();assert.match(await page.locator('#feedback-area').innerText(),lang==='fr'?/C’est bien ça/:/That’s right/);await page.locator('#check-answer').click();assert(await page.locator('#results').isVisible());await overflow(page,'Question 12 results '+width);checks++;await context.close();
 }
 assert.deepEqual(errors,[]);await browser.close();fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({passed:true,checks,sizes,errors},null,2));console.log('PASS single-card drag previews, four/two-column crops, English/French, return/cancel, and Question 12 at all six sizes ('+checks+')');
})().catch(e=>{console.error(e);process.exit(1);});
