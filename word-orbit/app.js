(function(){
  'use strict';
  const M=window.WordOrbit,$=id=>document.getElementById(id);
  let state=M.create(),wave=0,waveTime=0,transition=null,locked=false,manualPause=false,hiddenPause=document.hidden,sound=true,drag=null,suppressClick=0,previousFrame=0,audio;
  const dialogs=[...document.querySelectorAll('dialog')];
  const paused=()=>manualPause||hiddenPause||dialogs.some(d=>d.open);
  const nodes={score:$('score'),word:$('word'),stage:$('stage'),core:$('core'),wrap:$('coreWrap'),bubbles:$('bubbles'),collection:$('collection')};
  function speak(text){
    if(!sound||!('speechSynthesis' in window))return;
    try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-CA';u.rate=.86;window.speechSynthesis.speak(u);}catch(_){}
  }
  function tone(good){
    if(!sound)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;audio??=new C();if(audio.state==='suspended')audio.resume();const t=audio.currentTime;
      [good?523:190,good?784:150].forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t+i*.08);g.gain.linearRampToValueAtTime(.055,t+i*.08+.015);g.gain.exponentialRampToValueAtTime(.001,t+i*.08+.22);o.connect(g).connect(audio.destination);o.start(t+i*.08);o.stop(t+i*.08+.24);});
    }catch(_){}
  }
  function message(title,meaning,points='',type=''){$('message').textContent=title;$('meaning').textContent=meaning;$('points').textContent=points||'✦';$('feedback').className='feedback '+type;}
  function fitWord(){
    const width=nodes.core.clientWidth*.84;let size=Math.min(82,nodes.core.clientWidth*.28);
    nodes.word.style.setProperty('--word-size',size+'px');
    while(nodes.word.scrollWidth>width&&size>17){size-=1;nodes.word.style.setProperty('--word-size',size+'px');}
  }
  function renderWord(){
    const d=M.deck(state),n=M.node(state),found=state.found[state.family];
    nodes.score.textContent=state.score;nodes.word.textContent=n.word;
    nodes.core.setAttribute('aria-label','Hear '+n.word+': '+n.meaning);nodes.core.dataset.word=n.word;nodes.stage.dataset.base=d.base;nodes.stage.dataset.found=found.size;
    $('coreLabel').textContent=n.word===d.base?'BASE WORD':'KEEP IT GROWING';
    $('parts').replaceChildren();n.parts.forEach((part,i)=>{if(i)$('parts').append(document.createTextNode(' + '));const b=document.createElement('b');b.textContent=part;$('parts').append(b);});
    if(n.parts.length===1)$('parts').textContent='tap to hear';
    $('baseName').textContent=d.base;$('backName').textContent=d.base;$('count').textContent=found.size+' / '+d.words.length;$('familyCount').textContent=found.size;
    $('backBase').hidden=n.word===d.base;fitWord();
  }
  function renderCollection(){
    const found=state.found[state.family],d=M.deck(state);nodes.collection.replaceChildren();
    if(!found.size){const p=document.createElement('span');p.className='empty-collection';p.textContent='Your discoveries land here…';nodes.collection.append(p);}
    for(const word of found){const b=document.createElement('button');b.className='word-chip';b.textContent=word;b.dataset.word=word;b.setAttribute('aria-label','Build from '+word);b.setAttribute('aria-current',String(state.current===word));b.title=d.byWord.get(word).meaning;b.addEventListener('click',()=>{
      if(paused())return;cancelTransition();M.resume(state,word);wave=0;waveTime=0;renderWord();renderBubbles();markCurrent();const n=M.node(state);message(n.word,n.meaning+(n.note?' · '+n.note:''),'↗','neutral');speak(n.word);nodes.core.focus({preventScroll:true});
    });nodes.collection.append(b);}
    nodes.collection.scrollLeft=nodes.collection.scrollWidth;
  }
  function markCurrent(){for(const b of nodes.collection.querySelectorAll('button'))b.setAttribute('aria-current',String(b.dataset.word===state.current));}
  function renderBubbles(){
    if(drag)return;
    const focused=nodes.bubbles.contains(document.activeElement),parts=M.candidates(state,wave);
    const slots=parts.length===3?[0,1,5]:parts.length===4?[0,1,4,5]:parts.length===5?[0,1,2,3,5]:[0,1,2,3,4,5];
    // Prefixes start on the left, while endings can drift around either side.
    const ordered=parts.filter(p=>p.side==='prefix').concat(parts.filter(p=>p.side==='suffix'));
    const prefixCount=ordered.filter(p=>p.side==='prefix').length;
    const positions=prefixCount===2&&parts.length===6?[0,2,1,3,4,5]:slots;
    nodes.bubbles.replaceChildren();
    ordered.forEach((part,i)=>{
      const b=document.createElement('button');b.className='bubble arriving '+part.side;b.dataset.part=M.affixKey(part);b.dataset.slot=positions[i];b.style.setProperty('--duration',(6+i*.61)+'s');b.style.setProperty('--delay',(-i*1.7)+'s');
      const label=part.side==='prefix'?part.text+'-':'-'+part.text;
      b.setAttribute('aria-label','Add '+label+' '+part.side);b.title=part.side==='prefix'?'Joins before the word':'Joins after the word';
      const face=document.createElement('span');face.className='bubble-face';face.textContent=label;b.append(face);
      b.addEventListener('pointerdown',e=>beginDrag(e,b,part));
      b.addEventListener('pointermove',e=>moveDrag(e,b));
      b.addEventListener('pointerup',e=>endDrag(e,b,part));
      b.addEventListener('pointercancel',()=>cancelDrag());
      b.addEventListener('lostpointercapture',()=>{if(drag?.button===b)cancelDrag();});
      b.addEventListener('click',e=>{if(e.detail===0||performance.now()>suppressClick)tryPart(part,b);});
      nodes.bubbles.append(b);
    });
    if(focused)nodes.core.focus({preventScroll:true});
  }
  function beginDrag(e,b,part){
    if(e.button!==0||locked||paused())return;
    const r=b.getBoundingClientRect(),stage=nodes.stage.getBoundingClientRect();
    drag={button:b,part,id:e.pointerId,x:e.clientX,y:e.clientY,moved:false,initialLeft:r.left+r.width/2-stage.left,initialTop:r.top+r.height/2-stage.top};
    b.setPointerCapture(e.pointerId);b.classList.add('dragging');e.preventDefault();
  }
  function inTarget(x,y){const r=nodes.core.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;return Math.hypot((x-cx)/(r.width/2+15),(y-cy)/(r.height/2+15))<=1;}
  function moveDrag(e,b){
    if(!drag||drag.button!==b||drag.id!==e.pointerId)return;
    const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
    if(Math.hypot(dx,dy)>7)drag.moved=true;
    if(drag.moved){b.style.left=(drag.initialLeft+dx)+'px';b.style.top=(drag.initialTop+dy)+'px';nodes.wrap.classList.toggle('drag-target',inTarget(e.clientX,e.clientY));}
  }
  function endDrag(e,b,part){
    if(!drag||drag.button!==b)return;const use=!drag.moved||inTarget(e.clientX,e.clientY);
    suppressClick=performance.now()+400;cancelDrag();if(use)tryPart(part,b);
  }
  function cancelDrag(){if(!drag)return;const d=drag;drag=null;d.button.classList.remove('dragging');d.button.style.removeProperty('left');d.button.style.removeProperty('top');nodes.wrap.classList.remove('drag-target');try{d.button.releasePointerCapture(d.id);}catch(_){} }
  function celebrate(){
    nodes.wrap.classList.remove('reward');void nodes.wrap.offsetWidth;nodes.wrap.classList.add('reward');
    const holder=$('sparkles');holder.replaceChildren();for(let i=0;i<12;i++){const s=document.createElement('span');s.className='spark';s.textContent=i%2?'✦':'★';const a=i/12*Math.PI*2;s.style.setProperty('--dx',Math.cos(a)*(90+Math.random()*65)+'px');s.style.setProperty('--dy',Math.sin(a)*(80+Math.random()*55)+'px');holder.append(s);}setTimeout(()=>holder.replaceChildren(),1100);
  }
  function syncLock(){nodes.stage.dataset.ready=String(!locked);for(const b of nodes.bubbles.querySelectorAll('button'))b.disabled=locked;}
  function cancelTransition(){transition=null;locked=false;syncLock();nodes.wrap.classList.remove('reward','wrong');}
  function startReturn(complete){transition={remaining:1450,kind:complete?'complete':'return'};locked=true;}
  function tryPart(part,button){
    if(locked||paused())return;
    const keyboard=button===document.activeElement;
    const result=M.attempt(state,part);renderWord();
    if(!result.ok){
      message(result.attempt+'? Try another part.','That ending does not make a word here. Your current word stays.','−3','bad');tone(false);nodes.wrap.classList.remove('wrong');void nodes.wrap.offsetWidth;nodes.wrap.classList.add('wrong');locked=true;transition={remaining:550,kind:'unlock'};
    }else{
      const n=result.node;celebrate();tone(true);speak(n.word);
      const details=n.meaning+(n.note?' · '+n.note:'');
      message(result.fresh?n.word+'!':n.word+' · already found',details,result.fresh?'+10':'0',result.fresh?'':'neutral');
      if(result.fresh)renderCollection();else markCurrent();
      wave=0;waveTime=0;
      if(result.terminal){startReturn(result.complete);$('coreLabel').textContent=result.complete?'FAMILY COMPLETE!':'COLLECTED!';}
      else {renderBubbles();locked=true;transition={remaining:420,kind:'unlock'};}
    }
    syncLock();if(keyboard)nodes.core.focus({preventScroll:true});
  }
  function returnToBase(){
    const complete=M.complete(state);cancelTransition();M.reset(state);wave=0;waveTime=0;renderWord();renderBubbles();markCurrent();
    if(complete)showFamilies(true);else message('Back to '+M.deck(state).base+'—keep exploring!', 'Your words are safe in the collection. Try a new branch.','↩','neutral');
  }
  function showFamilies(complete=false){
    cancelDrag();$('familyTitle').textContent=complete?'Word family complete!':'Choose your next base';
    $('familyMessage').textContent=complete?'You discovered all '+M.deck(state).words.length+' words in this family. Choose another adventure!':'Your score and discoveries come with you.';
    const grid=$('familyGrid');grid.replaceChildren();M.decks.forEach((d,i)=>{const b=document.createElement('button');b.className='family-choice'+(state.family===i?' current':'');b.append(document.createTextNode(d.base));const count=document.createElement('small');count.textContent=state.found[i].size+' / '+d.words.length+' words';b.append(count);b.addEventListener('click',()=>{cancelTransition();M.switchFamily(state,i);wave=0;waveTime=0;renderWord();renderCollection();renderBubbles();message('Let’s explore '+d.base+'!',d.meaning+' · Add a floating word part.');$('familyDialog').close();updatePause();nodes.core.focus({preventScroll:true});});grid.append(b);});openDialog($('familyDialog'));
  }
  function openDialog(d){cancelDrag();if(!d.open)d.showModal();updatePause();}
  function updatePause(){const p=paused();nodes.stage.dataset.paused=String(p);$('pausedOverlay').hidden=!manualPause;$('pause').setAttribute('aria-pressed',String(manualPause));$('pause').setAttribute('aria-label',manualPause?'Resume game':'Pause game');if(p&&'speechSynthesis' in window)window.speechSynthesis.cancel();}
  function setPause(v){cancelDrag();manualPause=v;updatePause();}
  $('sound').addEventListener('click',()=>{sound=!sound;$('sound').setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-label',sound?'Turn sound off':'Turn sound on');$('sound').style.opacity=sound?'1':'.65';if(sound)speak('Drag a part. Make a word!');else if('speechSynthesis' in window)window.speechSynthesis.cancel();});
  $('pause').addEventListener('click',()=>setPause(!manualPause));$('resume').addEventListener('click',()=>setPause(false));
  $('help').addEventListener('click',()=>openDialog($('helpDialog')));$('teacher').addEventListener('click',()=>openDialog($('teacherDialog')));$('restart').addEventListener('click',()=>openDialog($('restartDialog')));
  $('confirmRestart').addEventListener('click',()=>{cancelTransition();state=M.create();wave=0;waveTime=0;setPause(false);renderWord();renderCollection();renderBubbles();message('A fresh word adventure!', 'Add a prefix or suffix to play. Some parts are decoys!');$('restartDialog').close();updatePause();});
  $('newBase').addEventListener('click',()=>showFamilies());$('backBase').addEventListener('click',()=>{if(paused())return;cancelTransition();returnToBase();});
  nodes.core.addEventListener('click',()=>speak(M.node(state).word+'. '+M.node(state).meaning));
  for(const b of document.querySelectorAll('[data-close]'))b.addEventListener('click',()=>{b.closest('dialog').close();updatePause();});
  for(const d of dialogs)d.addEventListener('close',updatePause);
  document.addEventListener('visibilitychange',()=>{hiddenPause=document.hidden;cancelDrag();updatePause();});
  window.addEventListener('resize',()=>{cancelDrag();fitWord();});if(window.ResizeObserver)new ResizeObserver(fitWord).observe(nodes.core);
  $('wordTotal').textContent=M.decks.reduce((sum,d)=>sum+d.words.length,0);
  function frame(now){
    const dt=previousFrame?Math.min(now-previousFrame,80):0;previousFrame=now;
    if(!paused()){
      if(transition){transition.remaining-=dt;if(transition.remaining<=0){const kind=transition.kind;transition=null;locked=false;if(kind==='return'||kind==='complete')returnToBase();syncLock();}}
      else if(!drag){waveTime+=dt;if(waveTime>=7600){waveTime=0;wave++;renderBubbles();}}
    }
    requestAnimationFrame(frame);
  }
  $('makeOwn').addEventListener('click',async()=>{
    const button=$('makeOwn');button.disabled=true;$('downloadStatus').textContent='Preparing your copy…';
    try{
      const getText=async file=>{const r=await fetch(file);if(!r.ok)throw new Error(file);return r.text();};
      const getData=async file=>{const r=await fetch(file);if(!r.ok)throw new Error(file);return new Promise((resolve,reject)=>{r.blob().then(blob=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);},reject);});};
      const [html,css,words,model,app,space,sun]=await Promise.all([getText('index.html'),getText('style.css?v=1'),getText('words.js?v=1'),getText('model.js?v=1'),getText('app.js?v=1'),getData('assets/space.webp'),getData('assets/sun.webp')]);
      const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelector('link[rel=stylesheet]').remove();doc.querySelectorAll('script[src]').forEach(s=>s.remove());
      const style=doc.createElement('style');style.textContent=css.replaceAll('assets/space.webp',space).replaceAll('assets/sun.webp',sun);doc.head.append(style);
      for(const text of [words,model,app]){const script=doc.createElement('script');script.textContent=text;doc.body.append(script);}
      const copy=doc.querySelector('#makeOwn');copy.textContent='Offline copy';copy.disabled=true;
      const blob=new Blob(['<!doctype html>\n'+doc.documentElement.outerHTML],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='word-orbit.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),20000);$('downloadStatus').textContent='Your offline copy is ready.';
    }catch(e){$('downloadStatus').textContent='The copy could not download. Please try again.';}finally{button.disabled=false;}
  });
  renderWord();renderCollection();renderBubbles();syncLock();updatePause();requestAnimationFrame(frame);
})();
