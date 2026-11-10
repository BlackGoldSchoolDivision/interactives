'use strict';
const pitchNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
let audioContext;
async function playMidi(notes, stagger = 0) {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return false;
  try {
    audioContext ||= new Context();
    await audioContext.resume();
    const start = audioContext.currentTime + .02;
    for (const [index, note] of notes.entries()) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const time = start + index * stagger;
      oscillator.type = 'triangle';
      oscillator.frequency.value = 440 * 2 ** ((note - 69) / 12);
      gain.gain.setValueAtTime(.0001, time);
      gain.gain.exponentialRampToValueAtTime(Math.min(.14, .26 / notes.length), time + .025);
      gain.gain.exponentialRampToValueAtTime(.0001, time + .68);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(time);
      oscillator.stop(time + .7);
    }
    return true;
  } catch { return false; }
}
games.pitch = (root, entry) => {
  let progress = read('pitch', {unlocked: 1, points: 0, correct: 0, attempts: 0});
  let note = null;
  let playing = false;
  let answered = false;
  const notice = feedback();
  const indicator = el('span', {class: 'pill', role: 'status'});
  const meter = el('progress', {class: 'progress', max: 20, 'aria-label': 'Progress to the next note'});
  const guesses = el('div', {class: 'grid'});
  const references = el('div', {class: 'toolbar'});
  async function sound(notes) {
    if (!await playMidi(notes)) {
      tell(notice, 'Audio could not start. Check this browser’s audio settings.', 'retry');
      return false;
    }
    return true;
  }
  const play = button('Play note', async () => {
    if (playing) return;
    playing = true;
    play.disabled = true;
    const inRange = progress.unlocked === 12 || Math.random() < .76;
    const start = inRange ? 0 : progress.unlocked;
    const end = inRange ? progress.unlocked : 12;
    note = start + Math.floor(Math.random() * (end - start));
    answered = !await sound([60 + note]);
    playing = false;
    if (!answered) tell(notice, 'Which note did you hear?');
    draw();
  }, {primary: true});
  const replay = button('Replay', () => { if (note != null) sound([60 + note]); }, {disabled: true});
  function choose(answer) {
    if (note == null || answered || playing) return;
    answered = true;
    const correct = answer === note || (answer === -1 && note >= progress.unlocked);
    progress.attempts++;
    let extra = '';
    if (correct) {
      progress.correct++;
      progress.points++;
      if (progress.points >= 20 && progress.unlocked < 12) {
        progress.unlocked++;
        progress.points = 0;
        extra = ' You unlocked ' + pitchNames[progress.unlocked - 1] + '.';
      }
    }
    store('pitch', progress);
    tell(notice, (correct ? 'Correct. ' : 'Listen again. ') + 'That note was ' + pitchNames[note] + '.' + extra, correct ? 'correct' : 'retry');
    draw();
    play.focus();
  }
  function draw() {
    indicator.textContent = progress.unlocked + ' of 12 notes unlocked · ' + progress.correct + ' of ' + progress.attempts + ' correct';
    meter.value = progress.unlocked === 12 ? 20 : progress.points;
    replay.disabled = note == null || playing;
    play.disabled = playing;
    play.textContent = answered ? 'Play another note' : 'Play note';
    const options = Array.from({length: progress.unlocked}, (_, index) => button(pitchNames[index], () => choose(index), {disabled: note == null || answered || playing}));
    if (progress.unlocked < 12) options.push(button('Outside my set', () => choose(-1), {disabled: note == null || answered || playing}));
    guesses.replaceChildren(...options);
    references.replaceChildren(...Array.from({length: progress.unlocked}, (_, index) =>
      button('Hear ' + pitchNames[index], () => sound([60 + index]))));
  }
  root.append(title(entry, 'Listen before you guess. Every 20 correct answers unlocks the next note.'),
    split(el('figure', {class: 'visual music-hero'}, art('mountain', 'A trail climbs a mountain at twilight'), el('figcaption', {}, 'Start with C. Your note set grows as you practise.')),
      section('Which note did you hear?', indicator, meter, toolbar(play, replay), guesses, notice,
        el('details', {}, el('summary', {}, 'Reference notes'), references,
          button('Reset progress', () => {
            if (!confirm('Reset your pitch-training progress?')) return;
            progress = {unlocked: 1, points: 0, correct: 0, attempts: 0};
            note = null;
            answered = false;
            store('pitch', progress);
            tell(notice, '');
            draw();
          })))));
  draw();
};

