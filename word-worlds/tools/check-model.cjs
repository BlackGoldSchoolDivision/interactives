const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const W=require('../model.js'),L=require('../../literal-chaos/model.js');
assert.equal(W.challenges.length,12);assert.equal(new Set(W.challenges.map(c=>c.id)).size,12);
for(const c of W.challenges){const p=W.pair(c);assert(W.valid(p.a));assert(!W.different(p));p.b.verb='howled';assert(W.different(p));assert.notEqual(W.sentence(p.a),W.sentence(p.b));}
let combinations=0;for(const subject of W.subjects)for(const verb of Object.keys(W.verbs))for(const mood of Object.keys(W.moods))for(const world of Object.keys(W.worlds)){const v={subject,verb,mood,world};assert(W.valid(v));assert(W.sentence(v).endsWith(world+'.'));combinations++;}assert.equal(combinations,768);
assert.equal(L.data.length,36);assert.equal(new Set(L.data.map(q=>q.id)).size,36);
for(const level of Object.keys(L.levels)){
 assert.equal(L.bank(level,'mixed').length,12);
 for(const type of Object.keys(L.types)){let r=L.round(level,type,200);assert(r.ids.length>0);assert.equal(new Set(r.ids).size,r.ids.length);for(const id of r.ids){const q=L.data.find(q=>q.id===id);r.selected=L.options(q,r.seed).findIndex(o=>!o.correct);r=L.check(r,q);assert.equal(r.solved,false);r.selected=L.options(q,r.seed).findIndex(o=>o.correct);r=L.check(r,q);const score=r.score;r=L.check(r,q);assert.equal(r.score,score);assert(r.solved);r={...r,index:r.index+1,selected:-1,attempts:0,solved:false};}assert.equal(r.collected.length,r.ids.length);assert.equal(r.score,r.ids.length*50);}
}
for(const q of L.data){for(const k of ['phrase','meaning','context','evidence','literalCaption','scene'])assert(q[k]?.length,k+' '+q.id);assert.equal(new Set(q.choices).size,3);assert.equal(q.meaning,q.choices[0]);assert(fs.existsSync(path.join(__dirname,'../../literal-chaos/assets',q.scene+'.webp')));}
console.log('Validated 768 Word Worlds combinations, 12 open challenges, 36 contextual expressions, every level/type bank, retry scoring and duplicate submission protection.');
