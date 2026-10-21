const test=require('node:test'),assert=require('node:assert/strict');
const M=require('../data.js'),E=require('../energy.js'),Core=require('../core.js'),V=require('../visuals.js');
const cases=[['Matter',M,'particles-12','sceneStrip'],['Matter',M,'temperature-11','photo'],['Energy',E,'forces-11','photo'],['Energy',E,'management-12','photo']];
test('New illustration contexts match existing questions and leave scoring unchanged',()=>{
 for(const [unit,bank,id,key] of cases){
  const q=bank.questions.find(x=>x.id===id);assert(q,id);
  assert(q.data[key],id+' missing contextual artwork');
  assert(Core.hasVisual(q),id+' missing visual picker flag');
  assert(Core.grade(q,q.answer).correct,id+' answer key changed');
  assert(Core.complete(q,q.answer),id+' full response incomplete');
  if(q.type==='match')assert(!Core.complete(q,{}),id+' empty response accepted');
  const asset=q.data[key].asset;assert(V.assets[asset],id+' unknown asset '+asset);
  if(key==='photo')assert(V.describe(asset,q.data.photo.panel),id+' alt missing');
  else{
   assert.equal(q.data.sceneStrip.panels.length,4);
   for(const i of q.data.sceneStrip.panels)assert(V.describe(asset,i));
   assert(V.sceneStrip(q.data.sceneStrip).includes('raster-scene-strip'));
  }
 }
});
