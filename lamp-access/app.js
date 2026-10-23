import { BOARDS, HOME_ID, SYMBOLS, ATLAS } from './boards.js?v=1';

const $ = id => document.getElementById(id);
const pages = new Map(BOARDS.map(p => [p.id, p]));
let current = HOME_ID;
let history = [];
let words = [];
let caps = false;
let shift = false;
let spelling = '';
let voices = [];
let speakWords = true;
let returnHome = true;
let voiceURI = '';
let rate = .9;
let lastNavigation = 0;
let spellingStart = null;

try {
  const settings = JSON.parse(localStorage.getItem('bgsd-communication-preferences') || '{}');
  speakWords = settings.speakWords ?? true;
  returnHome = settings.returnHome ?? true;
  voiceURI = settings.voiceURI || '';
  rate = settings.rate || .9;
} catch { /* The board also works when browser storage is unavailable. */ }

const cells = Array.from({ length: 84 }, (_, index) => {
  const button = document.createElement('button');
  button.className = 'cell';
  button.dataset.index = index;
  const label = document.createElement('span');
  label.className = 'label';
  const ns = 'http://www.w3.org/2000/svg';
  const img = document.createElementNS(ns, 'svg');
  img.setAttribute('class', 'symbol');
  img.setAttribute('viewBox', '0 0 75 41');
  img.setAttribute('aria-hidden', 'true');
  img.setAttribute('focusable', 'false');
  const crop = document.createElementNS(ns, 'svg');
  crop.setAttribute('width', '75'); crop.setAttribute('height', '41');
  crop.style.overflow = 'hidden';
  const sprite = document.createElementNS(ns, 'image');
  sprite.setAttribute('href', 'symbols.webp?v=1');
  sprite.setAttribute('width', String(ATLAS.width)); sprite.setAttribute('height', String(ATLAS.height));
  crop.append(sprite); img.append(crop);
  button.append(label, img);
  button.addEventListener('click', event => {
    // Ignore a browser double-click immediately after a page change.
    if (event.detail > 1 && performance.now() - lastNavigation < 350) return;
    activate(index);
  });
  $('board').append(button);
  return button;
});

function status(text) { $('status').textContent = text; }
function messageText() { return [...words, ...(spelling ? [spelling] : [])].join(' ').replace(/\s+([.,!?;:])/g, '$1'); }
function updateMessage() {
  const text = messageText();
  $('message-text').textContent = text || 'Build a message';
  $('message-text').classList.toggle('placeholder', !text);
  $('message').setAttribute('aria-label', text ? `Speak message: ${text}` : 'Message is empty');
  $('undo').disabled = !text;
  $('speak').disabled = !text;
  $('message').scrollLeft = $('message').scrollWidth;
}

function render() {
  const page = pages.get(current);
  $('page-title').textContent = page.name;
  $('board').setAttribute('aria-label', `${page.name} communication board, 7 rows and 12 columns`);
  $('back').disabled = current === HOME_ID && history.length === 0;
  cells.forEach((button, index) => {
    const cell = page.cells[index];
    const blank = !cell || !cell.label;
    const action = cell?.target ? 'navigate' : cell?.action || 'word';
    button.className = `cell${blank ? ' blank' : ''}${action === 'clear' ? ' clear' : ''}`;
    button.disabled = blank;
    button.tabIndex = blank ? -1 : 0;
    button.dataset.action = action;
    button.dataset.word = cell?.label || '';
    button.style.setProperty('--cell-bg', cell?.bg || '#fff');
    const spokenLabel = cell?.aria || cell?.label || `Empty cell, row ${Math.floor(index / 12) + 1}, column ${index % 12 + 1}`;
    const accessibleAction = cell?.target ? `Open ${pages.get(cell.target).name}` : action === 'word' ? `Say ${spokenLabel}` : spokenLabel;
    button.setAttribute('aria-label', accessibleAction);
    button.title = `${spokenLabel} · row ${Math.floor(index / 12) + 1}, column ${index % 12 + 1}`;
    button.children[0].textContent = cell?.hideLabel ? '' : cell?.label || '';
    const img = button.children[1];
    if (cell?.asset && !blank) {
      const slot = SYMBOLS[cell.asset];
      const sprite = img.firstElementChild.firstElementChild;
      sprite.setAttribute('x', String(-((slot % ATLAS.columns) * ATLAS.pitchWidth + ATLAS.pad)));
      sprite.setAttribute('y', String(-(Math.floor(slot / ATLAS.columns) * ATLAS.pitchHeight + ATLAS.pad)));
      img.removeAttribute('hidden');
    } else { img.setAttribute('hidden', ''); }
  });
}

