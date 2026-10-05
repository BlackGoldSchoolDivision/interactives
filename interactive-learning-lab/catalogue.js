'use strict';
const catalogue = JSON.parse(document.getElementById('catalogue-data').textContent);
const categories = ['Favourites', 'All activities', 'Mr. Walker’s Corner', 'Reading & writing', 'Morphology', 'Maths', 'Science', 'Geography', 'Social studies', 'Question practice', 'Thinking tools', 'Languages', 'Accessibility', 'Robotics', 'Teacher tools'];
const typeNames = ['All types', 'Sorting', 'Flashcards', 'Practice questions', 'Sequencing', 'Matching', 'Word work', 'Writing', 'Reading & annotation', 'Simulations & models', 'Maps & geography', 'Graphic organisers', 'Decision games', 'Builders', 'Printables', 'Drawing', 'Communication', 'Coding & robotics'];
const groupNames = ['All geography', 'Alberta', 'Canada', 'World', 'Map skills'];
const descriptions = {
  'Favourites': 'Games, creative tools and hands-on learning.',
  'All activities': 'Browse the full collection, or choose a subject and activity type.',
  'Mr. Walker’s Corner': 'Three classroom editions inspired by Tyler Walker: investigate functions, test a bridge, and explore plural patterns.',
  'Words & writing': 'Play with words, investigate word parts, and bring your ideas to life.',
  'Reading & writing': 'Build words, develop ideas, and make meaning.',
  'Morphology': 'Build words, investigate families and compare how affixes change meaning. Explore games and printable activities.',
  'Maths': 'Explore models and practise reasoning with numbers.',
  'Science': 'Observe, test ideas, and explain what you notice.',
  'Geography': 'Alberta, Canada, the world, and the skills we use to map them.',
  'Social studies': 'Explore communities, history, government, and different perspectives.',
  'Question practice': 'Try dropdowns, multiple choice, ordered responses and task cards. Find numeric and model questions in Math.',
  'Thinking tools': 'Make connections and bring classroom thinking into view.',
  'Languages': 'Build vocabulary, listen, match, and practise useful language.',
  'Accessibility': 'Tools for communication, routines, and access to text.',
  'Robotics': 'Plan commands and explore paths with familiar classroom robots.',
  'Teacher tools': 'Build classroom resources and prepare activities. Earlier prototypes are labelled.'
};
const subjects = [
  {label:'Words & writing',category:'Words & writing',id:'vocabularyarcade',colour:'#f76967',ink:'#552024'},
  {label:'Math',category:'Maths',id:'makechange',colour:'#ffc63b',ink:'#5b3c05'},
  {label:'Science',category:'Science',id:'moonphases',colour:'#007c80',ink:'#fff'},
  {label:'Geography',category:'Geography',id:'mackwoodmapping',colour:'#2674b8',ink:'#fff'},
  {label:'Thinking tools',category:'Thinking tools',id:'thinkingroutines',colour:'#9651ac',ink:'#fff'}
];
const featuredOrder = ['morpheme-missions','vocabularyarcade','mackwoodmapping','word-detective','numberbuilding','moonphases','writerspark'];
let chosen = 'Favourites', chosenGroup = 'All geography', chosenType = 'All types', query = '';
const cardsNode = document.getElementById('cards');
const filters = document.getElementById('filters');
const geoFilters = document.getElementById('geo-filters');
const search = document.getElementById('search');
const typeSelect = document.getElementById('activity-type');
const tilesNode = document.getElementById('subject-tiles');
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c])); }
function labelCategory(c) { return c === 'Favourites' ? 'Featured' : c === 'Maths' ? 'Math' : c; }
function inCategory(a,c) { return c === 'All activities' || (c === 'Favourites' ? a.favourite : c === 'Mr. Walker’s Corner' ? a.collection === 'walker-corner' : c === 'Words & writing' ? ['Reading & writing','Morphology'].includes(a.category) : a.category === c); }
function countCategory(c) { return catalogue.filter(a => inCategory(a,c)).length; }
function matches(a) {
  const category = inCategory(a,chosen);
  const group = chosen !== 'Geography' || chosenGroup === 'All geography' || a.group === chosenGroup;
  const type = chosenType === 'All types' || a.types.includes(chosenType);
  const q = query.trim().toLocaleLowerCase();
  const words = [a.title, a.description, a.category, a.group, a.original_title, a.status, a.credit, a.collection, ...a.tags, ...a.types, ...(a.links || []).map(l => l.label)].join(' ').toLocaleLowerCase();
  return category && group && type && (!q || words.includes(q));
}
tilesNode.innerHTML = subjects.map(s => {
  const a = catalogue.find(a => a.id === s.id);
  return `<button type="button" class="subject-tile" data-category="${esc(s.category)}" aria-pressed="false" style="--tile:${s.colour};--tile-ink:${s.ink}"><span class="tile-title">${esc(s.label)}</span><span class="tile-shot"><img src="${esc(a.image)}" alt="" width="900" height="620"></span><span class="tile-arrow" aria-hidden="true">→</span></button>`;
}).join('');
// All preview images and launch destinations come from the existing catalogue.
document.querySelectorAll('[data-preview-id]').forEach(link => {
  const a = catalogue.find(a => a.id === link.dataset.previewId);
  if (!a) return;
  link.href = a.url;
  link.querySelector('img').src = a.image;
});
document.getElementById('bank-count').textContent = catalogue.length + ' activities to explore';
function renderFilters() {
  filters.innerHTML = categories.map(c => `<button type="button" class="filter" data-category="${esc(c)}" aria-pressed="${chosen === c}">${esc(labelCategory(c))}<span>${countCategory(c)}</span></button>`).join('');
  geoFilters.hidden = chosen !== 'Geography';
  geoFilters.innerHTML = groupNames.map(g => `<button type="button" class="filter" data-group="${esc(g)}" aria-pressed="${chosenGroup === g}">${esc(g)}</button>`).join('');
  tilesNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(chosen === b.dataset.category || (b.dataset.category === 'Words & writing' && ['Reading & writing','Morphology'].includes(chosen)))));
  typeSelect.value = chosenType;
  document.querySelectorAll('.quick-type').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.type === chosenType)));
}
function launchLabel(a) { return a.type === 'template' ? 'Open template' : a.type === 'printable' ? 'Open printable' : a.id === 'thinkingroutines' ? 'Open Grade 8' : 'Try it'; }
function render() {
  renderFilters();
  const featured = chosen === 'Favourites' && chosenType === 'All types' && !query.trim();
  const visible = catalogue.filter(matches);
  if (featured) visible.sort((a,b) => {
    const ai = featuredOrder.indexOf(a.id), bi = featuredOrder.indexOf(b.id);
    return (ai < 0 ? 100 : ai) - (bi < 0 ? 100 : bi);
  });
  let title = chosen === 'Favourites' ? 'Pick an activity. Jump in.' : chosen === 'Geography' && chosenGroup !== 'All geography' ? chosenGroup + ' geography' : labelCategory(chosen);
  if (chosenType !== 'All types') title += ' · ' + chosenType;
  document.getElementById('collection-title').textContent = title;
  document.getElementById('collection-description').textContent = descriptions[chosen];
  document.getElementById('count').textContent = visible.length + (visible.length === 1 ? ' activity' : ' activities');
  cardsNode.innerHTML = visible.map((a,i) => {
    const accent = a.category === 'Morphology' ? '#76508d' : a.category === 'Reading & writing' ? '#ad3f45' : a.category === 'Maths' ? '#845d09' : a.category === 'Geography' ? '#226aab' : '#00767b';
    return `<article class="card" data-id="${esc(a.id)}" style="--accent:${accent}"><a class="shot" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer" aria-label="Try ${esc(a.title)} (opens in a new tab)"><img src="${esc(a.image)}" alt="${a.type === 'template' ? 'Preview' : 'Screenshot'} of ${esc(a.title)}" loading="${i < 3 ? 'eager' : 'lazy'}" width="900" height="620"></a><div class="card-body"><div class="subject">${esc(labelCategory(a.category))}${a.category === 'Geography' && a.group ? ' · ' + esc(a.group) : ''}</div>${a.status ? `<span class="status-label">${esc(a.status)}</span>` : ''}<h3>${esc(a.title)}</h3><p class="description">${esc(a.description)}</p><p class="activity-types">${a.types.map(esc).join(' · ')}</p><div class="tags">${a.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>${a.status_note ? `<p class="status-note">${esc(a.status_note)}</p>` : ''}<a class="launch" aria-label="${esc(launchLabel(a))}: ${esc(a.title)} (opens in a new tab)" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(launchLabel(a))}</span><span aria-hidden="true">→</span></a>${a.links.length ? `<div class="secondary">${a.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}${a.credit ? `<p class="credit">${esc(a.credit)}</p>` : ''}</div></article>`;
  }).join('');
  document.getElementById('empty').hidden = visible.length > 0;
  document.querySelector('.clear').hidden = !query;
}
typeSelect.innerHTML = typeNames.map(t => `<option value="${esc(t)}">${esc(t)}${t === 'All types' ? '' : ' (' + catalogue.filter(a => a.types.includes(t)).length + ')'}</option>`).join('');
function chooseType(t) { chosenType = t; if (chosen === 'Favourites') chosen = 'All activities'; render(); }
function chooseCategory(c) { chosen = c; chosenGroup = 'All geography'; render(); }
filters.addEventListener('click', e => { const b = e.target.closest('button[data-category]'); if (b) chooseCategory(b.dataset.category); });
tilesNode.addEventListener('click', e => { const b = e.target.closest('button[data-category]'); if (b) { chooseCategory(b.dataset.category); document.getElementById('activities').scrollIntoView({block:'start'}); } });
geoFilters.addEventListener('click', e => { const b = e.target.closest('button[data-group]'); if (b) { chosenGroup = b.dataset.group; render(); } });
typeSelect.addEventListener('change', () => chooseType(typeSelect.value));
document.querySelectorAll('.quick-type').forEach(b => b.addEventListener('click', () => chooseType(chosenType === b.dataset.type ? 'All types' : b.dataset.type)));
search.addEventListener('input', () => { query = search.value; if (query.trim() && chosen === 'Favourites') chosen = 'All activities'; render(); });
document.querySelector('.clear').addEventListener('click', () => { query = ''; search.value = ''; render(); search.focus(); });
function reset() { chosen = 'All activities'; chosenGroup = 'All geography'; chosenType = 'All types'; query = ''; search.value = ''; render(); }
document.getElementById('reset').addEventListener('click', reset);
document.querySelectorAll('[data-browse-category]').forEach(b => b.addEventListener('click', () => { chosenType = 'All types'; query = ''; search.value = ''; chooseCategory(b.dataset.browseCategory); document.getElementById('activities').scrollIntoView({block:'start'}); document.getElementById('collection-title').setAttribute('tabindex','-1'); document.getElementById('collection-title').focus({preventScroll:true}); }));
document.getElementById('focus-search').addEventListener('click', () => { search.scrollIntoView({block:'center'}); search.focus({preventScroll:true}); });
// A failed screenshot stays clearly labelled; never substitute invented game imagery.
document.addEventListener('error', e => { if (e.target instanceof HTMLImageElement) { e.target.hidden = true; const parent = e.target.parentElement; if (!parent.querySelector('.preview-unavailable')) { const label = document.createElement('span'); label.className = 'preview-unavailable'; label.textContent = 'Preview unavailable'; parent.appendChild(label); } } }, true);
render();
