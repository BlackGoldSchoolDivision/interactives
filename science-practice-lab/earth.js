(function(root){'use strict';
const groups=[
  {
    "id": "climate",
    "title": "Climate causes & interactions",
    "short": "Causes & climate",
    "description": "Investigate sunlight, greenhouse gases, Earth systems and geographic climate factors.",
    "colour": "#c57426",
    "outcome": "Climate, climate change and Earth's systems",
    "source": {
      "row": 107,
      "K": [
        "Earth’s systems interact with the Sun and each other to impact climate in various ways, including clouds reflecting sunlight into space, greenhouse gases trapping heat from the Sun, ice reflecting light from the Sun.",
        "Humans rely on the Sun and Earth’s systems for a habitable climate.",
        "Geographical location factors that affect climate include latitude, proximity to a large body of water, elevation, urban or rural setting.",
        "Changes in climate can be caused by natural processes, including volcanic eruptions, meteors, changes in the Sun’s output, changes in orbits.",
        "Changes in climate can be caused by human activities, including industrialization and pollution.",
        "The release of greenhouse gases into the atmosphere contributes to the warming of Earth.",
        "Clean energy production has the potential to reduce net greenhouse gas production.",
        "Personal actions that can help address human causes of global climate change include reducing personal consumption and waste, planting a garden or buying local produce, using clean, affordable, and reliable energy sources responsibly."
      ],
      "U": [
        "Complex interactions between humans, Earth’s systems, and the Sun can impact climate and climate change."
      ],
      "SP": [
        "Describe possible impacts on climate due to interactions between the Sun and Earth’s systems.",
        "Relate impacts of natural processes and human activities on climate change.",
        "Identify personal actions that may affect global climate change."
      ]
    },
    "handsOn": "Use available weather and climate datasets to compare geographic variables and discuss the limits of a small sample."
  },
  {
    "id": "impacts",
    "title": "Climate impacts on life & land",
    "short": "Climate impacts",
    "description": "Consider farming, changing habitats, northern livelihoods and evidence about extinction.",
    "colour": "#4c8f68",
    "outcome": "Climate, climate change and Earth's systems",
    "source": {
      "row": 122,
      "K": [
        "Climate change can affect weather and extreme weather events, migration patterns, water resources, frequency of forest fires.",
        "Climate change can impact agricultural practices, such as crop selection, crop production, harvesting periods and yields, irrigation, pest management.",
        "Traditional ways of living off the land, including hunting and gathering practices of First Nations, Métis, and Inuit communities, have been impacted by climate change in various ways, such as rising sea levels in coastal areas, changing migration patterns, access to hunting, harvesting, and fishing.",
        "Theories about potential causes of the extinction of dinosaurs include worldwide climate change, a catastrophic meteoric event, or volcanic activity."
      ],
      "U": [
        "Climate change over time can affect land, plants, humans, and other animals in a variety of ways."
      ],
      "SP": [
        "Describe possible effects of climate change on land, plants, humans, and other animals.",
        "Discuss agricultural practices impacted by climate change.",
        "Research how climate change is affecting ways of living in northern, Inuit, and/or coastal communities in Canada.",
        "Discuss the effects of climate change on traditional ways of living off the land.",
        "Compare theories about dinosaur extinction."
      ]
    },
    "handsOn": "Use published local case studies and community-approved resources; do not treat fictional scenarios as accounts of actual Nations."
  },
  {
    "id": "evidence",
    "title": "Climate evidence & extreme weather",
    "short": "Climate evidence",
    "description": "Compare multi-year records and interpret forecasting tools and weather hazards.",
    "colour": "#3269a6",
    "outcome": "Climate, climate change and Earth's systems",
    "source": {
      "row": 135,
      "K": [
        "Climate change can be identified through long-term observation and measurement of weather conditions, including amount of precipitation, temperature, and number of extreme weather events.",
        "Climate change can be identified through long-term observation and measurement of environmental conditions, such as sea and ocean levels, thickness and duration of sea ice, permafrost changes, number of forest fires.",
        "Climate observations come from a variety of sources, such as recorded information, oral narratives, surface layers, including ice, from different time periods on Earth.",
        "Extreme weather events that occur on Earth include heatwaves, hurricanes, monsoons.",
        "Extreme weather events that occur in Canada include tornados, blizzards, torrential rain, wildfires.",
        "Technologies used to predict extreme weather events include radars, weather satellites, and computer modelling."
      ],
      "U": [
        "Identifying changes in climate relies on observations and measurements from different points in time."
      ],
      "SP": [
        "Compare historical observations and measurements of weather and environmental conditions to current data.",
        "Relate extreme weather events to specific locations in Canada and on Earth.",
        "Identify and discuss technologies that are used to track and predict extreme weather events."
      ]
    },
    "handsOn": "Compare long-term weather and environmental records with consistent units, sites and periods; discuss uncertainty."
  },
  {
    "id": "collaboration",
    "title": "Knowledge & collaborative inquiry",
    "short": "Working together",
    "description": "Explore respectful collaboration between scientists, Elders and Knowledge Keepers.",
    "colour": "#8161a0",
    "outcome": "Climate, climate change and Earth's systems",
    "source": {
      "row": 148,
      "K": [
        "Traditional knowledge and modern technologies both provide information on long-term climate changes.",
        "Local Elders, traditional Knowledge Keepers, and scientists can collaborate and share information about local climate and climate change."
      ],
      "U": [
        "Collaboration contributes to a broader awareness of the effects of weather on people and environments."
      ],
      "SP": [
        "Discuss how scientists, Elders, and traditional Knowledge Keepers can collaborate to develop deeper awareness of the effects of weather on people and environments.",
        "Propose ideas on how local Elders, traditional Knowledge Keepers, and scientists can collaborate to support awareness of local climate and climate change."
      ]
    },
    "handsOn": "Invite local partnerships only through appropriate protocols, consent and community-set expectations for knowledge sharing."
  }
];
const parts=typeof module!=='undefined'?[require('./earth-climate.js'),require('./earth-impacts.js'),require('./earth-evidence.js'),require('./earth-collaboration.js')]:[root.ScienceLabEarthClimate,root.ScienceLabEarthImpacts,root.ScienceLabEarthEvidence,root.ScienceLabEarthCollaboration];
const data={version:'earth-1.0',groups,questions:parts.flat()};
root.ScienceLabEarth=data;if(typeof module!=='undefined')module.exports=data;
})(typeof globalThis!=='undefined'?globalThis:this);
