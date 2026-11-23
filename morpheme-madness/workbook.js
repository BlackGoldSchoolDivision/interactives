'use strict';
const activityNames={sort:'Word sort',sums:'Word sums',build:'Word building',matrix:'Word matrix',families:'Word families'};
const activities=l=>['sort','sums',l.build?'build':null,l.matrices?.length?'matrix':null,l.families?.length?'families':null].filter(Boolean);
function savedText(key){return lessonState().fields?.[key]||''}
function field(key,label,long=false){
 const content=esc(savedText(key)), attr=' data-field="'+esc(key)+'" maxlength="2000"';
 return '<label class="field">'+esc(label)+(long?'<textarea'+attr+'>'+content+'</textarea>':'<input'+attr+' value="'+content+'">')+'</label>';
}
function viewWords(list){return '<div class="tags">'+list.map(chip).join('')+'</div>'}
function details(name,body){return '<details><summary>'+esc(name)+'</summary>'+body+'</details>'}
function deck(l){
 const groups=l.sort.groups, cards=[];
 for(let i=0; i<Math.max(...groups.map(g=>g.words.length)); i++){
  for(let j=0;j<groups.length;j++){
   const k=(i+j)%groups.length,word=groups[k].words[i];
   if(word && !cards.some(c=>c.word===word))cards.push({word,group:k});
  }
 }
 return cards;
}
function sortedWords(){const s=lessonState();return s.sorted||(s.sorted={})}
function wordSort(l){
 const placed=sortedWords(),cards=deck(l),current=cards.find(c=>placed[c.word]!==true);
 const total=cards.filter(c=>placed[c.word]===true).length;
 const groups=l.sort.groups.map(g=>'<div class="wordgroup"><strong>'+esc(g.label)+'</strong>'+viewWords(g.words.filter(w=>placed[w]===true))+'</div>').join('');
 const play=current?'<p>Read the word. Choose the group it belongs in.</p><div class="sortplay"><span>Word '+(total+1)+' of '+cards.length+'</span><div class="cardword">'+esc(current.word)+'</div><div class="options">'+l.sort.groups.map((g,i)=>'<button class="mini" data-sort="'+i+'">'+esc(g.label)+'</button>').join('')+'</div><div id="sort-feedback" role="status"></div></div>':'<p class="notice">You sorted all '+total+' words.</p>';
 return play+(lessonState().lastSort?'<p class="review">'+esc(lessonState().lastSort)+'</p>':'')+details('My sorted words',groups)+details('Explain the pattern',l.sort.questions.map((q,i)=>field('reflect'+i,q,true)).join('')+'<p>'+esc(l.note||'')+'</p>');
}
function placeCard(k){
 const l=active(), current=deck(l).find(c=>sortedWords()[c.word]!==true);if(!current)return;
 if(!l.sort.groups[k]?.words.includes(current.word)){
  document.getElementById('sort-feedback').textContent='Try another group. Look closely at the spelling and meaning.';return;
 }
 sortedWords()[current.word]=true;
 lessonState().lastSort=current.word+' • '+l.sort.groups[k].label+'. '+(WORD_NOTES[current.word.toLowerCase()]||'');
 persist();drawWorkbook();say(lessonState().lastSort);main.querySelector('[data-sort]')?.focus({preventScroll:true});
}
function wordSums(l){
 return details('Name the target word parts',field('target','Target word part or parts')+field('targetmeaning','What do they mean?'))+'<p>Show the parts of each word. Write a plus sign between them.</p>'+l.sums.map((s,i)=>'<div class="sumform"><strong>'+esc(s.word)+'</strong>'+field('sum'+i,'My word sum')+(l.id[0]==='s'?field('rule'+i,'Spelling rule or observation'):'')+(l.id[0]==='p'?sketch(i):'')+details('Compare a word sum','<p class="example">'+esc(s.sum)+' = '+esc(s.word)+(s.rule?'<br>'+esc(s.rule):'')+'</p>')+'</div>').join('')+details('Try your own word',field('ownsum','My word and word sum',true));
}
function wordBuild(l){
 if(l.build.kind==='invent')return '<p>'+esc(l.build.instruction)+'</p><p class="example"><strong>prepare</strong> · '+esc(l.build.items[0].answer)+'</p>'+Array.from({length:l.build.rows||7},(_,i)=>'<div class="sumform">'+field('invent'+i,'Word '+(i+1))+field('inventmeaning'+i,'What does it mean?')+'</div>').join('');
 if(l.build.kind==='meaning')return '<p>'+esc(l.build.instruction)+'</p>'+l.build.items.map((x,i)=>'<div class="sumform"><strong>'+esc(x.base)+'</strong>'+field('meaning'+i,'My explanation',true)+details('Compare a meaning','<p class="example">'+esc(x.answer)+'</p>')+'</div>').join('');

 return '<p>'+esc(l.build.instruction)+'</p>'+l.build.items.map((item,i)=>{
  const possible=[item.answer,...(item.alternatives||[])].flat().filter(Boolean);
  return '<div class="sumform"><strong>'+esc(item.base)+'</strong>'+(item.basePart?field('basepart'+i,'Base word’s part of speech'):'')+field('built'+i,'My new word')+(item.answerPart?field('answerpart'+i,'New word’s part of speech'):'')+(l.id[0]==='p'?field('prefixmeaning'+i,'Explain your choice'):'')+'<button class="mini" data-build="'+i+'">Check word</button><div class="status" role="status" id="build'+i+'"></div>'+details('See a possible answer','<p class="example">'+esc(possible.join(' / '))+(item.answerPart?' · '+esc(item.basePart)+' to '+esc(item.answerPart):'')+(item.meaning?' · '+esc(item.meaning):'')+'</p>')+'</div>';
 }).join('');
}
function checkBuild(i){
 const a=active().build.items[i], typed=norm(savedText('built'+i)), options=[a.answer,...(a.alternatives||[])].flat().filter(Boolean);
 const valid=options.some(w=>norm(w)===typed);
 document.getElementById('build'+i).textContent=!typed?'Write your word first.':valid?'Yes. '+options.find(w=>norm(w)===typed)+' fits.':active().id[0]==='p'?'Compare your choice with the example. A different prefix can give the word a different meaning.':'Check the ending and the spelling change. You can compare an example below.';
}
function matrixChooser(m,i){
 const ri=m.columns.findIndex(c=>c.length===1&&c[0]===m.root);
 const inputs=m.columns.map((c,j)=>{
  const root=j===ri,key='mx'+i+'-'+j,val=root?m.root:savedText(key);
  return '<label>'+(root?'Root':j<ri?'Before':'After')+'<select data-matrix="'+i+'" data-field="'+key+'" '+(root?'disabled':'')+'>'+(!root?'<option value="">Skip</option>':'')+c.map(v=>'<option '+(val===v?'selected':'')+'>'+esc(v)+'</option>').join('')+'</select></label>';
 }).join('');
 const own=lessonState().matrixWords?.[i]||[];
 return '<section class="matrix" data-mx="'+i+'"><h3>'+esc(m.root)+' · '+esc(m.meaning)+'</h3><div class="partsrow">'+inputs+'</div><p class="matrix-line"></p>'+field('mxword'+i,'Write the finished spelling')+'<button class="mini" data-saveword="'+i+'">Save to my list</button><div class="status" role="status"></div>'+viewWords(own)+details('Check example words',viewWords(m.examples))+'</section>';
}
function matrixWords(l){
 return '<p>Read left to right. Choose one part per column. Start or finish in any column and keep the parts together. Check that your finished word is in the dictionary.</p>'+l.matrices.map(matrixChooser).join('');
}
function readMatrix(i){
 const box=main.querySelector('[data-mx="'+i+'"]'),values=[...box.querySelectorAll('select')].map(s=>s.value),parts=values.filter(Boolean);
 const inner=values.slice(values.findIndex(Boolean),values.findLastIndex(Boolean)+1);
 const m=active().matrices[i], idx=parts.indexOf(m.root),pre=parts.slice(0,idx),post=parts.slice(idx+1);
 const included=(path,printed)=>printed.some(a=>a.some((_,n)=>path.every((x,k)=>a[n+k]===x)));
 let allowed=!inner.includes('');
 if(pre.length&&m.prefixPaths)allowed=allowed&&included(pre,m.prefixPaths);
 if(post.length&&m.suffixPaths)allowed=allowed&&included(post,m.suffixPaths);
 if(m.paths){
  const before=m.paths.map(p=>p.slice(0,p.indexOf(m.root))),after=m.paths.map(p=>p.slice(p.indexOf(m.root)+1));
  allowed=allowed&&(!pre.length||included(pre,before))&&(!post.length||included(post,after));
 }
 box.querySelector('.matrix-line').textContent=parts.join(' + ');
 return {box,parts,allowed};
}
function saveMatrix(i){
 const {box,parts,allowed}=readMatrix(i),typed=savedText('mxword'+i).trim(), msg=box.querySelector('.status');
 if(!allowed){msg.textContent='Choose adjoining parts that follow a printed matrix path.';return}
 if(parts.length<2||!typed){msg.textContent='Choose a word part to go with the root and write the finished word.';return}
 if(!/^[A-Za-z][A-Za-z’' -]*$/.test(typed)){msg.textContent='Use letters for your finished word.';return}
 const s=lessonState();s.matrixWords||={};const words=s.matrixWords[i]||(s.matrixWords[i]=[]);
 if(!words.some(w=>norm(w)===norm(typed)))words.push(typed);
 const known=active().matrices[i].examples.some(w=>norm(w)===norm(typed));
 persist();drawWorkbook();const el=main.querySelector('[data-mx="'+i+'"] .status');
 el.textContent=known?'Saved. This word appears in the example list.':'Saved to your word list. Check the spelling and meaning in a dictionary.';
}
function familyTrees(l){
 return '<p>Start with a root. Add its meaning, where it comes from, and words that share that meaning.</p>'+l.families.map((root,i)=>'<section class="matrix"><h3>'+esc(root)+'</h3>'+field('fammeaning'+i,'Meaning')+field('famorigin'+i,'Language of origin')+field('famwords'+i,'Words on my branches',true)+details('Compare a word family',viewWords(l.familyExamples?.[root]||[]))+'</section>').join('')+(l.familyComparisonWords?details('Look closely at these spellings',viewWords(l.familyComparisonWords)+'<p>'+esc(l.familyComparisonNote||'')+'</p>'):'');
}
function drawWorkbook(){
 const l=active(), steps=activities(l),step=steps.includes(route.step)?route.step:steps[0],i=steps.indexOf(step);
 const movement=l.movement?(typeof l.movement==='string'?l.movement:l.movement.instruction):'';
 const body=({sort:wordSort,sums:wordSums,build:wordBuild,matrix:matrixWords,families:familyTrees})[step](l);
 main.innerHTML='<div class="work"><header class="workhead"><div><p>'+groupName(l.id)+' · Lesson '+l.id.slice(1)+'</p><h1>'+esc(l.title)+'</h1></div><button class="outline" data-act="toplay">Play puzzles</button></header><nav class="worknav" aria-label="Workbook activities">'+steps.map(s=>'<button data-step="'+s+'" '+(step===s?'aria-current="step"':'')+'>'+activityNames[s]+'</button>').join('')+'</nav><section class="sheet"><h2>'+activityNames[step]+'</h2>'+body+details('Word-part reference',l.parts.map(p=>'<p><strong>'+esc(p.form)+'</strong> · '+esc(p.meaning)+(p.origin?' · '+esc(p.origin):'')+'</p>').join(''))+(movement?details(typeof l.movement==='object'?l.movement.title:'Try it aloud','<p>'+esc(movement)+'</p>'):'')+'</section><footer class="workfoot"><span>Student book · page '+(l.start+i)+'</span><button class="solid" '+(i+1<steps.length?'data-step="'+steps[i+1]+'"':'data-act="menu"')+'>'+(i+1<steps.length?activityNames[steps[i+1]]:'Choose a lesson')+'</button></footer></div>';
 if(step==='matrix')l.matrices.forEach((_,n)=>readMatrix(n));
}

function sketch(i){
 const lines=lessonState().drawings?.[i]||[];
 return details('Draw or describe a picture', '<svg viewBox="0 0 360 135" class="sketch" data-sketch="'+i+'" aria-label="Draw a picture of the word with a pointer">'+lines.filter(x=>typeof x==='string'&&/^[0-9, .]+$/.test(x)).map(x=>'<polyline points="'+x+'"></polyline>').join('')+'</svg><button class="mini" data-undo="'+i+'">Undo stroke</button>'+field('picture'+i,'Describe the picture in words'));
}
function setupDrawing(){
 let stroke=null;
 function point(surface,event){const p=new DOMPoint(event.clientX,event.clientY).matrixTransform(surface.getScreenCTM().inverse());return Math.round(p.x)+','+Math.round(p.y)}
 main.addEventListener('pointerdown',e=>{
  const canvas=e.target.closest('[data-sketch]');if(!canvas||stroke||e.button!==0)return;
  const line=document.createElementNS('http://www.w3.org/2000/svg','polyline'),p=point(canvas,e);
  stroke={id:e.pointerId,canvas,line,points:[p,p]};line.setAttribute('points',stroke.points.join(' '));canvas.append(line);canvas.setPointerCapture(e.pointerId);
 });
 main.addEventListener('pointermove',e=>{if(!stroke||e.pointerId!==stroke.id)return;stroke.points.push(point(stroke.canvas,e));stroke.line.setAttribute('points',stroke.points.join(' '))});
 function finish(e){if(!stroke||e.pointerId!==stroke.id)return;const d=lessonState().drawings||=( {} );(d[stroke.canvas.dataset.sketch]||=[]).push(stroke.points.join(' '));stroke=null;persist()}
 main.addEventListener('pointerup',finish);main.addEventListener('pointercancel',finish);
 main.addEventListener('click',e=>{const b=e.target.closest('[data-undo]');if(!b)return;const i=b.dataset.undo;lessonState().drawings?.[i]?.pop();b.closest('details').querySelector('polyline:last-of-type')?.remove();persist()});
}
