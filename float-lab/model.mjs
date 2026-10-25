// Float Lab: SI forces; masses in g, volumes in mL (= cm³), density in g/mL.
export const G=9.80665;
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const FLUIDS=[
 {id:'water',name:'Fresh water',rho:0.9982,color:'#43c9ed',aqueous:true},
 {id:'salt',name:'Salt water',rho:1.0726,color:'#609cdf',aqueous:true},
 {id:'oil',name:'Vegetable oil',rho:0.92,color:'#f8ce52',aqueous:false},
 {id:'glycerin',name:'Glycerin',rho:1.26,color:'#a4cbe7',aqueous:true},
 {id:'syrup',name:'Corn syrup',rho:1.33,color:'#e6a568',aqueous:true},
 {id:'honey',name:'Honey',rho:1.42,color:'#d98a38',aqueous:true},
 {id:'ethanol',name:'Alcohol (ethanol)',rho:0.78932,color:'#b9a9e4',aqueous:true}
];
export const MATERIALS=[
 {id:'oak',name:'Oak sample',rho:0.8,texture:0,color:'#c78b3d'},
 {id:'concrete',name:'Concrete sample',rho:2.4,texture:4,color:'#8294ad'},
 {id:'cork',name:'Cork sample',rho:0.24,texture:1,color:'#bd8644'},
 {id:'wax',name:'Paraffin wax',rho:0.9,texture:2,color:'#eadcc5'},
 {id:'plastic',name:'HDPE plastic',rho:0.95,texture:3,color:'#e96b51'},
 {id:'aluminium',name:'Aluminium sample',rho:2.7,texture:5,color:'#9eb3c5'}
];
// True densities at 20°C, 0..100 mass % ethanol in 5-point steps.
// CRC/International Critical Tables, hosted by Jefferson Lab. Interpolate between points.
export const ETHANOL_RHO=[.99820,.98935,.98184,.97511,.96861,.96165,.95379,.94491,.93515,.92469,.91381,.90255,.89110,.87945,.86763,.85561,.84341,.83093,.81795,.80422,.78932];
export function ethanolDensity(percent){let p=clamp(percent,0,100)/5,i=Math.min(19,Math.floor(p));return ETHANOL_RHO[i]+(ETHANOL_RHO[i+1]-ETHANOL_RHO[i])*(p-i);}
export function saltDensity(percent){const xs=[0,10,20,26],ys=[.9982,1.0726,1.1498,1.1993];let p=clamp(percent,0,26),i=p<10?0:p<20?1:2;return ys[i]+(ys[i+1]-ys[i])*(p-xs[i])/(xs[i+1]-xs[i]);}
export function fluid(id,salt=10){const f=FLUIDS.find(f=>f.id===id)||FLUIDS[0];return {...f,rho:id==='salt'?saltDensity(salt):f.rho};}
export function weight(mass){return mass*G/1000;}
export function buoyancy(rho,volume){return rho*volume*G/1000;}
export function floatResult(mass,volume,rho){let relative=mass/volume/rho;return {state:Math.abs(relative-1)<0.0002?'neutral':relative<1?'float':'sink',fraction:clamp(relative,0,1),weight:weight(mass),maxBuoyancy:buoyancy(rho,volume)};}
export function solidStep(body,dt,{mass,volume,rho,depth=.14,drag=.35}){
 const side=Math.cbrt(volume)/100,half=side/2;
 const fraction=clamp((half-body.z)/side,0,1);
 const force=buoyancy(rho,volume*fraction)-weight(mass);
 const kg=mass/1000;
 // Stable, semi-implicit linear drag. Drag increases upon immersion.
 const k=drag*(.02+.98*fraction);
 body.v=(body.v+force/kg*dt)/(1+k/kg*dt);
 body.z+=body.v*dt;
 if(body.z< -depth+half){body.z=-depth+half;body.v=0;}
 return {...body,fraction,buoyant:buoyancy(rho,volume*fraction),weight:weight(mass)};
}
export function entry(id,volume=80,salt=10){let f=fluid(id,salt);return {...f,volume,mass:volume*f.rho,ingredients:[{id,volume,mass:volume*f.rho,rho:f.rho,...(id==='salt'?{salt}: {})}]};}
function blendColor(entries){const sum=entries.reduce((a,e)=>a+e.volume,0),out=[0,0,0];for(const e of entries){let h=e.color.replace('#','');out.forEach((_,i)=>out[i]+=parseInt(h.slice(i*2,i*2+2),16)*e.volume/sum);}return '#'+out.map(x=>Math.round(x).toString(16).padStart(2,'0')).join('');}
export function mixEntries(entries){
 const ingredients=entries.flatMap(e=>e.ingredients||[{id:e.id,volume:e.volume,mass:e.mass}]);
 const mass=ingredients.reduce((s,i)=>s+i.mass,0),idealVolume=ingredients.reduce((s,i)=>s+i.volume,0);
 const binary=ingredients.every(i=>['water','ethanol'].includes(i.id));
 const alcoholMass=ingredients.filter(i=>i.id==='ethanol').reduce((s,i)=>s+i.mass,0);
 const rho=binary?ethanolDensity(alcoholMass/mass*100):mass/idealVolume;
 return {id:'mix',name:'Blended liquids',rho,volume:mass/rho,mass,ingredients,color:blendColor(entries),aqueous:true,approx:!binary};
}
export function coalesceLayers(entries){
 const out=[];
 for(const e of entries){const match=e.id!=='mix'&&out.find(x=>x.id===e.id&&Math.abs(x.rho-e.rho)<1e-9);
 if(match){match.volume+=e.volume;match.mass+=e.mass;match.ingredients.push(...e.ingredients);}else out.push({...e,ingredients:[...(e.ingredients||[])]});}
 return out;
}
export function layerOrder(entries){return coalesceLayers(entries).sort((a,b)=>b.rho-a.rho);}
export function layerTest(layers,sampleRho,volume=8){
 const ordered=layerOrder(layers),total=ordered.reduce((s,e)=>s+e.volume,0),depth=.18*total/600;
 const result=layerEquilibrium(ordered,sampleRho,volume,depth);
 return result?{...result,depth,total,volume,shallow:result.state==='bottom'&&sampleRho<Math.max(...ordered.map(e=>e.rho))}:null;
}
export function blendLayers(entries,stir=false){
 let layers=layerOrder(entries);
 if(stir){let aq=layers.filter(e=>e.aqueous),oil=layers.filter(e=>!e.aqueous);return layerOrder([...oil,...(aq.length?[mixEntries(aq)]:[])]);}
 // Waiting blends adjacent water-compatible layers. An intervening oil layer remains a barrier.
 let groups=[],run=[];
 const flush=()=>{if(run.length){groups.push(run.length===1?run[0]:mixEntries(run));run=[];}};
 for(const e of layers){if(e.aqueous)run.push(e);else{flush();groups.push(e);}}flush();
 return layerOrder(groups);
}
export function layerEquilibrium(layers,sampleRho,volume=8,depth=.18){
 if(!layers.length)return null;
 let sum=layers.reduce((a,e)=>a+e.volume,0),side=Math.cbrt(volume)/100;
 let bands=[],bottom=0;
 for(const e of layers){let h=e.volume/sum*depth;bands.push({...e,bottom,top:bottom+h});bottom+=h;}
 const supportedMass=z=>bands.reduce((a,l)=>a+l.rho*volume*clamp((Math.min(z+side/2,l.top)-Math.max(z-side/2,l.bottom))/side,0,1),0);
 const mass=sampleRho*volume,lo=side/2;
 if(supportedMass(lo)<mass)return {z:lo,state:'bottom',bands};
 let a=lo,b=depth+side/2;
 for(let i=0;i<70;i++){let m=(a+b)/2;if(supportedMass(m)>mass)a=m;else b=m;}
 const z=(a+b)/2;
 return {z,state:z+side/2>depth?'surface':'inside',bands};
}
export function boatModel(width,height,cargo,rho=0.9982){
 const length=12,clayVolume=50,clayMass=100;
 let a=0,b=Math.min(width,length,height)/2;
 // A hollow open box: fixed volume of clay, solve its wall/bottom thickness.
 for(let i=0;i<70;i++){let t=(a+b)/2;let shell=width*length*height-(width-2*t)*(length-2*t)*(height-t);if(shell>clayVolume)b=t;else a=t;}
 const wall=(a+b)/2,displacement=(clayMass+cargo)/rho;
 const draft=displacement/(width*length),capacity=Math.max(0,rho*width*length*height-clayMass);
 return {length,width,height,clayVolume,clayMass,wall,displacement,draft,capacity,freeboard:height-draft,flooded:draft>=height,mass:clayMass+cargo,weight:weight(clayMass+cargo)};
}

