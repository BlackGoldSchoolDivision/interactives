const test=require('node:test'),assert=require('node:assert/strict');
const Living=require('../living.js'),Core=require('../core.js');
const Matter=require('../data.js'),Energy=require('../energy.js'),Earth=require('../earth.js'),topics=require('../topics.js');
const V=require('../visuals.js');require('../earth-visuals.js');require('../living-visuals.js');
test('Living Systems maps all 36 Grade 6 statements across three goals and 54 questions',()=>{
 assert.equal(Living.version,'living-1.0');assert.equal(Living.groups.length,3);assert.equal(Living.questions.length,54);
 assert.equal(Living.groups.reduce((n,g)=>n+g.source.K.length+g.source.U.length+g.source.SP.length,0),36);
 const all=[...Matter.questions,...Energy.questions,...Earth.questions,...Living.questions];
 assert.equal(all.length,270);assert.equal(new Set(all.map(q=>q.id)).size,270);
 for(const group of Living.groups){
  const qs=Living.questions.filter(q=>q.group===group.id);assert.equal(qs.length,18,group.id);
  for(const type of Core.TYPES)assert.equal(qs.filter(q=>q.type===type).length,2,group.id+' '+type);
  for(const kind of ['K','U','SP'])group.source[kind].forEach((text,i)=>{
   assert(text.length>10);assert(qs.some(q=>q.refs.includes(group.id+'.'+kind+(i+1))),group.id+' missing '+kind+(i+1));
  });
 }
});
test('All Living Systems answer keys are valid and wrong answers are rejected',()=>{
 for(const q of Living.questions){
  assert(Core.complete(q,q.answer),q.id+' incomplete answer key');
  assert(Core.grade(q,q.answer).correct,q.id+' rejected correct key');
  const g=Living.groups.find(g=>g.id===q.group);assert(g);
  for(const ref of q.refs){const m=ref.match(/^([a-z]+)\.(K|U|SP)(\d+)$/);assert(m&&m[1]===q.group&&g.source[m[2]][Number(m[3])-1],q.id+' unknown curriculum reference '+ref);}
  let wrong;
  if(['single','hotspot'].includes(q.type))wrong=(q.answer+1)%q.data.options.length;
  else if(q.type==='multi')wrong=q.data.options.map((_,i)=>i);
  else if(q.type==='numeric')wrong=q.answer+1;
  else if(q.type==='dropdown')wrong=q.data.blanks.map((b,i)=>b.options.find(o=>o!==q.answer[i]));
  else if(q.type==='order')wrong=q.answer.slice().reverse();
  else wrong=Object.fromEntries(q.data.items.map(i=>[i.id,q.data.zones.find(z=>z.id!==q.answer[i.id]).id]));
  assert(!Core.grade(q,wrong).correct,q.id+' falsely accepted an incorrect response');
 }
});
test('All nine interaction formats work within each Living Systems learning goal',()=>{
 for(const goal of Living.groups){
  const ids=Core.round(Living.questions,goal.id,9,{},()=>.4);
  assert.equal(ids.length,9);assert.equal(new Set(ids.map(id=>Living.questions.find(q=>q.id===id).type)).size,9);
  const visuals=Core.round(Living.questions,goal.id,'all',{},()=>.4,'visual');
  assert(visuals.length>=3);assert(visuals.every(id=>Core.hasVisual(Living.questions.find(q=>q.id===id))));
 }
 assert.equal(new Set(Core.round(Living.questions,'all','all')).size,54);
 for(const type of Core.TYPES)assert.equal(Core.round(Living.questions,'all','all',{},()=>.4,type).length,6);
});
test('Original Living Systems diagram models render and leave answers out of sequence boxes',()=>{
 const diagrams=Living.questions.filter(q=>q.data.diagram);assert(diagrams.length>=8);
 for(const q of diagrams){const html=V.render(q);assert(html.length>250,q.id+' missing visual');assert(/aria-label/.test(html),q.id+' missing description');}
 const chain=V.render(Living.questions.find(q=>q.id==='ecosystems-10'));
 assert(chain.includes('Stage 1'));assert(!chain.includes('Sunlight provides energy'), 'Sequence drawing leaks the first step');
});
test('All five learning units are distinct with independent saved progress',()=>{
 assert.deepEqual(topics.map(t=>[t.id,t.data.questions.length]),[['matter',54],['energy',90],['earth',72],['living',54],['space',36]]);
 assert.equal(new Set(topics.map(t=>t.storageKey)).size,5);
 assert.equal(topics[3].storageKey,'science-practice-lab-living-v1');
});
