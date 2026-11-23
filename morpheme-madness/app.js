'use strict';
const main=document.getElementById('main'),dialog=document.getElementById('picker'),menu=document.getElementById('menu');
const key='bgsd-morpheme-madness-v1', sections={s:'Suffixes',p:'Prefixes',r:'Roots'};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=v=>String(v??'').normalize('NFC').toLowerCase().replace(/[-‐‑’'\s.]/g,'');
const chip=v=>'<span class="chip">'+esc(v)+'</span>',groupName=id=>sections[id[0]];
let answers={};try{answers=JSON.parse(localStorage.getItem(key))||{}}catch{}
const all=new Map(LESSONS.map(l=>[l.id,l]));
let route,menuGroup='r',menuMode='puzzle';
function active(){return all.get(route.id)}
function lessonState(){return answers[route.id]||(answers[route.id]={})}
function persist(){try{localStorage.setItem(key,JSON.stringify(answers))}catch{say('Progress is available in this tab. Your browser could not save it.')}}
function say(message){document.getElementById('announce').textContent=message}
function nav(id,view='puzzle',step='sort'){const hash='#'+id+'/'+view+(view==='workbook'?'/'+step:'');if(location.hash===hash)loadRoute();else location.hash=hash}
function loadRoute(){
 stopSpeech();mistakes.clear();say('');
 const [id,view,step]=location.hash.slice(1).split('/');
 route={id:all.has(id)?id:'r3',view:['guide','workbook'].includes(view)?view:'puzzle',step};
 if(route.view==='workbook')drawWorkbook();else if(route.view==='guide')guide();else drawGame();
 window.scrollTo(0,0);main.focus({preventScroll:true});
}
function menuOpen(){stopSpeech();menuGroup=route.id[0];menuMode=route.view==='workbook'?'workbook':'puzzle';drawMenu();dialog.showModal()}
function drawMenu(){
 const mode=(key,label)=>'<button data-mode="'+key+'" aria-pressed="'+(key===menuMode)+'">'+label+'</button>';
 menu.innerHTML='<div class="menutop"><h2 id="picker-title">Choose a lesson</h2><button class="close" data-act="close" aria-label="Close lessons">×</button></div><div class="picker-modes" aria-label="Activity">'+mode('puzzle','Play puzzles')+mode('workbook','Student workbook')+'</div><div class="tabs" aria-label="Word part">'+Object.entries(sections).map(([k,v])=>'<button data-group="'+k+'" aria-pressed="'+(menuGroup===k)+'">'+v+'</button>').join('')+'</div><div class="lessonlist">'+LESSONS.filter(l=>l.id[0]===menuGroup).map(l=>'<button class="lessonbtn" data-lesson="'+l.id+'">'+esc(l.title)+'<small>Lesson '+l.id.slice(1)+' · '+esc(l.parts.map(p=>p.meaning).filter((v,i,a)=>a.indexOf(v)===i).slice(0,2).join(' / '))+'</small></button>').join('')+'</div><div class="menufoot"><button class="textbtn" data-act="guide">Word-part guide</button><a class="booklink" href="'+(window.MM_BOOK||'assets/student-book.pdf')+'" target="_blank" rel="noopener">Original student book (PDF)</a></div>';
}
function guide(){
 main.innerHTML='<div class="work"><section class="sheet guide"><h1>Word-part guide</h1><h2>Prefixes come first</h2><p>A prefix can change a word’s meaning. It can signal an opposite or absence (uncooperative, nonsense, dishonest), point in a direction (revise, preview, eject), or strengthen a meaning (intense, extreme).</p><h2>Suffixes come last</h2><p>Endings can change number, tense, or degree. Compare dog and dogs, jump and jumped, happy and happier. A suffix can also change the kind of word. Fame is a noun and famous is an adjective. Quick is an adjective and quickly is an adverb.</p><h2>Roots carry meaning</h2><p>Some bases stand alone as words, like help. Others need another part, like vis in visible. English uses bases from Old English and roots from Latin and Greek. Two Greek word parts can join together, as in tele + phone.</p>'+Object.entries(sections).map(([k,v])=>details(v,LESSONS.filter(l=>l.id[0]===k).map(l=>'<p><strong>'+esc(l.title)+'</strong> · '+esc(l.parts.map(p=>p.meaning).join(' / '))+'</p>').join(''))).join('')+'<p class="pagecredit">Adapted from Shelley Blackwell’s <em>Morpheme Madness</em> student workbook and instructor guide (June 2021).</p><button class="solid" data-act="menu">Choose a lesson</button></section></div>';
}
document.getElementById('lessons').addEventListener('click',menuOpen);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 const d=b.dataset;
 if(d.group){menuGroup=d.group;drawMenu();menu.querySelector('[data-group="'+d.group+'"]').focus();return}
 if(d.mode){menuMode=d.mode;drawMenu();menu.querySelector('[data-mode="'+d.mode+'"]').focus();return}
 if(d.lesson){dialog.close();nav(d.lesson,menuMode);return}
 if(d.step){nav(route.id,'workbook',d.step);return}
 if(d.choice!==undefined){chooseTile(Number(d.choice));return}
 if(d.sort!==undefined){placeCard(Number(d.sort));return}
 if(d.build!==undefined){checkBuild(Number(d.build));return}
 if(d.saveword!==undefined){saveMatrix(Number(d.saveword));return}
 switch(d.act){
  case 'close':dialog.close();break;
  case 'menu':menuOpen();break;
  case 'guide':dialog.close();nav(route.id,'guide');break;
  case 'towork':nav(route.id,'workbook');break;
  case 'toplay':nav(route.id);break;
  case 'listen':readPuzzle(gameState().solved);break;
  case 'next':nextPuzzle();break;
  case 'restart':lessonState().game={round:0,solved:false,done:false};mistakes.clear();persist();drawGame();main.focus();break;
 }
});
main.addEventListener('input',e=>{const k=e.target.dataset.field;if(k){const s=lessonState();(s.fields||(s.fields={}))[k]=e.target.value;persist()}});
main.addEventListener('change',e=>{if(e.target.dataset.matrix!==undefined)readMatrix(Number(e.target.dataset.matrix))});
setupDrawing();window.addEventListener('hashchange',loadRoute);loadRoute();
