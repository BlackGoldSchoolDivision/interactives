'use strict';
const clamp = (number, min, max) => Math.max(min, Math.min(max, number));

function careGame(root, entry, isBear) {
  const labels = isBear ? ['Hydration', 'Warmth', 'Fullness'] : ['Water', 'Sunlight', 'Temperature'];
  const baseline = isBear ? [50, 50, 60] : [50, 50, 20];
  const units = isBear ? ['%', '%', '%'] : ['%', '%', '°C'];
  const stages = isBear ? ['New cub', 'Exploring', 'Growing', 'Young bear'] : ['Seed', 'Sprout', 'Leaves', 'Flowers'];
  const safeRanges = isBear ? [[30, 89], [30, 89], [30, 89]] : [[30, 89], [30, 89], [15, 30]];
  const bearPictures = ['bear-flat', 'bear-exploring-flat', 'bear-growing-flat', 'bear-young-flat'];
  function bearNeed({levels, stress}) {
    if (stress >= 100) return 'became too uncomfortable';
    return ['is too thirsty', 'is too cold', 'is too hungry'][levels.indexOf(0)] || '';
  }
  const start = () => ({
    day: 0, levels: [...baseline], growth: 0, stress: 0, notes: [], events: [],
    ...(isBear ? {unhappyReason: ''} : {dryDays: 0, dead: false})
  });
  let state = read(entry.id, start());
  if (isBear && state.unhappyReason == null) state.unhappyReason = state.day ? bearNeed(state) : '';
  if (!isBear && state.dryDays == null) {
    // Old journals record low-water days. Use that history when it is available.
    const lowWaterDays = new Set(state.events.flatMap(event => {
      const match = /^Step (\d+) · Check ([^.]+)\. Growth: \d+%\.$/.exec(event);
      return match && match[2].split(', ').includes('Water') ? [Number(match[1])] : [];
    }));
    state.dryDays = 0;
    if (state.levels[0] < 20) {
      for (let day = state.day; lowWaterDays.has(day) && state.dryDays < 5; day--) state.dryDays++;
    }
    state.dead = state.dryDays >= 5;
  }
  let running = false;
  let runTimer;
  const scene = art(isBear ? 'bear-flat' : 'plant-seed-flat', isBear ? 'A black bear cub on a log' : 'A seed in a pot');
  const stageChip = el('span', {class: 'pill'}, '');
  const visual = el('figure', {class: 'visual featured-image'}, scene, stageChip,
    el('figcaption', {}, isBear ? 'Virtual care model · observe how needs change.' : 'Greenhouse model · vary one condition and observe.'));
  const summary = feedback();
  const growth = el('progress', {class: 'progress', max: 100, 'aria-label': 'Growth'});
  const report = el('ol', {class: 'log', 'aria-label': 'Observation log'});
  const note = field('Record an observation', {placeholder: 'What changed after this step?', maxlength: 500}, true);
  const labelValues = [];
  const inputs = labels.map((label, index) => {
    const output = el('output', {});
    labelValues.push(output);
    const input = el('input', {
      type: 'range', min: 0, max: index === 2 && !isBear ? 45 : 100,
      value: state.levels[index], oninput: event => {
        state.levels[index] = Number(event.target.value);
        render();
      }
    });
    return el('label', {class: 'field'}, el('span', {class: 'label-row'}, label, output), input);
  });
  const sliders = inputs.map(label => label.querySelector('input'));
  const pictures = ['plant-seed-flat', 'plant-sprout-flat', 'plant-leaves-flat', 'plant-flowers-flat'];
  const render = () => {
    const stage = state.growth >= 75 ? 3 : state.growth >= 50 ? 2 : state.growth >= (isBear ? 25 : 20) ? 1 : 0;
    const wilted = !isBear && state.dryDays >= 2;
    const dead = !isBear && state.dead;
    const unhappy = isBear && Boolean(state.unhappyReason);
    const ended = dead || unhappy;
    let label = stages[stage];
    if (isBear) {
      if (unhappy) label = 'Care trial ended';
      scene.src = 'art/' + (unhappy ? 'bear-unhappy-flat' : bearPictures[stage]) + '.webp';
      scene.alt = unhappy ? 'A quiet bear cub resting its head on a log.' : 'Black bear: ' + label;
      for (const action of quickActions.querySelectorAll('button')) action.disabled = unhappy;
    } else {
      let picture = pictures[stage];
      if (wilted) {
        picture = stage === 0 ? 'plant-dry-seed-flat' : dead ? 'plant-dead-flat' : 'plant-wilted-flat';
        label = dead ? (stage === 0 ? 'Seed dried out' : 'Plant died') : (stage === 0 ? 'Seed drying out' : 'Wilting');
      }
      scene.src = 'art/' + picture + '.webp';
      scene.alt = 'Bean plant: ' + label;
    }
    stageChip.textContent = (isBear ? 'Step ' : 'Day ') + state.day + ' · ' + label;
    labelValues.forEach((output, index) => {
      output.textContent = state.levels[index] + units[index];
      sliders[index].value = state.levels[index];
      sliders[index].disabled = ended;
    });
    advanceButton.disabled = runButton.disabled = ended;
    if (!isBear) {
      waterButton.disabled = dead;
      reset.textContent = dead ? 'Plant a new seed' : 'Reset plant';
    }
    growth.value = state.growth;
    growth.textContent = state.growth + '%';
    const reportText = 'Growth ' + state.growth + '% · ' + (isBear ? 'Discomfort ' : 'Stress ') + state.stress + '%';
    const status = unhappy
      ? 'The bear ' + state.unhappyReason + '. Start with a new cub to try a different care plan.'
      : dead
      ? (stage === 0 ? 'The seed dried out before it could sprout.' : 'The plant died after several days with too little water.') + ' Plant a new seed to try again.'
      : wilted
      ? (stage === 0 ? 'The soil is too dry for the seed.' : 'The plant is wilting.') + ' Bring water to at least 30%, then advance a day to check recovery.'
      : !isBear && state.dryDays === 1
      ? 'The soil is drying out. Water the plant before advancing. ' + reportText
      : reportText;
    tell(summary, status, wilted || unhappy ? 'retry' : '');
    report.replaceChildren(...state.events.slice(-12).map(item => el('li', {}, item)));
    store(entry.id, state);
  };
  const advance = () => {
    if (state.dead || state.unhappyReason) return;
    const problems = labels.filter((label, index) => state.levels[index] < safeRanges[index][0] || state.levels[index] > safeRanges[index][1]);
    const waterAtStart = state.levels[0];
    const wasWilting = state.dryDays >= 2;
    state.day++;
    state.stress = clamp(state.stress + (problems.length ? 12 * problems.length : -12), 0, 100);
    state.growth = clamp(state.growth + (problems.length ? 0 : state.stress > 25 ? 5 : 11), 0, 100);
    state.levels[0] = Math.max(0, waterAtStart - 11);
    let observation = problems.length ? 'Check ' + problems.join(', ') + '.' : 'Conditions supported growth.';
    if (isBear) {
      state.levels[1] = Math.max(0, state.levels[1] - 7);
      state.levels[2] = Math.max(0, state.levels[2] - 10);
      state.unhappyReason = bearNeed(state);
      if (state.unhappyReason) observation = 'Care trial ended because the bear ' + state.unhappyReason + '.';
    } else {
      state.dryDays = state.levels[0] < 20 ? (waterAtStart >= 30 ? 1 : state.dryDays + 1) : 0;
      state.dead = state.dryDays >= 5;
      if (state.dead) {
        state.stress = 100;
        observation = 'The plant dried out.';
      } else if (state.dryDays >= 2) observation = 'Prolonged dry soil is stressing the plant.';
      else if (wasWilting) observation = 'The soil has enough water for the plant to begin recovering.';
    }
    if (state.dead || state.unhappyReason) stopRun();
    state.events.push((isBear ? 'Step ' : 'Day ') + state.day + ' · ' + observation + ' Growth: ' + state.growth + '%.');
    render();
  };
  function stopRun() {
    running = false;
    clearTimeout(runTimer);
    runButton.textContent = 'Run slowly';
  }
  const advanceButton = button(isBear ? 'Advance one step' : 'Advance a day', advance, {primary: true});
  const runButton = button('Run slowly', () => {
    running = !running;
    clearTimeout(runTimer);
    runButton.textContent = running ? 'Pause' : 'Run slowly';
    if (running) {
      const run = () => {
        if (!running) return;
        advance();
        if (running && (!isBear || state.growth < 100)) runTimer = setTimeout(run, 1500);
        else stopRun();
      };
      runTimer = setTimeout(run, 100);
    }
  });
  const waterButton = !isBear && button('Water', () => {
    state.levels[0] = clamp(state.levels[0] + 15, 0, 100);
    render();
  });
  const quickActions = isBear ? toolbar(...['Give water', 'Provide warmth', 'Feed'].map((label, index) =>
    button(label, () => {
      state.levels[index] = clamp(state.levels[index] + 16, 0, 100);
      render();
    }))) : toolbar(waterButton);
  const logs = el('details', {}, el('summary', {}, 'Observation journal'), report, note[0],
    toolbar(button('Save note', () => {
      const value = note[1].value.trim();
      if (!value) return;
      const item = 'Step ' + state.day + ' · ' + value;
      state.notes.push(item);
      state.events.push(item);
      note[1].value = '';
      render();
    }), button('Download observations', () => download(entry.id + '-observations.txt', state.events.join('\n')))));
  const reset = button(isBear ? 'New cub' : 'Reset plant', () => {
    if (state.day && !confirm('Start a new observation journal?')) return;
    stopRun();
    state = start();
    render();
  });
  root.append(title(entry), split(visual, section(isBear ? 'Care and observe' : 'Growing conditions',
    inputs, quickActions, toolbar(advanceButton, runButton, reset), growth, summary, logs)));
  render();
}
games.plant = (root, entry) => careGame(root, entry, false);
games.bear = (root, entry) => careGame(root, entry, true);

