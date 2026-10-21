const test=require('node:test'),assert=require('node:assert/strict');
const S=require('../space.js'),C=require('../core.js'),V=require('../visuals.js');require('../space-visuals.js');
const M=require('../data.js'),E=require('../energy.js'),Earth=require('../earth.js'),Living=require('../living.js'),topics=require('../topics.js');
test('Space covers the exact 26 Grade 6 K/U/SP statements in two goals and all 36 questions',()=>{
 assert.equal(S.version,'space-1.0');assert.equal(S.groups.length,2);assert.equal(S.questions.length,36);
 assert.equal(S.groups.reduce((n,g)=>n+g.source.K.length+g.source.U.length+g.source.SP.length,0),26);
 const all=[...M.questions,...E.questions,...Earth.questions,...Living.questions,...S.questions];
 assert.equal(all.length,306);assert.equal(new Set(all.map(q=>q.id)).size,306);
 for(const g of S.groups){
  const qs=S.questions.filter(q=>q.group===g.id);assert.equal(qs.length,18);
  for(const type of C.TYPES)assert.equal(qs.filter(q=>q.type===type).length,2,g.id+' '+type);
  for(const type of ['K','U','SP'])g.source[type].forEach((text,i)=>{
   assert(text.length>15);
   const ref=g.id+'.'+type+(i+1);
   assert(qs.some(q=>q.refs.includes(ref)),'Uncovered curriculum '+ref);
  });
 }
 for(const q of S.questions)for(const ref of q.refs){
  const m=ref.match(/^([a-z]+)\.(K|U|SP)(\d+)$/);
  assert(m&&m[1]===q.group&&S.groups.find(g=>g.id===m[1])?.source[m[2]][Number(m[3])-1],q.id+' reference '+ref);
 }
});
test('All Space correct responses score fully, and representative wrong responses fail',()=>{
 for(const q of S.questions){
  assert(C.complete(q,q.answer),q.id+' incomplete key');
  assert(C.grade(q,q.answer).correct,q.id+' rejected correct key');
  let wrong;
  if(['single','hotspot'].includes(q.type))wrong=(q.answer+1)%q.data.options.length;
  else if(q.type==='multi')wrong=q.data.options.map((_,i)=>i);
  else if(q.type==='dropdown')wrong=q.data.blanks.map((b,i)=>b.options.find(o=>o!==q.answer[i]));
  else if(q.type==='numeric')wrong=q.answer+1;
  else if(q.type==='order')wrong=q.answer.slice().reverse();
  else wrong=Object.fromEntries(q.data.items.map(i=>[i.id,q.data.zones.find(z=>z.id!==q.answer[i.id]).id]));
  assert(!C.grade(q,wrong).correct,q.id+' falsely accepted wrong response');
 }
});
test('Each Space goal provides nine-format tours and visual-only practice',()=>{
 for(const goal of S.groups){
  const nine=C.round(S.questions,goal.id,9,{},()=>.4);
  assert.equal(nine.length,9);assert.equal(new Set(nine.map(id=>S.questions.find(q=>q.id===id).type)).size,9);
  const visual=C.round(S.questions,goal.id,'all',{},()=>.4,'visual');
  assert(visual.length>=4);
  assert(visual.every(id=>C.hasVisual(S.questions.find(q=>q.id===id))));
 }
 assert.equal(new Set(C.round(S.questions,'all','all')).size,36);
 for(const type of C.TYPES)assert.equal(C.round(S.questions,'all','all',{},()=>.4,type).length,4);
});
test('Accurate coded diagrams have descriptive alternative text and do not show labelled answers',()=>{
 const diagrams=S.questions.filter(q=>q.data.diagram);
 assert(diagrams.length>=12);
 for(const q of diagrams){
  const html=V.render(q);assert(html.length>250,q.id+' missing model');
  assert(html.includes('aria-label'),q.id+' missing alt text');
  assert(html.includes('not to scale'),q.id+' missing model disclaimer');
  assert(!html.includes('draggable="true"'),q.id+' static diagram behaving as answer control');
 }
 for(const id of ['planetary-13','planetary-14','exploration-13','exploration-14']){
  const q=S.questions.find(q=>q.id===id),art=V.render(q);
  for(const z of q.data.zones)assert(art.includes('>'+z.id+'</text>'),id+' missing zone label '+z.id);
 }
});
test('Five science units have independent progress keys and preserve the existing four',()=>{
 assert.deepEqual(topics.map(t=>[t.id,t.data.questions.length]),[['matter',54],['energy',90],['earth',72],['living',54],['space',36]]);
 assert.equal(new Set(topics.map(t=>t.storageKey)).size,5);
 assert.equal(topics[4].storageKey,'science-practice-lab-space-v1');
 assert.equal(topics[0].storageKey,'science-practice-lab-matter-v1');
});
