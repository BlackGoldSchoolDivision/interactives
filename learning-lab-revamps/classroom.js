'use strict';

function speak(text, status) {
  if (!text.trim()) return tell(status, 'Add some text first.', 'retry');
  if (!('speechSynthesis' in window)) return tell(status, 'Read aloud is unavailable in this browser.', 'retry');
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-CA';
  utterance.onerror = () => tell(status, 'This browser could not read the text aloud.', 'retry');
  speechSynthesis.speak(utterance);
}

const cacaoStages = [
  ['Drying', 'Spread the fermented seeds out to dry.'],
  ['Roasting', 'Heat the dried seeds to bring out chocolate flavour.'],
  ['Conching', 'Mix and refine the chocolate so it becomes smoother.'],
  ['Tempering', 'Heat and cool the chocolate carefully so it sets with a glossy finish.']
];
const cacaoQuestions = [
  ['How does the writer introduce the topic?', ['Telling a story', 'Using humour', 'Using imagery', 'Asking a question'], 3],
  ['Which region is not mentioned as a cacao-growing area?', ['Africa', 'Central America', 'Europe', 'Asia'], 2],
  ['What tool do farmers use to cut ripe pods?', ['Hoe', 'Shovel', 'Machete', 'Scythe'], 2]
];
games.cacao = (root, entry) => {
  let order = [2, 0, 3, 1];
  let mode = 'read';
  const answers = {};
  const area = el('div', {});
  const passage = section('From the Tree to a Sweet Treat', cacaoPassage.map(text => el('p', {class: 'long-answer'}, text)));
  const modes = ['read', 'sequence', 'questions'].map(value => button(value[0].toUpperCase() + value.slice(1), () => {
    mode = value;
    draw();
  }, {pressed: value === mode}));
  const preview = el('figure', {class: 'visual'}, art('cacao', 'Cacao pods, dry beans and dark chocolate on a table'));
  root.append(title(entry), toolbar(modes), el('div', {style: 'margin-top:.8rem'}, split(preview, area)));
  function draw(focusKey) {
    modes.forEach((node, index) => node.setAttribute('aria-pressed', String(mode === ['read', 'sequence', 'questions'][index])));
    if (mode === 'read') {
      area.replaceChildren(passage);
    } else if (mode === 'questions') {
      area.replaceChildren(section('Check your understanding', ...cacaoQuestions.map(([question, choices, correct], index) => {
        const result = feedback();
        const options = choices.map((option, value) => button(option, () => {
          answers[index] = value;
          options.forEach((node, position) => node.setAttribute('aria-pressed', String(position === value)));
          tell(result, value === correct ? 'Correct.' : 'Look for the detail in the reading and try again.', value === correct ? 'correct' : 'retry');
        }, {pressed: answers[index] === value}));
        return el('div', {}, el('h3', {}, question), el('div', {class: 'grid', style: 'margin-top:.45rem'}, options), result);
      })));
    } else {
      const message = feedback();
      const rows = el('ol', {class: 'sequence'});
      order.forEach((value, index) => {
        const [name, description] = cacaoStages[value];
        const move = (direction, key) => {
          const target = index + direction;
          [order[target], order[index]] = [order[index], order[target]];
          draw(key + value);
        };
        rows.append(el('li', {},
          el('strong', {}, (index + 1) + '. ' + name),
          button('↑', () => move(-1, 'up-'), {disabled: index === 0, 'aria-label': 'Move ' + name + ' up', 'data-focus': 'up-' + value}),
          button('↓', () => move(1, 'down-'), {disabled: index === order.length - 1, 'aria-label': 'Move ' + name + ' down', 'data-focus': 'down-' + value}),
          el('p', {class: 'hint', style: 'flex-basis:100%'}, description)));
      });
      area.replaceChildren(section('Put the steps in order', rows, toolbar(
        button('Check order', () => {
          const correct = order.every((value, index) => value === index);
          tell(message, correct ? 'Correct. Drying comes before roasting, then conching and tempering.' : 'Look for the first step after fermentation, then try again.', correct ? 'correct' : 'retry');
        }, {primary: true}),
        button('Shuffle', () => { order = shuffle(order); draw(); })), message));
    }
    if (focusKey) restoreFocus(area, focusKey);
  }
  draw();
};

