import {createQuestion,isCorrect,positions,roundCount} from './logic.js?v=phase1-1';

const $=id=>document.getElementById(id);
const stage=$('scene'), tip=$('scene-tip'), pad=$('number-pad'), feedback=$('feedback');
const next=$('next'), hint=$('hint'), retry=$('retry');
const range=$('number-range');
let mode='count',limit=10,round=1,question=null,solved=false,tries=0,firstTry=0;
let tapped=[];

const modeName={count:'Count',compare:'Compare',story:'Sea stories',mix:'Ocean mix'};
const sprite=kind=>'<svg viewBox="0 0 200 150" aria-hidden="true" focusable="false"><use href="#animal-'+kind+'"></use></svg>';
const escapeText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function currentMode(){
  if(mode!=='mix')return mode;
  return ['count','compare','story','count','story'][(round-1)%roundCount];
}
function setFeedback(text='',kind=''){
  feedback.textContent=text;
  feedback.dataset.kind=kind;
}
function updateProgress(){
  $('level-label').textContent=mode==='mix'?'Ocean mix · Grade 1':modeName[mode]+' · Grade 1';
  $('progress-text').textContent=round+' / '+roundCount;
  $('progress-pips').innerHTML=Array.from({length:roundCount},(_,i)=>'<i class="'+(i<round-1?'done':i===round-1?'current':'')+'"></i>').join('');
}
function countStage(q){
  if(q.count===0){
    return '<div class="empty-scene">'+sprite('shell')+'<span>Nothing swimming here!</span><small>Zero means none.</small></div>';
  }
  const points=positions(q.count);
  const size=q.count>15?80:q.count>10?91:q.count>6?103:122;
  return points.map(({x,y,tilt},i)=>'<button type="button" class="animal" data-count-id="'+i+'" style="left:'+x+'%;top:'+y+'%;--tilt:'+tilt+'deg;--animal-size:'+size+'px" aria-label="Tap '+q.animal+' to count">'+sprite(q.animal)+'<span class="count-bubble" aria-hidden="true"></span></button>').join('');
}
function groupAnimals(kind,n){
  return Array.from({length:n},()=>sprite(kind)).join('');
}
function compareStage(q){
  return '<div class="scene-pair">'+['A','B'].map(group=>
    '<button class="group-choice" type="button" data-group="'+group+'" aria-label="Select group '+group+'">'+
      '<span class="group-name">GROUP '+group+'</span>'+
      '<span class="group-animals">'+groupAnimals(q.animal,group==='A'?q.a:q.b)+'</span>'+
    '</button>').join('')+'</div>';
}
function storyStage(q){
  return '<div class="story-groups '+(q.op==='−'?'story-subtract':'')+'">'+
      '<div class="story-group"><span class="group-name">'+(q.op==='+'?'SWIMMING':'STARTED WITH')+'</span><div class="group-animals">'+groupAnimals(q.animal,q.a)+'</div></div>'+
      '<span class="story-symbol" aria-hidden="true">'+q.op+'</span>'+
      '<div class="story-group"><span class="group-name">'+(q.op==='+'?'SWIM IN':'SWIM AWAY')+'</span><div class="group-animals">'+groupAnimals(q.animal,q.b)+'</div></div>'+
    '</div>';
}
function renderScene(){
  stage.classList.toggle('dense',question.type==='count'&&question.count>10);
  if(question.type==='count')stage.innerHTML=countStage(question);
  if(question.type==='compare')stage.innerHTML=compareStage(question);
  if(question.type==='story')stage.innerHTML=storyStage(question);
  tip.textContent=question.type==='count'?'Tap each creature to count it.':question.type==='compare'?'Compare both schools. Tap a group or choose below.':'Look at the groups. Count on or count back!';
  // Count each animal only once; tapping again deselects it.
  stage.querySelectorAll('[data-count-id]').forEach(animal=>animal.addEventListener('click',()=>{
    if(solved)return;
    const id=Number(animal.dataset.countId);
    tapped=tapped.includes(id)?tapped.filter(n=>n!==id):[...tapped,id];
    stage.querySelectorAll('[data-count-id]').forEach(el=>{
      const position=tapped.indexOf(Number(el.dataset.countId));
      el.classList.toggle('counted',position>=0);
      el.querySelector('.count-bubble').textContent=position<0?'':String(position+1);
      el.setAttribute('aria-label',position<0?'Count this creature':'Counted '+(position+1)+'; tap to uncount');
    });
    tip.textContent=tapped.length?'You counted '+tapped.length+(tapped.length===1?' creature.':' creatures.'):'Tap each creature to count it.';
  }));
  stage.querySelectorAll('[data-group]').forEach(btn=>btn.addEventListener('click',()=>submit(btn.dataset.group,btn)));
}
function renderChoices(){
  const choices=question.choices;
  const group=question.type==='compare';
  pad.className='answer-pad '+(group?'group-answers':'num-answers');
  pad.innerHTML=choices.map(entry=>{
    const value=typeof entry==='number'?entry:entry.value;
    const label=typeof entry==='number'?String(entry):entry.label;
    return '<button class="answer-btn '+(group?'word-answer':'')+'" type="button" data-answer="'+escapeText(value)+'">'+escapeText(label)+'</button>';
  }).join('');
}
function renderQuestion(){
  solved=false;tries=0;tapped=[];
  const q=createQuestion(currentMode(),limit);
  question=q;
  $('question-text').textContent=q.prompt;
  $('question-tag').textContent=q.tag;
  renderScene();renderChoices();updateProgress();
  next.disabled=true;next.textContent='Next →';
  hint.disabled=false;retry.disabled=false;
  setFeedback('');
}
function submit(value,source){
  if(solved)return;
  if(isCorrect(question,value)){
    solved=true;
    if(tries===0)firstTry++;
    setFeedback(tries===0?'Brilliant! You got it first try! ★':'That’s it! Great thinking! ★','success');
    next.disabled=false;
    next.textContent=round===roundCount?'Play again ↻':'Next →';
    hint.disabled=true;
    retry.disabled=true;
    pad.querySelectorAll('[data-answer]').forEach(btn=>{
      btn.disabled=true;
      if(String(btn.dataset.answer)===String(value))btn.classList.add('correct');
    });
    if(source?.classList)source.classList.add('correct');
    tip.textContent=round===roundCount?'Reef adventure complete! You solved '+firstTry+' first-try questions.':'You did it! Ready for the next one?';
  }else{
    tries++;
    setFeedback(tries===1?'Not quite. Try counting carefully!':'Keep trying! You can ask for a hint.','retry');
    if(source?.classList)source.classList.add('wrong');
  }
}
pad.addEventListener('click',e=>{
  const button=e.target.closest('[data-answer]');
  if(!button)return;
  const value=question.type==='compare'?button.dataset.answer:Number(button.dataset.answer);
  submit(value,button);
});
function newSession(){
  round=1;firstTry=0;
  renderQuestion();
}
next.addEventListener('click',()=>{
  if(!solved)return;
  if(round===roundCount)newSession();
  else {round++;renderQuestion();}
});
retry.addEventListener('click',()=>{
  if(solved)return;
  tries++; // A restart is a form of support, not a first-try response.
  tapped=[];
  renderScene();
  pad.querySelectorAll('button').forEach(btn=>btn.classList.remove('wrong'));
  setFeedback('Try that same challenge again. You can do it!','hint');
});
hint.addEventListener('click',()=>{
  if(solved)return;
  tries++;
  setFeedback(question.hint,'hint');
});
$('hear').addEventListener('click',()=>{
  if(!('speechSynthesis' in window)){
    setFeedback('Audio is not available on this browser. You can read the question above.','hint');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(question.speech);
  utterance.rate=.86;utterance.pitch=1.08;
  window.speechSynthesis.speak(utterance);
});
document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{
  mode=btn.dataset.mode;
  document.querySelectorAll('[data-mode]').forEach(option=>option.setAttribute('aria-pressed',String(option===btn)));
  newSession();
}));
range.addEventListener('change',()=>{
  limit=Number(range.value)===20?20:10;
  newSession();
});
window.addEventListener('pagehide',()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel();});
newSession();
