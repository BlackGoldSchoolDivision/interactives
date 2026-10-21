const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const D=require('../data.js'),V=require('../visuals.js'),C=require('../core.js');const manifest=require('../assets/image-bank.json');
const ids=['particles-02','particles-13','temperature-02','expansion-02','expansion-13'];
const q=id=>D.questions.find(x=>x.id===id);
test('First Matter pilot keeps five original scored keys and independent format types',()=>{
 assert.deepEqual(ids.map(id=>q(id).type),['single','label','single','single','label']);
 assert.deepEqual(ids.map(id=>q(id).answer),[2,{m:'A',v:'B',c:'C',f:'D'},1,1,{cool:'A',warm:'B'}]);
 for(const id of ids)assert(C.grade(q(id),q(id).answer).correct,id);
 assert.equal(q('particles-02').data.optionVisuals.length,4);
 assert(q('particles-02').data.optionVisuals.every(x=>x.kind==='particle'));
});
test('All four original context assets exist and are qualitative, not scoring models',()=>{
 const assetIds=['phase-change-scenes','thermometer-study','equal-mass-ice-water','bridge-joint-seasons'];
 for(const id of assetIds){
  const a=V.assets[id],item=manifest.assets.find(x=>x.id===id);
  assert(a&&item,id+' missing artwork metadata');
  assert.equal(item.web,a.file);
  assert.equal(item.approvedFor,'qualitative context only');
  assert(a.alts.length>=2);
  const file=path.join(__dirname,'..','assets',a.file);
  assert(fs.statSync(file).size>1000,file+' empty');
  assert(fs.statSync(file).size<150000,file+' oversized');
  assert(V.scene(id,0).includes(a.file));
 }
});
test('Scene gallery is descriptive, correctly cropped and never contains correct answer keys',()=>{
 const expected={'particles-13':4,'expansion-02':2,'expansion-13':2};
 for(const [id,n] of Object.entries(expected)){
  const x=q(id),strip=x.data.sceneStrip;
  assert(strip&&strip.panels.length===n,id);
  const gallery=V.sceneStrip(strip);
  assert.equal((gallery.match(/class="scene-art"/g)||[]).length,n,id);
  assert(!gallery.includes('data-zone='));
  assert(!gallery.includes('Correct answer'));
  assert(strip.panels.every(i=>V.describe(strip.asset,i).length>10));
 }
 assert.equal(q('temperature-02').data.photo.asset,'thermometer-study');
 const imageIds=new Set(Object.keys(V.assets));
 for(const question of D.questions){
  if(question.data.photo)assert(imageIds.has(question.data.photo.asset),question.id);
  if(question.data.sceneStrip)assert(imageIds.has(question.data.sceneStrip.asset),question.id);
 }
});