const animalPairs = [
  ['Dog', 'Puppy', 'Puppies grow into dogs. Look at the shape of the nose and paws.'],
  ['Cat', 'Kitten', 'Kittens grow into cats. Look at their pointed ears.'],
  ['Maple tree', 'Maple seedling', 'A seedling is a young plant. Look at its maple leaves.'],
  ['Hen', 'Chick', 'A chick is a young chicken. Both have a beak.'],
  ['Cow', 'Calf', 'A calf is a young cow. Look at the hooves.'],
  ['Person', 'Baby', 'A baby is a young person. Notice the similar body features.'],
  ['Pig', 'Piglet', 'Piglets grow into pigs. Look at the snout.'],
  ['Duck', 'Duckling', 'A duckling grows into a duck. Look at the bill and webbed feet.']
];
games.offspring = (root, entry) => {
  let order = shuffle(animalPairs.map((_, index) => index));
  let turn = 0;
  let options = [];
  const display = el('div', {});
  root.append(title(entry, 'Look closely at the parent, then choose its offspring.'), display);
  function draw() {
    if (turn >= order.length) {
      display.replaceChildren(section('All eight matches complete', button('Play again', () => {
        order = shuffle(order);
        turn = 0;
        draw();
      }, {primary: true})));
      return;
    }
    const answer = order[turn];
    const pair = animalPairs[answer];
    options = shuffle([answer, ...shuffle(order.filter(value => value !== answer)).slice(0, 2)]);
    const notice = feedback();
    const next = button('Next parent', () => {
      turn++;
      draw();
      display.querySelector('h2')?.focus();
    }, {primary: true, disabled: true});
    const choices = options.map(value => button([
      art('baby-' + value), el('span', {}, animalPairs[value][1])
    ], event => {
      if (value !== answer) {
        tell(notice, 'Look again. Which young animal shares features with the parent?', 'retry');
        return;
      }
      tell(notice, pair[2], 'correct');
      for (const choice of choices) choice.disabled = true;
      next.disabled = false;
      next.focus();
    }, {class: 'choice-art'}));
    display.replaceChildren(split(el('figure', {class: 'visual'}, art('parent-' + answer, 'Parent: ' + pair[0]),
      el('figcaption', {}, pair[0])), section(null,
      el('span', {class: 'pill'}, 'Match ' + (turn + 1) + ' of ' + order.length),
      el('h2', {tabIndex: -1}, 'Which one is the offspring?'),
      el('div', {class: 'grid offspring-choices'}, choices), notice, next)));
  }
  draw();
};

