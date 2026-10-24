const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const M=require('../model.js');
const origin=process.env.ORBIT_TEST_ORIGIN||'http://127.0.0.1:8765';
const dir=path.join(__dirname,'..','validation');fs.mkdirSync(dir,{recursive:true});
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/word-orbit/',{waitUntil:'networkidle'});
  assert.equal(await page.locator('#word').innerText(),'play');
  await page.locator('#sound').click();
  const ready=()=>page.waitForFunction(()=>document.querySelector('#stage').dataset.ready==='true');
  const current=()=>page.locator('#word').innerText();
  async function add(text,side='suffix',keyboard=false){await ready();const b=page.locator('[data-part="'+side+':'+text+'"]');await b.waitFor({state:'visible',timeout:30000});if(keyboard)await b.press('Enter');else await b.click();}
  await page.screenshot({path:path.join(dir,'desktop.png'),fullPage:true});
  // Real pointer movement, not a synthetic drop handler: the actual drag target
  // must accept the prefix once and score it exactly once.
  const p=await page.locator('[data-part="prefix:re"]').boundingBox(),c=await page.locator('#core').boundingBox();
  await page.mouse.move(p.x+p.width/2,p.y+p.height/2);await page.mouse.down();await page.mouse.move(c.x+c.width/2,c.y+c.height/2,{steps:16});await page.mouse.up();
  assert.equal(await current(),'replay');assert.equal(await page.locator('#score').innerText(),'10');
  await ready();await page.screenshot({path:path.join(dir,'replay-chain.png'),fullPage:true});
  const away=await page.locator('[data-part="suffix:ing"]').boundingBox(),stage=await page.locator('#stage').boundingBox();
  await page.mouse.move(away.x+away.width/2,away.y+away.height/2);await page.mouse.down();await page.mouse.move(stage.x+8,stage.y+stage.height/2,{steps:12});await page.mouse.up();
  assert.equal(await current(),'replay');assert.equal(await page.locator('#score').innerText(),'10','Dropping into empty space must be harmless');
  await add('ing');assert.equal(await current(),'replaying');assert.equal(await page.locator('#score').innerText(),'20');
  // Pause during the completed branch. Neither the return nor incoming parts
  // should advance while the child has paused the game.
  await page.locator('#pause').click();await page.waitForTimeout(1800);assert.equal(await current(),'replaying');
  await page.locator('#resume').click();await page.waitForFunction(()=>document.querySelector('#word').textContent==='play');
  assert.deepEqual(await page.locator('#collection .word-chip').allTextContents(),['replay','replaying']);
  await add('mis','prefix',true);await add('ed','suffix',true);assert.equal(await current(),'misplayed');
  await page.waitForFunction(()=>document.querySelector('#word').textContent==='play');assert.equal(await page.locator('#score').innerText(),'40');
  await add('re','prefix');assert.equal(await page.locator('#score').innerText(),'40','Repeats must not farm points');
  await add('tion');assert.equal(await current(),'replay');assert.equal(await page.locator('#score').innerText(),'37');
  await ready();
  // A live resize must preserve this intermediate word and its existing score.
  const before=await page.locator('#collection .word-chip').allTextContents();
  for(const [width,height] of [[1024,540],[1366,650],[768,900],[390,667],[320,568],[640,360],[819,432]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(150);
    const layout=await page.evaluate(()=>{
      const visible=[...document.querySelectorAll('button,a.home')].filter(b=>b.getClientRects().length);
      const r=document.querySelector('#core').getBoundingClientRect();
      return {overflow:document.documentElement.scrollWidth>innerWidth+1,small:visible.filter(b=>b.getBoundingClientRect().height<43.5).map(b=>b.id||b.className),word:document.querySelector('#word').textContent,score:document.querySelector('#score').textContent,coreWidth:r.width,clippedWord:document.querySelector('#word').scrollWidth>r.width*.88};
    });
    assert(!layout.overflow,'Horizontal overflow at '+width+'×'+height+': '+JSON.stringify(layout));
    assert.deepEqual(layout.small,[],'Small touch control at '+width+'×'+height);
    assert.equal(layout.word,'replay');assert.equal(layout.score,'37');assert(!layout.clippedWord);
    assert.deepEqual(await page.locator('#collection .word-chip').allTextContents(),before);
    await page.screenshot({path:path.join(dir,'screen-'+width+'x'+height+'.png'),fullPage:true});
  }
  // Incoming waves must offer genuinely different pieces without changing the
  // current construction. The middle word is not reset by animation updates.
  await page.setViewportSize({width:1366,height:650});await page.locator('#backBase').click();
  const first=await page.locator('.bubble').first().getAttribute('data-part');await page.waitForTimeout(7900);
  const later=await page.locator('.bubble').first().getAttribute('data-part');assert.notEqual(first,later);assert.equal(await current(),'play');
  // A second family checks final-e spelling, meanings and preservation when
  // moving between bases. All interactions use the visible controls.
  await page.locator('#newBase').click();await page.locator('.family-choice').filter({hasText:/^care\b/}).click();
  await add('ing');assert.equal(await current(),'caring');assert((await page.locator('#meaning').innerText()).includes('Drop the final e'));
  await page.locator('#newBase').click();await page.locator('.family-choice').filter({hasText:/^kind\b/}).click();
  const d=M.decks.find(x=>x.base==='kind');
  for(const target of d.words){
    const from=d.nodes.find(n=>d.edges.get(n.word).some(e=>e.to===target.word));
    if(from.word===d.base){if(await current()!==d.base)await page.locator('#backBase').click();}
    else await page.locator('#collection .word-chip[data-word="'+from.word+'"]').click();
    const e=d.edges.get(from.word).find(e=>e.to===target.word);await add(e.text,e.side);
  }
  await page.locator('#familyDialog').waitFor({state:'visible'});assert.equal(await page.locator('#familyTitle').innerText(),'Word family complete!');
  for(const [width,height] of [[1366,650],[320,568]]){await page.setViewportSize({width,height});await page.screenshot({path:path.join(dir,'complete-'+width+'.png'),fullPage:true});const r=await page.locator('#familyDialog').boundingBox();assert(r.width<=width&&r.height<=height,'Completion dialog must fit');}
  await page.locator('.family-choice').filter({hasText:/^play\b/}).click();assert.equal(await page.locator('#count').innerText(),'4 / 16');
  // Download a complete copy, cut off every network request, and actually play.
  const promise=page.waitForEvent('download');await page.locator('#makeOwn').click();const download=await promise;const file=path.join(dir,'offline-test.html');await download.saveAs(file);
  const html=fs.readFileSync(file,'utf8');assert(html.includes('data:image/webp;base64,'));assert(!/<script[^>]+src=/.test(html));assert(!/<link[^>]+rel="stylesheet"/.test(html));
  const offline=await browser.newPage({viewport:{width:390,height:667}});const offlineErrors=[];offline.on('pageerror',e=>offlineErrors.push(e.message));await offline.route('http**/*',r=>r.abort());await offline.goto('file://'+file);await offline.locator('[data-part="prefix:re"]').click();assert.equal(await offline.locator('#word').innerText(),'replay');assert.equal(await offline.locator('#score').innerText(),'10');assert.deepEqual(offlineErrors,[]);
  // Touch input must trigger one match, and dragging to empty space is harmless.
  const touch=await browser.newContext({viewport:{width:390,height:667},hasTouch:true});const phone=await touch.newPage();await phone.goto(origin+'/word-orbit/');await phone.locator('[data-part="prefix:re"]').tap();assert.equal(await phone.locator('#word').innerText(),'replay');assert.equal(await phone.locator('#score').innerText(),'10');
  assert.deepEqual(errors,[],'Runtime errors');fs.unlinkSync(file);await browser.close();
  console.log('Passed actual dragging, touch and keyboard input, chained words, paused returns, score integrity, incoming waves, seven responsive sizes, final-e spelling, completed families and offline play.');
})().catch(e=>{console.error(e);process.exit(1);});
