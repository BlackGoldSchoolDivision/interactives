'use strict';
(() => {
const $=id=>document.getElementById(id);
const state={a:-3,b:5,op:'+',tab:'explore',score:0,round:0,answered:false,assisted:false,question:null,difficulty:'starter',practiceOp:'mix'};
const neg=n=>n<0?'−'+Math.abs(n):String(n);
const formatTerm=n=>n<0?'('+neg(n)+')':String(n);
const niceOp=op=>op==='-'?'−':op;
const cap=n=>Math.max(-12,Math.min(12,Number.isFinite(n)?Math.trunc(n):0));
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
function calculate(a,op,b){
 if(op==='+')return {value:a+b,display:neg(a+b),exact:true};
 if(op==='-')return {value:a-b,display:neg(a-b),exact:true};
 if(op==='×')return {value:a*b,display:neg(a*b),exact:true};
 if(b===0)return {value:null,display:'Undefined',exact:false,detail:'You cannot divide by zero.'};
 let value=a/b;
 if(Number.isInteger(value))return {value,display:neg(value),exact:true};
 const common=gcd(a,b),top=a/common,den=b/common;
 const numer=den<0?-top:top,denom=Math.abs(den);
 return {value,display:neg(numer)+'/'+denom,exact:false,detail:'≈ '+(Math.round(value*100)/100).toLocaleString('en-CA',{maximumFractionDigits:2})};
}
function chip(sign,cls=''){
 return '<span class="chip '+(sign>0?'pos':'neg')+(cls?' '+cls:'')+'" aria-hidden="true">'+(sign>0?'+1':'−1')+'</span>';
}
function chips(sign,count,cls=''){
 if(!count)return '<span class="zero-label">0</span>';
 // Controls limit the model to small numbers.
 return Array.from({length:Math.min(Math.max(0,Math.floor(count)),150)},()=>chip(sign,cls)).join('');
}
function tile(title,content,extra=''){
 return '<div class="chip-tile'+(extra?' '+extra:'')+'"><div class="chip-tile-title">'+title+'</div><div class="chips">'+content+'</div></div>';
}
function signedChips(n){
 return n===0?'<span class="zero-label">0</span>':chips(Math.sign(n),Math.abs(n));
}
function modelFor(a,op,b){
 const outcome=calculate(a,op,b),res=outcome.value;
 if(op==='+'){
  const pos=Math.max(a,0)+Math.max(b,0),negative=Math.max(-a,0)+Math.max(-b,0);
  const pairs=Math.min(pos,negative),rPos=pos-pairs,rNeg=negative-pairs;
  const renderedPairs=Array.from({length:pairs},()=>'<span class="zero-pair">'+chip(-1,'paired')+chip(1,'paired')+'</span>').join('');
  return {html:'<div class="chip-layout simple-chips">'+tile('Start: '+neg(a),signedChips(a))+tile('Add: '+neg(b),signedChips(b))+'</div>'+
  '<div class="chip-groups" style="margin:12px 0">'+(pairs?renderedPairs:'<span class="zero-label">No zero pairs</span>')+
  '</div><div class="chip-note">'+(pairs?pairs+' zero pair'+(pairs===1?'':'s')+' cancel':'Put the groups together')+'</div>'+
  '<div class="chip-groups" style="margin-top:10px">'+(rPos?chips(1,rPos):rNeg?chips(-1,rNeg):'<span class="zero-label">0</span>')+'</div>',
  explanation:'Combine '+neg(a)+' and '+neg(b)+'. Each positive and negative chip cancel to zero. '+(pairs?pairs+' pair'+(pairs===1?'':'s')+' cancel. ':'')+'The remaining chips are '+neg(res)+'.'};
 }
 if(op==='-'){
  const target=b>0?1:b<0?-1:0;
  const available=target>0?Math.max(a,0):target<0?Math.max(-a,0):0;
  const extra=b===0?0:Math.max(0,Math.abs(b)-available);
  const added=extra?'<div class="chip-groups">'+Array.from({length:extra},()=>'<span class="zero-pair">'+chip(-1,'paired')+chip(1,'paired')+'</span>').join('')+'</div>':'<div class="chip-note">No zero pairs needed</div>';
  return {html:'<div class="chip-layout">'+tile('Start: '+neg(a),signedChips(a))+
  tile('Add '+extra+' zero pair'+(extra===1?'':'s'),added,'wide')+
  tile('Take away: '+neg(b),signedChips(b))+
  tile('Left: '+neg(res),signedChips(res))+'</div>',
  explanation:'Start with '+neg(a)+'. '+(extra?'Add '+extra+' positive–negative zero pair'+(extra===1?'':'s')+' without changing the value. ':'No extra zero pairs are needed. ')+
  'Remove '+Math.abs(b)+' '+(b>0?'positive ':b<0?'negative ':'')+'chip'+(Math.abs(b)===1?'':'s')+'. You have '+neg(res)+' left.'};
 }
 if(op==='×'){
  const groups=Math.abs(b),count=Math.abs(a),negative=(a<0)!==(b<0);
  if(groups===0||count===0)return {html:'<div class="chip-groups"><span class="zero-label">0</span></div>',explanation:'Any integer multiplied by zero equals zero.'};
  // A negative number of groups means taking the opposite of those groups.
  let html='<div class="multiplication-layout">'+Array.from({length:groups},()=>'<div class="chip-group"><small>'+neg(a)+'</small><div class="chips">'+chips(Math.sign(a),count)+'</div></div>').join('')+'</div>'+
  '<div class="chip-note" style="margin-top:9px">'+groups+' group'+(groups===1?'':'s')+' of '+neg(a)+(b<0?' — then take the opposite':'')+
  ' = <b>'+neg(res)+'</b></div>';
  return {html,explanation:(b<0?'The negative multiplier means the opposite of ':'Use ')+groups+' group'+(groups===1?'':'s')+' of '+neg(a)+'. '+(negative?'The result is negative. ':'The result is positive. ')+'Total: '+neg(res)+'.'};
 }
 if(b===0)return {html:'<div class="model-warning">Division by zero is undefined. You cannot make zero groups and share a quantity among them.</div>',explanation:'Division by zero has no defined result.'};
 if(a===0)return {html:'<div class="chip-groups"><span class="zero-label">0</span></div>',explanation:'Zero divided by any nonzero integer is zero.'};
 const count=Math.abs(b),total=Math.abs(a),perGroup=Math.floor(total/count),remainder=total%count;
 const cards=Array.from({length:Math.min(count,12)},()=>'<div class="chip-group"><small>One group</small><div class="chips">'+(perGroup?chips(Math.sign(a),perGroup):'<span class="zero-label">0</span>')+'</div></div>').join('');
 const warning=remainder?'<div class="chip-note">Not an equal whole-number split. '+remainder+' chip'+(remainder===1?'':'s')+' left over.</div>':'<div class="chip-note">'+count+' equal groups • quotient '+neg(res)+'</div>';
 const signNote=b<0?'<p class="chip-explain">Dividing by a negative means taking the opposite of each group’s value.</p>':'';
 return {html:'<div class="division-layout">'+cards+'</div>'+(remainder?'<div class="chips" style="margin-top:8px">'+chips(Math.sign(a),remainder)+'</div>':'')+warning+signNote,
 explanation:'Share the '+total+' '+(a<0?'negative':'positive')+' chips into '+count+' equal group'+(count===1?'':'s')+'. '+(remainder?'The result is a fraction, '+outcome.display+'. ':'Each group has '+perGroup+' chips. ')+(b<0?'Take the opposite sign because the divisor is negative. ':'')+'Result: '+outcome.display+'.'};
}
function prettyDetail(a,op,b,result){
 if(op==='+'||op==='-'){
  const shift=op==='+'?b:-b;
  return 'Start at '+neg(a)+' and move '+Math.abs(shift)+' '+(shift>=0?'right':'left')+' to '+neg(result.value)+'.';
 }
 if(op==='×')return result.value===0?'The product is zero, so the endpoint stays at zero.':'The product '+neg(result.value)+' is '+(result.value<0?'to the left':'to the right')+' of zero.';
 if(result.value===null)return 'Division by zero is undefined.';
 return 'The quotient is '+(result.exact?neg(result.value):result.display)+' on the number line.';
}
function tickStep(span){
 const desired=Math.max(span/11,.3),mag=Math.pow(10,Math.floor(Math.log10(desired)));
 return [1,2,5,10,20].map(m=>m*mag).find(v=>v>=desired)||20*mag;
}
function numberLine(a,op,b,result){
 if(result.value===null)return '<p class="model-warning">No number-line endpoint exists for division by zero.</p>';
 const start=(op==='+'||op==='-')?a:0,end=result.value;
 let min=Math.min(0,start,end),max=Math.max(0,start,end);
 const padding=Math.max(2,(max-min)*.12);
 min-=padding;max+=padding;
 const step=tickStep(max-min);
 min=Math.floor(min/step)*step;max=Math.ceil(max/step)*step;
 if(max<=min)max=min+step*10;
 const left=55,right=1045,y=141,width=right-left,scale=width/(max-min),x=v=>left+(v-min)*scale;
 let ticks='';
 for(let k=Math.ceil((min-1e-10)/step);k<=Math.floor((max+1e-10)/step);k++){
  const v=Number((k*step).toPrecision(8)),tx=x(v);
  ticks+='<line x1="'+tx+'" y1="'+(v===0?126:132)+'" x2="'+tx+'" y2="154" stroke="'+(v===0?'#163b5e':'#8294a2')+'" stroke-width="'+(v===0?3:2)+'"/>'+
   '<text class="line-tick" x="'+tx+'" y="188" text-anchor="middle">'+neg(v)+'</text>';
 }
 const sx=x(start),ex=x(end),diff=Math.abs(ex-sx),arcH=Math.min(93,28+diff*.24),cy=y-arcH;
 const dot=(xx,label,final)=>'<circle cx="'+xx+'" cy="'+y+'" r="9" fill="'+(final?'#087a65':'#347dd1')+'"/>'+
  '<text class="line-point-label'+(final?' final':'')+'" x="'+xx+'" y="'+(final?125:110)+'" text-anchor="middle">'+label+'</text>';
 const motion=diff>.01?'<path d="M '+sx+' '+y+' Q '+((sx+ex)/2)+' '+(y-2*arcH)+' '+ex+' '+y+'" stroke="#2876ce" stroke-width="5" fill="none" marker-end="url(#arrow-line)" stroke-linecap="round"/>':'';
 return '<svg viewBox="0 0 1100 215" role="img" aria-label="Number line from '+neg(min)+' to '+neg(max)+'. Start at '+neg(start)+', end at '+neg(end)+'.">'+
  '<defs><marker id="arrow-line" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M 0 0 L 9 5 L 0 10 Z" fill="#2876ce"/></marker></defs>'+
  '<line x1="'+(left-15)+'" y1="'+y+'" x2="'+(right+18)+'" y2="'+y+'" stroke="#172e45" stroke-width="3"/>'+
  '<path d="M '+(left-15)+' '+y+' l 13 -7 m -13 7 l 13 7 M '+(right+18)+' '+y+' l -13 -7 m 13 7 l -13 7" fill="none" stroke="#172e45" stroke-width="3"/>'+ticks+motion+
  (Math.abs(sx-ex)<1?dot(ex,neg(end),true):dot(sx,neg(start),false)+dot(ex,neg(end),true))+'</svg>';
}
function setOperation(op){if(!['+','-','×','÷'].includes(op))return;state.op=op;renderExplore()}
function setNumber(which,value){state[which]=cap(value);renderExplore()}
function changeNumber(which,delta){setNumber(which,state[which]+delta)}
function randomExample(){
 const examples=[[-3,'+',5],[4,'-',-2],[-4,'+',-3],[-3,'×',2],[-3,'×',-4],[-8,'÷',2],[-8,'÷',-2],[2,'-',7],[-5,'-',-3],[0,'-',-5],[12,'÷',-3]];
 const ex=examples[Math.floor(Math.random()*examples.length)];[state.a,state.op,state.b]=ex;renderExplore();
}
function updateExamples(){
 document.querySelectorAll('[data-example]').forEach(btn=>btn.onclick=()=>{
 const [a,op,b]=btn.dataset.example.split('|');state.a=Number(a);state.op=op;state.b=Number(b);renderExplore();
 });
}
function renderExplore(){
 $('input-a').value=String(state.a);$('input-b').value=String(state.b);
 document.querySelectorAll('[data-op]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.op===state.op)));
 const result=calculate(state.a,state.op,state.b);
 const cls=n=>n<0?'negative':n>0?'positive':'sign';
 $('equation').innerHTML='<span class="'+cls(state.a)+'">'+neg(state.a)+'</span>'+
 '<span class="sign">'+niceOp(state.op)+'</span>'+
 '<span class="'+cls(state.b)+'">'+formatTerm(state.b)+'</span>'+
 '<span class="equals">=</span><span class="result">'+result.display+'</span>'+
 (result.detail?'<span class="result-detail">'+result.detail+'</span>':'');
 const visual=modelFor(state.a,state.op,state.b);
 $('chip-content').innerHTML=visual.html;
 $('line-content').innerHTML=numberLine(state.a,state.op,state.b,result);
 $('line-caption').textContent=prettyDetail(state.a,state.op,state.b,result);
 $('model-description').textContent=visual.explanation;
 $('steps-explanation').innerHTML='<p>'+visual.explanation+'</p><p>'+prettyDetail(state.a,state.op,state.b,result)+'</p>';
}
function setTab(tab){
 if(!['explore','practice','rules'].includes(tab))return;
 state.tab=tab;
 ['explore','practice','rules'].forEach(t=>{
  $('view-'+t).hidden=tab!==t;
  $('tab-'+t).setAttribute('aria-selected',String(tab===t));
 });
 if(tab==='practice'&&!state.question)startQuestion();
}
function practiceProblem(){
 const limit=state.difficulty==='challenge'?12:6,random=()=>Math.floor(Math.random()*(limit*2+1))-limit;
 const op=state.practiceOp==='mix'?['+','-','×','÷'][Math.floor(Math.random()*4)]:state.practiceOp;
 let a=random(),b=random();
 if(op==='÷'){
  b=b===0?2:b;
  const value=Math.floor(Math.random()*(limit*2+1))-limit;
  a=value*b;
 }else if(op==='×'&&state.difficulty==='challenge'){a=Math.max(-9,Math.min(9,a));b=Math.max(-9,Math.min(9,b));}
 return {a,b,op,result:calculate(a,op,b)};
}
function startQuestion(){
 state.question=practiceProblem();state.round++;state.answered=false;state.assisted=false;
 $('practice-problem').textContent=neg(state.question.a)+' '+niceOp(state.question.op)+' '+formatTerm(state.question.b)+' = ?';
 $('practice-count').textContent='Question '+state.round+' · '+state.score+' points';
 $('practice-answer').value='';$('practice-answer').disabled=false;
 $('practice-feedback').hidden=true;$('practice-feedback').className='feedback';
 $('practice-hint').hidden=true;
 $('practice-check').hidden=false;$('practice-next').hidden=true;$('practice-model').innerHTML='';
}
function showPracticeModel(){
 const q=state.question;if(!q)return;
 state.assisted=true;$('practice-hint').hidden=false;
 $('practice-model').innerHTML=modelFor(q.a,q.op,q.b).html;
 $('practice-line').innerHTML=numberLine(q.a,q.op,q.b,q.result);
}
function checkPractice(){
 if(state.answered||!state.question)return;
 const raw=$('practice-answer').value.trim();
 if(!raw){setPracticeFeedback('Enter an answer first.','bad');return}
 const q=state.question,parsed=Number(raw);
 if(!Number.isFinite(parsed)){setPracticeFeedback('Enter a number.','bad');return}
 if(Math.abs(parsed-q.result.value)<1e-9){
  state.answered=true;
  state.score+=state.assisted?5:10;
  setPracticeFeedback('Correct! '+(state.assisted?'5':'10')+' points.','good');
  $('practice-answer').disabled=true;
  $('practice-check').hidden=true;
  $('practice-next').hidden=false;
  $('practice-count').textContent='Question '+state.round+' · '+state.score+' points';
 }else{
  state.assisted=true;setPracticeFeedback('Not quite. Check your signs and try again.','bad');
 }
}
function setPracticeFeedback(message,type){
 $('practice-feedback').hidden=false;$('practice-feedback').className='feedback '+type;$('practice-feedback').textContent=message;
}
function init(){
 $('a-dec').onclick=()=>changeNumber('a',-1);$('a-inc').onclick=()=>changeNumber('a',1);
 $('b-dec').onclick=()=>changeNumber('b',-1);$('b-inc').onclick=()=>changeNumber('b',1);
 $('input-a').addEventListener('change',e=>setNumber('a',Number(e.target.value)));
 $('input-b').addEventListener('change',e=>setNumber('b',Number(e.target.value)));
 document.querySelectorAll('[data-op]').forEach(btn=>btn.onclick=()=>setOperation(btn.dataset.op));
 ['explore','practice','rules'].forEach(tab=>$('tab-'+tab).onclick=()=>setTab(tab));
 $('another').onclick=randomExample;
 $('examples-toggle').onclick=()=>{$('examples').hidden=!$('examples').hidden};
 $('line-toggle').onclick=()=>{
  const panel=$('line-panel'),button=$('line-toggle');
  panel.hidden=!panel.hidden;
  button.setAttribute('aria-expanded',String(!panel.hidden));
  button.textContent=panel.hidden?'Show on number line →':'Hide number line ↑';
 };
 $('practice-op').addEventListener('change',e=>{state.practiceOp=e.target.value;state.round=0;state.score=0;startQuestion()});
 $('practice-level').addEventListener('change',e=>{state.difficulty=e.target.value;state.round=0;state.score=0;startQuestion()});
 $('practice-answer').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();state.answered?startQuestion():checkPractice()}});
 $('practice-check').onclick=checkPractice;$('practice-next').onclick=startQuestion;$('practice-show').onclick=showPracticeModel;
 updateExamples();renderExplore();setTab('explore');
}
window.IntegerExplorerTest={calculate,modelFor,numberLine,tickStep,practiceProblem,state};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();