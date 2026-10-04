const e = MorphCore.escape;
const main = document.getElementById('main');
const button = (label,action,attrs='',cls='') => `<button type="button" data-action="${action}" class="${cls}" ${attrs}>${label}</button>`;
function announce(message) { document.getElementById('announcer').textContent=message; }
function draw(html,focus=false) {
  const old=document.activeElement, remembered=old&&main.contains(old)?{id:old.id,data:{...old.dataset}}:null;
  main.innerHTML=html;
  if(focus){main.focus();return;}
  if(remembered){const match=remembered.id?document.getElementById(remembered.id):[...main.querySelectorAll('button[data-action]')].find(b=>Object.keys(remembered.data).every(k=>b.dataset[k]===remembered.data[k]));if(match&&!match.disabled)match.focus({preventScroll:true});else{const next=main.querySelector('[data-action="next"],[data-action="to-meaning"],[data-action="to-evidence"],[data-action="to-apply"],[data-action="finish"]');if(next)next.focus({preventScroll:true});}}
}
function navActive(route) { document.querySelectorAll('nav button').forEach(b=>{const active=b.dataset.route===route;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');}); }
function tile(part,type,label) { return `<span class="tile ${type}">${e(part)}<small>${e(label)}</small></span>`; }
function sumTiles(parts) { const types=['prefix','base','suffix'];return parts.map((p,i)=>p?tile(i===0?p+'-':i===2?'-'+p:p,types[i],types[i]):'').filter(Boolean).join('<span class="symbol" aria-hidden="true">+</span>'); }
function feedback(text,type='success',title='') { return `<div class="feedback ${type==='success'?'':type}" role="status">${title?`<h3>${e(title)}</h3>`:''}<p>${e(text)}</p></div>`; }
function speak(text) {
  if(!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)){announce('Read-aloud is unavailable in this browser. Read the sentence together.');return;}
  try{window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-CA';utterance.rate=.85;utterance.onerror=()=>announce('Read-aloud could not play. Read the word together.');window.speechSynthesis.speak(utterance);}
  catch(_){announce('Read-aloud is unavailable. Read the word together.');}
}
function printPage(title,content) {
  document.getElementById('print-area').innerHTML=`<h1>${e(title)}</h1>${content}`;
  document.title=title;
  window.print();
  document.title=APP_TITLE;
}
function researchHTML() {
  return `<div class="research-list">${DATA.research.map(r=>`<div><a href="${e(r.url)}" target="_blank" rel="noopener">${e(r.title)} ↗</a><p>${e(r.note)}</p></div>`).join('')}</div>
    <p class="note space">These activities apply ideas from the literature. The games themselves have not been evaluated in an intervention study. Use them alongside phonics, vocabulary, reading, discussion and writing.</p>
    <details><summary>Spelling and word-history sources</summary><ul>${DATA.sources.map(r=>`<li><a href="${e(r.url)}" target="_blank" rel="noopener">${e(r.title)}</a></li>`).join('')}</ul></details>`;
}
function researchPanel(){return `<section class="card"><h2>What informed the activities?</h2><p>Teach the connection between a word’s structure, its meaning and its use. Give specific feedback, compare related words, and revisit them in reading and writing.</p>${researchHTML()}</section>`;}
document.addEventListener('click',event=>{
 const b=event.target.closest('button[data-action="speak"]');if(b)speak(b.dataset.text);
});
