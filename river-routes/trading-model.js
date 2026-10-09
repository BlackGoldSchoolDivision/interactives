(() => {
  'use strict';
  const ids=['cloth','kettle','tools','beads','fish','rice','pelt','repair'];
  const giveIds=ids.slice(0,4),takeIds=['fish','rice','pelt'];
  const posts={
    rainy:{name:'Fort Lac La Pluie',company:'North West Company · Rainy Lake',image:'assets/post-rainy-lake.webp',place:'rainy-lake',alt:'Stocked wooden shelves frame a small wooded riverside depot, birchbark canoes and workers checking cargo beside the calm Rainy River.',needs:[['kettle','cloth'],['tools','beads']],visitors:['Local provisioning partners','Inland canoe crews'],stock:{fish:4,rice:4,pelt:8},fact:'This North West Company depot exchanged cargo between eastern and inland brigades. The surrounding land and waterways are Anishinaabe homelands. Buildings, people and the pictured stock are illustrated; today’s requests are game scenarios.',source:'https://www.fortfrances.ca/node/248'},
    nwc:{name:'Fort William',company:'North West Company',image:'assets/post-fort-william.webp',place:'fort-william',alt:'From a timber trading porch with stocked shelves, look across birchbark canoes toward Fort William’s palisade, warehouses and workshops on the Kaministiquia River.',needs:[['kettle','cloth'],['tools','beads']],visitors:['Provisioning partners','Arriving canoe crews'],stock:{fish:4,rice:4,pelt:8},fact:'Anishinaabe producers supplied smoked fish and wild rice. Canoe technology, route knowledge and skilled work sustained this network.',source:'https://fwhp.ca/about-us/historic-background/'},
    hbc:{name:'York Factory',company:'Hudson’s Bay Company',image:'assets/post-york-factory.webp',place:'york-factory',alt:'Stocked timber shelves frame a view of York Factory’s earlier Old Octagon compound, a wooden river boat, and the flat wet lowlands beside the Hayes River.',needs:[['tools','cloth'],['kettle','beads']],visitors:['Trading partners at the Bay','River workers'],stock:{fish:6,rice:0,pelt:8},fact:'Cree and Assiniboine trading networks connected the Bay with the interior. Cree people also hunted and fished to provision the post.',source:'https://parks.canada.ca/lhn-nhs/mb/yorkfactory/culture/histoire-history'}
  };
  const items=[
    {id:'cloth',name:'Wool cloth',short:'Cloth',cell:0,kg:10,detail:'Wool cloth and blankets were traded through both networks. Plain colours avoid suggesting that one company alone supplied wool.',source:'https://digital.library.mcgill.ca/nwc/history/04.htm'},
    {id:'kettle',name:'Brass kettles',short:'Kettles',cell:1,kg:20,detail:'Hammered metal kettles had iron bails. Nesting them saved canoe space; individual kettles could then be traded.',source:'https://digital.library.mcgill.ca/nwc/history/04.htm'},
    {id:'tools',name:'Iron tools',short:'Tools',cell:2,kg:25,detail:'Iron axe heads travelled in crates. Handles could be made locally. Knives were useful for cutting, carving and preparing food.',source:'https://digital.library.mcgill.ca/nwc/history/04.htm'},
    {id:'beads',name:'Glass beads',short:'Beads',cell:3,kg:5,detail:'White, bright blue and red beads predominated in a York Factory deposit dated from 1795 to before 1815. The pictured beads are inspired by those finds.',source:'https://journals.uoregon.edu/beads/article/view/6219'},
    {id:'fish',name:'Smoked fish',short:'Fish',cell:4,kg:15,detail:'Anishinaabe producers prepared smoked fish for Fort William. Fishing also helped provision York Factory. One pictured bundle counts as two food days in this game.',source:'https://fwhp.ca/about-us/historic-background/'},
    {id:'rice',name:'Wild rice',short:'Wild rice',cell:5,kg:15,detail:'Manoomin, wild rice, was an important provision at Fort William. The inland NWC visits offer it in their provisioning scenarios. These shelves are not documented 1809 inventories.',source:'https://fwhp.ca/about-us/historic-background/'},
    {id:'pelt',name:'Beaver pelts',short:'Pelts',cell:6,kg:5,detail:'Pelts travelled through trading networks to overseas markets. Hunting, preparing and transporting them required knowledge and labour; they were not free resources.',source:'https://fwhp.ca/about-us/our-history/'},
    {id:'repair',name:'Canoe supplies',short:'Repairs',cell:7,kg:10,detail:'The picture represents birchbark, roots and pitch used in canoe construction and repair. This bundled kit is a game simplification, not an excavated set.',source:'https://fwhp.ca/about-us/our-history/'}
  ];
  const empty=()=>Object.fromEntries(ids.map(id=>[id,0]));
  const normalize=(counts,max=60)=>Object.fromEntries(ids.map(id=>[id,Math.max(0,Math.min(max,Number.isInteger(counts?.[id])?counts[id]:0))]));
  function fresh(postId,manifest){
    const own={...empty(),cloth:2,kettle:1,tools:1,beads:2};
    let foodReserve=0,origin='practice',journeyId=null;
    if(manifest){for(const id of giveIds)own[id]=Math.max(0,Math.min(6,Math.floor(Number(manifest.counts?.[id])||0)));own.repair=Math.max(0,Math.min(6,Math.floor(Number(manifest.counts?.repair)||0)));foodReserve=Math.max(0,Math.min(6,Math.floor(Number(manifest.counts?.food)||0)));origin='carried-copy';journeyId=manifest.journeyId;}
    return {own,stock:{...empty(),...posts[postId].stock},give:empty(),take:empty(),deals:0,foodReserve,origin,journeyId,log:[],reply:'Choose goods from both shelves.',replyKind:'start',lastExchange:null};
  }
  const wanted=(postId,s)=>posts[postId].needs[Math.min(1,s.deals)];
  const food=s=>s.foodReserve+s.own.fish+s.own.rice;
  const weight=s=>s.foodReserve*15+items.reduce((n,i)=>n+s.own[i.id]*i.kg,0);
  const goal=s=>food(s)>=2&&s.own.pelt>=4&&weight(s)<=130;
  const afterWeight=(s,give=s.give,take=s.take)=>weight(s)+items.reduce((n,i)=>n+(take[i.id]-give[i.id])*i.kg,0);
  const cost=take=>take.fish+take.rice+take.pelt*2;
  function value(postId,s,give){
    const needs=wanted(postId,s),base={cloth:2,kettle:3,tools:3,beads:1};
    // The first wanted bundle is most useful. Repeated kinds have less use.
    return giveIds.reduce((total,id)=>total+Array.from({length:give[id]},(_,n)=>n===0?base[id]+(needs.includes(id)?2:0):1).reduce((a,b)=>a+b,0),0);
  }
  function valid(s,give=s.give,take=s.take){
    return ids.every(id=>Number.isInteger(give[id])&&Number.isInteger(take[id])&&give[id]>=0&&take[id]>=0&&give[id]<=s.own[id]&&take[id]<=s.stock[id]&&(!give[id]||giveIds.includes(id))&&(!take[id]||takeIds.includes(id)))&&giveIds.some(id=>give[id])&&takeIds.some(id=>take[id]);
  }
  const agreeable=(postId,s,give=s.give,take=s.take)=>valid(s,give,take)&&value(postId,s,give)>=cost(take)&&afterWeight(s,give,take)<=130;
  function counters(postId,s){
    if(!valid(s)||agreeable(postId,s))return [];
    const result=[],need=wanted(postId,s);
    // Find the smallest available addition; prefer the goods wanted today.
    let add=null;
    for(const id of [...need,...giveIds.filter(id=>!need.includes(id))]){
      const give={...s.give};
      for(let n=1;n<=s.own[id]-s.give[id];n++){
        give[id]=s.give[id]+n;
        if(agreeable(postId,s,give,s.take)){if(!add||n<add.count)add={kind:'add',id,count:n,give:{...give},take:{...s.take}};break;}
      }
    }
    if(add)result.push(add);
    // Alternatively ask for less, leaving the player's goods unchanged.
    let reduce=null;
    for(const id of ['pelt','rice','fish']){
      const take={...s.take};
      for(let n=1;n<=s.take[id];n++){
        take[id]=s.take[id]-n;
        if(agreeable(postId,s,s.give,take)){if(!reduce||n<reduce.count)reduce={kind:'reduce',id,count:n,give:{...s.give},take:{...take}};break;}
      }
    }
    if(reduce)result.push(reduce);
    return result;
  }
  function exchange(postId,s){
    if(!agreeable(postId,s))return null;
    const next=structuredClone(s),record={give:{...s.give},take:{...s.take}};
    for(const id of ids){next.own[id]+=s.take[id]-s.give[id];next.stock[id]+=s.give[id]-s.take[id];}
    next.give=empty();next.take=empty();next.deals++;next.lastExchange=record;next.log=[record,...s.log].slice(0,12);next.replyKind=goal(next)?'complete':'exchanged';
    next.reply=goal(next)?'Provisions ready. Four pelts aboard!':next.deals===1?'Deal made! New arrivals want different goods.':'Deal made! Your shelves have changed.';
    return next;
  }
  function restore(postId,s){
    if(!s||!s.own||!s.stock)return fresh(postId);
    const n={...fresh(postId),...s,own:normalize(s.own),stock:normalize(s.stock),give:normalize(s.give),take:normalize(s.take),deals:Math.max(0,Math.min(30,Math.floor(Number(s.deals)||0))),foodReserve:Math.max(0,Math.min(6,Math.floor(Number(s.foodReserve)||0))),origin:['carried-copy','journey'].includes(s.origin)?s.origin:'practice',log:Array.isArray(s.log)?s.log.filter(r=>r&&r.give&&r.take).slice(0,12):[],reply:typeof s.reply==='string'?s.reply.slice(0,160):'Choose goods from both shelves.'};
    for(const id of ids){n.give[id]=giveIds.includes(id)?Math.min(n.give[id],n.own[id]):0;n.take[id]=takeIds.includes(id)?Math.min(n.take[id],n.stock[id]):0;}
    if(n.replyKind==='agreement'&&!agreeable(postId,n))n.replyKind='start';
    return n;
  }
  window.RIVER_TRADE={ids,giveIds,takeIds,posts,items,empty,normalize,fresh,wanted,food,weight,afterWeight,goal,cost,value,valid,agreeable,counters,exchange,restore};
})();
