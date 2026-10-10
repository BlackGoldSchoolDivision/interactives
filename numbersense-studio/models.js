import {safeText} from './math.js';
export function numberLine(root,{start=0,min=-20,max=20,step=1},ctx) {
  const state={position:start};let pointer=null,locked=false;
  const interval=(max-min)/6;const tickStep=interval<=1?1:interval<=5?5:interval<=10?10:interval<=25?25:50;
  const ticks=[];for(let n=Math.ceil(min/tickStep)*tickStep;n<=max;n+=tickStep)ticks.push(n);
  const percent=n=>100*(n-min)/(max-min);
  root.innerHTML=`<div class="number-line"><div class="line-track" id="line-track" role="img" aria-label="Number line from ${min} to ${max}"><span class="line-base"></span>${ticks.map(n=>`<span class="line-tick" style="left:${percent(n)}%"><span>${n}</span></span>`).join('')}<span class="line-trace" id="line-trace"></span><span class="line-dot start" style="left:${percent(start)}%"></span><span class="line-dot current" id="line-current"></span></div><div class="line-values"><span>Start: <strong>${start}</strong></span><span>Position: <strong id="line-value">${start}</strong></span></div><label class="sr-only" for="line-slider">Choose a position on the number line</label><input class="model-range" id="line-slider" type="range" min="${min}" max="${max}" step="${step}" value="${start}"><div class="toolbar model-stepper"><button class="chip" id="line-minus" aria-label="Move one step left">−</button><span id="line-change" role="status"></span><button class="chip" id="line-plus" aria-label="Move one step right">+</button></div></div>`;
  const track=root.querySelector('#line-track'),slider=root.querySelector('#line-slider');
  function update(){slider.value=state.position;root.querySelector('#line-current').style.left=`${percent(state.position)}%`;root.querySelector('#line-trace').style.left=`${percent(Math.min(start,state.position))}%`;root.querySelector('#line-trace').style.width=`${Math.abs(percent(state.position)-percent(start))}%`;root.querySelector('#line-value').textContent=state.position;root.querySelector('#line-change').textContent=`Change: ${state.position-start>0?'+':''}${state.position-start}`;root.querySelector('#line-minus').disabled=state.position<=min;root.querySelector('#line-plus').disabled=state.position>=max;}
  const change=value=>{if(locked)return;state.position=Number(Math.max(min,Math.min(max,value)).toFixed(6));update();};
  slider.addEventListener('input',()=>change(Number(slider.value)),{signal:ctx.signal});
  root.querySelector('#line-minus').addEventListener('click',()=>change(state.position-step),{signal:ctx.signal});root.querySelector('#line-plus').addEventListener('click',()=>change(state.position+step),{signal:ctx.signal});
  const point=event=>{const rect=track.getBoundingClientRect();const n=min+(event.clientX-rect.left)/rect.width*(max-min);change(min+Math.round((n-min)/step)*step);};
  track.addEventListener('pointerdown',event=>{if(locked)return;pointer=event.pointerId;track.setPointerCapture(pointer);point(event);},{signal:ctx.signal});
  track.addEventListener('pointermove',event=>{if(pointer===event.pointerId)point(event);},{signal:ctx.signal});
  track.addEventListener('pointerup',()=>{pointer=null;},{signal:ctx.signal});track.addEventListener('pointercancel',()=>{pointer=null;},{signal:ctx.signal});update();return{state,lock:()=>{locked=true;}};
}
export const expressionBox = text => `<p class="expression">${safeText(text)}</p>`;