const earthDeck = [
  ['A river cuts deeper into rock over many years.', 1, 'Water can gradually wear away rock, deepening a canyon.', 'earth-river', 'A river winds through a layered canyon.'],
  ['A landslide moves rock downhill in minutes.', 0, 'Gravity can move soil and rock suddenly.', 'earth-landslide', 'Rocks and loose soil move down a steep slope.'],
  ['An earthquake shifts the ground.', 0, 'Stored energy releases quickly when rocks slip.', 'earth-earthquake', 'A crack in the ground cuts across a shifted road.'],
  ['Wind slowly wears away exposed rock.', 1, 'Wind-blown particles abrade the rock over time.', 'earth-wind', 'Wind carries sand past rounded rock.'],
  ['An eruption spreads fresh lava across the ground.', 0, 'A lava flow can cover the ground over hours or days.', 'earth-volcano', 'Lava flows from an erupting volcano.'],
  ['A glacier carves a valley over centuries.', 1, 'Moving ice wears away the ground over long periods.', 'earth-glacier', 'Blue glacial ice fills a rocky valley.'],
  ['An intense flood washes away a riverbank.', 0, 'Powerful floodwater can erode a bank quickly.', 'earth-flood', 'A swollen river overtops its banks.'],
  ['Tectonic plates move and lift a mountain range.', 1, 'A mountain range can build over millions of years.', 'earth-mountains', 'A mountain range exposes tilted layers of rock.'],
  ['A tornado uproots trees and exposes bare soil.', 0, 'A tornado can change the land within minutes.', 'earth-tornado', 'A funnel cloud touches the ground near a fallen tree.'],
  ['Soil develops as rock breaks down and organic material builds up.', 1, 'Soil formation normally takes many years.', 'earth-soil', 'Layers of leaf litter, soil and broken rock.'],
  ['A wildfire burns away much of the plant cover.', 0, 'After a fire, exposed soil may wash away more easily.', 'earth-wildfire', 'Flames spread across a conifer forest.'],
  ['Productive land gradually becomes drier and less able to support plants.', 1, 'Land degradation can build up over many years.', 'earth-dryland', 'A dry field has cracked ground and sparse plants.'],
  ['A hurricane pushes storm water across a beach.', 0, 'A strong storm can change a shoreline in hours.', 'earth-coast', 'Storm waves wash onto a sandy shore.'],
  ['Continents drift apart as plates move.', 1, 'Most plates move only a few centimetres per year.', 'earth-plates', 'A broad ocean separates two rocky land masses.']
];
const lightDeck = [
  ['A flashlight switched on', 1, 'People built the flashlight to turn electrical energy into light.', 'light-flashlight', 'A yellow flashlight casts a beam across a desk.'],
  ['The Sun', 0, 'The Sun gives off its own light naturally.', 'light-sun', 'A golden sun in a bright sky.'],
  ['A distant star', 0, 'Stars give off light without a human-made device.', 'light-star', 'A bright star in a night sky.'],
  ['A firefly glowing at night', 0, 'A chemical reaction in the firefly produces light.', 'light-firefly', 'A firefly glows over grass.'],
  ['Lightning in a storm', 0, 'Electrical discharge in a storm can create a flash of light.', 'light-lightning', 'Lightning flashes beneath a storm cloud.'],
  ['Glowing lava from an eruption', 0, 'The lava is hot enough to glow naturally.', 'light-lava', 'Glowing lava flows over volcanic rock.'],
  ['A lightning-started wildfire', 0, 'The fire started naturally and its flames emit light.', 'light-wildfire', 'Flames spread through a woodland.'],
  ['A switched-on light bulb', 1, 'People made this source of light.', 'light-bulb', 'A hanging light bulb glows.'],
  ['A candle someone lit', 1, 'People made and lit the candle. The flame gives off light.', 'light-candle', 'A lit candle held in a hand.'],
  ['A bright computer screen', 1, 'The screen uses electricity to produce light.', 'light-screen', 'A computer screen glows in a dark room.'],
  ['A campfire someone built and lit', 1, 'People made the campfire. The flames emit light.', 'light-campfire', 'A small fire burns inside a ring of stones.']
];

