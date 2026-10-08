(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const key='bgsd-river-routes-cargo-1';
  const items=[
    {id:'food',name:'Food',use:'2 days per bundle',kg:15,space:1,color:'#b89156',icon:'<path d="M24 14h32l7 40q-23 13-46 0Z" fill="#b89156"/><path d="M23 23h34M22 28h36M26 12l5-5h20l5 5" stroke="#5d4327" fill="none" stroke-width="3"/><path d="M36 35v17m8-18v17" stroke="#ead6a5" stroke-width="3"/>'},
    {id:'repair',name:'Repair kit',use:'Keep the canoe afloat',kg:10,space:1,color:'#738670',icon:'<rect x="15" y="22" width="50" height="35" rx="7" fill="#738670"/><path d="M29 22v-9h22v9M15 35h50" stroke="#35483c" stroke-width="3" fill="none"/><path d="M40 29v19M31 39h18" stroke="#f2dfad" stroke-width="5"/>'},
    {id:'cloth',name:'Cloth',use:'Light trade goods',kg:10,space:1,color:'#a65040',icon:'<path d="M18 19h44v34H18Z" fill="#a65040"/><path d="M18 19l10-6h44L62 19v34l10-6V13M28 13v34l-10 6" fill="#c17e65" stroke="#794033" stroke-width="2"/><path d="M39 17v34M18 34h44" stroke="#f1d7a4" stroke-width="4"/>'},
    {id:'kettle',name:'Kettles',use:'Heavy trade goods',kg:20,space:2,color:'#8b8b78',icon:'<path d="M20 26h40l-5 29H25Z" fill="#8b8b78" stroke="#4c544e" stroke-width="3"/><path d="M24 25a16 17 0 0 1 32 0M17 25h46M20 38l-8-5v12l12 4" fill="none" stroke="#4c544e" stroke-width="3"/><path d="M32 34v13" stroke="#d9d9bb" stroke-width="4"/>'},
    {id:'tools',name:'Tools',use:'Heavy trade goods',kg:25,space:2,color:'#a1784a',icon:'<path d="M20 57L49 17" stroke="#a1784a" stroke-width="8"/><path d="M39 16l14-9 14 16-11 10Z" fill="#697570" stroke="#3e4c47" stroke-width="2"/><path d="M53 56L30 24M22 18l16 5-9 11-10-11Z" fill="#8d9a90" stroke="#516257" stroke-width="4"/>'},
    {id:'beads',name:'Beads',use:'Small trade goods',kg:5,space:1,color:'#3e8e91',icon:'<path d="M20 24q-8 32 20 32t20-32" fill="none" stroke="#d4bc86" stroke-width="3"/><g fill="#3e8e91" stroke="#235e65" stroke-width="1"><circle cx="20" cy="27" r="6"/><circle cx="19" cy="41" r="6"/><circle cx="27" cy="53" r="6"/><circle cx="40" cy="57" r="6"/><circle cx="54" cy="52" r="6"/><circle cx="61" cy="39" r="6"/><circle cx="60" cy="26" r="6"/></g>'}
  ];
  const byId=Object.fromEntries(items.map(i=>[i.id,i]));
  const empty=()=>Object.fromEntries(items.map(i=>[i.id,0]));
  let state={counts:empty(),secured:false};
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved){for(const i of items){const n=saved.counts?.[i.id];state.counts[i.id]=Number.isInteger(n)?Math.max(0,Math.min(6,n)):0;}state.secured=saved.secured===true;}}catch{}
  const save=()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch{}};
  const summary=()=>{
    const kg=items.reduce((n,i)=>n+i.kg*state.counts[i.id],0),space=items.reduce((n,i)=>n+i.space*state.counts[i.id],0);
    const trade=items.filter(i=>!['food','repair'].includes(i.id)),tradeCount=trade.reduce((n,i)=>n+state.counts[i.id],0);
    const ready=state.counts.food>=3&&state.counts.repair>=1&&tradeCount>=4&&space<=12&&kg<=130;
    return {kg,space,tradeCount,ready,foodDays:state.counts.food*2,carryTrips:Math.ceil(kg/40),tradeVariety:trade.filter(i=>state.counts[i.id]>0).length};
  };
  const icon=i=>`<svg viewBox="0 0 80 70" aria-hidden="true">${i.icon}</svg>`;
  $('cargoChoices').innerHTML=items.map(i=>`<article class="cargo-card" style="--cargo-color:${i.color}"><div class="cargo-picture">${icon(i)}</div><div class="cargo-description"><h3>${i.name}</h3><p>${i.kg} kg · ${i.space} ${i.space===1?'space':'spaces'}</p><span>${i.use}</span></div><div class="cargo-stepper"><button data-cargo="${i.id}" data-delta="-1" aria-label="Remove one ${i.name.toLowerCase()} bundle">−</button><output id="count-${i.id}" aria-label="${i.name} bundles">0</output><button data-cargo="${i.id}" data-delta="1" aria-label="Add one ${i.name.toLowerCase()} bundle">+</button></div></article>`).join('');
  function renderCanoe(animateId){
    const bundles=items.flatMap(i=>Array.from({length:state.counts[i.id]},()=>i));
    // Keep an overloaded load visible, with the extra bundles on shore.
    const svg=$('loadedCanoe');
    const bundle=(i,index)=>{const onShore=index>=12,slot=onShore?index-12:index;
      const x=onShore?24+(slot%12)*53:151+(slot%6)*68,y=onShore?194+Math.floor(slot/12)*38:77+Math.floor(slot/6)*51;
      const last=animateId===i.id&&index===bundles.map(x=>x.id).lastIndexOf(i.id);
      return `<g transform="translate(${x} ${y})"><g class="cargo-bundle${last?' newly-loaded':''}"><rect x="0" y="0" width="58" height="42" rx="8" fill="${i.color}" stroke="#4c4534" stroke-width="2"/><path d="M29 0v42M0 21h58" stroke="#f1d9a5" stroke-width="3"/><svg x="10" y="5" width="38" height="32" viewBox="0 0 80 70">${i.icon}</svg></g></g>`;
    };
    svg.setAttribute('viewBox',`0 0 720 ${bundles.length>12?250+Math.ceil((bundles.length-12)/12)*38:240}`);
    svg.innerHTML=`<title id="canoeLoadTitle">${bundles.length} cargo bundles in your load</title><ellipse cx="360" cy="182" rx="300" ry="22" fill="#123d3740"/><g class="canoe-hull"><path d="M28 106Q360 0 692 106Q360 190 28 106Z" fill="#dfc58a" stroke="#4e4631" stroke-width="4"/><path d="M64 107Q360 24 656 107Q360 169 64 107Z" fill="#806944" stroke="#b5925c" stroke-width="5"/><path d="M28 106Q360 253 692 106Q626 213 360 217Q92 213 28 106Z" fill="#c99b5c" stroke="#4e4631" stroke-width="4"/><path d="M28 106Q360 189 692 106Q600 147 360 160Q120 147 28 106" fill="#e6c990" stroke="#4e4631" stroke-width="4"/><path d="M90 139q270 103 540 0M130 163l-3 21M197 181l-2 20M268 194v17M452 194v17M523 181l2 20M590 163l3 21" stroke="#765435" fill="none" stroke-width="3"/></g>${bundles.map(bundle).join('')}`;
  }
  function render(animateId){
    const s=summary();if(!s.ready)state.secured=false;
    $('spaceCount').textContent=`${s.space} / 12 spaces`;$('weightCount').textContent=`${s.kg} / 130 kg`;
    $('capacitySlots').innerHTML=Array.from({length:12},(_,n)=>`<i class="${n<s.space?'filled':''}"></i>`).join('');
    $('capacitySlots').setAttribute('aria-label',`${s.space} of 12 canoe spaces used`);
    $('weightFill').style.width=Math.min(100,s.kg/130*100)+'%';
    $('packingView').classList.toggle('overloaded',s.space>12||s.kg>130);
    $('foodDays').textContent=s.foodDays+' days';$('carryTrips').textContent=s.carryTrips+' trips';$('tradeVariety').textContent=s.tradeVariety+' kinds';
    const needs=[{ok:state.counts.food>=3,text:'3 food bundles',progress:`${state.counts.food}/3`},{ok:state.counts.repair>=1,text:'1 repair kit',progress:`${state.counts.repair}/1`},{ok:s.tradeCount>=4,text:'4 trade bundles',progress:`${s.tradeCount}/4`}];
    $('packingNeeds').innerHTML=needs.map(n=>`<div class="${n.ok?'met':''}"><span aria-hidden="true">${n.ok?'✓':'○'}</span><span>${n.text}</span><strong>${n.progress}</strong></div>`).join('');
    const missing=needs.filter(n=>!n.ok).map(n=>n.text);
    let feedback=state.secured?'Cargo secured. Your canoe is ready for the river.':s.space>12?`Too crowded! Remove ${s.space-12} ${s.space-12===1?'space':'spaces'} of cargo.`:s.kg>130?`Too heavy! Remove at least ${s.kg-130} kg.`:missing.length?'Still needed: '+missing.join(', ')+'.':'It fits! Secure the cargo when you are happy with your choices.';
    $('packFeedback').textContent=feedback;
    $('packTitle').textContent=state.secured?'Ready for the river.':'Load it wisely.';
    $('finishPacking').disabled=!s.ready||state.secured;$('finishPacking').hidden=state.secured;
    $('packedResult').hidden=!state.secured;
    $('loadLabel').textContent=s.kg?`${s.kg} kg aboard · ${Math.max(0,12-s.space)} ${12-s.space===1?'space':'spaces'} free`:'An empty canoe. Add your first bundle.';
    for(const i of items){$('count-'+i.id).textContent=state.counts[i.id];$('cargoChoices').querySelector(`[data-cargo="${i.id}"][data-delta="-1"]`).disabled=state.counts[i.id]===0;$('cargoChoices').querySelector(`[data-cargo="${i.id}"][data-delta="1"]`).disabled=state.counts[i.id]===6;}
    renderCanoe(animateId);
  }
  $('cargoChoices').addEventListener('click',e=>{const b=e.target.closest('[data-cargo]');if(!b)return;const id=b.dataset.cargo,delta=Number(b.dataset.delta);state.counts[id]=Math.max(0,Math.min(6,state.counts[id]+delta));state.secured=false;render(delta>0?id:null);save();});
  $('finishPacking').addEventListener('click',()=>{if(!summary().ready)return;state.secured=true;render();save();$('packedResult').scrollIntoView({block:'nearest',behavior:'instant'});});
  $('clearCargo').addEventListener('click',()=>{state={counts:empty(),secured:false};render();save();});
  $('packingHelp').addEventListener('click',()=>{const open=$('packHelpText').hidden;$('packHelpText').hidden=!open;$('packingHelp').setAttribute('aria-expanded',String(open));});
  function openPacking(){window.RiverRoutesPreview.openView('packing');$('packingView').scrollIntoView({block:'start',behavior:'instant'});$('backToCamp').focus({preventScroll:true});}
  $('startPacking').addEventListener('click',openPacking);
  $('backToCamp').addEventListener('click',()=>{window.RiverRoutesPreview.openView('adventure');$('startPacking').focus({preventScroll:true});});
  $('packingRoute').addEventListener('click',()=>{window.RiverRoutesPreview.openView('map');window.RiverRoutesPreview.selectView('journey');$('mapTab').focus({preventScroll:true});$('mapIntro').scrollIntoView({block:'start',behavior:'instant'});});
  const previous=window.RiverRoutesPreview.getState;
  window.RiverRoutesPreview.cargoItems=items.map(i=>({...i}));
  window.RiverRoutesPreview.getState=()=>({...previous(),cargo:{counts:{...state.counts},secured:state.secured,...summary()}});
  render();
})();