const scheduleOptions = ['Arrival', 'Morning meeting', 'Morning work', 'Snack', 'Recess', 'Reading', 'Literacy centres', 'Math', 'Art / sensory', 'Lunch', 'Bathroom', 'Choice time', 'Music / PE', 'Pack up'];
games.schedule = (root, entry) => {
  let plan = read('schedule', []);
  let viewing = false;
  const body = el('div', {});
  const edit = button('Build the day', () => { viewing = false; draw(); }, {pressed: true});
  const follow = button('Follow the day', () => { viewing = true; draw(); }, {pressed: false});
  root.append(title(entry, 'Add activities to your plan and follow them in order.'), toolbar(edit, follow),
    el('div', {style: 'margin-top:.8rem'}, body));
  function draw(focusKey) {
    store('schedule', plan);
    edit.setAttribute('aria-pressed', String(!viewing));
    follow.setAttribute('aria-pressed', String(viewing));
    if (viewing) {
      const nextIndex = plan.findIndex(item => !item.done);
      const upcoming = nextIndex < 0 ? [] : plan.slice(nextIndex).filter(item => !item.done);
      const now = upcoming[0];
      const left = section('Follow the day', el('div', {class: 'schedule-now'}, el('span', {class: 'eyebrow'}, 'Now'),
        el('strong', {}, now?.name || (plan.length ? 'The day is complete' : 'Add an activity first')),
        now && el('img', {class: 'activity-picture', alt: '', src: 'art/schedule-' + scheduleOptions.indexOf(now.name) + '.webp'})),
        now && button('Mark done', () => { plan[nextIndex].done = true; draw('mark-done'); }, {primary: true, 'data-focus': 'mark-done'}),
        upcoming[1] && el('p', {}, el('strong', {}, 'Next · '), upcoming[1].name),
        upcoming.length > 2 && el('p', {}, el('strong', {}, 'Later · '), upcoming.slice(2).map(item => item.name).join(', ')));
      body.replaceChildren(split(el('figure', {class: 'visual'}, art('classroom', 'A classroom reading nook')), left));
    } else {
      const tasks = plan.map((item, index) => {
        const move = step => {
          const target = index + step;
          [plan[index], plan[target]] = [plan[target], plan[index]];
          draw('task-' + item.id);
        };
        return el('div', {class: 'schedule-row'},
          el('strong', {class: item.done ? 'done' : ''}, item.name),
          button(item.done ? 'Undo done' : 'Done', () => { item.done = !item.done; draw('task-' + item.id); }, {'data-focus': 'task-' + item.id}),
          button('↑', () => move(-1), {disabled: index === 0, 'aria-label': 'Move ' + item.name + ' earlier'}),
          button('↓', () => move(1), {disabled: index === plan.length - 1, 'aria-label': 'Move ' + item.name + ' later'}),
          button('Remove', () => { plan.splice(index, 1); draw(); }, {'aria-label': 'Remove ' + item.name}));
      });
      const options = scheduleOptions.map((name, index) => button([
        el('img', {class: 'activity-picture', src: 'art/schedule-' + index + '.webp', alt: '', loading: 'lazy'}), name
      ], () => {
        if (plan.length >= 24) return;
        plan.push({id: Date.now().toString(36) + '-' + plan.length, name, done: false});
        draw('add-' + index);
      }, {class: 'picture-choice', 'data-focus': 'add-' + index, disabled: plan.length >= 24}));
      body.replaceChildren(split(section('Activity choices', el('div', {class: 'grid'}, options)),
        section('My day', tasks.length ? tasks : el('p', {}, 'Choose an activity to add it to your day.'),
          plan.length > 0 && button('Reset schedule', () => {
            if (confirm('Clear this day’s schedule?')) { plan = []; draw(); }
          }))));
    }
    if (focusKey) restoreFocus(body, focusKey);
  }
  draw();
};

