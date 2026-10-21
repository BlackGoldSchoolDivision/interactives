const test=require('node:test'),assert=require('node:assert/strict');
const E=require('../energy.js'),C=require('../core.js'),V=require('../visuals.js');
const by=id=>E.questions.find(q=>q.id===id);
test('Two Energy flowchart pilots preserve exactly the original answer maps and scoring',()=>{
 const a=by('management-07'),b=by('management-13');
 assert.equal(a.data.layout,'energy-branch-flow');
 assert.equal(b.data.layout,'energy-stage-flow');
 assert.equal(a.type,'sort');assert.equal(b.type,'label');
 assert.deepEqual(a.answer,{sail:'direct',wheel:'direct',lamp:'processed',fuel:'processed'});
 assert.deepEqual(b.answer,{resource:'A',output:'B',use:'C'});
 for(const q of [a,b]){assert(C.grade(q,q.answer).correct);assert(C.complete(q,q.answer));assert(!C.complete(q,{}));}
});
test('The photo cards depict only accurate resource examples and no destination image duplicates',()=>{
 const a=by('management-07');
 assert.deepEqual(Object.keys(a.data.itemVisuals).sort(),['lamp','sail']);
 assert.deepEqual(a.data.itemVisuals.sail,{asset:'resource-uses',panel:0});
 assert.deepEqual(a.data.itemVisuals.lamp,{asset:'resource-uses',panel:1});
 assert.equal(a.data.zoneImages,undefined);
 for(const pic of Object.values(a.data.itemVisuals)){assert(V.describe(pic.asset,pic.panel));assert(V.scene(pic.asset,pic.panel).includes('<img'));}
 assert(C.hasVisual(a));
});
test('The scientific context diagram does not leak the wind-to-light stage answers',()=>{
 const output=V.render(by('management-13'));
 assert(output.length>100);assert(output.includes('Empty stage'));
 for(const text of ['Moving air turns turbine blades','A generator supplies','A lamp lights'])assert(!output.includes(text));
});