const guitarTuning = [40, 45, 50, 55, 59, 64];
const caged = [
  ['C', 0, [null, 3, 2, 0, 1, 0]],
  ['A', 9, [null, 0, 2, 2, 2, 0]],
  ['G', 7, [3, 2, 0, 0, 0, 3]],
  ['E', 4, [0, 2, 2, 1, 0, 0]],
  ['D', 2, [null, null, 0, 2, 3, 2]]
];
games.guitar = (root, entry) => {
  let rootNote = 0;
  let shape = 0;
  let showAll = false;
  let selected;
  const notice = feedback('Choose a root note and a CAGED shape.');
  const caption = el('p', {class: 'pill', role: 'status'});
  const fretboard = el('div', {class: 'fretboard', 'aria-label': 'Guitar fretboard'});
  const rootSelect = el('select', {'aria-label': 'Chord root'}, pitchNames.map((name, index) => el('option', {value: String(index)}, name)));
  const shapeButtons = caged.map(([name], index) => button(name + ' shape', () => { shape = index; draw(); }, {pressed: index === 0}));
  const triads = button('Show all triad notes', () => {
    showAll = !showAll;
    triads.setAttribute('aria-pressed', String(showAll));
    draw();
  }, {pressed: false});
  rootSelect.addEventListener('change', () => { rootNote = Number(rootSelect.value); draw(); });
  const hear = button('Hear chord', async () => {
    const pitches = positions().map(([string, fret]) => guitarTuning[string] + fret);
    if (await playMidi(pitches, .065)) tell(notice, 'Playing ' + pitchNames[rootNote] + ' major.');
    else tell(notice, 'Audio is unavailable in this browser.', 'retry');
  }, {primary: true});
  function positions() {
    const [, home, pattern] = caged[shape];
    const offset = (rootNote - home + 12) % 12;
    return pattern.flatMap((fret, string) => fret == null ? [] : [[string, fret + offset]]);
  }
  function draw(focusKey) {
    caption.textContent = pitchNames[rootNote] + ' major · ' + caged[shape][0] + ' shape';
    rootSelect.value = String(rootNote);
    shapeButtons.forEach((node, index) => node.setAttribute('aria-pressed', String(index === shape)));
    const active = new Set(positions().map(([string, fret]) => string + ':' + fret));
    const rows = [Array.from({length: 16}, (_, fret) => el('span', {class: 'fret-num'}, fret ? String(fret) : 'Open'))];
    guitarTuning.forEach((midi, string) => {
      rows.push(Array.from({length: 16}, (_, fret) => {
        const name = pitchNames[(midi + fret) % 12];
        const interval = (midi + fret - rootNote + 120) % 12;
        const key = string + ':' + fret;
        const marked = active.has(key) || showAll && [0, 4, 7].includes(interval);
        const octave = Math.floor((midi + fret) / 12) - 1;
        return button(marked || fret === 0 || selected === key ? name : '·', async () => {
          selected = key;
          rootNote = (midi + fret) % 12;
          const success = await playMidi([midi + fret]);
          tell(notice, name + octave + ' · string ' + (6 - string) + ', ' + (fret === 0 ? 'open' : 'fret ' + fret) + (success ? '' : '. Audio unavailable.'));
          draw(key);
        }, {class: marked ? interval === 0 ? 'root-tone' : 'chord-tone' : '',
          pressed: selected === key, 'aria-label': 'String ' + (6 - string) + ', ' + (fret ? 'fret ' + fret : 'open') + ', ' + name + octave,
          'data-focus': key});
      }));
    });
    fretboard.replaceChildren(...rows.flat());
    if (focusKey) restoreFocus(fretboard, focusKey);
  }
  root.append(title(entry, 'Pick a root or tap any fret. The pattern shows a major chord in one of five movable shapes.'),
    section(null, el('div', {class: 'guitar-banner'}, art('guitar', 'Acoustic guitar in a warm wood studio')),
      toolbar(el('label', {class: 'field'}, el('span', {}, 'Chord root'), rootSelect), shapeButtons, triads, hear),
      caption, el('div', {class: 'fret-viewport', tabIndex: 0, 'aria-label': 'Scrollable fretboard'}, fretboard),
      el('p', {class: 'hint'}, 'Green = root. Gold = other notes of the selected chord. The low E string is at the top.'), notice));
  draw();
};