games.boreal = (root, entry) => {
  const data = window.READING_DATA;
  const selected = new Set();
  const explanation = el('div', {});
  const status = feedback();
  const evidence = data.passage.flat().filter(part => part.isKey);
  let active;
  const evidenceButtons = [];
  const recorded = read('forest-evidence-notes', {});
  const panels = data.passage.map(parts => el('p', {class: 'long-answer'}, parts.map(part => {
    if (!part.isClickable) return part.text;
    const control = button(part.text, () => {
      active = part;
      if (selected.has(part.text)) selected.delete(part.text);
      else selected.add(part.text);
      reflect();
    }, {class: 'word-evidence', pressed: false});
    evidenceButtons.push([part.text, control]);
    return control;
  })));
  const result = el('span', {class: 'pill', role: 'status'});
  const report = el('div', {class: 'panel'});
  report.append(el('h2', {}, 'Evidence notebook'), result, explanation, status);
  const speech = data.passage.map(paragraph => paragraph.map(part => part.text).join('')).join('\n\n');
  function reflect() {
    evidenceButtons.forEach(([name, node]) => node.setAttribute('aria-pressed', String(selected.has(name))));
    result.textContent = evidence.filter(part => selected.has(part.text)).length + ' of ' + evidence.length + ' key ideas found';
    if (!active) {
      explanation.replaceChildren(el('p', {}, 'Select a phrase that helps explain how energy or nutrients move.'));
      return;
    }
    const [label, input] = field('Why does this idea matter?', {value: recorded[active.text] || '', maxlength: 800}, true);
    const key = active.text;
    input.value = recorded[key] || '';
    input.addEventListener('input', () => {
      recorded[key] = input.value;
      store('forest-evidence-notes', recorded);
    });
    explanation.replaceChildren(el('h3', {}, active.text),
      el('p', {}, data.definitions[active.text] || 'Think about whether this phrase explains an important idea or adds a detail.'), label);
  }
  const quiz = el('details', {}, el('summary', {}, 'Comprehension check'),
    ...data.quiz.map(question => {
      const questionStatus = feedback();
      const options = question.options.map(option => button(option, () => {
        options.forEach((node, index) => node.setAttribute('aria-pressed', String(option === question.options[index])));
        tell(questionStatus, (option === question.answer ? 'Correct. ' : 'Try again. ') + question.explanation, option === question.answer ? 'correct' : 'retry');
      }, {pressed: false}));
      return section(question.question, el('div', {class: 'grid'}, options), questionStatus);
    }));
  root.append(title(entry, 'Find the words that explain how living things get energy. Then explain one choice.'),
    split(section('Read and find', toolbar(
      button('Read aloud', () => speak(speech, status)),
      button('Stop reading', () => window.speechSynthesis?.cancel()),
      button('Hint for the next idea', () => {
        const next = evidence.find(part => !selected.has(part.text));
        if (!next) return tell(status, 'You found all the key ideas.', 'correct');
        const paragraph = data.passage.findIndex(parts => parts.includes(next));
        tell(status, 'Look in paragraph ' + (paragraph + 1) + ' for an idea about how energy or nutrients move.');
      }),
      button('Start over', () => { selected.clear(); active = null; reflect(); tell(status, ''); }),
      button('Download my work', () => download('boreal-forest-observations.txt',
        [...selected].map(key => key + '\n' + (recorded[key] || '')).join('\n\n')))), panels, quiz),
    el('div', {}, el('figure', {class: 'visual'}, art('boreal', 'A deer browsing in a boreal spruce forest')), report)));
  reflect();
};

