(function(root){'use strict';
// Read-only teacher browser; does not alter quiz rounds, scores or saved responses.
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key=r=>r.topic.id+':'+r.q.id;
const formats={single:'Choose one',multi:'Select several',dropdown:'Dropdowns',sort:'Drag & sort',order:'Put in order',match:'Match',label:'Label a diagram',hotspot:'Select text',numeric:'Enter a number'};
function collect(topics){return topics.flatMap(topic=>topic.data.questions.map(q=>({topic,q,group:topic.data.groups.find(g=>g.id===q.group)})));}
function selectQuestions(rows,{unit='all',group='all',format='all',query=''}={}){
 const needle=query.trim().toLocaleLowerCase();
 return rows.filter(({topic,q,group:g})=>{
  if(unit!=='all'&&topic.id!==unit)return false;
  if(group!=='all'&&q.group!==group)return false;
  if(format!=='all'&&q.type!==format)return false;
  if(!needle)return true;
  const d=q.data||{};
  const text=[topic.name,g?.title,q.id,q.prompt,q.explanation,q.hint,d.context,d.intro,d.sourceTitle,
   ...(q.refs||[]),...(d.options||[]),...(d.blanks||[]).flatMap(b=>[b.label,...b.options]),
   ...(d.items||[]).map(x=>x.text),...(d.zones||[]).map(x=>x.label)].filter(Boolean).join(' ').toLocaleLowerCase();
  return text.includes(needle);
 });
}
function sourceHTML(row){const q=row.q,g=row.group;
 const refs=(q.refs||[]).map(ref=>{const match=/^([a-z]+)\.(K|U|SP)(\d+)$/.exec(ref);
  if(!match||!g||match[1]!==g.id)return '<li>'+esc(ref)+'</li>';
  const statement=g.source?.[match[2]]?.[Number(match[3])-1];
  return '<li><strong>'+esc(ref)+'</strong> · '+esc(statement||'Mapped statement')+'</li>';});
 return '<details class="review-curriculum"><summary>Curriculum mapping · '+refs.length+' statement'+(refs.length===1?'':'s')+'</summary><ul>'+refs.join('')+'</ul></details>';
}
function answersHTML(q,art){const d=q.data||{};
 if(['single','multi','hotspot'].includes(q.type)){
  return '<ol class="review-options">'+d.options.map((o,i)=>{
   const correct=q.type==='multi'?q.answer.includes(i):i===q.answer;
   const image=d.optionVisuals?.[i];
   return '<li class="review-option'+(correct?' correct':'')+'">'+(image?'<div class="review-option-art">'+art(image,i,q)+'</div>':'')+
    '<div class="review-option-text"><span class="review-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(o)+'</span>'+(correct?'<span class="review-correct">✓ Correct</span>':'')+'</div></li>';}).join('')+'</ol>';
 }
 if(q.type==='dropdown')return '<div class="review-blank-list">'+d.blanks.map((b,i)=>'<section><strong>'+esc(b.label)+'</strong><ul>'+b.options.map(o=>'<li class="'+(o===q.answer[i]?'correct':'')+'">'+esc(o)+(o===q.answer[i]?' · ✓ Correct':'')+'</li>').join('')+'</ul></section>').join('')+'</div>';
 if(q.type==='numeric')return '<p class="review-numeric"><strong>'+esc(q.answer)+' '+esc(d.unit||'')+'</strong>'+(q.tolerance?' (tolerance ±'+esc(q.tolerance)+')':'')+'</p>';
 if(q.type==='order')return '<ol class="review-order">'+q.answer.map(id=>'<li>'+esc(d.items.find(x=>x.id===id)?.text||id)+'</li>').join('')+'</ol>';
 if(['sort','match','label'].includes(q.type))return '<div class="review-placements">'+d.items.map(item=>{
  const zoneId=q.answer[item.id],z=d.zones.find(z=>z.id===zoneId),picture=d.zoneImages?.[zoneId];
  const artwork=picture&&root.ScienceLabVisuals?.scene?'<div class="review-placement-art">'+root.ScienceLabVisuals.scene(picture.asset,picture.panel)+'</div>':'';
  return '<div class="review-placement">'+artwork+'<span>'+esc(item.text)+'</span><span class="review-to" aria-hidden="true">→</span><strong>'+esc(z?.label||zoneId)+'</strong></div>';}).join('')+'</div>';
 return '';
}
function previewHTML(row,ctx){const {q,topic,group}=row,d=q.data||{};
 const picture=ctx.renderVisual(q)||'',art=ctx.renderOptionArt||(()=> '');
 return '<div class="review-question-meta"><span>'+esc(topic.name)+'</span><span>'+esc(group?.title||'')+'</span><span>'+esc(formats[q.type]||q.type)+'</span><code>'+esc(q.id)+'</code></div>'+
 '<h3 class="review-prompt" id="review-question-heading" tabindex="-1">'+esc(q.prompt)+'</h3>'+
 (picture?'<div class="review-visual">'+picture+'</div>':'')+
 (d.context||d.intro?'<p class="review-context">'+esc(d.context||d.intro)+'</p>':'')+
 '<h4 class="review-subhead">'+(q.type==='hotspot'?'Evidence statements and answer':'Answers and options')+'</h4>'+
 answersHTML(q,art)+
 '<div class="review-explanation"><strong>Explanation</strong><p>'+esc(q.explanation)+'</p></div>'+
 '<div class="review-hint"><strong>Student hint</strong><p>'+esc(q.hint)+'</p></div>'+sourceHTML(row);
}
let dialog,all=[],visible=[],selected='',filters={unit:'all',group:'all',format:'all',query:''},ctx;
function $(id){return dialog.querySelector('#'+id);}
function showPreview(scrollTop=false){
 let index=visible.findIndex(row=>key(row)===selected);
 if(index<0){index=0;selected=visible[0]?key(visible[0]):'';}
 $('review-count').textContent=visible.length+' of '+all.length+' questions';
 $('review-position').textContent=visible.length?(index+1)+' of '+visible.length:'No matches';
 $('review-prev').disabled=index<=0;$('review-next').disabled=index<0||index>=visible.length-1;
 $('review-copy').disabled=index<0;
 $('review-question').innerHTML=visible.length?previewHTML(visible[index],ctx):'<p class="review-empty">No questions match these filters. Try a different unit, goal, type or search.</p>';
 [...$('review-list').querySelectorAll('[data-review-key]')].forEach(b=>b.setAttribute('aria-current',String(b.dataset.reviewKey===selected)));
 if(scrollTop)$('review-preview').scrollTop=0;
}
function renderList(){
 $('review-list').innerHTML=visible.map((row,i)=>'<button type="button" class="review-list-item" data-review-key="'+esc(key(row))+'" aria-current="'+(key(row)===selected)+'"><span class="review-list-number">'+(i+1)+'</span><span><strong>'+esc(row.q.prompt)+'</strong><small>'+esc(row.topic.name)+' · '+esc(formats[row.q.type]||row.q.type)+' · '+esc(row.q.id)+'</small></span></button>').join('');
 showPreview(true);
}
function applyFilters(){visible=selectQuestions(all,filters);if(!visible.some(r=>key(r)===selected))selected=visible[0]?key(visible[0]):'';renderList();}
function setGroupOptions(){
 const groups=filters.unit==='all'?ctx.topics.flatMap(t=>t.data.groups.map(g=>({label:t.name+' · '+g.title,id:g.id}))):ctx.topics.find(t=>t.id===filters.unit)?.data.groups.map(g=>({label:g.title,id:g.id}))||[];
 $('review-group').innerHTML='<option value="all">All learning goals</option>'+groups.map(g=>'<option value="'+esc(g.id)+'">'+esc(g.label||g.title)+'</option>').join('');
 filters.group='all';$('review-group').value='all';
}
function move(delta){const i=visible.findIndex(r=>key(r)===selected);if(i<0)return;const next=Math.max(0,Math.min(i+delta,visible.length-1));if(next===i)return;selected=key(visible[next]);showPreview(true);$('review-list').querySelectorAll('[data-review-key]')[next]?.scrollIntoView({block:'nearest'});}
function init(options){
 ctx=options;all=collect(ctx.topics);dialog=document.getElementById('question-review-dialog');
 $('review-unit').innerHTML='<option value="all">All units · '+all.length+' questions</option>'+ctx.topics.map(t=>'<option value="'+esc(t.id)+'">'+esc(t.name)+' · '+t.data.questions.length+'</option>').join('');
 $('review-format').innerHTML='<option value="all">All nine formats</option>'+Object.entries(formats).map(([key,label])=>'<option value="'+key+'">'+esc(label)+'</option>').join('');
 $('review-unit').addEventListener('change',ev=>{filters.unit=ev.target.value;setGroupOptions();applyFilters();});
 $('review-group').addEventListener('change',ev=>{filters.group=ev.target.value;applyFilters();});
 $('review-format').addEventListener('change',ev=>{filters.format=ev.target.value;applyFilters();});
 $('review-search').addEventListener('input',ev=>{filters.query=ev.target.value;applyFilters();});
 $('review-list').addEventListener('click',ev=>{const button=ev.target.closest('[data-review-key]');if(!button)return;selected=button.dataset.reviewKey;showPreview(true);});
 $('review-prev').addEventListener('click',()=>move(-1));$('review-next').addEventListener('click',()=>move(1));
 $('review-close').addEventListener('click',()=>dialog.close());
 $('review-copy').addEventListener('click',async()=>{const row=visible.find(r=>key(r)===selected);if(!row)return;
  const q=row.q,statement=(q.refs||[]).join(', '),text=[row.topic.name+' / '+row.group?.title,'Question '+q.id+' ('+q.type+')',q.prompt,'Answer: '+ctx.answerText(q),'Explanation: '+q.explanation,'Curriculum: '+statement].join('\n');
  try{await navigator.clipboard.writeText(text);$('review-copy-status').textContent='Question details copied.';}catch{$('review-copy-status').textContent='Copy unavailable in this browser.';}
 });
 dialog.addEventListener('keydown',ev=>{if(['INPUT','TEXTAREA','SELECT'].includes(ev.target.tagName)||ev.altKey||ev.ctrlKey||ev.metaKey)return;
  if(ev.key==='ArrowLeft'||ev.key==='ArrowRight'){ev.preventDefault();move(ev.key==='ArrowRight'?1:-1);}});
}
function open(unit='all'){
 if(!dialog)throw Error('Teacher review is not initialized');
 filters={unit:ctx.topics.some(t=>t.id===unit)?unit:'all',group:'all',format:'all',query:''};
 $('review-unit').value=filters.unit;$('review-format').value='all';$('review-search').value='';$('review-copy-status').textContent='';
 setGroupOptions();selected='';applyFilters();dialog.showModal();$('review-title').focus({preventScroll:true});
}
const api={init,open,collect,selectQuestions,previewHTML,answersHTML};
root.ScienceLabTeacherReview=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