// A spherical drop uses the displaced spherical-cap volume near the surface.
export function sphereFraction(z,volume){const r=Math.cbrt(3*volume/(4*Math.PI))/100,h=clamp(r-z,0,2*r);return h*h*(3*r-h)/(4*r*r*r);}
export function sphereStep(body,dt,{mass,volume,rho,depth=.14,drag=.02}){
 const r=Math.cbrt(3*volume/(4*Math.PI))/100,fraction=sphereFraction(body.z,volume),kg=mass/1000;
 body.v=(body.v+(buoyancy(rho,volume*fraction)-weight(mass))/kg*dt)/(1+drag*(.02+.98*fraction)/kg*dt);
 body.z+=body.v*dt;if(body.z< -depth+r){body.z=-depth+r;body.v=0;}return body;
}
export function hullBenchmark(cargo){let best=Infinity;for(let w=8;w<=16;w+=.5)for(let h=1.5;h<=4.5;h+=.25){const m=boatModel(w,h,cargo);if(!m.flooded)best=Math.min(best,w*12*h);}return best;}
// Water and ethanol mix when the incoming pour contacts an exposed binary layer.
// This is an illustrative contact rule, not a prediction of pouring or diffusion time.
export function addPour(entries,pour){
 const layers=layerOrder(entries),top=layers.at(-1);
 const binary=e=>e.ingredients?.length&&e.ingredients.every(i=>['water','ethanol'].includes(i.id));
 if(top&&top.id!==pour.id&&binary(top)&&binary(pour))return layerOrder([...layers.slice(0,-1),mixEntries([top,pour])]);
 return layerOrder([...layers,pour]);
}
