(function(){
  'use strict';
  const M=window.Ladders,P=window.LadderPDF,$=id=>document.getElementById(id);let level='explorer',mode='guided',puzzle=M.puzzles[0],path=[puzzle.words[0]],spoken=false,hints=0;
  const memory=new Map(),positions={starter:0,explorer:0,expert:0};
  const key=()=>puzzle.id+':'+mode;
  function save(){memory.set(key(),{path:[...path],guess:$('guess').value,hints});}
  function speak(s){if(!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(s);u.lang='en-CA';u.rate=.85;speechSynthesis.speak(u);}catch(_){}}
  const complete=()=>path.at(-1)===puzzle.words[5]&&(mode==='free'||path.length===6);
  const say=()=>complete()?'Ladder complete!':mode==='guided'?puzzle.clues[path.length]:'Reach '+puzzle.words[5]+' by changing one letter each step.';
  function feedback(text,type=''){$('feedback').textContent=text;$('feedback').className='feedback '+type;}
  function load(p){save();puzzle=p;const old=memory.get(key());path=old?[...old.path]:[p.words[0]];hints=old?.hints||0;$('guess').value=old?.guess||'';render();feedback('Change one letter. Make a real word.');}
  function renderEntry(){
    const guess=$('guess').value.toUpperCase(),last=path.at(-1);$('entryTiles').replaceChildren();for(let i=0;i<puzzle.words[0].length;i++){const span=document.createElement('span');span.className='tile'+(guess[i]&&guess[i]!==last[i]?' changed':'');span.textContent=guess[i]||'';$('entryTiles').append(span);}
    $('changePreview').textContent=last+' → '+(guess||'…');
  }
  function render(){
    $('mission').textContent=puzzle.words[0]+' → '+puzzle.words[5];$('grade').textContent=M.levels[level].grades;
    for(const b of document.querySelectorAll('[data-level]'))b.setAttribute('aria-pressed',String(b.dataset.level===level));for(const b of document.querySelectorAll('[data-mode]'))b.setAttribute('aria-pressed',String(b.dataset.mode===mode));
    const done=complete(),n=mode==='guided'?6:Math.max(6,path.length+(done?0:1)),rows=[];
    for(let i=0;i<n;i++){rows.push({word:path[i]||(i===n-1?puzzle.words[5]:''),filled:i<path.length,goal:i===n-1,current:i===path.length-1,index:i});}
    $('ladder').replaceChildren();$('ladder').style.setProperty('--letters',puzzle.words[0].length);
    for(const r of rows.reverse()){
      const div=document.createElement('div');div.className='rung'+(r.filled?'':' empty')+(r.goal?' goal':'')+(r.current?' current':'');div.dataset.step=r.index;div.setAttribute('aria-label','Word '+(r.index+1)+': '+(r.filled?r.word:r.goal?'goal '+r.word:'not filled yet'));div.style.setProperty('--shift',((r.index-(n-1)/2)*10)+'px');
      const number=document.createElement('span');number.className='rung-number';number.textContent=r.index+1;div.append(number);
      for(let j=0;j<puzzle.words[0].length;j++){const t=document.createElement('span');t.className='tile';t.textContent=r.word[j]||'';div.append(t);}
      if(r.index===0||r.goal){const tag=document.createElement('span');tag.className='rung-tag';tag.textContent=r.index===0?'START':'GOAL';div.append(tag);}$('ladder').append(div);
    }
    $('ladder').dataset.current=path.at(-1);$('ladder').dataset.count=path.length;
    $('stepLabel').textContent=done?'SUMMIT REACHED':mode==='guided'?'WORD '+(path.length+1)+' OF 6':'YOUR OWN ROUTE';$('editorTitle').textContent=done?'You made it!':'Your next word';$('clue').textContent=say();
    $('progress').textContent=mode==='guided'?'Word '+path.length+' / 6':(path.length-1)+' changes';$('modeNote').textContent=mode==='guided'?'Follow five clues to make six words.':'Other valid routes can work too. Use any number of steps.';
    $('guess').maxLength=puzzle.words[0].length;$('guess').disabled=done;$('addStep').disabled=done;$('hint').disabled=done;$('undo').disabled=path.length<2;$('nextComplete').hidden=!done;renderEntry();
  }
  $('wordForm').addEventListener('submit',e=>{e.preventDefault();if(complete())return;const r=M.check(puzzle,path,$('guess').value,mode);if(!r.ok){feedback(r.message,'bad');return;}path.push(r.word);$('guess').value='';hints=0;render();feedback(r.complete?(mode==='guided'?'Six words, one successful climb!':'Summit reached in '+(path.length-1)+' changes!'):'Good step: '+r.word+'.','good');if(spoken)speak(r.complete?'Ladder complete!':r.word+'. '+say());save();if(!r.complete)$('guess').focus({preventScroll:true});});
  $('guess').addEventListener('input',()=>{$('guess').value=$('guess').value.toUpperCase().replace(/[^A-Z]/g,'');renderEntry();save();});
  $('undo').addEventListener('click',()=>{if(path.length<2)return;path.pop();$('guess').value='';hints=0;render();feedback('Try another step from '+path.at(-1)+'.');save();});
  $('hint').addEventListener('click',()=>{const h=M.hint(puzzle,path,mode);if(!h){feedback('No route found without revisiting a word. Undo a step to try another route.');return;}hints++;const text=hints===1?'Try changing letter '+h.position+'.':'Change letter '+h.position+' to '+h.letter+'.';feedback(text);if(spoken)speak(text);save();});
  function next(){const pool=M.puzzles.filter(p=>p.level===level);positions[level]=(pool.findIndex(p=>p.id===puzzle.id)+1)%pool.length;load(pool[positions[level]]);}
  $('newLadder').addEventListener('click',next);$('nextComplete').addEventListener('click',next);
  $('restartLadder').addEventListener('click',()=>{path=[puzzle.words[0]];hints=0;$('guess').value='';render();feedback('Start again from '+path[0]+'.');save();});
  for(const b of document.querySelectorAll('[data-level]'))b.addEventListener('click',()=>{save();level=b.dataset.level;const pool=M.puzzles.filter(p=>p.level===level);puzzle=pool[positions[level]];const old=memory.get(key());path=old?[...old.path]:[puzzle.words[0]];hints=old?.hints||0;$('guess').value=old?.guess||'';render();feedback(M.levels[level].description);});
  for(const b of document.querySelectorAll('[data-mode]'))b.addEventListener('click',()=>{save();mode=b.dataset.mode;const old=memory.get(key());path=old?[...old.path]:[puzzle.words[0]];hints=old?.hints||0;$('guess').value=old?.guess||'';render();feedback(mode==='free'?'Find your own route. Every step still changes one letter.':'Follow the clue for each new word.');});
  $('sound').addEventListener('click',()=>{spoken=!spoken;$('sound').setAttribute('aria-pressed',String(spoken));$('sound').setAttribute('aria-label',spoken?'Turn spoken clues off':'Turn spoken clues on');if(spoken)speak(say());else if('speechSynthesis'in window)speechSynthesis.cancel();});$('hearClue').addEventListener('click',()=>speak(say()));
  const open=d=>{if(!d.open)d.showModal();};for(const b of document.querySelectorAll('[data-close]'))b.addEventListener('click',()=>b.closest('dialog').close());$('help').addEventListener('click',()=>open($('helpDialog')));$('notes').addEventListener('click',()=>open($('notesDialog')));
  function fillPdfList(selected){const l=$('pdfLevel').value;$('pdfPuzzle').replaceChildren();for(const p of M.puzzles.filter(p=>p.level===l)){const o=document.createElement('option');o.value=p.id;o.textContent=p.words[0]+' → '+p.words[5];$('pdfPuzzle').append(o);}if(selected&&M.puzzles.find(p=>p.id===selected&&p.level===l))$('pdfPuzzle').value=selected;$('pdfLevelNote').textContent=M.levels[l].description;printCount();}
  function selection(){return $('pdfScope').value==='pack'?M.puzzles.filter(p=>p.level===$('pdfLevel').value):[M.puzzles.find(p=>p.id===$('pdfPuzzle').value)];}
  function printCount(){const n=selection().length,key=$('includeKey').checked;$('printCount').textContent=n+' student '+(n===1?'page':'pages')+(key?' + '+n+' separate answer-key '+(n===1?'page':'pages'):'');$('pdfPuzzle').disabled=$('pdfScope').value==='pack';}
  $('teacherPdf').addEventListener('click',()=>{$('pdfLevel').value=level;fillPdfList(puzzle.id);$('pdfStatus').textContent='';open($('pdfDialog'));});$('pdfLevel').addEventListener('change',()=>fillPdfList());$('pdfPuzzle').addEventListener('change',printCount);$('pdfScope').addEventListener('change',printCount);$('includeKey').addEventListener('change',printCount);
  $('savePdf').addEventListener('click',()=>{try{const ps=selection(),doc=P.build(ps,{answerKey:$('includeKey').checked,paper:$('paper').value});doc.save(P.filename(ps));$('pdfStatus').textContent='PDF ready: '+$('printCount').textContent+'.';}catch(_){$('pdfStatus').textContent='The PDF could not be prepared. Please try again.';}});
  function makePrint(){
    const holder=$('printOutput');holder.replaceChildren();for(const {puzzle:p,key}of P.pages(selection(),$('includeKey').checked)){
      const sheet=document.createElement('section');sheet.className='print-sheet';const top=document.createElement('div');top.className='paper-top';const h=document.createElement('h1');h.textContent=key?'Word Ladders · Answer key':'Word Ladders';const sub=document.createElement('div');sub.className='paper-sub';sub.textContent=M.levels[p.level].name+' · Six words, five changes';top.append(h,sub);sheet.append(top);
      const mission=document.createElement('div');mission.className='paper-mission';mission.textContent=p.words[0]+' → '+p.words[5];sheet.append(mission);if(!key){const name=document.createElement('div');name.className='paper-name';name.textContent='Name: __________________________   Date: ______________';sheet.append(name);}
      const directions=document.createElement('p');directions.className='paper-directions';directions.textContent='Start at the bottom. Change exactly one letter to follow each clue.';sheet.append(directions);
      for(let i=5;i>=0;i--){const row=document.createElement('div');row.className='paper-rung';const number=document.createElement('span');number.className='paper-number';number.textContent=i+1;const boxes=document.createElement('div');boxes.className='paper-boxes';for(const letter of p.words[i]){const b=document.createElement('span');b.className='paper-box';b.textContent=key||i===0?letter:'';boxes.append(b);}const clue=document.createElement('div');clue.className='paper-clue';const label=document.createElement('b');label.textContent=i===0?'START':i===5?'FINISH':'CLUE '+i;clue.append(label,document.createTextNode(i===0?'Your first word is given.':p.clues[i]));row.append(number,boxes,clue);sheet.append(row);}
      const f=document.createElement('div');f.className='paper-footer';f.textContent='Engaging Students · Black Gold School Division · '+(key?'Teacher answer key':'Student worksheet');sheet.append(f);holder.append(sheet);
    }
    let s=document.getElementById('paperSize');if(!s){s=document.createElement('style');s.id='paperSize';document.head.append(s);}s.textContent='@media print{@page{size:'+($('paper').value==='a4'?'A4':'letter')+' portrait}}';
  }
  $('printWorksheet').addEventListener('click',()=>{makePrint();window.print();});
  $('makeOwn').addEventListener('click',async()=>{
    $('makeOwn').disabled=true;$('downloadStatus').textContent='Preparing your copy…';
    try{const text=async f=>{const r=await fetch(f);if(!r.ok)throw Error(f);return r.text();};const names=['vendor/jspdf.umd.min.js?v=4.2.1','data.js?v=2','lexicon.js?v=1','model.js?v=1','vendor/print-fonts.js?v=1','pdf.js?v=1','app.js?v=2'];const [html,css,...scripts]=await Promise.all([text('index.html'),text('style.css?v=1'),...names.map(text)]);const image=await fetch('assets/mountains.webp').then(r=>r.blob());const data=await new Promise((resolve,reject)=>{const f=new FileReader();f.onload=()=>resolve(f.result);f.onerror=reject;f.readAsDataURL(image);});const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelector('link[rel=stylesheet]').remove();doc.querySelectorAll('script[src]').forEach(s=>s.remove());const style=doc.createElement('style');style.textContent=css.replaceAll('assets/mountains.webp',data);doc.head.append(style);for(const code of scripts){const s=doc.createElement('script');s.textContent=code.replace(/<\/script/gi,'<\\/script');doc.body.append(s);}doc.querySelector('#makeOwn').disabled=true;doc.querySelector('#makeOwn').textContent='Offline copy';const blob=new Blob(['<!doctype html>\n'+doc.documentElement.outerHTML],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='word-ladders.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),20000);$('downloadStatus').textContent='Your offline copy is ready.';}catch(_){$('downloadStatus').textContent='The copy could not download. Please try again.';}finally{$('makeOwn').disabled=false;}
  });
  render();
})();
