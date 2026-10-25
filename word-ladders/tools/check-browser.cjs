const {chromium}=require('playwright-core'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..','validation');fs.mkdirSync(root,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>{window.__printCalls=0;window.print=()=>window.__printCalls++;});await page.goto('http://127.0.0.1:8765/word-ladders/',{waitUntil:'networkidle'});
 async function enter(word){await page.locator('#guess').fill(word);await page.locator('#guess').press('Enter');}
 await enter('TAIL');assert.equal(await page.locator('#ladder').getAttribute('data-current'),'HEAD');
 await enter('HEAL');await enter('TEAL');assert.equal(await page.locator('#ladder').getAttribute('data-count'),'3');
 await page.locator('#guess').fill('TELL');
 for(const [width,height]of [[1024,540],[1366,650],[768,900],[390,667],[320,568],[640,360],[819,432]]){
  await page.setViewportSize({width,height});const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,small:[...document.querySelectorAll('button,a.icon,select')].filter(b=>b.getClientRects().length).filter(b=>b.getBoundingClientRect().height<43.5).map(b=>b.id||b.className),word:document.querySelector('#ladder').dataset.current,guess:document.querySelector('#guess').value}));assert(!layout.overflow,JSON.stringify({width,height,layout}));assert.deepEqual(layout.small,[]);assert.equal(layout.word,'TEAL');assert.equal(layout.guess,'TELL');await page.screenshot({path:path.join(root,'screen-'+width+'x'+height+'.png'),fullPage:true});
 }
 await page.setViewportSize({width:1366,height:650});await page.locator('#undo').click();assert.equal(await page.locator('#ladder').getAttribute('data-current'),'HEAL');await enter('TEAL');for(const w of ['TELL','TALL','TAIL'])await enter(w);assert.equal(await page.locator('#nextComplete').isVisible(),true);assert.equal(await page.locator('#ladder').getAttribute('data-count'),'6');await page.screenshot({path:path.join(root,'complete.png'),fullPage:true});
 // Change difficulty, complete a Starter ladder, then restore Explorer work.
 await page.locator('[data-level=starter]').click();for(const w of ['CAT','CAN','FAN','FIN','FIT'])await enter(w);assert.equal(await page.locator('#ladder').getAttribute('data-current'),'FIT');await page.locator('[data-level=explorer]').click();assert.equal(await page.locator('#ladder').getAttribute('data-current'),'TAIL');
 await page.locator('[data-mode=free]').click();for(const w of ['HEAR','HEIR','HAIR','HAIL','TAIL'])await enter(w);assert.equal(await page.locator('#nextComplete').isVisible(),true);await page.locator('[data-mode=guided]').click();
 // Actual browser downloads must be clean worksheets, not screenshots of the
 // completed student's answers. The default must have no answer key.
 await page.locator('#teacherPdf').click();assert.equal(await page.locator('#pdfLevel').inputValue(),'explorer');assert.equal(await page.locator('#includeKey').isChecked(),false);
 async function download(name){const wait=page.waitForEvent('download');await page.locator('#savePdf').click();const file=await wait;await file.saveAs(path.join(root,name));}
 await download('student.pdf');await page.locator('#includeKey').check();await download('worksheet-with-key.pdf');
 await page.locator('#pdfLevel').selectOption('expert');await page.locator('#pdfScope').selectOption('pack');assert((await page.locator('#printCount').innerText()).includes('20 student pages + 20 separate'));await download('expert-pack.pdf');
 await page.locator('#pdfLevel').selectOption('starter');await page.locator('#pdfScope').selectOption('one');await page.locator('#includeKey').uncheck();await page.locator('#paper').selectOption('a4');await download('starter-a4.pdf');
 await page.locator('#printWorksheet').click();assert.equal(await page.evaluate(()=>window.__printCalls),1);assert.equal(await page.locator('#printOutput .print-sheet').count(),1);assert.equal(await page.locator('#printOutput .paper-box').allTextContents().then(a=>a.filter(Boolean).length),3);
 await page.setViewportSize({width:390,height:667});await page.screenshot({path:path.join(root,'teacher-phone.png'),fullPage:true});assert((await page.locator('#pdfDialog').boundingBox()).height<=667);
 await page.locator('#pdfDialog [data-close]').click();await page.setViewportSize({width:1440,height:900});await page.locator('#restartLadder').click();await enter('HEAL');await enter('TEAL');await page.locator('#guess').fill('TELL');await page.screenshot({path:path.join(root,'desktop.png'),fullPage:true});
 // A teacher's offline copy must retain both play and real PDF generation.
 const dw=page.waitForEvent('download');await page.locator('#makeOwn').click();const copy=await dw;const file=path.join(root,'offline.html');await copy.saveAs(file);const html=fs.readFileSync(file,'utf8');assert(!/<script[^>]+src=/.test(html));assert(html.includes('data:image/webp;base64,'));const offline=await browser.newPage({viewport:{width:390,height:667}});await offline.route('http**/*',r=>r.abort());await offline.goto('file://'+file);await offline.locator('#guess').fill('HEAL');await offline.locator('#addStep').click();assert.equal(await offline.locator('#ladder').getAttribute('data-current'),'HEAL');await offline.locator('#teacherPdf').click();const od=offline.waitForEvent('download');await offline.locator('#savePdf').click();await(await od).saveAs(path.join(root,'offline-student.pdf'));fs.unlinkSync(file);
 // Every expanded ladder must be reachable, and the PDF chooser must expose
 // the same puzzles as the game at each level.
 for(const level of ['starter','explorer','expert','extreme']){
  const count=level==='extreme'?5:20;
  await page.locator('[data-level='+level+']').click();const missions=new Set();
  for(let i=0;i<count;i++){missions.add(await page.locator('#mission').innerText());await page.locator('#newLadder').click();}
  assert.equal(missions.size,count,level+' must offer '+count+' distinct ladders');
  await page.locator('#teacherPdf').click();assert.equal(await page.locator('#pdfPuzzle option').count(),count);await page.locator('#pdfDialog [data-close]').click();
 }
 // Complete all five Extreme trails, including accented input, then resize
 // the six-letter trail with a live answer to check the four-level header.
 for(const p of require('../data.js').filter(p=>p.level==='extreme')){
  assert.equal(await page.locator('#mission').innerText(),p.words[0]+' → '+p.words[5]);await page.locator('#restartLadder').click();
  for(const word of p.words.slice(1))await enter(word==='BLASE'?'BLASÉ':word);
  assert.equal(await page.locator('#nextComplete').isVisible(),true);await page.locator('#newLadder').click();
 }
 for(let i=0;i<3;i++)await page.locator('#newLadder').click();await page.locator('#restartLadder').click();await enter('SENARY');await page.locator('#guess').fill('SENTRY');
 for(const [width,height]of [[1024,540],[1366,650],[768,900],[390,667],[320,568],[640,360],[819,432]]){
  await page.setViewportSize({width,height});const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,word:document.querySelector('#ladder').dataset.current,guess:document.querySelector('#guess').value,small:[...document.querySelectorAll('button,select,a.icon')].filter(b=>b.getClientRects().length&&b.getBoundingClientRect().height<43.5).map(b=>b.id||b.className)}));assert(!state.overflow,JSON.stringify({width,height,state}));assert.deepEqual(state.small,[]);assert.equal(state.word,'SENARY');assert.equal(state.guess,'SENTRY');await page.screenshot({path:path.join(root,'extreme-'+width+'x'+height+'.png'),fullPage:true});
 }
 await page.setViewportSize({width:1366,height:650});await page.locator('#teacherPdf').click();assert.equal(await page.locator('#pdfLevel').inputValue(),'extreme');await page.locator('#pdfScope').selectOption('pack');await page.locator('#includeKey').check();await page.locator('#paper').selectOption('letter');assert((await page.locator('#printCount').innerText()).includes('5 student pages + 5 separate'));assert.equal(await page.locator('#pdfScope option[value=pack]').innerText(),'All 5 ladders at this level');await download('extreme-pack.pdf');await page.locator('#pdfDialog [data-close]').click();
 await page.locator('[data-level=explorer]').click();await page.locator('[data-level=extreme]').click();assert.equal(await page.locator('#ladder').getAttribute('data-current'),'SENARY');assert.equal(await page.locator('#guess').inputValue(),'SENTRY');
 assert.deepEqual(errors,[]);await browser.close();console.log('Passed gameplay, all 65 selectable ladders, all five Extreme completions, accented input, alternate routes, difficulty, live resizing, seven screen sizes in Explorer and Extreme, completed state, teacher controls, real PDF downloads, browser printing, and offline play/PDF download.');
})().catch(e=>{console.error(e);process.exit(1);});
