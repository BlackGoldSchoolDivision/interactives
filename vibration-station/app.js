(()=>{
'use strict';
const $=id=>document.getElementById(id);
const COLORS=['#ff6a65','#ffe34e','#39bafa','#83d9fd'];
const STRINGS=[{name:'Red',hz:124,timbre:[1,.06,.03],decay:1.5},{name:'Yellow',hz:248,timbre:[1,.20,.10],decay:1.25},{name:'Blue',hz:496,timbre:[1,.37,.17],decay:1.05}];
const SOUNDS=[{name:'Bell',icon:'🔔',length:'long',explain:'The bell keeps ringing after the strike.'},{name:'Bee',icon:'🐝',length:'long',explain:'A bee buzzes while its wings continue vibrating.'},{name:'Clap',icon:'👏',length:'short',explain:'A handclap stops quickly.'}];
const S={mode:'strings',string:0,tension:50,force:50,source:0,pitch:null,duration:null};
let actx,analysers=[],master,raf,huntMotionTimer;
let motion={index:0,start:0,hz:124,duration:1500};
function startAudio(){
 try{
  if(!actx){
   const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('WebAudio missing');
   actx=new Audio();master=actx.createGain();master.gain.value=.65;master.connect(actx.destination);
   for(let i=0;i<4;i++){const a=actx.createAnalyser();a.fftSize=2048;a.smoothingTimeConstant=.07;a.connect(master);analysers.push(a);}
  }
  if(actx.state==='suspended')actx.resume();
  return true;
 }catch(e){$('response').textContent='Sound is not available on this device or browser.';return false;}
}
function envelope(channel,peak,time,fade){
 const g=actx.createGain();g.gain.setValueAtTime(.0001,time);g.gain.linearRampToValueAtTime(peak,time+.008);g.gain.exponentialRampToValueAtTime(.0001,time+fade);g.connect(analysers[channel]);return g;
}
function noise(seconds){
 const b=actx.createBuffer(1,Math.round(actx.sampleRate*seconds),actx.sampleRate),a=b.getChannelData(0);
 for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;return b;
}
function selectString(index){S.string=index;document.querySelectorAll('[data-string]').forEach(b=>{const y=Number(b.dataset.string)===index;b.classList.toggle('active',y);b.setAttribute('aria-pressed',String(y));});$('motionCaption').textContent=STRINGS[index].name+' band · slow-motion movement';}
function pluck(index=S.string){
 if(!startAudio())return;selectString(index);

 const t=actx.currentTime+.01,spec=STRINGS[index],f=spec.hz*Math.sqrt(.5+S.tension/100);
 const env=envelope(index,.17,t,spec.decay);
 spec.timbre.forEach((volume,i)=>{
   const osc=actx.createOscillator(),v=actx.createGain();
   osc.type=i===0?'triangle':'sine';osc.frequency.value=f*(i+1);v.gain.value=volume;
   osc.connect(v);v.connect(env);osc.start(t);osc.stop(t+spec.decay+.05);
 });
 motion={index,start:performance.now(),hz:f,duration:1500};
 $('physicalString').dataset.vibrationHz=String(Math.round(f));
 $('pluckingFlash').classList.remove('active');void $('pluckingFlash').offsetWidth;$('pluckingFlash').classList.add('active');
 const pitch=f<205?'low':f<355?'middle':'high';
 $('physicalString').dataset.pitch=pitch;
 $('question').textContent='Is the pitch low, middle, or high?';
 $('response').textContent=STRINGS[index].name+' string: '+Math.round(f)+' vibrations each second — '+pitch+' pitch. '+(S.pitch?(S.pitch===pitch?'Your prediction matched!':'Change the tension and listen again.'):'Compare the strings.');
}
function hitDrum(){
 if(!startAudio())return;
 const t=actx.currentTime+.01,force=.12+.88*S.force/100;
 const osc=actx.createOscillator(),env=envelope(3,.22*force,t,.48);
 osc.type='sine';osc.frequency.setValueAtTime(180,t);osc.frequency.exponentialRampToValueAtTime(68,t+.38);
 osc.connect(env);osc.start(t);osc.stop(t+.5);
 const white=actx.createBufferSource(),filter=actx.createBiquadFilter(),n=envelope(3,.063*force,t,.30);
 white.buffer=noise(.31);filter.type='lowpass';filter.frequency.value=750;white.connect(filter);filter.connect(n);white.start(t);white.stop(t+.31);
 $('drumHead').classList.remove('hit');void $('drumHead').offsetWidth;$('drumHead').classList.add('hit');
 $('response').textContent=S.force>=55?'Stronger beat: bigger sound-wave amplitude.':'Gentler beat: smaller sound-wave amplitude.';
 $('question').textContent='What changes when the drum is hit harder?';
}
function hunt(){
 if(!startAudio())return;
 const t=actx.currentTime+.01,id=S.source,src=SOUNDS[id];
 if(id===0){
  const env=envelope(3,.10,t,2.25);
  [[1,1],[2.01,.40],[2.7,.20],[4.05,.08]].forEach(([n,v])=>{
    const o=actx.createOscillator(),g=actx.createGain();o.type='sine';o.frequency.value=440*n;g.gain.value=v;o.connect(g);g.connect(env);o.start(t);o.stop(t+2.3);
  });
 }else if(id===1){
  const o=actx.createOscillator(),filter=actx.createBiquadFilter(),env=envelope(3,.09,t,2.0);
  o.type='sawtooth';o.frequency.value=175;filter.type='lowpass';filter.frequency.value=850;o.connect(filter);filter.connect(env);o.start(t);o.stop(t+2.06);
 }else{
  const white=actx.createBufferSource(),filter=actx.createBiquadFilter(),env=envelope(3,.16,t,.16);
  white.buffer=noise(.2);filter.type='bandpass';filter.frequency.value=1900;white.connect(filter);filter.connect(env);white.start(t);white.stop(t+.2);
 }
 $('huntSource').classList.remove('vibrating');void $('huntSource').offsetWidth;$('huntSource').classList.add('vibrating');
 clearTimeout(huntMotionTimer);huntMotionTimer=setTimeout(()=>$('huntSource').classList.remove('vibrating'),id===2?220:2050);
 $('question').textContent='Was the sound short or long?';
 $('response').textContent=src.name+': '+src.explain+(S.duration?' '+(S.duration===src.length?'That was a good observation!':'Listen again to when the sound ends.'):'');
}
function render(){
 document.querySelectorAll('[data-mode]').forEach(b=>{const y=b.dataset.mode===S.mode;b.classList.toggle('active',y);b.setAttribute('aria-current',String(y));});
 const ss=S.mode==='strings',dd=S.mode==='drum',hh=S.mode==='hunt';
 $('stringPhoto').hidden=!ss;$('stringWaveStack').hidden=!ss;$('stringControls').hidden=!ss;
 $('drumScene').hidden=!dd;$('drumControls').hidden=!dd;
 $('huntScene').hidden=!hh;$('huntControls').hidden=!hh;
 $('singleWave').hidden=ss;$('pitchChoices').hidden=!ss;
 const info={
 strings:['1','CHANGE THE TENSION','What happens when you tighten the string?','Move the slider, pluck a string, and hear how its pitch changes.','Which pitch do you hear?','Try a loose string, then tighten it and pluck again.'],
 drum:['2','CHANGE THE FORCE','What happens when you hit the drum harder?','Slide from a gentle tap to a strong beat. Listen and look at the wave.','What changes about the sound?','Try quiet and loud beats. Watch the waveform height.'],
 hunt:['3','LISTEN TO SOURCES','Which sounds last longer?','Choose a source. Listen and watch the actual sound wave.','Is the sound short or long?','Listen to a source, then compare the duration.']
 }[S.mode];
 $('stepNum').textContent=info[0];$('stepName').textContent=info[1];$('prompt').textContent=info[2];
 $('instructions').textContent=info[3];$('question').textContent=info[4];$('response').textContent=info[5];
 $('waveTitle').textContent=dd?'Drum sound wave':'Sound Hunt waveform';
 if(hh)renderSource();
}
function renderSource(){
 let src=SOUNDS[S.source];$('huntSource').textContent=src.icon;$('huntName').textContent=src.name;
 document.querySelectorAll('[data-source]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.source)===S.source));
 document.querySelectorAll('[data-duration]').forEach(b=>{const y=b.dataset.duration===S.duration;b.classList.toggle('selected',y);b.setAttribute('aria-pressed',String(y));});
}

// Physical transverse string motion in SLOW MOTION with fixed endpoints.
// Not the waveform of air pressure recorded by the sound analyzer.
function drawPhysical(){
 const el=$('physicalString'),box=el.getBoundingClientRect();
 if(!box.width||!box.height)return;
 const d=Math.min(devicePixelRatio||1,2),w=Math.round(box.width*d),h=Math.round(box.height*d);
 if(el.width!==w||el.height!==h){el.width=w;el.height=h;}
 const c=el.getContext('2d'),elapsed=performance.now()-motion.start;
 const active=motion.start>0&&elapsed>=0&&elapsed<motion.duration;
 const amplitude=active?Math.pow(1-elapsed/motion.duration,1.9)*h*.3:0;
 // The real frequency (>100 Hz) cannot be portrayed directly at 60 fps.
 const slowRate=Math.min(5,1.4+motion.hz/145);
 const phase=elapsed/1000*2*Math.PI*slowRate;
 const left=w*.07,right=w*.93,y0=h*.53;
 c.clearRect(0,0,w,h);
 c.strokeStyle='#ffffff55';c.setLineDash([3*d,3*d]);c.lineWidth=1;
 c.beginPath();c.moveTo(left,y0);c.lineTo(right,y0);c.stroke();c.setLineDash([]);
 c.strokeStyle=COLORS[motion.index];c.lineWidth=2.5*d;c.shadowColor=COLORS[motion.index];c.shadowBlur=6*d;
 c.beginPath();
 for(let i=0;i<=100;i++){
  const t=i/100,x=left+(right-left)*t,y=y0+amplitude*Math.sin(Math.PI*t)*Math.sin(phase);
  if(!i)c.moveTo(x,y);else c.lineTo(x,y);
 }
 c.stroke();c.shadowBlur=0;
 c.fillStyle='#f5f9fc';c.beginPath();c.arc(left,y0,2.5*d,0,Math.PI*2);c.arc(right,y0,2.5*d,0,Math.PI*2);c.fill();
}
function draw(canvas,index){
 if(canvas.closest('[hidden]'))return;
 const box=canvas.getBoundingClientRect();if(!box.width||!box.height)return;
 const d=Math.min(2,devicePixelRatio||1),w=Math.round(box.width*d),h=Math.round(box.height*d);
 if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
 const c=canvas.getContext('2d');c.clearRect(0,0,w,h);
 c.strokeStyle='#98c0db33';c.lineWidth=1;
 for(let n=1;n<5;n++){const yy=h*n/5;c.beginPath();c.moveTo(0,yy);c.lineTo(w,yy);c.stroke();}
 let samples=null;
 if(analysers[index]){
  const b=new Uint8Array(analysers[index].fftSize);
  analysers[index].getByteTimeDomainData(b);
  const energy=b.reduce((a,v)=>a+Math.abs(v-128),0)/b.length;
  if(energy>1)samples=b;
 }
 c.beginPath();c.lineCap='round';c.lineWidth=Math.max(2,w/180);c.strokeStyle=COLORS[index];
 c.shadowColor=COLORS[index];c.shadowBlur=7;
 if(!samples){c.moveTo(0,h/2);c.lineTo(w,h/2);}
 else for(let i=0;i<samples.length;i+=2){
  const xx=i/(samples.length-1)*w,yy=Math.max(h*.04,Math.min(h*.96,(.5+(samples[i]-128)/128*1.3)*h));
  if(i===0)c.moveTo(xx,yy);else c.lineTo(xx,yy);
 }
 c.stroke();c.shadowBlur=0;
}
function frame(){drawPhysical();for(let i=0;i<3;i++)draw($('wave'+i),i);draw($('waveSingle'),3);requestAnimationFrame(frame);}
function closeNotes(){$('teacherOverlay').hidden=true;$('teacher').focus();}
$('teacher').onclick=()=>{$('teacherOverlay').hidden=false;$('closeTeacher').focus();};
$('closeTeacher').onclick=closeNotes;
$('teacherOverlay').onclick=e=>{if(e.target===$('teacherOverlay'))closeNotes();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('teacherOverlay').hidden)closeNotes();});
$('pluck').onclick=()=>pluck();
document.querySelectorAll('[data-string]').forEach(b=>b.onclick=()=>pluck(Number(b.dataset.string)));
$('tension').oninput=e=>{S.tension=Number(e.target.value);$('tensionValue').textContent=S.tension<=30?'Loose':S.tension>=70?'Tight':'Medium';};
document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{S.pitch=b.dataset.answer;document.querySelectorAll('[data-answer]').forEach(n=>n.classList.toggle('selected',n===b));$('response').textContent='Good prediction! Pluck the string to test it.';});
$('force').oninput=e=>{S.force=Number(e.target.value);$('forceValue').textContent=S.force<=30?'Gentle':S.force>=70?'Strong':'Medium';};
$('hitDrum').onclick=hitDrum;$('drumTouch').onclick=hitDrum;$('playHunt').onclick=hunt;
document.querySelectorAll('[data-source]').forEach(b=>b.onclick=()=>{S.source=Number(b.dataset.source);S.duration=null;renderSource();hunt();});
document.querySelectorAll('[data-duration]').forEach(b=>b.onclick=()=>{S.duration=b.dataset.duration;renderSource();$('response').textContent='You predicted '+S.duration+'. Press PLAY SOUND to check.';});
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{S.mode=b.dataset.mode;S.pitch=null;S.duration=null;render();document.querySelector('.work-area').scrollIntoView({block:'start',behavior:'smooth'});});
$('makeOwn').onclick=async()=>{
 const button=$('makeOwn');button.disabled=true;$('downloadStatus').textContent='Preparing your offline copy…';
 try{
  const [style,script,blob]=await Promise.all([
    fetch('./style.css?v=3').then(r=>{if(!r.ok)throw Error('style');return r.text();}),
    fetch('./app.js?v=3').then(r=>{if(!r.ok)throw Error('script');return r.text();}),
    fetch('./assets/string-box.webp').then(r=>{if(!r.ok)throw Error('image');return r.blob();})
  ]);
  const image=await new Promise((ok,bad)=>{const f=new FileReader();f.onload=()=>ok(f.result);f.onerror=bad;f.readAsDataURL(blob);});
  const copy=document.documentElement.cloneNode(true);
  copy.querySelector('link[rel="stylesheet"]').remove();copy.querySelector('script[src]').remove();copy.querySelector('#teacherOverlay').hidden=true;
  const node=document.createElement('style');
  node.textContent=style.replace(/url\(['"]?\.\/assets\/string-box\.webp['"]?\)/g,'url("'+image+'")');copy.querySelector('head').append(node);
  const sc=document.createElement('script');sc.textContent=script.replace(/<\/script/gi,'<\\/script');copy.querySelector('body').append(sc);
  const out='<!doctype html>\n'+copy.outerHTML,u=URL.createObjectURL(new Blob([out],{type:'text/html;charset=utf-8'})),a=document.createElement('a');
  a.href=u;a.download='vibration-station.html';a.click();setTimeout(()=>URL.revokeObjectURL(u),30000);
  $('downloadStatus').textContent='Offline HTML copy downloaded.';
 }catch(err){$('downloadStatus').textContent='Offline download unavailable. Check your connection.';}
 button.disabled=false;
};
render();selectString(0);requestAnimationFrame(frame);
})();
