(() => {
  'use strict';
  const mapData = window.RIVER_MAP;
  const $ = id => document.getElementById(id);
  const storageKey = 'bgsd-river-routes-map-1';
  const places = [
    {id:'fort-william',name:'Fort William',company:'nwc',kind:'Rendezvous & supplies',short:'North West Company',date:'Name adopted in 1807',body:'At the edge of Lake Superior, this post connected canoes coming from Montreal with canoes from the interior. Cargo, food, skilled workers, and Anishinaabe knowledge helped the network function.',question:'Why meet here rather than make every canoe travel the whole distance?',source:'https://fwhp.ca/about-us/our-history/',sourceName:'Fort William Historical Park',offset:[16,29],anchor:'start'},
    {id:'kakabeka',name:'Kakabeka Falls',company:'local',kind:'A portage around the falls',short:'Kaministiquia River',date:'Historic portage',body:'The river route reaches a waterfall. Travellers had to carry the canoe and cargo along a trail around it. This is where our first portage mission will take place.',question:'Would you carry a heavier load in fewer trips, or a lighter load in more trips?',source:'https://www.ontarioparks.ca/park/Kakabekafalls/activities',sourceName:'Ontario Parks',offset:[-15,-30],anchor:'end'},
    {id:'rainy-lake',name:'Rainy Lake',company:'local',kind:'Toward the interior',short:'Inland waterway',date:'On the inland network',body:'Rainy Lake linked the Lake Superior area with waterways farther west. The connection on this map gives the general direction; a real journey passes through many rivers, lakes, and portages.',question:'How could local route knowledge change the success of a journey?',source:'https://fwhp.ca/about-us/our-history/',sourceName:'Fort William Historical Park',offset:[-15,27],anchor:'end'},
    {id:'montreal',name:'Montreal',company:'nwc',kind:'Goods from the east',short:'North West Company',date:'Company formed from 1779',body:'Montreal merchants supplied trade goods for the North West Company’s inland network. Canoe brigades carried goods toward Fort William, where cargo could be exchanged with brigades arriving from the interior.',question:'What happens to the cost of goods when they must travel a very long way?',source:'https://fwhp.ca/about-us/our-history/',sourceName:'Fort William Historical Park',offset:[15,27],anchor:'start'},
    {id:'york-factory',name:'York Factory',company:'hbc',kind:'A gateway on Hudson Bay',short:'Hudson’s Bay Company',date:'First post established in 1684',body:'Ships reached Hudson Bay with goods from Europe. York Factory, on the Hayes River, connected that supply with inland trade and established Indigenous trading networks.',question:'How could access to the ocean give this network an advantage?',source:'https://parks.canada.ca/lhn-nhs/mb/yorkfactory/culture/histoire-history',sourceName:'Parks Canada',offset:[16,-16],anchor:'start'},
    {id:'cumberland',name:'Cumberland House',company:'hbc',kind:'The company moves inland',short:'Hudson’s Bay Company',date:'Established in 1774',body:'Cumberland House was the Hudson’s Bay Company’s first western inland post. Its location connected trade from Hudson Bay with the Saskatchewan and Churchill river areas.',question:'Why would a company build a post closer to its trading partners?',source:'https://recherche-collection-search.bac-lac.gc.ca/eng/home/record?app=fonandcol&idnumber=2962865',sourceName:'Library and Archives Canada',offset:[-15,-14],anchor:'end'}
  ];
  const byId = Object.fromEntries(places.map(p => [p.id,p]));
  const missionIds = new Set(['fort-william','kakabeka','rainy-lake']);
  let state = {view:'canada',filter:'both',selected:'fort-william',tab:'adventure'};
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if(saved && ['canada','journey'].includes(saved.view) && ['both','nwc','hbc'].includes(saved.filter) && byId[saved.selected]) {
      state = {...state,...saved,tab:'adventure'};
      if(state.view==='journey' && state.filter==='hbc') state.view='canada';
    }
  } catch {}
  const save = () => {try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{}};
  const visiblePlace = p => state.filter==='both' || (state.filter==='nwc' && p.company!=='hbc') || p.company===state.filter;
  const point = id => mapData.points[id];
  const line = (ids,cls) => `<path class="connection ${cls}" d="${ids.map((id,i) => (i?'L':'M')+point(id).join(',')).join(' ')}"/>`;
  let travelProgress=null;
  function renderMap() {
    const svg = $('tradeMap');
    const viewbox = mapData.viewboxes[state.view];
    svg.setAttribute('viewBox',viewbox.join(' '));
    const width = svg.clientWidth;
    if(!width) return;
    const height = svg.clientHeight;
    const unit = Math.max(viewbox[2]/width,viewbox[3]/height);
    const mobile = width<530;
    const focused = document.activeElement?.closest?.('.marker')?.dataset.location;
    let connections = '';
    if(state.filter!=='hbc') {
      if(state.view==='canada') connections += line(['montreal','fort-william'],'nwc');
      connections += line(['fort-william','kakabeka','rainy-lake'],'local');
    }
    if(state.view==='canada' && state.filter!=='nwc') connections += line(['york-factory','cumberland'],'hbc');
    const markers = places.filter(visiblePlace).filter(p => state.view==='journey'?missionIds.has(p.id):p.id!=='kakabeka').map(p => {
      const [x,y] = point(p.id), selected=p.id===state.selected;
      const inJourney = state.view==='journey' && missionIds.has(p.id);
      const showLabel = !mobile || selected || inJourney;
      const dx=p.offset[0]*unit,dy=p.offset[1]*unit;
      const textWidth=Math.max(58,p.name.length*7.1)*unit;
      const hitX=p.anchor==='end'?dx-textWidth-6*unit:dx-6*unit;
      const hitY=dy-28*unit;
      return `<g class="marker ${p.company}${selected?' selected':''}" data-location="${p.id}" transform="translate(${x} ${y})" role="button" tabindex="0" aria-label="${p.name}: ${p.short}" aria-pressed="${selected}">
        <circle class="halo" r="${12*unit}"/><circle class="point" r="${5.5*unit}"/>
        ${showLabel?`<path d="M0 0L${dx*.65} ${dy*.65}" stroke="#647d65" stroke-width="${unit}" fill="none" opacity=".65"/><rect class="hit" x="${hitX}" y="${hitY}" width="${textWidth+12*unit}" height="${44*unit}"/><text class="label" x="${dx}" y="${dy}" text-anchor="${p.anchor}" style="font-size:${13*unit}px;stroke-width:${3*unit}px">${p.name}</text>`:`<circle class="hit" r="${22*unit}"/>`}
      </g>`;
    }).join('');
    svg.innerHTML = `<title id="mapTitle">${state.view==='canada'?'Fur trade connections across the land now known as Canada':'First journey: Fort William toward Rainy Lake'}</title><desc id="mapDesc">Dashed lines show simplified trading connections, not exact canoe routes. Choose a map marker or a location button below the map.</desc>${mapData.svg}<g id="connections">${connections}</g><g id="markers">${markers}</g><g id="journeyCanoe" aria-hidden="true"></g>`;
    drawTravelMarker();
    svg.querySelectorAll('.water-label').forEach(el => { el.style.fontSize=(state.view==='journey'?6:12)*unit+'px'; el.style.letterSpacing=.8*unit+'px'; });
    $('mapStamp').textContent = state.view==='canada'?'CANADA · TRADE CONNECTIONS':'FORT WILLIAM · TOWARD THE INTERIOR';
    $('mapNote').textContent = state.view==='canada'?'Modern outline for orientation. Dashed lines are simplified trading connections.':'Journey overview. The real inland route passes through many rivers, lakes, and portages.';
    for(const [id,v] of [['canadaView','canada'],['journeyView','journey']]) {
      $(id).classList.toggle('active',state.view===v);$(id).setAttribute('aria-pressed',state.view===v);
    }
    document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===state.filter);b.setAttribute('aria-pressed',b.dataset.filter===state.filter);});
    if(focused) svg.querySelector(`[data-location="${focused}"]`)?.focus({preventScroll:true});
  }
  function drawTravelMarker(){
    const marker=$('journeyCanoe');if(!marker||travelProgress===null||state.filter==='hbc')return;
    const a=point('fort-william'),b=point('kakabeka'),u=Math.max(0,Math.min(1,travelProgress));
    const box=mapData.viewboxes[state.view],unit=Math.max(box[2]/($('tradeMap').clientWidth||1000),box[3]/($('tradeMap').clientHeight||500));
    marker.innerHTML=`<g transform="translate(${a[0]+(b[0]-a[0])*u} ${a[1]+(b[1]-a[1])*u}) scale(${unit})"><circle r="14" fill="#173345" stroke="#ffca68" stroke-width="2"/><path d="M-9 2Q0 13 9 2L7 6Q0 13-7 6Z" fill="#ffca68"/><path d="M-4 1L4-7" stroke="#fff3cf" stroke-width="2"/></g>`;
  }
  function renderLocation() {
    const p=byId[state.selected];
    const brief={ 'fort-william':'Canoes from Montreal meet canoes from the interior.',kakabeka:'Carry the canoe and cargo around the waterfall.','rainy-lake':'A link to waterways farther west.',montreal:'Eastern supplies for the North West Company’s canoe network.','york-factory':'Ocean ships connect with inland trade.',cumberland:'Hudson’s Bay Company expands inland.' };
    $('locationCard').innerHTML=`<div class="location-top"><span class="eyebrow">${p.kind}</span><span class="company-tag ${p.company}">${p.company==='local'?'WATERWAY':p.company.toUpperCase()}</span></div><h3>${p.name}</h3><p>${brief[p.id]}</p><details class="map-location-details"><summary>Look closer</summary><p>${p.body}</p><p class="location-question">Think about it: ${p.question}</p><a href="${p.source}" target="_blank" rel="noopener">${p.sourceName} ↗</a></details>`;
    $('placeList').innerHTML=places.map(p=>`<button class="place-button${p.id===state.selected?' selected':''}" data-place="${p.id}" aria-pressed="${p.id===state.selected}"><i class="dot ${p.company==='hbc'?'hbc':'nwc'}" aria-hidden="true"></i><span><strong>${p.name}</strong><small>${p.company==='local'?p.short:p.company.toUpperCase()+' · '+(p.id==='fort-william'?'1807 name':p.id==='montreal'?'1779':p.id==='cumberland'?'1774':'1684')}</small></span></button>`).join('');
  }
  function chooseLocation(id) {
    if(!byId[id]) return;
    const focusId = document.activeElement?.dataset.place;
    const p=byId[id];
    state.selected=id;
    if(!visiblePlace(p)) state.filter=p.company==='hbc'?'hbc':'nwc';
    if(state.view==='journey' && !missionIds.has(id)) state.view='canada';
    if(id==='kakabeka' && state.view==='canada') {state.view='journey';state.filter='nwc';}
    renderMap();renderLocation();save();
    if(focusId) document.querySelector(`[data-place="${focusId}"]`)?.focus({preventScroll:true});
  }
  function chooseView(view) {
    state.view=view;
    if(view==='journey') {state.filter='nwc';if(!missionIds.has(state.selected)) state.selected='fort-william';}
    renderMap();renderLocation();save();
  }
  function chooseTab(tab) {
    if(!['adventure','packing','river','portage','map','journal'].includes(tab)) return;
    state.tab=tab;
    document.body.dataset.view=tab;
    $('adventureView').hidden=tab!=='adventure';$('packingView').hidden=tab!=='packing';$('riverView').hidden=tab!=='river';$('portageView').hidden=tab!=='portage';$('mapIntro').hidden=tab!=='map';$('mapView').hidden=tab!=='map';$('placesSection').hidden=tab!=='map';$('journalView').hidden=tab!=='journal';
    for(const [id,t] of [['adventureTab','adventure'],['mapTab','map'],['journalTab','journal']]) {$(id).classList.toggle('active',tab===t||(t==='adventure'&&['packing','river','portage'].includes(tab)));if(t===tab||(t==='adventure'&&['packing','river','portage'].includes(tab)))$(id).setAttribute('aria-current','page');else $(id).removeAttribute('aria-current');}
    $('pageTitle').textContent='Find your way inland.';
    if(tab==='map') requestAnimationFrame(renderMap);
    save();window.dispatchEvent(new CustomEvent('river-routes-view',{detail:tab}));
  }
  $('tradeMap').addEventListener('click',event=>{const id=event.target.closest('[data-location]')?.dataset.location;if(id)chooseLocation(id);});
  $('tradeMap').addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){const id=event.target.closest('[data-location]')?.dataset.location;if(id){event.preventDefault();chooseLocation(id);}}});
  $('placeList').addEventListener('click',event=>{const id=event.target.closest('[data-place]')?.dataset.place;if(id)chooseLocation(id);});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    state.filter=button.dataset.filter;
    if(state.filter==='hbc') {state.view='canada';if(byId[state.selected].company!=='hbc')state.selected='york-factory';}
    else if(state.filter==='nwc' && byId[state.selected].company==='hbc') state.selected='fort-william';
    renderMap();renderLocation();save();
  }));
  $('canadaView').addEventListener('click',()=>chooseView('canada'));
  $('journeyView').addEventListener('click',()=>chooseView('journey'));
  $('exploreJourney').addEventListener('click',()=>{chooseView('journey');chooseLocation('kakabeka');$('mapSurface').scrollIntoView({behavior:'instant',block:'nearest'});});
  $('resetMap').addEventListener('click',()=>{state={view:'canada',filter:'both',selected:'fort-william',tab:'map'};chooseTab('map');renderMap();renderLocation();save();});
  $('mapTab').addEventListener('click',()=>chooseTab('map'));
  $('adventureTab').addEventListener('click',()=>chooseTab('adventure'));
  $('journalTab').addEventListener('click',()=>chooseTab('journal'));
  $('backToMap').addEventListener('click',()=>{chooseTab('map');$('mapTab').focus();});
  const sources=$('sourcesDialog');
  $('sourcesButton').addEventListener('click',()=>sources.showModal());
  $('closeSources').addEventListener('click',()=>sources.close());$('doneSources').addEventListener('click',()=>sources.close());
  sources.addEventListener('click',event=>{if(event.target===sources){const r=sources.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)sources.close();}});
  const resizeObserver=new ResizeObserver(()=>requestAnimationFrame(renderMap));resizeObserver.observe($('mapSurface'));
  chooseTab('adventure');renderMap();renderLocation();
  window.RiverRoutesPreview={getState:()=>({...state}),places:places.map(p=>({...p})),selectPlace:chooseLocation,selectView:chooseView,openView:chooseTab,setTravelProgress:value=>{travelProgress=value;drawTravelMarker();}};
})();

