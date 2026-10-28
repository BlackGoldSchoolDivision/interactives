const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base='http://127.0.0.1:8765/science-practice-lab/';
(async()=>{
 const browser=await chromium.launch({headless:true}),context=await browser.newContext({viewport:{width:1366,height:650},permissions:['clipboard-read','clipboard-write']}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'?topic=matter&set=particles-03&mode=learn');await page.locator('#start-assignment').click();
 await page.locator('[data-choice="0"]').click();assert(await page.locator('#check-answer').isDisabled());
 await page.locator('[data-choice="2"]').click();await page.locator('[data-choice="1"]').click();assert(await page.locator('#check-answer').isDisabled());assert.match(await page.locator('#response-progress').innerText(),/1 fewer/);
 await page.locator('[data-choice="0"]').click();await page.locator('#check-answer').click();
 const explanation=await page.evaluate(()=>ScienceLab.data.questions.find(q=>q.id==='particles-03').explanation);
 assert(!(await page.locator('#feedback-area').innerText()).includes(explanation),'A wrong answer revealed the explanation');
 await page.locator('#hint-button').click();assert.match(await page.locator('#feedback-area').innerText(),/Hint/i);
 const saved=await page.evaluate(()=>ScienceLab.getState());
 await page.locator('#teacher-review').click();await page.locator('#review-search').fill('particles-13');await page.locator('#review-apply').click();
 assert.equal(await page.locator('#feedback-area').innerText(),'');await page.locator('#select-filtered').click();await page.locator('#share-mode').selectOption('test');await page.locator('#copy-set').click();
 const link=await page.evaluate(()=>navigator.clipboard.readText());assert.match(link,/set=particles-13/);assert.match(link,/mode=test/);
 await page.locator('#review-key').check();assert.match(await page.locator('.teacher-solution').innerText(),/Melting/);
 await page.locator('#review-close').click();await page.locator('#resume').click();const restored=await page.evaluate(()=>ScienceLab.getState());assert.deepEqual(restored.run,saved.run);assert.deepEqual(restored.progress,saved.progress);
 await page.goto(link);await page.locator('#start-assignment').click();await page.locator('#leave-confirm').click();
 for(const [card,zone]of Object.entries({m:'A',v:'B',c:'C',f:'D'})){await page.locator('[data-piece="'+card+'"]').click();await page.locator('[data-zone="'+zone+'"] .zone-drop-action').click();}
 assert.equal(await page.locator('#feedback-area').innerText(),'');assert.equal(await page.locator('#hint-button').count(),0);await page.locator('#check-answer').click();assert.equal(await page.locator('.result-review').count(),1);
 // Untouched ordering cards are not scored as an accidental random answer.
 await page.goto(base+'?topic=matter&set=particles-09&mode=test');await page.locator('#start-assignment').click();await page.locator('#skip-question').click();
 assert.match(await page.locator('#round-dialog-content').innerText(),/0 of 1 questions have an answer/);await page.locator('#finish-now').click();assert.match(await page.locator('.result-review summary').innerText(),/Not answered/);
 await page.locator('#teacher-review').click();await page.locator('#review-search').fill('particles-03');await page.locator('#review-apply').click();
 await page.evaluate(()=>{window.print=()=>{};});await page.locator('#review-key').check();await page.locator('#print-set').click();
 await page.locator('#print-packet').waitFor({state:'attached'});assert.match(await page.locator('#print-packet').textContent(),/Teacher answer key/);assert.match(await page.locator('#print-packet').textContent(),/particles-03/);
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS selection limits, supportive retries, teacher links and notes, saved drafts, deferred test feedback, skipped ordering and print packets');
})().catch(e=>{console.error(e);process.exit(1);});
