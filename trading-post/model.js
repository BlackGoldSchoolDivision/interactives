(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TradingPostModel=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const ITEMS=[
    {id:'beaver',name:'Beaver',kind:'fur',points:10,cell:0},{id:'otter',name:'Otter',kind:'fur',points:5,cell:1},
    {id:'bear',name:'Bear',kind:'fur',points:4,cell:2},{id:'deer',name:'Deer',kind:'fur',points:3,cell:3},
    {id:'mink',name:'Mink',kind:'fur',points:2,cell:4},{id:'muskrat',name:'Muskrat',kind:'fur',points:1,cell:5},
    {id:'musket',name:'Musket',kind:'goods',points:10,cell:6},{id:'cauldron',name:'Cauldron',kind:'goods',points:5,cell:7},
    {id:'shirt',name:'Shirt',kind:'goods',points:4,cell:8},{id:'blanket',name:'Blanket',kind:'goods',points:3,cell:9},
    {id:'silver',name:'Trade silver',kind:'goods',points:2,cell:10},{id:'tools',name:'Tools',kind:'goods',points:1,cell:11}
  ];
  const BY_ID=Object.fromEntries(ITEMS.map(i=>[i.id,i])),PHASES=['stock','arrival','trade','between','home','results'];
  const copy=s=>JSON.parse(JSON.stringify(s)),empty=()=>Object.fromEntries(ITEMS.map(i=>[i.id,0]));
  const kind=role=>role==='community'?'fur':'goods',opposite=role=>role==='community'?'goods':'fur';
  const list=k=>ITEMS.filter(i=>i.kind===k),total=(counts,k)=>list(k).reduce((n,i)=>n+(counts[i.id]||0),0);
  const value=counts=>ITEMS.reduce((n,i)=>n+(counts[i.id]||0)*i.points,0);
  const clean=counts=>Object.fromEntries(ITEMS.map(i=>[i.id,Math.min(72,Math.max(0,Math.floor(Number(counts?.[i.id])||0)))]));
  function die(rng){return Math.min(6,Math.max(1,1+Math.floor(rng()*6)));}
  function lot(k,rng){const counts=empty();for(let n=0;n<3;n++){const face=die(rng);counts[list(k)[face-1].id]+=face;}return counts;}
  function fresh(role){return {version:1,role:role==='merchant'?'merchant':'community',phase:'stock',round:1,rolls:[],own:empty(),stock:empty(),give:empty(),take:empty(),wanted:[],pending:null,log:[],partners:[],initial:0};}
  function roll(s,rng=Math.random){if(s.phase!=='stock'||s.rolls.length>=3)return s;const n=copy(s),face=die(rng);n.rolls.push(face);n.own[list(kind(n.role))[face-1].id]+=face;n.initial=value(n.own);return n;}
  function partner(s,rng){s.stock=lot(opposite(s.role),rng);const available=list(kind(s.role)).filter(i=>s.own[i.id]);available.sort((a,b)=>s.round===1?b.points-a.points:a.points-b.points);s.wanted=available.slice(0,2).map(i=>i.id);s.partners.push({round:s.round,start:copy(s.stock),received:empty()});s.give=empty();s.take=empty();s.pending=null;}
  function arrive(s,rng=Math.random){if(s.phase!=='stock'||s.rolls.length!==3)return s;const n=copy(s);n.phase='arrival';partner(n,rng);return n;}
  function enter(s){if(!['arrival','between'].includes(s.phase))return s;const n=copy(s);n.phase='trade';return n;}
  function stage(s,side,id,delta){if(s.phase!=='trade'||!BY_ID[id]||!['give','take'].includes(side))return s;const expected=side==='give'?kind(s.role):opposite(s.role);if(BY_ID[id].kind!==expected)return s;const n=copy(s),limit=side==='give'?n.own[id]:n.stock[id];n[side][id]=Math.max(0,Math.min(limit,n[side][id]+delta));n.pending=null;return n;}
  function clear(s){const n=copy(s);n.give=empty();n.take=empty();n.pending=null;return n;}
  function valid(s,give=s.give,take=s.take){return s.phase==='trade'&&total(give,kind(s.role))>0&&total(take,opposite(s.role))>0&&ITEMS.every(i=>Number.isInteger(give[i.id])&&Number.isInteger(take[i.id])&&give[i.id]>=0&&take[i.id]>=0&&give[i.id]<=s.own[i.id]&&take[i.id]<=s.stock[i.id]&&(i.kind===kind(s.role)||give[i.id]===0)&&(i.kind===opposite(s.role)||take[i.id]===0));}
  function weighted(s,give){return ITEMS.reduce((v,i)=>v+give[i.id]*i.points*(s.wanted.includes(i.id)?1.35:1),0);}
  function acceptable(s,give,take){return valid(s,give,take)&&weighted(s,give)+.001>=value(take)*(s.round===1?1.08:.96);}
  function proposal(s){if(!valid(s))return null;const give=copy(s.give),take=copy(s.take);if(acceptable(s,give,take))return {kind:'agreement',give,take};
    const add=list(kind(s.role)).filter(i=>s.own[i.id]>give[i.id]).sort((a,b)=>(b.points*(s.wanted.includes(b.id)?1.35:1))-(a.points*(s.wanted.includes(a.id)?1.35:1)));
    for(const i of add)while(give[i.id]<s.own[i.id]){give[i.id]++;if(acceptable(s,give,take))return {kind:'counter',give,take};}
    const less=copy(s.take),remove=list(opposite(s.role)).filter(i=>less[i.id]).sort((a,b)=>b.points-a.points);
    for(const i of remove)while(less[i.id]>0){less[i.id]--;if(acceptable(s,s.give,less))return {kind:'counter',give:copy(s.give),take:less};}
    return {kind:'refusal'};
  }
  function negotiate(s){const n=copy(s);n.pending=proposal(n);return n;}
  function accept(s){if(!s.pending||!['agreement','counter'].includes(s.pending.kind)||!acceptable(s,s.pending.give,s.pending.take))return s;const n=copy(s),deal=n.pending;
    for(const i of ITEMS){n.own[i.id]-=deal.give[i.id];n.own[i.id]+=deal.take[i.id];n.stock[i.id]-=deal.take[i.id];n.partners[n.round-1].received[i.id]+=deal.give[i.id];}
    n.log.push({round:n.round,give:deal.give,take:deal.take});n.give=empty();n.take=empty();n.pending=null;return n;
  }
  function advance(s,rng=Math.random){if(s.phase!=='trade')return s;const n=clear(s);if(n.round===2||total(n.own,kind(n.role))===0){n.phase='home';return n;}n.round=2;n.phase='between';partner(n,rng);return n;}
  function finish(s){if(s.phase!=='home')return s;const n=copy(s);n.phase='results';return n;}
  function score(s){return list(opposite(s.role)).reduce((n,i)=>n+s.own[i.id]*i.points,0);}
  function restore(raw){if(!raw||raw.version!==1||!['community','merchant'].includes(raw.role)||!PHASES.includes(raw.phase))return null;
    const s=fresh(raw.role);s.phase=raw.phase;s.round=raw.round===2?2:1;s.rolls=(Array.isArray(raw.rolls)?raw.rolls:[]).filter(n=>Number.isInteger(n)&&n>=1&&n<=6).slice(0,3);s.own=clean(raw.own);s.stock=clean(raw.stock);s.give=clean(raw.give);s.take=clean(raw.take);s.initial=Math.max(0,Math.min(36,Number(raw.initial)||0));s.wanted=(Array.isArray(raw.wanted)?raw.wanted:[]).filter(id=>BY_ID[id]?.kind===kind(s.role)).slice(0,2);
    s.log=(Array.isArray(raw.log)?raw.log:[]).slice(0,72).filter(d=>d&&[1,2].includes(d.round)).map(d=>({round:d.round,give:clean(d.give),take:clean(d.take)}));
    s.partners=(Array.isArray(raw.partners)?raw.partners:[]).slice(0,2).filter(Boolean).map((p,i)=>({round:i+1,start:clean(p.start),received:clean(p.received)}));
    if(s.phase!=='stock'&&(s.rolls.length!==3||s.partners.length!==s.round))return null;
    for(const i of ITEMS){s.give[i.id]=i.kind===kind(s.role)?Math.min(s.give[i.id],s.own[i.id]):0;s.take[i.id]=i.kind===opposite(s.role)?Math.min(s.take[i.id],s.stock[i.id]):0;}
    if(raw.pending&&['agreement','counter'].includes(raw.pending.kind)){const give=clean(raw.pending.give),take=clean(raw.pending.take);if(acceptable(s,give,take))s.pending={kind:raw.pending.kind,give,take};}else if(raw.pending?.kind==='refusal')s.pending={kind:'refusal'};
    return s;
  }
  return {ITEMS,BY_ID,empty,kind,opposite,list,total,value,fresh,roll,arrive,enter,stage,clear,valid,acceptable,proposal,negotiate,accept,advance,finish,score,restore};
});