function classify(root, entry, items, labels, question, testLight = false) {
  let order = [items[0], ...shuffle(items.slice(1))];
  let index = 0;
  let correct = 0;
  const game = el('div', {});
  const picture = art(items[0][3], items[0][4]);
  const visual = el('figure', {class: 'visual'}, picture);
  root.append(title(entry), split(visual, game));
  function draw() {
    if (index === order.length) {
      game.replaceChildren(section('Activity complete', feedback('You classified ' + correct + ' examples.'),
        button('Play again', () => {
          order = shuffle(items);
          index = 0;
          correct = 0;
          draw();
        }, {primary: true})));
      return;
    }
    const [prompt, answer, explanation, artwork, alt] = order[index];
    picture.src = 'art/' + artwork + '.webp';
    picture.alt = alt;
    let flashlightOff = false;
    const notice = feedback();
    const next = button('Next example', () => {
      index++;
      draw();
      game.querySelector('h2')?.focus();
    }, {disabled: true, primary: true});
    const buttons = labels.map((label, value) => button(label, () => {
      if (value !== answer) {
        tell(notice, 'Try the other category. ' + explanation, 'retry');
        return;
      }
      correct++;
      tell(notice, explanation, 'correct');
      for (const choice of buttons) choice.disabled = true;
      next.disabled = false;
      next.focus();
    }));
    game.replaceChildren(section(null,
      el('span', {class: 'pill'}, 'Example ' + (index + 1) + ' of ' + order.length),
      el('h2', {tabIndex: -1}, question), el('p', {class: 'long-answer'}, prompt),
      testLight && button('Test the light', () => {
        if (artwork === 'light-flashlight') {
          flashlightOff = !flashlightOff;
          picture.src = flashlightOff ? 'art/light-flashlight-off.webp' : 'art/' + artwork + '.webp';
          picture.alt = flashlightOff ? 'A yellow flashlight switched off on a desk.' : alt;
          tell(notice, flashlightOff ? 'With the flashlight off, the beam disappears.' : 'The flashlight sends light across the table.');
        } else tell(notice, 'This example emits light. Does a person make or start this source?');
      }),
      el('div', {class: 'choice-grid'}, buttons), notice, next));
  }
  draw();
}
games.earth = (root, entry) => classify(root, entry, earthDeck, ['Fast change', 'Slow change'], 'How fast does the surface change?');
games.light = (root, entry) => classify(root, entry, lightDeck, ['Natural', 'Human-made'], 'Where does the light come from?', true);

