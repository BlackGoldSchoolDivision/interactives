(function(g,f){const m=f();if(typeof module==='object'&&module.exports)module.exports=m;else g.WordWorlds=m;})(globalThis,function(){
'use strict';
const subjects=['wind','fog','rain','sunlight'];
const verbs={whispered:{speed:.22,sway:.018,sound:450},howled:{speed:1.2,sway:.08,sound:2200},danced:{speed:.65,sway:.055,sound:1100},raced:{speed:1.6,sway:.05,sound:1800},crept:{speed:.12,sway:.008,sound:260},swept:{speed:.9,sway:.04,sound:1350},sang:{speed:.5,sway:.03,sound:800},sighed:{speed:.3,sway:.025,sound:600}};
const moods={sleepy:{sky:'#c6c1e5',hill:'#8f8cba',ground:'#d9d3d1',ink:'#77729c',light:.08},deserted:{sky:'#b6bdc7',hill:'#737e97',ground:'#c4c4c2',ink:'#555f7a',light:0},restless:{sky:'#b3a7c5',hill:'#7d7097',ground:'#c5b5be',ink:'#655278',light:.03},cheerful:{sky:'#c3dce3',hill:'#a9b8b8',ground:'#e9d8ba',ink:'#8294a2',light:.17},secret:{sky:'#a8abc8',hill:'#777d9f',ground:'#c5c0d3',ink:'#5d6584',light:.025},icy:{sky:'#d3e1ea',hill:'#aabfd1',ground:'#e3e8ea',ink:'#879eaf',light:.06},golden:{sky:'#eed5b0',hill:'#c5adab',ground:'#ecd5ae',ink:'#a48c9a',light:.2},forgotten:{sky:'#c9c7cb',hill:'#9a93a3',ground:'#d4ccbf',ink:'#80788d',light:0}};
const worlds={town:'town',woodland:'woodland',harbour:'harbour'};
const challenges=[
 {id:'calm',title:'A change in the air',task:'Make the same town feel peaceful, then unsettling.',world:'town',subject:'wind',prompt:'Which words did most of the work? Could a reader imagine it differently?'},
 {id:'welcome',title:'A place to arrive',task:'Create a welcoming harbour and a harbour you would avoid.',world:'harbour',subject:'fog',prompt:'What makes a place feel welcoming? Use a clue from each sentence.'},
 {id:'forest',title:'Two paths',task:'Make the woodland feel magical in one version and ordinary in the other.',world:'woodland',subject:'sunlight',prompt:'How did your word choices create the difference?'},
 {id:'pace',title:'Slow down. Speed up.',task:'Suggest a slow morning, then an urgent journey. Keep the subject the same.',world:'town',subject:'rain',prompt:'Explain how your verb changes the pace.'},
 {id:'one-word',title:'One word, big shift',task:'Change only one word between versions. Make the mood change as much as you can.',world:'woodland',subject:'wind',prompt:'Why is this one word powerful? There is more than one possible answer.'},
 {id:'surprise',title:'A surprising pairing',task:'Pair words that do not usually go together. Make the combination worth explaining.',world:'town',subject:'sunlight',prompt:'What might your unusual combination suggest to a reader?'},
 {id:'perspective',title:'Same place, two narrators',task:'Describe the harbour as an excited visitor, then as someone who wants to leave.',world:'harbour',subject:'wind',prompt:'Who could be speaking in each version? What in the language supports that?'},
 {id:'personify',title:'Give weather a voice',task:'Make the weather seem friendly in one version and impatient in the other.',world:'woodland',subject:'rain',prompt:'Which human action did you give the weather? What does it suggest?'},
 {id:'contrast',title:'A useful contradiction',task:'Try a lively verb with a quiet atmosphere, then reverse the balance.',world:'town',subject:'wind',prompt:'Does the contrast make the scene more interesting? Explain your choice.'},
 {id:'setting',title:'Setting matters',task:'Use the same subject and verb in two different settings. Explore what changes.',world:'harbour',subject:'fog',prompt:'What does the setting add to the meaning, even when the verb stays the same?'},
 {id:'reader',title:'Change your reader’s mind',task:'Make a scene you find beautiful. Use different words to make it seem worrying.',world:'woodland',subject:'fog',prompt:'Which details could support both interpretations?'},
 {id:'director',title:'Director’s choice',task:'Choose your own contrast. Build two worlds and give your experiment a reason.',world:'town',subject:'sunlight',prompt:'Describe your intention and explain how the language helped.'}
];
function version(c=challenges[0]){return{subject:c.subject,verb:'whispered',mood:'sleepy',world:c.world};}
function pair(c=challenges[0]){return{a:version(c),b:version(c),reflection:'',kept:false};}
function sentence(v){return 'The '+v.subject+' '+v.verb+' through the '+v.mood+' '+v.world+'.';}
function valid(v){return v&&subjects.includes(v.subject)&&Object.hasOwn(verbs,v.verb)&&Object.hasOwn(moods,v.mood)&&Object.hasOwn(worlds,v.world);}
function different(p){return JSON.stringify(p.a)!==JSON.stringify(p.b);}
return{subjects,verbs,moods,worlds,challenges,version,pair,sentence,valid,different};
});
