(() => {
  'use strict';
  const M=window.RIVER_TRADE,clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const signature=source=>JSON.stringify({journeyId:source.journeyId,counts:source.counts,hull:source.hull});
  function fresh(source){
    const visit=M.fresh('rainy',source);visit.origin='journey';
    return {journeyId:source.journeyId,sourceKey:signature(source),start:{counts:{...source.counts},hull:source.hull},phase:'ready',progress:0,route:null,hull:source.hull,repairs:0,foodUsed:0,visit};
  }
  function restore(saved,source){
    if(!saved||saved.journeyId!==source.journeyId||saved.sourceKey!==signature(source))return fresh(source);
    if(!['ready','first','choice','second','arrived'].includes(saved.phase)||!Number.isFinite(saved.progress))return fresh(source);
    const s=structuredClone(saved);s.visit=M.restore('rainy',saved.visit);s.visit.origin='journey';s.visit.journeyId=source.journeyId;
    s.hull=clamp(Number.isFinite(s.hull)?s.hull:source.hull,1,100);s.repairs=Math.max(0,Math.floor(Number(s.repairs)||0));s.foodUsed=Math.max(0,Math.floor(Number(s.foodUsed)||0));
    s.route=['shore','crossing'].includes(s.route)?s.route:null;
    s.progress=s.phase==='ready'?0:s.phase==='choice'?.45:s.phase==='arrived'?1:clamp(s.progress,s.phase==='first'?0:.45,s.phase==='first'?.45:1);
    if(s.phase==='second'&&!s.route)return fresh(source);
    return s;
  }
  function start(s){if(s.phase!=='ready'||s.visit.foodReserve<1)return null;const n=structuredClone(s);n.phase='first';return n;}
  function choose(s,route){
    if(s.phase!=='choice'||!['shore','crossing'].includes(route)||route==='shore'&&s.visit.foodReserve<1||route==='crossing'&&s.hull<=16)return null;
    const n=structuredClone(s);n.route=route;n.phase='second';return n;
  }
  function move(s,amount){
    if(!['first','second'].includes(s.phase)||!Number.isFinite(amount)||amount<=0)return s;
    const n=structuredClone(s),limit=s.phase==='first'?.45:1;n.progress=Math.min(limit,s.progress+amount);
    if(n.progress>=limit){
      if(s.phase==='first'){n.visit.foodReserve=Math.max(0,n.visit.foodReserve-1);n.foodUsed++;n.phase='choice';}
      else {if(s.route==='shore'){n.visit.foodReserve=Math.max(0,n.visit.foodReserve-1);n.foodUsed++;}else n.hull=Math.max(1,n.hull-16);n.phase='arrived';}
    }
    return n;
  }
  function repair(s){if(s.hull>=100||s.visit.own.repair<1)return null;const n=structuredClone(s);n.visit.own.repair--;n.hull=Math.min(100,n.hull+40);n.repairs++;return n;}
  function exchange(s){if(s.phase!=='arrived'||s.visit.replyKind!=='agreement')return null;const v=M.exchange('rainy',s.visit);return v?{...structuredClone(s),visit:v}:null;}
  window.RIVER_ONWARD={fresh,restore,start,choose,move,repair,exchange,signature};
})();
