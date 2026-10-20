const test=require('node:test');
const assert=require('node:assert/strict');
const D=require('../data.js'),C=require('../core.js');
test('54 unique questions, full KUSP statement coverage, two of every format in each group',()=>{
 assert.equal(D.questions.length,54);assert.equal(new Set(D.questions.map(q=>q.id)).size,54);
 for(const g of D.groups){const qs=D.questions.filter(q=>q.group===g.id);assert.equal(qs.length,18);for(const t of C.TYPES)assert.equal(qs.filter(q=>q.type===t).length,2,g.id+' '+t);
 for(const s of ['K','U','SP'])g.source[s].forEach((_,i)=>assert(qs.some(q=>q.refs.includes(g.id+'.'+s+(i+1)))));}
});
test('Every key is accepted, a materially wrong response is rejected, partial placement is incomplete',()=>{
 for(const q of D.questions){assert(C.grade(q,q.answer).correct,q.id);let r;
 if(['single','hotspot'].includes(q.type))r=(q.answer+1)%q.data.options.length;
 else if(q.type==='multi')r=q.data.options.map((_,i)=>i);
 else if(q.type==='numeric')r=q.answer+17;
 else if(q.type==='dropdown')r=q.data.blanks.map((b,i)=>b.options.find(x=>x!==q.answer[i]));
 else if(q.type==='order')r=q.answer.slice().reverse();
 else {r=Object.fromEntries(q.data.items.map(i=>[i.id,q.data.zones.find(z=>z.id!==q.answer[i.id]).id]));assert(!C.complete(q,{}));}
 assert(!C.grade(q,r).correct,q.id+' accepted incorrect response');}
});
test('Format tours cover all nine formats and rounds never repeat a question',()=>{
 for(const g of D.groups){const ids=C.round(D.questions,g.id,9,{},()=>.4);assert.equal(ids.length,9);assert.equal(new Set(ids.map(id=>D.questions.find(q=>q.id===id).type)).size,9);}
 const all=C.round(D.questions,'all','all');assert.equal(all.length,54);assert.equal(new Set(all).size,54);
});
test('Numeric entry supports decimal comma, signs and whitespace, but rejects expressions and units',()=>{
 for(const [s,n] of [[' 14 ',14],['14,5',14.5],['-2',-2],['0',0]])assert.equal(C.number(s),n);
 for(const s of ['',null,'2x','2 + 2','25°C','Infinity'])assert(Number.isNaN(C.number(s)));
});
test('Particle and thermometer image choices have explicit alternatives and correct underlying keys',()=>{
 const images=D.questions.filter(q=>q.data.optionVisuals);assert.equal(images.length,3);for(const q of images)assert.equal(q.data.optionVisuals.length,q.data.options.length);
 assert.equal(D.questions.find(q=>q.id==='temperature-02').data.optionVisuals[1].value,30);
 for(const q of D.questions.filter(q=>q.data.thermo))assert.equal(q.answer,q.data.thermo.value);
});