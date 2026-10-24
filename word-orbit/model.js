(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./words.js'));else root.WordOrbit=factory(root.OrbitWords);})(typeof globalThis!=='undefined'?globalThis:this,function(families){
  'use strict';
  const key=parts=>parts.join('+');
  const same=(a,b)=>key(a)===key(b);
  const affixKey=a=>a.side+':'+a.text;
  const decks=families.map(f=>{
    const nodes=[{word:f.base,parts:[f.base],meaning:f.meaning,note:''},...f.words];
    const byWord=new Map(nodes.map(n=>[n.word,n]));
    const edges=new Map(nodes.map(n=>[n.word,[]]));
    for(const from of nodes)for(const to of nodes){
      if(to.parts.length!==from.parts.length+1)continue;
      if(same(to.parts.slice(1),from.parts))edges.get(from.word).push({text:to.parts[0],side:'prefix',to:to.word});
      if(same(to.parts.slice(0,-1),from.parts))edges.get(from.word).push({text:to.parts.at(-1),side:'suffix',to:to.word});
    }
    return {...f,nodes,byWord,edges};
  });
  function hasNew(deck,word,found,seen=new Set()){
    if(seen.has(word))return false;seen.add(word);
    return deck.edges.get(word).some(e=>!found.has(e.to)||hasNew(deck,e.to,found,seen));
  }
  function create(){return {family:0,current:decks[0].base,found:decks.map(()=>new Set()),score:0,mistakes:0};}
  function deck(s){return decks[s.family];}
  function node(s){return deck(s).byWord.get(s.current);}
  function total(s){return s.found.reduce((sum,x)=>sum+x.size,0);}
  function complete(s){return s.found[s.family].size===deck(s).words.length;}
  function reset(s){s.current=deck(s).base;}
  function switchFamily(s,i){if(Number.isInteger(i)&&i>=0&&i<decks.length){s.family=i;reset(s);}}
  function resume(s,word){if(word===deck(s).base||s.found[s.family].has(word))s.current=word;}
  function attempt(s,part){
    const d=deck(s),before=node(s),edge=d.edges.get(s.current).find(e=>affixKey(e)===affixKey(part));
    if(!edge){s.score-=3;s.mistakes++;return {ok:false,delta:-3,from:before.word,attempt:part.side==='prefix'?part.text+before.word:before.word+part.text};}
    const fresh=!s.found[s.family].has(edge.to);
    s.current=edge.to;if(fresh){s.found[s.family].add(edge.to);s.score+=10;}
    return {ok:true,fresh,delta:fresh?10:0,node:node(s),terminal:!hasNew(d,s.current,s.found[s.family]),complete:complete(s)};
  }
  // Only reviewed nonsense endings are decoys. A real but untaught word is
  // never offered as a penalised match merely because it is outside the bank.
  const decoys=['tion','ous','ify'];
  function candidates(s,wave=0){
    const d=deck(s),found=s.found[s.family],all=d.edges.get(s.current);
    const fresh=all.filter(e=>!found.has(e.to)||hasNew(d,e.to,found));
    const old=all.filter(e=>!fresh.includes(e));
    const priority=['re','mis','un','ing','ful','ed','er','s','less','ly','ness','est'];
    const ordered=(fresh.length?fresh:old).slice().sort((a,b)=>priority.indexOf(a.text)-priority.indexOf(b.text));
    const rotated=ordered.length?ordered.slice(wave%ordered.length).concat(ordered.slice(0,wave%ordered.length)):[];
    const chosen=rotated.slice(0,4).map(e=>({text:e.text,side:e.side}));
    // Do not let rotation hide every route to an undiscovered word.
    for(let i=0;i<2;i++)chosen.push({text:decoys[(wave+i)%decoys.length],side:'suffix'});
    return chosen.filter((p,i,a)=>a.findIndex(q=>affixKey(q)===affixKey(p))===i);
  }
  return {decks,create,deck,node,total,complete,reset,switchFamily,resume,attempt,candidates,hasNew,affixKey};
});
