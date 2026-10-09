(() => {
  'use strict';
  const $=id=>document.getElementById(id),api=window.RiverRoutesPreview,M=window.RIVER_TRADE,J=window.RIVER_ONWARD,baseState=api.getState,key='bgsd-river-routes-onward-1';
  let state=null,saved=null,running=false,frame=0,last=0,lastSave=0;
  try{saved=JSON.parse(localStorage.getItem(key));}catch{}
  function source(){
    const s=baseState(),p=s.portage,t=s.travel,c=s.cargo;
    return p?.phase==='complete'&&p.allAcross&&t?.status==='landed'&&p.journeyId===t.journeyId&&c?.secured&&c.ready&&api.cargoItems.every(i=>t.manifest.counts[i.id]===c.counts[i.id])?{journeyId:p.journeyId,counts:{...p.manifest.counts},hull:p.manifest.hull}:null;
  }
  const current=()=>{const src=source();return !!src&&!!state&&state.sourceKey===J.signature(src);};
  const save=()=>{if(state)try{localStorage.setItem(key,JSON.stringify(state));}catch{}};
  function sync(){const src=source();if(src&&(!state||state.sourceKey!==J.signature(src))){state=J.restore(saved,src);saved=null;save();}return !!src&&current();}
  const picture=id=>{const i=M.items.find(i=>i.id===id);return `<span class="trade-object" style="--object-x:${i.cell%4*100/3}%;--object-y:${Math.floor(i.cell/4)*100}%" aria-hidden="true"></span>`;};
  function makeMap(){
    const base=window.RIVER_MAP.svg.replace(/id="([^"]+)"/g,(_,id)=>`id="onward-${id}"`).replace(/url\(#([^\)]+)\)/g,(_,id)=>`url(#onward-${id})`).replaceAll('#dcecea','#193f59').replaceAll('#c3dfde','#235a6c').replaceAll('#dbe3cc','#e8d4a1').replaceAll('#b7cba5','#bba87b');
    const a=window.RIVER_MAP.points.kakabeka,b=window.RIVER_MAP.points['rainy-lake'];
    $('onwardMap').innerHTML=`<title id="onwardMapTitle">Your canoe moves inland from Kakabeka Falls toward the Rainy Lake depot. The line is a simplified connection, not a surveyed waterway.</title>${base}<path id="onwardRouteHalo" class="onward-route-halo"/><path id="onwardRoute" class="onward-route"/><path id="onwardRouteDone" class="onward-route-done"/><g class="onward-map-labels"><circle cx="${a[0]}" cy="${a[1]}" r="1.1"/><text x="${a[0]}" y="${a[1]+4}" text-anchor="middle">Kakabeka</text><circle cx="${b[0]}" cy="${b[1]}" r="1.1"/><text x="${b[0]}" y="${b[1]+4}" text-anchor="middle">Rainy Lake</text><text x="637" y="652" text-anchor="middle" class="onward-water-label">Lake Superior</text></g><g id="onwardCanoe"><ellipse cy=".7" rx="4.8" ry="1.8" fill="#31443e55"/><path d="M-4.6 0Q0-3.4 4.6 0Q0 3.4-4.6 0Z" fill="#efc583" stroke="#4f3923" stroke-width=".23"/><path d="M-3.6 0Q0-2.5 3.6 0Q0 2.5-3.6 0Z" fill="#967348" stroke="#ffe2a9" stroke-width=".2"/><path d="M-2.5-.7v1.4M0-1.2v2.4M2.5-.7v1.4" stroke="#4f3923" stroke-width=".17"/><path d="M-1.4-.4l-1.8-2M1.5.3l1.9 2" stroke="#593c26" stroke-width=".2" stroke-linecap="round"/><path d="M-3.2-2.4l-.5-.4M3.4 2.3l.5.4" stroke="#c18f50" stroke-width=".5" stroke-linecap="round"/><ellipse cx="-1.3" rx=".65" ry=".5" fill="#a45036"/><ellipse cx="1.3" rx=".65" ry=".5" fill="#3b5a71"/><circle cx="-1.4" cy="-.25" r=".31" fill="#d2a170"/><circle cx="1.2" cy="-.25" r=".31" fill="#c38f61"/></g>`;
  }
  function drawMap(){
    if(!state)return;const a=window.RIVER_MAP.points.kakabeka,b=window.RIVER_MAP.points['rainy-lake'];
    const d=`M${a.join(' ')}Q603 624 595 625Q${state.route==='crossing'?'584 625':'585 615'} ${b.join(' ')}`;
    for(const id of ['onwardRoute','onwardRouteHalo','onwardRouteDone'])$(id).setAttribute('d',d);
    const path=$('onwardRoute'),length=path.getTotalLength(),point=path.getPointAtLength(length*state.progress);
    const unit=Math.max(100/($('onwardMap').clientWidth||600),68/($('onwardMap').clientHeight||300));
    $('onwardCanoe').setAttribute('transform',`translate(${point.x} ${point.y}) scale(${unit*7})`);
    $('onwardMap').querySelectorAll('.onward-map-labels text').forEach(el=>el.style.fontSize=unit*12+'px');
    $('onwardRouteDone').setAttribute('stroke-dasharray',`${length*state.progress} ${length}`);
    api.setTravelProgress({leg:'inland',progress:state.progress});
  }
  function render(){
    const available=sync();$('resumeOnward').hidden=!available;
    if(!state)return;
    if(!$('onwardRoute'))makeMap();
    const arrived=state.phase==='arrived',choice=state.phase==='choice',moving=['first','second'].includes(state.phase);
    $('onwardPanelTitle').textContent=arrived&&M.goal(state.visit)?'Journey complete!':arrived?'You reached the depot.':'Make it to the post.';
    $('resumeOnward').textContent=arrived?'Return to Rainy Lake →':'Continue inland →';
    $('onwardTitle').textContent=arrived&&M.goal(state.visit)?'Journey complete!':arrived?'Land at Rainy Lake.':choice?'Choose your crossing.':state.phase==='ready'?'Back on the water.':running?'Into the interior.':'Your canoe is waiting.';
    $('onwardStage').textContent=arrived?'RAINY LAKE · ARRIVED':choice?'A CHOICE ON THE WATER':state.route==='shore'?'SHELTERED SHORE':state.route==='crossing'?'OPEN CROSSING':'KAKABEKA → RAINY LAKE';
    $('onwardProgress').textContent=Math.round(state.progress*100)+'%';$('onwardProgressFill').style.width=state.progress*100+'%';
    $('onwardFood').textContent=M.food(state.visit)*2+' days';$('onwardHull').textContent=Math.round(state.hull)+'%';$('onwardWeight').textContent=M.weight(state.visit)+' / 130 kg';
    $('onwardChoices').hidden=!choice;$('takeShore').disabled=state.visit.foodReserve<1;$('takeCrossing').disabled=state.hull<=16;
    $('paddleOnward').hidden=choice||arrived;$('paddleOnward').textContent=running?'Pause paddling Ⅱ':state.phase==='ready'?'Paddle inland →':'Continue paddling →';$('paddleOnward').setAttribute('aria-pressed',String(running));
    $('stepOnward').hidden=choice||arrived;$('stepOnward').disabled=!moving&&state.phase!=='ready';
    $('mendOnward').hidden=arrived;$('mendOnward').disabled=state.hull>=100||state.visit.own.repair<1;$('onwardRepairs').textContent=state.visit.own.repair+' kit'+(state.visit.own.repair===1?'':'s');
    $('onwardArrival').hidden=!arrived;$('onwardChoicesNote').hidden=!choice;
    $('onwardDestinationPreview').hidden=arrived;
    $('enterRainyPost').textContent=arrived&&M.goal(state.visit)?'Review my exchanges →':'Trade at Rainy Lake →';
    $('onwardCargo').innerHTML=`<span class="onward-cargo-good" title="Food from your portage">${picture('fish')}<b>×${state.visit.foodReserve}</b><small>Provisions</small></span>`+M.ids.filter(id=>state.visit.own[id]).map(id=>`<span class="onward-cargo-good" title="${M.items.find(i=>i.id===id).name}">${picture(id)}<b>×${state.visit.own[id]}</b><small>${M.items.find(i=>i.id===id).short}</small></span>`).join('');
    if(arrived)$('onwardFeedback').textContent=M.goal(state.visit)?'Food and furs aboard. Your successful exchanges are saved.':'Your carried goods are ready for the traders. Choose what to keep and what to offer.';
    drawMap();
  }
  function stop(){running=false;if(frame)cancelAnimationFrame(frame);frame=0;last=0;save();if(state&&$('paddleOnward')){$('paddleOnward').setAttribute('aria-pressed','false');$('paddleOnward').textContent=state.phase==='ready'?'Paddle inland →':'Continue paddling →';}}
  function advance(amount){
    if(!current())return stop();
    const phase=state.phase;state=J.move(state,amount);drawMap();
    $('onwardProgress').textContent=Math.round(state.progress*100)+'%';$('onwardProgressFill').style.width=state.progress*100+'%';
    if(state.phase!==phase){stop();render();if(state.phase==='choice'){$('onwardFeedback').textContent='One provision bundle used. A longer shore route protects the canoe; a quicker crossing saves food.';$('takeShore').focus({preventScroll:true});}else if(state.phase==='arrived')$('enterRainyPost').focus({preventScroll:true});}
  }
  function tick(t){if(!running)return;const dt=last?Math.min(.07,(t-last)/1000):0;last=t;advance(dt*(state.route==='shore'?.045:.075));if(running){if(t-lastSave>600){save();lastSave=t;}frame=requestAnimationFrame(tick);}}
  function toggle(){
    if(!sync())return;
    if(running){stop();render();$('onwardFeedback').textContent='Paused. Your position and supplies are saved.';return;}
    if(state.phase==='ready'){const n=J.start(state);if(!n)return;state=n;}
    if(!['first','second'].includes(state.phase))return;
    running=true;last=0;render();$('onwardFeedback').textContent='Your canoe is moving. Pause any time, or use → for one paddle stroke.';frame=requestAnimationFrame(tick);
  }
  function enter(){
    stop();if(!sync()){api.openView('portage');$('portageFeedback').textContent='Finish carrying every bundle and reload the canoe first.';return;}
    makeMap();api.openView('onward');render();save();$('onwardView').scrollIntoView({block:'start',behavior:'instant'});$('onwardTitle').focus({preventScroll:true});
    if(state.phase==='ready')$('onwardFeedback').textContent='Your remaining portage cargo is aboard. Follow the connection toward Rainy Lake.';
  }
  $('paddleOnward').addEventListener('click',toggle);
  function stroke(){if(!sync())return;stop();if(state.phase==='ready')state=J.start(state)||state;if(['first','second'].includes(state.phase))advance(.06);render();save();}
  $('stepOnward').addEventListener('click',stroke);
  $('onwardMapSurface').addEventListener('keydown',e=>{if(e.repeat)return;if([' ','ArrowRight'].includes(e.key)){e.preventDefault();e.key===' '?toggle():stroke();}});
  for(const [id,route]of [['takeShore','shore'],['takeCrossing','crossing']])$(id).addEventListener('click',()=>{const n=J.choose(state,route);if(!n)return;state=n;save();render();$('onwardFeedback').textContent=route==='shore'?'Shore route chosen. One more food bundle will be used.':'Crossing chosen. The canoe will lose 16 condition points.';toggle();});
  $('mendOnward').addEventListener('click',()=>{stop();const n=state&&J.repair(state);if(!n)return;state=n;save();render();$('onwardFeedback').textContent='One repair kit used. The canoe recovers up to 40 condition points.';});
  for(const id of ['startOnward','resumeOnward'])$(id).addEventListener('click',enter);
  $('onwardBack').addEventListener('click',()=>{stop();api.openView('adventure');$('startPacking').focus({preventScroll:true});});
  $('enterRainyPost').addEventListener('click',()=>{stop();if(current()&&state.phase==='arrived')api.openJourneyTrading();});
  $('onwardOverview').addEventListener('click',()=>{stop();api.openView('map');api.selectView('journey');api.selectPlace(state?.phase==='arrived'?'rainy-lake':'kakabeka');$('mapIntro').scrollIntoView({block:'start',behavior:'instant'});});
  window.addEventListener('river-routes-view',e=>{if(e.detail!=='onward')stop();if(['onward','adventure'].includes(e.detail))render();else if(e.detail==='map'&&current())drawMap();});
  window.addEventListener('blur',stop);document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});window.addEventListener('pagehide',save);$('sourcesButton').addEventListener('click',stop);
  function fit(){const map=$('onwardMapSurface').getBoundingClientRect(),world=$('onwardView').querySelector('.onward-world').getBoundingClientRect();document.documentElement.style.setProperty('--onward-map-height',Math.max(130,window.innerHeight-map.top-window.scrollY-(world.height-map.height)-18)+'px');drawMap();}
  new ResizeObserver(()=>{if(!$('onwardView').hidden)fit();}).observe($('onwardView'));window.addEventListener('resize',fit);
  api.onward={canTrade:()=>current()&&state.phase==='arrived',getVisit:()=>state?.visit,saveVisit:v=>{if(!current()||state.phase!=='arrived')return false;state.visit=v;save();return true;},exchange:()=>{if(!current())return null;const next=J.exchange(state);if(!next)return null;state=next;save();return state.visit;},open:enter};
  api.getState=()=>({...baseState(),onward:state?{...structuredClone(state),running,available:current()}:null});
  api.resetOnward=()=>{stop();state=null;saved=null;render();};
  sync();render();
})();
