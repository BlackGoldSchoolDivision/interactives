const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const here=path.join(__dirname,'..','assets');
const planned=require('../assets/asset-plan.json'),templates=require('../assets/template-catalogue.json'),live=require('../assets/image-bank.json');
const M=require('../data.js'),E=require('../energy.js'),Earth=require('../earth.js'),C=require('../core.js');
const questions=[...M.questions,...E.questions,...Earth.questions],ids=new Set(questions.map(q=>q.id));
test('Future asset plan cannot masquerade as existing released images',()=>{
 assert.equal(planned.status,'planned-not-generated');
 assert.equal(planned.existingBank,'image-bank.json');
 assert(live.assets.length>0);
 const imageIds=new Set(),files=new Set();
 for(const a of planned.assets){
  assert.match(a.id,/^(matter|energy|earth|shared)--[a-z0-9-]+$/);
  assert(!imageIds.has(a.id),a.id+' duplicated');imageIds.add(a.id);
  assert(!files.has(a.file),a.file+' duplicated');files.add(a.file);
  assert(['P0','P1','P2'].includes(a.priority));assert.equal(a.status,'planned');
  assert(a.file.startsWith(a.unit+'/')&&a.file.endsWith('.png'));
  assert.equal(a.web,a.file.replace(/\.png$/,'.webp'));
  assert(a.description.length>20);
  assert(a.questionIds.every(id=>ids.has(id)),a.id+' references unknown question');
 }
 assert(planned.assets.filter(a=>a.priority==='P0').length>=5);
 assert(planned.assets.some(a=>a.unit==='earth'));
});
test('Visual redesign names fifteen existing pilot questions and preserves current scoring types',()=>{
 for(const [unit,b] of [['matter',M],['energy',E],['earth',Earth]]){
  const pilot=planned.pilotQuestionIds[unit];assert.equal(pilot.length,5);assert.equal(new Set(pilot).size,5);
  for(const id of pilot)assert(b.questions.some(q=>q.id===id),unit+' invalid pilot '+id);
 }
 assert.equal(questions.length,216);
 assert.equal(new Set(questions.map(q=>q.id)).size,216);
 assert(templates.layouts.length>=10);
 const templateIds=new Set();for(const l of templates.layouts){assert(!templateIds.has(l.id));templateIds.add(l.id);
  assert(l.existingTypes.every(type=>C.TYPES.includes(type)),l.id+' invalid scoring type');
  assert(l.spec.length>30);
 }
});