const weights = [['Feather', 1], ['Dry leaf', 2], ['Paperclip', 3], ['Pencil', 9], ['Small pebble', 34], ['Baseball', 145], ['Paperback book', 250], ['Hand-sized rock', 700], ['Small steel anchor', 3000], ['Safety pin', 2], ['Cotton ball', 1], ['Inflated balloon', 5], ['Classroom chair', 4500], ['Brick', 2000], ['Dumbbell', 5000], ['Car', 1300000]];
games.weight = (root, entry) => {
  const choose = label => {
    const select = el('select', {'aria-label': label}, weights.map(([name], index) => el('option', {value: String(index)}, name)));
    return [el('label', {class: 'field'}, el('span', {}, label), select), select];
  };
  const [leftField, left] = choose('Left object');
  const [rightField, right] = choose('Right object');
  left.value = '7';
  right.value = '0';
  const leftPan = el('span', {class: 'pill'});
  const rightPan = el('span', {class: 'pill'});
  const scale = art('weight', 'An empty, level balance');
  const balance = el('figure', {class: 'visual'}, scale,
    el('figcaption', {class: 'label-row'}, leftPan, rightPan));
  const status = feedback();
  let selectedSide;
  const guesses = ['Left is heavier', 'Right is heavier', 'Same weight'].map((name, index) =>
    button(name, () => {
      selectedSide = index;
      for (const [position, guess] of guesses.entries()) guess.setAttribute('aria-pressed', String(index === position));
    }, {pressed: false}));
  function reset() {
    leftPan.textContent = 'Left · ' + weights[Number(left.value)][0];
    rightPan.textContent = 'Right · ' + weights[Number(right.value)][0];
    scale.src = 'art/weight.webp';
    scale.alt = 'Balance ready to test';
    selectedSide = undefined;
    for (const guess of guesses) guess.setAttribute('aria-pressed', 'false');
    tell(status, '');
  }
  const compare = button('Test on the balance', () => {
    if (selectedSide == null) {
      tell(status, 'Make a prediction first.', 'retry');
      return;
    }
    const a = weights[Number(left.value)];
    const b = weights[Number(right.value)];
    const answer = a[1] === b[1] ? 2 : a[1] > b[1] ? 0 : 1;
    scale.src = 'art/' + ['weight-left', 'weight-right', 'weight'][answer] + '.webp';
    scale.alt = ['The left pan is lower.', 'The right pan is lower.', 'Both pans are at the same height.'][answer];
    const result = answer === 2 ? 'These examples have the same model mass.' : (answer === 0 ? a[0] : b[0]) + ' is heavier in this model.';
    tell(status, result + (answer === selectedSide ? ' Your prediction matched.' : ' Compare the lower and higher sides.'), answer === selectedSide ? 'correct' : 'retry');
  }, {primary: true});
  left.addEventListener('change', reset);
  right.addEventListener('change', reset);
  const comparison = split(balance, section('Which is heavier?',
    el('div', {class: 'controls-row'}, leftField, rightField), toolbar(guesses), compare, status,
    el('p', {class: 'hint'}, 'The same kind of object can have different weights in real life.')));
  const sorting = section('Sort the objects');
  const round = el('div', {});
  sorting.append(el('p', {}, 'In this model, objects under 100 g are lighter. Objects of 100 g or more are heavier.'), round);
  sorting.hidden = true;
  const sortItems = weights.filter(([name]) => name !== 'Baseball' && name !== 'Small pebble');
  let order = shuffle(sortItems);
  let index = 0;
  function drawSort() {
    if (index === order.length) {
      round.replaceChildren(feedback('All ' + order.length + ' objects sorted.'), button('Sort again', () => {
        order = shuffle(sortItems);
        index = 0;
        drawSort();
      }, {primary: true}));
      return;
    }
    const [name, mass] = order[index];
    const result = feedback();
    const next = button('Next object', () => { index++; drawSort(); round.querySelector('h3')?.focus(); }, {disabled: true, primary: true});
    const choices = ['Lighter', 'Heavier'].map((label, choice) => button(label, () => {
      const correct = choice === Number(mass >= 100);
      tell(result, name + ' has a model mass of ' + mass + ' g. ' + (correct ? 'Correct.' : 'Compare that mass with 100 g and try again.'), correct ? 'correct' : 'retry');
      if (!correct) return;
      for (const option of choices) option.disabled = true;
      next.disabled = false;
      next.focus();
    }));
    round.replaceChildren(el('span', {class: 'pill'}, 'Object ' + (index + 1) + ' of ' + order.length),
      el('h3', {tabIndex: -1}, name), toolbar(choices), result, next);
  }
  function showSort(sortingMode) {
    comparison.hidden = sortingMode;
    sorting.hidden = !sortingMode;
    compareMode.setAttribute('aria-pressed', String(!sortingMode));
    sortMode.setAttribute('aria-pressed', String(sortingMode));
  }
  const compareMode = button('Compare on the balance', () => showSort(false), {pressed: true});
  const sortMode = button('Sort objects', () => showSort(true), {pressed: false});
  root.append(title(entry), toolbar(compareMode, sortMode),
    el('div', {style: 'margin-top:.8rem'}, comparison, sorting));
  reset();
  drawSort();
};

