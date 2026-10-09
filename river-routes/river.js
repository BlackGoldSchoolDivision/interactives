(() => {
  'use strict';
  const $=id=>document.getElementById(id),api=window.RiverRoutesPreview;
  const storageKey='bgsd-river-routes-travel-1',finish=2480,length=2800;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const center=p=>500+100*Math.sin(p/470)+42*Math.sin(p/190);
  const half=p=>185+22*Math.sin(p/390);
  const mapStart=window.RIVER_MAP.points['fort-william'],mapEnd=window.RIVER_MAP.points.kakabeka;
  const legBox=[Math.min(mapStart[0],mapEnd[0])-2,Math.min(mapStart[1],mapEnd[1])-2.7,Math.abs(mapStart[0]-mapEnd[0])+4,5.4];
  const rocks=[{p:510,o:-.5,r:30},{p:820,o:.4,r:34},{p:1110,o:0,r:36},{p:1440,o:-.4,r:31},{p:1740,o:.45,r:35},{p:2070,o:0,r:35}];
  const fresh=manifest=>({journeyId:Date.now()+'-'+Math.random().toString(36).slice(2,8),p:100,o:0,hull:100,time:0,hits:0,repairs:0,status:'ready',manifest:JSON.parse(JSON.stringify(manifest))});
  let state=null,running=false,direction=0,lastFrame=0,frame=0,lastSave=0,cooldown=0,lastAnnouncement='';
  try{const s=JSON.parse(localStorage.getItem(storageKey));if(s&&Number.isFinite(s.p)&&Number.isFinite(s.o)&&Number.isFinite(s.hull)&&Number.isFinite(s.time)&&Number.isFinite(s.manifest?.kg)&&s.manifest?.counts&&['ready','landed','stranded'].includes(s.status))state={...s,p:clamp(s.p,100,finish),o:clamp(s.o,-.88,.88),hull:clamp(s.hull,0,100),time:Math.max(0,s.time),repairs:clamp(Number(s.repairs)||0,0,6),hits:Math.max(0,Number(s.hits)||0)};}catch{}
  const save=()=>{if(state)try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}};
  if(state&&!state.journeyId){state.journeyId='saved-'+JSON.stringify(state.manifest.counts)+'-'+state.time;save();}
  const boatScale=()=>Math.max(1,32*1000/Math.max(200,$('riverBoard').clientWidth)/50);
  const progress=()=>state?clamp((state.p-100)/(finish-100),0,1):0;
  const canLand=()=>state&&state.status==='ready'&&state.p>=2370&&state.o<=-.45;
  const needsCargo=()=>{const c=api.getState().cargo;return c?.secured&&c.ready?c:null;};
  function announce(message){if(lastAnnouncement!==message){$('riverFeedback').textContent=message;lastAnnouncement=message;}}
  function stop(){running=false;direction=0;lastFrame=0;if(frame)cancelAnimationFrame(frame);frame=0;save();render();}
  const tree=(x,y,n)=>`<g transform="translate(${x} ${y}) scale(${.8+(n%4)*.2})"><ellipse cy="15" rx="23" ry="9" fill="#152f3045"/><path d="M0-36L-23 9H23Z M0-51L-17-15H17Z" fill="${['#305b43','#48724c','#7c803e','#c59a40'][n%4]}" stroke="#213e2e" stroke-width="2"/><path d="M0 5v16" stroke="#695332" stroke-width="5"/></g>`;
  function makeWorld(){
    const left=[],right=[];for(let p=0;p<=length;p+=40){left.push(`${center(p)-half(p)},${length-p}`);right.push(`${center(p)+half(p)},${length-p}`);}
    const shore=`M${left.join('L')}L${right.reverse().join('L')}Z`;
    const trees=[];for(let p=40,n=0;p<length;p+=70,n++){const c=center(p),h=half(p);for(const side of [-1,1])for(let k=0;k<3;k++)trees.push(tree(c+side*(h+38+k*69)+Math.sin(n*3+k)*17,length-p+(k%2)*28,n+k));}
    const rockArt=rocks.map(r=>`<g transform="translate(${center(r.p)+r.o*half(r.p)} ${length-r.p})"><ellipse cy="8" rx="${r.r+19}" ry="${r.r+7}" fill="#c9fff4" opacity=".4"/><path d="M${-r.r} 8L${-r.r*.6} ${-r.r*.7}L${r.r*.5} ${-r.r}L${r.r} 1L${r.r*.6} ${r.r*.7}L${-r.r*.5} ${r.r}Z" fill="#697c80" stroke="#334952" stroke-width="4"/><path d="M${-r.r*.6} ${-r.r*.7}L0 0L${r.r*.5} ${-r.r}" fill="#9dadac"/><path d="M${-r.r-12} ${r.r+15}q${r.r+12} 12 ${2*r.r+24} 0" fill="none" stroke="#e3ffed" stroke-width="4"/></g>`).join('');
    const currents=[];for(let p=70;p<length;p+=170){for(let o of [-.65,.65])currents.push(`<path class="current-stroke" d="M${center(p)+o*half(p)} ${length-p}l-4 39m-8-11l8 11 10-10" fill="none" stroke="#b0f4ee" stroke-width="4" opacity=".5"/>`);}
    const landingX=center(2420)-half(2420)*.75,landingY=length-2420;
    $('riverWorld').innerHTML=`<title id="riverWorldTitle">A winding river with rocks and a gold portage landing. Your canoe travels upstream.</title><defs><linearGradient id="riverWater" x2="1" y2="0"><stop stop-color="#127483"/><stop offset=".45" stop-color="#29abb6"/><stop offset="1" stop-color="#0d6983"/></linearGradient><pattern id="riverSoil" width="90" height="80" patternUnits="userSpaceOnUse"><rect width="90" height="80" fill="#89864c"/><path d="M4 20l29 6M48 67l24-4M64 13l17 6" stroke="#b6a868" stroke-width="3" opacity=".5"/><circle cx="18" cy="60" r="7" fill="#676f43" opacity=".5"/></pattern></defs><rect width="1000" height="2800" fill="url(#riverSoil)"/><path d="${shore}" fill="url(#riverWater)" stroke="#d4c18b" stroke-width="24"/><path d="${shore}" fill="none" stroke="#163f4160" stroke-width="5"/>${trees.join('')}${currents.join('')}${rockArt}<g transform="translate(${landingX} ${landingY})"><ellipse rx="62" ry="93" fill="#ffc66230" stroke="#ffdc7f" stroke-width="5" stroke-dasharray="12 10"/><path d="M-67-40h63v90h-63Z" fill="#bd8a43" stroke="#644927" stroke-width="4"/><path d="M-66-20h62M-66 0h62M-66 20h62M-66 40h62" stroke="#f0cd85" stroke-width="3"/><path d="M-67-58v-73l53 20-53 20" fill="#ffd66c" stroke="#725b30" stroke-width="4"/><text x="-18" y="125" text-anchor="middle" fill="#fff2c4" stroke="#194352" stroke-width="5" paint-order="stroke" font-size="27" font-family="Arial" font-weight="700">LAND HERE</text></g><path d="M${center(2650)-half(2650)} 150h${half(2650)*2}" stroke="#e5ffff" stroke-width="34" stroke-dasharray="6 5"/><text x="${center(2650)}" y="110" text-anchor="middle" fill="#fff4d1" stroke="#164558" stroke-width="6" paint-order="stroke" font-size="28" font-family="Arial">FALLS · STOP AT THE LANDING</text><g id="movingCanoe"><ellipse cy="13" rx="33" ry="58" fill="#063e5577"/><path d="M0-58Q54-12 0 58Q-54-12 0-58Z" fill="#dcaf67" stroke="#543d26" stroke-width="4"/><path d="M0-47Q37-9 0 47Q-37-9 0-47Z" fill="#7f6241" stroke="#f1d7a2" stroke-width="3"/><g id="riverCargoSprites"></g><g id="riverPaddle"><path d="M-20 17L-51-25" stroke="#dfb779" stroke-width="5"/><ellipse cx="-54" cy="-30" rx="7" ry="15" transform="rotate(-30 -54 -30)" fill="#e2bd7f"/></g><circle cy="24" r="9" fill="#c89869"/><path d="M-11 35L-9 14H9l2 21" fill="#284354"/></g>`;
    const m=window.RIVER_MAP,b=legBox;
    $('riverRouteMini').setAttribute('viewBox',b.join(' '));
    const a=m.points['fort-william'],z=m.points.kakabeka;
    $('riverRouteMini').innerHTML=`${m.svg}<path d="M${a.join(',')}L${z.join(',')}" stroke="#ffce72" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/><circle cx="${a[0]}" cy="${a[1]}" r=".15" fill="#ffedb6"/><circle cx="${z[0]}" cy="${z[1]}" r=".15" fill="#ffedb6"/><text x="${a[0]}" y="${a[1]+.85}" font-size=".4" text-anchor="middle" fill="#fff1c7">Fort William</text><text x="${z[0]}" y="${z[1]-.85}" font-size=".4" text-anchor="middle" fill="#fff1c7">Kakabeka</text><g id="riverMiniCanoe"><circle r="10" fill="#ffd475" stroke="#123249" stroke-width="2"/><path d="M-5 0Q0 8 5 0" fill="none" stroke="#203d47" stroke-width="2"/></g>`;
  }
  function render(){
    const s=state,valid=!!s,landed=s?.status==='landed',failed=s?.status==='stranded';
    $('resumeRiver').hidden=!valid;
    $('paddleToggle').disabled=!valid||landed||failed;
    $('paddleToggle').textContent=running?'Pause paddling Ⅱ':s&&s.p>100?'Continue paddling ▶':'Start paddling ▶';
    $('paddleToggle').setAttribute('aria-pressed',String(running));
    $('landCanoe').disabled=!canLand();$('landCanoe').hidden=landed||failed;
    $('riverResult').hidden=!landed;
    $('repairCanoe').disabled=!s||landed||failed||s.hull>=100||s.repairs>=s.manifest.counts.repair;
    $('repairCanoe').textContent=s&&s.repairs>=s.manifest.counts.repair?'Repair kit used':'Use repair kit';
    $('riverTitle').textContent=landed?'You reached the landing.':failed?'The canoe needs help.':running?'Find a clear channel.':'Your journey awaits.';
    $('riverHull').textContent=(s?Math.round(s.hull):100)+'%';$('riverLoad').textContent=(s?s.manifest.kg:0)+' kg';
    $('riverTime').textContent=s?Math.floor(s.time/60)+':'+String(Math.floor(s.time%60)).padStart(2,'0'):'0:00';
    const percent=Math.round(progress()*100);$('riverPercent').textContent=percent+'%';$('riverProgressFill').style.width=percent+'%';
    $('riverView').classList.toggle('river-damaged',!!s&&s.hull<40);
    if(s){api.setTravelProgress(progress());const size=boatScale(),x=center(s.p)+s.o*(half(s.p)-32),y=length-s.p;const h=$('riverBoard').clientHeight,w=$('riverBoard').clientWidth;
      if(!w||!h)return;
      const visible=1000*h/w,top=clamp(y-visible*.66,0,Math.max(0,length-visible));
      $('riverWorld').setAttribute('viewBox',`0 ${top} 1000 ${visible}`);
      $('movingCanoe').setAttribute('transform',`translate(${x} ${y}) rotate(${direction*10}) scale(${size})`);
      $('riverPaddle').setAttribute('transform',running?`rotate(${Math.sin(s.time*9)*19})`:'');
      $('movingCanoe').classList.toggle('is-paddling',running);
      const a=window.RIVER_MAP.points['fort-william'],b=window.RIVER_MAP.points.kakabeka,u=progress(),box=legBox;
      const scale=Math.max(box[2]/250,box[3]/160);
      $('riverMiniCanoe').setAttribute('transform',`translate(${a[0]+(b[0]-a[0])*u} ${a[1]+(b[1]-a[1])*u}) scale(${scale})`);
      api.setTravelProgress(u);
    }
  }
  function drawCargo(){if(!state)return;const colors={food:'#c19a61',repair:'#71917a',cloth:'#bc6550',kettle:'#9baba6',tools:'#ac8355',beads:'#43a1a8'};
    const bundles=Object.entries(state.manifest.counts).flatMap(([id,n])=>Array.from({length:n},()=>id));
    $('riverCargoSprites').innerHTML=bundles.slice(0,6).map((id,n)=>`<rect x="${n%2?-1:-18}" y="${-34+Math.floor(n/2)*16}" width="17" height="14" rx="3" fill="${colors[id]||'#c7a771'}" stroke="#f2dca0" stroke-width="1.5"/>`).join('');
  }
  function bump(message,damage){if(cooldown>0)return;state.hull=Math.max(0,state.hull-damage);state.hits++;cooldown=1.6;announce(message);$('riverToast').textContent=message;setTimeout(()=>{$('riverToast').textContent='';},1500);if(!state.hull){state.status='stranded';stop();announce('The canoe needs repairs. Restart the river to try a safer path.');}}
  function update(dt){
    if(!state||state.status!=='ready')return;
    const s=state;cooldown=Math.max(0,cooldown-dt);s.time+=dt;
    const speed=120-s.manifest.kg*.3; // upstream current is included in the simplified speed
    s.p=Math.min(finish,s.p+speed*dt);s.o+=direction*dt*.85+Math.sin(s.p/150)*dt*.035;
    if(Math.abs(s.o)>.88){s.o=clamp(s.o,-.86,.86);bump('Rocky bank! Steer back toward the water.',6);}
    const x=center(s.p)+s.o*(half(s.p)-32),radius=boatScale()*21;
    for(const r of rocks){if(Math.abs(s.p-r.p)<r.r+36&&Math.abs(x-(center(r.p)+r.o*half(r.p)))<r.r+radius){bump('Rock ahead! Move around it.',14);}}
    if(s.p>=finish&&!canLand())announce('Landing ahead on your left. Steer left, then choose Land at the portage.');
    else if(canLand())announce('You are beside the gold landing. Choose Land at the portage.');
    render();if(s.time-lastSave>.5){save();lastSave=s.time;}
  }
  function tick(t){if(!running||api.getState().tab!=='river'){frame=0;lastFrame=0;return;}const dt=lastFrame?Math.min(.06,(t-lastFrame)/1000):0;lastFrame=t;update(dt);if(running)frame=requestAnimationFrame(tick);}
  function toggle(){if(!state||state.status!=='ready')return;if(running){stop();announce('Paused. Your canoe and cargo are saved.');}else{running=true;lastFrame=0;announce('Paddling upstream. Steer around the rocks.');render();frame=requestAnimationFrame(tick);}$('riverBoard').focus({preventScroll:true});}
  function enter(){
    const cargo=needsCargo();if(!cargo){api.openView('packing');$('packFeedback').textContent='Secure your cargo before launching the canoe.';return;}
    if(!state||JSON.stringify(state.manifest.counts)!==JSON.stringify(cargo.counts)){state=fresh(cargo);cooldown=0;lastSave=0;}
    api.openView('river');drawCargo();render();save();
    announce(state.status==='landed'?'Your canoe is safely at the portage landing.':state.status==='stranded'?'Restart the river to try a safer path.':'Start paddling, then steer around the rocks.');
    $('riverView').scrollIntoView({block:'start',behavior:'instant'});$('riverBoard').focus({preventScroll:true});
  }
  for(const id of ['launchRiver','resumeRiver'])$(id).addEventListener('click',enter);
  $('paddleToggle').addEventListener('click',toggle);
  function stepSteer(sign){if(!state||state.status!=='ready')return;state.o=clamp(state.o+sign*.14,-.86,.86);render();save();}
  for(const [id,sign] of [['steerLeft',-1],['steerRight',1]]){const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();$('riverBoard').focus({preventScroll:true});direction=sign;b.setPointerCapture(e.pointerId);});for(const name of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(name,()=>{direction=0;});b.addEventListener('click',()=>stepSteer(sign));}
  $('riverBoard').addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(['arrowleft','arrowright','a','d',' '].includes(k)){e.preventDefault();if(k===' '){if(!e.repeat)toggle();}else {direction=['arrowleft','a'].includes(k)?-1:1;if(!running&&!e.repeat)stepSteer(direction);}}});
  $('riverBoard').addEventListener('keyup',e=>{if(['arrowleft','arrowright','a','d'].includes(e.key.toLowerCase()))direction=0;});
  $('riverBoard').addEventListener('blur',()=>{direction=0;});
  $('landCanoe').addEventListener('click',()=>{if(!canLand())return;state.status='landed';state.p=finish;stop();announce('Safe on shore! Your canoe and cargo reached the portage landing.');$('riverResult').scrollIntoView({block:'nearest',behavior:'instant'});});
  $('repairCanoe').addEventListener('click',()=>{if(!state||$('repairCanoe').disabled)return;state.repairs++;state.hull=Math.min(100,state.hull+40);render();save();announce('Repair kit used. Canoe condition improved by up to 40%.');});
  $('restartRiver').addEventListener('click',()=>{if(!state)return;stop();state=fresh(needsCargo()||state.manifest);cooldown=0;lastSave=0;drawCargo();render();save();announce('River restarted. Your packed cargo is ready.');});
  $('riverBack').addEventListener('click',()=>{stop();api.openView('packing');$('backToCamp').focus({preventScroll:true});});
  $('riverShowMap').addEventListener('click',()=>{stop();api.openView('map');api.selectView('journey');api.selectPlace('kakabeka');$('mapTab').focus({preventScroll:true});$('mapIntro').scrollIntoView({block:'start',behavior:'instant'});});
  $('riverHint').addEventListener('click',()=>{const open=$('riverHintText').hidden;$('riverHintText').hidden=!open;$('riverHint').setAttribute('aria-expanded',String(open));});
  window.addEventListener('river-routes-view',e=>{if(e.detail!=='river')stop();else requestAnimationFrame(render);});
  $('sourcesButton').addEventListener('click',stop);
  window.addEventListener('blur',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',save);
  new ResizeObserver(()=>requestAnimationFrame(render)).observe($('riverBoard'));
  const previous=api.getState;api.getState=()=>({...previous(),travel:state?{...state,manifest:{...state.manifest,counts:{...state.manifest.counts}},running,progress:progress(),canLand:canLand()}:null});
  api.openRiver=enter;
  api.resetRiver=()=>{stop();state=null;cooldown=0;lastSave=0;lastAnnouncement='';render();};
  makeWorld();drawCargo();render();
})();

