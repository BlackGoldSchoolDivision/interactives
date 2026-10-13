export const MODES=['sharing','grouping','counting','equations'];
export const rand=(a,b,rng=Math.random)=>a+Math.floor(rng()*(b-a+1));
export const shuffled=(arr,rng=Math.random)=>{const out=[...arr];for(let i=out.length-1;i>0;i--){const j=rand(0,i,rng);[out[i],out[j]]=[out[j],out[i]]}return out};
export function createMission(mode,rng=Math.random){
 if(mode==='sharing'){
  const groups=rand(2,4,rng),each=rand(2,5,rng),total=groups*each;
  return {mode,groups,total,each,answer:each,prompt:'Share '+total+' crystals equally between '+groups+' rockets.',instruction:'Tap a crystal, then tap a rocket. Each rocket must get the same number.',hint:'Try putting one crystal in each rocket before giving any rocket a second.',title:'CRYSTAL SHARING'};
 }
 if(mode==='grouping'){
  const each=rand(2,4,rng),groups=rand(2,4,rng),total=each*groups;
  return {mode,groups:Math.min(5,groups+1),groupsRequired:groups,total,each,answer:groups,prompt:'Put '+total+' astronauts into teams of '+each+'.',instruction:'Tap an astronaut, then tap a rocket. How many full teams can you make?',hint:'Every used rocket must have exactly '+each+' astronauts.',title:'ASTRONAUT GROUPS'};
 }
 if(mode==='counting'){
  const total=rand(3,16,rng);return{mode,total,answer:total,prompt:'How many moon rocks are floating here?',instruction:'Count each moon rock, then choose the number.',hint:'Point to each rock once as you count.',title:'MOON ROCK COUNT'};
 }
 if(mode==='equations'){
  const a=rand(2,9,rng),b=rand(1,Math.min(9,20-a),rng);return{mode,a,b,total:a+b,answer:a+b,prompt:'Our crew found '+a+' crystals and then '+b+' more. How many altogether?',instruction:'Add the two groups of crystals to build the total.',hint:'Start at '+a+' and count on '+b+' more.',title:'GALAXY EQUATIONS'};
 }
 throw Error('Invalid space mode: '+mode);
}
export function checkGroups(mission,counts){
 if(!['sharing','grouping'].includes(mission.mode))return false;
 if(counts.length!==mission.groups||counts.some(n=>!Number.isInteger(n)||n<0))return false;
 if(counts.reduce((a,b)=>a+b,0)!==mission.total)return false;
 if(mission.mode==='sharing')return counts.every(n=>n===mission.each);
 return counts.filter(n=>n>0).length===mission.groupsRequired&&counts.filter(n=>n>0).every(n=>n===mission.each);
}
export function answerChoices(answer,max=22,rng=Math.random){
 const items=new Set([answer]);const pool=shuffled([answer-2,answer+1,answer-1,answer+2,answer-3,answer+3],rng);
 for(const n of pool)if(n>=0&&n<=max&&items.size<3)items.add(n);
 for(let n=0;items.size<3;n++)items.add(n);
 return shuffled([...items],rng);
}
