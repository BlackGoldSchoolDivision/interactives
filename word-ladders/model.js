(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./data.js'),require('./lexicon.js'));else root.Ladders=factory(root.LadderPuzzles,root.LadderLexicon);})(typeof globalThis!=='undefined'?globalThis:this,function(puzzles,lexicon){
  'use strict';
  const levels={starter:{name:'Starter',grades:'Suggested Grades 1–2',description:'Familiar three-letter words and direct clues.'},explorer:{name:'Explorer',grades:'Suggested Grades 3–4',description:'Four-letter words and a wider vocabulary.'},expert:{name:'Expert',grades:'Suggested Grades 5–6+',description:'Five- and six-letter words with richer vocabulary.'}};
  const bank=new Set(lexicon.split(' '));for(const p of puzzles)for(const w of p.words)bank.add(w);
  const buckets=new Map();
  function index(n){if(buckets.has(n))return buckets.get(n);const m=new Map();for(const w of bank)if(w.length===n)for(let i=0;i<n;i++){const k=w.slice(0,i)+'*'+w.slice(i+1);if(!m.has(k))m.set(k,[]);m.get(k).push(w);}buckets.set(n,m);return m;}
  function changes(a,b){if(a.length!==b.length)return Infinity;return [...a].filter((c,i)=>c!==b[i]).length;}
  function neighbors(word){const m=index(word.length),out=new Set();for(let i=0;i<word.length;i++)for(const w of m.get(word.slice(0,i)+'*'+word.slice(i+1))||[])if(w!==word)out.add(w);return [...out];}
  function route(start,goal,avoid=[]){const seen=new Set(avoid),parent=new Map(),q=[start];seen.add(start);for(let k=0;k<q.length;k++){const w=q[k];if(w===goal){const result=[w];while(parent.has(result[0]))result.unshift(parent.get(result[0]));return result;}for(const n of neighbors(w))if(!seen.has(n)){seen.add(n);parent.set(n,w);q.push(n);}}return null;}
  function check(p,path,input,mode='guided'){
    const word=String(input).trim().toUpperCase(),last=path.at(-1);
    if(!/^[A-Z]+$/.test(word))return {ok:false,message:'Enter a word using letters.'};
    if(word.length!==last.length)return {ok:false,message:'Keep all '+last.length+' letters. Change just one.'};
    if(changes(last,word)!==1)return {ok:false,message:'Change exactly one letter. Keep the others in place.'};
    if(path.includes(word))return {ok:false,message:'That word is already on your ladder. Try a new step.'};
    if(!bank.has(word))return {ok:false,message:'That word is not in our classroom bank. Try another.'};
    if(mode==='guided'&&word!==p.words[path.length])return {ok:false,message:'A real word! Check the clue for this step.'};
    return {ok:true,word,complete:word===p.words[5]&&(mode==='free'||path.length===5)};
  }
  function hint(p,path,mode){const next=mode==='guided'?p.words[path.length]:route(path.at(-1),p.words[5],path.slice(0,-1))?.[1];if(!next)return null;const i=[...next].findIndex((c,k)=>c!==path.at(-1)[k]);return {next,position:i+1,letter:next[i]};}
  return {puzzles,levels,bank,changes,neighbors,route,check,hint};
});
