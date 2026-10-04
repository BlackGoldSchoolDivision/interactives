'use strict';
const catalogue = JSON.parse(document.getElementById('catalogue-data').textContent);
const categories = ['Favourites', 'All activities', 'Reading & writing', 'Morphology', 'Maths', 'Science', 'Geography', 'Social studies', 'Question practice', 'Thinking tools', 'Languages', 'Accessibility', 'Robotics', 'Teacher tools'];
const typeNames = ['All types', 'Sorting', 'Flashcards', 'Practice questions', 'Sequencing', 'Matching', 'Word work', 'Writing', 'Reading & annotation', 'Simulations & models', 'Maps & geography', 'Graphic organisers', 'Decision games', 'Builders', 'Printables', 'Drawing', 'Communication', 'Coding & robotics'];
const groupNames = ['All geography', 'Alberta', 'Canada', 'World', 'Map skills'];
const descriptions = {
  'Favourites': 'A good place to start. Choose one and jump in.',
  'All activities': 'Browse the full collection, or choose a subject and activity type.',
  'Reading & writing': 'Build words, develop ideas, and make meaning.',
  'Morphology': 'Build words, investigate families and compare how affixes change meaning. Explore games and printable activities.',
  'Maths': 'Explore models and practise reasoning with numbers.',
  'Science': 'Observe, test ideas, and explain what you notice.',
  'Geography': 'Alberta, Canada, the world, and the skills we use to map them.',
  'Social studies': 'Explore communities, history, government, and different perspectives.',
  'Question practice': 'Try dropdowns, multiple choice, ordered responses and task cards. Find numeric and model questions in Maths.',
  'Thinking tools': 'Make connections and bring classroom thinking into view.',
  'Languages': 'Build vocabulary, listen, match, and practise useful language.',
  'Accessibility': 'Tools for communication, routines, and access to text.',
  'Robotics': 'Plan commands and explore paths with familiar classroom robots.',
  'Teacher tools': 'Build classroom resources and prepare activities. Earlier prototypes are labelled.'
};
let chosen = 'Favourites', chosenGroup = 'All geography', chosenType = 'All types', query = '';
const cardsNode = document.getElementById('cards');
const filters = document.getElementById('filters');
const geoFilters = document.getElementById('geo-filters');
const search = document.getElementById('search');
const typeSelect = document.getElementById('activity-type');
function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c])); }
function countCategory(c) { return catalogue.filter(a => c === 'All activities' || (c === 'Favourites' ? a.favourite : a.category === c)).length; }
function matches(a) {
  const category = chosen === 'All activities' || (chosen === 'Favourites' ? a.favourite : a.category === chosen);
  const group = chosen !== 'Geography' || chosenGroup === 'All geography' || a.group === chosenGroup;
  const type = chosenType === 'All types' || a.types.includes(chosenType);
  const q = query.trim().toLocaleLowerCase();
  const words = [a.title, a.description, a.category, a.group, a.original_title, a.status, ...a.tags, ...a.types, ...(a.links || []).map(l => l.label)].join(' ').toLocaleLowerCase();
  return category && group && type && (!q || words.includes(q));
}
function renderFilters() {
  filters.innerHTML = categories.map(c => `<button type="button" class="filter" data-category="${esc(c)}" aria-pressed="${chosen === c}">${esc(c)}<span>${countCategory(c)}</span></button>`).join('');
  geoFilters.hidden = chosen !== 'Geography';
  geoFilters.innerHTML = groupNames.map(g => `<button type="button" class="filter" data-group="${esc(g)}" aria-pressed="${chosenGroup === g}">${esc(g)}</button>`).join('');
  typeSelect.value = chosenType;
  document.querySelectorAll('.quick-type').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.type === chosenType)));
}
function launchLabel(a) { return a.type === 'template' ? 'Open template' : a.type === 'printable' ? 'Open printable' : a.id === 'thinkingroutines' ? 'Open Grade 8' : 'Open activity'; }
function render() {
  renderFilters();
  const visible = catalogue.filter(matches);
  let title = chosen === 'Favourites' ? 'A few favourites' : chosen === 'Geography' && chosenGroup !== 'All geography' ? chosenGroup + ' geography' : chosen;
  if (chosenType !== 'All types') title += ' · ' + chosenType;
  document.getElementById('collection-title').textContent = title;
  document.getElementById('collection-description').textContent = descriptions[chosen];
  document.getElementById('count').textContent = visible.length + (visible.length === 1 ? ' entry' : ' entries');
  cardsNode.innerHTML = visible.map(a => `<article class="card" data-id="${esc(a.id)}"><div class="shot"><img src="${esc(a.image)}" alt="${a.type === 'template' ? 'Preview' : 'Screenshot'} of ${esc(a.title)}" loading="lazy" width="900" height="620"></div><div class="card-body"><div class="subject">${esc(a.category)}${a.category === 'Geography' ? ' · ' + esc(a.group) : ''}</div>${a.status ? `<span class="status-label">${esc(a.status)}</span>` : ''}<h4>${esc(a.title)}</h4><p class="description">${esc(a.description)}</p><p class="activity-types">${a.types.map(esc).join(' · ')}</p><div class="tags">${a.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>${a.status_note ? `<p class="status-note">${esc(a.status_note)}</p>` : ''}<a class="launch" aria-label="${esc(launchLabel(a))}: ${esc(a.title)}" href="${esc(a.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(launchLabel(a))}</span><span aria-hidden="true">↗</span></a>${a.links.length ? `<div class="secondary">${a.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`).join('')}</div>` : ''}${a.credit ? `<p class="credit">${esc(a.credit)}</p>` : ''}</div></article>`).join('');
  document.getElementById('empty').hidden = visible.length > 0;
  document.querySelector('.clear').hidden = !query;
}
typeSelect.innerHTML = typeNames.map(t => `<option value="${esc(t)}">${esc(t)}${t === 'All types' ? '' : ' (' + catalogue.filter(a => a.types.includes(t)).length + ')'}</option>`).join('');
function chooseType(t) { chosenType = t; if (chosen === 'Favourites') chosen = 'All activities'; render(); }
filters.addEventListener('click', e => { const b = e.target.closest('button[data-category]'); if (!b) return; chosen = b.dataset.category; chosenGroup = 'All geography'; render(); });
geoFilters.addEventListener('click', e => { const b = e.target.closest('button[data-group]'); if (!b) return; chosenGroup = b.dataset.group; render(); });
typeSelect.addEventListener('change', () => chooseType(typeSelect.value));
document.querySelectorAll('.quick-type').forEach(b => b.addEventListener('click', () => chooseType(chosenType === b.dataset.type ? 'All types' : b.dataset.type)));
search.addEventListener('input', () => { query = search.value; if (query.trim() && chosen === 'Favourites') chosen = 'All activities'; render(); });
document.querySelector('.clear').addEventListener('click', () => { query = ''; search.value = ''; render(); search.focus(); });
document.getElementById('reset').addEventListener('click', () => { chosen = 'All activities'; chosenGroup = 'All geography'; chosenType = 'All types'; query = ''; search.value = ''; render(); });
render();
