(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./data.js'));else root.DoubleTake=factory(root.DoubleTakeData);})(typeof globalThis!=='undefined'?globalThis:this,function(data){
  'use strict';
  const levels={starter:{name:'Starter',grades:'Suggested Grade 2+',description:'Familiar words, direct sentences and everyday meanings.'},explorer:{name:'Explorer',grades:'Suggested Grades 3–4+',description:'More spellings and meanings, with clues in the sentence.'},expert:{name:'Expert',grades:'Suggested Grades 5–6+',description:'Precise vocabulary and less familiar meanings. Some words sound different too.'}};
  const modes={sound:{name:'Sound-alikes',tagline:'Same sound. Different meaning.'},spelling:{name:'Same spelling',tagline:'Same spelling. Different meaning.'}};
  function random(seed){let n=seed>>>0;return()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
  function hash(text){let n=2166136261;for(const c of text){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return n>>>0;}
  function shuffle(items,seed){const a=[...items],r=random(seed);for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function pool(level,mode){return data.questions.filter(q=>q.level===level&&q.mode===mode);}
  function create(level,mode,seed,anchor=false){let qs=shuffle(pool(level,mode),seed);if(anchor){const first=pool(level,mode)[0];qs=[first,...qs.filter(q=>q.id!==first.id)];}return {level,mode,seed,ids:qs.slice(0,10).map(q=>q.id),index:0,score:0,firstTry:0,answers:[],selected:null,wrong:[],solved:false,finished:false,feedback:'',feedbackType:''};}
  function question(state){return data.questions.find(q=>q.id===state.ids[state.index]);}
  function options(q,seed){return shuffle(q.options.map((option,id)=>({...option,id})),hash(q.id)^seed);}
  function choose(state,id){if(state.solved||state.finished)return false;const q=question(state);if(!q.options[id])return false;state.selected=id;state.feedback='';state.feedbackType='';return true;}
  function check(state){
    if(state.solved||state.finished)return {changed:false};const q=question(state);
    if(state.selected===null){state.feedback='Choose a sticker first.';state.feedbackType='notice';return {changed:true,correct:false,empty:true};}
    if(state.selected!==q.answer){if(!state.wrong.includes(state.selected))state.wrong.push(state.selected);const selected=q.options[state.selected];state.feedback=(q.mode==='sound'?selected.label.toUpperCase()+' means '+selected.meaning+'. ':'')+'Look for the clue “'+q.evidence+'”. Try a different sticker.';state.feedbackType='try';return {changed:true,correct:false};}
    const points=state.wrong.length?50:100;state.score+=points;if(!state.wrong.length)state.firstTry++;state.solved=true;state.answers.push({id:q.id,firstTry:!state.wrong.length,points});state.feedback=q.why;state.feedbackType='correct';return {changed:true,correct:true,points};
  }
  function next(state){if(!state.solved)return false;if(state.index===state.ids.length-1){state.finished=true;return true;}state.index++;state.selected=null;state.wrong=[];state.solved=false;state.feedback='';state.feedbackType='';return true;}
  function spoken(q){return q.sentence.replace('___','blank');}
  return {...data,levels,modes,pool,create,question,options,choose,check,next,hash,spoken};
});