const builtInDictionary = {
  enormous: ['adjective', 'Very large.', ['huge', 'immense'], ['tiny', 'small']],
  sturdy: ['adjective', 'Strong and hard to break.', ['strong', 'solid'], ['flimsy', 'weak']],
  happy: ['adjective', 'Feeling or showing pleasure.', ['glad', 'joyful'], ['sad', 'unhappy']]
};
games.vocab = (root, entry) => {
  let request = 0;
  let definitionFor = 'enormous';
  const [wordLabel, word] = field('Word to look up', {type: 'search', value: 'enormous', maxlength: 80});
  const meaning = el('p', {class: 'long-answer'});
  const speechType = el('span', {class: 'pill'});
  const similar = el('p', {});
  const opposite = el('p', {});
  const [myLabel, my] = field('My meaning', {placeholder: 'Explain this word in your own words.', maxlength: 800}, true);
  const [sentenceLabel, sentence] = field('My sentence', {placeholder: 'Use the word in a sentence.', maxlength: 800}, true);
  const status = feedback();
  function show(result, term = '') {
    const [type, definition, synonyms, antonyms] = result;
    speechType.textContent = type || 'Part of speech unavailable';
    meaning.textContent = definition;
    similar.textContent = synonyms.join(', ') || 'No similar words listed.';
    opposite.textContent = antonyms.join(', ') || 'No opposites listed.';
    definitionFor = term;
  }
  async function lookup(event) {
    event?.preventDefault();
    const term = word.value.trim().toLowerCase();
    const id = ++request;
    if (!term) return tell(status, 'Enter a word to look up.', 'retry');
    if (Object.hasOwn(builtInDictionary, term)) {
      show(builtInDictionary[term], term);
      return tell(status, 'Showing the entry for “' + term + '”.', 'correct');
    }
    tell(status, 'Looking up “' + term + '”…');
    try {
      const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(term), {signal: AbortSignal.timeout(8000)});
      if (!response.ok) throw Error('No entry returned');
      const data = await response.json();
      const definitions = data.flatMap(item => item.meanings || []);
      if (!definitions.length) throw Error('No meanings found');
      if (request !== id) return;
      const collect = key => [...new Set(definitions.flatMap(item => [...(item[key] || []),
        ...item.definitions.flatMap(definition => definition[key] || [])]))].slice(0, 7);
      show([definitions[0].partOfSpeech, definitions[0].definitions[0].definition, collect('synonyms'), collect('antonyms')], term);
      tell(status, 'Showing the entry for “' + term + '”.', 'correct');
    } catch {
      if (request !== id) return;
      show(['', 'No dictionary entry loaded. You can still write your own meaning.', [], []]);
      tell(status, 'Try a different word or continue with the writing fields.', 'retry');
    }
  }
  const form = el('form', {class: 'toolbar', onsubmit: lookup}, wordLabel, el('button', {type: 'submit', class: 'primary'}, 'Look up'));
  root.append(title(entry), section(null, form, status),
    el('div', {class: 'grid', style: 'margin-top:.8rem'}, section('Dictionary meaning', speechType, meaning, el('h3', {}, 'Similar'), similar, el('h3', {}, 'Opposite'), opposite),
      section('Make it your own', myLabel, sentenceLabel, button('Download word notes', () => download('word-notes.txt',
        [word.value.trim(), definitionFor && definitionFor === word.value.trim().toLowerCase() ? meaning.textContent : '',
          'My meaning: ' + my.value, 'My sentence: ' + sentence.value].join('\n\n'))))));
  show(builtInDictionary.enormous, 'enormous');
};

games.wordwork = (root, entry) => {
  const fields = [
    ['name', 'Name (optional)', 'Your name here…'],
    ['word', 'Word', 'Write word…'],
    ['definition', 'Definition', 'What does it mean?'],
    ['sentence', 'Sentence', 'Use the word in a sentence…'],
    ['synonym', 'Synonym', 'Similar word…']
  ];
  const saved = read('wordwork', {});
  const status = feedback();
  const inputs = Object.create(null);
  const printed = Object.create(null);
  const boxes = fields.map(([id, label, placeholder]) => {
    const multiline = id === 'definition' || id === 'sentence';
    const input = el(multiline ? 'textarea' : 'input', {
      id: 'worksheet-' + id, maxlength: multiline ? 800 : 90, placeholder, value: saved[id] || ''
    });
    const printValue = el('div', {class: 'worksheet-print-value'}, input.value);
    inputs[id] = input;
    printed[id] = printValue;
    input.addEventListener('input', () => {
      printValue.textContent = input.value;
      store('wordwork', snapshot());
    });
    return el('div', {class: 'worksheet-box worksheet-' + id},
      id === 'word' && el('div', {class: 'worksheet-spiral', 'aria-hidden': 'true'},
        Array.from({length: 8}, () => el('span', {}))),
      id === 'definition' && el('div', {class: 'worksheet-holes', 'aria-hidden': 'true'},
        Array.from({length: 3}, () => el('span', {}))),
      el('label', {htmlFor: input.id, class: 'worksheet-tag', 'aria-label': label}, id === 'name' ? 'Name' : label),
      el('div', {class: 'worksheet-writing'}, input, printValue));
  });
  function snapshot() { return Object.fromEntries(fields.map(([id]) => [id, inputs[id].value])); }
  const actions = toolbar(
    el('a', {class: 'control', href: 'https://www.merriam-webster.com/kids', target: '_blank', rel: 'noopener'}, 'Dictionary for Kids'),
    button('Clear', () => {
      if (!Object.values(snapshot()).some(Boolean) || confirm('Clear the writing on this page?')) {
        for (const [id] of fields) {
          inputs[id].value = '';
          printed[id].textContent = '';
        }
        store('wordwork', {});
        inputs.word.focus();
      }
    }),
    button('Print / save PDF', () => window.print(), {primary: true}));
  actions.classList.add('worksheet-actions', 'print-hide');
  const pencil = el('div', {class: 'worksheet-pencil', 'aria-hidden': 'true'}, el('span', {}));
  const sheet = el('section', {class: 'word-worksheet', 'aria-label': 'Interactive word worksheet'},
    boxes[0], el('div', {class: 'worksheet-grid'}, boxes[1], boxes[2], pencil, boxes[3], boxes[4]));
  const extras = toolbar(
      button('Read my sentence', () => speak(inputs.sentence.value, status)),
      button('Download writing', () => download('my-word-work.txt', fields.map(([id, label]) => label + '\n' + inputs[id].value).join('\n\n'))), status);
  extras.classList.add('worksheet-actions', 'print-hide');
  root.append(title(entry, 'Write right on the worksheet. Add a word, explain it, use it in a sentence, and find a synonym.'), actions, sheet, extras);
};

