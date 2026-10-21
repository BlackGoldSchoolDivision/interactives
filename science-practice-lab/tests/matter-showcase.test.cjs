const test=require('node:test'),assert=require('node:assert/strict');
const Matter=require('../data.js'),Core=require('../core.js'),Visuals=require('../visuals.js');
const expected={
 'particles-02':['single','matter-particle-cards'],
 'particles-12':['match','matter-phase-match'],
 'particles-13':['label','matter-phase-diagram'],
 'temperature-02':['single','matter-thermometer-cards'],
 'temperature-13':['label','matter-thermometer-diagram'],
 'expansion-02':['single','matter-ice-models'],
};
test('Six Matter showcase screens are real existing questions with unchanged answer keys and scoring',()=>{
 assert.equal(Matter.questions.length,54);
 for(const [id,[type,layout]]of Object.entries(expected)){
  const q=Matter.questions.find(q=>q.id===id);assert(q,id+' missing');
  assert.equal(q.type,type);assert.equal(q.data.layout,layout);
  assert(Core.complete(q,q.answer),id+' incomplete correct answer');
  assert(Core.grade(q,q.answer).correct,id+' rejected correct answer');
  if(['label','match'].includes(type)){
   assert(!Core.complete(q,{}),id+' blank zones accepted');
   assert.equal(q.data.items.length,Object.keys(q.answer).length);
   assert(q.data.items.every(i=>q.data.zones.some(z=>z.id===q.answer[i.id])),id+' missing destination');
  }
 }
});
test('Phase change matching has original photo artwork on four movable cards only',()=>{
 const q=Matter.questions.find(q=>q.id==='particles-12');
 assert.equal(q.data.items.length,4);
 assert.equal(Object.keys(q.data.itemVisuals).length,4);
 assert.equal(q.data.sceneStrip,undefined,'No redundant photo gallery');
 assert.equal(q.data.zoneImages,undefined,'Do not visually repeat matches in destinations');
 assert.deepEqual(Object.values(q.data.itemVisuals).map(x=>x.panel),[1,0,2,3]);
 for(const item of q.data.items){
  const pic=q.data.itemVisuals[item.id];assert.equal(pic.asset,'phase-change-scenes');
  assert(Visuals.assets[pic.asset],item.id+' missing asset');
  assert(Visuals.describe(pic.asset,pic.panel),item.id+' missing alt');
  assert.match(Visuals.scene(pic.asset,pic.panel),/scene-art/);
 }
 assert(Core.hasVisual(q));
});
test('Particle and temperature answers stay mathematically and scientifically consistent',()=>{
 const models=Matter.questions.find(q=>q.id==='particles-02');
 assert.equal(models.answer,2);
 assert.deepEqual(models.data.optionVisuals.map(v=>v.style),['solid','liquid','gas','bottom']);
 assert(models.data.optionDescriptions.every(d=>d.includes('Nine particles')));
 const thermo=Matter.questions.find(q=>q.id==='temperature-02');
 assert.equal(thermo.data.optionVisuals.length,4);
 const change=Matter.questions.find(q=>q.id==='particles-13');
 assert.deepEqual(change.answer,{m:'A',v:'B',c:'C',f:'D'});
 assert.equal(change.data.sceneStrip.panels.length,4);
 const ice=Matter.questions.find(q=>q.id==='expansion-02');
 assert.equal(ice.answer,1);
 assert(ice.data.sceneStrip.caption.includes('not measurements'));
});
test('The full Matter bank still has 18 items and two of each scoring format per goal',()=>{
 assert.equal(new Set(Matter.questions.map(q=>q.id)).size,54);
 for(const g of Matter.groups){
  const qs=Matter.questions.filter(q=>q.group===g.id);assert.equal(qs.length,18);
  for(const type of Core.TYPES)assert.equal(qs.filter(q=>q.type===type).length,2);
 }
});
