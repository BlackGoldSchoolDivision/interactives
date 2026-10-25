(function(g,f){const m=f(typeof module==='object'&&module.exports?require('./data.js'):g.LiteralData);if(typeof module==='object'&&module.exports)module.exports=m;else g.LiteralGame=m;})(globalThis,function(data){
'use strict';const types={mixed:'Mixed expressions',idiom:'Idioms',simile:'Similes',metaphor:'Metaphors',hyperbole:'Hyperbole',personification:'Personification'},levels={starter:'Starter',explorer:'Explorer',expert:'Expert'};
function shuffle(arr,seed){const a=[...arr];let n=(seed>>>0)||47;for(let i=a.length-1;i>0;i--){n=(Math.imul(1664525,n)+1013904223)>>>0;const j=n%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
function bank(level,type){return data.filter(q=>q.level===level&&(type==='mixed'||q.type===type));}
function round(level,type,seed=0){const b=bank(level,type),a=shuffle(b,seed);if(seed===0){const i=a.findIndex(q=>q.id===b[0]?.id);if(i>=0)a.unshift(...a.splice(i,1));}return{ids:a.slice(0,6).map(q=>q.id),index:0,selected:-1,attempts:0,score:0,solved:false,collected:[],seed};}
function options(q,seed=0){return shuffle(q.choices.map((label,i)=>({label,correct:i===0})),seed+q.id.length*391);}
function check(r,q){if(r.solved||r.selected<0)return{...r};const correct=options(q,r.seed)[r.selected]?.correct;if(!correct)return{...r,attempts:r.attempts+1};return{...r,score:r.score+(r.attempts?50:100),solved:true,collected:[...r.collected,q.id]};}
return{data,types,levels,shuffle,bank,round,options,check};
});
