'use strict';
const icons = {sound:'<svg viewBox="0 0 28 28" aria-hidden="true"><path fill="currentColor" d="M3 11h4l6-5v16l-6-5H3z"/><path d="M17 10q4 4 0 8m4-12q8 8 0 16"/></svg>'};
const pictures = {s1:0,s2:1,s3:2,s4:2,s5:6,s6:3,s7:4,p1:6,p2:0,p3:3,p4:6,p5:4,p6:7,p7:7,r1:4,r2:7,r3:8,r4:3,r5:8,r6:9,r7:10,r8:11,r9:3};
let mistakes = new Set();
let currentAudio, stopTimer, audioToken=0;
function stopSpeech(){
 audioToken++;
 clearTimeout(stopTimer);
 if(currentAudio) currentAudio.pause();
 if('speechSynthesis' in window) speechSynthesis.cancel();
}
function readPuzzle(answer){
 stopSpeech();
 const token=audioToken, r=PUZZLES[route.id][gameState().round];
 const text=answer ? r.word+'. '+r.explain : r.clue+'. Choose the missing '+r.tiles[r.gap][0].toLowerCase()+'.';
 function clip(){
  if(token!==audioToken)return;
  const span=CLIPS[route.id+'-'+gameState().round+'-'+(answer?'a':'q')];
  if(!span)return;
  const player=currentAudio || (currentAudio=new Audio(window.MM_AUDIO || 'assets/puzzle-audio.mp3'));
  player.preload='auto';
  const begin=()=>{
   if(token!==audioToken)return;
   player.currentTime=span[0];
   player.play().then(()=>{if(token===audioToken)stopTimer=setTimeout(()=>player.pause(),(span[1]-span[0])*1000)}).catch(()=>say('Audio could not play on this device.'));
   player.ontimeupdate=()=>{if(token===audioToken && player.currentTime>=span[1])player.pause()};
  };
  if(player.readyState>0)begin();else player.addEventListener('loadedmetadata',begin,{once:true});
 }
 const voice='speechSynthesis' in window && speechSynthesis.getVoices().find(v=>/^en([-_]|$)/i.test(v.lang));
 if(voice && 'SpeechSynthesisUtterance' in window){
  const speech=new SpeechSynthesisUtterance(text);speech.voice=voice;speech.rate=.92;
  speech.onerror=e=>{if(!['interrupted','canceled'].includes(e.error))clip()};speechSynthesis.speak(speech);
 }else clip();
}
function gameState(){
 const s=lessonState();
 if(!s.game || !Number.isInteger(s.game.round) || s.game.round<0 || s.game.round>4)s.game={round:0,solved:false,done:false};
 return s.game;
}
function drawGame(){
 const g=gameState(), rounds=PUZZLES[route.id],l=active();
 if(g.done){
  main.innerHTML='<section class="work"><div class="complete"><p>Five puzzles complete</p><h1>'+esc(l.title)+'</h1><div class="familychips" style="justify-content:center">'+rounds.map(r=>chip(r.word)).join('')+'</div><div class="wrap"><button class="solid" data-act="towork">Open workbook</button><button class="soft" data-act="restart">Play again</button><button class="soft" data-act="menu">Choose a lesson</button></div></div></section>';return;
 }
 const r=rounds[g.round], target=r.tiles[r.gap], role=target[0],plate=pictures[l.id];
 const art=l.id==='r3' && g.round===0?'<div class="art first" aria-hidden="true"></div>':'<div class="art plate" aria-hidden="true" style="background-position:'+((plate%4)*100/3)+'% '+(Math.floor(plate/4)*50)+'%"></div>';
 const piece=(t,i)=>i===r.gap && !g.solved ? '<div class="piece blank" aria-label="Missing '+esc(t[0])+'"><span class="question" aria-hidden="true">?</span></div>' : '<div class="piece '+t[0].toLowerCase()+'"><span class="role">'+esc(t[0])+'</span><strong class="form '+(t[1].length>4?'wide':'')+'">'+esc(t[1])+'</strong><span class="gloss">'+esc(t[2])+'</span></div>';
 const display=v=>role==='Prefix'?v+'-':role==='Suffix'?'-'+v:v;
 const clue=r.clue==='Cannot be seen'?'Cannot be<br>seen':esc(r.clue);
 const choices=r.choices.map((v,i)=>'<button class="choice '+(v.length>5?'long ':'')+(mistakes.has(i)?'miss ':'')+(g.solved&&v===target[1]?'selected':'')+'" data-choice="'+i+'" '+(g.solved||mistakes.has(i)?'disabled':'')+'>'+esc(display(v))+'</button>').join('');
 main.innerHTML='<section class="board"><div class="clue '+(r.clue.length>23?'long':'')+'"><div class="clue-copy"><div class="kicker">Meaning clue</div><div class="clue-line"><h1>'+clue+'</h1><button class="hear" data-act="listen" aria-label="Hear '+(g.solved?'the word and explanation':'the clue')+'">'+icons.sound+'</button></div></div>'+art+'</div><h2 class="task">'+(g.solved?'You built '+esc(r.word)+'!':'Choose the missing '+role.toLowerCase()+'.')+'</h2><div class="equation">'+r.tiles.map(piece).join('<span class="plus" aria-hidden="true">+</span>')+'</div>'+(g.solved?'<div class="feedbackbox"><p>'+esc(r.explain)+'</p><button class="solid" data-act="next">'+(g.round===4?'Finish lesson':'Next puzzle')+'</button></div>':'<div class="choices">'+choices+'</div>')+(!g.solved&&mistakes.size?'<p class="hint">Try again. Look for a '+role.toLowerCase()+' meaning “'+esc(target[2])+'”.</p>':'')+'<div class="track" aria-label="Puzzle '+(g.round+1)+' of 5">'+rounds.map((_,i)=>'<i aria-hidden="true" class="'+(i<=g.round?'on':'')+'"></i>').join('')+'<span>'+(g.round+1)+' of 5</span></div></section>';
}
function chooseTile(i){
 const g=gameState(),r=PUZZLES[route.id][g.round];if(g.done||g.solved||mistakes.has(i))return;
 if(r.choices[i]!==r.tiles[r.gap][1]){
  mistakes.add(i);drawGame();say('Try again. Look for the meaning '+r.tiles[r.gap][2]+'.');
  main.querySelector('.choice:not([disabled])')?.focus({preventScroll:true});return;
 }
 g.solved=true;persist();drawGame();say('You built '+r.word+'. '+r.explain);main.querySelector('[data-act=next]').focus({preventScroll:true});readPuzzle(true);
}
function nextPuzzle(){const g=gameState();if(!g.solved||g.done)return;stopSpeech();if(g.round===4)g.done=true;else{g.round++;g.solved=false}mistakes.clear();persist();drawGame();main.focus({preventScroll:true});}
