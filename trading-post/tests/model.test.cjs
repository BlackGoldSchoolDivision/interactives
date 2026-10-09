const test=require('node:test'),assert=require('node:assert/strict'),M=require('../model.js');
const rng=(...faces)=>{let n=0;return ()=>((faces[n++%faces.length]-1)+.1)/6;};
function ready(role,faces=[1,3,6]){let s=M.fresh(role);for(const n of faces)s=M.roll(s,rng(n));return M.enter(M.arrive(s,rng(1,2,6)));}
test('original item scores and three dice lots are retained for both roles',()=>{
 assert.deepEqual(M.list('fur').map(i=>i.points),[10,5,4,3,2,1]);assert.deepEqual(M.list('goods').map(i=>i.points),[10,5,4,3,2,1]);
 for(const role of ['community','merchant']){let s=M.fresh(role);s=M.roll(s,rng(3));s=M.roll(s,rng(5));s=M.roll(s,rng(6));assert.deepEqual(s.rolls,[3,5,6]);const ids=M.list(M.kind(role)).map(i=>i.id);assert.equal(s.own[ids[2]],3);assert.equal(s.own[ids[4]],5);assert.equal(s.own[ids[5]],6);assert.equal(M.roll(s,rng(1)),s);}
});
test('offers cannot overspend shelves, trade received items back, or exchange without both sides',()=>{
 let s=ready('community');s=M.stage(s,'give','beaver',99);assert.equal(s.give.beaver,1);s=M.stage(s,'take','musket',99);assert.equal(s.take.musket,1);assert.equal(M.stage(s,'give','musket',1),s);assert.equal(M.stage(s,'take','beaver',1),s);s=M.stage(s,'take','musket',-99);assert.equal(M.valid(s),false);assert.equal(M.proposal(s),null);
});
test('accepted deals conserve inventory and points; repeated acceptance cannot spend twice',()=>{
 for(const role of ['community','merchant']){let s=ready(role);const own=M.list(M.kind(role))[0].id,other=M.list(M.opposite(role))[0].id;s=M.stage(s,'give',own,1);s=M.stage(s,'take',other,1);s=M.negotiate(s);assert.equal(s.pending.kind,'agreement');const before=M.value(s.own)+M.value(s.stock),next=M.accept(s);assert.equal(M.value(next.own)+M.value(next.stock)+M.value(next.partners[0].received),before);assert.equal(M.score(next),10);assert.equal(next.log.length,1);assert.equal(M.accept(next),next);assert.equal(s.own[own],1);}
});
test('counteroffers are affordable and valid and changing an offer cancels its pending agreement',()=>{
 let s=ready('community',[6,6,6]);s=M.stage(s,'give','muskrat',1);s=M.stage(s,'take','musket',1);s=M.negotiate(s);assert.equal(s.pending.kind,'counter');assert.ok(M.valid(s,s.pending.give,s.pending.take));assert.ok(M.acceptable(s,s.pending.give,s.pending.take));assert.ok(s.pending.give.muskrat>1);s=M.stage(s,'take','musket',-1);assert.equal(s.pending,null);assert.equal(M.accept(s),s);
});
test('round changes retain received goods and unspent originals; untraded stock scores zero',()=>{
 let s=ready('merchant');s=M.stage(s,'give','musket',1);s=M.stage(s,'take','otter',1);s=M.accept(M.negotiate(s));const own={...s.own};s=M.advance(s,rng(4,5,6));assert.equal(s.phase,'between');assert.equal(s.round,2);assert.deepEqual(s.own,own);assert.equal(s.log.length,1);s=M.enter(s);s=M.advance(s);assert.equal(s.phase,'home');s=M.finish(s);assert.equal(s.phase,'results');assert.equal(M.score(s),5);assert.ok(M.total(s.own,'goods')>0);assert.equal(M.advance(s),s);
});
test('trading all starting stock finishes early, as in the original classroom game',()=>{
 let s=ready('community',[1,1,1]);s=M.stage(s,'give','beaver',3);s=M.stage(s,'take','musket',1);s=M.accept(M.negotiate(s));assert.equal(M.total(s.own,'fur'),0);s=M.advance(s);assert.equal(s.phase,'home');assert.equal(s.round,1);
});
test('partial rolls, staged offers, counters and finished visits restore; invalid saved transitions are rejected',()=>{
 let s=M.roll(M.fresh('merchant'),rng(3));assert.deepEqual(M.restore(JSON.parse(JSON.stringify(s))),s);
 s=ready('community',[6,6,6]);s=M.negotiate(M.stage(M.stage(s,'give','muskrat',1),'take','musket',1));const restored=M.restore(JSON.parse(JSON.stringify(s)));assert.deepEqual(restored.pending,s.pending);assert.deepEqual(M.accept(restored),M.accept(s));
 const broken={...s,rolls:[]};assert.equal(M.restore(broken),null);assert.equal(M.restore({...s,version:99}),null);const tampered=JSON.parse(JSON.stringify(s));tampered.give.muskrat=999;tampered.pending.give.muskrat=999;const safe=M.restore(tampered);assert.equal(safe.give.muskrat,18);assert.equal(safe.pending,null);
});
