const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{},structuredClone};vm.createContext(context);
for(const file of ['trading-model.js','onward-model.js'])vm.runInContext(fs.readFileSync(__dirname+'/../'+file,'utf8'),context);
const J=context.window.RIVER_ONWARD,M=context.window.RIVER_TRADE;
const source=()=>({journeyId:'river-42',counts:{food:3,repair:0,cloth:1,kettle:1,tools:1,beads:1},hull:98});
const arrived=route=>J.move(J.choose(J.move(J.start(J.fresh(source())),1),route),1);
test('both routes carry the remaining portage inventory, with different provision and condition costs',()=>{
  const input=source(),before=JSON.stringify(input),fresh=J.fresh(input);
  assert.equal(fresh.visit.own.repair,0);assert.equal(fresh.visit.foodReserve,3);assert.equal(M.weight(fresh.visit),105);
  const shore=arrived('shore'),crossing=arrived('crossing');
  assert.equal(shore.visit.foodReserve,1);assert.equal(shore.hull,98);assert.equal(shore.foodUsed,2);
  assert.equal(crossing.visit.foodReserve,2);assert.equal(crossing.hull,82);assert.equal(crossing.foodUsed,1);
  for(const id of M.giveIds){assert.equal(shore.visit.own[id],1);assert.equal(crossing.visit.own[id],1);}
  assert.equal(shore.phase,'arrived');assert.equal(shore.progress,1);assert.equal(JSON.stringify(input),before);
  assert.equal(J.move(shore,1),shore);assert.equal(J.choose(shore,'shore'),null);
});
test('saved movement, route decisions and accepted trades survive restoration; new source identities invalidate them',()=>{
  let s=J.move(J.start(J.fresh(source())),.2),restored=J.restore(JSON.parse(JSON.stringify(s)),source());
  assert.equal(restored.progress,.2);assert.equal(restored.phase,'first');
  s=J.move(restored,1);assert.equal(s.phase,'choice');assert.equal(s.visit.foodReserve,2);
  s=J.move(J.choose(s,'shore'),.15);restored=J.restore(JSON.parse(JSON.stringify(s)),source());
  assert.equal(restored.route,'shore');assert.equal(restored.progress,.6);assert.equal(restored.visit.foodReserve,2);
  const different=source();different.journeyId='river-43';assert.equal(J.restore(s,different).phase,'ready');
  const changed=source();changed.counts.repair=1;assert.equal(J.restore(s,changed).visit.own.repair,1);
  assert.equal(J.restore({...s,phase:'second',route:null},source()).phase,'ready');
});
test('repair supplies and unsafe route choices cannot be overspent',()=>{
  assert.equal(J.repair(J.fresh(source())),null);
  const input=source();input.hull=55;input.counts.repair=1;
  const fixed=J.repair(J.fresh(input));assert.equal(fixed.hull,95);assert.equal(fixed.visit.own.repair,0);assert.equal(fixed.repairs,1);assert.equal(J.repair(fixed),null);
  const low=source();low.hull=16;let s=J.move(J.start(J.fresh(low)),1);assert.equal(J.choose(s,'crossing'),null);assert.ok(J.choose(s,'shore'));
  s.visit.foodReserve=0;assert.equal(J.choose(s,'shore'),null);assert.equal(J.start({...s,phase:'ready'}),null);
});
test('real barter conserves every good, spends only on acceptance, and cannot repeat after completion or reload',()=>{
  let s=arrived('shore');s.visit.give.cloth=1;s.visit.give.kettle=1;s.visit.take.fish=1;s.visit.take.pelt=4;
  const before=structuredClone(s);assert.equal(J.exchange(s),null);s.visit.replyKind='agreement';
  const next=J.exchange(s);assert.ok(next);assert.ok(M.goal(next.visit));
  for(const id of M.ids)assert.equal(next.visit.own[id]+next.visit.stock[id],before.visit.own[id]+before.visit.stock[id]);
  assert.equal(next.visit.own.cloth,0);assert.equal(next.visit.own.kettle,0);assert.equal(next.visit.own.tools,1);assert.equal(next.visit.own.beads,1);assert.equal(next.visit.foodReserve,1);assert.equal(next.visit.own.fish,1);assert.equal(next.visit.own.pelt,4);assert.equal(M.weight(next.visit),80);
  assert.equal(next.visit.deals,1);assert.equal(J.exchange(next),null);
  const restored=J.restore(JSON.parse(JSON.stringify(next)),source());assert.ok(M.goal(restored.visit));assert.equal(restored.visit.origin,'journey');assert.equal(restored.visit.deals,1);assert.equal(J.exchange(restored),null);
  assert.equal(before.visit.own.cloth,1);assert.equal(before.visit.own.kettle,1);
});
