const test=require('node:test'),assert=require('node:assert/strict');
const E=require('../energy.js'),M=require('../data.js'),Earth=require('../earth.js'),C=require('../core.js'),V=require('../visuals.js');
test('Original image cards across three Energy placements preserve keys and avoid duplicate answer photographs',()=>{
 for(const id of ['forces-07','forces-08','forces-12']){
  const q=E.questions.find(x=>x.id===id);assert(q);assert.equal(q.data.items.length,4);
  assert.equal(Object.keys(q.data.itemVisuals||{}).length,4);assert.equal(Object.keys(q.data.zoneImages||{}).length,0);
  for(const item of q.data.items){const pic=q.data.itemVisuals[item.id];assert(pic);assert(V.assets[pic.asset]);assert(V.describe(pic.asset,pic.panel));assert.match(V.scene(pic.asset,pic.panel),/scene-art/);}
  assert(C.hasVisual(q));assert(C.grade(q,q.answer).correct);assert(!C.grade(q,{}).correct);
 }
});
test('Existing unit totals and question IDs remain stable',()=>{
 assert.deepEqual([M.questions.length,E.questions.length,Earth.questions.length],[54,90,72]);
 assert.equal(new Set([...M.questions,...E.questions,...Earth.questions].map(q=>q.id)).size,216);
 assert.equal(E.questions.filter(C.hasVisual).length,43);
});
