(function(root){
'use strict';
const TYPES=['single','multi','dropdown','sort','order','match','label','hotspot','numeric'];
function shuffle(values,rng=Math.random){const out=values.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
function number(text){const value=String(text??'').trim().replace(',','.');return /^[-+]?(?:\d+\.?\d*|\.\d+)$/.test(value)?Number(value):NaN;}
function complete(q,r){
 if(['single','hotspot'].includes(q.type))return Number.isInteger(r)&&r>=0&&r<q.data.options.length;
 if(q.type==='multi')return Array.isArray(r)&&r.length>0&&r.every(i=>Number.isInteger(i)&&i>=0&&i<q.data.options.length);
 if(q.type==='numeric')return Number.isFinite(number(r));
 if(q.type==='dropdown')return Array.isArray(r)&&q.data.blanks.every((b,i)=>b.options.includes(r[i]));
 if(q.type==='order')return Array.isArray(r)&&r.length===q.data.items.length&&new Set(r).size===r.length&&q.data.items.every(x=>r.includes(x.id));
 return r&&typeof r==='object'&&q.data.items.every(x=>q.data.zones.some(z=>z.id===r[x.id]));
}
function grade(q,r){
 let earned=0,total=1;
 if(['single','hotspot'].includes(q.type))earned=r===q.answer?1:0;
 else if(q.type==='numeric')earned=Number.isFinite(number(r))&&Math.abs(number(r)-q.answer)<=(q.tolerance||0)?1:0;
 else if(q.type==='multi'){total=q.answer.length;const selected=new Set(Array.isArray(r)?r:[]);earned=Math.max(0,q.answer.filter(i=>selected.has(i)).length-[...selected].filter(i=>!q.answer.includes(i)).length);}
 else if(q.type==='dropdown'){total=q.answer.length;earned=q.answer.filter((x,i)=>r?.[i]===x).length;}
 else if(q.type==='order'){total=q.answer.length;earned=q.answer.filter((x,i)=>r?.[i]===x).length;}
 else{total=q.data.items.length;earned=q.data.items.filter(x=>r?.[x.id]===q.answer[x.id]).length;}
 return {correct:complete(q,r)&&earned===total,complete:!!complete(q,r),earned,total};
}
function round(bank,group,count,progress={},rng=Math.random,format='all'){
 const pool=bank.filter(q=>(group==='all'||q.group===group)&&(format==='all'||q.type===format));
 const rank=q=>(progress[q.id]?.correct?4:0)+(progress[q.id]?.seen?1:0)+rng();
 const buckets=TYPES.map(type=>pool.filter(q=>q.type===type).map(q=>({q,n:rank(q)})).sort((a,b)=>a.n-b.n).map(x=>x.q));
 const result=[];while(buckets.some(x=>x.length))for(const b of buckets)if(b.length)result.push(b.shift());
 return result.slice(0,count==='all'?result.length:Math.max(1,Math.min(Number(count)||9,result.length))).map(q=>q.id);
}
function empty(q,rng=Math.random){if(q.type==='multi')return[];if(q.type==='dropdown')return q.data.blanks.map(()=>'');if(q.type==='order')return shuffle(q.data.items.map(x=>x.id),rng);if(['sort','match','label'].includes(q.type))return{};return q.type==='numeric'?'':null;}
function answerText(q){if(['single','hotspot'].includes(q.type))return q.data.options[q.answer];if(q.type==='multi')return q.answer.map(i=>q.data.options[i]).join('; ');if(q.type==='numeric')return q.answer+' '+q.data.unit;if(q.type==='dropdown')return q.answer.join(' · ');if(q.type==='order')return q.answer.map(id=>q.data.items.find(x=>x.id===id).text).join(' → ');return q.data.items.map(x=>x.text+' → '+q.data.zones.find(z=>z.id===q.answer[x.id]).label).join('; ');}
const api={TYPES,shuffle,number,complete,grade,round,empty,answerText};
root.ScienceLabCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);