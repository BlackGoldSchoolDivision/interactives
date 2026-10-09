(() => {
  'use strict';
  const ids=['food','repair','cloth','kettle','tools','beads'];
  function progress(s){
    const c=s.cargo,t=s.travel,p=s.portage,o=s.onward;
    const started=!!t||ids.some(id=>(c?.counts?.[id]||0)>0);
    const result=(stage,index)=>({stage,index,started,done:stage==='complete'?5:index});
    if(!c?.secured||!c.ready)return result('packing',0);
    const current=!!t&&ids.every(id=>t.manifest?.counts?.[id]===c.counts[id]);
    if(!current||t.status!=='landed')return result('river',1);
    if(p?.journeyId!==t.journeyId||p.phase!=='complete'||!p.allAcross)return result('portage',2);
    if(!o?.available||o.journeyId!==t.journeyId||o.phase!=='arrived')return result('inland',3);
    return window.RIVER_TRADE.goal(o.visit)?result('complete',4):result('trading',4);
  }
  window.RIVER_JOURNEY={progress};
})();
