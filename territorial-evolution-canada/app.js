/* Canada through time — local Atlas of Canada historical boundaries. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const WIDTH = 1060, HEIGHT = 690;
  const colours = {
    'British Columbia': '#78acd5', 'Alberta': '#65b8a2', 'Saskatchewan': '#b6bd72',
    'Manitoba': '#df8c84', 'Ontario': '#e8ad69', 'Quebec': '#b69acb',
    'New Brunswick': '#d57b8a', 'Nova Scotia': '#839eca', 'Prince Edward Island': '#e7c762',
    'Newfoundland': '#80b58c', 'Newfoundland and Labrador': '#80b58c',
    'Northwest Territories': '#8fbecd', 'Yukon Territory': '#899fcd', 'Yukon': '#899fcd',
    'Nunavut': '#d9bf73', 'District of Keewatin': '#bca0c2',
    'District of Assiniboia': '#9cbacb', 'District of Saskatchewan': '#a7c8ca',
    'District of Alberta': '#91bdbc', 'District of Athabaska': '#b2ccd4',
    'District of Mackenzie': '#91bbc5', 'District of Franklin': '#a8c9d8',
    'District of Ungava': '#b5c9db', 'District of Yukon': '#9bb8ce'
  };
  const provinceHistory = {
    'Ontario': 'One of the four founding provinces in 1867. Its northern and western boundaries changed several times; it expanded north in 1912.',
    'Quebec': 'One of the four founding provinces in 1867. It extended north in 1898 and 1912. The Labrador boundary was defined in 1927.',
    'New Brunswick': 'One of the four founding provinces in 1867. Its boundary remains the same across these Atlas snapshots.',
    'Nova Scotia': 'One of the four founding provinces in 1867. Its boundary remains the same across these Atlas snapshots.',
    'Manitoba': 'Created in 1870 following Métis negotiations. The original small province grew in 1881 and again in 1912.',
    'British Columbia': 'Joined Confederation in 1871, becoming Canada’s sixth province.',
    'Prince Edward Island': 'Joined Confederation in 1873, becoming Canada’s seventh province.',
    'Alberta': 'Created as a province in 1905. The earlier District of Alberta was a different administrative area within the Northwest Territories.',
    'Saskatchewan': 'Created as a province in 1905. Its boundaries differ from those of the earlier District of Saskatchewan.',
    'Newfoundland': 'Joined Confederation in 1949. The province’s official name became Newfoundland and Labrador in 2001.',
    'Newfoundland and Labrador': 'Newfoundland joined Confederation in 1949. Its official name changed to Newfoundland and Labrador in 2001.',
    'Yukon Territory': 'Became a separate territory in 1898. Its boundary was adjusted in 1901; its official name became Yukon in 2003.',
    'Yukon': 'Became a separate territory in 1898. Its official name changed from Yukon Territory to Yukon in 2003.',
    'Nunavut': 'Created from the eastern Northwest Territories on April 1, 1999, following Inuit negotiations and the 1993 Nunavut Land Claims Agreement.',
    'Northwest Territories': 'Formed in 1870. Provinces and territories were later created from parts of this area, including Nunavut in 1999.'
  };
  let timeline = [], currentIndex = 0, currentMap, projection, path, selectedName = null;
  let playing = false, timer = null, renderToken = 0, lastFinished = true;
  const cache = new Map();
  const drawCache = new WeakMap();
  let bundlePromise;
  const svg = d3.select('#map');
  const world = d3.select('#map-world');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const zoom = d3.zoom().scaleExtent([1, 12]).extent([[0, 0], [WIDTH, HEIGHT]])
    .translateExtent([[-WIDTH * 1.5, -HEIGHT * 1.5], [WIDTH * 2.5, HEIGHT * 2.5]])
    .on('zoom', event => {
      world.attr('transform', event.transform);
      const fontScale = Math.max(.35, 1 / Math.sqrt(event.transform.k));
      d3.selectAll('.region-label').attr('transform', d => {
        const p = labelLocation(d);
        return `translate(${p[0]},${p[1]}) scale(${fontScale})`;
      });
      $('map-tooltip').hidden = true;
    });
  svg.call(zoom).on('dblclick.zoom', null);

  // Fit the available screen or iframe height without resetting the date,
  // selected region, playback, or the SVG's current pan and zoom transform.
  function fitMapSurface() {
    const surface = $('map-surface');
    const screenHeight = window.visualViewport?.height || window.innerHeight;
    if (!screenHeight) return;
    const top = surface.getBoundingClientRect().top + (window.scrollY || 0);
    const height = Math.max(210, Math.min(770, screenHeight - top - 36));
    surface.style.setProperty('--map-height', `${Math.round(height)}px`);
  }
  let fitRequest = 0;
  function scheduleMapFit() {
    if (fitRequest) return;
    fitRequest = requestAnimationFrame(() => { fitRequest = 0; fitMapSurface(); });
  }
  window.addEventListener('resize', scheduleMapFit);
  window.visualViewport?.addEventListener('resize', scheduleMapFit);
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(scheduleMapFit);
    [document.querySelector('.app-header'), $('timeline'), document.querySelector('.map-toolbar')].forEach(element => observer.observe(element));
  }
  document.fonts?.ready.then(scheduleMapFit);
  fitMapSurface();

  async function json(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not load ${url} (${response.status}).`);
    if (url.endsWith('.gz')) {
      const bytes = new Uint8Array(await response.arrayBuffer());
      const decoded = bytes[0] === 31 && bytes[1] === 139 ? fflate.gunzipSync(bytes) : bytes;
      return JSON.parse(new TextDecoder().decode(decoded));
    }
    return response.json();
  }

  function fetchYear(year) {
    if (!cache.has(year)) {
      if (!bundlePromise) bundlePromise = json('data/historical-boundaries.geojson.gz').catch(error => { bundlePromise = null; throw error; });
      const promise = bundlePromise.then(bundle => {
        const features = [];
        for (const view of bundle.regionViews) {
          if (view.year !== year) continue;
          const {polygon_ids, geometry_type, ...properties} = view;
          const parts = polygon_ids.map(i => bundle.features[i].geometry.coordinates);
          const geometry = {type: geometry_type, coordinates: geometry_type === 'Polygon' ? parts[0] : parts};
          features.push({type: 'Feature', id: String(properties.source_id), properties, geometry});
        }
        const data = {type: 'FeatureCollection', name: `Canada territorial evolution ${year}`, attribution: bundle.attribution, features};
        if (data.type !== 'FeatureCollection' || !Array.isArray(data.features) || !data.features.length)
          throw new Error(`Missing boundary data for ${year}.`);
        return data;
      }).catch(error => { cache.delete(year); throw error; });
      cache.set(year, promise);
    }
    return cache.get(year);
  }

  async function downloadYear(year) {
    try {
      const data = await fetchYear(year);
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: 'application/geo+json'}));
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = `canada-${year}.geojson`;
      document.body.append(anchor); anchor.click(); anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (error) { $('announcement').textContent = 'The GeoJSON download could not be prepared. Please try again.'; }
  }

  // GeoJSON edges are linear in longitude/latitude. D3 connects vertices with
  // great-circle arcs: a long 60°N edge would bow differently from the shorter
  // edges in neighbouring provinces. Add drawing vertices along the source
  // segment so shared borders meet, without changing the downloadable data.
  function densifyRing(ring) {
    if (!ring.length) return ring;
    const points = [ring[0]];
    for (let i = 1; i < ring.length; i++) {
      const start = ring[i - 1], end = ring[i];
      let longitude = end[0] - start[0];
      // Keep neighbouring context polygons continuous across the dateline.
      if (longitude > 180) longitude -= 360;
      if (longitude < -180) longitude += 360;
      const latitude = end[1] - start[1];
      const steps = Math.max(1, Math.ceil(Math.max(Math.abs(longitude), Math.abs(latitude)) / .2));
      for (let step = 1; step < steps; step++) {
        const fraction = step / steps;
        let x = start[0] + longitude * fraction;
        if (x > 180) x -= 360;
        if (x < -180) x += 360;
        points.push([x, start[1] + latitude * fraction]);
      }
      points.push(end);
    }
    return points;
  }

  // RFC 7946 exteriors are counterclockwise; D3 uses the opposite winding.
  function drawable(feature) {
    if (drawCache.has(feature)) return drawCache.get(feature);
    const geometry = feature.geometry;
    let result = feature;
    const wind = sourceRings => {
      const rings = sourceRings.map(densifyRing);
      return d3.geoArea({type: 'Polygon', coordinates: rings}) > 2 * Math.PI ? rings.map(r => [...r].reverse()) : rings;
    };
    if (geometry.type === 'Polygon') result = {...feature, geometry: {...geometry, coordinates: wind(geometry.coordinates)}};
    if (geometry.type === 'MultiPolygon') result = {...feature, geometry: {...geometry, coordinates: geometry.coordinates.map(wind)}};
    drawCache.set(feature, result);
    return result;
  }

  function fill(feature) {
    const p = feature.properties;
    if (p.name === 'Disputed area') return 'url(#disputed-hatch)';
    return p.in_canada ? (colours[p.name] || '#9bbdcc') : '#d0dbe2';
  }

  function labelLines(name) {
    const overrides = {
      'North-Western Territory': ['North-Western', 'Territory'],
      'Northwest Territories': ['Northwest', 'Territories'],
      "Rupert's Land": ['Rupert’s Land'], 'British Columbia': ['British', 'Columbia'],
      'Newfoundland and Labrador': ['Newfoundland', '& Labrador'], 'Yukon Territory': ['Yukon', 'Territory'],
      'Prince Edward Island': ['P.E.I.'], 'New Brunswick': ['N.B.'], 'Nova Scotia': ['N.S.']
    };
    if (name.startsWith('District of ')) return [name.replace('District of ', ''), 'District'];
    return overrides[name] || [name];
  }

  function labelLocation(feature) {
    const p = feature.properties;
    let point = projection(p.label);
    // Tiny Atlantic provinces use callouts, rather than oversized map targets.
    if (p.name === 'Prince Edward Island') point = [point[0] + 32, point[1] - 30];
    if (p.name === 'Nova Scotia') point = [point[0] + 49, point[1] + 22];
    if (p.name === 'New Brunswick') point = [point[0] - 6, point[1] + 18];
    return point;
  }

  function drawLabels(features) {
    const labels = d3.select('#region-labels');
    labels.selectAll('*').remove();
    const visible = features.filter(f => f.properties.name !== 'Disputed area');
    const callouts = visible.filter(f => ['Nova Scotia', 'Prince Edward Island'].includes(f.properties.name));
    labels.selectAll('.label-line').data(callouts).join('path').attr('class', 'label-line')
      .attr('d', f => { const a = projection(f.properties.label), b = labelLocation(f); return `M${a[0]},${a[1]}L${b[0]},${b[1]}`; });
    const groups = labels.selectAll('.label-anchor').data(visible).join('g').attr('class', 'label-anchor');
    groups.append('text').attr('class', f => `region-label${!f.properties.in_canada ? ' outside-label' : ''}${f.properties.area_km2 < 85000 ? ' small-label' : ''}`)
      .attr('transform', f => { const p = labelLocation(f); return `translate(${p[0]},${p[1]})`; })
      .each(function(f) {
        const lines = labelLines(f.properties.name);
        const t = d3.select(this);
        lines.forEach((line, i) => t.append('tspan').attr('x', 0).attr('dy', i === 0 ? (lines.length > 1 ? '-.1em' : '.35em') : '1.12em').text(line));
      });
    labels.attr('display', $('show-labels').checked ? null : 'none');
    svg.call(zoom.transform, d3.zoomTransform(svg.node()));
  }

  function showTooltip(event, feature) {
    const bounds = $('map-surface').getBoundingClientRect();
    const tooltip = $('map-tooltip');
    tooltip.textContent = `${feature.properties.name} · ${feature.properties.in_canada ? feature.properties.kind : 'outside Canada'}`;
    tooltip.hidden = false;
    const width = tooltip.offsetWidth;
    tooltip.style.left = Math.max(8, Math.min(bounds.width - width - 8, event.clientX - bounds.left + 12)) + 'px';
    tooltip.style.top = Math.max(8, Math.min(bounds.height - 50, event.clientY - bounds.top - 39)) + 'px';
  }

  function drawRegions() {
    const features = currentMap.features;
    const drawing = d3.select('#regions').selectAll('path').data(features, f => f.properties.name);
    drawing.exit().remove();
    const merged = drawing.enter().append('path').attr('class', 'region').merge(drawing)
      .attr('d', f => path(drawable(f))).attr('fill', fill)
      .attr('role', 'button').attr('tabindex', 0)
      .attr('aria-label', f => `${f.properties.name}, ${f.properties.in_canada ? f.properties.kind : 'outside Canada at this date'}`)
      .attr('aria-pressed', f => f.properties.name === selectedName ? 'true' : 'false')
      .classed('selected', f => f.properties.name === selectedName)
      .on('click', (event, f) => { event.stopPropagation(); selectRegion(f.properties.name); })
      .on('keydown', (event, f) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); selectRegion(f.properties.name); } })
      .on('pointermove', showTooltip).on('pointerleave', () => {$('map-tooltip').hidden = true;});
    merged.selectAll('title').remove();
    merged.append('title').text(f => f.properties.name);
    drawLabels(features);
  }

  async function drawPrevious(token = renderToken) {
    const group = d3.select('#previous-regions');
    group.selectAll('*').remove();
    $('previous-legend').hidden = !$('show-previous').checked || currentIndex === 0;
    if (!$('show-previous').checked || currentIndex === 0) return;
    try {
      const index = currentIndex;
      const oldMap = await fetchYear(timeline[index - 1].year);
      if (token !== renderToken || index !== currentIndex || !$('show-previous').checked) return;
      // Only show geometry that differs; name-only changes have no dashed edge.
      const currentShapes = new Set(currentMap.features.map(f => f.properties.shape_key));
      const changed = oldMap.features.filter(f => !currentShapes.has(f.properties.shape_key));
      group.selectAll('path').data(changed).join('path').attr('class', 'previous-region').attr('d', f => path(drawable(f)));
    } catch (error) {
      $('announcement').textContent = 'The previous snapshot could not be loaded. The selected map is still available.';
    }
  }

  function provinceCount() {
    return new Set(currentMap.features.filter(f => f.properties.in_canada && f.properties.kind === 'Province').map(f => f.properties.name)).size;
  }

  function drawRegionList() {
    const list = $('region-list');
    list.replaceChildren();
    const sorted = [...currentMap.features].sort((a, b) => Number(b.properties.in_canada) - Number(a.properties.in_canada) || a.properties.name.localeCompare(b.properties.name));
    for (const feature of sorted) {
      const p = feature.properties;
      const button = document.createElement('button');
      button.className = `region-chip${!p.in_canada ? ' outside-chip' : ''}${p.kind === 'Historical district' ? ' district-chip' : ''}`;
      button.dataset.region = p.name;
      button.setAttribute('aria-pressed', String(p.name === selectedName));
      const dot = document.createElement('span');
      dot.className = 'chip-colour'; dot.style.background = p.name === 'Disputed area' ? '#c6a876' : fill(feature); dot.setAttribute('aria-hidden', 'true');
      button.append(dot, document.createTextNode(p.name));
      button.addEventListener('click', () => selectRegion(p.name));
      list.append(button);
    }
  }

  function paragraph(text, className) {
    const p = document.createElement('p'); p.textContent = text; if (className) p.className = className; return p;
  }

  function selectRegion(name, announce = true) {
    if (!currentMap) return;
    selectedName = name;
    const feature = currentMap.features.find(f => f.properties.name === name);
    d3.selectAll('.region').classed('selected', f => f.properties.name === name).attr('aria-pressed', f => String(f.properties.name === name));
    for (const button of $('region-list').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.region === name));
    const details = $('region-details'); details.replaceChildren();
    $('clear-region').hidden = !feature;
    if (!feature) {
      selectedName = null; $('region-title').textContent = 'Explore a region';
      details.append(paragraph('Select a coloured or grey region, or use the list below the map.')); return;
    }
    const p = feature.properties;
    $('region-title').textContent = p.name;
    const tag = document.createElement('span'); tag.className = 'kind-tag'; tag.textContent = p.name === 'Disputed area' ? 'Disputed jurisdiction' : p.kind; details.append(tag);
    if (p.name === 'Disputed area') {
      details.append(paragraph('Ontario and Manitoba both claim jurisdiction over this area. The Atlas uses stripes to mark the dispute. It is settled in 1889.'));
    } else if (!p.in_canada) {
      details.append(paragraph(`Outside Canada in ${timeline[currentIndex].year}. The grey colour shows its political status at this date.`));
    } else {
      details.append(paragraph(`Part of Canada in ${timeline[currentIndex].year}.`));
      if (p.kind === 'Historical district') {
        let note = 'A historical administrative district within the Northwest Territories; not a province.';
        if (p.name === 'District of Keewatin' && timeline[currentIndex].year < 1905) note = 'A separate federal district at this date. It is returned to the Northwest Territories in 1905; it is not a province.';
        details.append(paragraph(note, 'region-note'));
      }
    }
    if (provinceHistory[p.name]) details.append(paragraph(provinceHistory[p.name], 'region-history'));
    if (p.name.startsWith('District of ') && ['Alberta', 'Saskatchewan'].includes(p.name.replace('District of ', ''))) details.append(paragraph('The province with this name is created later, in 1905, with a different boundary.', 'region-history'));
    if (announce) $('announcement').textContent = `${p.name}. ${p.kind}. ${p.in_canada ? 'Part of Canada' : 'Outside Canada'} in ${timeline[currentIndex].year}.`;
  }

  function updateStory() {
    const event = timeline[currentIndex];
    $('story-year').textContent = event.year; $('stamp-year').textContent = event.year;
    $('stamp-caption').textContent = event.type; $('event-type').textContent = event.type;
    $('event-title').textContent = event.title; $('event-summary').textContent = event.summary;
    $('notice').textContent = event.watch; $('map-heading').textContent = `Political boundaries in ${event.year}`;
    $('region-list-year').textContent = event.year;
    const provinces = provinceCount();
    $('province-count').textContent = `${provinces} Canadian province${provinces === 1 ? '' : 's'}${event.year >= 1999 ? ' · 3 territories' : ''}`;
    $('year-select').value = String(currentIndex); $('year-range').value = currentIndex;
    $('year-range').setAttribute('aria-valuetext', `${event.year}, ${event.title}`);
    $('previous').disabled = currentIndex === 0; $('next').disabled = currentIndex === timeline.length - 1;
    $('show-previous').disabled = currentIndex === 0;
    for (const button of $('milestones').querySelectorAll('button')) {
      const active = Number(button.dataset.index) === currentIndex;
      button.classList.toggle('current', active); button.setAttribute('aria-pressed', String(active));
    }
    $('download-year').textContent = `Download ${event.year} GeoJSON`;
    try { const url = new URL(location.href); url.searchParams.set('year', event.year); history.replaceState(null, '', url); } catch (_) { /* Some embedded previews restrict history changes. */ }
    $('announcement').textContent = `${event.year}. ${event.title}. ${provinces} Canadian provinces.`;
  }

  async function showYear(index, manual = true) {
    if (!timeline.length) return false;
    if (manual) pause();
    const nextIndex = Math.max(0, Math.min(timeline.length - 1, Number(index)));
    const token = ++renderToken;
    lastFinished = false;
    $('loading').classList.remove('error'); $('loading').textContent = `Loading ${timeline[nextIndex].year}…`; $('loading').hidden = false;
    $('map').setAttribute('aria-busy', 'true');
    try {
      const data = await fetchYear(timeline[nextIndex].year);
      if (token !== renderToken) return false;
      currentIndex = nextIndex; currentMap = data;
      if (!currentMap.features.some(f => f.properties.name === selectedName)) selectedName = null;
      updateStory(); drawRegions(); drawRegionList(); selectRegion(selectedName, false);
      $('loading').hidden = true; $('map').setAttribute('aria-busy', 'false'); lastFinished = true;
      await drawPrevious(token);
      // Prefetch just the adjacent dates to keep keyboard and playback responsive.
      const neighbours = [currentIndex - 1, currentIndex + 1].filter(i => i >= 0 && i < timeline.length);
      neighbours.forEach(i => fetchYear(timeline[i].year).catch(() => {}));
      return true;
    } catch (error) {
      if (token !== renderToken) return false;
      pause(); lastFinished = true; $('loading').classList.add('error');
      $('loading').textContent = 'This date could not load. Check your connection and choose the date again.';
      $('map').setAttribute('aria-busy', 'false'); $('announcement').textContent = $('loading').textContent;
      console.error(error); return false;
    }
  }

  function pause() {
    playing = false; clearTimeout(timer); timer = null;
    $('play').setAttribute('aria-pressed', 'false'); $('play').querySelector('span').textContent = 'Play timeline';
    $('play').querySelector('path').setAttribute('d', 'm8 5 11 7-11 7V5Z');
  }

  function schedule() {
    clearTimeout(timer);
    if (!playing) return;
    timer = setTimeout(async () => {
      if (!playing) return;
      if (!lastFinished) { schedule(); return; }
      if (currentIndex >= timeline.length - 1) { pause(); return; }
      const ok = await showYear(currentIndex + 1, false);
      if (ok && playing) { if (currentIndex >= timeline.length - 1) pause(); else schedule(); }
    }, Number($('speed').value));
  }

  async function play() {
    if (playing) { pause(); return; }
    if (currentIndex === timeline.length - 1) await showYear(0);
    playing = true; $('play').setAttribute('aria-pressed', 'true');
    $('play').querySelector('span').textContent = 'Pause timeline';
    $('play').querySelector('path').setAttribute('d', 'M6 5h4v14H6V5Zm8 0h4v14h-4V5Z'); schedule();
  }

  function resetView() {
    svg.interrupt().transition().duration(reduceMotion ? 0 : 300).call(zoom.transform, d3.zoomIdentity);
  }

  function focusChange() {
    if (!currentMap) return;
    const names = timeline[currentIndex].focus;
    const features = currentMap.features.filter(f => names.includes(f.properties.name));
    if (!features.length) return;
    const collection = {type: 'FeatureCollection', features: features.map(drawable)};
    const bounds = path.bounds(collection), dx = bounds[1][0] - bounds[0][0], dy = bounds[1][1] - bounds[0][1];
    const k = Math.max(1, Math.min(10, .78 / Math.max(dx / WIDTH, dy / HEIGHT)));
    const x = (bounds[0][0] + bounds[1][0]) / 2, y = (bounds[0][1] + bounds[1][1]) / 2;
    svg.interrupt().transition().duration(reduceMotion ? 0 : 450).call(zoom.transform, d3.zoomIdentity.translate(WIDTH / 2 - k * x, HEIGHT / 2 - k * y).scale(k));
  }

  function bindControls() {
    $('previous').addEventListener('click', () => showYear(currentIndex - 1));
    $('next').addEventListener('click', () => showYear(currentIndex + 1));
    $('play').addEventListener('click', play);
    $('restart').addEventListener('click', () => { resetView(); showYear(0); });
    $('year-select').addEventListener('change', event => showYear(event.target.value));
    $('year-range').addEventListener('input', event => showYear(event.target.value));
    $('speed').addEventListener('change', schedule);
    $('show-labels').addEventListener('change', () => d3.select('#region-labels').attr('display', $('show-labels').checked ? null : 'none'));
    $('show-previous').addEventListener('change', () => drawPrevious());
    $('focus-change').addEventListener('click', focusChange);
    $('clear-region').addEventListener('click', () => selectRegion(null));
    $('zoom-in').addEventListener('click', () => svg.transition().duration(reduceMotion ? 0 : 200).call(zoom.scaleBy, 1.5));
    $('zoom-out').addEventListener('click', () => svg.transition().duration(reduceMotion ? 0 : 200).call(zoom.scaleBy, 1 / 1.5));
    $('fit-map').addEventListener('click', resetView);
    $('sources-button').addEventListener('click', () => $('sources-dialog').showModal());
    $('close-sources').addEventListener('click', () => $('sources-dialog').close());
    $('download-year').addEventListener('click', event => { event.preventDefault(); downloadYear(timeline[currentIndex].year); });
    $('sources-dialog').addEventListener('click', event => { if (event.target === $('sources-dialog')) { const r = event.target.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.target.close(); } });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { pause(); return; }
      if ($('sources-dialog').open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.matches('input,select,textarea') || target.isContentEditable)) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); showYear(currentIndex + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); showYear(currentIndex - 1); }
    });
  }

  async function initialize() {
    try {
      timeline = await json('data/timeline.json');
      const latest = await fetchYear(timeline.at(-1).year);
      projection = d3.geoConicConformal().parallels([49, 77]).rotate([95, 0]).center([0, 49]);
      projection.fitExtent([[45, 35], [WIDTH - 72, HEIGHT - 46]], {type: 'FeatureCollection', features: latest.features.map(drawable)});
      path = d3.geoPath(projection);
      d3.select('#graticule').append('path').attr('class', 'graticule').attr('d', path(d3.geoGraticule().extent([[-175, 28], [-25, 87]]).step([10, 10])()));
      json('data/context.geojson').then(context => {
        d3.select('#context-land').selectAll('path').data(context.features).join('path').attr('class', 'context-region').attr('d', f => path(drawable(f)));
      }).catch(() => {});
      const shortNames = {1867:'Start',1870:'Manitoba',1871:'B.C.',1873:'P.E.I.',1880:'Arctic',1898:'Yukon',1905:'AB + SK',1912:'North',1949:'Nfld.',1999:'Nunavut'};
      timeline.forEach((event, i) => {
        const option = document.createElement('option'); option.value = i; option.textContent = `${event.year} · ${event.type}`; $('year-select').append(option);
        const link = document.createElement('a'); link.href = 'data/historical-boundaries.geojson.gz'; link.textContent = String(event.year);
        link.addEventListener('click', click => { click.preventDefault(); downloadYear(event.year); }); $('all-downloads').append(link);
        if (event.major) {
          const button = document.createElement('button'); button.className = 'milestone'; button.dataset.index = i;
          button.append(document.createTextNode(String(event.year)));
          const label = document.createElement('span'); label.textContent = shortNames[event.year] || event.type; button.append(label);
          button.setAttribute('aria-label', `${event.year}: ${event.title}`); button.addEventListener('click', () => { resetView(); showYear(i); }); $('milestones').append(button);
        }
      });
      $('year-range').max = timeline.length - 1;
      bindControls();
      const requested = Number(new URL(location.href).searchParams.get('year'));
      const initial = timeline.findIndex(e => e.year === requested);
      await showYear(initial < 0 ? 0 : initial);
      document.documentElement.dataset.ready = 'true';
    } catch (error) {
      $('loading').classList.add('error'); $('loading').textContent = 'The map files could not load. Refresh this page to try again.'; console.error(error);
    }
  }
  initialize();
})();
