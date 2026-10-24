(()=>{
'use strict';
const $=id=>document.getElementById(id),M=window.VibrationModel;
const COLORS=['#ff6a65','#ffe34e','#39bafa','#83d9fd'];
const STRINGS=M.STRINGS;
const SOUNDS=[{name:'Bell',icon:'🔔',length:'long',explain:'This model bell rings for a longer time.'},{name:'Bee',icon:'🐝',length:'long',explain:'In this example, the buzzing continues while the wings vibrate.'},{name:'Clap',icon:'👏',length:'short',explain:'This model handclap ends quickly.'}];
const S={mode:'strings',string:0,tension:50,tensions:[50,50,50],force:50,source:0,pitch:null,duration:null};
let actx,analysers=[],master,huntMotionTimer,voices=new Set();
let motion={index:0,start:0,hz:440,duration:8000};
function currentFrequency(){return M.frequency(S.string,S.tension);}
function stopAudio(){
 for(const voice of voices){try{voice.stop();}catch{}try{voice.disconnect();}catch{}}
 voices.clear();
}
function startAudio(){
 try{
  if(!actx){
   const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('WebAudio missing');
   actx=new Audio();master=actx.createGain();master.gain.value=.65;master.connect(actx.destination);
   for(let i=0;i<4;i++){const a=actx.createAnalyser();a.fftSize=2048;a.smoothingTimeConstant=0;a.connect(master);analysers.push(a);}
  }
  if(actx.state==='suspended')actx.resume().catch(()=>{$('response').textContent='Tap PLAY again to enable sound.';});
  stopAudio();return true;
 }catch(e){$('response').textContent='Sound is not available on this device or browser.';return false;}
}
function track(source){voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();};return source;}
function envelope(channel,peak,time,fade){
 const g=actx.createGain();g.gain.setValueAtTime(.0001,time);g.gain.linearRampToValueAtTime(peak,time+.008);g.gain.exponentialRampToValueAtTime(.0001,time+fade);g.connect(analysers[channel]);return g;
}
function noise(seconds){
 const b=actx.createBuffer(1,Math.round(actx.sampleRate*seconds),actx.sampleRate),a=b.getChannelData(0);
 for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;return b;
}
function refreshFrequency(){
 const hz=Math.round(currentFrequency());
 $('motionFrequency').textContent=STRINGS[S.string].name.toUpperCase()+' STRING · '+hz+' Hz'+(S.tension===50?' · A4':'');
 document.querySelectorAll('#stringControls .pick').forEach(b=>{
  const i=Number(b.dataset.string),f=Math.round(M.frequency(i,S.tensions[i]));
  b.querySelector('small').textContent=f+' Hz · '+(S.tensions[i]<50?'looser':S.tensions[i]>50?'tighter':'start');
 });
 $('motionCaption').textContent='Both ends stay fixed. The middle moves back and forth.';
 $('physicalString').dataset.vibrationHz=String(hz);
 $('physicalString').dataset.slowedHz=String(currentFrequency()/M.SLOWDOWN);
 $('airParticles').dataset.frequencyHz=String(currentFrequency());
 $('airParticles').dataset.soundSpeed=String(M.AIR_SPEED);
}
function selectString(index){
 S.string=index;S.tension=S.tensions[index];motion.index=index;$('tension').value=String(S.tension);$('tensionValue').textContent=S.tension<50?'Looser':S.tension>50?'Tighter':'Starting tension';
 document.querySelectorAll('[data-string]').forEach(b=>{const selected=Number(b.dataset.string)===index;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
 refreshFrequency();
}
function pluck(index=S.string){
 if(!startAudio())return;selectString(index);
 const t=actx.currentTime+.01,f=currentFrequency();
 // A fundamental-only tone isolates frequency. The same waveform and decay
 // are used for all strings, so timbre is not a second changing variable.
 const osc=track(actx.createOscillator()),env=envelope(index,.23,t,1.8);
 osc.type='sine';osc.frequency.value=f;osc.connect(env);osc.start(t);osc.stop(t+1.85);
 motion={index,start:performance.now(),hz:f,duration:8000};
 $('physicalString').dataset.vibrationHz=String(Math.round(f));
 $('physicalString').dataset.slowedHz=String(f/M.SLOWDOWN);
 $('pluckingFlash').classList.remove('active');void $('pluckingFlash').offsetWidth;$('pluckingFlash').classList.add('active');
 const pitch=f<440-.01?'lower':f>440+.01?'higher':'same';$('physicalString').dataset.pitch=pitch;
 $('question').textContent='Compared with its starting pitch?';
 $('response').textContent=STRINGS[index].name+' string: '+Math.round(f)+' vibrations each second — '+(pitch==='same'?'the same as':pitch+' than')+' its 440 Hz starting pitch. '+(S.pitch?(S.pitch===pitch?'Your prediction matched!':'Listen to an unchanged string, then compare.'):'Change only this string’s tension.');
}
function hitDrum(){
 if(!startAudio())return;
 const t=actx.currentTime+.01,force=.12+.88*S.force/100;
 const osc=track(actx.createOscillator()),env=envelope(3,.22*force,t,.48);
 osc.type='sine';osc.frequency.setValueAtTime(180,t);osc.frequency.exponentialRampToValueAtTime(68,t+.38);
 osc.connect(env);osc.start(t);osc.stop(t+.5);
 const white=track(actx.createBufferSource()),filter=actx.createBiquadFilter(),n=envelope(3,.063*force,t,.30);
 white.buffer=noise(.31);filter.type='lowpass';filter.frequency.value=750;white.connect(filter);filter.connect(n);white.start(t);white.stop(t+.31);
 $('drumHead').style.setProperty('--strike-motion',(1+force*5).toFixed(1)+'px');
 $('drumHead').classList.remove('hit');void $('drumHead').offsetWidth;$('drumHead').classList.add('hit');
 $('response').textContent=(S.force>=55?'Stronger':'Gentler')+' beat: '+(S.force>=55?'larger':'smaller')+' signal amplitude. The model pitch pattern stays the same.';
 $('question').textContent='What changes when the drum is hit harder?';
}
function hunt(){
 if(!startAudio())return;
 const t=actx.currentTime+.01,id=S.source,src=SOUNDS[id];
 if(id===0){
  const env=envelope(3,.10,t,2.25);
  [[1,1],[2.01,.40],[2.7,.20],[4.05,.08]].forEach(([n,v])=>{
   const o=track(actx.createOscillator()),g=actx.createGain();o.type='sine';o.frequency.value=440*n;g.gain.value=v;o.connect(g);g.connect(env);o.start(t);o.stop(t+2.3);
  });
 }else if(id===1){
  const o=track(actx.createOscillator()),filter=actx.createBiquadFilter(),env=envelope(3,.09,t,2.0);
  o.type='sawtooth';o.frequency.value=175;filter.type='lowpass';filter.frequency.value=850;o.connect(filter);filter.connect(env);o.start(t);o.stop(t+2.06);
 }else{
  const white=track(actx.createBufferSource()),filter=actx.createBiquadFilter(),env=envelope(3,.16,t,.16);
  white.buffer=noise(.2);filter.type='bandpass';filter.frequency.value=1900;white.connect(filter);filter.connect(env);white.start(t);white.stop(t+.2);
 }
 $('huntSource').classList.remove('vibrating');void $('huntSource').offsetWidth;$('huntSource').classList.add('vibrating');
 clearTimeout(huntMotionTimer);huntMotionTimer=setTimeout(()=>$('huntSource').classList.remove('vibrating'),id===2?220:2050);
 $('question').textContent='Was this example short or long?';
 $('response').textContent=src.name+': '+src.explain+(S.duration?' '+(S.duration===src.length?'That was a good observation!':'Listen again to when the sound ends.'):'');
}
function render(){
 document.querySelectorAll('[data-mode]').forEach(b=>{const selected=b.dataset.mode===S.mode;b.classList.toggle('active',selected);if(selected)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
 const ss=S.mode==='strings',dd=S.mode==='drum',hh=S.mode==='hunt';
 $('stringPhoto').hidden=!ss;$('stringWaveStack').hidden=!ss;$('stringControls').hidden=!ss;$('movementLab').hidden=!ss;$('airDemo').hidden=!ss;
 $('drumScene').hidden=!dd;$('drumControls').hidden=!dd;$('huntScene').hidden=!hh;$('huntControls').hidden=!hh;
 $('singleWave').hidden=ss;$('pitchChoices').hidden=!ss;$('signalDetails').open=!ss;
 const info={
 strings:['1','CHANGE THE TENSION','What happens when you tighten the string?','All three start at the same pitch. Tune one string, then compare.','Compared with its starting pitch?','Try a loose string, then tighten it and pluck again.'],
 drum:['2','CHANGE THE FORCE','What happens when you hit the drum harder?','Try a gentle tap, then a strong beat. Compare the signal height.','What changes about the sound?','Try quiet and loud beats. Watch the waveform height.'],
 hunt:['3','LISTEN TO SOURCES','Which sounds last longer?','Choose a model sound. Listen to when it starts and ends.','Was this example short or long?','Compare the duration of these synthesized examples.']
 }[S.mode];
 $('stepNum').textContent=info[0];$('stepName').textContent=info[1];$('prompt').textContent=info[2];$('instructions').textContent=info[3];$('question').textContent=info[4];$('response').textContent=info[5];
 $('waveTitle').textContent=dd?'Drum audio signal':'Sound Hunt audio signal';if(hh)renderSource();
}
function renderSource(){
 const src=SOUNDS[S.source];$('huntSource').textContent=src.icon;$('huntName').textContent=src.name;
 document.querySelectorAll('[data-source]').forEach(b=>{const selected=Number(b.dataset.source)===S.source;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 document.querySelectorAll('[data-duration]').forEach(b=>{const selected=b.dataset.duration===S.duration;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
}
function canvasContext(el){
 const box=el.getBoundingClientRect();if(!box.width||!box.height)return null;
 const d=Math.min(devicePixelRatio||1,2),w=Math.round(box.width*d),h=Math.round(box.height*d);
 if(el.width!==w||el.height!==h){el.width=w;el.height=h;}
 const c=el.getContext('2d');c.clearRect(0,0,w,h);return {c,w,h,d};
}
function drawPhysical(time,active){
 const v=canvasContext($('physicalString'));if(!v)return;const {c,w,h,d}=v;
 const index=active?motion.index:S.string,hz=active?motion.hz:currentFrequency();
 const left=w*.045,right=w*.955,y0=h*.52,amplitude=h*.31;
 c.strokeStyle='#ffffff55';c.setLineDash([3*d,3*d]);c.lineWidth=d;c.beginPath();c.moveTo(left,y0);c.lineTo(right,y0);c.stroke();
 c.strokeStyle=COLORS[index]+'55';
 for(const dir of [-1,1]){c.beginPath();for(let i=0;i<=100;i++){const p=i/100,x=left+(right-left)*p,y=y0+dir*amplitude*Math.sin(Math.PI*p);if(i)c.lineTo(x,y);else c.moveTo(x,y);}c.stroke();}c.setLineDash([]);
 c.strokeStyle=COLORS[index];c.lineWidth=STRINGS[index].width*d;c.lineCap='round';c.beginPath();
 for(let i=0;i<=100;i++){const p=i/100,x=left+(right-left)*p,y=y0+(active?M.stringDisplacement(p,time,hz,amplitude):0);if(i)c.lineTo(x,y);else c.moveTo(x,y);}c.stroke();
 c.fillStyle='#f5f9fc';for(const x of [left,right]){c.beginPath();c.arc(x,y0,3*d,0,Math.PI*2);c.fill();}
}
function drawAir(time,active){
 const v=canvasContext($('airParticles'));if(!v)return;const {c,w,h,d}=v;
 const hz=active?motion.hz:currentFrequency(),left=28*d,right=w-14*d,span=2.4,scale=(right-left)/span;
 const cols=77,rows=5,marked=24,offset=x=>active?M.particleDisplacement(x,time,hz):0;
 // Source is schematic: one vibrating surface of the instrument body.
 const sourceMove=offset(0)*scale;
 c.fillStyle='#d3b383';c.fillRect(9*d+sourceMove,16*d,5*d,h-31*d);
 c.strokeStyle='#8eafc6';c.lineWidth=d;c.beginPath();c.moveTo(12*d,h-10*d);c.lineTo(w-12*d,h-10*d);c.stroke();
 c.beginPath();c.moveTo(w-18*d,h-14*d);c.lineTo(w-12*d,h-10*d);c.lineTo(w-18*d,h-6*d);c.stroke();
 // Light density bands are calculated from the actual spacing in this model.
 for(let i=0;i<cols-1;i++){
  const x1=span*i/(cols-1),x2=span*(i+1)/(cols-1),a=left+(x1+offset(x1))*scale,b=left+(x2+offset(x2))*scale;
  const compression=(x2-x1)/Math.max(.0001,x2+offset(x2)-x1-offset(x1));
  c.fillStyle='rgba(69,207,241,'+Math.max(0,Math.min(.22,(compression-1)*.22))+')';c.fillRect(a,9*d,Math.max(0,b-a),h-28*d);
 }
 for(let row=0;row<rows;row++)for(let i=0;i<cols;i++){
  const rest=span*i/(cols-1),x=left+(rest+offset(rest))*scale,y=(20+(row*(h/d-51)/(rows-1)))*d;
  c.fillStyle='#9edced';c.beginPath();c.arc(x,y,1.4*d,0,Math.PI*2);c.fill();
  if(row===2&&i===marked){
   const rx=left+rest*scale;c.strokeStyle='#ffdd76';c.lineWidth=1.5*d;c.beginPath();c.moveTo(rx-11*d,y);c.lineTo(rx+11*d,y);c.stroke();
   c.fillStyle='#ffdd76';c.beginPath();c.arc(x,y,3*d,0,Math.PI*2);c.fill();c.strokeStyle='#fff9d3';c.beginPath();c.arc(x,y,5.5*d,0,Math.PI*2);c.stroke();
  }
 }
 $('airParticles').dataset.modelTime=time.toFixed(6);
}
function drawSignal(canvas,index){
 if(canvas.closest('[hidden]')||!$('signalDetails').open)return;
 const v=canvasContext(canvas);if(!v)return;const {c,w,h,d}=v;
 c.strokeStyle='#98c0db33';c.lineWidth=d;for(let n=1;n<5;n++){const y=h*n/5;c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
 let samples=null,from=0,count=1,energy=0;
 if(analysers[index]){
  const data=new Float32Array(analysers[index].fftSize);analysers[index].getFloatTimeDomainData(data);
  count=Math.round(actx.sampleRate*.012);energy=Math.sqrt(data.reduce((sum,v)=>sum+v*v,0)/data.length);
  if(energy>.0005){samples=data;for(let j=1;j<data.length-count;j++)if(data[j-1]<=0&&data[j]>0){from=j;break;}}
 }
 canvas.dataset.signalRms=energy.toFixed(6);canvas.dataset.windowMs='12';
 c.beginPath();c.lineCap='round';c.lineWidth=2*d;c.strokeStyle=COLORS[index];
 if(!samples){c.moveTo(0,h/2);c.lineTo(w,h/2);}
 else for(let i=0;i<count;i++){const x=i/(count-1)*w,y=h*(.5-samples[from+i]*1.5);if(i)c.lineTo(x,y);else c.moveTo(x,y);}
 c.stroke();
}
let lastFrame=0;
function frame(now){
 requestAnimationFrame(frame);if(now-lastFrame<30||document.hidden)return;lastFrame=now;
 if(S.mode==='strings'){
  const elapsed=now-motion.start,active=motion.start>0&&elapsed>=0&&elapsed<motion.duration;
  const time=active?M.slowedTime(elapsed/1000):0;
  drawPhysical(time,active);drawAir(time,active);
  const label=active?'Replay: '+time.toFixed(3)+' s of vibration · audio plays at normal speed':motion.start?'Replay finished · pluck again':'Pluck to start the slow-motion replay';
  if($('slowTime').textContent!==label)$('slowTime').textContent=label;
 }
 for(let i=0;i<3;i++)drawSignal($('wave'+i),i);drawSignal($('waveSingle'),3);
}
function closeNotes(){$('teacherOverlay').hidden=true;$('teacher').focus();}
$('teacher').onclick=()=>{$('teacherOverlay').hidden=false;$('closeTeacher').focus();};$('closeTeacher').onclick=closeNotes;
$('teacherOverlay').onclick=e=>{if(e.target===$('teacherOverlay'))closeNotes();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('teacherOverlay').hidden)closeNotes();});
$('pluck').onclick=()=>pluck();document.querySelectorAll('[data-string]').forEach(b=>b.onclick=()=>pluck(Number(b.dataset.string)));
$('tension').oninput=e=>{
 S.tension=Number(e.target.value);S.tensions[S.string]=S.tension;stopAudio();motion.start=0;
 $('tensionValue').textContent=S.tension<50?'Looser':S.tension>50?'Tighter':'Starting tension';refreshFrequency();
 $('response').textContent='New tension selected. Pluck the same string to compare its pitch.';
};
document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{S.pitch=b.dataset.answer;document.querySelectorAll('[data-answer]').forEach(n=>{n.classList.toggle('selected',n===b);n.setAttribute('aria-pressed',String(n===b));});$('response').textContent='You predicted '+S.pitch+'. Pluck the string to test it.';});
$('force').oninput=e=>{S.force=Number(e.target.value);$('forceValue').textContent=S.force<=30?'Gentle':S.force>=70?'Strong':'Medium';};
$('hitDrum').onclick=hitDrum;$('drumTouch').onclick=hitDrum;$('playHunt').onclick=hunt;
document.querySelectorAll('[data-source]').forEach(b=>b.onclick=()=>{S.source=Number(b.dataset.source);S.duration=null;renderSource();hunt();});
document.querySelectorAll('[data-duration]').forEach(b=>b.onclick=()=>{S.duration=b.dataset.duration;renderSource();$('response').textContent='You predicted '+S.duration+'. Press PLAY SOUND to check.';});
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{stopAudio();motion.start=0;clearTimeout(huntMotionTimer);$('huntSource').classList.remove('vibrating');S.mode=b.dataset.mode;S.pitch=null;S.duration=null;render();document.querySelector('.work-area').scrollIntoView({block:'start',behavior:'smooth'});});
$('makeOwn').onclick=async()=>{
 const button=$('makeOwn');button.disabled=true;$('downloadStatus').textContent='Preparing your offline copy…';
 try{
  const [style,model,script,blob]=await Promise.all([
   fetch('./style.css?v=5').then(r=>{if(!r.ok)throw Error('style');return r.text();}),
   fetch('./model.js?v=5').then(r=>{if(!r.ok)throw Error('model');return r.text();}),
   fetch('./app.js?v=5').then(r=>{if(!r.ok)throw Error('script');return r.text();}),
   fetch('./assets/string-box.webp').then(r=>{if(!r.ok)throw Error('image');return r.blob();})
  ]);
  const image=await new Promise((ok,bad)=>{const f=new FileReader();f.onload=()=>ok(f.result);f.onerror=bad;f.readAsDataURL(blob);});
  const copy=document.documentElement.cloneNode(true);copy.querySelectorAll('link[rel="stylesheet"],link[rel="preconnect"]').forEach(n=>n.remove());copy.querySelectorAll('script[src]').forEach(n=>n.remove());copy.querySelector('#teacherOverlay').hidden=true;copy.querySelector('#makeOwn').disabled=false;copy.querySelector('#downloadStatus').textContent='';
  const node=document.createElement('style');node.textContent=style.replace(/url\(['"]?\.\/assets\/string-box\.webp['"]?\)/g,'url("'+image+'")');copy.querySelector('head').append(node);
  for(const source of [model,script]){const sc=document.createElement('script');sc.textContent=source.replace(/<\/script/gi,'<\\/script');copy.querySelector('body').append(sc);}
  const out='<!doctype html>\n'+copy.outerHTML,u=URL.createObjectURL(new Blob([out],{type:'text/html;charset=utf-8'})),a=document.createElement('a');a.href=u;a.download='vibration-station.html';a.click();setTimeout(()=>URL.revokeObjectURL(u),30000);
  $('downloadStatus').textContent='Offline HTML copy downloaded.';
 }catch(err){$('downloadStatus').textContent='Offline download unavailable. Check your connection.';}
 button.disabled=false;
};
render();selectString(0);requestAnimationFrame(frame);
})();
