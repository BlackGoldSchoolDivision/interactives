'use strict';
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const { tasks: missions, questions, locations, chapters } = lesson;
const KEY = 'bgsd-renaissance-illustrated-v1';
let state = { index: 0, done: [], responses: Array(6).fill(''), liam: true, hold: false };
let storageOK = true;
function cleanState(raw) {
  if (!raw || !Array.isArray(raw.done) || !Array.isArray(raw.responses)) throw Error('This file does not contain Renaissance work.');
  return { index: Math.max(0, Math.min(37, Number.isInteger(raw.index) ? raw.index : 0)), done: [...new Set(raw.done.filter(n => Number.isInteger(n) && n >= 0 && n < 37))], responses: questions.map((_, i) => String(raw.responses[i] || '').slice(0, 12000)), liam: raw.liam !== false, hold: Boolean(raw.hold ?? raw.dwell) };
}
try { const old = JSON.parse(localStorage.getItem(KEY) || 'null'); if (old) state = cleanState(old); } catch (_) { storageOK = false; }
if (new URLSearchParams(location.search).get('liam') === '1') state.liam = true;
let exploring = false, mapKind = 'europe', zoom = 1, hinted = false, options = [], responseIndex = 0, allowTyping = false;
let notice = '', noticeRetry = false;
let baseZoom = 1, mapCenter = [geometry.W / 2, geometry.H / 2];
function svgEl(tag, attributes = {}, text) { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attributes)) e.setAttribute(k, v); if (text !== undefined) e.textContent = text; return e; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) { storageOK = false; } }
function current() { return missions[state.index]; }
function done(type, target) { return state.done.some(i => missions[i].type === type && missions[i].target === target); }
function title(m) {
  const name = locations[m.target].name;
  if (m.type === 'religionChoice') return 'The Ottoman rulers';
  if (m.type === 'spread') return 'Ideas → ' + name;
  if (m.type === 'cross') return 'Crosses in ' + name;
  if (m.type === 'englandArrow') return 'Ideas → England';
  return 'Find ' + name;
}
function instructions(m) {
  return ({ water: 'Choose the waterway.', label: 'Choose the territory.', empire: 'Shade the empire brown.', religionChoice: 'Which religion did the rulers practise?', city: 'Place a star at the city.', italian: 'Shade this territory yellow.', spread: 'Draw routes from Italy.', northern: 'Shade this territory red.', cross: 'Add the religious symbols.', englandArrow: 'Draw routes to England.', englandGreen: 'Shade England green.' })[m.type];
}
function getOptions(m) {
  const values = m.type === 'religionChoice' ? ['islam', 'christianity'] : [m.target, m.other[0]];
  return state.index % 2 ? values.slice().reverse() : values;
}
function anchor(key, kind = mapKind) { return (kind === 'ottoman' ? geometry.ottomanAnchors : geometry.anchors)[key]; }
function route(layer, from, to, number) {
  const a = anchor(from, 'europe'), b = anchor(to, 'europe');
  layer.append(svgEl('path', { class: 'lesson-route', d: `M${a} Q${(a[0]+b[0])/2+35+number*9},${(a[1]+b[1])/2-36-number*5} ${b}` }));
}
function paintWork(root, kind) {
  const layer = root.querySelector('#lesson-overlays'); layer.replaceChildren();
  for (const region of geometry.regions) {
    const p = root.querySelector('#region-' + region.id); p.classList.remove('correct', 'hint');
    let fill = region.colour, opacity = '.45';
    if (done('italian', region.id)) { fill = '#efc449'; opacity = '.68'; }
    if (done('northern', region.id)) { fill = '#c95849'; opacity = '.67'; }
    if (done('englandGreen', region.id)) { fill = '#77a767'; opacity = '.70'; }
    p.setAttribute('fill', fill); p.style.setProperty('--lesson-fill', fill); p.setAttribute('fill-opacity', opacity); p.setAttribute('stroke-width', '1.45');
  }
  const empire = root.querySelector('#region-ottoman'); empire.classList.remove('correct', 'hint'); empire.style.setProperty('--lesson-fill', '#a16b45'); empire.setAttribute('fill-opacity', done('empire', 'ottoman') ? '.72' : '.52');
  if (kind === 'ottoman') {
    if (done('religionChoice', 'ottoman')) { const a = anchor('ottoman', 'ottoman'); layer.append(svgEl('text', { x: a[0], y: a[1]+75, class: 'lesson-symbol', 'font-size': 44 }, 'Islam')); }
    return;
  }
  for (const i of state.done) {
    const m = missions[i], a = anchor(m.target, 'europe');
    if (m.type === 'city') layer.append(svgEl('text', { x: a[0], y: a[1], class: 'lesson-symbol lesson-star' }, '★'));
    if (m.type === 'cross') for (const dx of [-24, 24]) layer.append(svgEl('text', { x: a[0]+dx, y: a[1]-52, class: 'lesson-symbol' }, '✝'));
    if (m.type === 'spread') ['naples', 'genoa', 'papal', 'veniceState'].forEach((k, j) => route(layer, k, m.target, j));
    if (m.type === 'englandArrow') ['france', 'castile', 'hre'].forEach((k, j) => route(layer, k, 'england', j));
  }
}
function setZoom() {
  $('camera').setAttribute('transform', `translate(${geometry.W/2} ${geometry.H/2}) scale(${baseZoom*zoom}) translate(${-mapCenter[0]} ${-mapCenter[1]})`);
  const box = $('atlas').getBoundingClientRect(), ratio = Math.min(box.width/geometry.W, box.height/geometry.H);
  for (const g of $('candidate-markers').children) { const a = anchor(g.dataset.place); g.setAttribute('transform', `translate(${a}) scale(${1/(baseZoom*zoom)})`); const r = Math.max(33, 21/Math.max(.1, ratio)); g.querySelector('circle').setAttribute('r', r); g.querySelector('.inner').setAttribute('r', r-4); g.querySelector('text').setAttribute('font-size', r*1.3); }
}
function renderMap() {
  const m = current();
  if (!exploring) mapKind = m?.chapter === 2 ? 'ottoman' : 'europe';
  $('illustration').toggleAttribute('hidden', mapKind === 'ottoman'); $('ottoman-illustration').toggleAttribute('hidden', mapKind !== 'ottoman');
  document.querySelector('.period').textContent = mapKind === 'ottoman' ? 'Ottoman Empire · 1683' : 'Europe · c. 1400';
  baseZoom = !exploring && m && [3, 4].includes(m.chapter) ? 2.8 : 1;
  mapCenter = baseZoom > 1 ? geometry.italyCenter : [geometry.W/2, geometry.H/2];
  paintWork($('atlas'), mapKind);
  $('candidate-markers').replaceChildren();
  if (!exploring && m && m.type !== 'religionChoice') {
    options.forEach((key, i) => {
      const g = svgEl('g', { class: 'choice-marker', 'data-place': key });
      g.append(svgEl('circle', { r: 33, fill: i ? '#246487' : '#8e2723' }), svgEl('circle', { class: 'inner', r: 29, fill: 'none' }), svgEl('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central' }, i ? 'B' : 'A'));
      $('candidate-markers').append(g); const p = $('region-' + key); if (p) p.setAttribute('fill-opacity', '.61');
    });
    const target = $('region-' + m.target); if (target && state.done.includes(state.index)) target.classList.add('correct'); if (target && hinted) target.classList.add('hint');
  }
  const mapDescription = mapKind === 'ottoman' ? 'Historical Ottoman reference, 1683.' : 'Illustrated historical Europe, around 1400.';
  $('atlas').setAttribute('aria-label', mapDescription + (exploring ? ' All place names are shown.' : m ? ' Place names are hidden. '+title(m)+'. Choose A or B.' : ' Your completed map.'));
  $('europe-map').setAttribute('aria-pressed', String(mapKind === 'europe')); $('ottoman-map').setAttribute('aria-pressed', String(mapKind === 'ottoman'));
  setZoom();
}
function render() {
  const m = current(), answered = state.done.includes(state.index);
  document.body.classList.toggle('liam', state.liam); document.body.classList.toggle('standard', !state.liam);
  document.body.classList.toggle('question-mode', !exploring); document.body.classList.toggle('exploring', exploring);
  $('question-controls').hidden = exploring || !m; $('explore-panel').hidden = !exploring; $('completion-panel').hidden = exploring || Boolean(m);
  $('explore').textContent = exploring ? 'Questions' : 'Explore'; $('explore').setAttribute('aria-pressed', String(exploring));
  $('liam').setAttribute('aria-pressed', String(state.liam)); $('liam').innerHTML = 'LIAM · '+(state.liam?'ON':'OFF')+' <span class="dot" aria-hidden="true"></span>';
  $('hold').textContent = 'Hold to select · '+(state.hold?'on':'off'); $('hold').setAttribute('aria-pressed', String(state.hold));
  document.querySelector('.task-panel').setAttribute('aria-label', exploring ? 'Explore the atlas' : m ? 'Map assignment' : 'Assignment progress');
  document.querySelector('.map-tools').hidden = state.liam && !exploring;
  if (m) {
    options = getOptions(m);
    $('step').textContent = 'Map step '+(state.index+1)+' of 37'; $('chapter-label').textContent = chapters[m.chapter];
    $('progress-fill').style.width = state.done.length/37*100+'%'; $('prompt').textContent = title(m); $('prompt').classList.toggle('long', title(m).length > 18);
    $('instruction').textContent = instructions(m);
    for (const [i, id] of ['choice-a', 'choice-b'].entries()) { const b = $(id); b.classList.toggle('faith', m.type === 'religionChoice'); b.textContent = m.type === 'religionChoice' ? (options[i]==='islam'?'Islam':'Christianity') : (i?'B':'A'); b.setAttribute('aria-label', m.type === 'religionChoice' ? 'Choose '+b.textContent : 'Choose '+(i?'B':'A')); b.disabled = answered; }
    $('next').disabled = !answered; $('next').textContent = state.index === 36 ? 'Written questions →' : 'Next'; $('back').disabled = state.index === 0;
    $('feedback').textContent = notice || (answered ? 'Mapped! '+(m.type === 'religionChoice' ? 'The rulers practised Islam.' : locations[m.target].name) : ''); $('feedback').className = 'feedback'+(noticeRetry?' retry':'');
  } else {
    const count = state.responses.filter(s=>s.trim()).length;
    $('completion-title').textContent = count === 6 ? 'Atlas complete!' : 'Map complete!'; $('completion-text').textContent = '37 map steps · '+count+' of 6 written responses saved.';
    $('continue-written').textContent = count === 6 ? 'Review my responses' : 'Written questions';
  }
  renderMap(); save();
}
function choose(slot) {
  const m = current(); if (!m || exploring || state.done.includes(state.index)) return;
  if (options[slot] === (m.type === 'religionChoice' ? 'islam' : m.target)) { state.done.push(state.index); notice = m.type === 'religionChoice' ? 'Yes! The rulers practised Islam; many faiths existed in the empire.' : 'Yes! '+locations[m.target].name+'.'; noticeRetry = false; hinted = false; }
  else { notice = 'Try the other choice.'; noticeRetry = true; }
  render();
}
function newStep(index) { state.index = index; notice = ''; noticeRetry = false; hinted = false; zoom = 1; render(); }
function toggleExplore() { exploring = !exploring; zoom = 1; render(); }
function speak(text) { if (!('speechSynthesis' in window)) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'en-CA'; u.rate = .83; speechSynthesis.speak(u); }
function bindHold(button) {
  if (button.dataset.holdBound) return; button.dataset.holdBound = '1'; let timer;
  const cancel = () => { clearTimeout(timer); button.classList.remove('dwell-active'); };
  button.addEventListener('pointerenter', () => { if (!state.hold || button.disabled) return; cancel(); button.classList.add('dwell-active'); timer = setTimeout(() => { cancel(); if (state.hold && !button.disabled && button.isConnected) button.click(); }, 1400); });
  for (const name of ['pointerleave', 'pointerdown', 'blur']) button.addEventListener(name, cancel);
}
function renderResponse() {
  const q = questions[responseIndex];
  $('written-count').textContent = 'Written question '+(responseIndex+1)+' of 6'; $('written-title').textContent = q.q; $('written-page').textContent = 'Use your textbook, page '+q.page+'.';
  $('response-text').value = state.responses[responseIndex]; $('response-text').readOnly = state.liam && !allowTyping;
  $('type-answer').hidden = !state.liam || allowTyping; $('response-help').textContent = state.liam && !allowTyping ? 'Choose phrases to build your answer. Tap a selected phrase to remove it.' : 'Write your own answer, or use the phrases to help.';
  $('phrase-bank').replaceChildren();
  for (const phrase of q.chips) {
    const b = document.createElement('button'); b.textContent = phrase; b.setAttribute('aria-pressed', String(state.responses[responseIndex].includes(phrase)));
    b.addEventListener('click', () => { let value = state.responses[responseIndex]; if (value.includes(phrase)) value = value.replace(phrase, '').replace(/\n{2,}/g, '\n').trim(); else value = value ? value+'\n'+phrase : phrase; state.responses[responseIndex] = value; save(); renderResponse(); });
    bindHold(b); $('phrase-bank').append(b);
  }
  $('written-back').disabled = responseIndex === 0; $('written-next').disabled = !state.responses[responseIndex].trim(); $('written-next').textContent = responseIndex === 5 ? 'Finish responses' : 'Save & next';
}
function openResponses(index = 0) { responseIndex = Math.max(0, Math.min(5, index)); allowTyping = false; renderResponse(); $('responses-dialog').showModal(); }
function openWork() {
  $('work-summary').textContent = state.done.length+' of 37 map steps · '+state.responses.filter(s=>s.trim()).length+' of 6 written questions.';
  $('work-status').textContent = storageOK ? 'Your work saves on this device. Download a copy to keep or hand in.' : 'Device saving is unavailable. Download a copy to keep your work.';
  $('jump-step').replaceChildren(...missions.map((m, i) => { const o = document.createElement('option'); o.value = i; o.textContent = (state.done.includes(i)?'✓ ':'')+(i+1)+'. '+title(m); return o; }));
  $('jump-step').value = Math.min(36, state.index); $('work-dialog').showModal();
}
function download(content, type, name) { const url = URL.createObjectURL(new Blob([content], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); }
function mapSnapshot(kind) {
  const svg = $('atlas').cloneNode(true); svg.removeAttribute('id'); svg.setAttribute('width', 1500); svg.setAttribute('height', 1100); svg.setAttribute('aria-label', kind==='ottoman'?'Completed Ottoman map, 1683':'Completed Europe atlas, c. 1400');
  svg.classList.add('export-atlas');
  const style = svgEl('style'); style.textContent = '.export-atlas [hidden]{display:none!important}.export-atlas .place{font-family:Georgia,serif;fill:#332517;stroke:#f6e1ae;stroke-width:2.7;paint-order:stroke;text-anchor:middle;font-weight:600}.export-atlas .city{font:21px Georgia,serif;fill:#332517;stroke:#f6e1ae;stroke-width:3;paint-order:stroke}.export-atlas .sea{font-family:Georgia,serif;fill:#edf1db;text-anchor:middle;font-style:italic;letter-spacing:3px;stroke:#0b4562;stroke-width:2.5;paint-order:stroke}.export-atlas .inset-label{fill:#fff0d1;stroke:#174b61;stroke-width:3.4;font-weight:500}.export-atlas .lesson-route{fill:none;stroke:#f7d77a;stroke-width:4;stroke-dasharray:10 7;marker-end:url(#lesson-arrow)}.export-atlas .lesson-symbol{font:700 42px Georgia,serif;text-anchor:middle;dominant-baseline:central;fill:#7c3530;stroke:#f8e7b7;stroke-width:2.2;paint-order:stroke}.export-atlas .lesson-star{fill:#efc85a;stroke:#6c4822}.export-atlas .compass text{font:26px Georgia,serif;fill:#f6d685;text-anchor:middle}'; svg.prepend(style);
  svg.querySelector('#camera').removeAttribute('transform'); svg.querySelector('#candidate-markers').remove();
  svg.querySelector('#illustration').toggleAttribute('hidden', kind === 'ottoman'); svg.querySelector('#ottoman-illustration').toggleAttribute('hidden', kind !== 'ottoman');
  paintWork(svg, kind);
  for (const image of svg.querySelectorAll('image')) image.setAttribute('href', new URL(image.getAttribute('href'), location.href).href);
  for (const e of svg.querySelectorAll('#map-labels text,#map-labels .atlas-callout,#ottoman-labels text')) e.style.display = 'block';
  return svg;
}
function printWork() {
  const paper = $('paper-work'); paper.replaceChildren(); const h = document.createElement('h1'); h.textContent = 'My illustrated Renaissance atlas'; paper.append(h);
  for (const kind of ['europe', 'ottoman']) { const figure = document.createElement('figure'), caption = document.createElement('figcaption'); caption.textContent = kind==='europe'?'Europe · c. 1400':'Ottoman Empire · 1683'; figure.append(caption,mapSnapshot(kind)); paper.append(figure); }
  questions.forEach((q,i)=>{const s=document.createElement('section'),h=document.createElement('h2'),p=document.createElement('p');h.textContent=q.q+' (p. '+q.page+')';p.textContent=state.responses[i]||'No response saved yet.';s.append(h,p);paper.append(s);});
  const note=document.createElement('p'); note.textContent='Historical borders are approximate. Sources: Natural Earth (public domain), André Ourednik’s Historical Basemaps (GPL-3.0), and the classroom assignment. Illustrations are decorative.'; paper.append(note); window.print();
}
$('choice-a').addEventListener('click',()=>choose(0)); $('choice-b').addEventListener('click',()=>choose(1));
$('next').addEventListener('click',()=>{if(exploring||!state.done.includes(state.index))return;newStep(state.index+1);if(state.index===37)openResponses(state.responses.findIndex(s=>!s.trim())<0?0:state.responses.findIndex(s=>!s.trim()));});
$('back').addEventListener('click',()=>{if(!exploring&&state.index>0)newStep(state.index-1);});
$('help').addEventListener('click',()=>{const m=current();if(!m||exploring||state.done.includes(state.index))return;hinted=true;const slot=options.indexOf(m.type==='religionChoice'?'islam':m.target);notice='Look for '+(m.type==='religionChoice'?'the Islam button.':slot?'B.':'A.');noticeRetry=false;render();});
$('explore').addEventListener('click',toggleExplore); $('return-questions').addEventListener('click',toggleExplore); $('complete-explore').addEventListener('click',toggleExplore);
$('liam').addEventListener('click',()=>{state.liam=!state.liam;zoom=1;render();});
$('europe-map').addEventListener('click',()=>{mapKind='europe';zoom=1;renderMap();}); $('ottoman-map').addEventListener('click',()=>{mapKind='ottoman';zoom=1;renderMap();});
$('zoom-in').addEventListener('click',()=>{zoom=Math.min(2.5,zoom+.25);setZoom();}); $('zoom-out').addEventListener('click',()=>{zoom=Math.max(1,zoom-.25);setZoom();}); $('fit').addEventListener('click',()=>{zoom=1;setZoom();});
$('read').addEventListener('click',()=>speak(exploring?'Explore the labeled atlas.':current()?title(current())+'. '+instructions(current())+'. Choose A or B.':'Your map is complete. Continue to the written questions.'));
$('hold').addEventListener('click',()=>{state.hold=!state.hold;render();}); $('about').addEventListener('click',()=>$('details').showModal());
$('work').addEventListener('click',openWork); $('continue-written').addEventListener('click',()=>openResponses());
$('work-written').addEventListener('click',()=>{$('work-dialog').close();openResponses();});
$('go-step').addEventListener('click',()=>{$('work-dialog').close();exploring=false;newStep(Number($('jump-step').value));});
$('written-back').addEventListener('click',()=>{if(responseIndex>0){responseIndex--;allowTyping=false;renderResponse();}});
$('written-next').addEventListener('click',()=>{if(!state.responses[responseIndex].trim())return;save();if(responseIndex<5){responseIndex++;allowTyping=false;renderResponse();}else{$('responses-dialog').close();render();}});
$('response-text').addEventListener('input',()=>{state.responses[responseIndex]=$('response-text').value;save();$('written-next').disabled=!state.responses[responseIndex].trim();});
$('type-answer').addEventListener('click',()=>{allowTyping=true;renderResponse();$('response-text').focus();});
$('written-read').addEventListener('click',()=>speak(questions[responseIndex].q+'. Textbook page '+questions[responseIndex].page+'. '+questions[responseIndex].chips.join('. ')));
$('download-work').addEventListener('click',()=>download(JSON.stringify({app:'Renaissance Atlas Illustrated',version:1,state},null,2),'application/json','Renaissance-Illustrated-Work.json'));
$('print-work').addEventListener('click',printWork);
$('download-map').addEventListener('click',()=>download(new XMLSerializer().serializeToString(mapSnapshot(mapKind)),'image/svg+xml','Renaissance-Illustrated-'+mapKind+'.svg'));
$('load-work').addEventListener('click',()=>$('work-file').click());
$('work-file').addEventListener('change',async()=>{const f=$('work-file').files[0];if(!f)return;try{const raw=JSON.parse(await f.text());if(!['Renaissance Atlas','Renaissance Atlas Illustrated'].includes(raw.app))throw Error('Choose a Renaissance Atlas work file.');state=cleanState(raw.state);exploring=false;notice='';hinted=false;zoom=1;render();$('work-status').textContent='Saved work opened.';$('work-summary').textContent=state.done.length+' of 37 map steps · '+state.responses.filter(s=>s.trim()).length+' of 6 written questions.';}catch(e){$('work-status').textContent=e.message;}$('work-file').value='';});
$('restart').addEventListener('click',()=>{$('work-dialog').close();$('restart-dialog').showModal();});
$('confirm-restart').addEventListener('click',()=>{state={index:0,done:[],responses:Array(6).fill(''),liam:state.liam,hold:state.hold};exploring=false;notice='';hinted=false;zoom=1;$('restart-dialog').close();render();});
for(const b of document.querySelectorAll('[data-close]'))b.addEventListener('click',()=>{b.closest('dialog').close();});
$('candidate-markers').addEventListener('click',e=>{if(state.liam||exploring)return;const g=e.target.closest('.choice-marker');if(g)choose(options.indexOf(g.dataset.place));});
for(const p of document.querySelectorAll('.country'))p.addEventListener('click',()=>{if(state.liam||exploring)return;const slot=options.indexOf(p.dataset.place);if(slot>=0)choose(slot);});
document.addEventListener('keydown',e=>{if(exploring||document.querySelector('dialog[open]')||e.ctrlKey||e.altKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key.toLowerCase()==='a')choose(0);if(e.key.toLowerCase()==='b')choose(1);});
for(const b of document.querySelectorAll('button'))bindHold(b);
window.addEventListener('resize',()=>requestAnimationFrame(setZoom));
render();
