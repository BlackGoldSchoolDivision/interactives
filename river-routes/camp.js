(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const art = 'assets/river-camp.webp';
  const artWidth=1536, artHeight=1024;
  const history='https://fwhp.ca/about-us/our-history/';
  const objects=[
    {id:'canoe',name:'Canoe',eyebrow:'YOUR RIDE INLAND',title:'Light enough to carry.',fact:'Birchbark canoes could travel by water—and be carried over land.',detail:'Indigenous canoe technology and route knowledge helped the fur trade work. At Fort William, Anishinaabe knowledge, skilled workers, and supplies connected the canoe network.',source:history,x:.49,y:.73,crop:[.25,.55,.40,.29],place:'fort-william'},
    {id:'cargo',name:'Cargo',eyebrow:'EVERY BUNDLE COUNTS',title:'Space is precious.',fact:'Food and trade goods have to share the canoe.',detail:'A long journey requires supplies as well as goods to exchange. Choosing cargo means balancing limited space with what the crew and trading partners need.',source:history,x:.20,y:.71,crop:[.05,.61,.29,.23],place:'fort-william'},
    {id:'river',name:'River',eyebrow:'FOLLOW THE WATER',title:'The river is the road.',fact:'Waterways connect the posts. Local route knowledge guides the journey.',detail:'These routes existed long before the companies arrived. The inland network relied on Indigenous knowledge of rivers, lakes, food sources, and overland connections.',source:history,x:.78,y:.53,crop:[.60,.13,.40,.40],place:'rainy-lake'},
    {id:'portage',name:'Portage',eyebrow:'THE WAY AROUND',title:'Carry on over land.',fact:'A portage takes the canoe and cargo around an obstacle.',detail:'At Kakabeka Falls, travellers carried their canoe and cargo around the waterfall. This artwork shows an illustrative woodland portage; it is not a precise reconstruction of that trail.',source:'https://www.ontarioparks.ca/park/Kakabekafalls/activities',x:.37,y:.45,crop:[.28,.28,.23,.27],place:'kakabeka'},
    {id:'post',name:'Post',eyebrow:'A PLACE TO MEET',title:'Trade takes people.',fact:'Posts connect goods, supplies, skills, and trading relationships.',detail:'The companies depended on Indigenous trading networks and relationships. Fort William was an important North West Company rendezvous where brigades from the east met those from the interior. The cabin in this artwork is illustrative, not Fort William.',source:history,x:.155,y:.225,crop:[.075,.145,.21,.16],place:'fort-william'}
  ];
  const byId=Object.fromEntries(objects.map(o=>[o.id,o]));
  const storageKey='bgsd-river-routes-camp-1';
  let state={selected:null,found:[]};
  try{const saved=JSON.parse(localStorage.getItem(storageKey));if(saved){state.selected=byId[saved.selected]?saved.selected:null;state.found=Array.isArray(saved.found)?[...new Set(saved.found.filter(id=>byId[id]))]:[];}}catch{}
  const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}};
  const portrait=o=>`<svg viewBox="${o.crop.map((v,i)=>v*(i%2===0?artWidth:artHeight)).join(' ')}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href="${art}" width="${artWidth}" height="${artHeight}"/></svg>`;
  $('sceneHotspots').innerHTML=objects.map(o=>`<button class="scene-hotspot" data-object="${o.id}" aria-label="Discover the ${o.name.toLowerCase()}" aria-pressed="false"><span class="hotspot-glyph" aria-hidden="true">+</span><span class="hotspot-label" aria-hidden="true">${o.name}</span></button>`).join('');
  $('discoveryDeck').innerHTML=objects.map(o=>`<button class="discovery-choice" data-object="${o.id}" aria-pressed="false"><span class="choice-picture" aria-hidden="true">${portrait(o)}</span><span class="choice-name">${o.name}</span><span class="choice-tick" aria-hidden="true" hidden>✓</span></button>`).join('');
  const cropPosition=()=>{
    const frame=$('sceneFrame'),width=frame.clientWidth,height=frame.clientHeight;
    if(!width||!height)return;
    const scale=Math.max(width/artWidth,height/artHeight),dx=(artWidth*scale-width)/2,dy=(artHeight*scale-height)/2;
    for(const o of objects){const button=$('sceneHotspots').querySelector(`[data-object="${o.id}"]`);button.style.left=(o.x*artWidth*scale-dx)+'px';button.style.top=(o.y*artHeight*scale-dy)+'px';}
  };
  function render(){
    const selected=byId[state.selected],complete=state.found.length===objects.length;
    $('objectEyebrow').textContent=selected?selected.eyebrow:'YOUR FIRST JOURNEY';
    $('objectTitle').textContent=selected?selected.title:'Into the interior.';
    $('objectFact').textContent=selected?selected.fact:'Choose something in the camp.';
    $('objectPortrait').innerHTML=portrait(selected||byId.canoe);
    $('objectDetails').hidden=!selected;
    $('objectDetailText').textContent=selected?selected.detail:'';
    $('objectSource').href=selected?selected.source:history;
    $('discoveryCount').textContent=complete?'Camp explored!':`${state.found.length} of ${objects.length} discovered`;
    $('discoveryCount').parentElement.parentElement.classList.toggle('complete',complete);
    $('discoveryDots').innerHTML=objects.map(o=>`<span class="${state.found.includes(o.id)?'found':''}"></span>`).join('');
    document.querySelectorAll('[data-object]').forEach(b=>{
      const found=state.found.includes(b.dataset.object),active=b.dataset.object===state.selected;
      b.classList.toggle('found',found);b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active);
      if(b.classList.contains('scene-hotspot')){b.querySelector('.hotspot-glyph').textContent=found?'✓':'+';b.setAttribute('aria-label',`${found?'Revisit':'Discover'} the ${byId[b.dataset.object].name.toLowerCase()}`);}
      else b.querySelector('.choice-tick').hidden=!found;
    });
  }
  function discover(id){if(!byId[id])return;state.selected=id;if(!state.found.includes(id))state.found.push(id);$('objectDetails').open=false;render();save();$('campStatus').textContent=`${byId[id].title} ${byId[id].fact} ${state.found.length===objects.length?'Camp explored!':state.found.length+' of '+objects.length+' discovered.'}`;}
  for(const region of [$('sceneHotspots'),$('discoveryDeck')])region.addEventListener('click',e=>{const id=e.target.closest('[data-object]')?.dataset.object;if(id)discover(id);});
  $('resetDiscoveries').addEventListener('click',()=>{state={selected:null,found:[]};$('objectDetails').open=false;render();save();$('campStatus').textContent='Camp discoveries reset.';});
  $('seeRoute').addEventListener('click',()=>{const api=window.RiverRoutesPreview;api.openView('map');api.selectView('journey');api.selectPlace(byId[state.selected]?.place||'fort-william');$('mapTab').focus({preventScroll:true});$('mapIntro').scrollIntoView({behavior:'instant',block:'start'});});
  const observer=new ResizeObserver(()=>requestAnimationFrame(cropPosition));observer.observe($('sceneFrame'));
  const mapState=window.RiverRoutesPreview.getState;
  window.RiverRoutesPreview.getState=()=>({...mapState(),camp:{selected:state.selected,found:[...state.found]}});
  render();cropPosition();
})();
