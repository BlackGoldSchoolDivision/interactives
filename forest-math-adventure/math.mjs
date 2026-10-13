export const MODES=['forward','backward','skip','pattern','story'];
export const randint=(a,b,rng=Math.random)=>a+Math.floor(rng()*(b-a+1));
export const shuffled=(arr,rng=Math.random)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=randint(0,i,rng);[a[i],a[j]]=[a[j],a[i]]}return a};
function choices(answer,step,range=40,rng=Math.random){const set=new Set([answer]);const candidates=shuffled([answer-step,answer+step,answer-1,answer+1,answer-2,answer+2],rng);for(const n of candidates)if(n>=0&&n<=range&&set.size<3)set.add(n);while(set.size<3){set.add(randint(0,range,rng))}return shuffled([...set],rng)}
export function makeQuestion(mode,rng=Math.random){
 if(mode==='forward'||mode==='backward'){
  const forward=mode==='forward',start=forward?randint(1,25,rng):randint(9,30,rng),step=forward?1:-1;
  const seq=Array.from({length:5},(_,i)=>start+i*step),answer=start+5*step;
  return {mode,answer,sequence:seq,prompt:forward?'Help Bear count forwards!':'Help Owl count backwards!',hint:forward?'Count up one more from '+seq[4]+'.':'Count back one more from '+seq[4]+'.',choices:choices(answer,1,35,rng),instruction:'Which stepping stone comes next?'};
 }
 if(mode==='skip'){
  const step=[2,5,10][randint(0,2,rng)],start=step===2?randint(0,3,rng)*2:randint(0,2,rng)*step,seq=Array.from({length:5},(_,i)=>start+i*step),answer=start+5*step;
  return {mode,answer,sequence:seq,prompt:'Help Squirrel hop by '+step+'s!',hint:'Keep adding '+step+'. '+seq[4]+' + '+step+' = ?',choices:choices(answer,step,110,rng),instruction:'Which log should Squirrel jump to?'};
 }
 if(mode==='pattern'){
  const step=[1,2,5,10][randint(0,3,rng)],start=randint(0,step===10?2:8,rng)*step,missingIndex=randint(1,4,rng),seq=Array.from({length:6},(_,i)=>start+i*step),answer=seq[missingIndex],display=seq.map((x,i)=>i===missingIndex?null:x);
  return {mode,answer,sequence:display,prompt:'Find the missing forest number!',hint:'This pattern grows by '+step+' each time.',choices:choices(answer,step,100,rng),instruction:'Which number belongs in the empty spot?'};
 }
 if(mode==='story'){
  const add=rng()<.5, a=randint(2,12,rng),b=add?randint(1,Math.min(8,20-a),rng):randint(1,a,rng),answer=add?a+b:a-b;
  return {mode,answer,a,b,add,sequence:null,prompt:add?'Bear has '+a+' acorns and finds '+b+' more. How many now?':'Bear has '+a+' acorns and eats '+b+'. How many remain?',hint:add?'Start at '+a+' and count on '+b+'.':'Start at '+a+' and count back '+b+'.',choices:choices(answer,1,20,rng),instruction:'Use the little acorns to help count.'};
 }
 throw Error('Invalid forest mode: '+mode);
}
