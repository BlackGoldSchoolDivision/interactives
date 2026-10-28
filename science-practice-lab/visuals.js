/* Original assessment scenes and precise Energy models. */
(function(root){
'use strict';
const assets={
'ecosystem-observations':{file:'living/ecosystem-observations.webp',cols:2,rows:2,ratio:'3/2',alts:[
 'Original illustration of a pond margin with reeds, a duck, frog, water strider, dragonfly, soil and water.',
 'Original illustration of mixed woodland with spruce and aspen, a chickadee, deer, mushrooms, fallen leaves and a log.',
 'Original illustration of open prairie with grasses, wildflowers, a ground squirrel and a bee on a flower.',
 'Original illustration of a dry, rocky landscape with sparse shrubs, cacti and a lizard.'
]},
'earth-climate-causes':{file:'earth/climate-causes-contexts.webp',cols:2,rows:2,ratio:'3/2',alts:[
 'Volcanic eruption inside a summit crater; gases and aerosols can enter the atmosphere.',
 'Educational diagram comparing long-term changes in Earth orbital geometry.',
 'Visible water droplets in cold vehicle exhaust, a context for fossil-fuel combustion; carbon dioxide itself is invisible.',
 'Historic photograph of a large industrial site with smokestacks; no emission measurements are shown.'
]},

'noaa-weather-events':{
 file:'earth/noaa-weather-events.webp',cols:2,rows:2,ratio:'46/27',
 alts:[
  'A weather map diagram shows high pressure and warmer surface air.',
  'A narrow rotating funnel-shaped cloud reaches the ground over flat farmland.',
  'A person works near observing equipment in strong blowing snow.',
  'A satellite composite shows broad swirling cloud bands over northern Australia.'
 ]
},
'noaa-forecast-sources':{
 file:'earth/noaa-forecast-sources.webp',cols:2,rows:2,ratio:'46/27',
 alts:[
  'A National Severe Storms Laboratory Doppler weather radar structure.',
  'Official NOAA illustration of a GOES weather satellite against Earth.',
  'An automated surface weather station with measuring instruments.',
  'An advanced weather forecasting computer workstation with weather maps.'
 ]
},
'energy-resource-flow-extended':{file:'energy/resource-flow-extended.avif',cols:2,rows:1,ratio:'3/2',alts:['An overshot wooden waterwheel turns an axle and millstone beside a flowing stream.','Plant residues and storage tanks near a facility; a vehicle is being filled with fuel.']},

'phase-change-scenes':{file:'matter/phase-change-scenes.webp',cols:4,rows:1,ratio:'163/181',alts:['Ice cubes on a cold surface.','A beaker of clear liquid water.','A kettle with a light plume over it.','Water droplets on a metal lid.']},
'thermometer-study':{file:'matter/thermometer-study.webp',cols:2,rows:1,ratio:'191/148',alts:['A temperature probe placed into ice water.','A probe in a heated beaker with bubbles.']},
'equal-mass-ice-water':{file:'matter/equal-mass-ice-water.webp',cols:2,rows:1,ratio:'199/147',alts:['Ice in a glass beaker; no reading is supplied.','Water in a glass beaker; no reading is supplied.']},
'bridge-joint-seasons':{file:'matter/bridge-joint-seasons.webp',cols:2,rows:1,ratio:'325/94',alts:['A bridge above a partly frozen river in winter.','The same style of bridge above a river in summer.']},
'box-push':{file:'energy/box-push.webp',cols:1,rows:1,ratio:'3/2',alts:['A closed hand gently pushes the left face of a wooden block toward the right.']},
"interaction-contexts":{"file":"energy/interaction-contexts.webp","cols":2,"rows":2,"ratio":"3/2","frames":[[0,0,0.5,0.455078125],[0.5,0,0.5,0.455078125],[0,0.455078125,0.5,0.544921875],[0.5,0.455078125,0.5,0.544921875]],"alts":["A hand pushes a wooden box to the right across a table.","Two wooden dynamics carts meet bumper to bumper on a horizontal track.","A canoe paddle blade is immersed beside a canoe facing to the right.","A bent metal paper clip rests on a white classroom bench."]},
"investigation-contexts":{"file":"energy/investigation-contexts.webp","cols":2,"rows":2,"ratio":"3/2","frames":[[0,0,0.5,0.4921875],[0.5,0,0.5,0.4921875],[0,0.4921875,0.5,0.5078125],[0.5,0.4921875,0.5,0.5078125]],"alts":["A wooden block is pulled by a cord along a rough test surface.","Hands gently stretch a yellow elastic band over a classroom bench.","A simple wheeled model vehicle has a paper sail.","A small classroom solar panel is connected to a low-voltage fan beside a paper strip."]},
"temperature-contexts":{"file":"matter/temperature-contexts.webp","cols":2,"rows":2,"ratio":"3/2","frames":[[0,0,0.5,0.4921875],[0.5,0,0.5,0.4921875],[0,0.4921875,0.5,0.5078125],[0.5,0.4921875,0.5,0.5078125]],"alts":["A clamped glass liquid thermometer has its bulb immersed in a beaker of water.","A model thermometer uses coloured liquid in a bottle and a narrow transparent tube in a water bath.","Water is poured from a clear beaker into a wide bowl.","An open freezer-safe plastic container holds ice with room for expansion."]},

'force-actions':{file:'energy/force-actions.webp',cols:2,rows:2,ratio:'3/2',alts:['Hands pull a rope taut.','Hands squeeze a foam block inward.','Hands twist a towel.','Scissors cut paper.']},
'resource-uses':{file:'energy/resource-uses.webp',cols:2,rows:2,ratio:'3/2',alts:['Wind moves a sailboat.','A wind turbine supplies an electric lamp.','A solar panel supplies an electric lamp.','Gas heats a kettle on a stove.']},
'mass-investigations':{file:'matter/mass-investigations.webp',cols:2,rows:2,ratio:'3/2',alts:['Closed container with ice on a balance.','The same closed container after the ice melts.','Open water container on a balance.','The same open container after some water evaporates.']},
'matter-contexts':{file:'matter/contexts.webp',cols:2,rows:1,ratio:'3/4',alts:['A bridge expansion joint.','Surface ice on a winter lake.']}
};
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function describe(id,panel=0){return assets[id]?.alts[panel]||'';}
function scene(id,panel=0){const a=assets[id];if(!a||!a.alts[panel])return'';const f=a.frames?.[panel]||[(panel%a.cols)/a.cols,Math.floor(panel/a.cols)/a.rows,1/a.cols,1/a.rows],ratio=a.frames?(1536*f[2])+'/'+(1024*f[3]):a.ratio;
return'<span class="scene-art" role="img" aria-label="'+esc(describe(id,panel))+'" style="--scene-width:'+(100/f[2])+'%;--scene-height:'+(100/f[3])+'%;--scene-left:'+(-100*f[0]/f[2])+'%;--scene-top:'+(-100*f[1]/f[3])+'%;--scene-ratio:'+ratio+'"><img src="assets/'+a.file+'" onerror="this.onerror=null;this.src=\'assets/'+(a.file.slice(0,-5)+'.png')+'\'" alt="" decoding="async" width="1536" height="1024"></span>';}
function sceneStrip(p){const asset=assets[p.asset];if(!asset)return'';const panels=p.panels||asset.alts.map((_,i)=>i),limit=p.columns||Math.min(panels.length,4);return'<div class="raster-scene-strip strip-'+limit+'" role="group" aria-label="'+esc(p.groupLabel||'Observation photographs')+'">'+panels.map((i)=>'<figure class="raster-strip-card">'+scene(p.asset,i)+'</figure>').join('')+'</div>'+(p.caption?'<p class="diagram-caption">'+esc(p.caption)+'</p>':'');}
function contextPhoto(p){return'<figure class="question-photo">'+scene(p.asset,p.panel)+'<figcaption>'+esc(p.caption||'Investigation scene')+'</figcaption></figure>';}
function arrow(x1,y,x2,colour='#087788'){const s=x2>x1?1:-1;return'<path d="M'+x1+' '+y+'H'+x2+'M'+(x2-s*10)+' '+(y-6)+'L'+x2+' '+y+'L'+(x2-s*10)+' '+(y+6)+'" fill="none" stroke="'+colour+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';}
function pairModel(v={},labels=false){const left=v.left||'left',right=v.right||'right',same=!!v.sameObject,equal=v.equal!==false;const aStart=95,bStart=same?95:205;
const aEnd=aStart+(left==='left'?-58:58),bEnd=bStart+(right==='right'?1:-1)*(equal?58:28);
const ay=same?38:55,by=same?59:55;
return'<svg class="pair-model" viewBox="0 0 300 150" role="img" aria-label="'+esc('Cart A is on the left and cart B on the right. '+(same?'Both force arrows are attached to cart A.':'One force arrow is attached to each cart.')+' The left model arrow points '+left+' and the other points '+right+'. Arrow lengths are '+(equal?'equal.':'unequal.'))+'"><rect x="45" y="77" width="100" height="50" rx="4" fill="#d9ecef" stroke="#6b929e"/><rect x="155" y="77" width="100" height="50" rx="4" fill="#e4e9f5" stroke="#8296b5"/><path d="M95 77V'+ay+'M'+bStart+' 77V'+by+'" stroke="#8ba6b0" stroke-width="1.5"/>'+arrow(aStart,ay,aEnd)+arrow(bStart,by,bEnd,'#b5682f')+'<g font-size="26" font-weight="700" text-anchor="middle"><text x="95" y="111">A</text><text x="205" y="111">B</text></g>'+(labels?'<g font-size="16" font-weight="700"><text x="20" y="31">Arrow A</text><text x="218" y="31">Arrow B</text></g>':'')+'</svg>';}
function record(v,title=''){const data=[['Original',v.before],['Held',v.during],['Released',v.after]];return'<div class="mini-record">'+(title?'<strong>'+esc(title)+'</strong>':'')+data.map(([label,n])=>'<div class="record-row"><span>'+label+'</span><span class="record-bar-track"><span style="width:'+(Number(n)/16*100)+'%"></span></span><b>'+n+' cm</b></div>').join('')+'</div>';}
function board(cards){return'<div class="energy-board">'+cards.map(([letter,text])=>'<div class="evidence-card"><strong>'+letter+'</strong><p>'+esc(text)+'</p></div>').join('')+'</div>';}
function flow(cards){return'<div class="energy-flow">'+cards.map(([letter,text],i)=>(i?'<span class="flow-arrow" aria-hidden="true">→</span>':'')+'<div class="flow-step"><strong>'+esc(letter)+'</strong><span>'+esc(text)+'</span></div>').join('')+'</div>';}
function render(q){
const design=typeof module!=='undefined'?require('./practice-design.js'):root.ScienceLabDesign;
const original=design?.visual(q);if(original)return original;
if(q.data.scenePair){const s=q.data.scenePair;return'<div class="scene-pair">'+s.panels.map((p,i)=>'<figure>'+scene(s.asset,p)+'<figcaption>'+esc(s.labels[i])+'</figcaption>'+(s.readings?'<div class="balance-reading">'+esc(s.readings[i])+'</div>':'')+'</figure>').join('')+'</div><p class="diagram-caption">Illustrated apparatus · use the stated readings; picture dimensions are not measurements.</p>';}
const kind=q.data.diagram;
if(kind==='energy-force-scenes')return'<div class="scene-grid">'+[0,1,2,3].map(i=>'<figure>'+scene('force-actions',i)+'<figcaption>Illustration '+'ABCD'[i]+'</figcaption></figure>').join('')+'</div>';
if(kind==='energy-sliding-box')return'<p class="model-heading">A hand pushes right; the box slides right →</p><svg class="force-model" viewBox="0 0 480 180" role="img" aria-label="A hand pushes a box to the right while it slides right on a table. Force arrow A points right; force arrow B points left. Both arrows act on the box."><path d="M25 150H455" stroke="#9eb7c2" stroke-width="4"/><rect x="175" y="65" width="130" height="80" rx="4" fill="#e1edf0" stroke="#7495a4"/>'+arrow(240,85,420)+arrow(240,120,60,'#b5682f')+'<g font-size="26" font-weight="700"><text x="390" y="70">A</text><text x="60" y="109">B</text></g></svg><p class="diagram-caption">Force model · arrows act on the box · not to scale.</p>';
if(kind==='energy-force-scale'){const t=q.data.scale,x=n=>35+(n-t.min)/(t.max-t.min)*395;return'<svg class="force-scale" viewBox="0 0 480 135" role="img" aria-label="Spring scale from '+t.min+' to '+t.max+' newtons, marked every '+t.step+' newton. The indicator is four small intervals above zero."><path d="M35 65H430" stroke="#466b7e" stroke-width="2"/>'+Array.from({length:(t.max-t.min)/t.step+1},(_,i)=>{const n=t.min+i*t.step;return'<path d="M'+x(n)+' 65V'+(n%2===0?86:77)+'" stroke="#466b7e" stroke-width="2"/>'+(n%2===0?'<text x="'+x(n)+'" y="112" text-anchor="middle" font-size="23">'+n+'</text>':'');}).join('')+'<path d="M'+x(t.value)+' 18V58l-8-11m8 11l8-11" fill="none" stroke="#b34f40" stroke-width="4"/><text x="448" y="78" font-size="24">N</text></svg>';}
if(kind==='energy-recovery-stages')return'<p class="model-heading">One test, from left to right</p><div class="recovery-stages">'+[['A',8],['B',12],['C',8]].map(([letter,n],i)=>'<div class="recovery-stage"><strong>'+letter+'</strong><span class="sample-bar" style="width:'+(n/16*100)+'%"></span><b>'+n+' cm</b>'+(i===1?'<span class="small-force">← pulling →</span>':'<span class="small-force">'+(i===0?'Start of test':'After release')+'</span>')+'</div>').join('')+'</div>';
if(kind==='energy-recovery-comparison')return'<div class="recovery-pair">'+record({before:8,during:5,after:8},'Material A')+record({before:8,during:5,after:5},'Material B')+'</div><p class="diagram-caption">Same gentle compression test and waiting time · lengths are example observations.</p>';
if(kind==='energy-reaction-pair')return pairModel({},true)+'<p class="diagram-caption">Cart A is on the left; cart B is on the right. Each arrow acts on the cart beneath it.</p>';
if(kind==='energy-paddle-pair')return'<div class="interaction-pair"><div><strong>Water</strong><span class="interaction-arrow">← A</span><span>Force on water · backward</span></div><div><strong>Paddle</strong><span class="interaction-arrow opposite">B →</span><span>Force on paddle · forward</span></div></div><p class="diagram-caption">One interaction · equal force strengths · different receiving objects.</p>';
if(kind==='energy-arrow-scale')return'<p class="model-heading">Arrow A · force on cart A</p><svg class="force-scale" viewBox="0 0 480 130" role="img" aria-label="Arrow A points left and is three marked length units long. One unit represents two newtons.">'+arrow(400,48,100)+[100,200,300,400].map(x=>'<path d="M'+x+' 78V97" stroke="#718f9e" stroke-width="2"/>').join('')+'<path d="M100 88H400" stroke="#718f9e"/><text x="250" y="121" text-anchor="middle" font-size="23">1 unit = 2 N</text></svg>';
if(kind==='energy-decision-board')return board([['A','Local resource measurements, roads and grid connections'],['B','Effects on nearby people, livelihoods and community priorities'],['C','Construction, operation and maintenance costs'],['D','Effects on habitat, water, air and land']]);
if(kind==='energy-decision-flow')return flow([['Need','Define the energy task'],['A','Missing stage'],['Compare','Weigh the criteria'],['B','Missing stage']]);
if(kind==='energy-resource-flow')return flow([['A','Empty stage'],['B','Empty stage'],['C','Empty stage']])+'<p class="diagram-caption">Stages A–C are blank; choose where each description belongs.</p>';
if(kind==='energy-management-board')return board([['A','Change a site layout to avoid a wetland.'],['B','Re-establish appropriate vegetation on affected land.'],['C','Collect used equipment for approved reuse or recycling.'],['D','Work with affected rights holders and respect land and resource rights.']]);
if(kind==='energy-restoration-grid')return'<div class="restoration-grid" role="img" aria-label="Ten equal squares, six shaded as restored and four unshaded as remaining. Each square represents one square metre.">'+Array.from({length:10},(_,i)=>'<span class="'+(i<6?'restored':'')+'">'+(i<6?'✓':'')+'</span>').join('')+'</div><p class="diagram-caption">✓ Restored · unshaded = remaining · each square is 1 m².</p>';
return'';
}
function optionArt(v,i,q){
if(v.kind==='scene')return scene(v.asset,v.panel);
if(v.kind==='pair')return pairModel(v);
if(v.kind==='recovery')return record(v);
if(v.kind==='site')return'<div class="site-record"><span><b>Resource</b>'+esc(v.resource)+'</span><span><b>Access</b>'+esc(v.access)+'</span><span><b>Habitat</b>'+esc(v.habitat)+'</span></div>';
return'';
}
const api={assets,scene,sceneStrip,describe,contextPhoto,render,optionArt,canRender:v=>['scene','pair','recovery','site'].includes(v.kind)};
root.ScienceLabVisuals=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
