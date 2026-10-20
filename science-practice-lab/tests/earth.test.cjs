const test=require('node:test'),assert=require('node:assert/strict');
const D=require('../earth.js'),M=require('../data.js'),E=require('../energy.js'),C=require('../core.js');
const V=require('../visuals.js');require('../earth-visuals.js');
const topics=require('../topics.js');
test('Earth Systems has 72 questions, four learning groups, complete 37-statement coverage',()=>{
 assert.equal(D.version,'earth-1.0');assert.equal(D.questions.length,72);assert.equal(D.groups.length,4);
 assert.equal(D.groups.reduce((n,g)=>n+g.source.K.length+g.source.U.length+g.source.SP.length,0),37);
 assert.equal(new Set([...M.questions,...E.questions,...D.questions].map(q=>q.id)).size,216);
 for(const g of D.groups){
  const items=D.questions.filter(q=>q.group===g.id);assert.equal(items.length,18,g.id);
  for(const format of C.TYPES)assert.equal(items.filter(q=>q.type===format).length,2,g.id+' '+format);
  for(const type of ['K','U','SP'])g.source[type].forEach((_,i)=>assert(items.some(q=>q.refs.includes(g.id+'.'+type+(i+1))),g.id+' uncovered '+type+(i+1)));
 }
 for(const q of D.questions)for(const ref of q.refs){
  const match=ref.match(/^([a-z]+)\.(K|U|SP)(\d+)$/);
  assert(match&&D.groups.find(g=>g.id===match[1])?.source[match[2]][Number(match[3])-1],q.id+' invalid ref '+ref);
 }
});
test('All Earth question keys accepted and representative wrong answers rejected',()=>{
 for(const q of D.questions){
  assert(C.complete(q,q.answer),q.id+' correct response incomplete');
  assert(C.grade(q,q.answer).correct,q.id+' correct key rejected');
  let wrong;
  if(['single','hotspot'].includes(q.type))wrong=(q.answer+1)%q.data.options.length;
  else if(q.type==='multi')wrong=q.data.options.map((_,i)=>i);
  else if(q.type==='numeric')wrong=q.answer+2;
  else if(q.type==='dropdown')wrong=q.data.blanks.map((b,i)=>b.options.find(s=>s!==q.answer[i]));
  else if(q.type==='order')wrong=q.answer.slice().reverse();
  else wrong=Object.fromEntries(q.data.items.map(i=>[i.id,q.data.zones.find(z=>z.id!==q.answer[i.id]).id]));
  assert(!C.grade(q,wrong).correct,q.id+' accepted wrong answer');
  if(['sort','match','label'].includes(q.type))assert(!C.complete(q,{}),q.id+' accepted empty diagram');
 }
});
test('Earth nine-format tours, visual-only rounds, and selected learning goals work',()=>{
 for(const g of D.groups){
  const ids=C.round(D.questions,g.id,9,{},()=>.4);
  assert.equal(ids.length,9);
  assert.equal(new Set(ids.map(id=>D.questions.find(q=>q.id===id).type)).size,9);
  const visual=C.round(D.questions,g.id,'all',{},()=>.4,'visual');
  assert(visual.length>=2);
  assert(visual.every(id=>C.hasVisual(D.questions.find(q=>q.id===id))));
 }
 assert.equal(new Set(C.round(D.questions,'all','all')).size,72);
 for(const type of C.TYPES)assert.equal(C.round(D.questions,'all','all',{},()=>.4,type).length,8,type);
});
test('Earth diagrams supply descriptive visual content and answer destinations',()=>{
 const diagrams=D.questions.filter(q=>q.data.diagram);
 assert.equal(diagrams.length,8);
 for(const q of diagrams){
  const view=V.render(q);
  assert(view.length>200,q.id+' diagram not rendered');
  assert(view.includes('aria-label'),q.id+' diagram lacks descriptions');
  assert(q.data.zones.every(z=>view.includes(z.id)),q.id+' visual missing a zone letter');
 }
});
test('Three topics use distinct storage and retain unchanged Matter and Energy',()=>{
 assert.deepEqual(topics.map(t=>[t.id,t.data.questions.length]),[['matter',54],['energy',90],['earth',72]]);
 assert.equal(new Set(topics.map(t=>t.storageKey)).size,3);
 assert.equal(topics[0].storageKey,'science-practice-lab-matter-v1');
 assert.equal(topics[1].storageKey,'science-practice-lab-energy-v1');
 assert.equal(topics[2].storageKey,'science-practice-lab-earth-v1');
});