const energySources = [
  ['Wind power', 'Uses a renewable source and produces electricity without burning fuel.', 'Output varies with wind speed.'],
  ['Solar power', 'Produces electricity without burning fuel.', 'Output falls in shade and at night.'],
  ['Biomass', 'Some plant and wood waste can be used as fuel.', 'Burning biomass produces emissions.'],
  ['Geothermal', 'Heat underground can provide a steady energy source.', 'Suitable locations and drilling can be costly.'],
  ['Tidal', 'Tides are predictable.', 'Tidal projects need suitable coastal sites and can affect marine life.'],
  ['Hydropower', 'Flowing water can generate electricity and stored water can help meet demand.', 'Dams can change river ecosystems.'],
  ['Nuclear', 'Can supply a lot of electricity with low operational greenhouse gas emissions.', 'Radioactive waste needs safe management.'],
  ['Oil', 'Stores a lot of energy in a small volume.', 'Burning oil produces greenhouse gas emissions and air pollution.'],
  ['Natural gas', 'Gas plants can respond quickly as demand changes.', 'Burning gas produces carbon dioxide and leaks can release methane.'],
  ['Coal', 'Coal supplies steady power where fuel is available.', 'Burning coal releases large amounts of carbon dioxide and air pollutants.']
];
games.energy = (root, entry) => {
  const source = el('select', {'aria-label': 'Energy source'}, energySources.map(([name], index) => el('option', {value: String(index)}, name)));
  const tradeoffs = el('div', {});
  let mode = 'compare';
  let sample = 0;
  const study = button('Compare', () => { mode = 'compare'; draw(); }, {pressed: true});
  const classify = button('Sort evidence', () => { mode = 'sort'; draw(); }, {pressed: false});
  const [response, input] = field('What would you recommend for the town, and why?', {placeholder: 'Use one advantage and one trade-off.', maxlength: 800}, true);
  input.value = read('energy-reflection', '');
  input.addEventListener('input', () => store('energy-reflection', input.value));
  const saveStatus = feedback();
  function draw() {
    const [, pro, con] = energySources[Number(source.value)];
    study.setAttribute('aria-pressed', String(mode === 'compare'));
    classify.setAttribute('aria-pressed', String(mode === 'sort'));
    if (mode === 'compare') {
      tradeoffs.replaceChildren(el('div', {class: 'grid'}, section('Advantage', el('p', {}, pro)), section('Trade-off', el('p', {}, con))));
      return;
    }
    const result = feedback();
    tradeoffs.replaceChildren(section('Advantage or trade-off?', el('p', {}, sample ? con : pro),
      toolbar(['Advantage','Trade-off'].map((text, index) => button(text, () => {
        tell(result, index === sample ? (sample ? 'Correct. This is a trade-off.' : 'Correct. This is an advantage.') : 'Try the other category.',
          index === sample ? 'correct' : 'retry');
      })), button('Next statement', () => { sample = 1 - sample; draw(); })), result));
  }
  source.addEventListener('change', draw);
  root.append(title(entry, 'A windy prairie town needs electricity. Compare sources before you recommend one.'),
    split(el('figure', {class: 'visual'}, art('energy', 'Wind turbines near a prairie town')),
      section('Compare the trade-offs', el('label', {class: 'field'}, el('span', {}, 'Explore a power source'), source),
        toolbar(study, classify), tradeoffs, response, button('Save recommendation', () => {
          if (!input.value.trim()) return tell(saveStatus, 'Write a recommendation first.', 'retry');
          store('energy-reflection', input.value);
          tell(saveStatus, 'Recommendation saved on this device.', 'correct');
        }, {primary: true}), saveStatus)));
  draw();
};

