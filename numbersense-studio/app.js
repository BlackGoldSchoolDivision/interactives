import {topics,activities,bonusGames,getActivity,getTopic,inTopic} from './catalogue.js';
import {topicPreview} from './previews.js';
import {loadActivity,isReady} from './registry.js';

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
      if(mount) cleanup = mount(root,activity,{}) || (()=>{});
      else root.innerHTML = `<section class="page-intro"><h1>${activity.name}</h1></section>${development(activity.name)}`;
    } catch {
      if(version!==routeVersion) return;
      main.querySelector('#activity-root').innerHTML = '<section class="notice"><h1>This activity could not load</h1><p>Your other activities are still available. Please reload the page and try again.</p><a class="button" href="#/">Back to topics</a></section>';
    }
  } else if(kind==='bonus') {
    main.innerHTML = `${crumb('Bonus games')}<section class="page-intro"><h1>Take a game break</h1><p class="subtitle">Three optional mini-games. Play whenever you like.</p></section><div class="activity-grid">${bonusGames.map(g=>`<a class="activity-card" href="#/game/${g.id}"><div><h2>${g.name}</h2><p>${g.description}</p><span class="small">In development</span></div>${arrow}</a>`).join('')}</div>`;
  } else if(kind==='game' && bonusGames.some(g=>g.id===id)) main.innerHTML = `${crumb('Bonus games','bonus')}${development(bonusGames.find(g=>g.id===id).name)}`;
  else if(kind==='progress') main.innerHTML = `${crumb('My progress')}<section class="page-intro"><h1>My progress</h1><p class="subtitle">Your practice belongs to this session. No name or account needed.</p></section><section class="notice"><h2>A fresh start</h2><p>Completed practice will appear here as activity groups are added.</p><a class="button" href="#/">Choose a topic</a></section>`;
  else if(kind==='credits') main.innerHTML = `${crumb('The creators')}<section class="page-intro"><h1>Created by teachers</h1><p class="subtitle">A collection built around classroom mathematics.</p></section><section class="notice"><h2>Mrs. Publow & Mrs. Murley</h2><p>Provisional credits for the original teacher-created resource. Their exact contributions and final credit wording await confirmation before publication.</p><p>The redesign preserves the teachers’ worthwhile learning content while improving the mathematical models, feedback and accessibility.</p><a class="button secondary" href="https://maltais239.github.io/interactives/numbersense6/" target="_blank" rel="noopener">Visit the original Number Sense</a></section>`;
  else main.innerHTML = `<section class="notice"><h1>Choose a new path</h1><p>This activity link is not in the collection.</p><a class="button" href="#/">Back to topics</a></section>`;
  if(version!==routeVersion) return;
  document.title = `${main.querySelector('h1')?.textContent || 'Number Sense'} · Number Sense`;
  main.focus({preventScroll:true});
  window.scrollTo({top:0,behavior:'instant'});
}
document.querySelector('.skip-link').addEventListener('click',event=>{
  event.preventDefault();
  main.focus();
});
window.addEventListener('hashchange',render);
render();
