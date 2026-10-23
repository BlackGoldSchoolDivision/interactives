const assert=require('node:assert/strict');
const E=require('../physics.js');
let assertions=0;const check=(v,m)=>{assert(v,m);assertions++;};
const winners=['a','b','b','a','same','b'];
E.levels.forEach((level,i)=>{const cars=level.lanes.map(E.run);check(E.outcome(cars,level.kind,level.target)===winners[i],`Level ${level.id} comparison`);cars.forEach(c=>{check(c.stopped&&!c.atEnd,'Coasts to rest without hitting the track end');check(c.v===0&&c.x>E.RAMP_END,'No backwards drift or continued creep');check(c.gateSpeed>0,'Reaches speed comparison stripe');});});
for(const h of [.06,.09,.14,.19,.22]){
  const all=Object.keys(E.surfaces).map(surface=>E.run({surface,height:h}));
  check(all[0].x>all[3].x&&all[3].x>all[1].x&&all[1].x>all[2].x,'Resistance ordering at height '+h);
  all.forEach(car=>check(!car.atEnd,'All supported free-play settings stop before the edge'));
}
for(const surface of Object.keys(E.surfaces)){
  const low=E.run({surface,height:.09}),high=E.run({surface,height:.19});
  check(high.x>low.x&&high.peakSpeed>low.peakSpeed,'Higher release gives more speed/distance on '+surface);
  const a=E.run({surface,height:.14}),b=E.run({surface,height:.14});check(a.x===b.x&&a.time===b.time,'Identical setups are reproducible');
}
// The model must dissipate energy, not add a motor-like kick at the ramp foot.
let maxIncrease=0;
for(const surface of Object.keys(E.surfaces)){
  const car=E.makeCar({surface,height:.19});let prev=E.G*E.chassis(car.x,car.height).y;
  for(let i=0;i<240*15&&!car.stopped;i++){
    E.step(car);const energy=E.G*E.chassis(car.x,car.height).y+.5*(1+E.INERTIA_RATIO)*car.v*car.v;
    maxIncrease=Math.max(maxIncrease,energy-prev);prev=energy;check(Number.isFinite(energy)&&car.v>=0,'Finite energy and forward speed');
  }
}
check(maxIncrease<.00002,'No artificial energy added: max increase '+maxIncrease);
// Fixed microsteps give the same simulation at 30/60/120 visual frames per second.
function framed(fps){const c=E.makeCar({surface:'wood',height:.14});let debt=0;while(!c.stopped){debt+=1/fps;while(debt>=E.STEP&&!c.stopped){E.step(c);debt-=E.STEP;}}return c;}
const frameResults=[1,30,60,120].map(framed);check(frameResults.every(c=>c.x===frameResults[0].x&&c.time===frameResults[0].time),'Frame-rate invariant result');
check(E.profile(E.RAMP_END,.14).dy===0&&E.profile(E.RAMP_END,.14).y===0,'Ramp joins the flat smoothly');
console.log(JSON.stringify({pass:true,assertions,maxEnergyIncrease:maxIncrease,expectedWinners:winners,freePlayCombinations:20,frameRates:[1,30,60,120]},null,2));
