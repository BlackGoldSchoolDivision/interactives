const test=require('node:test'),assert=require('node:assert/strict');
const E=require('../energy.js'),M=require('../data.js'),C=require('../core.js'),V=require('../visuals.js'),topics=require('../topics.js');
test('Energy has 90 distinct questions, five groups, all 40 statements and two of every format per group',()=>{
 assert.equal(E.questions.length,90);assert.equal(E.groups.length,5);
 assert.equal(E.groups.reduce((n,g)=>n+['K','U','SP'].reduce((a,k)=>a+g.source[k].length,0),0),40);
 assert.equal(new Set([...M.questions,...E.questions].map(q=>q.id)).size,144);
 for(const g of E.groups){const qs=E.questions.filter(q=>q.group===g.id);assert.equal(qs.length,18);for(const t of C.TYPES)assert.equal(qs.filter(q=>q.type===t).length,2,g.id+' '+t);
 for(const s of ['K','U','SP'])g.source[s].forEach((_,i)=>assert(qs.some(q=>q.refs.includes(g.id+'.'+s+(i+1))),g.id+'.'+s+(i+1)));}
 for(const q of E.questions)for(const r of q.refs){const match=r.match(/^([a-z]+)\.(K|U|SP)(\d+)$/);assert(match&&E.groups.find(g=>g.id===match[1])?.source[match[2]][+match[3]-1],q.id+' invalid ref '+r);}
});
test('All Energy keys are accepted and materially wrong responses are rejected',()=>{
 for(const q of E.questions){assert(C.grade(q,q.answer).correct,q.id);let wrong;
 if(['single','hotspot'].includes(q.type))wrong=(q.answer+1)%q.data.options.length;
 else if(q.type==='multi')wrong=q.data.options.map((_,i)=>i);
 else if(q.type==='dropdown')wrong=q.data.blanks.map((b,i)=>b.options.find(s=>s!==q.answer[i]));
 else if(q.type==='numeric')wrong=q.answer+11;
 else if(q.type==='order')wrong=q.answer.slice().reverse();
 else wrong=Object.fromEntries(q.data.items.map(i=>[i.id,q.data.zones.find(z=>z.id!==q.answer[i.id]).id]));
 assert(!C.grade(q,wrong).correct,q.id+' accepted wrong response');}
});
test('Each Energy goal supports nine-format tours and all-round selection without repeats',()=>{
 for(const g of E.groups){const ids=C.round(E.questions,g.id,9,{},()=>.3);assert.equal(new Set(ids.map(id=>E.questions.find(q=>q.id===id).type)).size,9);}
 const all=C.round(E.questions,'all','all');assert.equal(all.length,90);assert.equal(new Set(all).size,90);
 for(const type of C.TYPES){const ids=C.round(E.questions,'all','all',{},()=>.4,type);assert.equal(ids.length,10);assert(ids.every(id=>E.questions.find(q=>q.id===id).type===type));}
});
test('Topics have distinct storage keys and keep the legacy Matter bank identity',()=>{
 assert.deepEqual(topics.map(t=>[t.id,t.data.questions.length]),[['matter',54],['energy',90],['earth',72],['living',54],['space',36]]);
 assert.equal(topics[0].storageKey,'science-practice-lab-matter-v1');assert.equal(new Set(topics.map(t=>t.storageKey)).size,5);assert.equal(M.version,'matter-1.0');
});
test('Every Energy diagram and image option renders an interpretable source',()=>{
 for(const q of E.questions){if(q.data.diagram)assert(V.render(q).length>80,q.id);
 for(const [i,v] of (q.data.optionVisuals||[]).entries()){assert(V.canRender(v));assert(V.optionArt(v,i,q).length>50,q.id);}}
 for(const q of M.questions.filter(q=>q.data.scenePair))assert(V.render(q).includes('balance-reading'));
 const reaction=E.questions.find(q=>q.id==='reactions-02'),model=reaction.data.optionVisuals[reaction.answer];assert.equal(model.left,'left');assert.equal(model.right,'right');assert.equal(model.equal,true);assert.equal(model.sameObject,false);
 const recovery=E.questions.find(q=>q.id==='properties-02'),r=recovery.data.optionVisuals[recovery.answer];assert.equal(r.before,r.after);assert.notEqual(r.before,r.during);
 const choice=E.questions.find(q=>q.id==='choices-02'),site=choice.data.optionVisuals[choice.answer];assert.deepEqual([site.resource,site.access,site.habitat],['Reliable','Road available','Low impact']);
});
test('Measured models agree with their answers and keep new scientific terms distinct',()=>{
 const scale=E.questions.find(q=>q.id==='forces-17');assert.equal(scale.answer,scale.data.scale.value);
 const arrow=E.questions.find(q=>q.id==='reactions-18');assert.equal(arrow.answer,arrow.data.arrowUnits*arrow.data.newtonsPerUnit);
 const elastic=E.questions.find(q=>q.id==='properties-17').data.table.rows;assert.equal(elastic[0][1],elastic[2][1]);
 const examples=E.questions.filter(q=>['choices-10','choices-17','choices-18'].includes(q.id));assert(examples.every(q=>JSON.stringify(q.data).toLowerCase().includes('example')));
});

test('Question photographs and image destinations have valid assets, crops and descriptions',()=>{
 for(const q of [...M.questions,...E.questions]){
  const scenes=[...(q.data.photo?[q.data.photo]:[]),...Object.values(q.data.zoneImages||{})];
  for(const p of scenes){assert(V.assets[p.asset],q.id+' missing asset');assert(V.describe(p.asset,p.panel).length>10);assert(V.scene(p.asset,p.panel).includes(V.assets[p.asset].file));}
  if(q.data.photo)assert(V.contextPhoto(q.data.photo).includes(q.data.photo.caption));
  if(q.data.zoneImages)assert.deepEqual(Object.keys(q.data.zoneImages).sort(),q.data.zones.map(z=>z.id).sort());
 }
 for(const a of Object.values(V.assets))for(const f of a.frames||[]){assert(f[0]>=0&&f[1]>=0&&f[2]>0&&f[3]>0);assert(f[0]+f[2]<=1.0001&&f[1]+f[3]<=1.0001);}
});