const scienceDeck = [
  {term: 'Particle model of matter', definition: 'A model that describes matter as tiny particles in constant motion.'},
  {term: 'Particle', definition: 'A very small piece of matter, such as an atom or molecule.'},
  {term: 'Temperature', definition: 'A measure related to the average kinetic energy of particles in a substance.'},
  {term: 'Heating', definition: 'Transferring thermal energy into a substance.'},
  {term: 'Cooling', definition: 'Removing thermal energy from a substance.'}
];
games.flashcards = (root, entry) => {
  const saved = read('flashcards', {deck: scienceDeck, review: [], known: []});
  let deck = saved.deck;
  let review = new Set(saved.review);
  let known = new Set(saved.known);
  let order = deck.map((_, index) => index);
  let index = 0;
  let back = false;
  let reviewMode = false;
  const status = feedback();
  const count = el('span', {class: 'pill', role: 'status'});
  const face = button('', flip, {class: 'card-face'});
  const flipButton = button('Reveal definition', flip, {primary: true});
  const previous = button('Previous', () => advance(-1));
  const next = button('Next', () => advance(1));
  const reviewButton = button('Review later', () => rate(false));
  const knownButton = button('Got it', () => rate(true));
  const print = el('section', {class: 'flashcard-print print-only'});
  const [setLabel, setText] = field('One pair per block. Put the term on line one and the definition on line two.', {placeholder: 'Term\nDefinition\n\nNext term\nNext definition', maxlength: 60000}, true);
  const file = el('input', {type: 'file', accept: '.json,application/json', 'aria-label': 'Import JSON deck'});
  function normalise(cards) {
    if (!Array.isArray(cards) || !cards.length || cards.length > 200) throw Error('Use a deck with 1 to 200 cards.');
    return cards.map(item => {
      const term = typeof item.term === 'string' ? item.term.trim() : '';
      const definition = typeof (item.definition || item.def) === 'string' ? (item.definition || item.def).trim() : '';
      const imageSrc = typeof item.imageSrc === 'string' && /^https:\/\/[^ ]+$|^data:image\/(?:png|webp|jpeg);base64,/i.test(item.imageSrc) ? item.imageSrc : '';
      if (!term || !definition || term.length > 400 || definition.length > 4000) throw Error('Every card needs a short term and a definition.');
      return {term, definition, imageSrc};
    });
  }
  function save() { store('flashcards', {deck, review: [...review], known: [...known]}); }
  function set(newDeck) {
    deck = normalise(newDeck);
    known = new Set();
    review = new Set();
    reviewMode = false;
    order = deck.map((_, position) => position);
    index = 0;
    back = false;
    save();
    render();
    tell(status, 'Loaded ' + deck.length + ' cards.', 'correct');
  }
  function render() {
    const item = deck[order[index]];
    count.textContent = item ? 'Card ' + (index + 1) + ' of ' + order.length + ' · ' + known.size + ' known' : 'No cards in review';
    face.replaceChildren(item ? back ? item.definition : item.term : 'Mark cards for review as you study.');
    if (item?.imageSrc && back) face.append(el('img', {src: item.imageSrc, alt: 'Reference for ' + item.term, class: 'card-reference'}));
    flipButton.textContent = back ? 'Show term' : 'Reveal definition';
    face.disabled = previous.disabled = next.disabled = flipButton.disabled = !item;
    reviewButton.disabled = knownButton.disabled = !item || !back;
  }
  function advance(step) {
    if (!order.length) return;
    index = (index + step + order.length) % order.length;
    back = false;
    render();
  }
  function flip() {
    if (!order.length) return;
    back = !back;
    render();
  }
  function rate(isKnown) {
    const current = order[index];
    if (isKnown) {
      known.add(current);
      review.delete(current);
    } else {
      known.delete(current);
      review.add(current);
    }
    save();
    if (reviewMode && isKnown) {
      order.splice(index, 1);
      index = Math.min(index, Math.max(0, order.length - 1));
      back = false;
      render();
    } else advance(1);
  }
  file.addEventListener('change', async () => {
    try {
      const input = file.files[0];
      if (!input) return;
      if (input.size > 5 * 1024 * 1024) throw Error('Choose a JSON file under 5 MB.');
      const raw = JSON.parse(await input.text());
      set(Array.isArray(raw) ? raw : raw.cards);
    } catch (error) { tell(status, error.message, 'retry'); }
    file.value = '';
  });
  const controls = section(null, count, face, toolbar(previous, flipButton, next), toolbar(reviewButton, knownButton,
    button('Read aloud', () => {
      const card = deck[order[index]];
      if (card) speak(back ? card.definition : card.term, status);
    })), toolbar(button('Review deck', () => {
      order = [...review];
      index = 0;
      back = false;
      reviewMode = true;
      render();
    }), button('All cards', () => {
      reviewMode = false;
      order = deck.map((_, position) => position);
      index = 0;
      back = false;
      render();
    })), status);
  const editor = section('Make your own deck', setLabel, toolbar(button('Load text pairs', () => {
    try {
      const pairs = setText.value.trim().split(/\r?\n\s*\r?\n/).map(block => {
        const [term, ...lines] = block.trim().split(/\r?\n/);
        return {term, definition: lines.join('\n')};
      });
      set(pairs);
    } catch (error) { tell(status, error.message, 'retry'); }
  }), button('Restore matter deck', () => {
    if (confirm('Restore the original matter deck?')) set(scienceDeck);
  })), el('label', {class: 'field'}, 'Import JSON deck', file), toolbar(
    button('Export JSON', () => download('flashcards.json', JSON.stringify(deck, null, 2), 'application/json')),
    button('Print cards', () => {
      print.replaceChildren(...deck.map(card => section(card.term, el('p', {}, card.definition))));
      window.print();
    })));
  const workspace = split(controls, editor);
  workspace.classList.add('print-hide');
  root.append(title(entry, 'Think of the definition, reveal it, and decide whether to review the card.'), workspace, print);
  render();
};

