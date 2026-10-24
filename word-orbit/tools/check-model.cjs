const assert=require('node:assert/strict');
const M=require('../model.js');
const part=(text,side='suffix')=>({text,side});
let s=M.create();
let r=M.attempt(s,part('re','prefix'));assert.equal(s.current,'replay');assert(!r.terminal);
r=M.attempt(s,part('ing'));assert.equal(s.current,'replaying');assert(r.terminal);assert.equal(s.score,20);
M.reset(s);assert.equal(s.current,'play');assert(s.found[0].has('replaying'));
M.attempt(s,part('mis','prefix'));r=M.attempt(s,part('ed'));assert.equal(s.current,'misplayed');assert(r.terminal);
M.reset(s);r=M.attempt(s,part('re','prefix'));assert(!r.fresh);assert.equal(r.delta,0);assert(!r.terminal,'Replay has other uncollected extensions');
let score=s.score;r=M.attempt(s,part('tion'));assert(!r.ok);assert.equal(s.current,'replay');assert.equal(s.score,score-3);
M.switchFamily(s,3);M.attempt(s,part('ing'));assert.equal(s.current,'caring');assert(M.node(s).note.includes('e'));
M.reset(s);assert.equal(s.current,'care');assert(s.found[0].has('misplayed'),'Changing family preserves collections');
let words=0;
for(let i=0;i<M.decks.length;i++){
  const d=M.decks[i],reached=new Set([d.base]),q=[d.base];
  assert.equal(new Set(d.words.map(n=>n.word)).size,d.words.length);
  for(let j=0;j<q.length;j++)for(const e of d.edges.get(q[j]))if(!reached.has(e.to)){reached.add(e.to);q.push(e.to);}
  assert.equal(reached.size,d.nodes.length,'Every word must be reachable in '+d.base);
  for(const n of d.nodes){
    s=M.create();M.switchFamily(s,i);s.current=n.word;
    for(let wave=0;wave<12;wave++){
      const candidates=M.candidates(s,wave);assert(candidates.length<=6);
      assert.equal(new Set(candidates.map(M.affixKey)).size,candidates.length);
      if(d.edges.get(n.word).length)assert(candidates.some(p=>d.edges.get(n.word).some(e=>M.affixKey(e)===M.affixKey(p))),'Every wave preserves a useful match');
      for(const p of candidates)if(p.decoy)assert(!d.edges.get(n.word).some(e=>M.affixKey(e)===M.affixKey(p)),'A decoy cannot hide a supported word');
    }
  }
  s=M.create();M.switchFamily(s,i);
  // Collect every graph edge through genuine model transitions. Already found
  // words remain usable as bridges, and points depend only on new discoveries.
  for(const n of d.nodes)for(const e of d.edges.get(n.word)){s.current=n.word;M.attempt(s,e);}
  assert(M.complete(s));assert.equal(s.score,d.words.length*10);assert(!M.hasNew(d,d.base,s.found[i]));
  words+=d.words.length;
}
const examples=[
  ['box',[part('es')],'boxes'],
  ['pony',[part('es')],'ponies'],
  ['leaf',[part('es')],'leaves'],
  ['jump',[part('y'),part('er')],'jumpier'],
  ['read',[part('able'),part('ity')],'readability'],
  ['art',[part('ist')],'artist'],
  ['act',[part('or')],'actor'],
  ['agree',[part('dis','prefix'),part('ment')],'disagreement'],
  ['hero',[part('super','prefix'),part('es')],'superheroes'],
  ['music',[part('ian')],'musician'],
  ['danger',[part('ous'),part('ly')],'dangerously'],
  ['assist',[part('ant')],'assistant'],
  ['depend',[part('ent'),part('in','prefix'),part('ly')],'independently'],
  ['dark',[part('en'),part('ing')],'darkening'],
  ['modern',[part('ize'),part('ation')],'modernization'],
  ['flex',[part('ible'),part('ity')],'flexibility']
];
for(const [base,parts,expected] of examples){s=M.create();M.switchFamily(s,M.decks.findIndex(d=>d.base===base));for(const p of parts)assert(M.attempt(s,p).ok,base+' must accept '+p.text);assert.equal(s.current,expected);assert.equal(s.score,parts.length*10);}
s=M.create();M.switchFamily(s,M.decks.findIndex(d=>d.base==='danger'));
for(let wave=0;wave<20;wave++)assert(!M.candidates(s,wave).some(p=>p.text==='ous'&&p.decoy),'-ous must never be a decoy when dangerous can be made');
assert(M.attempt(s,part('ous')).ok);assert.equal(s.score,10);
console.log('Passed: '+words+' reachable words in '+M.decks.length+' families, curriculum examples, chained affixes, branch completion, score integrity, context-sensitive decoys, spelling changes, and fair incoming waves.');
