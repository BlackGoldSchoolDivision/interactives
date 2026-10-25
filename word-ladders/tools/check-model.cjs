const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const M=require('../model.js'),P=require('../pdf.js');
const total=M.puzzles.length;
for(const level of Object.keys(M.levels))assert.equal(M.puzzles.filter(p=>p.level===level).length,20);
assert.equal(new Set(M.puzzles.map(p=>p.id)).size,total,'Every ladder needs a unique ID');
for(const p of M.puzzles){
  assert.equal(p.words.length,6);assert.equal(p.clues.length,6);assert.equal(new Set(p.words).size,6);
  assert(p.clues.every(c=>typeof c==='string'&&c.trim().length>0));
  assert(p.words.every(w=>/^[A-Z]+$/.test(w)&&w.length===p.words[0].length));
  assert(p.level==='starter'?p.words[0].length===3:p.level==='explorer'?p.words[0].length===4:[5,6].includes(p.words[0].length));
  const trail=[p.words[0]];for(let i=1;i<6;i++){assert.equal(M.changes(trail.at(-1),p.words[i]),1);assert(M.bank.has(p.words[i]));const r=M.check(p,trail,p.words[i]);assert(r.ok,p.id+': '+r.message);assert.equal(r.complete,i===5);trail.push(r.word);}
}
const p=M.puzzles[0];assert(!M.check(p,['HEAD'],'HEAD').ok);assert(!M.check(p,['HEAD'],'TAIL').ok);assert(!M.check(p,['HEAD'],'HEA').ok);assert(!M.check(p,['HEAD'],'HEAR').ok,'Clue trail should follow meaning clues');assert(M.check(p,['HEAD'],'HEAR','free').ok,'Other valid routes must be accepted in free climb');
let trail=['HEAD'];for(const w of ['HEAR','HEIR','HAIR','HAIL','TAIL']){const r=M.check(p,trail,w,'free');assert(r.ok,w);trail.push(w);}assert.equal(trail.at(-1),'TAIL');
const r=M.route('HEAD','TAIL');assert(r&&r.length>1);for(let i=1;i<r.length;i++)assert.equal(M.changes(r[i-1],r[i]),1);
assert.equal(M.hint(p,['HEAD'],'guided').next,'HEAL');assert.equal(M.hint(p,['HEAD'],'guided').position,4);
const out=path.join(__dirname,'..','validation');fs.mkdirSync(out,{recursive:true});
const plan=P.pages(M.puzzles,true);assert.equal(plan.length,total*2);assert(plan.slice(0,total).every(p=>!p.key));assert(plan.slice(total).every(p=>p.key));
fs.writeFileSync(path.join(out,'check-all.pdf'),Buffer.from(P.build(M.puzzles,{answerKey:true}).output('arraybuffer')));
console.log(`Passed ${total} original six-word ladders, ${total*5} single-letter changes, level counts, clue validation, alternative routes, hints, and worksheet/key separation.`);
