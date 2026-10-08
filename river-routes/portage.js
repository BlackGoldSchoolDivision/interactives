(() => {
  'use strict';
  const $=id=>document.getElementById(id),api=window.RiverRoutesPreview;
  const key='bgsd-river-routes-portage-1',items=api.cargoItems,byId=Object.fromEntries(items.map(i=>[i.id,i]));
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const trails={
    forest:{d:'M82 464C125 404 213 373 278 341S387 287 428 259S513 204 538 173S663 110 724 96S750 81 780 74',roots:[.32,.7]},
    ridge:{d:'M82 464C143 386 221 369 290 324S318 230 388 166S470 91 542 73S674 96 780 74',roots:[.25,.52,.78]}
  };
  let state=null,units=[],running=false,frame=0,lastFrame=0,lastSave=0;
  try{const s=JSON.parse(localStorage.getItem(key));
    if(s&&typeof s.journeyId==='string'&&s.manifest?.counts&&['near','carrying','far','returning','complete'].includes(s.phase)&&['forest','ridge'].includes(s.trail)&&Number.isFinite(s.p)&&Number.isFinite(s.energy)&&Array.isArray(s.delivered)&&Array.isArray(s.selected)&&Array.isArray(s.roots)) {
      state={...s,p:clamp(s.p,0,1),energy:clamp(s.energy,0,100),trips:Math.max(0,Math.floor(Number(s.trips)||0)),rests:Math.max(0,Math.floor(Number(s.rests)||0)),time:Math.max(0,Number(s.time)||0),canoeDelivered:s.canoeDelivered===true};
    }
  }catch{}
  const save=()=>{if(state)try{localStorage.setItem(key,JSON.stringify(state));}catch{}};
  function landing(){
    const a=api.getState(),t=a.travel,c=a.cargo;
    return t?.status==='landed'&&c?.secured&&c.ready&&JSON.stringify(t.manifest.counts)===JSON.stringify(c.counts)?t:null;
  }
  function makeUnits(){
    units=items.flatMap(i=>Array.from({length:state.manifest.counts[i.id]},(_,n)=>({...i,unitId:i.id+'-'+n})));
    const ids=new Set(units.map(i=>i.unitId));
    state.delivered=[...new Set(state.delivered.filter(id=>ids.has(id)))];
    state.selected=[...new Set(state.selected.filter(id=>id==='canoe'||ids.has(id)&&!state.delivered.includes(id)))];
    if(state.selected.includes('canoe'))state.selected=['canoe'];
    if(state.canoeDelivered)state.selected=state.selected.filter(id=>id!=='canoe');
    state.roots=[...new Set(state.roots.filter(n=>Number.isInteger(n)&&n>=0&&n<trails[state.trail].roots.length))];
    if(state.phase==='complete'&&!allAcross())state.phase='near';
  }
  function fresh(t){
    const counts=Object.fromEntries(items.map(i=>[i.id,clamp(Math.floor(Number(t.manifest.counts[i.id])||0),0,6)]));
    counts.repair=Math.max(0,counts.repair-t.repairs);
    return {journeyId:t.journeyId,manifest:{counts,kg:items.reduce((n,i)=>n+counts[i.id]*i.kg,0),hull:t.hull,repairsUsed:t.repairs},delivered:[],selected:[],canoeDelivered:false,trail:'forest',phase:'near',p:0,energy:100,trips:0,rests:0,time:0,roots:[]};
  }
  const loadKg=()=>state?.selected.includes('canoe')?30:units.filter(i=>state?.selected.includes(i.unitId)).reduce((n,i)=>n+i.kg,0);
  const allAcross=()=>!!state&&state.canoeDelivered&&state.delivered.length===units.length;
  const rootIndex=()=>state?.phase==='carrying'?trails[state.trail].roots.findIndex((p,n)=>!state.roots.includes(n)&&state.p>=p-.00001):-1;
  const announce=message=>{$('portageFeedback').textContent=message;};
  function stop(){running=false;lastFrame=0;if(frame)cancelAnimationFrame(frame);frame=0;save();render();}
  function makeWorld(){
    $('portageWorld').innerHTML=`<title id="portageWorldTitle">A sunlit forest portage beside cascading turquoise water. Your crew carries the canoe and cargo along the highlighted trail to the upper water.</title><defs><filter id="portageTrailGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter></defs><image href="assets/portage-trail.webp" width="900" height="600" preserveAspectRatio="none"/><path id="portageTrailShadow" fill="none" stroke="#ffdf8c" stroke-width="15" stroke-linecap="round" opacity=".45" filter="url(#portageTrailGlow)"/><path id="portageTrail" fill="none" stroke="#fff1b8" stroke-width="4" stroke-linecap="round" stroke-dasharray="3 13" opacity=".9"/><path id="portageTrailEdge" fill="none" stroke="none"/><g id="portageRoots"></g><g id="nearShoreCargo"></g><g id="farShoreCargo"></g><g id="shoreCanoe"></g><g id="portageCrew"><ellipse cy="25" rx="35" ry="13" fill="#152b2f88"/><g id="crewPartner"></g><g id="crewPerson"><path id="portageLegs" d="M-9 5L-14 25M7 5l12 19" stroke="#263b42" stroke-width="9" stroke-linecap="round"/><path d="M-12-18Q0-25 12-18L15 5H-15Z" fill="#a64d32" stroke="#532f24" stroke-width="2"/><path d="M-12-10l-10 9M12-10l10-15" stroke="#bd8b5f" stroke-width="6" stroke-linecap="round"/><circle cy="-33" r="12" fill="#bd8b5f" stroke="#69482e" stroke-width="1"/><path d="M-13-35q3-17 24-6l3 9" fill="#543a2b"/></g><g id="carriedLoad"></g></g>`;
  }
  const bundleArt=(i,x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><rect x="-18" y="-14" width="36" height="28" rx="5" fill="${i.color}" stroke="#493f31" stroke-width="2"/><path d="M0-14v28M-18 0h36" stroke="#f4d79f" stroke-width="3"/><svg x="-15" y="-13" width="30" height="25" viewBox="0 0 80 70">${i.icon}</svg></g>`;
  const canoeArt=`<path d="M-68 0Q0-34 68 0Q0 35-68 0Z" fill="#e6be7b" stroke="#5e472d" stroke-width="3"/><path d="M-56 0Q0-22 56 0Q0 19-56 0" fill="#a7804f" stroke="#f9da9d" stroke-width="2"/><path d="M-34-7v13M-10-11v20M16-10v19M40-5v9" stroke="#604b30" stroke-width="2"/>`;
  function drawTrail(){
    if(!state)return;const d=trails[state.trail].d;
    for(const id of ['portageTrail','portageTrailShadow','portageTrailEdge'])$(id).setAttribute('d',d);
    const path=$('portageTrail'),length=path.getTotalLength();
    $('portageRoots').innerHTML=trails[state.trail].roots.map((p,n)=>{const pos=path.getPointAtLength(p*length);return `<g data-root="${n}" transform="translate(${pos.x} ${pos.y})"><ellipse rx="22" ry="14" fill="#73664628"/><path d="M-22 5q12-22 30-17M-3 13q-4-15 25-15M-12 2l-7-17" fill="none" stroke="#795031" stroke-width="7" stroke-linecap="round"/><path d="M-22 3q12-22 30-17" fill="none" stroke="#bd8b50" stroke-width="2"/></g>`;}).join('');
  }
  function drawStacks(){
    if(!state)return;
    const near=units.filter(i=>!state.delivered.includes(i.unitId)&&!(state.phase==='carrying'&&state.selected.includes(i.unitId)));
    const far=units.filter(i=>state.delivered.includes(i.unitId));
    $('nearShoreCargo').innerHTML=near.map((i,n)=>bundleArt(i,55+(n%3)*31,498-Math.floor(n/3)*27,.82)).join('');
    $('farShoreCargo').innerHTML=far.map((i,n)=>bundleArt(i,664+(n%3)*27,120-Math.floor(n/3)*25,.82)).join('');
    const carryingCanoe=state.phase==='carrying'&&state.selected.includes('canoe');
    $('shoreCanoe').innerHTML=carryingCanoe?'':`<g transform="translate(${state.canoeDelivered?'818 42':'100 549'}) rotate(${state.canoeDelivered?-12:10})">${canoeArt}</g>`;
    $('carriedLoad').innerHTML=state.phase!=='carrying'?'':carryingCanoe?`<g transform="translate(0 -54) rotate(-6)">${canoeArt}</g>`:units.filter(i=>state.selected.includes(i.unitId)).map((i,n)=>bundleArt(i,-10+(n%2)*22,-27-Math.floor(n/2)*24,.85)).join('');
    $('crewPartner').innerHTML=carryingCanoe?'<g transform="translate(44 0)"><path d="M-8 3l-9 23M6 3l11 21" stroke="#304758" stroke-width="9" stroke-linecap="round"/><path d="M-11-18H11l4 23H-15Z" fill="#4b7274"/><circle cy="-32" r="11" fill="#d3a878"/><path d="M-11-35q7-12 20-4" stroke="#48362b" stroke-width="7"/><path d="M-10-12l-3-32M10-12l3-30" stroke="#d3a878" stroke-width="6"/></g>':'';
  }
  function drawChoices(){
    $('portageCargo').innerHTML=units.map(i=>`<button class="portage-bundle" data-unit="${i.unitId}" aria-pressed="false" aria-label="Carry ${i.name.toLowerCase()} bundle ${Number(i.unitId.split('-')[1])+1}, ${i.kg} kg"><svg viewBox="0 0 80 70" aria-hidden="true">${i.icon}</svg><strong>${i.name}</strong><small>${i.kg} kg · <span>On shore</span></small></button>`).join('');
  }
  function render(){
    $('resumePortage').hidden=!landing();
    if(!state||!$('portageTrail'))return;
    const near=state.phase==='near',carrying=state.phase==='carrying',returning=state.phase==='returning',far=state.phase==='far',done=state.phase==='complete',weight=loadKg(),root=rootIndex();
    $('walkPortage').disabled=!near&&!carrying&&!returning||near&&(!state.selected.length||weight>40)||carrying&&root>=0;
    $('walkPortage').textContent=running?'Pause walking Ⅱ':near?'Carry this load →':returning?'Continue return ↩':'Continue walking →';
    $('walkPortage').setAttribute('aria-pressed',String(running));
    $('stepRoots').disabled=root<0;$('portageView').classList.toggle('root-ready',root>=0);
    $('restPortage').disabled=(!carrying&&!near)||state.energy>=100;
    $('portageView').classList.toggle('portage-overload',weight>40);
    $('portageLoad').textContent=state.selected.includes('canoe')?'Canoe · Separate trip':weight+' / 40 kg';
    $('portageTitle').textContent=done?'Across, together.':far?'A load safely across.':returning?'Back for the next load.':carrying?root>=0?'Roots across the trail.':running?'One step at a time.':'A moment to plan.':'What comes with you?';
    $('portageStage').textContent=done?'PORTAGE COMPLETE':(state.trail==='forest'?'FOREST TRAIL':'ROCKY RIDGE')+(carrying||returning?' · '+Math.round(state.p*100)+'%':'');
    $('shoreTitle').textContent=done?'Every bundle made it.':near?'Choose what to carry.':'Your supplies on both shores.';
    $('portageEnergy').textContent=Math.round(state.energy)+'%';$('portageEnergyFill').style.width=state.energy+'%';
    $('portageDelivered').textContent=state.delivered.length+' / '+units.length;$('portageCanoeStatus').textContent=state.canoeDelivered?'✓ Across':'Waiting';$('portageTrips').textContent=state.trips;
    $('returnPortage').hidden=!far||allAcross();$('reloadPortage').hidden=!far||!allAcross();$('portageResult').hidden=!done;
    $('selectCanoe').disabled=!near||state.canoeDelivered;$('selectCanoe').setAttribute('aria-pressed',String(state.selected.includes('canoe')));$('canoeChoiceMark').textContent=state.canoeDelivered?'✓':state.selected.includes('canoe')?'✓':'＋';
    for(const b of $('portageCargo').querySelectorAll('[data-unit]')){
      const delivered=state.delivered.includes(b.dataset.unit);b.disabled=!near||delivered;b.classList.toggle('delivered',delivered);b.setAttribute('aria-pressed',String(state.selected.includes(b.dataset.unit)));b.querySelector('small span').textContent=delivered?'Across':carrying&&state.selected.includes(b.dataset.unit)?'Carrying':'On shore';
    }
    for(const b of document.querySelectorAll('[data-trail]')){b.disabled=!near;b.setAttribute('aria-pressed',String(b.dataset.trail===state.trail));}
    const path=$('portageTrail'),position=near?0:far||done?1:carrying?state.p:1-state.p;
    const point=path.getPointAtLength(position*path.getTotalLength()),w=$('portageBoard').clientWidth;
    const scale=clamp(600/Math.max(240,w),.8,1.65);
    $('portageCrew').setAttribute('transform',`translate(${point.x} ${point.y-8}) scale(${scale})`);
    const step=running?Math.sin(state.time*10)*7:0;
    $('portageLegs').setAttribute('d',`M-9 5L${-14+step} 25M7 5l${12-step} 19`);
    for(const r of $('portageRoots').querySelectorAll('[data-root]'))r.setAttribute('opacity',state.roots.includes(Number(r.dataset.root))?'.35':'1');
  }
  function arrive(){
    if(state.selected.includes('canoe'))state.canoeDelivered=true;
    else state.delivered=[...new Set([...state.delivered,...state.selected])];
    state.selected=[];state.phase='far';state.p=1;state.trips++;stop();drawStacks();
    announce(allAcross()?'Nothing left behind! Reload the canoe to finish the portage.':'Load safely across. Return for the next load.');
  }
  function update(dt){
    if(!state)return;state.time+=dt;
    if(state.phase==='returning'){
      state.p=Math.min(1,state.p+dt/3.5);state.energy=Math.min(100,state.energy+dt*12);
      if(state.p===1){state.phase='near';state.p=0;state.roots=[];stop();drawStacks();announce('Back at the landing. Choose your next load.');}
    }else if(state.phase==='carrying'){
      const kg=loadKg(),duration=state.trail==='forest'?8+kg*.18:6+kg*.13,next=Math.min(1,state.p+dt/duration);
      const roots=trails[state.trail].roots,barrier=roots.find((p,n)=>!state.roots.includes(n)&&p>=state.p-.00001&&p<=next);
      state.p=barrier===undefined?next:barrier;
      state.energy=Math.max(0,state.energy-dt*(2+kg*.13)*(state.trail==='ridge'?1.2:1));
      if(state.p===1){arrive();return;}
      if(barrier!==undefined){stop();announce('Roots ahead. Choose Step over roots, then continue walking.');}
      else if(state.energy===0){stop();announce('The crew needs a rest. Recover energy, then continue with this load.');}
    }
    render();if(state.time-lastSave>.4){save();lastSave=state.time;}
  }
  function tick(t){if(!running||api.getState().tab!=='portage'){frame=0;lastFrame=0;return;}const dt=lastFrame?Math.min(.06,(t-lastFrame)/1000):0;lastFrame=t;update(dt);if(running)frame=requestAnimationFrame(tick);}
  function toggle(){
    if(!state||$('walkPortage').disabled)return;
    if(running){stop();announce('Paused. Your load and position are saved.');return;}
    if(state.phase==='near'){if(!state.selected.length||loadKg()>40)return;state.phase='carrying';state.p=0;state.roots=[];drawStacks();}
    if(state.phase==='carrying'&&state.energy===0){announce('Rest to recover energy before continuing.');return;}
    running=true;lastFrame=0;announce(state.phase==='returning'?'Returning along the trail with no cargo.':'Walking. Watch for roots and keep an eye on crew energy.');render();frame=requestAnimationFrame(tick);$('portageBoard').focus({preventScroll:true});
  }
  function enter(){
    const t=landing();if(!t){stop();api.openView('packing');$('packFeedback').textContent='Secure your cargo and reach the river landing before starting the portage.';return;}
    stop();if(!state||state.journeyId!==t.journeyId){state=fresh(t);lastSave=0;}
    makeUnits();makeWorld();drawChoices();drawTrail();drawStacks();api.openView('portage');render();save();
    announce(state.phase==='complete'?'Portage complete. Your canoe and all remaining supplies are ready.':state.phase==='far'?allAcross()?'Nothing left behind. Reload the canoe.':'Return for your next load.':state.phase==='near'?'Take up to 40 kg of cargo, or carry the canoe on its own.':rootIndex()>=0?'Roots ahead. Step carefully before continuing.':'Your carrying trip is saved. Continue when you are ready.');
    $('portageView').scrollIntoView({block:'start',behavior:'instant'});$('portageBoard').focus({preventScroll:true});
  }
  function stepForward(){
    if(!state||!['near','carrying','returning'].includes(state.phase))return;
    if(rootIndex()>=0){announce('Roots ahead. Step over them before moving farther.');return;}
    if(state.phase==='near'&&(!state.selected.length||loadKg()>40)){announce('Choose a load up to 40 kg, or choose the canoe.');return;}
    if(state.energy===0&&state.phase!=='returning'){announce('Rest to recover energy before continuing.');return;}
    stop();
    if(state.phase==='near'){state.phase='carrying';state.p=0;state.roots=[];drawStacks();}
    update(.8);save();
    if(['carrying','returning'].includes(state.phase)&&rootIndex()<0&&state.energy>0)announce('One step farther. Tap the trail again, or choose Continue walking.');
  }
  for(const id of ['startPortage','resumePortage'])$(id).addEventListener('click',enter);
  $('portageCargo').addEventListener('click',e=>{
    const b=e.target.closest('[data-unit]');if(!b||!state||state.phase!=='near'||b.disabled)return;
    const id=b.dataset.unit;state.selected=state.selected.filter(x=>x!=='canoe');
    state.selected=state.selected.includes(id)?state.selected.filter(x=>x!==id):[...state.selected,id];
    render();save();announce(loadKg()>40?'Too heavy for one trip. Leave a bundle for later.':state.selected.length?loadKg()+' kg selected. Carry this load when ready.':'Choose cargo for this trip.');
  });
  $('selectCanoe').addEventListener('click',()=>{if(!state||$('selectCanoe').disabled)return;state.selected=state.selected.includes('canoe')?[]:['canoe'];render();save();announce(state.selected.length?'Two crew members will carry the canoe. Cargo travels on separate trips.':'Choose cargo for this trip.');});
  document.querySelectorAll('[data-trail]').forEach(b=>b.addEventListener('click',()=>{if(!state||state.phase!=='near')return;state.trail=b.dataset.trail;state.roots=[];drawTrail();render();save();announce(state.trail==='forest'?'Forest trail: a gentler walk with two root crossings.':'Rocky ridge: a shorter walk with three root crossings.');}));
  $('walkPortage').addEventListener('click',toggle);
  $('stepRoots').addEventListener('click',()=>{const n=rootIndex();if(n<0)return;stop();state.roots.push(n);state.energy=Math.max(0,state.energy-(state.trail==='ridge'?7:4));render();save();announce(state.energy===0?'Roots crossed. Rest before continuing.':'A careful step! The roots are behind you. Continue walking.');$('portageBoard').focus({preventScroll:true});});
  $('restPortage').addEventListener('click',()=>{if(!state||$('restPortage').disabled)return;stop();state.energy=100;state.rests++;render();save();announce('Crew rested. Your load stays with you. Continue when ready.');});
  $('returnPortage').addEventListener('click',()=>{if(!state||state.phase!=='far'||allAcross())return;state.phase='returning';state.p=0;drawStacks();render();toggle();});
  $('reloadPortage').addEventListener('click',()=>{if(!state||state.phase!=='far'||!allAcross())return;state.phase='complete';stop();drawStacks();announce('Portage complete! The canoe and every remaining bundle are ready for the water.');$('portageResult').scrollIntoView({block:'nearest',behavior:'instant'});});
  $('portageBoard').addEventListener('click',()=>{$('portageBoard').focus({preventScroll:true});stepForward();});
  $('portageBoard').addEventListener('keydown',e=>{if(e.repeat)return;if([' ','ArrowUp','ArrowRight','r','R'].includes(e.key)){e.preventDefault();if(e.key===' ')toggle();else if(e.key==='ArrowRight')stepForward();else $(e.key==='ArrowUp'?'stepRoots':'restPortage').click();}});
  $('portageBack').addEventListener('click',()=>{stop();api.openView('river');$('startPortage').focus({preventScroll:true});});
  $('portageMap').addEventListener('click',()=>{stop();api.openView('map');api.selectView('journey');api.selectPlace('kakabeka');$('mapTab').focus({preventScroll:true});$('mapIntro').scrollIntoView({block:'start',behavior:'instant'});});
  $('restartPortage').addEventListener('click',()=>{const t=landing();if(!t)return;stop();state=fresh(t);lastSave=0;makeUnits();drawChoices();drawTrail();drawStacks();render();save();announce('Portage restarted. All remaining cargo is back at the landing.');});
  $('portageHint').addEventListener('click',()=>{const open=$('portageHintText').hidden;$('portageHintText').hidden=!open;$('portageHint').setAttribute('aria-expanded',String(open));});
  window.addEventListener('river-routes-view',e=>{if(e.detail!=='portage')stop();else requestAnimationFrame(render);});
  $('sourcesButton').addEventListener('click',stop);window.addEventListener('blur',stop);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',save);
  new ResizeObserver(()=>requestAnimationFrame(render)).observe($('portageBoard'));
  const previous=api.getState;
  api.getState=()=>({...previous(),portage:state?{...state,manifest:{...state.manifest,counts:{...state.manifest.counts}},selected:[...state.selected],delivered:[...state.delivered],roots:[...state.roots],running,loadKg:loadKg(),allAcross:allAcross(),rootAhead:rootIndex()>=0}:null});
  if(state)makeUnits();$('resumePortage').hidden=!landing();
})();
