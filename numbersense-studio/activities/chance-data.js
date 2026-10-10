import {rational,parseNumber,equal} from '../math.js';
const pieces=(label,count)=>Array.from({length:count},(_,i)=>({label:`${label} ${i+1}`,group:label}));
const deck=['clubs','diamonds','hearts','spades'].flatMap(suit=>['A','2','3','4','5','6','7','8','9','10','J','Q','K'].map(rank=>({label:`${rank} of ${suit}`,group:suit,rank,short:`${rank} ${suit[0].toUpperCase()}`})));
export const probabilityBank=[
 {question:'A bag has 3 red and 5 blue marbles. Each marble is equally likely. What is the probability of red?',outcomes:[...pieces('red',3),...pieces('blue',5)],target:o=>o.group==='red'},
 {question:'Roll a fair standard six-sided die. What is the probability of an even number?',outcomes:Array.from({length:6},(_,i)=>({label:String(i+1),value:i+1})),target:o=>o.value%2===0},
 {question:'Draw one card uniformly from a standard 52-card deck. What is the probability of an ace?',outcomes:deck,target:o=>o.rank==='A',cards:true},
 {question:'A bag has 4 red, 2 green and 4 yellow candies. Each candy is equally likely. What is the probability of green?',outcomes:[...pieces('red',4),...pieces('green',2),...pieces('yellow',4)],target:o=>o.group==='green'},
 {question:'Draw one card uniformly from a standard 52-card deck. What is the probability of a heart?',outcomes:deck,target:o=>o.group==='hearts',cards:true},
 {question:'A fair spinner has 8 equal sections: 3 blue, 2 red, 3 green. What is the probability of red?',outcomes:[...pieces('blue',3),...pieces('red',2),...pieces('green',3)],target:o=>o.group==='red',spinner:true},
 {question:'Toss a fair coin. What is the probability of heads?',outcomes:[{label:'Heads'},{label:'Tails'}],target:o=>o.label==='Heads'},
 {question:'Roll a fair standard die. What is the probability of a number greater than 4?',outcomes:Array.from({length:6},(_,i)=>({label:String(i+1),value:i+1})),target:o=>o.value>4}
].map(t=>({...t,answer:rational(t.outcomes.filter(t.target).length,t.outcomes.length)}));
export const frequencyBank=[
 {kind:'number',question:'50 coin tosses produced 20 heads. What is the relative frequency of heads?',events:20,trials:50,label:'heads'},
 {kind:'number',question:'You won 7 of 10 games. What is the relative frequency of winning?',events:7,trials:10,label:'wins'},
 {kind:'law',question:'A fair coin has theoretical probability 50% for heads. The first 10 tosses produced 4 heads (40%). What can happen with more trials?'},
 {kind:'number',question:'20 tosses produced 7 heads. What is the relative frequency of heads?',events:7,trials:20,label:'heads'},
 {kind:'number',question:'30 draws produced 12 red results. What is the relative frequency of red?',events:12,trials:30,label:'red results'},
 {kind:'number',question:'You won 9 of 12 games. What is the relative frequency of winning?',events:9,trials:12,label:'wins'},
 {kind:'number',question:'40 rolls produced 8 sixes. What is the relative frequency of six?',events:8,trials:40,label:'sixes'},
 {kind:'number',question:'25 spins produced 15 blue results. What is the relative frequency of blue?',events:15,trials:25,label:'blue results'}
].map(t=>t.kind==='number'?{...t,answer:rational(t.events,t.trials)}:t);
export const lawOptions=[
 'More trials can move the frequency closer or farther; over many trials it tends to stabilize around 50%.',
 'The next batch must move the frequency closer to 50%.',
 'A frequency of 40% after ten trials proves the coin is unfair.'
];
export const parseProportion=value=>{const s=String(value).trim();const n=parseNumber(s.replace(/%$/,''));return n&&s.endsWith('%')?rational(n.n,n.d*100):n;};
export function checkProbability(task,value,state){const a=parseProportion(value);if(!a)return{invalid:true,message:'Write a fraction, decimal or percentage.'};if(!equal(a,task.answer))return{correct:false,message:'Count favourable outcomes over all equally likely outcomes.'};const expected=task.outcomes.map((o,i)=>task.target(o)?i:null).filter(i=>i!==null);return expected.length===state.selected.size&&expected.every(i=>state.selected.has(i))?{correct:true}:{correct:false,message:'Your probability is correct. Mark exactly the favourable outcomes in the model.'};}
export function checkFrequency(task,value){if(task.kind==='law')return value===lawOptions[0]?{correct:true}:{correct:false,message:'More trials do not guarantee that the next batch gets closer. Random variation continues.'};const a=parseProportion(value);return a&&equal(a,task.answer)?{correct:true}:{correct:false,message:'Use the observed number of events divided by the total number of trials.'};}
export function runCoinTrials(state,count,random=Math.random){let heads=state.heads;for(let i=0;i<count;i++)if(random()<.5)heads++;return{heads,trials:state.trials+count};}
