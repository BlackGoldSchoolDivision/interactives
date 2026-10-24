/* Ideal string + one-dimensional sound model. Shared by drawing and tests. */
(function(root,factory){const model=factory();if(typeof module==='object'&&module.exports)module.exports=model;else root.VibrationModel=model;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const SLOWDOWN=220,AIR_SPEED=343,LENGTH=.65,REFERENCE_TENSION=80;
 const STRINGS=Object.freeze([{name:'Red',hz:440,width:3.2},{name:'Yellow',hz:440,width:3.2},{name:'Blue',hz:440,width:3.2}].map(s=>Object.freeze({...s,massPerMetre:REFERENCE_TENSION/(4*LENGTH*LENGTH*s.hz*s.hz)})));
 function tension(value){return REFERENCE_TENSION*Math.pow(2,(Math.max(0,Math.min(100,value))-50)/25);}
 function frequency(index,value){return Math.sqrt(tension(value)/STRINGS[index].massPerMetre)/(2*LENGTH);}
 function slowedTime(elapsedSeconds){return Math.max(0,elapsedSeconds)/SLOWDOWN;}
 function stringDisplacement(position,time,hz,amplitude=1){if(position<=0||position>=1)return 0;return amplitude*Math.sin(Math.PI*position)*Math.cos(2*Math.PI*hz*time);}
 function wavelength(hz){return AIR_SPEED/hz;}
 function particleDisplacement(position,time,hz){
  const retarded=time-position/AIR_SPEED;
  if(retarded<=0)return 0;
  const ramp=Math.min(1,retarded*hz*4);
  // Exaggerated displacement for visibility. Keep k*A bounded so particles
  // never cross. A particle oscillates about its own equilibrium position.
  return .055*wavelength(hz)*ramp*Math.sin(2*Math.PI*hz*retarded);
 }
 return Object.freeze({SLOWDOWN,AIR_SPEED,LENGTH,REFERENCE_TENSION,STRINGS,tension,frequency,slowedTime,stringDisplacement,wavelength,particleDisplacement});
});
