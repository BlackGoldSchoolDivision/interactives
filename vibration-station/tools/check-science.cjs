'use strict';
const assert=require('node:assert/strict');
const M=require('../model.js');
const close=(a,b,tol=1e-9)=>assert(Math.abs(a-b)<tol,`${a} != ${b}`);
// Identical strings at the same tension must have the same pitch.
for(const setting of [0,25,50,75,100]){
 const f=M.STRINGS.map((_,i)=>M.frequency(i,setting));
 close(f[1],f[0]);close(f[2],f[1]);
 close((f[2]/M.SLOWDOWN)/(f[0]/M.SLOWDOWN),1);
}
for(let i=0;i<3;i++){
 close(M.frequency(i,0),220);close(M.frequency(i,50),440);close(M.frequency(i,100),880);
 close((M.frequency(i,100)/M.SLOWDOWN)/(M.frequency(i,0)/M.SLOWDOWN),4);
}
// Same string: four times the tension doubles frequency, not four times.
for(let i=0;i<3;i++){
 const mu=M.STRINGS[i].massPerMetre;
 const f=t=>Math.sqrt(t/mu)/(2*M.LENGTH);
 close(f(80)/f(20),2);
 assert(M.frequency(i,100)>M.frequency(i,0));
 for(const t of [0,.001,.015,.03]){
  close(M.stringDisplacement(0,t,440),0);close(M.stringDisplacement(1,t,440),0);
 }
 const p=1/M.frequency(i,50);
 close(M.stringDisplacement(.5,0,M.frequency(i,50)),M.stringDisplacement(.5,p,M.frequency(i,50)));
}
// All three sound waves propagate at the same speed in the same air.
for(const hz of [220,440,880]){
 close(hz*M.wavelength(hz),343);
 close(M.particleDisplacement(1,.001,hz),0); // disturbance has not arrived
 const x=.7,t=.02,shift=.1;
 close(M.particleDisplacement(x,t,hz),M.particleDisplacement(x+shift,t+shift/M.AIR_SPEED,hz));
 const period=1/hz;
 close(M.particleDisplacement(x,t,hz),M.particleDisplacement(x,t+period,hz));
 const amplitude=.055*M.wavelength(hz);
 for(let t=0;t<.05;t+=.0001)assert(Math.abs(M.particleDisplacement(x,t,hz))<=amplitude+1e-10);
}
console.log('PASS: equal strings at equal tensions, 440 Hz start, tuned octave ratios, uniform slow motion, fixed ends, tension law, sound speed, propagation delay, and bounded particle motion.');
