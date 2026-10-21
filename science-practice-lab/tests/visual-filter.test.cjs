const test=require('node:test'),assert=require('node:assert/strict');
const Core=require('../core.js'),Matter=require('../data.js'),Energy=require('../energy.js');
test('Picture and diagram practice selects only illustrated questions',()=>{
 for(const [data,count] of [[Matter,36],[Energy,42]]){
  const illustrated=data.questions.filter(Core.hasVisual);
  assert.equal(illustrated.length,count);
  const ids=Core.round(data.questions,'all','all',{},()=>0.4,'visual');
  assert.equal(ids.length,count);assert.equal(new Set(ids).size,count);
  assert(ids.every(id=>Core.hasVisual(data.questions.find(q=>q.id===id))));
  assert(illustrated.some(q=>q.data.photo));
  assert(illustrated.some(q=>q.data.diagram||q.visual));
  for(const goal of data.groups){
   const goalIds=Core.round(data.questions,goal.id,'all',{},()=>0.4,'visual');
   assert(goalIds.length>0);
   assert(goalIds.every(id=>data.questions.find(q=>q.id===id).group===goal.id));
  }
  assert.equal(Core.round(data.questions,'all',9,{},()=>0.4,'visual').length,9);
 }
});
test('Visual filter preserves normal selection and question content',()=>{
 for(const bank of [Matter.questions,Energy.questions]){
  assert.equal(Core.round(bank,'all','all',{},()=>0.4).length,bank.length);
  const ids=Core.round(bank,'all',9,{},()=>0.4);
  assert.equal(new Set(ids.map(id=>bank.find(q=>q.id===id).type)).size,9);
  assert.equal(Core.round(bank,'all','all',{},()=>0.4,'numeric').length,bank.filter(q=>q.type==='numeric').length);
 }
 assert.equal(Core.hasVisual({data:{}}),false);
 assert.equal(Core.hasVisual({data:{photo:{asset:'sample',panel:0}}}),true);
 assert.equal(Core.hasVisual({data:{itemVisuals:{x:{asset:'sample',panel:0}}}}),true);
});
