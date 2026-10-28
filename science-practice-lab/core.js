(function(root){
'use strict';
const TYPES=['single','multi','dropdown','sort','order','match','label','hotspot','numeric'];
function shuffle(values,rng=Math.random){const out=values.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
function number(text){const value=String(text??'').trim().replace(',','.');return /^[-+]?(?:\d+\.?\d*|\.\d+)$/.test(value)?Number(value):NaN;}
function complete(q,r){
 if(['single','hotspot'].includes(q.type))return Number.isInteger(r)&&r>=0&&r<q.data.options.length;
 if(q.type==='multi')return Array.isArray(r)&&r.length===q.answer.length&&new Set(r).size===r.length&&r.every(i=>Number.isInteger(i)&&i>=0&&i<q.data.options.length);
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
function hasVisual(q){const d=q.data||{};return Boolean(d.photo||d.sceneStrip||d.scenePair||d.diagram||d.optionVisuals?.length||Object.keys(d.zoneImages||{}).length||Object.keys(d.itemVisuals||{}).length||q.visual);}
function round(bank,group,count,progress={},rng=Math.random,format='all'){
 const pool=bank.filter(q=>(group==='all'||q.group===group)&&(format==='all'||(format==='visual'?hasVisual(q):q.type===format)));
 const rank=q=>(progress[q.id]?.correct?4:0)+(progress[q.id]?.seen?1:0)+rng();
 const buckets=TYPES.map(type=>pool.filter(q=>q.type===type).map(q=>({q,n:rank(q)})).sort((a,b)=>a.n-b.n).map(x=>x.q));
 const result=[];while(buckets.some(x=>x.length))for(const b of buckets)if(b.length)result.push(b.shift());
 return result.slice(0,count==='all'?result.length:Math.max(1,Math.min(Number(count)||9,result.length))).map(q=>q.id);
}
function empty(q,rng=Math.random){if(q.type==='multi')return[];if(q.type==='dropdown')return q.data.blanks.map(()=>'');if(q.type==='order')return shuffle(q.data.items.map(x=>x.id),rng);if(['sort','match','label'].includes(q.type))return{};return q.type==='numeric'?'':null;}
function answerText(q){if(['single','hotspot'].includes(q.type))return q.data.options[q.answer];if(q.type==='multi')return q.answer.map(i=>q.data.options[i]).join('; ');if(q.type==='numeric')return q.answer+' '+q.data.unit;if(q.type==='dropdown')return q.answer.join(' · ');if(q.type==='order')return q.answer.map(id=>q.data.items.find(x=>x.id===id).text).join(' → ');return q.data.items.map(x=>x.text+' → '+q.data.zones.find(z=>z.id===q.answer[x.id]).label).join('; ');}

// Clear only answers whose underlying question task or key has changed.
function reconcile(saved,bank){
 const out=JSON.parse(JSON.stringify(saved)),updated=[];
 if(out.run&&!out.run.entries)out.run=null;
 out.progress=out.progress&&typeof out.progress==='object'?out.progress:{};
 const changed=bank.filter(q=>(q.revision||1)>(out.questionRevisions?.[q.id]||1));
 for(const q of changed){const prior=out.progress[q.id],e=out.run?.entries?.[q.id];if(prior||e?.visited||e?.submitted)updated.push(q.id);delete out.progress[q.id];}
 const affected=changed.filter(q=>out.run?.queue?.includes(q.id));
 if(affected.length&&out.run.finished)out.run=null;
 else if(affected.length){for(const q of affected){const e=out.run.entries?.[q.id];if(e?.visited||e?.submitted)out.run.pos=Math.min(out.run.pos,out.run.queue.indexOf(q.id));out.run.entries[q.id]={response:empty(q),attempts:0,submitted:false,checked:false,correct:false,firstCorrect:null,revealed:false,hinted:false,flagged:!!e?.flagged,visited:false};}}
 out.questionRevisions=Object.fromEntries(bank.map(q=>[q.id,q.revision||1]));
 return {saved:out,updated};
}

const api={reconcile,TYPES,shuffle,number,complete,grade,round,hasVisual,empty,answerText};
root.ScienceLabCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
