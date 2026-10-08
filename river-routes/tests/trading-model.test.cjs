const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const context={window:{},structuredClone};
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../trading-model.js'),'utf8'),context);
const M=context.window.RIVER_TRADE;
const total=s=>M.ids.map(id=>s.own[id]+s.stock[id]);
test('exchanges conserve every good and cannot repeat a cleared agreement',()=>{
  for(const post of ['nwc','hbc']){
    const s=M.fresh(post);s.give.cloth=1;s.give.kettle=1;s.take.fish=2;s.take.pelt=2;
    assert.equal(M.agreeable(post,s),true);
    const before=JSON.stringify(total(s)),next=M.exchange(post,s);
    assert.equal(JSON.stringify(total(next)),before);
    assert.equal(next.own.cloth,1);assert.equal(next.own.fish,2);assert.equal(next.own.pelt,2);
    assert.equal(s.own.cloth,2,'original inventory remains untouched');
    assert.equal(M.exchange(post,next),null,'an exchange needs a new offer');
    assert.notEqual(M.wanted(post,s).join(),M.wanted(post,next).join(),'arrivals change demand');
  }
});
test('overdrawn shelves and empty or forbidden offers are rejected',()=>{
  const s=M.fresh('nwc');s.give.kettle=2;s.take.pelt=1;
  assert.equal(M.exchange('nwc',s),null);
  s.give.kettle=1;s.take.pelt=9;assert.equal(M.valid(s),false);
  s.take=M.empty();assert.equal(M.valid(s),false);
  s.take.pelt=1;s.give=M.empty();s.give.fish=1;s.own.fish=1;assert.equal(M.valid(s),false);
});
test('both counter-offers are affordable, preserve a two-sided trade, and resolve refusal',()=>{
  for(const post of ['nwc','hbc']){
    const s=M.fresh(post);s.give.beads=1;s.take.pelt=2;
    assert.equal(M.agreeable(post,s),false);
    const counters=M.counters(post,s);
    assert.ok(counters.some(c=>c.kind==='add')); // Offer a more useful good.
    for(const c of counters)assert.equal(M.agreeable(post,s,c.give,c.take),true);
    s.take.pelt=0;s.take.fish=2;
    assert.ok(M.counters(post,s).some(c=>c.kind==='reduce'),'asking for less is an alternative');
    assert.equal(s.own.beads,2,'negotiating does not spend inventory');
  }
});
test('a mixed load can meet the food and fur goal at either post in two exchanges',()=>{
  for(const post of ['nwc','hbc']){
    let s=M.fresh(post);s.give.cloth=1;s.give.kettle=1;s.take.fish=2;s.take.pelt=2;
    s=M.exchange(post,s);assert.equal(M.goal(s),false);
    s.give.tools=1;s.give.beads=1;s.take.pelt=2;
    s=M.exchange(post,s);assert.ok(s);assert.equal(M.goal(s),true);
    assert.equal(M.food(s),2);assert.equal(s.own.pelt,4);assert.equal(s.own.cloth,1);
  }
});
test('reloading keeps the staged counter-offer and sanitizes invalid shelf quantities',()=>{
  const s=M.fresh('hbc');s.give.beads=1;s.take.pelt=2;s.replyKind='counter';
  const restored=M.restore('hbc',JSON.parse(JSON.stringify(s)));
  assert.equal(restored.give.beads,1);assert.equal(restored.take.pelt,2);assert.equal(restored.replyKind,'counter');
  restored.give.cloth=999;restored.take.fish=-1;
  const safe=M.restore('hbc',restored);assert.equal(safe.give.cloth,safe.own.cloth);assert.equal(safe.take.fish,0);
});
test('carried cargo is a separate practice copy including remaining repairs and food',()=>{
  const manifest={counts:{cloth:1,kettle:1,tools:1,beads:1,food:3,repair:0},journeyId:'river-123'};
  const s=M.fresh('nwc',manifest);assert.equal(s.origin,'carried-copy');assert.equal(s.foodReserve,3);assert.equal(s.own.repair,0);
  s.give.kettle=1;s.take.pelt=2;const next=M.exchange('nwc',s);
  assert.equal(next.own.kettle,0);assert.equal(manifest.counts.kettle,1);assert.equal(next.foodReserve,3);
});
test('even an affordable offer cannot overload the canoe; a revised load can fit',()=>{
  const s=M.fresh('nwc');s.give.cloth=1;s.give.kettle=1;s.take.fish=4;s.take.rice=4;
  assert.ok(M.value('nwc',s,s.give)>=M.cost(s.take));
  assert.ok(M.afterWeight(s)>130);assert.equal(M.exchange('nwc',s),null);
  const options=M.counters('nwc',s);assert.ok(options.length);
  for(const c of options)assert.ok(M.afterWeight(s,c.give,c.take)<=130);
});