const pathways = [
  ['Transportation', 'Wind carries water vapour or clouds through the atmosphere.', 50, 20],
  ['Condensation', 'Water vapour cools into tiny liquid droplets that can form clouds.', 76, 29],
  ['Precipitation', 'Water falls from clouds as rain, snow, sleet or hail.', 25, 43],
  ['Evaporation', 'Liquid water changes into water vapour and enters the air.', 76, 60],
  ['Runoff', 'Water flows across the land into streams, rivers, lakes or oceans.', 50, 72],
  ['Transpiration', 'Plants release water vapour from their leaves.', 15, 72]
];
games.water = (root, entry) => {
  let mode = 'label';
  let term = null;
  let active = 3;
  let placed = {};
  let checked = false;
  const visual = el('figure', {class: 'visual water-map'}, art('water', 'Water cycle landscape with rain over mountains, trees, a river and the ocean'));
  const controls = section('Water cycle terms');
  const notice = feedback();
  const status = el('span', {class: 'pill'}, '');
  const markerNodes = [];
  const smallTargets = el('div', {class: 'water-fallback choice-grid', 'aria-label': 'Map locations'});
  const termButtons = [];
  const readMode = button('Explore', () => changeMode('explore'), {pressed: false});
  const labelMode = button('Label the cycle', () => changeMode('label'), {pressed: true});
  const definition = el('p', {class: 'long-answer'});
  function changeMode(value) {
    mode = value;
    checked = false;
    readMode.setAttribute('aria-pressed', String(value === 'explore'));
    labelMode.setAttribute('aria-pressed', String(value === 'label'));
    tell(notice, '');
    render();
  }
  function selectTerm(index) {
    active = index;
    if (mode === 'label') {
      term = index;
      tell(notice, 'Choose a numbered spot for ' + pathways[index][0] + '.');
    }
    render();
  }
  function place(index) {
    if (mode === 'explore') {
      selectTerm(index);
      return;
    }
    if (term == null) {
      tell(notice, 'Choose a term before you choose a spot.', 'retry');
      return;
    }
    for (const key of Object.keys(placed)) if (placed[key] === term) delete placed[key];
    placed[index] = term;
    term = null;
    checked = false;
    tell(notice, 'Label placed at spot ' + (index + 1) + '.');
    render();
  }
  const check = button('Check labels', () => {
    checked = true;
    const count = Object.keys(placed).filter(key => placed[key] === Number(key)).length;
    tell(notice, count === 6 ? 'All six pathways are correct.' : count + ' of 6 correct. Move any labels marked to review.', count === 6 ? 'correct' : 'retry');
    render();
  }, {primary: true});
  const reset = button('Reset', () => {
    placed = {};
    term = null;
    checked = false;
    tell(notice, '');
    render();
  });
  function render() {
    status.textContent = mode === 'label' ? Object.keys(placed).length + ' of 6 labels placed' : 'Select any pathway';
    definition.textContent = pathways[active][1];
    check.hidden = reset.hidden = mode !== 'label';
    check.disabled = !Object.keys(placed).length;
    markerNodes.forEach((node, index) => {
      const labelIndex = mode === 'explore' ? index : placed[index];
      const name = labelIndex == null ? '' : pathways[labelIndex][0];
      node.replaceChildren(String(index + 1), name ? el('span', {}, ' · ' + name) : null);
      node.setAttribute('aria-label', 'Spot ' + (index + 1) + (name ? ', ' + name : ''));
      node.dataset.result = checked && labelIndex != null ? (labelIndex === index ? 'correct' : 'retry') : '';
      smallTargets.children[index].textContent = 'Spot ' + (index + 1) + (name ? ' · ' + name : '');
    });
    termButtons.forEach((node, index) => node.setAttribute('aria-pressed', String(mode === 'explore' ? active === index : term === index)));
  }
  pathways.forEach(([name, , x, y], index) => {
    const marker = button(String(index + 1), () => place(index), {class: 'marker'});
    marker.style.left = x + '%';
    marker.style.top = y + '%';
    markerNodes.push(marker);
    visual.append(marker);
    smallTargets.append(button('Spot ' + (index + 1), () => place(index)));
    termButtons.push(button(name, () => selectTerm(index), {pressed: false}));
  });
  controls.append(el('div', {class: 'grid'}, termButtons), definition, smallTargets, toolbar(check, reset), notice);
  root.append(title(entry, 'Choose a term, then tap a spot on the painting. Explore mode gives you the labels.'), toolbar(readMode, labelMode, status),
    el('div', {style: 'margin-top:.8rem'}, split(visual, controls)));
  render();
};