function svgElement(name, attrs) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  return node;
}
games.canada = (root, entry) => {
  const notice = feedback('Loading the original province and territory shapes…');
  const game = el('div', {});
  root.append(title(entry, 'Select a piece, then choose where it belongs on the map.'), notice, game);
  const library = el('script', {src: 'legacy/d3.min.js'});
  library.addEventListener('error', () => tell(notice, 'The map renderer could not load.', 'retry'));
  library.addEventListener('load', async () => {
    try {
      const response = await fetch('legacy/canada.geojson');
      if (!response.ok) throw Error('Map data unavailable');
      const map = await response.json();
      const expected = ['British Columbia','Alberta','Saskatchewan','Manitoba','Ontario','Quebec','New Brunswick','Nova Scotia','Prince Edward Island','Newfoundland and Labrador','Yukon','Northwest Territories','Nunavut'];
      const features = map.features.map(feature => feature.properties.name === 'Yukon Territory'
        ? {...feature, properties: {...feature.properties, name: 'Yukon'}}
        : feature).filter(feature => expected.includes(feature.properties.name));
      if (features.length !== 13) throw Error('The map must contain all 13 pieces');
      const project = d3.geoMercator().fitExtent([[18, 18], [982, 565]], {type: 'FeatureCollection', features});
      const path = d3.geoPath(project);
      const placed = new Set();
      let order = shuffle(features);
      let picked = null;
      let hints = false;
      const swatches = ['#3d6e70','#518571','#9db69e','#85b0cc','#81a6c4','#537080','#5c6784','#7b8ba0','#a1a8c3','#597899','#7484a9','#8fb7b7','#78bacb'];
      const board = svgElement('svg', {viewBox: '0 0 1000 580', class: 'canada-board', role: 'group', 'aria-label': 'Map of Canada'});
      const bank = el('div', {class: 'grid province-tray'});
      const targets = new Map();
      const locations = el('div', {class: 'grid'});
      const score = el('span', {class: 'pill', role: 'status'});
      function select(piece) {
        picked = piece;
        tell(notice, 'Selected ' + piece + '. Choose its location on the map.');
        draw();
      }
      function move(target) {
        if (!picked) return tell(notice, 'Choose a piece first.', 'retry');
        if (picked !== target) return tell(notice, 'That shape does not fit here. Compare the edges and try again.', 'retry');
        placed.add(picked);
        picked = null;
        tell(notice, placed.size === 13 ? 'All 13 provinces and territories are placed.' : target + ' fits here.', 'correct');
        draw();
      }
      features.forEach((feature, index) => {
        const name = feature.properties.name;
        const outline = svgElement('path', {d: path(feature), tabindex: 0, role: 'button', 'aria-label': 'Map area ' + (index + 1),
          stroke: '#8d9c9d', 'stroke-width': 1.1, 'vector-effect': 'non-scaling-stroke', fill: '#e4e7e3'});
        outline.addEventListener('click', () => move(name));
        outline.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); move(name); }
        });
        outline.addEventListener('dragover', event => event.preventDefault());
        outline.addEventListener('drop', event => {
          event.preventDefault();
          move(name);
        });
        const marker = svgElement('text', {x: path.centroid(feature)[0], y: path.centroid(feature)[1], class: 'map-name', 'text-anchor': 'middle'});
        marker.textContent = name;
        marker.style.display = 'none';
        board.append(outline, marker);
        targets.set(name, {outline, marker, fill: swatches[index]});
      });
      function draw() {
        score.textContent = placed.size + ' of 13 placed';
        targets.forEach(({outline, marker, fill}, name) => {
          outline.setAttribute('fill', placed.has(name) ? fill : '#e4e7e3');
          outline.setAttribute('aria-label', hints || placed.has(name) ? name : 'Map area ' + (features.findIndex(feature => feature.properties.name === name) + 1));
          marker.style.display = hints || placed.has(name) ? '' : 'none';
        });
        locations.replaceChildren(...features.map((feature, index) => {
          const name = feature.properties.name;
          return button(hints || placed.has(name) ? name : 'Map area ' + (index + 1), () => move(name), {disabled: placed.has(name)});
        }));
        bank.replaceChildren(...order.filter(feature => !placed.has(feature.properties.name)).map(feature => {
          const name = feature.properties.name;
          const [[x0,y0],[x1,y1]] = path.bounds(feature);
          const mini = svgElement('svg', {viewBox: [x0,y0,x1-x0,y1-y0].join(' '), 'aria-hidden': 'true'});
          mini.append(svgElement('path', {d: path(feature), fill: targets.get(name).fill}));
          const piece = button([mini, el('span', {}, name)], () => select(name), {pressed: picked === name, draggable: true});
          piece.addEventListener('dragstart', event => {
            picked = name;
            event.dataTransfer.setData('text/plain', name);
          });
          return piece;
        }));
      }
      const hintButton = button('Show outlines and names', () => {
        hints = !hints;
        hintButton.textContent = hints ? 'Hide names' : 'Show outlines and names';
        hintButton.setAttribute('aria-pressed', String(hints));
        draw();
      }, {pressed: false});
      game.replaceChildren(toolbar(score, hintButton, button('Shuffle pieces', () => { order = shuffle(order); draw(); }),
        button('Reset', () => { placed.clear(); picked = null; tell(notice, 'Choose a piece to begin.'); draw(); })),
        el('div', {class: 'map-workspace'}, el('figure', {class: 'visual'}, board), section('Piece tray', bank)), el('details', {class: 'map-options'}, el('summary', {}, 'Choose a map area by button'), locations));
      game.append(el('p', {class: 'hint'}, 'Map outlines from ', el('a', {href: 'https://github.com/codeforgermany/click_that_hood', target: '_blank', rel: 'noopener'}, 'Click That ’Hood'), '.'));
      tell(notice, 'Choose a piece to begin.');
      draw();
    } catch (error) { console.error(error); tell(notice, 'The map could not load. You can open the original from the header.', 'retry'); }
  });
  document.head.append(library);
};
