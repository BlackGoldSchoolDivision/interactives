(() => {
  'use strict';
  const $=id=>document.getElementById(id),api=window.RiverRoutesPreview,M=window.RIVER_TRADE,key='bgsd-river-routes-trading-1';
  const byId=Object.fromEntries(M.items.map(i=>[i.id,i]));
  let state={active:'nwc',visits:{nwc:M.fresh('nwc'),hbc:M.fresh('hbc')}},counterOptions=[];
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved){state.active=M.posts[saved.active]?saved.active:'nwc';for(const id of Object.keys(M.posts))state.visits[id]=M.restore(id,saved.visits?.[id]);}}catch{}
  const visit=()=>state.visits[state.active],save=()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch{}};
  const picture=(id,cls='')=>`<span class="trade-object ${cls}" style="--object-x:${byId[id].cell%4*100/3}%;--object-y:${Math.floor(byId[id].cell/4)*100}%" aria-hidden="true"></span>`;
  function shelf(container,ids,kind){
    const s=visit(),selected=kind==='give'?s.give:s.take,available=kind==='give'?s.own:s.stock;
    const focused=document.activeElement?.closest('[data-trade-item]');const focusId=focused?.dataset.tradeItem,focusSide=focused?.dataset.side;
    $(container).innerHTML=ids.filter(id=>kind==='give'||s.stock[id]||s.take[id]).map(id=>`<button class="shelf-good${selected[id]?' on-table':''}" data-trade-item="${id}" data-side="${kind}" ${selected[id]>=available[id]?'disabled':''} aria-label="${kind==='give'?'Offer':'Ask for'} one ${byId[id].name.toLowerCase()} bundle, ${available[id]-selected[id]} left on shelf">${picture(id)}<span class="shelf-count">${available[id]-selected[id]}</span><strong>${byId[id].short}</strong></button>`).join('');
    if(focusSide===kind){const el=$(container).querySelector(`[data-trade-item="${focusId}"]`);if(el&&!el.disabled)el.focus({preventScroll:true});}
  }
  function tray(container,counts,side){
    $(container).innerHTML=M.ids.filter(id=>counts[id]).map(id=>`<button class="table-good" data-trade-remove="${id}" data-side="${side}" aria-label="Remove one ${byId[id].name.toLowerCase()} bundle from ${side==='give'?'your offer':'your request'}">${picture(id)}<b>×${counts[id]}</b><span aria-hidden="true">−</span></button>`).join('')||`<span class="empty-tray">${side==='give'?'Pick from your shelf':'Pick from their shelf'}</span>`;
  }
  function carried(){const s=api.getState(),p=s.portage,t=s.travel,c=s.cargo;return p?.phase==='complete'&&t?.status==='landed'&&p.journeyId===t.journeyId&&c?.secured&&JSON.stringify(t.manifest.counts)===JSON.stringify(c.counts)?{counts:{...p.manifest.counts},journeyId:p.journeyId}:null;}
  function render(){
    const s=visit(),p=M.posts[state.active],done=M.goal(s);
    $('tradingView').dataset.company=state.active;$('tradePostName').textContent=p.name;$('tradeCompany').textContent=p.company;
    const art=$('tradePostArt');if(!art.getAttribute('src')?.endsWith(p.image)){art.src=p.image;art.alt=p.alt;}
    document.querySelectorAll('[data-trade-post]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.tradePost===state.active));});
    $('tradePartner').textContent=p.visitors[Math.min(1,s.deals)];
    $('tradeNeeds').innerHTML=M.wanted(state.active,s).map(id=>`<span title="${byId[id].name}">${picture(id)}<b>${byId[id].short}</b></span>`).join('');
    shelf('yourTradeShelf',M.giveIds,'give');shelf('theirTradeShelf',M.takeIds,'take');tray('yourOffer',s.give,'give');tray('theirOffer',s.take,'take');
    $('tradeReply').textContent=s.reply;$('tradeReply').dataset.kind=s.replyKind;$('makeTradeOffer').disabled=!M.valid(s);$('acceptTrade').hidden=s.replyKind!=='agreement';$('makeTradeOffer').hidden=s.replyKind==='agreement';
    counterOptions=s.replyKind==='counter'?M.counters(state.active,s):[];
    $('tradeCounters').innerHTML=counterOptions.map((c,n)=>`<button data-counter="${n}" class="trade-counter">${picture(c.id)}<span>${c.kind==='add'?'Add':'Ask for'} ${c.count}${c.kind==='reduce'?' fewer':''} ${byId[c.id].short.toLowerCase()}</span><b aria-hidden="true">→</b></button>`).join('');
    $('tradeFood').textContent=M.food(s)*2+' days';$('tradeFurs').textContent=s.own.pelt+' / 4';$('tradeWeight').textContent=M.weight(s)+' / 130 kg';
    $('tradeReceived').innerHTML=M.takeIds.filter(id=>s.own[id]).map(id=>`<span>${picture(id)}<b>×${s.own[id]}</b></span>`).join('');$('tradeReceived').hidden=!M.takeIds.some(id=>s.own[id]);
    $('tradeGoodsKept').textContent=M.giveIds.reduce((n,id)=>n+s.own[id],0)+' trade bundles kept';
    $('tradeFoodGoal').classList.toggle('met',M.food(s)>=2);$('tradeFurGoal').classList.toggle('met',s.own.pelt>=4);$('tradeGoals').classList.toggle('done',done);$('tradeGoalsTitle').textContent=done?'Ready for a journey!':'Bring back food & furs';
    $('tradeSuccess').hidden=!done;$('tradeOrigin').textContent=s.origin==='carried-copy'?'Practice copy of your carried cargo':'Trading practice · Sample cargo';$('useCarriedCargo').hidden=!carried();
    $('tradeFact').textContent=p.fact;$('tradeFactSource').href=p.source;
    $('tradeHistory').innerHTML=s.log.map((r,n)=>`<li><b>Exchange ${s.deals-n}</b><span>${M.giveIds.filter(id=>r.give[id]).map(id=>r.give[id]+' '+byId[id].short).join(' + ')} → ${M.takeIds.filter(id=>r.take[id]).map(id=>r.take[id]+' '+byId[id].short).join(' + ')}</span></li>`).join('')||'<li>No exchanges yet.</li>';
    $('tradeDealCount').textContent=s.deals===1?'1 exchange':s.deals+' exchanges';
  }
  function changed(){
    const focused=document.activeElement?.closest('[data-trade-item],[data-trade-remove]'),id=focused?.dataset.tradeItem||focused?.dataset.tradeRemove,side=focused?.dataset.side;
    const s=visit();s.reply='Your offer has changed. Try it with the traders.';s.replyKind='start';render();save();
    if(id&&side){const shelf=document.querySelector(`[data-trade-item="${id}"][data-side="${side}"]`),table=document.querySelector(`[data-trade-remove="${id}"][data-side="${side}"]`);(shelf&&!shelf.disabled?shelf:table)?.focus({preventScroll:true});}
  }
  $('tradingView').addEventListener('click',e=>{
    const add=e.target.closest('[data-trade-item]'),remove=e.target.closest('[data-trade-remove]'),post=e.target.closest('[data-trade-post]'),counter=e.target.closest('[data-counter]');
    const s=visit();
    if(add){const side=add.dataset.side,id=add.dataset.tradeItem,inventory=side==='give'?s.own:s.stock;if(s[side][id]<inventory[id]){s[side][id]++;changed();}}
    else if(remove){const side=remove.dataset.side,id=remove.dataset.tradeRemove;if(s[side][id]){s[side][id]--;changed();}}
    else if(post){state.active=post.dataset.tradePost;render();save();}
    else if(counter){const c=counterOptions[Number(counter.dataset.counter)];if(c&&M.agreeable(state.active,s,c.give,c.take)){s.give={...c.give};s.take={...c.take};s.reply='That revised offer works. Exchange when you’re ready.';s.replyKind='agreement';render();save();}}
  });
  $('makeTradeOffer').addEventListener('click',()=>{
    const s=visit();if(!M.valid(s))return;
    if(M.agreeable(state.active,s)){s.reply='Agreed! Both sides get useful goods.';s.replyKind='agreement';}
    else {s.replyKind='counter';const options=M.counters(state.active,s);s.reply=M.afterWeight(s)>130?'Your canoe would be overloaded. Change the load.':options.length?'We can trade if you change the offer.':`We need ${M.wanted(state.active,s).map(id=>byId[id].short.toLowerCase()).join(' or ')} more. Try a different mix.`;}
    render();save();
  });
  $('acceptTrade').addEventListener('click',()=>{
    const s=visit();if(s.replyKind!=='agreement')return;const next=M.exchange(state.active,s);if(!next)return;state.visits[state.active]=next;render();save();$('tradeExchangeFlash').classList.remove('exchange-pop');void $('tradeExchangeFlash').offsetWidth;$('tradeExchangeFlash').classList.add('exchange-pop');
  });
  $('clearTradeTable').addEventListener('click',()=>{const s=visit();s.give=M.empty();s.take=M.empty();changed();});
  $('restartTrading').addEventListener('click',()=>{state.visits[state.active]=M.fresh(state.active);render();save();});
  $('useCarriedCargo').addEventListener('click',()=>{const m=carried();if(!m)return;state.visits[state.active]=M.fresh(state.active,m);render();save();});
  $('tradeHelp').addEventListener('click',()=>{const open=$('tradeHelpText').hidden;$('tradeHelpText').hidden=!open;$('tradeHelp').setAttribute('aria-expanded',String(open));});
  function open(){api.openView('trading');$('tradingView').scrollIntoView({block:'start',behavior:'instant'});$('tradePostName').focus({preventScroll:true});}
  for(const id of ['startTrading','tradeTab','portageTrading'])$(id).addEventListener('click',open);
  $('tradeBack').addEventListener('click',()=>{api.openView('adventure');$('startTrading').focus({preventScroll:true});});
  $('mapTradingPost').addEventListener('click',()=>{api.openView('map');api.selectView('canada');api.selectPlace(M.posts[state.active].place);$('mapTab').focus({preventScroll:true});$('mapIntro').scrollIntoView({block:'start',behavior:'instant'});});
  $('tradeInspectSelect').innerHTML=M.items.map(i=>`<option value="${i.id}">${i.name}</option>`).join('');
  function inspect(){const i=byId[$('tradeInspectSelect').value];$('tradeInspectPicture').innerHTML=picture(i.id);$('tradeItemDetail').textContent=i.detail;$('tradeItemSource').href=i.source;}
  $('tradeInspectSelect').addEventListener('change',inspect);inspect();
  window.addEventListener('river-routes-view',e=>{if(e.detail==='trading')render();});
  function fit(){const top=$('tradePostScene').getBoundingClientRect().top;document.documentElement.style.setProperty('--trade-workspace-height',Math.max(260,window.innerHeight-top-24)+'px');}
  const observer=new ResizeObserver(()=>{if(!$('tradingView').hidden)fit();});observer.observe($('tradingView'));window.addEventListener('resize',fit);window.addEventListener('river-routes-view',e=>{if(e.detail==='trading')requestAnimationFrame(fit);});
  const previous=api.getState;api.getState=()=>({...previous(),trading:{active:state.active,...structuredClone(visit()),food:M.food(visit()),weight:M.weight(visit()),complete:M.goal(visit())}});
  render();
})();
