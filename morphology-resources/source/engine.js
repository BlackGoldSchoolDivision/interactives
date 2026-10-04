/* Shared pure functions: no word generation, network calls, or student accounts. */
const MorphCore = (() => {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function random(seed) { let s = seed >>> 0; return () => { s = (Math.imul(1664525,s)+1013904223) >>> 0; return s / 4294967296; }; }
  function shuffle(items, rng = Math.random) { const result = [...items]; for(let i=result.length-1;i>0;i--) { const j=Math.floor(rng()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; } return result; }
  function options(answer, pool, rng = Math.random) { return shuffle([answer,...shuffle([...new Set(pool)].filter(x=>x!==answer),rng).slice(0,2)],rng); }
  const partsCorrect = (selected, parts) => selected.length === parts.length && selected.every((p,i)=>p===parts[i]);
  const wrongGroups = (assignments, cards) => cards.filter(c=>assignments[c.id]!==c.group).map(c=>c.id);
  const wordSum = parts => parts.filter(Boolean).join(' + ');
  const summary = entries => ({completed:entries.filter(x=>x.completed).length,independent:entries.filter(x=>x.completed&&!x.supported).length,supported:entries.filter(x=>x.completed&&x.supported).length});
  return {escape,random,shuffle,options,partsCorrect,wrongGroups,wordSum,summary};
})();
if(typeof module !== 'undefined' && module.exports) module.exports=MorphCore;
