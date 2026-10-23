/* Image-based tracks, fixed-step rolling, and the child-facing investigation flow. */
(()=>{
  'use strict';
  const E=RollPhysics,$=id=>document.getElementById(id),canvas=$('scene'),ctx=canvas.getContext('2d');
  const STORAGE='bgsd-ready-set-roll-v1',colors=['#1462D8','#C46845'];
  const images={car:new Image(),materials:new Image()},patterns={},wheels=[];
  let assetsReady=false,assetFailed=false,width=0,height=0,dpr=1,lastTime=0,accumulator=0,oldFocus=null;
  let saved={};try{saved=JSON.parse(localStorage.getItem(STORAGE))||{};}catch{}
  const validPrediction=v=>['a','b','same'].includes(v);
  const state={index:Number.isInteger(saved.index)&&saved.index>=0&&saved.index<6?saved.index:0,free:false,freeLanes:null,phase:'ready',started:false,voice:saved.voice!==false,prediction:validPrediction(saved.prediction)?saved.prediction:null,cars:[],slow:typeof saved.slow==='boolean'?saved.slow:matchMedia('(prefers-reduced-motion: reduce)').matches,completed:new Set(Array.isArray(saved.completed)?saved.completed.filter(v=>Number.isInteger(v)&&v>=0&&v<6):[]),trials:Array.isArray(saved.trials)?saved.trials.filter(t=>t&&typeof t.id==='string'&&Array.isArray(t.lanes)&&t.lanes.length===2).slice(-60):[],elapsed:0};
  let embedded={};try{embedded=JSON.parse($('roll-assets')?.textContent||'{}');}catch{}
  const narrator=$('narrator');if(embedded.audio)narrator.src=embedded.audio;
  let speechEnd=0,speechTimer=0,speechToken=0;
  function stopSpeech(){speechToken++;clearTimeout(speechTimer);narrator.pause();if('speechSynthesis' in window)speechSynthesis.cancel();}
  narrator.addEventListener('timeupdate',()=>{if(speechEnd&&narrator.currentTime>=speechEnd){narrator.pause();clearTimeout(speechTimer);}});
  function level(){return state.free?{id:'free',name:'Your own experiment',question:'Which car will go farther?',kind:'distance',lanes:state.freeLanes,explain:'Compare the cars, ramp heights and surfaces. Change one thing, predict again and repeat your test.'}:E.levels[state.index];}
  function persist(){try{localStorage.setItem(STORAGE,JSON.stringify({index:state.index,prediction:state.prediction,slow:state.slow,voice:state.voice,completed:[...state.completed],trials:state.trials.slice(-60)}));}catch{}}
  function busy(){return state.phase==='rolling'||state.phase==='paused';}
  function status(text){$('status').textContent=text;}
  function setup(){state.cars=level().lanes.map(E.makeCar);state.phase='ready';state.elapsed=0;accumulator=0;lastTime=0;renderUI();draw();}
  function labels(){return level().lanes.map(l=>l.label);}
  function speak(text,force=false,key){
    if((!state.voice&&!force)||!state.started)return;
    stopSpeech();
    const cue=window.RollSpeech?.cues[key];
    if(cue){
      const token=speechToken;speechEnd=cue.end;narrator.setAttribute('aria-label',cue.text);narrator.dataset.clip=key;
      const play=()=>{if(token!==speechToken)return;narrator.currentTime=cue.start;const played=narrator.play();if(played)played.then(()=>{if(token===speechToken)speechTimer=setTimeout(()=>narrator.pause(),(cue.end-cue.start)*1000);}).catch(()=>speakNative(text));};
      if(narrator.readyState>0)play();else{narrator.addEventListener('loadedmetadata',play,{once:true});narrator.load();}return;
    }
    speakNative(text);
  }
  function speakNative(text){
    if(!('speechSynthesis' in window)){voiceUnavailable();return;}
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-CA';utterance.rate=.88;
    const voices=speechSynthesis.getVoices();utterance.voice=voices.find(v=>v.lang==='en-CA')||voices.find(v=>v.lang.startsWith('en-'))||null;
    utterance.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))voiceUnavailable();};speechSynthesis.speak(utterance);
  }
  function voiceUnavailable(){
    $('voice-status').textContent='This browser cannot play spoken guidance. An adult will need to read the question and feedback. Try a browser with an English speech voice.';
    $('asset-status').textContent='Sound is unavailable in this browser. Ask a grown-up to help.';
  }
  function speakQuestion(force=false){speak(level().question+' Tap a track. Then press play.',force,'q-'+level().kind);}
  function speakResult(force=false){speak(spokenResult(),force,state.free?'free-'+E.outcome(state.cars):'result-'+level().id);}
  function spokenResult(){
    const l=level(),winner=E.outcome(state.cars,l.kind,l.target),where=winner==='a'?'top':'bottom';
    if(winner==='same')return 'They matched! Both cars went the same distance. Both tracks were the same. Press the arrow to try the next one.';
    const action=l.kind==='speed'?'went faster at the white line':l.kind==='stop'?'stopped first':l.kind==='target'?'reached the flag':'went farther';
    const why=l.id==='height'?'It started higher.':l.id==='wood-felt'?'The felt slowed the other car more.':l.id==='sandpaper'?'The sandpaper slowed that car more.':l.id==='speed'?'The wood slowed its car less.':l.id==='flag'?'The felt car stopped before its flag.':'Look at what changed on your tracks.';
    return 'Look! The '+where+' car '+action+'. '+why+' Press the arrow to '+(state.free?'change your experiment.':'keep exploring.');
  }
  function renderUI(){
    const l=level(),ready=state.phase==='ready',running=state.phase==='rolling',paused=state.phase==='paused',result=state.phase==='result',complete=state.phase==='complete';
    $('round').textContent=state.free?'⚒':`${state.index+1} / 6`;
    $('round').setAttribute('aria-label',state.free?'Your own experiment':`Investigation ${state.index+1} of 6`);
    $('question').textContent=complete?'You did it!':l.question;
    $('subline').textContent=complete?'You predicted, tested and compared.':state.free?'Try a change. Keep the rest the same.':l.id==='height'?'Same cars and surfaces. Different ramp heights.':l.id==='same'?'Same cars. Same heights. Same surfaces.':l.kind==='speed'?'Compare the cars at the white stripes.':'Same cars. Matching ramps. Different surfaces.';
    $('choice-a').textContent=l.lanes[0].label;$('choice-b').textContent=l.lanes[1].label;
    $('choice-same').textContent='Both';
    const selected=result?E.outcome(state.cars,l.kind,l.target):state.prediction;
    document.querySelectorAll('[data-choice]').forEach(b=>{b.disabled=!ready;b.setAttribute('aria-pressed',String(b.dataset.choice===selected));b.setAttribute('aria-label',b.dataset.choice==='a'?'Choose the top track':b.dataset.choice==='b'?'Choose the bottom track':'Choose both tracks');});
    document.querySelector('.choices').classList.toggle('observed',result);
    document.querySelector('.controls').hidden=false;
    document.querySelector('.choices').hidden=complete;
    $('prompt').textContent=complete?'Keep exploring':ready?'Pick a track':running?'Watch!':paused?'Paused':'Look!';
    $('replay').hidden=!(result||paused);
    $('go').disabled=ready?(!assetsReady||(state.started&&!state.prediction)):false;
    const actionLabel=complete?'Start again':ready?state.started?'Roll the cars':'Start with spoken instructions':running?'Pause the cars':paused?'Keep rolling':state.free?'Change my experiment':state.index===5?'Finish investigations':'Next investigation';
    $('go').setAttribute('aria-label',actionLabel);$('go').querySelector('.action-icon').textContent=complete?'↻':running?'❚❚':ready||paused?'▶':'→';
    $('go').querySelector('.action-label').textContent=complete?'Again':running?'Pause':ready?state.started?"Let's roll!":"Let's play!":paused?'Keep rolling':state.free?'Change':'Next';
    $('slow').setAttribute('aria-pressed',String(state.slow));
    $('result').hidden=!result&&!complete;
    if(result){
      const winner=E.outcome(state.cars,l.kind,l.target),names=labels();
      $('result-title').textContent=winner==='same'?'They matched!':l.kind==='speed'?`The ${winner==='a'?'top':'bottom'} car was faster!`:l.kind==='stop'?`The ${winner==='a'?'top':'bottom'} car stopped first!`:l.kind==='target'?`The ${winner==='a'?'top':'bottom'} car reached the flag!`:`The ${winner==='a'?'top':'bottom'} car went farther!`;
      $('result-text').textContent=l.explain;
    }else if(complete){$('result-title').textContent='A little scientist at work.';$('result-text').textContent='Open the lab options to see your observations or try your own experiment. You can also repeat these investigations.';}
    $('journey').hidden=!state.free;
    $('free').textContent=state.free?'Change my experiment':'Try your own experiment';
    $('voice').checked=state.voice;
    describe();
  }
  function describe(){
    const l=level();
    canvas.setAttribute('aria-label',l.lanes.map((lane,i)=>{
      const car=state.cars[i],motion=state.phase==='ready'?'waiting on its ramp':car.stopped?'stopped':state.phase==='paused'?'paused':'rolling';
      return `${i===0?'Top':'Bottom'} track: ${lane.label}, ${E.surfaces[lane.surface].name} surface. The blue car is ${motion}${state.phase==='ready'?'':`, ${Math.round(E.distance(car)*100)} centimetres past the ramp`}.`;
    }).join(' '));
  }
  function choose(value){if(state.phase!=='ready')return;const first=!state.started;state.started=true;state.prediction=value;renderUI();draw();persist();if(first)speakQuestion();else speak(value==='same'?'Both tracks. Press play to test your idea.':(value==='a'?'The top track.':'The bottom track.')+' Press play to test your idea.',false,'choose-'+value);status('Prediction chosen. Ready to roll!');}
  function start(){stopSpeech();state.phase='rolling';state.elapsed=0;accumulator=0;lastTime=0;renderUI();status('Released together. Watch the cars speed up downhill and slow on the flat.');}
  function pause(){if(state.phase!=='rolling')return;state.phase='paused';lastTime=0;renderUI();status('Paused. Keep rolling when you are ready.');}
  function finish(){
    state.phase='result';if(!state.free)state.completed.add(state.index);
    const l=level();
    state.trials.push({id:l.id,name:l.name,prediction:state.prediction,outcome:E.outcome(state.cars,l.kind,l.target),kind:l.kind,lanes:l.lanes.map((lane,i)=>({label:lane.label,surface:lane.surface,height:lane.height,distance:E.distance(state.cars[i]),speed:state.cars[i].gateSpeed,stopTime:state.cars[i].stopTime}))});
    state.trials=state.trials.slice(-60);persist();renderUI();status('Look at the cars. What changed?');draw();speakResult();
  }
  $('go').onclick=()=>{
    if(state.phase==='ready'){if(!state.started){state.started=true;renderUI();speakQuestion();}else if(state.prediction&&assetsReady)start();}
    else if(state.phase==='rolling')pause();
    else if(state.phase==='paused'){state.phase='rolling';lastTime=0;renderUI();status('Keep watching the tracks.');}
    else if(state.phase==='complete'){state.index=0;state.free=false;state.prediction=null;setup();persist();status('A fresh set of investigations.');speakQuestion();}
    else if(state.free)openSettings();
    else if(state.index<5){state.index++;state.prediction=null;setup();persist();status('Make a prediction for your next investigation.');$('question').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});speakQuestion();}
    else {state.phase='complete';renderUI();persist();status('All six investigations are recorded in your observations.');$('question').focus({preventScroll:true});speak('You did it! You made predictions and tested your ideas. Press the round arrow to play again.',false,'complete');}
  };
  $('replay').onclick=()=>{setup();status('Same setup, released from rest again. You can change your prediction.');speakQuestion();};
  $('voice').onchange=()=>{state.voice=$('voice').checked;persist();if(state.voice)speakQuestion();else stopSpeech();};
  document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>choose(b.dataset.choice));
  $('slow').onclick=()=>{state.slow=!state.slow;persist();renderUI();status(state.slow?'Slow motion on. The physics and final results stay the same.':'Normal speed.');};
  $('read').onclick=()=>{if(!state.started){state.started=true;renderUI();}state.phase==='result'?speakResult(true):speakQuestion(true);};
  function dialog(id){if(state.phase==='rolling')pause();stopSpeech();const node=$(id);if(!node.open)node.showModal();}
  $('more').onclick=()=>{renderObservations();dialog('options');};
  document.querySelectorAll('.close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
  function openSettings(){
    if(state.phase==='rolling')pause();
    const lanes=state.free?state.freeLanes:level().lanes;
    ['a','b'].forEach((key,i)=>{$('surface-'+key).value=lanes[i].surface;$('height-'+key).value=String([.09,.14,.19].reduce((a,b)=>Math.abs(b-lanes[i].height)<Math.abs(a-lanes[i].height)?b:a));});
    $('options').close();dialog('free-settings');
  }
  $('free').onclick=openSettings;
  $('apply-free').onclick=()=>{
    state.freeLanes=['a','b'].map((key,i)=>{const surface=$('surface-'+key).value,height=Number($('height-'+key).value);return {label:`${i===0?'Top':'Bottom'}: ${E.surfaces[surface].name}`,surface,height};});
    state.free=true;state.started=true;state.prediction=null;$('free-settings').close();setup();status('Your experiment is ready. Make a prediction.');speakQuestion();
  };
  $('journey').onclick=()=>{state.free=false;state.started=true;state.prediction=null;$('options').close();setup();persist();status('Back to your investigations.');speakQuestion();};
  function renderObservations(){
    const node=$('observations');node.replaceChildren();
    if(!state.trials.length){const p=document.createElement('p');p.textContent='Your first roll will start the notebook.';node.append(p);return;}
    state.trials.slice().reverse().forEach((trial,index)=>{
      const article=document.createElement('article');article.className='trial';const heading=document.createElement('strong');heading.textContent=`${state.trials.length-index}. ${trial.name}`;article.append(heading);
      trial.lanes.forEach(lane=>{const p=document.createElement('p');p.textContent=`${lane.label}: ${Math.round(lane.distance*100)} cm past the ramp${lane.speed===null?'':`, ${lane.speed.toFixed(2)} m/s at the stripe`}. Ramp height ${Math.round(lane.height*100)} cm.`;article.append(p);});node.append(article);
    });
  }
  function saveFile(name,type,body){const url=URL.createObjectURL(new Blob([body],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  $('export').onclick=()=>{
    const rows=[['Trial','Investigation','Prediction','Observed comparison','Track','Surface','Ramp height cm','Distance past ramp cm','Speed at stripe m/s','Stop time s']];
    state.trials.forEach((trial,i)=>trial.lanes.forEach(lane=>rows.push([i+1,trial.name,trial.prediction,trial.outcome,lane.label,lane.surface,Math.round(lane.height*100),Math.round(lane.distance*100),lane.speed===null?'':lane.speed.toFixed(3),lane.stopTime.toFixed(3)])));
    const csv=rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');saveFile('ready-set-roll-observations.csv','text/csv',csv);
  };
  function expand(value){
    document.body.classList.toggle('expanded',value);const area=document.querySelector('.play-area');
    if(value){oldFocus=document.activeElement;area.setAttribute('role','dialog');area.setAttribute('aria-modal','true');area.setAttribute('aria-label','Larger track view');document.querySelectorAll('.header,.question-area,.controls').forEach(n=>n.inert=true);$('expand').textContent='×';$('expand').setAttribute('aria-label','Close larger track view');$('expand').focus();}
    else {area.removeAttribute('role');area.removeAttribute('aria-modal');area.setAttribute('aria-label','Two-track rolling experiment');document.querySelectorAll('.header,.question-area,.controls').forEach(n=>n.inert=false);$('expand').textContent='⤢';$('expand').setAttribute('aria-label','Open a larger track view');oldFocus?.focus();}
    resize();
  }
  $('expand').onclick=()=>expand(!document.body.classList.contains('expanded'));
  document.addEventListener('keydown',e=>{if(!document.body.classList.contains('expanded'))return;if(e.key==='Escape'){e.preventDefault();expand(false);}else if(e.key==='Tab'){e.preventDefault();(document.activeElement===$('expand')?$('slow'):$('expand')).focus();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(state.phase==='rolling')pause();stopSpeech();}lastTime=0;});
  function resize(){const box=canvas.getBoundingClientRect();width=box.width;height=box.height;dpr=Math.min(2,window.devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);draw();}
  new ResizeObserver(resize).observe(canvas);window.addEventListener('resize',resize);
  canvas.addEventListener('click',event=>{if(state.phase!=='ready')return;const box=canvas.getBoundingClientRect();choose(event.clientY-box.top<box.height*.61?'a':'b');});
  function buildTextures(){
    const side=images.materials.naturalWidth/2;
    for(const [key,surface]of Object.entries(E.surfaces)){
      const tile=document.createElement('canvas');tile.width=192;tile.height=96;
      tile.getContext('2d').drawImage(images.materials,(surface.tile%2)*side,Math.floor(surface.tile/2)*side,side,side,0,0,192,96);
      patterns[key]=ctx.createPattern(tile,'repeat');
    }
    // Keep the photograph as the body. Only the circular wheel regions rotate.
    for(const [x,y]of [[267,687],[1231,685]]){const wheel=document.createElement('canvas');wheel.width=wheel.height=248;const c=wheel.getContext('2d');c.beginPath();c.arc(124,124,122,0,Math.PI*2);c.clip();c.drawImage(images.car,x-124,y-124,248,248,0,0,248,248);wheels.push(wheel);}
  }
  let loaded=0;
  for(const key of Object.keys(images)){
    images[key].onload=()=>{loaded++;if(loaded===2){buildTextures();assetsReady=true;$('asset-status').textContent='';renderUI();draw();}};
    images[key].onerror=()=>{assetFailed=true;$('asset-status').textContent='The artwork could not load. Reload the page to try again.';$('go').disabled=true;};
    images[key].src=embedded[key]||`assets/${key}.webp`;
  }
  function path(points){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();}
  function label(text,x,y,size=14,color='#283953',align='left'){ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='middle';ctx.font=`900 ${size}px Nunito, "Trebuchet MS", sans-serif`;ctx.fillText(text,x,y);}
  function draw(){
    if(!width||!height)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
    const backdrop=ctx.createLinearGradient(0,0,0,height);backdrop.addColorStop(0,'#fffdf8');backdrop.addColorStop(1,'#f8f4ea');ctx.fillStyle=backdrop;ctx.fillRect(0,0,width,height);
    const left=width<500?12:30,right=width<500?18:35,scale=(width-left-right)/3.15;
    const baselines=[height*.40,height*.83],depth=Math.max(7,Math.min(20,scale*.058)),thickness=Math.max(4,scale*.026);
    const l=level();
    l.lanes.forEach((lane,i)=>{
      const base=baselines[i],car=state.cars[i];if(!car)return;
      const px=x=>left+x*scale,py=x=>base-E.profile(x,lane.height).y*scale;
      // Cast shadows and real-material board faces give depth without a busy background.
      ctx.save();ctx.globalAlpha=.12;ctx.shadowColor='#4a3828';ctx.shadowBlur=9;ctx.shadowOffsetY=5;ctx.fillStyle='#6f5942';ctx.fillRect(px(.06),base+thickness+2,scale*3.02,3);ctx.restore();
      const face=[];for(let j=0;j<=55;j++){const x=.06+j*(3.02/55);face.push({x:px(x),y:py(x)});}
      path([...face,...face.slice().reverse().map(p=>({x:p.x,y:p.y+thickness}))]);ctx.fillStyle=patterns.wood||'#d6ae76';ctx.fill();
      const shade=ctx.createLinearGradient(0,base-80,0,base+10);shade.addColorStop(0,'#ad784d55');shade.addColorStop(1,'#875c3a66');ctx.fillStyle=shade;ctx.fill();
      const ramp=face.filter(p=>p.x<=px(E.RAMP_END));ramp.push({x:px(E.RAMP_END),y:base});
      path([...ramp,...ramp.slice().reverse().map(p=>({x:p.x+depth*.68,y:p.y-depth}))]);ctx.fillStyle=patterns.wood||'#dec195';ctx.fill();
      path([{x:px(E.RAMP_END),y:base},{x:px(3.08),y:base},{x:px(3.08)+depth*.68,y:base-depth},{x:px(E.RAMP_END)+depth*.68,y:base-depth}]);ctx.fillStyle=patterns[lane.surface]||E.surfaces[lane.surface].color;ctx.fill();
      // The back support shares the same wood texture as the ramp.
      const supportX=px(.095),supportY=py(.095)+thickness,supportW=Math.max(8,.11*scale);
      ctx.fillStyle=patterns.wood||'#cfac81';ctx.fillRect(supportX,supportY,supportW,Math.max(0,base+thickness-supportY));ctx.fillStyle='#8f66452e';ctx.fillRect(supportX,supportY,supportW,Math.max(0,base+thickness-supportY));
      ctx.beginPath();ctx.moveTo(px(.06),py(.06));for(const p of face)ctx.lineTo(p.x,p.y);ctx.strokeStyle='#a5805660';ctx.lineWidth=1;ctx.stroke();
      if(l.kind==='speed'){
        const gx=px(E.RAMP_END+.25);path([{x:gx,y:base},{x:gx+6,y:base},{x:gx+6+depth*.68,y:base-depth},{x:gx+depth*.68,y:base-depth}]);ctx.fillStyle='#fff';ctx.fill();
        label('stripe',gx+3,base+21,width<500?10:12,'#69748b','center');
      }
      if(l.kind==='target'){
        const fx=px(E.RAMP_END+l.target);ctx.beginPath();ctx.moveTo(fx,base-1);ctx.lineTo(fx,base-42);ctx.strokeStyle='#223550';ctx.lineWidth=2;ctx.stroke();path([{x:fx,y:base-43},{x:fx+23,y:base-35},{x:fx,y:base-27}]);ctx.fillStyle='#f7c631';ctx.fill();
      }
      const labelY=base-Math.max(28,depth+14),fontSize=width<500?12:16;
      label(lane.label,px(3.05),labelY,fontSize,'#263954','right');
      const badgeX=width<500?12:19,badgeY=base-lane.height*scale-22,badgeR=width<500?10:13;
      ctx.beginPath();ctx.arc(badgeX,badgeY,badgeR,0,Math.PI*2);ctx.fillStyle=colors[i];ctx.fill();label(String(i+1),badgeX,badgeY,width<500?12:15,'#fff','center');
      // A matching coloured trail lets children directly compare where the cars stopped.
      if(state.phase!=='ready'&&car.x>E.RAMP_END){
        const ty=base+thickness+14;ctx.beginPath();ctx.moveTo(px(E.RAMP_END),ty);ctx.lineTo(px(car.x),ty);ctx.strokeStyle=colors[i];ctx.lineWidth=3;ctx.lineCap='round';ctx.stroke();
        ctx.beginPath();ctx.arc(px(car.x),ty,4,0,Math.PI*2);ctx.fillStyle=colors[i];ctx.fill();
        if(car.stopped){ctx.beginPath();ctx.moveTo(px(car.x),base+3);ctx.lineTo(px(car.x),ty-5);ctx.setLineDash([2,3]);ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);}
      }
      if(assetsReady)drawCar(car,px(car.x),base,scale);
      if(state.phase==='ready'){
        const gx=px(E.RELEASE+.21),gy=py(E.RELEASE+.21);ctx.beginPath();ctx.moveTo(gx,gy-3);ctx.lineTo(gx,gy-Math.max(12,.1*scale));ctx.strokeStyle='#f0bb26';ctx.lineWidth=Math.max(3,scale*.012);ctx.lineCap='round';ctx.stroke();
      }
    });
  }
  function drawCar(car,x,base,scale){
    const pose=E.chassis(car.x,car.height),imageScale=E.WHEELBASE*scale/964;
    const rearX=(267-749)*imageScale,frontX=(1231-749)*imageScale,radius=124*imageScale;
    ctx.save();ctx.translate(x,base-pose.y*scale);ctx.rotate(-pose.angle);
    ctx.save();ctx.translate(0,3);ctx.scale(1,.18);ctx.beginPath();ctx.ellipse(0,0,.16*scale,Math.max(5,scale*.025),0,0,Math.PI*2);ctx.fillStyle='#4a382829';ctx.fill();ctx.restore();
    ctx.drawImage(images.car,24,220,1490,595,-725*imageScale,-590*imageScale,1490*imageScale,595*imageScale);
    wheels.forEach((wheel,i)=>{ctx.save();ctx.translate(i===0?rearX:frontX,-radius+(i===0?1:-1)*imageScale);ctx.rotate(car.wheelAngle);ctx.drawImage(wheel,-radius,-radius,radius*2,radius*2);ctx.restore();});
    ctx.restore();
  }
  function frame(time){
    if(state.phase==='rolling'){
      const elapsed=lastTime?Math.min(2,(time-lastTime)/1000):0;accumulator+=elapsed*(state.slow?.4:1);lastTime=time;
      while(accumulator>=E.STEP&&state.phase==='rolling'){state.cars.forEach(car=>E.step(car));state.elapsed+=E.STEP;accumulator-=E.STEP;if(state.cars.every(car=>car.stopped))finish();}
      if(Math.floor(state.elapsed*4)!==Math.floor((state.elapsed-elapsed)*4))describe();
      draw();
    }else lastTime=0;
    requestAnimationFrame(frame);
  }
  async function dataURL(image){const response=await fetch(image.src);if(!response.ok)throw new Error('Artwork could not be copied.');const blob=await response.blob();return await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});}
  $('download').onclick=async()=>{
    if(!embedded.car){const a=document.createElement('a');a.href='ready-set-roll.html';a.download='ready-set-roll.html';document.body.append(a);a.click();a.remove();$('download-status').textContent='Your complete game is downloading, including its images.';return;}
    $('download').disabled=true;$('download-status').textContent='Preparing your complete game…';
    try{
      const [css,physics,speech,app,car,materials,audio]=await Promise.all([
        document.querySelector('#inline-style')?.textContent||fetch('style.css?v=20261023-2').then(r=>{if(!r.ok)throw Error();return r.text();}),
        document.querySelector('#inline-physics')?.textContent||fetch('physics.js?v=20261023-2').then(r=>{if(!r.ok)throw Error();return r.text();}),
        document.querySelector('#inline-speech')?.textContent||fetch('speech.js?v=20261023-2').then(r=>{if(!r.ok)throw Error();return r.text();}),
        document.querySelector('#inline-app')?.textContent||fetch('app.js?v=20261023-2').then(r=>{if(!r.ok)throw Error();return r.text();}),dataURL(images.car),dataURL(images.materials),embedded.audio||dataURL(narrator)
      ]);
      const clone=document.documentElement.cloneNode(true);clone.querySelectorAll('script,link,style').forEach(n=>n.remove());clone.querySelector('body').classList.remove('expanded');clone.querySelectorAll('[inert]').forEach(n=>n.removeAttribute('inert'));clone.querySelectorAll('dialog[open]').forEach(n=>n.removeAttribute('open'));clone.querySelector('#observations').replaceChildren();
      const style=document.createElement('style');style.id='inline-style';style.textContent=css;clone.querySelector('head').append(style);
      const asset=document.createElement('script');asset.type='application/json';asset.id='roll-assets';asset.textContent=JSON.stringify({car,materials,audio});clone.querySelector('body').append(asset);
      for(const [id,source]of [['inline-physics',physics],['inline-speech',speech],['inline-app',app]]){const script=document.createElement('script');script.id=id;script.textContent=source.replace(/<\/script/gi,'<\\/script');clone.querySelector('body').append(script);}
      saveFile('ready-set-roll.html','text/html','<!doctype html>\n'+clone.outerHTML);$('download-status').textContent='Your complete game is downloaded, including the images. Open the HTML file to play.';
    }catch{$('download-status').textContent='The game could not be copied. Check your connection and try again.';}
    $('download').disabled=false;
  };
  setup();resize();requestAnimationFrame(frame);
})();
