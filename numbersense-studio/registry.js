// Each topic registers a mount(root, activity, context) function.
// A mount may return a cleanup function; it must stop listeners and timers.
const loaders = new Map();
loaders.set('fractions',()=>import('./activities/fractions.js'));
loaders.set('numbers',()=>import('./activities/numbers.js'));
export const isReady = activity => loaders.has(activity.topic);
export async function loadActivity(activity) {
  const loader = loaders.get(activity.topic);
  return loader ? (await loader()).mount : null;
}
