/* Shared question design and original visual evidence. No score keys or IDs change. */
(function(root){
'use strict';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const actions={single:'Choose one answer',multi:'Select the requested answers',dropdown:'Complete each statement',sort:'Sort the cards',order:'Put the cards in order',match:'Make the matches',label:'Label the model',hotspot:'Choose the evidence',numeric:'Enter your answer'};
function instruction(q){
 if(q.type==='multi')return 'Choose '+q.answer.length+' answers. You can change your choices before checking.';
 if(q.type==='dropdown')return 'Choose one answer for each of the '+q.data.blanks.length+' statements.';
 if(q.type==='sort')return 'Drag each card into a group, or select a card and then choose its group.';
 if(q.type==='match'||q.type==='label')return 'Drag a card to a destination, or select a card and then choose where it belongs.';
 if(q.type==='order')return 'Move the cards into order. Drag them, or use the up and down buttons.';
 if(q.type==='numeric')return 'Type a number. The unit is provided beside the answer box.';
 if(q.type==='hotspot')return 'Select the sentence that provides the strongest evidence for this question.';
 return 'Choose the best answer. You can change it before checking.';
}
// Stable for a round, independently mixed for each question and control.
function mixed(values,key){let seed=2166136261;for(const c of String(key))seed=Math.imul(seed^c.charCodeAt(0),16777619);const out=values.slice();for(let i=out.length-1;i>0;i--){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;const j=(seed>>>0)%(i+1);[out[i],out[j]]=[out[j],out[i]];}return out;}
function completion(q,r){
 let done=0,total=1,verb='selected';
 if(q.type==='multi'){done=r.length;total=q.answer.length;}
 else if(q.type==='dropdown'){done=r.filter(Boolean).length;total=q.data.blanks.length;verb='completed';}
 else if(['sort','match','label'].includes(q.type)){done=q.data.items.filter(i=>q.data.zones.some(z=>z.id===r[i.id])).length;total=q.data.items.length;verb='placed';}
 else if(q.type==='order')return 'Move the cards, then check your order.';
 else if(q.type==='numeric'){const v=String(r).trim().replace(',','.');if(v&&!/^[-+]?(?:\d+\.?\d*|\.\d+)$/.test(v))return 'Enter a number without the unit.';done=v?1:0;verb='entered';}
 else done=Number.isInteger(r)?1:0;
 return q.type==='multi'&&done>total?'Choose '+(done-total)+' fewer '+(done-total===1?'answer':'answers')+'.':done+' of '+total+' '+verb;
}
function placement(q,response,item,zone){
 const next={...response};
 const onePerZone=q.type!=='sort'&&q.data.items.length===q.data.zones.length&&new Set(Object.values(q.answer)).size===q.data.items.length;
 if(onePerZone){const occupant=q.data.items.find(i=>i.id!==item&&next[i.id]===zone);if(occupant){const previous=next[item];if(previous)next[occupant.id]=previous;else delete next[occupant.id];}}
 next[item]=zone;return next;
}
const options={
 'temperature-01':{0:'The liquid gains mass as it absorbs thermal energy.',1:'The bulb expands enough to push the liquid upward.'},
 'forces-01':{0:'Compression is the external force; the hand supplies an internal force.',1:'The hand causes tension inside the block.',3:'Only friction can change the shape of the block.'},
 'properties-04':{3:'The final length after release, even if the materials recover differently.'},
 'reactions-01':{2:'The hand pushes the floor while the wall stays still.',3:'Friction between the hand and wall acts along the wall.'},
 'choices-01':{3:'Choose the most commonly used resource before comparing local evidence.'},
 'choices-03':{1:'The popularity of the project name instead of its performance.',3:'An assumption that renewable resources require no environmental review.'},
 'climate-01':{1:'Greenhouse gases create most of the energy that warms Earth.',2:'Greenhouse gases warm Earth mainly by stopping air from moving.',3:'Greenhouse gases absorb all incoming sunlight before it reaches the surface.'},
 'climate-02':{1:'The lakeside place must be warmer in every season.',2:'Similar latitude guarantees identical temperatures throughout the year.',3:'The inland place should have smaller seasonal changes because land stores more heat.'},
 'climate-03':{2:'A short cold spell establishes a new long-term global climate.',4:'A change in the units used to report the same temperature measurements.'},
 'evidence-02':{1:'A long-term average of the city’s annual temperature.',2:'A rain gauge read only after the storm has ended.',3:'A photograph of the same city during last winter.'},
 'evidence-03':{2:'A memory of one unusually warm holiday without dates or measurements.'},
 'evidence-04':{3:'A light breeze on a mild day.',4:'A brief, ordinary shower without flooding or strong winds.'},
 'collaboration-01':{3:'Average the two sources immediately, before checking what each one measured.'},
 'collaboration-02':{2:'Local observations are useful only when they already match the instruments.'},
 'collaboration-04':{2:'A travel account from another region with no matching dates or conditions.'},
 'ecosystems-01':{1:'They make food from sunlight for the surrounding trees.',2:'They take nutrients out of circulation so roots cannot use them.',3:'They supply energy to the soil without breaking down organic matter.'},
 'ecosystems-02':{2:'It has more individual plants, all belonging to the same species.'},
 'ecosystems-04':{3:'Carbon stored in plants stays stored after all the vegetation is burned.',4:'Protecting one habitat removes the need to reduce emissions elsewhere.'},
 'photosynthesis-01':{2:'To remove chlorophyll from the covered part of the leaf.'},
 'photosynthesis-02':{1:'By root hairs that absorb minerals from soil.',2:'By sugar stored in the leaf after photosynthesis.',3:'By oxygen entering the leaf through its pores.'},
 'photosynthesis-03':{3:'Sugar taken up from the soil as the main food source.',4:'Oxygen as a raw material for making sugar.'},
 'photosynthesis-04':{3:'It transfers sunlight directly into animals without feeding relationships.',4:'It recycles every nutrient without the work of decomposers.'},
 'relationships-01':{0:'The bees make the sugar that the flower needs for photosynthesis.',2:'The plant benefits, but the bees receive no resource from the flowers.',3:'The bees obtain nectar without affecting how pollen moves.'},
 'relationships-03':{3:'Roots add enough light for every aquatic plant to grow at any depth.',4:'Vegetation removes the need for animals to obtain food elsewhere.'},
 'relationships-04':{3:'People obtain all their food energy directly from sunlight.',4:'Plant fibres are mainly made from minerals that humans produce.'},
 'planetary-01':{3:'Both are visible only because they reflect light from Earth.'},
 'planetary-02':{1:'The colours alone tell us that every distance is accurate.',2:'Showing all eight planets guarantees that the model is to scale.',3:'Spacing the planets evenly preserves their actual orbital distances.'},
 'exploration-01':{1:'A telescope observing Mars from Earth.',2:'An orbiter collecting images from above Mars.',3:'A fixed lander that cannot travel away from its landing site.'},
 'exploration-02':{1:'It was a Canadian astronaut mission that landed on Mars.',2:'It was a ground telescope used to discover Earth’s Moon.',3:'It was a natural object discovered in Earth orbit.'},
 'exploration-03':{3:'A weather balloon that measures only the lower atmosphere over one school.',4:'A fixed seismometer that records only vibrations inside a classroom building.'},
 'exploration-04':{3:'A reduced need to protect equipment from extreme temperatures.',4:'Instant emergency resupply from Earth to any location in space.'}
};
const prompts={
 'particles-05':'How does the particle model explain warming liquid water?',
 'particles-06':'What happens to particle motion and mass when a closed sample cools?',
 'particles-09':'How would you test whether melting changes mass in a closed container?',
 'temperature-05':'How does a liquid thermometer respond to warming?',
 'temperature-06':'Which Celsius temperatures describe freezing and boiling water?',
 'expansion-05':'Why does ice float on liquid water?',
 'expansion-06':'How do bridge materials respond to warming and cooling?',
 'properties-05':'How can you distinguish temporary and permanent shape changes?',
 'properties-06':'What makes a test of material recovery fair and safe?',
 'reactions-05':'What forces act when a paddle pushes water backward?',
 'choices-05':'Which factors belong in an energy-resource decision?',
 'choices-06':'How can a community compare energy options fairly?',
 'management-05':'How does a wind turbine supply energy to a light?',
 'ecosystems-05':'Which roles do the components of an ecosystem play?',
 'ecosystems-13':'The wetland model has four lettered areas. Place each description at the matching letter.',
 'ecosystems-14':'Place the forest-layer labels at the four lettered areas of the habitat model.',
 'relationships-13':'Label the four lettered areas of the plant–animal interaction model.',
 'planetary-06':'Use the solar-system model and object descriptions to complete each statement.',
 'collaboration-18':'A project has 15 observation years. For 11 years, it has both instrument records and community observations approved for use. How many years are missing at least one of these two sources?'
};
// Alternatives address science misconceptions instead of unrelated joke answers.
// The correct strings remain the stable stored values used by the scorer.
const dropdownAlternatives={
 'particles-05':[['more slowly','at exactly the same speed'],['decreases','cannot change'],['grow larger','become smaller']],
 'particles-06':[['faster','at exactly the same speed'],['decreases','increases']],
 'temperature-05':[['contracts','keeps exactly the same volume'],['falls','stays at its original level'],['grams','millilitres']],
 'temperature-06':[['10°C','100°C'],['0°C','50°C']],
 'expansion-05':[['decreases','stays exactly the same'],['higher','unchanged'],['sink below liquid water','dissolve because it has less mass']],
 'expansion-06':[['contract','stay exactly the same length'],['expand','keep gaining thermal energy'],['particles to escape','the total mass to increase']],
 'forces-05':[['internal twisting force','force caused by gravity alone'],['in the direction of sliding','perpendicular to the table only'],['far apart','changing into a new substance']],
 'forces-06':[['only a magnetic force','only a gravitational force'],['spring only','entire spring-and-cart system in every case'],['mass by adding new particles','material into a new substance']],
 'properties-05':[['temporary','always elastic'],['plasticity','a permanent change'],['that the material must be plastic','complete elastic recovery']],
 'properties-06':[['only while the force is applied','only before any force is applied'],['until it breaks','until every sample has the same final length'],['must always return perfectly','must always gain mass']],
 'reactions-05':[['backward','downward only'],['different strengths because water is lighter','strengths that depend only on the larger object'],['the same object','different times rather than together']],
 'reactions-06':[['always larger on the heavier cart','always larger on the lighter cart'],['the same','unrelated to one another'],['must be identical because the forces match','depend only on the colours of the carts']],
 'choices-05':[['accessibility alone','environmental impact alone'],['availability of wind alone','only the price of equipment'],['environmental factors only','societal factors only']],
 'choices-06':[['only purchase costs','only resource availability'],['economic factors only','environmental factors only'],['only the lowest purchase price','only the greatest energy output']],
 'management-05':[['sunlight','natural gas'],['additional wind','fuel without any conversion'],['creating the original wind','removing all environmental impacts']],
 'management-06':[['conversion into electricity first','a refined transport fuel'],['without any processing','only as electricity from a solar panel'],['in only one way in every situation','without any equipment or environmental effects']],
 'climate-05':[['absorbs every ray','emits sunlight of its own'],['produce the incoming sunlight','prevent every form of heat loss'],["Earth’s orbital distance",'the production of energy inside the Sun']],
 'climate-06':[['elevation only','urban development only'],['latitude alone','distance from the equator alone'],['planetary orbit','axial tilt']],
 'impacts-05':[['the tilt of Earth’s axis','the number of hours in a day'],['one distant place instead of local evidence','only a prediction without observations'],['are identical everywhere','can be inferred from a single weather event']],
 'impacts-06':[['Earth’s rotation rate','the order of the seasons'],['the number of days in a year','the dates of the solstices'],['the number of hours in every day','the location of the equator']],
 'evidence-05':[['the exact climate in 100 years','the species of every animal below a storm'],['only rainfall at a single ground gauge','only temperatures inside buildings'],['guaranteed outcomes without uncertainty','one repeated forecast with no new observations']],
 'evidence-06':[['only tomorrow’s weather','the exact weather on every day'],['only the units printed on the notebook','only the warmest day in each period'],['proves that the entire trend is false','establishes a new long-term climate by itself']],
 'collaboration-05':[['publish an interview before contacting them','assume all stories are available for class use'],['one unrelated day’s weather','only the source with the newest equipment'],['assume all knowledge is public','share first and seek review afterward']],
 'collaboration-06':[['permission to publish oral histories','the cultural meaning of every observation'],['guaranteed worldwide forecasts','identical conditions in every community'],['a rule that no source may ever be questioned','a reason to discard every difference between records']],
 'ecosystems-05':[['abiotic component','source of sunlight'],['animal consumer','living decomposer'],['primary producers','physical landforms']],
 'ecosystems-06':[['only the height of the tallest plant','only the number of animals'],['only the number of plant species','only the time of the last animal sighting'],['the total number of individuals without identifying species','only the mass of the largest animal']],
 'photosynthesis-05':[['oxygen gas','sugar already stored in the roots'],['water and carbon dioxide only','minerals and sunlight'],['carbon dioxide','chlorophyll']],
 'photosynthesis-06':[['carbon dioxide','nitrogen'],['all different','unmeasured in every trial'],['that all bubbles are exactly the same volume','that no other condition could affect photosynthesis']],
 'relationships-05':[['seed dispersal','pollination'],['carry oxygen into the roots','replace the plant’s need for light'],['photosynthesis','pollination']],
 'relationships-06':[['plants selected only for decorative colour','all plants used in exactly the same way everywhere'],['a universal rule required of every Nation','permission to publish any knowledge without asking'],['assume all information is public','use one description as the rule for every community']],
 'planetary-05':[['planet','moon'],['main planet','comet'],['asteroid','star']],
 'planetary-06':[['Earth and Mars','Uranus and Neptune'],['moon','star'],['natural satellite','planet']],
 'exploration-05':[['human-built orbital station','robotic rover'],['asteroid','natural moon'],['landing site','atmosphere']],
 'exploration-06':[['natural moon','surface landing site'],['motionless above one city','beyond the reach of gravity'],['unlimited outside air through open windows','protection from gravity alone']]
};
function apply(topics){for(const t of topics)for(const q of t.data.questions){
 if(options[q.id])for(const [i,text]of Object.entries(options[q.id]))q.data.options[+i]=text;
 if(prompts[q.id])q.prompt=prompts[q.id];
 if(dropdownAlternatives[q.id])q.data.blanks.forEach((b,i)=>{b.options=[q.answer[i],...dropdownAlternatives[q.id][i]];});
 if(q.id==='photosynthesis-06')q.data.blanks[0].label='The gas released as a product of photosynthesis is';
 if(q.id==='relationships-05')q.data.blanks[0].label='A bird using tree branches for its nest gets';
 q.presentation={title:actions[q.type],instruction:instruction(q),goal:t.data.groups.find(g=>g.id===q.group).short};
}
 const all=topics.flatMap(t=>t.data.questions),get=id=>all.find(q=>q.id===id);
 const photo=(ids,asset,panel,caption)=>ids.forEach(id=>{const q=get(id);if(!q.data.photo&&!q.data.sceneStrip&&!q.data.diagram&&!q.data.optionVisuals&&!q.data.scenePair)q.data.photo={asset,panel,caption};});
 photo(['ecosystems-01','ecosystems-04','ecosystems-05','relationships-03','relationships-11'],'ecosystem-observations',1,'Original habitat illustration · observe the living and non-living components.');
 photo(['ecosystems-03'],'ecosystem-observations',0,'Original pond-margin illustration · not a field-survey record.');
 get('ecosystems-06').data.scenePair={asset:'ecosystem-observations',panels:[2,0],labels:['Scene A','Scene B'],caption:'Original habitat illustrations · use the stated observations rather than counting species in the artwork.'};
 get('ecosystems-08').data.zoneImages={wetland:{asset:'ecosystem-observations',panel:0},grassland:{asset:'ecosystem-observations',panel:2}};
 get('ecosystems-08').data.visualContext='Original habitat illustrations · use the observations on the cards to classify each scene.';
 photo(['relationships-01'],'ecosystem-observations',2,'Original prairie illustration · an insect visits a flower.');
 photo(['forces-04'],'investigation-contexts',1,'Illustrated classroom materials · follow teacher-approved limits.');
 photo(['properties-03','properties-06'],'investigation-contexts',1,'An elastic-band investigation · the question states what happens after release.');
 photo(['reactions-03'],'interaction-contexts',2,'Paddle and water · an example of an interaction.');
 photo(['management-03','management-06'],'resource-uses',1,'Illustrated resource-use context · use the system described in the question.');
 photo(['evidence-02','evidence-05'],'noaa-forecast-sources',0,'NOAA/NSSL Doppler weather radar · source details in the image credits.');
 photo(['evidence-16'],'noaa-forecast-sources',1,'Official NOAA satellite illustration · this is not a current weather image.');
 get('photosynthesis-01').data.diagram='practice-leaf-cover';
 get('photosynthesis-06').data.diagram='practice-aquatic-plant';
 // A single observation must not be presented as a measurement of gas volume.
 get('photosynthesis-17').data.visualContext='Bubble counts are example observations. Bubble sizes may vary.';
}
function model(content,description){return '<svg class="practice-model" viewBox="0 0 600 370" role="img" aria-label="'+escape(description)+'"><rect width="600" height="370" rx="18" fill="#edf5ef"/>'+content+'</svg><p class="diagram-caption">Original scientific illustration · not to scale.</p>';}
function visual(q){
 if(q.data.diagram==='practice-leaf-cover')return model('<circle cx="486" cy="70" r="31" fill="#edbc58"/><path d="M447 113L390 165M473 128L425 180" stroke="#dfb154" stroke-width="5" stroke-linecap="round"/><path d="M120 295Q141 89 368 86Q412 250 120 295Z" fill="#63a270" stroke="#3a7550" stroke-width="4"/><path d="M119 296L333 123M195 231L175 170M239 198L275 240M283 160L272 113" fill="none" stroke="#b4d8a0" stroke-width="4"/><path d="M205 142L300 109L341 255L248 283Z" fill="#303e4a"/><path d="M120 295L79 330" stroke="#437e51" stroke-width="9"/><text x="443" y="282" text-anchor="middle" fill="#324f3b" font-size="20">Opaque paper</text><path d="M397 265L307 213" stroke="#526a59" stroke-width="2"/>','A green leaf is partly covered by a dark strip of opaque paper. The uncovered part is exposed to the light source.');
 if(q.data.diagram==='practice-aquatic-plant')return model('<path d="M150 72V302Q150 322 170 322H416Q436 322 436 302V72" fill="#ffffff" stroke="#819b9f" stroke-width="5"/><path d="M154 155H432V300Q432 318 415 318H170Q154 318 154 300Z" fill="#b9e0e8"/><path d="M292 300V191M292 254Q241 236 236 209Q281 211 292 254M292 275Q338 249 346 218Q305 227 292 275M292 232Q325 207 324 188" stroke="#3d8664" stroke-width="9" fill="none" stroke-linecap="round"/><g fill="none" stroke="#7cacbf" stroke-width="3"><circle cx="310" cy="169" r="8"/><circle cx="302" cy="140" r="5"/><circle cx="316" cy="113" r="7"/></g><path d="M468 64L517 41L546 104L496 126Z" fill="#536977"/><path d="M499 131L437 177M488 116L427 146" stroke="#e4b855" stroke-width="5"/><text x="296" y="354" text-anchor="middle" fill="#324f3b" font-size="19">Aquatic plant under a lamp</text>','A plant in a clear water-filled beaker under a lamp. Several bubbles rise above the plant. No gas-volume measurements are shown.');
 return '';
}
const api={apply,instruction,actions,mixed,completion,placement,visual};root.ScienceLabDesign=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
