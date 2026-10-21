const test=require('node:test'),assert=require('node:assert/strict');
const Earth=require('../earth.js'),Core=require('../core.js');
const targets={'evidence-12':['match','earth-storm-match'],'evidence-14':['label','earth-forecast-lab'],'climate-07':['sort','earth-climate-sort'],'impacts-13':['label','earth-coast-lab']};
test('Four real Earth Systems items opt into the colourful assessment renderer',()=>{
 assert.equal(Earth.questions.length,72);
 for(const [id,[type,layout]] of Object.entries(targets)){
  const q=Earth.questions.find(x=>x.id===id);assert(q,id+' missing');
  assert.equal(q.type,type);assert.equal(q.data.layout,layout);
  assert(Core.complete(q,q.answer),id+' correct response incomplete');
  assert(Core.grade(q,q.answer).correct,id+' answer key rejected');
  assert(!Core.complete(q,{}),id+' empty answer accepted');
  for(const item of q.data.items)assert(q.data.zones.some(z=>z.id===q.answer[item.id]),id+' missing drop destination for '+item.id);
 }
});
test('The Earth Systems learning groups still have nine scoring types and eighteen items each',()=>{
 for(const g of Earth.groups){
  const items=Earth.questions.filter(q=>q.group===g.id);assert.equal(items.length,18);
  for(const type of Core.TYPES)assert.equal(items.filter(q=>q.type===type).length,2,g.id+' '+type);
 }
 assert.equal(new Set(Earth.questions.map(q=>q.id)).size,72);
});

test('Climate-causes activity uses four authentic image-backed movable cards with unchanged placements',()=>{
 const climate=require('../earth.js').questions.find(q=>q.id==='climate-07');
 assert.equal(climate.type,'sort');
 assert.deepEqual(climate.answer,{eruption:'natural',orbit:'natural',fuel:'human',industry:'human'});
 assert.equal(Object.keys(climate.data.itemVisuals).length,4);
 assert(!climate.data.zoneImages,'Destination images would give away the answer');
 const bank=require('../visuals.js');
 for(const item of climate.data.items){
  const pic=climate.data.itemVisuals[item.id];assert(pic&&pic.asset==='earth-climate-causes');
  assert(bank.assets[pic.asset]);
  assert(bank.describe(pic.asset,pic.panel));
  assert.match(bank.scene(pic.asset,pic.panel),/scene-art/);
 }
 assert(require('../core.js').grade(climate,climate.answer).correct);
});
