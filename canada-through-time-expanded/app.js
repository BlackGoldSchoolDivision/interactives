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
  let bundlePromise, colonialPromise, latestLand;
  const geography = [{name:"Hudson Bay",label:[-85,58],note:"A major inland sea connected to the Arctic and Atlantic. European fur-trading companies made claims around its shores."},{name:"Great Lakes",label:[-84,44],note:"These interconnected lakes link inland communities and form part of the later Canada–United States boundary."},{name:"St. Lawrence River",label:[-69,48],note:"A route between the Great Lakes and the Atlantic. Upper and Lower Canada are named in relation to this river system."},{name:"Rocky Mountains",label:[-116,53],note:"A major mountain range in western North America. Physical features can influence travel and political boundaries."},{name:"Atlantic Ocean",label:[-54,47],note:"A route for voyages, fishing and trade between Europe and the eastern coasts of North America."},{name:"Pacific Ocean",label:[-133,50],note:"The western ocean coast connects many Indigenous communities and later trading and colonial settlements."}];
  const dateLabel = event => event.label || String(event.year);
  function visibleFeatures() { return [...currentMap.features, ...($("show-geography").checked ? geography.map(p => ({type:"Feature",geometry:{type:"Point",coordinates:p.label},properties:{...p,kind:"Geographic reference",in_canada:false,colour:"#287b8b"}})) : [])]; }
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
    const event = timeline.find(e => e.year === year);
    if (event?.early) {
      if (!cache.has(year)) cache.set(year, event.context
        ? Promise.resolve({type:'FeatureCollection',features:[]})
        : (colonialPromise ||= json('data/colonial-boundaries.json.gz').catch(error => {colonialPromise=null;throw error;}))
          .then(bundle => {
            const data=bundle.maps[String(year)]; if(!data?.features?.length)throw new Error(`Missing colonial regions for ${year}.`);
            const expand = indexes => typeof indexes === 'number' ? bundle.coordinate_pool[indexes] : indexes.map(expand);
            return {...data,features:data.features.map(f=>({...f,geometry:{type:f.geometry.type,coordinates:expand(f.geometry.coordinate_indexes)}}))};
          })
          .catch(error => {cache.delete(year);throw error;}));
      return cache.get(year);
    }
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
    if (p.pattern === 'colonial-dispute') return 'url(#colonial-dispute)';
    if (p.colour) return p.colour;
    if (p.name === 'Disputed area') return 'url(#disputed-hatch)';
    return p.in_canada ? (colours[p.name] || '#9bbdcc') : '#d0dbe2';
  }

  function labelLines(name) {
    const overrides = {
      'North-Western Territory': ['North-Western', 'Territory'],
      'Rupert’s Land · HBC claim': ['Rupert’s Land', 'HBC claim'],
      'Hudson Bay · disputed claims': ['Hudson Bay', 'disputed claims'],
      'Hudson Bay · disputed limits': ['Hudson Bay', 'disputed limits'],
      'Acadia · disputed mainland': ['Acadia', 'disputed limits'],
      'Newfoundland · disputed claims': ['Newfoundland', 'disputed claims'],
      'Île Royale and Île Saint-Jean': ['Île Royale /', 'Île Saint-Jean'],
      'Nova Scotia / Acadia': ['Nova Scotia /', 'Acadia'],
      'Province of Quebec': ['Province of', 'Quebec'],
      'Expanded Province of Quebec': ['Expanded', 'Quebec'],
      'Newfoundland and Labrador coast': ['Newfoundland /', 'Labrador coast'],
      'Lands reserved under the Proclamation': ['Proclamation', 'reserved lands'],
      'Lands outside colonial settlement': ['Indigenous', 'lands'],
      'Saint-Pierre and Miquelon': ['St-Pierre /', 'Miquelon'],
      'Upper Canada': ['Upper', 'Canada'], 'Lower Canada': ['Lower', 'Canada'],
      'Province of Canada': ['Province of', 'Canada'],
      'Oregon country · joint occupation': ['Oregon country', 'joint occupation'],
      'Northeastern frontier · disputed': ['Disputed', 'frontier'],
      'North-Western Territory / New Caledonia': ['North-Western Territory /', 'New Caledonia'],
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
    if (p.point_reference) point = [point[0]+48,point[1]+30];
    if (p.label_offset) point=[point[0]+p.label_offset[0],point[1]+p.label_offset[1]];
    // Tiny Atlantic provinces use callouts, rather than oversized map targets.
    if (p.name === 'Prince Edward Island') point = [point[0] + 32, point[1] - 30];
    if (p.name === 'Nova Scotia') point = [point[0] + 49, point[1] + 22];
    if (p.name === 'New Brunswick') point = [point[0] - 6, point[1] + 18];
    return point;
  }

  function drawLabels(features) {
    const labels = d3.select('#region-labels');
    labels.selectAll('*').remove();
    const visible = features.filter(f => f.properties.name !== 'Disputed area' && !f.properties.context && (f.geometry.type !== 'Point' || f.properties.point_reference));
    const callouts = visible.filter(f => f.properties.label_offset || f.properties.point_reference || (!f.properties.position && ['Nova Scotia', 'Prince Edward Island'].includes(f.properties.name)));
    labels.selectAll('.label-line').data(callouts).join('path').attr('class', 'label-line')
      .attr('d', f => { const a = projection(f.properties.label), b = labelLocation(f); return `M${a[0]},${a[1]}L${b[0]},${b[1]}`; });
    const groups = labels.selectAll('.label-anchor').data(visible).join('g').attr('class', 'label-anchor');
    groups.append('text').attr('class', f => `region-label${!f.properties.in_canada && !timeline[currentIndex].early ? ' outside-label' : ''}${f.properties.area_km2 < 85000 ? ' small-label' : ''}`)
      .attr('transform', f => { const p = labelLocation(f); return `translate(${p[0]},${p[1]})`; })
      .each(function(f) {
        const lines = f.properties.number ? [String(f.properties.number)] : labelLines(f.properties.name);
        const t = d3.select(this);
        lines.forEach((line, i) => t.append('tspan').attr('x', 0).attr('dy', i === 0 ? (lines.length > 1 ? '-.1em' : '.35em') : '1.12em').text(line));
      });
    if (timeline[currentIndex].year >= 1912 && timeline[currentIndex].year < 1999) {
      const p = projection([-106,69]);
      const title = labels.append('text').attr('class','nwt-title').attr('x',p[0]).attr('y',p[1]-12);
      title.append('tspan').attr('x',p[0]).text('Northwest Territories');
      title.append('tspan').attr('x',p[0]).attr('dy','1.35em').attr('class','nwt-subtitle').text('ONE TERRITORY · HISTORICAL DISTRICTS');
    }
    labels.attr('display', $('show-labels').checked ? null : 'none');
    svg.call(zoom.transform, d3.zoomTransform(svg.node()));
  }

  function showTooltip(event, feature) {
    const bounds = $('map-surface').getBoundingClientRect();
    const tooltip = $('map-tooltip');
    tooltip.textContent = `${feature.properties.name} · ${feature.properties.kind || 'geographic context'}`;
    tooltip.hidden = false;
    const width = tooltip.offsetWidth;
    tooltip.style.left = Math.max(8, Math.min(bounds.width - width - 8, event.clientX - bounds.left + 12)) + 'px';
    tooltip.style.top = Math.max(8, Math.min(bounds.height - 50, event.clientY - bounds.top - 39)) + 'px';
  }

  function drawRegions() {
    const event = timeline[currentIndex], allFeatures = visibleFeatures();
    const raster = d3.select('#source-map'); raster.selectAll('*').remove();
    d3.select('#context-land').attr('display',null);
    d3.select('#graticule').attr('display',null);
    // Every date uses geographic vector regions. Printed panels remain references.
    if (event.context) raster.selectAll('path').data(latestLand.features).join('path').attr('d',f=>path(drawable(f))).attr('fill','#d9e4e8').attr('stroke','#d9e4e8').attr('stroke-width',.4);
    const points = allFeatures.filter(f=>f.geometry.type==='Point');
    d3.select('#geography').selectAll('circle').data(points,f=>f.properties.name).join('circle').attr('class','region place-marker')
      .attr('cx',f=>projection(f.properties.label)[0]).attr('cy',f=>projection(f.properties.label)[1]).attr('r',f=>f.properties.number ? 16:10).attr('fill',f=>f.properties.colour || '#a64856')
      .attr('role','button').attr('tabindex',0).attr('aria-label',f=>`${f.properties.number ? f.properties.number+'. ':''}${f.properties.name}`).attr('aria-pressed',f=>String(f.properties.name===selectedName))
      .on('click',(ev,f)=>{ev.stopPropagation();selectRegion(f.properties.name);}).on('keydown',(ev,f)=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();ev.stopPropagation();selectRegion(f.properties.name);}}).on('pointermove',showTooltip).on('pointerleave',()=>{$('map-tooltip').hidden=true;});
    const features = allFeatures.filter(f=>f.geometry.type!=='Point');
    const drawing = d3.select('#regions').selectAll('path').data(features, f => f.properties.name);
    drawing.exit().remove();
    const merged = drawing.enter().append('path').attr('class', 'region').merge(drawing)
      .attr('d', f => path(drawable(f))).attr('fill', fill).attr('stroke', f=>f.properties.context ? f.properties.colour : null)
      .attr('role', 'button').attr('tabindex', 0)
      .attr('aria-label', f => `${f.properties.name}, ${event.early ? f.properties.kind : f.properties.in_canada ? f.properties.kind : 'outside Canada at this date'}`)
      .attr('aria-pressed', f => f.properties.name === selectedName ? 'true' : 'false')
      .classed('selected', f => f.properties.name === selectedName)
      .on('click', (event, f) => { event.stopPropagation(); selectRegion(f.properties.name); })
      .on('keydown', (event, f) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); selectRegion(f.properties.name); } })
      .on('pointermove', showTooltip).on('pointerleave', () => {$('map-tooltip').hidden = true;});
    merged.selectAll('title').remove();
    merged.append('title').text(f => f.properties.name);
    drawLabels(allFeatures);
  }

  async function drawPrevious(token = renderToken) {
    const group = d3.select('#previous-regions');
    group.selectAll('*').remove();
    const allowed = currentIndex > 0 && !timeline[currentIndex].context && !timeline[currentIndex-1].context;
    $('previous-legend').hidden = !$('show-previous').checked || !allowed;
    if (!$('show-previous').checked || !allowed) return;
    try {
      const index = currentIndex;
      const oldMap = await fetchYear(timeline[index - 1].year);
      if (token !== renderToken || index !== currentIndex || !$('show-previous').checked) return;
      // Only show geometry that differs; name-only changes have no dashed edge.
      const currentShapes = new Set(currentMap.features.map(f => f.properties.shape_key));
      const changed = oldMap.features.filter(f => f.geometry.type!=='Point' && !f.properties.context && !currentShapes.has(f.properties.shape_key));
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
    const sorted = [...visibleFeatures()].sort((a, b) => Number(b.properties.in_canada) - Number(a.properties.in_canada) || a.properties.name.localeCompare(b.properties.name));
    for (const feature of sorted) {
      const p = feature.properties;
      const button = document.createElement('button');
      button.className = `region-chip${!p.in_canada ? ' outside-chip' : ''}${p.kind === 'Historical district' ? ' district-chip' : ''}`;
      button.dataset.region = p.name;
      button.setAttribute('aria-pressed', String(p.name === selectedName));
      const dot = document.createElement('span');
      dot.className = 'chip-colour'; dot.style.background = p.colour || (p.name === 'Disputed area' ? '#c6a876' : fill(feature)); dot.setAttribute('aria-hidden', 'true');
      button.append(dot, document.createTextNode(`${p.number ? p.number+'. ':''}${p.name}`));
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
    const feature = visibleFeatures().find(f => f.properties.name === name);
    d3.selectAll('.region').classed('selected', f => f.properties.name === name).attr('aria-pressed', f => String(f.properties.name === name));
    for (const button of $('region-list').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.region === name));
    const details = $('region-details'); details.replaceChildren();
    $('clear-region').hidden = !feature;
    if (!feature) {
      selectedName = null; $('region-title').textContent = 'Explore a region';
      details.append(paragraph(timeline[currentIndex].early ? 'Select a coloured region, a hatched claim or a geographic marker, or use the region list below the map.' : 'Select a region or geographic marker, or use the list below the map.')); return;
    }
    const p = feature.properties;
    $('region-title').textContent = p.name;
    const tag = document.createElement('span'); tag.className = 'kind-tag'; tag.textContent = p.name === 'Disputed area' ? 'Disputed jurisdiction' : p.kind; details.append(tag);
    if (p.note) { details.append(paragraph(p.note)); if (announce) $('announcement').textContent = `${p.name}. ${p.note}`; return; }
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
    $('story-year').textContent = dateLabel(event); $('stamp-year').textContent = dateLabel(event);
    $('stamp-caption').textContent = event.type; $('event-type').textContent = event.type;
    $('event-title').textContent = event.title; $('event-summary').textContent = event.summary;
    $('notice').textContent = event.watch; $('map-heading').textContent = event.context ? 'Land and water before colonial borders' : event.early ? `Digital colonial map · ${event.year===1840 ? '1841 union' : event.year}` : `Political boundaries in ${event.year}`;
    $('region-list-year').textContent = dateLabel(event);
    $('regions-heading').firstChild.textContent = 'Regions in ';
    $('map-note').textContent = event.mapNote || (event.sourceMap ? 'Printed colours show European claims and administrative boundaries. Indigenous homelands and rights continue across these lines.' : ''); $('map-note').hidden = !$('map-note').textContent;
    $('key-idea-card').hidden = !event.keyIdea; $('key-idea').textContent = event.keyIdea || '';
    $('key-source').hidden = !event.keySource; $('key-source').href = event.keySource || event.source;
    $('event-source').href = event.source; $('event-source').textContent = event.sourceLabel;
    $('inquiry-question').textContent = event[$('grade-prompt').value];
    $('canada-legend').hidden = event.early; $('outside-legend').hidden = event.early; $('source-legend').hidden = !event.early || event.context;
    $('reference-map').hidden = !event.sourceMap; $('reference-map').href = event.sourceMap ? `assets/atlas-${event.sourceMap}.webp` : '#'; $('reference-map').textContent = event.year===1840 ? 'View the later 1849 Atlas reference' : `View the ${event.sourceMap} Atlas reference`;
    $('show-geography').disabled = false; $('show-geography').closest('label').title = '';
    $('map-surface').classList.remove('early-map');
    document.querySelector('.map-credit').textContent = event.context ? 'Geographic context · modern coastlines' : event.early ? 'Colonial regions: generalized classroom reconstruction' : 'Boundaries: Natural Resources Canada · Lambert projection';
    $('focus-change').disabled = !event.focus.length;
    const provinces = provinceCount();
    $('province-count').textContent = event.early ? 'Before Confederation · Canada is not yet a country' : `${provinces} Canadian province${provinces === 1 ? '' : 's'}${event.year >= 1999 ? ' · 3 territories' : event.year >= 1898 ? ' · 2 territories' : event.year>=1870 ? ' · 1 territory':''}`;
    $('year-select').value = String(currentIndex); $('year-range').value = currentIndex;
    $('year-range').setAttribute('aria-valuetext', `${dateLabel(event)}, ${event.title}`);
    $('previous').disabled = currentIndex === 0; $('next').disabled = currentIndex === timeline.length - 1;
    $('show-previous').disabled = currentIndex === 0 || event.context || timeline[currentIndex-1].context;
    for (const button of $('milestones').querySelectorAll('button')) {
      const active = Number(button.dataset.index) === currentIndex;
      button.classList.toggle('current', active); button.setAttribute('aria-pressed', String(active));
    }
    $('download-year').textContent = event.context ? 'Download classroom timeline notes' : `Download ${dateLabel(event)} GeoJSON`;
    $('download-year').href = event.context ? 'data/timeline.json' : event.early ? 'data/colonial-boundaries.json.gz' : 'data/historical-boundaries.geojson.gz';
    $('download-year').download = event.context ? 'canada-timeline.json' : '';
    $('early-chapter').setAttribute('aria-pressed',String(!!event.early)); $('canada-chapter').setAttribute('aria-pressed',String(!event.early));
    try { const url = new URL(location.href); url.searchParams.set('year', event.year); history.replaceState(null, '', url); } catch (_) { /* Some embedded previews restrict history changes. */ }
    $('announcement').textContent = `${dateLabel(event)}. ${event.title}.${event.early?'':` ${provinces} Canadian provinces.`}`;
  }

  async function showYear(index, manual = true) {
    if (!timeline.length) return false;
    if (manual) pause();
    const nextIndex = Math.max(0, Math.min(timeline.length - 1, Number(index)));
    const token = ++renderToken;
    lastFinished = false;
    $('loading').classList.remove('error'); $('loading').textContent = `Loading ${dateLabel(timeline[nextIndex])}…`; $('loading').hidden = false;
    $('map').setAttribute('aria-busy', 'true');
    try {
      const data = await fetchYear(timeline[nextIndex].year);
      if (token !== renderToken) return false;
      if (timeline[nextIndex].context && !timeline[currentIndex]?.context) $('show-geography').checked = true;
      if (timeline[currentIndex]?.early && !timeline[nextIndex].early) $('show-geography').checked = false;
      currentIndex = nextIndex; currentMap = data;
      if (!visibleFeatures().some(f => f.properties.name === selectedName)) selectedName = null;
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
    $('early-chapter').addEventListener('click',()=>showYear(0));
    $('canada-chapter').addEventListener('click',()=>showYear(timeline.findIndex(e=>e.year===1867)));
    $('grade-prompt').addEventListener('change',()=>{$('inquiry-question').textContent=timeline[currentIndex][$('grade-prompt').value];});
    $('show-geography').addEventListener('change',()=>{drawRegions();drawRegionList();selectRegion(selectedName,false);});
    $('compare-button').addEventListener('click',()=>{pause();$('compare-left').value=Math.max(0,currentIndex-1);$('compare-right').value=currentIndex;$('compare-dialog').showModal();renderComparison();});
    $('compare-left').addEventListener('change',renderComparison);$('compare-right').addEventListener('change',renderComparison);
    $('close-compare').addEventListener('click',()=>{$('compare-dialog').close();compareToken++;});
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
    $('download-year').addEventListener('click', event => { if (!timeline[currentIndex].context) { event.preventDefault(); downloadYear(timeline[currentIndex].year); } });
    $('sources-dialog').addEventListener('click', event => { if (event.target === $('sources-dialog')) { const r = event.target.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.target.close(); } });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') { pause(); return; }
      if ($('sources-dialog').open || $('compare-dialog').open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.matches('input,select,textarea') || target.isContentEditable)) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); showYear(currentIndex + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); showYear(currentIndex - 1); }
    });
  }

  let compareToken=0;
  async function renderComparison() {
    const token=++compareToken;$('compare-status').textContent='Loading comparison…';
    try {
      const indexes=[$('compare-left').value,$('compare-right').value].map(Number);
      const maps=await Promise.all(indexes.map(i=>fetchYear(timeline[i].year)));
      if(token!==compareToken || !$('compare-dialog').open)return;
      ['left','right'].forEach((side,j)=>{
        const event=timeline[indexes[j]],holder=$(`compare-map-${side}`);holder.replaceChildren();
        const canvas=d3.select(holder).append('svg').attr('viewBox',`0 0 ${WIDTH} ${HEIGHT}`).attr('role','img').attr('aria-label',event.context?'Geographic context, no provincial boundaries':`${event.early?'Generalized colonial':'Political'} boundaries in ${dateLabel(event)}`);
        canvas.append('defs').html($('map').querySelector('defs').innerHTML);
        canvas.selectAll('.comparison-land').data(latestLand.features).join('path').attr('class','comparison-land').attr('d',f=>path(drawable(f))).attr('fill','#d9e4e8').attr('stroke','#d9e4e8').attr('stroke-width',.3);
        if(!event.context) {
          canvas.selectAll('.comparison-region').data(maps[j].features.filter(f=>f.geometry.type!=='Point')).join('path').attr('class','comparison-region').attr('d',f=>path(drawable(f))).attr('fill',fill).attr('stroke','white').attr('stroke-width',1);
          canvas.selectAll('.comparison-point').data(maps[j].features.filter(f=>f.geometry.type==='Point')).join('circle').attr('class','comparison-point').attr('cx',f=>projection(f.geometry.coordinates)[0]).attr('cy',f=>projection(f.geometry.coordinates)[1]).attr('r',8).attr('fill',fill);
          canvas.selectAll('.region-label').data(maps[j].features.filter(f=>f.properties.name!=='Disputed area'&&!f.properties.context)).join('text').attr('class','region-label').attr('transform',f=>{const p=projection(f.properties.label);return `translate(${p[0]},${p[1]})`;}).each(function(f){const lines=labelLines(f.properties.name);lines.forEach((line,i)=>d3.select(this).append('tspan').attr('x',0).attr('dy',i===0?'0':'1.12em').text(line));});
          if(event.year>=1912 && event.year<1999) {const p=projection([-106,69]);canvas.append('text').attr('class','nwt-title').attr('x',p[0]).attr('y',p[1]-12).text('Northwest Territories');}
        }
        $(`compare-heading-${side}`).textContent=`${dateLabel(event)} · ${event.title}`;
        $(`compare-note-${side}`).textContent=event.mapNote || event.summary;
      });$('compare-status').textContent='Comparison ready.';
    }catch(error){if(token===compareToken)$('compare-status').textContent='A comparison map could not load. Choose the dates again.';}
  }
  async function initialize() {
    try {
      timeline = await json('data/timeline.json');
      const latest = await fetchYear(timeline.at(-1).year);
      latestLand = latest;
      projection = d3.geoConicConformal().parallels([49, 77]).rotate([95, 0]).center([0, 49]);
      projection.fitExtent([[45, 35], [WIDTH - 72, HEIGHT - 46]], {type: 'FeatureCollection', features: latest.features.map(drawable)});
      path = d3.geoPath(projection);
      d3.select('#graticule').append('path').attr('class', 'graticule').attr('d', path(d3.geoGraticule().extent([[-175, 28], [-25, 87]]).step([10, 10])()));
      json('data/context.geojson').then(context => {
        d3.select('#context-land').selectAll('path').data(context.features).join('path').attr('class', 'context-region').attr('d', f => path(drawable(f)));
      }).catch(() => {});
      const shortNames = {1867:'Start',1870:'Manitoba',1871:'B.C.',1873:'P.E.I.',1880:'Arctic',1898:'Yukon',1905:'AB + SK',1912:'North',1949:'Nfld.',1999:'Nunavut'};
      timeline.forEach((event, i) => {
        const option = document.createElement('option'); option.value = i; option.textContent = `${dateLabel(event)} · ${event.type}`; $('year-select').append(option);
        $('compare-left').append(option.cloneNode(true));$('compare-right').append(option.cloneNode(true));
        const link = document.createElement('a'); link.href = 'data/historical-boundaries.geojson.gz'; link.textContent = dateLabel(event);
        if (event.context) {link.href='data/timeline.json';link.download='canada-timeline.json';}
        else if(event.early) link.href='data/colonial-boundaries.json.gz';
        link.addEventListener('click', click => { if(!event.context){click.preventDefault(); downloadYear(event.year);} }); $('all-downloads').append(link);
        if (event.major) {
          const button = document.createElement('button'); button.className = 'milestone'; button.dataset.index = i;
          button.append(document.createTextNode(dateLabel(event)));
          const label = document.createElement('span'); label.textContent = shortNames[event.year] || event.type; button.append(label);
          button.setAttribute('aria-label', `${dateLabel(event)}: ${event.title}`); button.addEventListener('click', () => { resetView(); showYear(i); }); $('milestones').append(button);
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
