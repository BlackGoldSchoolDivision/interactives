const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{},structuredClone};vm.createContext(context);
for(const file of ['trading-model.js','journey-model.js'])vm.runInContext(fs.readFileSync(__dirname+'/../'+file,'utf8'),context);
const J=context.window.RIVER_JOURNEY,M=context.window.RIVER_TRADE;
const counts=()=>({food:3,repair:1,cloth:1,kettle:1,tools:1,beads:1});
const cargo=()=>({counts:counts(),secured:true,ready:true});
const landed=()=>({journeyId:'new-river',status:'landed',manifest:{counts:counts()}});
test('resume follows the saved journey stage, including a secured canoe not launched yet',()=>{
  const s={cargo:cargo()};assert.equal(J.progress(s).stage,'river');
  s.travel={...landed(),status:'ready'};assert.equal(J.progress(s).stage,'river');
  s.travel.status='stranded';assert.equal(J.progress(s).stage,'river');
  s.travel.status='landed';assert.equal(J.progress(s).stage,'portage');
  s.portage={journeyId:'new-river',phase:'complete',allAcross:true};assert.equal(J.progress(s).stage,'inland');
  s.onward={journeyId:'new-river',available:true,phase:'choice'};assert.equal(J.progress(s).stage,'inland');
  s.onward.phase='arrived';s.onward.visit=M.fresh('rainy',{counts:counts(),journeyId:'new-river'});s.onward.visit.foodReserve=2;
  assert.equal(J.progress(s).stage,'trading');
  s.onward.visit.own.pelt=4;assert.equal(J.progress(s).stage,'complete');assert.equal(J.progress(s).done,5);
});
test('stale cargo and old journey identities never skip to a later stage',()=>{
  const s={cargo:cargo(),travel:landed(),portage:{journeyId:'old-river',phase:'complete',allAcross:true},onward:{journeyId:'old-river',phase:'arrived',available:true}};
  assert.equal(J.progress(s).stage,'portage');
  s.portage.journeyId='new-river';assert.equal(J.progress(s).stage,'inland');
  s.cargo.counts.beads=2;assert.equal(J.progress(s).stage,'river');
  s.cargo.secured=false;assert.equal(J.progress(s).stage,'packing');
});
test('incomplete carrying and unavailable inland saves keep the correct checkpoint',()=>{
  const s={cargo:cargo(),travel:landed(),portage:{journeyId:'new-river',phase:'complete',allAcross:false}};
  assert.equal(J.progress(s).stage,'portage');
  s.portage.allAcross=true;s.onward={journeyId:'new-river',available:false,phase:'arrived'};
  assert.equal(J.progress(s).stage,'inland');
});
test('an empty fresh journey shows no completed stages or restart prompt',()=>{
  const s={cargo:{counts:{food:0,repair:0,cloth:0,kettle:0,tools:0,beads:0},secured:false,ready:false},travel:null,portage:null,onward:null};
  const p=J.progress(s);assert.equal(p.stage,'packing');assert.equal(p.started,false);assert.equal(p.done,0);
  s.cargo.counts.food=1;assert.equal(J.progress(s).started,true);
});
