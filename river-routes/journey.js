(() => {
  'use strict';
  const $=id=>document.getElementById(id),api=window.RiverRoutesPreview,base=api.getState;
  const steps=['Pack','Paddle','Portage','Inland','Trade'];
  const crops=['76 625 445 236','384 563 614 297','430 287 353 277','922 133 614 410','115 148 323 164'];
  $('journeySteps').innerHTML=steps.map((name,i)=>`<li><span class="journey-step-art" aria-hidden="true"><svg viewBox="${crops[i]}" preserveAspectRatio="xMidYMid slice"><image href="assets/river-camp.webp" width="1536" height="1024"/></svg><b>${i+1}</b></span><span>${name}</span></li>`).join('');
  const progress=()=>window.RIVER_JOURNEY.progress(base());
  const labels={packing:'Pack your canoe →',river:'Paddle the river →',portage:'Continue the portage →',inland:'Continue inland →',trading:'Trade at Rainy Lake →',complete:'Review your journey ✓'};
  function render(){
    const p=progress();
    $('startPacking').textContent=labels[p.stage];
    $('journeyCaption').textContent=p.stage==='complete'?'Food & furs aboard. Journey complete!':p.started?'Your place and cargo are saved.':'Fort William → Rainy Lake';
    $('startNewJourney').hidden=!p.started;
    $('newJourneyFromArrival').hidden=p.stage!=='complete';
    $('journeySteps').querySelectorAll('li').forEach((el,i)=>{
      el.classList.toggle('done',i<p.done);el.classList.toggle('current',i===p.index&&p.stage!=='complete');
      if(i===p.index&&p.stage!=='complete')el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');
      el.querySelector('b').textContent=i<p.done?'✓':i+1;
    });
    $('exploreJourney').textContent=labels[p.stage];
  }
  function open(){
    const p=progress();
    if(p.stage==='packing')api.openPacking();
    else if(p.stage==='river')api.openRiver();
    else if(p.stage==='portage')api.openPortage();
    else if(p.stage==='trading')api.openJourneyTrading();
    else api.onward.open();
  }
  $('startPacking').addEventListener('click',open);
  $('exploreJourney').addEventListener('click',open);
  const dialog=$('restartJourneyDialog');let returnFocus=null;
  function ask(e){returnFocus=e.currentTarget;$('restartJourneyError').hidden=true;dialog.showModal();$('keepJourney').focus();}
  for(const id of ['startNewJourney','newJourneyFromArrival'])$(id).addEventListener('click',ask);
  $('keepJourney').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{if(returnFocus?.getClientRects().length)returnFocus.focus({preventScroll:true});});
  $('confirmNewJourney').addEventListener('click',()=>{
    // Stop animations before clearing their live state, so later saves cannot restore an old journey.
    api.openView('adventure');api.resetRiver();api.resetPortage();api.resetOnward();api.resetCargo();
    try{
      for(const key of ['bgsd-river-routes-cargo-1','bgsd-river-routes-travel-1','bgsd-river-routes-portage-1','bgsd-river-routes-onward-1'])localStorage.removeItem(key);
    }catch{
      $('restartJourneyError').hidden=false;render();return;
    }
    api.setTravelProgress(null);api.selectView('journey');api.selectPlace('fort-william');
    dialog.close();render();api.openPacking();
  });
  window.addEventListener('river-routes-view',()=>render());
  api.journey={open};api.getState=()=>({...base(),journey:progress()});
  render();
})();
