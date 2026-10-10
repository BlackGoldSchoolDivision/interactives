import {mountRound} from '../round.js';
import {gcd,rational,asFraction,safeText} from '../math.js';
import {simplifyBank,sharingBank,addSubBank,multiplyBank,checkSimplify,checkSharing,checkAddSub,checkMultiply} from './fractions-data.js';

const label = (n,d) => `${n}/${d}`;
const names = {2:'Halves',3:'Thirds',4:'Fourths',5:'Fifths',6:'Sixths',8:'Eighths',10:'Tenths',12:'Twelfths'};
function bar(n,d,parts=d,colour='cobalt') {
  return `<div class="fraction-bar static-bar" role="img" aria-label="${n} of ${d} equal parts filled; partitioned into ${parts} parts"><span class="fraction-fill" style="width:${100*n/d}%;background:var(--${colour})"></span>${Array.from({length:parts},()=>'<span class="fraction-tick"></span>').join('')}</div>`;
}
const row = (name,body) => `<div class="fraction-row"><span class="fraction-label">${name}</span>${body}</div>`;

function simplifyModel(root,task,ctx) {
  const factor=gcd(task.n,task.d),divisors=Array.from({length:factor},(_,i)=>i+1).filter(n=>task.n%n===0&&task.d%n===0);
  const state={group:1};
  root.innerHTML=`<p class="part-label">Regroup neighbouring pieces. Keep the filled amount the same.</p><div class="toolbar partition-controls">${divisors.map(d=>`<button class="chip" aria-pressed="${d===1}" data-group="${d}">Group by ${d}</button>`).join('')}</div>${row(label(task.n,task.d),bar(task.n,task.d))}${row('Same amount','<div id="regrouped" class="bar-wrapper"></div>')}<p id="group-description" class="part-label" role="status"></p>`;
  function update(){root.querySelector('#regrouped').innerHTML=bar(task.n,task.d,task.d/state.group,'teal');root.querySelector('#group-description').textContent=`${task.n/state.group} filled parts out of ${task.d/state.group} equal parts.`;root.querySelectorAll('[data-group]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.group)===state.group)));}
  root.querySelectorAll('[data-group]').forEach(button=>button.addEventListener('click',()=>{state.group=Number(button.dataset.group);update();},{signal:ctx.signal}));update();return{state};
}
function sharingModel(root,task,ctx) {
  const state={shares:Array(task.people).fill(0)};
  root.innerHTML=`<p class="model-question">Share ${task.wholes} ${safeText(task.item)} equally among ${task.people} people.</p><p class="small">Each whole is cut into ${task.people} equal pieces. Give pieces to people, or distribute one equal round.</p><div class="sharing-wholes">${Array.from({length:task.wholes},()=>bar(task.people,task.people,task.people,'coral')).join('')}</div><div class="toolbar"><button class="chip" id="share-round">Give everyone one piece</button><button class="chip" id="share-reset">Start sharing again</button><span id="pieces-left" role="status"></span></div><div class="sharing-grid">${state.shares.map((_,i)=>`<div class="person-share"><h2>Person ${i+1}</h2><p id="share-${i}" class="share-amount"></p><div class="share-controls"><button class="chip" data-person="${i}" data-change="-1" aria-label="Return a piece from person ${i+1}">−</button><button class="chip" data-person="${i}" data-change="1" aria-label="Give a piece to person ${i+1}">+</button></div></div>`).join('')}</div>`;
  const remaining=()=>task.wholes*task.people-state.shares.reduce((a,b)=>a+b,0);
  function update(){root.querySelector('#pieces-left').textContent=`${remaining()} pieces left`;root.querySelector('#share-round').disabled=remaining()<task.people;state.shares.forEach((n,i)=>{root.querySelector(`#share-${i}`).textContent=`${n}/${task.people} of one whole`;root.querySelector(`[data-person="${i}"][data-change="-1"]`).disabled=n===0;root.querySelector(`[data-person="${i}"][data-change="1"]`).disabled=remaining()===0;});}
  root.querySelectorAll('[data-person]').forEach(button=>button.addEventListener('click',()=>{const i=Number(button.dataset.person),change=Number(button.dataset.change);if(change>0&&remaining()>0||change<0&&state.shares[i]>0)state.shares[i]+=change;update();},{signal:ctx.signal}));
  root.querySelector('#share-round').addEventListener('click',()=>{if(remaining()>=task.people)state.shares=state.shares.map(n=>n+1);update();},{signal:ctx.signal});
  root.querySelector('#share-reset').addEventListener('click',()=>{state.shares.fill(0);update();},{signal:ctx.signal});update();return{state};
}
function addSubModel(root,task,ctx) {
  const state={denominator:task.denominator,count:0};
  const partitions=[...new Set([task.a.d,task.b.d,task.denominator,...(task.denominator<=6?[task.denominator*2]:[])])].sort((a,b)=>a-b);
  root.innerHTML=`<div class="toolbar partition-controls" aria-label="Choose equal-sized parts">${partitions.map(d=>`<button class="chip" data-parts="${d}" aria-pressed="${d===state.denominator}">${names[d]||`${d} parts`}</button>`).join('')}</div><p class="expression">${label(task.a.n,task.a.d)} ${task.op} ${label(task.b.n,task.b.d)}</p><div id="fraction-models"></div><div class="toolbar model-stepper"><button class="chip" id="remove-part" aria-label="Remove one part from your model">−</button><span id="part-count" role="status"></span><button class="chip" id="add-part" aria-label="Add one part to your model">+</button></div><p class="small">Tap a part or use the plus and minus controls. Write the fraction shown by your finished model.</p>`;
  function update(){
    const d=state.denominator,common=d%task.a.d===0&&d%task.b.d===0;
    const equivalent=(f)=>common?`${label(f.n,f.d)} = ${label(f.n*d/f.d,d)}`:label(f.n,f.d);
    root.querySelector('#fraction-models').innerHTML=row(equivalent(task.a),bar(task.a.n,task.a.d,d))+row(equivalent(task.b),bar(task.b.n,task.b.d,d,'coral'))+row('Your model',`<div class="fraction-bar">${Array.from({length:d},(_,i)=>`<button class="fraction-cell ${i<state.count?(task.op==='+'&&i>=task.a.n*d/task.a.d?'coral-part':'selected'):''}" data-cell="${i}" aria-label="Set your model to ${i+1} of ${d} parts" aria-pressed="${i<state.count}"></button>`).join('')}</div>`);
    root.querySelector('#part-count').textContent=`${state.count}/${d}`;root.querySelector('#remove-part').disabled=state.count===0;root.querySelector('#add-part').disabled=state.count===d;
    root.querySelectorAll('[data-parts]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.parts)===d)));
    root.querySelectorAll('[data-cell]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.cell)+1;state.count=state.count===n?n-1:n;update();},{signal:ctx.signal}));
  }
  root.querySelectorAll('[data-parts]').forEach(b=>b.addEventListener('click',()=>{state.denominator=Number(b.dataset.parts);state.count=0;update();},{signal:ctx.signal}));
  root.querySelector('#remove-part').addEventListener('click',()=>{state.count=Math.max(0,state.count-1);update();},{signal:ctx.signal});
  root.querySelector('#add-part').addEventListener('click',()=>{state.count=Math.min(state.denominator,state.count+1);update();},{signal:ctx.signal});update();return{state};
}
function multiplyModel(root,task,ctx) {
  const state={selected:new Set()};
  root.innerHTML=`<p class="expression">${label(task.n,task.d)} × ${task.whole}</p><p class="part-label">${task.whole} counters, split into ${task.d} equal groups. Select ${task.n} groups.</p><div class="counter-groups">${Array.from({length:task.d},(_,i)=>`<button class="counter-group" data-counter-group="${i}" aria-pressed="false" aria-label="Select group ${i+1}, containing ${task.whole/task.d} counters"><span class="small">Group ${i+1}</span><span class="counters">${Array.from({length:task.whole/task.d},()=>'<span class="counter-dot" aria-hidden="true"></span>').join('')}</span><strong>${task.whole/task.d} counters</strong></button>`).join('')}</div><p class="part-label" id="selected-counters" role="status">No groups selected yet.</p>`;
  root.querySelectorAll('[data-counter-group]').forEach(b=>b.addEventListener('click',()=>{const id=Number(b.dataset.counterGroup);if(state.selected.has(id))state.selected.delete(id);else state.selected.add(id);b.setAttribute('aria-pressed',String(state.selected.has(id)));root.querySelector('#selected-counters').textContent=`${state.selected.size} groups · ${state.selected.size*task.whole/task.d} counters selected`;},{signal:ctx.signal}));return{state};
}
const configurations={
  simplify:{bank:simplifyBank,title:'Same amount, fewer parts',instruction:'Regroup equal parts, then write the fraction in simplest form.',placeholder:'e.g. 2/3',answerHelp:'Write a fraction in simplest form.',render:simplifyModel,check:checkSimplify,hint:t=>`Find a number that divides both ${t.n} and ${t.d}. Divide both by the same number. Try grouping neighbouring pieces.`,explain:t=>`${t.n}/${t.d} = ${asFraction(t.answer)}. Divide numerator and denominator by ${gcd(t.n,t.d)}; the whole stayed the same.`},
  sharing:{bank:sharingBank,title:'A fair share',instruction:'Give everyone the same amount, with no pieces left over.',placeholder:'e.g. 3/4',render:sharingModel,check:checkSharing,hint:t=>`A share is ${t.wholes} ÷ ${t.people}, or ${t.wholes}/${t.people} of one whole. Giving everyone one piece at a time keeps the shares equal.`,explain:t=>`Each person receives ${t.wholes}/${t.people} of one whole, equal to ${asFraction(t.answer)}. All ${t.wholes} wholes are shared equally.`},
  addsubfrac:{bank:addSubBank,title:'Build the result',instruction:'Make equal-sized parts, then combine or remove them.',placeholder:'e.g. 3/4',render:addSubModel,check:checkAddSub,hint:t=>`Use ${t.denominator} equal parts in each whole. ${t.a.n}/${t.a.d} becomes ${t.a.n*t.denominator/t.a.d}/${t.denominator}; ${t.b.n}/${t.b.d} becomes ${t.b.n*t.denominator/t.b.d}/${t.denominator}. ${t.op==='+'?'Add':'Subtract'} the numerators and keep the part size.`,explain:t=>`${label(t.a.n,t.a.d)} ${t.op} ${label(t.b.n,t.b.d)} = ${asFraction(t.answer)}. Equal-sized parts can be ${t.op==='+'?'combined':'removed'} without changing the whole.`},
  multfrac:{bank:multiplyBank,title:'Find a part of the quantity',instruction:'Make equal groups, then select the fractional part.',placeholder:'e.g. 6',inputmode:'decimal',render:multiplyModel,check:checkMultiply,hint:t=>`Divide ${t.whole} into ${t.d} equal groups: ${t.whole} ÷ ${t.d} = ${t.whole/t.d}. Then take ${t.n} of those groups.`,explain:t=>`${t.whole} ÷ ${t.d} × ${t.n} = ${asFraction(t.answer)}. That is ${t.n}/${t.d} of ${t.whole}.`}
};
export const mount=(root,activity,context)=>mountRound(root,activity,configurations[activity.id],context);

export const definitions = configurations;
