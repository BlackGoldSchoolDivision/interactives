// Pure question generation. Separate from the visual layer so classroom maths can be tested.
export const CREATURES = [
  {id:'fish',singular:'fish',plural:'fish'},
  {id:'turtle',singular:'turtle',plural:'turtles'},
  {id:'crab',singular:'crab',plural:'crabs'},
  {id:'octopus',singular:'octopus',plural:'octopuses'},
  {id:'star',singular:'starfish',plural:'starfish'},
  {id:'shell',singular:'shell',plural:'shells'}
];
export const roundCount = 5;
export const randomInt=(min,max,rng=Math.random)=>min+Math.floor(rng()*(max-min+1));
export const shuffle=(array,rng=Math.random)=>{
  const out=[...array];
  for(let i=out.length-1;i>0;i--){
    const j=randomInt(0,i,rng);
    [out[i],out[j]]=[out[j],out[i]];
  }
  return out;
};
const creature=rng=>CREATURES[randomInt(0,CREATURES.length-1,rng)];
export function numberChoices(answer,limit,rng=Math.random){
  // Spread five plausible numeric answers near the correct value without duplicates.
  const pool=Array.from({length:limit+1},(_,i)=>i)
    .filter(n=>n!==answer)
    .sort((a,b)=>Math.abs(a-answer)-Math.abs(b-answer)||a-b);
  const nearest=pool.slice(0,Math.min(8,pool.length));
  const selected=new Set([answer]);
  for(const n of shuffle(nearest,rng))if(selected.size<Math.min(6,limit+1))selected.add(n);
  for(const n of pool)if(selected.size<Math.min(6,limit+1))selected.add(n);
  return shuffle([...selected],rng);
}
export function createQuestion(mode='count',limit=10,rng=Math.random){
  limit=limit===20?20:10;
  const animal=creature(rng);
  if(mode==='count'){
    const answer=randomInt(0,limit,rng);
    const prompt='How many '+animal.plural+' do you see?';
    return {
      type:'count',animal:animal.id,answer,count:answer,prompt,
      speech:prompt+' Tap each '+animal.singular+' to count, then choose a number.',
      hint:'Tap each '+animal.singular+' once. Watch the little counting badges!',
      choices:numberChoices(answer,limit,rng),tag:'LOOK & COUNT'
    };
  }
  if(mode==='compare'){
    const max=Math.min(limit,10), a=randomInt(1,max,rng);
    let b=a;while(b===a)b=randomInt(1,max,rng);
    const more=rng()>=.5;
    const answer=(more?a>b:a<b)?'A':'B';
    const prompt='Which group has '+(more?'more':'fewer')+' '+animal.plural+'?';
    return {
      type:'compare',animal:animal.id,a,b,answer,prompt,tag:'COMPARE THE GROUPS',
      speech:prompt+' Look at group A and group B. Choose the correct group.',
      hint:'Count both groups. '+(more?'The greater number has more.':'The smaller number has fewer.'),
      choices:[{value:'A',label:'Group A'},{value:'B',label:'Group B'}]
    };
  }
  if(mode==='story'){
    const add=rng()>=.5;
    let a,b,answer;
    if(add){
      a=randomInt(1,Math.min(10,limit-1),rng);
      b=randomInt(1,Math.min(10,limit-a),rng);
      answer=a+b;
    }else{
      a=randomInt(2,Math.min(12,limit),rng);
      b=randomInt(1,a,rng);
      answer=a-b;
    }
    const prompt=add
      ? a+' '+animal.plural+' are swimming. '+b+' more join them. How many now?'
      : a+' '+animal.plural+' are swimming. '+b+' swim away. How many are left?';
    return {
      type:'story',animal:animal.id,a,b,answer,op:add?'+':'−',prompt,
      speech:prompt,
      hint:add?'Start with '+a+'. Count on '+b+' more.':
        'Start with '+a+'. Count back '+b+' as they swim away.',
      choices:numberChoices(answer,limit,rng),
      tag:add?'ADD AT THE REEF':'SUBTRACT AT THE REEF'
    };
  }
  throw Error('Unknown activity type: '+mode);
}
export const isCorrect=(question,answer)=>question.answer===answer;
export function positions(count){
  if(count<=0)return [];
  const cols=count<=6?3:5;
  const rows=Math.ceil(count/cols);
  const xGap=cols===3?31:18;
  const xStart=cols===3?19:13;
  const yStart=rows===1?47:rows===2?31:rows===3?20:13;
  const yGap=rows===1?0:rows===2?35:rows===3?29:24;
  return Array.from({length:count},(_,i)=>{
    const row=Math.floor(i/cols),col=i%cols;
    const rowLength=Math.min(cols,count-row*cols);
    const nudge=(cols-rowLength)*xGap/2;
    const x=xStart+col*xGap+nudge;
    const y=yStart+row*yGap;
    return {x,y,tilt:[-7,4,8,-3,5,0][i%6]};
  });
}
