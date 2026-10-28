'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const topics=require('../fr/topics'),base='http://127.0.0.1:8765/science-practice-lab-fr/',out=path.join(__dirname,'../validation/french');fs.mkdirSync(out,{recursive:true});
const sizes=[[1366,650],[1024,540],[768,900],[390,667],[320,568],[640,360]],errors=[],leaks=new Set();let checked=0;
async function overflow(page,label){const dim=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));assert(dim.scroll<=dim.w+2,label+' overflow '+JSON.stringify(dim));}
async function language(page,label){const values=await page.evaluate(()=>{const result=[],walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walk.nextNode()){if(node.parentElement.closest('script,style,noscript,#language-switch'))continue;const text=node.nodeValue.trim();if(text)result.push(text);}for(const e of document.querySelectorAll('[aria-label],[title],[placeholder],[alt]')){if(e.closest('#language-switch'))continue;for(const a of ['aria-label','title','placeholder','alt'])if(e.getAttribute(a))result.push(e.getAttribute(a));}return result;});
 for(const s of values){if(/^[a-z]+-\d+$/.test(s)||s.includes('Science 1–6 Curriculum NEW Alberta'))continue;if(/\b(?:choose|answers?|answered|practice|learning|teacher|curriculum|matched|selected|selectable|before|after|water|ice|leaf|plant|sunlight|solid|liquid|gas|temperature|held|released|stage|completed|placed|seen|correct|review|finish|round|hint|skip|flagged|explanation|progress|record|diagram)\b/i.test(s))leaks.add(label+': '+s);}
}
async function solve(page,q){
 if(['single','multi','hotspot'].includes(q.type)){for(const i of q.type==='multi'?q.answer:[q.answer])await page.locator('[data-choice="'+i+'"]').click();}
 else if(q.type==='numeric')await page.locator('#number-input').fill(String(q.answer).replace('.',','));
 else if(q.type==='dropdown'){for(const[i,a]of q.answer.entries())await page.locator('[data-blank="'+i+'"]').selectOption(a);}
 else if(q.type==='order'){for(let to=0;to<q.answer.length;to++){let order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));while(order.indexOf(q.answer[to])>to){await page.locator('[data-move="'+q.answer[to]+'"][data-direction="-1"]').click();order=await page.locator('[data-order-id]').evaluateAll(els=>els.map(e=>e.dataset.orderId));}}}
 else for(const item of q.data.items){await page.locator('[data-piece="'+item.id+'"]').click();await page.locator('[data-zone="'+q.answer[item.id]+'"] .zone-drop-action').click();}
}
async function startSet(page,topic,qs,mode='learn'){await page.goto(base+'?topic='+topic+'&set='+qs.map(q=>q.id).join(',')+'&mode='+mode);await page.locator('#start-assignment').click();if(await page.locator('#leave-dialog').isVisible())await page.locator('#leave-confirm').click();}
(async()=>{
 const browser=await chromium.launch({headless:true}),context=await browser.newContext({viewport:{width:1366,height:650},permissions:['clipboard-read','clipboard-write'],reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},getVoices(){return[{lang:'fr-CA',name:'Test français'}];},speak(u){window.__utterance={text:u.text,lang:u.lang,voice:u.voice?.lang};}}});window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};});
 for(const topic of topics){
  await page.goto(base+'?topic='+topic.id);await language(page,topic.id+' home');await overflow(page,topic.id+' home');
  assert.equal(await page.locator('html').getAttribute('lang'),'fr-CA');
  await page.locator('#teacher-open').click();await language(page,topic.id+' teacher');assert.equal(await page.locator('.source-outcome').count(),topic.data.groups.reduce((n,g)=>n+g.source.K.length+g.source.U.length+g.source.SP.length,0));await page.locator('#teacher-close').click();
  await startSet(page,topic.id,topic.data.questions);
  for(const[qIndex,q]of topic.data.questions.entries()){
   assert.equal(await page.locator('#question-title').innerText(),q.prompt);
   if(qIndex%9===0){await page.setViewportSize({width:320,height:568});await overflow(page,q.id+' phone');await page.setViewportSize({width:1366,height:650});}
   const images=await page.locator('.question-card img').evaluateAll(imgs=>Promise.all(imgs.map(async img=>{await img.decode();return img.naturalWidth>0;})));assert(images.every(Boolean),q.id+' image');
   await language(page,q.id);await solve(page,q);await page.locator('#check-answer').click();assert.match(await page.locator('#feedback-area').innerText(),/C’est bien ça/,'French key failed '+q.id);await language(page,q.id+' feedback');await page.locator('#check-answer').click();checked++;
  }
  assert(await page.locator('#results').isVisible());assert.equal(await page.locator('.result-review').count(),topic.data.questions.length);await language(page,topic.id+' results');
  console.log('PASS French '+topic.id+': '+topic.data.questions.length+' complete interactions');
 }
 // Each viewport completes a nine-format tour and preserves a live response through resize.
 for(const[i,[width,height]]of sizes.entries()){
  await page.setViewportSize({width,height});const topic=topics[i%topics.length],qs=topic.data.questions.filter((q,j)=>j<18&&j%2===0);await page.goto(base+'?topic='+topic.id);await overflow(page,'French home '+width+'x'+height);
  await startSet(page,topic.id,qs,i===5?'test':'learn');
  for(const[qIndex,q]of qs.entries()){
   await solve(page,q);const saved=await page.evaluate(()=>ScienceLab.getState().run);await page.setViewportSize({width:width===320?390:320,height:568});await overflow(page,q.id+' live resize');assert.deepEqual(await page.evaluate(()=>ScienceLab.getState().run),saved);await page.setViewportSize({width,height});await overflow(page,q.id+' '+width+'x'+height);
   await language(page,q.id+' responsive');await page.locator('#check-answer').click();if(i!==5)await page.locator('#check-answer').click();else if(qIndex<qs.length-1)assert.equal(await page.locator('#feedback-area').innerText(),'');
  }
  assert(await page.locator('#results').isVisible());await overflow(page,'French results '+width+'x'+height);if(width===390)await page.screenshot({path:path.join(out,'results-phone.png'),fullPage:true});
 }
 await page.setViewportSize({width:1366,height:650});await page.goto(base+'?topic=living');await page.evaluate(()=>document.body.style.zoom='125%');await overflow(page,'French zoom');await page.evaluate(()=>document.body.style.zoom='');await page.screenshot({path:path.join(out,'home-desktop.png'),fullPage:true});
 await page.locator('#teacher-review').click();await page.locator('#review-search').fill('photosynthesis-01');await page.locator('#review-apply').click();await page.locator('#review-key').check();await language(page,'French teaching notes');
 await page.locator('#read-question').click();const speech=await page.evaluate(()=>window.__utterance);assert.equal(speech.lang,'fr-CA');assert.equal(speech.voice,'fr-CA');assert(!/Choose|answer|Read the/.test(speech.text),speech.text);
 await page.locator('#select-filtered').click();await page.locator('#share-mode').selectOption('test');await page.locator('#copy-set').click();const link=await page.evaluate(()=>navigator.clipboard.readText());assert(link.includes('/science-practice-lab-fr/'));assert(link.includes('mode=test'));assert(link.includes('photosynthesis-01'));
 await page.evaluate(()=>{window.print=()=>{window.__printed=document.querySelector('#print-packet').textContent;};});await page.locator('#print-set').click();await page.waitForFunction(()=>window.__printed);const packet=await page.evaluate(()=>window.__printed);assert.match(packet,/Corrigé pour le personnel enseignant/);assert(!/Choose|Teacher answer key|Name:|Cards:|Answer:/.test(packet));await language(page,'French print');
 await page.locator('#review-close').click();await page.locator('#help-open').click();await language(page,'French help');await page.locator('#help-close').click();
 const isolated=await browser.newContext(),p=await isolated.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8765/science-practice-lab/?topic=matter&set=particles-01&mode=learn');await p.locator('#start-assignment').click();await p.locator('[data-choice="1"]').click();const englishDraft=await p.evaluate(()=>ScienceLab.getState().run);await p.locator('#language-switch').click();assert.match(p.url(),/science-practice-lab-fr\/\?topic=matter&set=particles-01&mode=learn/);assert.equal(await p.locator('#resume').count(),0);await p.locator('#start-assignment').click();await p.locator('[data-choice="0"]').click();const frenchDraft=await p.evaluate(()=>ScienceLab.getState().run);await p.locator('#language-switch').click();await p.locator('#resume').click();assert.deepEqual(await p.evaluate(()=>ScienceLab.getState().run),englishDraft);await p.locator('#language-switch').click();await p.locator('#resume').click();assert.deepEqual(await p.evaluate(()=>ScienceLab.getState().run),frenchDraft);
 assert.deepEqual([...leaks],[],'Untranslated French UI: '+[...leaks].join('\n'));assert.deepEqual(errors,[]);assert.equal(checked,306);fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({passed:true,questions:checked,viewports:sizes,frenchStatements:169,errors,leaks:[...leaks]},null,2));await browser.close();console.log('PASS French: 306 questions, 169 curriculum statements, six responsive sizes, print, links, speech and separate bilingual progress');
})().catch(e=>{console.error(e);process.exit(1);});
