// Each topic registers a mount(root, activity, context) function.
// A mount may return a cleanup function; it must stop listeners and timers.
const loaders = new Map();
loaders.set('fractions',()=>import('./activities/fractions.js'));
loaders.set('numbers',()=>import('./activities/numbers.js'));
loaders.set('decimals',()=>import('./activities/decimals.js'));
loaders.set('ratios',()=>import('./activities/ratios.js'));
loaders.set('geometry',()=>import('./activities/geometry.js'));
loaders.set('chance',()=>import('./activities/chance.js'));
export const isReady = activity => loaders.has(activity.topic);
export async function loadActivity(activity) {
  const loader = loaders.get(activity.topic);
  return loader ? (await loader()).mount : null;
}
