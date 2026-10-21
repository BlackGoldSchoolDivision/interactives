(function(root){'use strict';
const matter=typeof module!=='undefined'?require('./data.js'):root.ScienceLabData;
const energy=typeof module!=='undefined'?require('./energy.js'):root.ScienceLabEnergy;
const earth=typeof module!=='undefined'?require('./earth.js'):root.ScienceLabEarth;
const living=typeof module!=='undefined'?require('./living.js'):root.ScienceLabLiving;
const topics=[
{id:'matter',name:'Matter',data:matter,storageKey:'science-practice-lab-matter-v1',intro:'Explain particles, temperature, and changes of state.',hero:'assets/matter-banner.webp',heroFallback:'assets/matter-banner.png',heroAlt:'Ice, liquid water and warm water on a laboratory bench.'},
{id:'energy',name:'Energy',data:energy,storageKey:'science-practice-lab-energy-v1',intro:'Explore forces, changing materials, and how energy resources are chosen and used.',hero:'assets/energy/banner.webp',heroFallback:'assets/energy/banner.png',heroAlt:'A spring and cart investigation with foam, towel and rope on a classroom bench.'},
{id:'earth',name:'Earth Systems',data:earth,storageKey:'science-practice-lab-earth-v1',intro:'Investigate climate, evidence, extreme weather and effects on communities.',hero:null,heroFallback:null,heroAlt:'Earth systems and climate'},
{id:'living',name:'Living Systems',data:living,storageKey:'science-practice-lab-living-v1',intro:'Investigate ecosystems, photosynthesis, biodiversity and relationships among plants and animals.',hero:null,heroFallback:null,heroAlt:'Living systems, biodiversity and plants'}
];root.ScienceLabTopics=topics;if(typeof module!=='undefined')module.exports=topics;
})(typeof globalThis!=='undefined'?globalThis:this);