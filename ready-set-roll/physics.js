/* Ready, Set, Roll! A constrained rolling model. Distances are metres, time is seconds. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RollPhysics=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const G=9.81,STEP=1/240,WHEEL_RADIUS=.0322,WHEELBASE=.25,INERTIA_RATIO=.085;
  const RAMP_START=.08,TOE_START=.78,RAMP_END=.98,RELEASE=.25,TRACK_END=3.75;
  // Effective rolling resistance, not a table of measured material coefficients.
  const surfaces={wood:{name:'Wood',resistance:.085,tile:0,color:'#D6AE76'},felt:{name:'Felt',resistance:.24,tile:1,color:'#BD604C'},sandpaper:{name:'Sandpaper',resistance:.34,tile:2,color:'#62646B'},cork:{name:'Cork',resistance:.15,tile:3,color:'#B99065'}};
  function profile(x,h){
    const slope=h/(TOE_START-RAMP_START+(RAMP_END-TOE_START)/2);
    if(x<=RAMP_START)return {y:h,dy:0};
    if(x<TOE_START)return {y:h-slope*(x-RAMP_START),dy:-slope};
    if(x<RAMP_END){const d=RAMP_END-x;return {y:slope*d*d/(2*(RAMP_END-TOE_START)),dy:-slope*d/(RAMP_END-TOE_START)};}
    return {y:0,dy:0};
  }
  function chassis(x,h){const rear=profile(x-WHEELBASE/2,h),front=profile(x+WHEELBASE/2,h);return {y:(rear.y+front.y)/2,dy:(rear.dy+front.dy)/2,angle:Math.atan2(front.y-rear.y,WHEELBASE)};}
  function makeCar(config){
    if(!surfaces[config.surface]||!Number.isFinite(config.height)||config.height<.06||config.height>.22)throw new Error('Choose a known surface and ramp height from 0.06 to 0.22 m.');
    return {surface:config.surface,height:config.height,x:RELEASE,v:0,time:0,distance:0,wheelAngle:0,peakSpeed:0,gateSpeed:null,stopTime:null,stopped:false,atEnd:false};
  }
  function resistanceAt(car){
    // Both ramps are wood. Blend onto the flat material across the wheelbase.
    const blend=Math.max(0,Math.min(1,(car.x-(RAMP_END-WHEELBASE/2))/WHEELBASE));
    return .026*(1-blend)+surfaces[car.surface].resistance*blend;
  }
  function step(car,dt=STEP){
    if(car.stopped)return car;
    if(!Number.isFinite(dt)||dt<=0||dt>STEP*1.001)throw new Error('Use fixed physics steps no larger than 1/240 second.');
    const pose=chassis(car.x,car.height),norm=Math.sqrt(1+pose.dy*pose.dy);
    const gravity=-G*pose.dy/norm,rolling=resistanceAt(car)*G/norm,drag=.025*car.v*car.v;
    const a=(gravity-rolling-drag)/(1+INERTIA_RATIO);
    const oldV=car.v,oldX=car.x;
    if(a<0&&oldV+a*dt<=0){
      const untilStop=oldV/(-a);
      car.x+=(oldV*untilStop+.5*a*untilStop*untilStop)/norm;
      car.time+=untilStop;car.v=0;car.stopped=true;car.stopTime=car.time;
    }else{
      car.v=Math.max(0,oldV+a*dt);car.x+=(oldV+car.v)*.5*dt/norm;car.time+=dt;
    }
    const travelled=Math.max(0,car.x-oldX)*norm;car.distance+=travelled;car.wheelAngle+=travelled/WHEEL_RADIUS;
    car.peakSpeed=Math.max(car.peakSpeed,car.v);
    const gate=RAMP_END+.25;
    if(car.gateSpeed===null&&oldX<gate&&car.x>=gate)car.gateSpeed=oldV+(car.v-oldV)*(gate-oldX)/(car.x-oldX);
    if(car.x>=TRACK_END){car.x=TRACK_END;car.v=0;car.stopped=true;car.atEnd=true;car.stopTime=car.time;}
    return car;
  }
  function run(config){const car=makeCar(config);for(let i=0;i<240*30&&!car.stopped;i++)step(car);if(!car.stopped)throw new Error('Trial did not finish.');return car;}
  function distance(car){return Math.max(0,car.x-RAMP_END);}
  function outcome(cars,kind='distance',target=1){
    let values;
    if(kind==='speed')values=cars.map(c=>c.gateSpeed??0);
    else if(kind==='stop')values=cars.map(c=>-c.stopTime);
    else if(kind==='target')values=cars.map(c=>distance(c)>=target?1:0);
    else values=cars.map(distance);
    const delta=values[0]-values[1],tolerance=kind==='target'?0:kind==='speed'?.015:.01;
    return Math.abs(delta)<=tolerance?'same':delta>0?'a':'b';
  }
  const levels=[
    {id:'wood-felt',name:'A different surface',question:'Which car will go farther?',kind:'distance',lanes:[{label:'Wood',surface:'wood',height:.14},{label:'Felt',surface:'felt',height:.14}],explain:'Both cars started on matching ramps. In this model, felt resists rolling more, so its car stops sooner.'},
    {id:'speed',name:'Watch the speed',question:'Which car will pass the stripe faster?',kind:'speed',lanes:[{label:'Cork',surface:'cork',height:.17},{label:'Wood',surface:'wood',height:.17}],explain:'Gravity sped up both cars on matching ramps. On the flat, the wood car lost less speed before reaching the stripe.'},
    {id:'height',name:'A higher start',question:'Which car will go farther?',kind:'distance',lanes:[{label:'Low ramp',surface:'wood',height:.09},{label:'High ramp',surface:'wood',height:.19}],explain:'The cars and surfaces matched. A higher start gave one car more energy from gravity. It reached the flat moving faster.'},
    {id:'sandpaper',name:'Coming to a stop',question:'Which car will stop first?',kind:'stop',lanes:[{label:'Sandpaper',surface:'sandpaper',height:.16},{label:'Wood',surface:'wood',height:.16}],explain:'Both cars sped up downhill and slowed on the flat. In this model, sandpaper resists rolling more and brings its car to a stop first.'},
    {id:'same',name:'A fair comparison',question:'Which car will go farther?',kind:'distance',lanes:[{label:'Top track',surface:'wood',height:.14},{label:'Bottom track',surface:'wood',height:.14}],explain:'Matching cars, ramp heights and surfaces produced the same result. In a real test, repeat your trials to check small differences.'},
    {id:'flag',name:'Reach the flag',question:'Which car will reach its flag?',kind:'target',target:1,lanes:[{label:'Felt',surface:'felt',height:.16},{label:'Wood',surface:'wood',height:.16}],explain:'The flags are equally far from the ramps. The wood car kept enough of its motion to reach its flag. The felt car slowed and stopped before it.'}
  ];
  return {G,STEP,WHEEL_RADIUS,WHEELBASE,INERTIA_RATIO,RAMP_START,TOE_START,RAMP_END,RELEASE,TRACK_END,surfaces,profile,chassis,makeCar,step,run,distance,outcome,levels};
});
