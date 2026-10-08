/* Historical atlas background. Natural Earth coastlines are public domain.
 * No contemporary tiles or country borders are used in this lesson.
 */
function addHistoricalBasemap(map, land) {
  map.createPane('atlasLand');
  map.getPane('atlasLand').style.zIndex = 200;
  map.getPane('atlasLand').style.pointerEvents = 'none';
  const layer = L.geoJSON(land, {
    pane: 'atlasLand', interactive: false,
    style: { color: '#ad8143', weight: 1.25, fillColor: '#efd6a0', fillOpacity: 1 },
    attribution: 'Coastlines: <a href="https://www.naturalearthdata.com/">Natural Earth</a>'
  }).addTo(map);
  map.createPane('atlasGrid');
  map.getPane('atlasGrid').style.zIndex = 210;
  map.getPane('atlasGrid').style.pointerEvents = 'none';
  for (let lon = -50; lon <= 85; lon += 10)
    L.polyline([[-5, lon], [75, lon]], { pane: 'atlasGrid', color: '#e8d89a', weight: .7, opacity: .15, interactive: false }).addTo(map);
  for (let lat = 0; lat <= 70; lat += 10)
    L.polyline([[lat, -50], [lat, 85]], { pane: 'atlasGrid', color: '#e8d89a', weight: .7, opacity: .15, interactive: false }).addTo(map);
  const compass = L.control({position: 'topright'});
  compass.onAdd = () => {
    const el = L.DomUtil.create('div', 'atlas-north');
    el.setAttribute('aria-label', 'North is up');
    el.innerHTML = '<img src="assets/atlas-compass.svg" alt="" width="86" height="86">';
    return el;
  };
  compass.addTo(map);
  if (typeof ResizeObserver !== 'undefined') {
    const container = map.getContainer();
    let width = container.clientWidth, height = container.clientHeight, frame = 0;
    const observer = new ResizeObserver(() => {
      const nextWidth = container.clientWidth, nextHeight = container.clientHeight;
      if (!nextWidth || !nextHeight || (nextWidth === width && nextHeight === height)) return;
      width = nextWidth; height = nextHeight;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        map.invalidateSize({ pan:false, debounceMoveend:true });
        map.fire('screenresize');
      });
    });
    observer.observe(container);
    map.on('unload', () => { observer.disconnect(); cancelAnimationFrame(frame); });
  }
  return layer;
}
