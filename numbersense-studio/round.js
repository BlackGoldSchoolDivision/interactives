import {shuffle,safeText} from './math.js';

export function mountRound(root,activity,config,context={}) {
  const bank=()=>typeof config.bank==='function'?config.bank():config.bank;
  const tasks=shuffle(bank()).slice(0,8);
  let index=0, taskCleanup=()=>{}, currentAbort, solved=false, attempts=0, supported=false;
  const records=[];
  function showTask() {
    taskCleanup(); currentAbort?.abort(); currentAbort=new AbortController();
    const options={signal:currentAbort.signal};
    solved=false; attempts=0; supported=false;
    const task=tasks[index];
    root.innerHTML=`<section class="lesson-heading"><div><p class="eyebrow">${activity.name}</p><h1 tabindex="-1">${config.title}</h1><p class="subtitle">${config.instruction}</p></div><p class="lesson-count">${index+1} of ${tasks.length}</p></section><section class="workspace"><div id="task-model"></div><form class="answer-form" novalidate><label>Your answer<input name="answer" type="text" inputmode="${config.inputmode||'text'}" autocomplete="off" spellcheck="false" aria-describedby="answer-help" placeholder="${config.placeholder||'Your answer'}"></label><button class="button" type="submit">Check answer</button></form><p class="small" id="answer-help">${config.answerHelp||'You can use a fraction such as 3/4 or a number.'}</p><div id="feedback" role="status" aria-live="polite" aria-atomic="true"></div><div class="lesson-actions"><button class="button" id="next" type="button" hidden>Next challenge <span aria-hidden="true">→</span></button><button class="quiet" id="hint-toggle" type="button" aria-expanded="false" aria-controls="hint">Need a hint?</button></div><div class="hint" id="hint" hidden><h3>A useful way to think</h3><p>${safeText(config.hint(task))}</p></div></section>`;
    const form=root.querySelector('form'), input=form.elements.answer;
    const model=config.render(root.querySelector('#task-model'),task,{signal:currentAbort.signal,onSupport:()=>{supported=true;}})||{};
    taskCleanup=model.dispose||(()=>{});
    const feedback=root.querySelector('#feedback'), next=root.querySelector('#next');
    form.addEventListener('submit',event=>{
      event.preventDefault(); if(solved)return;
      if(!input.value.trim()){feedback.innerHTML=`<p class="feedback retry">${input.parentElement.hidden?'Choose an explanation before checking.':'Write an answer before checking.'}</p>`;if(!input.parentElement.hidden)input.focus();return;}
      const result=config.check(task,input.value,model.state);
      if(result.invalid){feedback.innerHTML=`<p class="feedback retry">${safeText(result.message)}</p>`;input.focus();return;}
      attempts++;
      if(!result.correct){feedback.innerHTML=`<p class="feedback retry">${safeText(result.message||'Try again. Use the model to explain the amount.')}</p>`;return;}
      solved=true;
      model.onCorrect?.(input.value);
      model.lock?.();
      root.querySelector('#task-model').querySelectorAll('button,input,select').forEach(control=>{control.disabled=true;});
      const record={activity:activity.id,firstTry:attempts===1&&!supported,supported:supported||attempts>1,attempts};
      records.push(record);context.record?.(record);
      feedback.innerHTML=`<p class="feedback">${safeText(config.explain(task,model.state))}</p>`;
      form.querySelector('button').disabled=true;input.disabled=true;next.hidden=false;
      next.textContent=index===tasks.length-1?'Finish round':'Next challenge →';
    },options);
    next.addEventListener('click',()=>{
      if(!solved)return;
      index++;
      if(index===tasks.length)showSummary();else{showTask();root.querySelector('h1').focus({preventScroll:true});}
    },options);
    root.querySelector('#hint-toggle').addEventListener('click',event=>{
      const hint=root.querySelector('#hint');hint.hidden=!hint.hidden;
      event.currentTarget.setAttribute('aria-expanded',String(!hint.hidden));supported=true;
    },options);
  }
  function showSummary() {
    taskCleanup();currentAbort?.abort();
    const first=records.filter(r=>r.firstTry).length;
    root.innerHTML=`<section class="page-intro"><p class="eyebrow">${activity.name}</p><h1 tabindex="-1">Round complete</h1><p class="subtitle">You explored ${tasks.length} challenges.</p></section><section class="workspace"><div class="round-results"><div class="result-stat"><strong>${records.length}</strong>Completed</div><div class="result-stat"><strong>${first}</strong>First try</div><div class="result-stat"><strong>${records.length-first}</strong>With support or retries</div></div><p>Models, hints and another attempt are all useful ways to learn.</p><div class="lesson-actions"><button class="button" id="again">Try another round</button><a class="button secondary" href="#/topic/${activity.topic}">More ${activity.topic==='fractions'?'fraction activities':'activities'}</a></div></section>`;
    const summaryAbort=new AbortController();currentAbort=summaryAbort;
    root.querySelector('#again').addEventListener('click',()=>{
      tasks.splice(0,tasks.length,...shuffle(bank()).slice(0,8));records.length=0;index=0;showTask();root.querySelector('h1').focus({preventScroll:true});
    },{signal:summaryAbort.signal});
    context.complete?.(activity.id);root.querySelector('h1').focus({preventScroll:true});
  }
  showTask();
  return ()=>{taskCleanup();currentAbort?.abort();};
}