function navigate(id, push = true) {
  if (!pages.has(id)) return;
  if (current === 'p80' && id !== 'p80' && spelling) commitSpelling(false);
  if (push && id !== current) history.push(current);
  current = id;
  lastNavigation = performance.now();
  render();
  status(`${pages.get(id).name} page`);
}
function home() { history = []; navigate(HOME_ID, false); }
function back() { navigate(history.pop() || HOME_ID, false); }

function say(text) {
  if (!text) return;
  if (!('speechSynthesis' in window)) { status('Speech is unavailable in this browser. Your message is still shown above.'); return; }
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = voices.find(v => v.voiceURI === voiceURI);
  if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
  else utterance.lang = 'en-CA';
  utterance.rate = rate;
  utterance.onerror = event => {
    if (!['interrupted', 'canceled'].includes(event.error)) status('Speech could not play. Try another voice in Settings.');
  };
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function addWord(label) {
  commitSpelling(false);
  let word = label;
  if (label === '+s' || label === "'s") {
    if (words.length) words[words.length - 1] += label === '+s' ? 's' : "'s";
    else words.push(label === '+s' ? 's' : "'s");
  } else if (label.toUpperCase() === "N'T") {
    const previous = words.pop() || '';
    const contractions = { can: "can't", will: "won't", shall: "shan't", do: "don't", does: "doesn't", did: "didn't", is: "isn't", are: "aren't", was: "wasn't", were: "weren't", have: "haven't", has: "hasn't", had: "hadn't", could: "couldn't", would: "wouldn't", should: "shouldn't" };
    words.push(contractions[previous.toLowerCase()] || `${previous}n't`);
    word = words.at(-1);
  } else { words.push(label); }
  updateMessage();
  if (speakWords) say(word);
  status(`Selected: ${label}`);
  if (returnHome && current !== HOME_ID) { home(); status(`Selected: ${label}`); }
}

function clear() {
  words = []; spelling = ''; spellingStart = null;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  updateMessage(); status('Message cleared.');
}
function undo() {
  if (spelling) spelling = spelling.slice(0, -1); else words.pop();
  updateMessage(); status('Last word removed.');
}
function commitSpelling(speak = true) {
  if (!spelling) return;
  const text = spelling.trim();
  if (text) { words.push(text); if (speak && speakWords) say(text); }
  spelling = ''; updateMessage();
}

function activate(index) {
  const cell = pages.get(current).cells[index];
  if (!cell?.label) return;
  if (cell.target) {
    if (cell.target === 'p80') spellingStart = { words: [...words], spelling };
    navigate(cell.target); return;
  }
  switch (cell.action) {
    case 'back': back(); break;
    case 'clear': clear(); break;
    case 'char': spelling += caps || shift ? cell.value.toUpperCase() : cell.value; shift = false; updateMessage(); status(`Typed: ${cell.value}`); break;
    case 'space': commitSpelling(); status('Space'); break;
    case 'deleteChar': if (spelling) spelling = spelling.slice(0, -1); else if (words.length) { spelling = words.pop().slice(0, -1); } updateMessage(); break;
    case 'deleteWord': if (spelling) spelling = ''; else words.pop(); updateMessage(); break;
    case 'caps': caps = !caps; status(caps ? 'Capital letters on' : 'Capital letters off'); break;
    case 'shift': shift = !shift; status(shift ? 'Next letter will be a capital' : 'Shift off'); break;
    case 'speak': say(messageText()); break;
    case 'finder': openDialog('pages-dialog'); break;
    case 'unavailable': status('This extra page is not included in the published reference boards. Use the number row here.'); break;
    case 'missingPage': status(`${cell.label}: this extra page is not in the reference set. Pages lists the available vocabulary.`); break;
    case 'cancelSpell': if (spellingStart) { words = [...spellingStart.words]; spelling = spellingStart.spelling; } else spelling = ''; spellingStart = null; updateMessage(); back(); break;
    case 'doneSpell': commitSpelling(); spellingStart = null; home(); break;
    default: addWord(cell.speak || cell.label);
  }
}

function openDialog(id) { $(id).showModal(); }
function populateVoices() {
  if (!('speechSynthesis' in window)) { $('speech-note').textContent = 'This browser does not provide speech output.'; return; }
  voices = speechSynthesis.getVoices();
  const select = $('voice');
  select.replaceChildren(new Option('Device default', ''));
  voices.filter(v => /^en(?:-|$)/i.test(v.lang)).forEach(v => select.add(new Option(`${v.name}${v.localService ? ' · device' : ''}`, v.voiceURI)));
  if (Array.from(select.options).some(o => o.value === voiceURI)) select.value = voiceURI;
  $('speech-note').textContent = voices.length ? 'Available voices come from this device. Voices marked “device” are reported by the browser as local.' : 'This browser has not reported any voices yet. Try Test voice on the Chromebook; any voice error will appear below the board.';
}
function saveSettings() {
  speakWords = $('speak-words').checked; returnHome = $('return-home').checked;
  voiceURI = $('voice').value; rate = Number($('rate').value);
  try { localStorage.setItem('bgsd-communication-preferences', JSON.stringify({ speakWords, returnHome, voiceURI, rate })); } catch { /* Optional preferences. */ }
}

function pagePaths() {
  const paths = new Map([[HOME_ID, []]]), queue = [HOME_ID];
  for (let i = 0; i < queue.length; i++) {
    const page = pages.get(queue[i]);
    for (const cell of page.cells) if (cell?.target && !paths.has(cell.target)) {
      paths.set(cell.target, [...paths.get(page.id), cell.label]); queue.push(cell.target);
    }
  }
  return paths;
}
const paths = pagePaths();
function showPageList() {
  const query = $('page-search').value.trim().toLowerCase();
  $('page-list').replaceChildren();
  const matches = BOARDS.filter(p => !query || p.name.toLowerCase().includes(query) || p.cells.some(c => c?.label?.toLowerCase().includes(query)));
  for (const page of matches) {
    const button = document.createElement('button'); button.className = 'page-link';
    const title = document.createElement('strong'); title.textContent = page.name;
    const path = document.createElement('small');
    path.textContent = paths.has(page.id) ? ['Home', ...paths.get(page.id)].join(' → ') : 'Open reference page';
    button.append(title, path);
    button.addEventListener('click', () => { $('pages-dialog').close(); navigate(page.id); });
    $('page-list').append(button);
  }
  if (!matches.length) $('page-list').textContent = 'No matching pages.';
}

$('home').addEventListener('click', home);
$('back').addEventListener('click', back);
$('speak').addEventListener('click', () => say(messageText()));
$('message').addEventListener('click', () => say(messageText()));
$('undo').addEventListener('click', undo);
$('settings').addEventListener('click', () => openDialog('settings-dialog'));
$('about').addEventListener('click', () => openDialog('settings-dialog'));
$('pages').addEventListener('click', () => openDialog('pages-dialog'));
$('test-voice').addEventListener('click', () => say('Hello. I can use my voice.'));
$('page-search').addEventListener('input', showPageList);
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => $(b.dataset.close).close()));
['speak-words', 'return-home', 'voice', 'rate'].forEach(id => $(id).addEventListener('change', saveSettings));
$('speak-words').checked = speakWords; $('return-home').checked = returnHome; $('rate').value = String(rate);
$('fullscreen').addEventListener('click', async () => {
  try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); }
  catch { status('Use the Chromebook full-screen key to enlarge the board.'); }
});
document.addEventListener('fullscreenchange', () => $('fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Exit full screen' : 'Full screen'));
document.addEventListener('keydown', e => {
  if (document.querySelector('dialog[open]') || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.key === 'Escape' && current !== HOME_ID) { e.preventDefault(); back(); }
  if (e.key.startsWith('Arrow') && e.target.matches('.cell')) {
    e.preventDefault();
    const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -12, ArrowDown: 12 }[e.key];
    let index = Number(e.target.dataset.index) + delta;
    while (index >= 0 && index < 84) {
      if (!cells[index].disabled) { cells[index].focus(); break; }
      index += delta;
    }
  }
});
if ('speechSynthesis' in window) speechSynthesis.addEventListener('voiceschanged', populateVoices);
render(); updateMessage(); populateVoices(); showPageList();
