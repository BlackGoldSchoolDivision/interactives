import {topics,activities,bonusGames,getActivity,getTopic,inTopic} from './catalogue.js';
import {topicPreview} from './previews.js?v=20261010-release1';
import {loadActivity,isReady} from './registry.js';
import {createProgress} from './progress.js';
let localStorageHandle=null,sessionStorageHandle=null;
try{localStorageHandle=window.localStorage;}catch{}
try{sessionStorageHandle=window.sessionStorage;}catch{}
const progress=createProgress({local:localStorageHandle,session:sessionStorageHandle});

const main = document.querySelector('#main');
let cleanup = () => {};
let routeVersion = 0;
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const crumb = (label,id) => `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="#/">All topics</a><span aria-hidden="true">/</span>${id?`<a href="${id==='bonus'?'#/bonus':`#/topic/${id}`}">${label}</a>`:`<span>${label}</span>`}</nav>`;
const arrow = '<span class="arrow" aria-hidden="true">→</span>';

function home() {
  return `<section class="intro"><h1>Number Sense</h1><p class="collection-size">${activities.length} activities · ${topics.length} topics · ${bonusGames.length} bonus games</p><p class="subtitle">Choose a topic. Make the mathematics move.</p></section>
  <div class="topic-grid">${topics.map(topic=>`<a class="topic-card ${topic.colour}" href="#/topic/${topic.id}"><h2>${topic.name}</h2><p class="topic-count">${inTopic(topic.id).length} activities</p><div class="topic-preview">${topicPreview(topic.id)}</div><p class="card-caption">${topic.description}${arrow}</p></a>`).join('')}</div>
  <a class="bonus-strip" href="#/bonus"><h2>Bonus games</h2><p>Star Catch · Memory Flash · Target Practice</p><span class="explore">Explore ${arrow}</span></a>`;
}
function topicMenu(topic) {
  return `${crumb(topic.name)}<section class="page-intro"><p class="eyebrow">${inTopic(topic.id).length} activities</p><h1>${topic.name}</h1><p class="subtitle">${topic.intro}</p></section><div class="activity-grid">${inTopic(topic.id).map((a,i)=>`<a class="activity-card" href="#/activity/${a.id}"><span class="activity-index ${topic.colour}" aria-hidden="true">${i+1}</span><div><h2>${a.name}</h2><p>${a.description}</p><span class="small">Grade ${a.grades} · ${isReady(a)?'Explore':'In development'}</span></div>${arrow}</a>`).join('')}</div>`;
}
function development(title) {
  return `<section class="notice"><h2>${escape(title)} is next on the workbench</h2><p>The redesign is being built in tested groups. This screen preserves its place in the collection.</p><a class="button secondary" href="https://maltais239.github.io/interactives/numbersense6/" target="_blank" rel="noopener">Open the original collection</a></section>`;
}
function progressPage(){
  const state=progress.snapshot(),records=Object.values(state.activities);
  const total=records.reduce((n,r)=>n+r.completed,0),first=records.reduce((n,r)=>n+r.firstTry,0);
  return `${crumb('My progress')}<section class="page-intro"><h1>My progress</h1><p class="subtitle">Practice in this tab. No name or account needed.</p></section><section class="workspace"><div class="round-results"><div class="result-stat"><strong>${total}</strong>Challenges completed</div><div class="result-stat"><strong>${first}</strong>First-try answers</div><div class="result-stat"><strong>${total-first}</strong>With hints or retries</div></div><p class="small">These are practice records, not grades. First-try answers exclude hint use.</p><label class="remember-choice"><input id="remember-progress" type="checkbox" ${state.remember?'checked':''}>Remember on this browser</label><p class="small">Otherwise progress stays in this tab until it is closed. Remembered progress belongs to this browser and device. Clear it before a new student uses a shared Chromebook.</p>${progress.notice?`<p class="feedback retry" role="status">${escape(progress.notice)}</p>`:''}<div class="lesson-actions"><button class="button secondary" id="reset-progress">Clear progress for a fresh start</button><a class="button" href="#/">Choose a topic</a></div></section><div class="activity-grid progress-topics">${topics.map(topic=>{const practised=inTopic(topic.id).filter(a=>state.activities[a.id]?.completed);return `<section class="workspace"><h2><a href="#/topic/${topic.id}">${topic.name}</a></h2><p class="small">${practised.length} of ${inTopic(topic.id).length} activities practised</p>${practised.length?'<ul class="progress-activity-list">'+practised.map(a=>`<li><a href="#/activity/${a.id}">${a.name}</a><span>${state.activities[a.id].completed} completed · ${state.activities[a.id].rounds} rounds</span></li>`).join('')+'</ul>':'<p class="small">Choose an activity to begin.</p>'}</section>`;}).join('')}</div><section class="workspace progress-bonus"><h2>Bonus games</h2><p class="small">Game points are kept separately from mathematics practice.</p><div class="round-results">${bonusGames.map(g=>`<div class="result-stat"><strong>${state.bonus[g.id]?.best||0}</strong>${g.name} best<p class="small">${state.bonus[g.id]?.plays||0} rounds</p></div>`).join('')}</div></section>`;
}
function bindProgress(){
  main.querySelector('#remember-progress').addEventListener('change',event=>{progress.remember(event.currentTarget.checked);main.innerHTML=progressPage();bindProgress();main.querySelector('#remember-progress').focus();});
  main.querySelector('#reset-progress').addEventListener('click',()=>{progress.reset();main.innerHTML=progressPage();bindProgress();main.querySelector('#remember-progress').focus();});
}
async function render() {
  const version = ++routeVersion;
  cleanup(); cleanup = () => {};
  const [kind,id] = location.hash.replace(/^#\/?/,'').split('/');
  document.body.dataset.screen = kind || 'home';
  if(!kind) main.innerHTML = home();
  else if(kind==='topic' && getTopic(id)) main.innerHTML = topicMenu(getTopic(id));
  else if(kind==='activity' && getActivity(id)) {
    const activity = getActivity(id), topic = getTopic(activity.topic);
    main.innerHTML = `${crumb(topic.name,topic.id)}<div id="activity-root"></div>`;
    try {
      const mount = await loadActivity(activity);
      if(version !== routeVersion) return;
      const root = main.querySelector('#activity-root');
      if(mount) cleanup = mount(root,activity,progress) || (()=>{});
      else root.innerHTML = `<section class="page-intro"><h1>${activity.name}</h1></section>${development(activity.name)}`;
    } catch {
      if(version!==routeVersion) return;
      main.querySelector('#activity-root').innerHTML = '<section class="notice"><h1>This activity could not load</h1><p>Your other activities are still available. Please reload the page and try again.</p><a class="button" href="#/">Back to topics</a></section>';
    }
  } else if(kind==='bonus') {
    main.innerHTML = `${crumb('Bonus games')}<section class="page-intro"><h1>Take a game break</h1><p class="subtitle">Three optional mini-games. Play whenever you like.</p></section><div class="activity-grid">${bonusGames.map(g=>`<a class="activity-card" href="#/game/${g.id}"><div><h2>${g.name}</h2><p>${g.description}</p><span class="small">Play anytime</span></div>${arrow}</a>`).join('')}</div>`;
  } else if(kind==='game' && bonusGames.some(g=>g.id===id)) {
    main.innerHTML=`${crumb('Bonus games','bonus')}<div id="bonus-root"></div>`;
    try{const module=await import('./games/bonus.js');if(version!==routeVersion)return;cleanup=module.mount(main.querySelector('#bonus-root'),bonusGames.find(g=>g.id===id),progress)||(()=>{});}catch{if(version!==routeVersion)return;main.querySelector('#bonus-root').innerHTML='<section class="notice"><h1>This game could not load</h1><p>Please reload and try again.</p><a class="button" href="#/bonus">Back to bonus games</a></section>';}
  }
  else if(kind==='progress') {main.innerHTML=progressPage();bindProgress();}
  else if(kind==='credits') main.innerHTML = `${crumb('The creators')}<section class="page-intro"><h1>Created by teachers</h1><p class="subtitle">A collection built around classroom mathematics.</p></section><section class="notice"><h2>Mrs. Publow & Mrs. Murley</h2><p>Creators of the original Number Sense learning resource.</p><p>Their classroom ideas and mathematical activities are at the heart of this collection. This redesign carries that work forward with interactive models, clear feedback and accessible practice.</p><a class="button secondary" href="https://maltais239.github.io/interactives/numbersense6/" target="_blank" rel="noopener">Visit the original Number Sense</a></section>`;
  else main.innerHTML = `<section class="notice"><h1>Choose a new path</h1><p>This activity link is not in the collection.</p><a class="button" href="#/">Back to topics</a></section>`;
  if(version!==routeVersion) return;
  document.querySelector('.brand').textContent=kind?'Number Sense':'Interactive Learning Lab';
  document.title = `${main.querySelector('h1')?.textContent || 'Number Sense'} · Number Sense`;
  main.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'auto'});
}
document.querySelector('.skip-link').addEventListener('click',event=>{
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange',render);
render();
