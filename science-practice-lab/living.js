(function(root){'use strict';
const groups=[
  {
    "id": "ecosystems",
    "title": "Ecosystems & biodiversity",
    "short": "Ecosystems",
    "description": "Explore how biotic and abiotic components, habitats and their diversity interact.",
    "colour": "#3b8767",
    "outcome": "Learning Outcome: Students investigate the characteristics and components of and interactions within ecosystems.",
    "source": {
      "row": 160,
      "K": [
        "Ecosystems are complex systems of biotic and abiotic components.",
        "Biotic components of an ecosystem include plants, animals, and microorganisms.",
        "Abiotic components of an ecosystem include energy from the Sun, water, soil, air, temperature.",
        "All components of an ecosystem influence each other either directly or indirectly; e.g., animals rely on plants for food, plants need water to grow, energy from the Sun affects temperature, decomposers help return nutrients to the soil.",
        "There are many types of ecosystems, such as desert, arctic, grassland, wetland, forest, freshwater.",
        "Characteristics of ecosystems include climate patterns, size, vegetation structure, animal populations, geographic location.",
        "Some ecosystems store greenhouse gases and prevent them from being released into the atmosphere, such as wetlands, oceans, forest, grasslands.",
        "Ecosystems can be examined using digital or non-digital tools, such as still-image and video cameras and magnifying devices.",
        "Characteristics of ecosystems that affect diversity of organisms include geographic location, including climate patterns, landforms, and water sources, size, from very small to very large, complexity, including number and types of plants and animals."
      ],
      "U": [
        "The components and characteristics of an ecosystem affect the diversity of the organisms that live in it."
      ],
      "SP": [
        "Represent and connect the biotic and abiotic components of an ecosystem.",
        "Locate and responsibly examine a local ecosystem in nature using appropriate materials and tools.",
        "Relate the preservation of various ecosystems to possible actions that address climate change.",
        "Create a model or simulation to represent a chosen ecosystem and its characteristics.",
        "Compare the characteristics of two ecosystems.",
        "Examine the diversity of animals and plants in various ecosystems in relation to abiotic components."
      ]
    },
    "handsOn": "Survey a local habitat using appropriate tools and consistent observation methods; leave organisms and habitats undisturbed."
  },
  {
    "id": "photosynthesis",
    "title": "Photosynthesis & investigations",
    "short": "Photosynthesis",
    "description": "Investigate how green plants use light, water and carbon dioxide, and evaluate controlled experiment evidence.",
    "colour": "#ca8536",
    "outcome": "Learning Outcome: Students investigate the characteristics and components of and interactions within ecosystems.",
    "source": {
      "row": 179,
      "K": [
        "Plants carry out the process of photosynthesis, which uses light, water, and carbon dioxide to produce oxygen and food in the form of sugar (glucose).",
        "Plants and animals use food produced during photosynthesis to perform vital biological processes.",
        "Plants and animals use the oxygen that is released during photosynthesis for respiration.",
        "Chlorophyll in plants collects light needed for photosynthesis.",
        "The release of oxygen and the presence of starch indicate that a plant has been photosynthesizing.",
        "Sugar produced by plants through photosynthesis is often stored as starch."
      ],
      "U": [
        "Photosynthesis is a process that supports growth and survival in a variety of ecosystems."
      ],
      "SP": [
        "Explain the process of photosynthesis and its importance in an ecosystem.",
        "Design and perform a controlled experiment to demonstrate the importance of light to photosynthesis.",
        "Design and perform a controlled experiment to show that a plant is releasing oxygen.",
        "Design and perform a controlled experiment to show that a plant contains starch."
      ]
    },
    "handsOn": "Use safe school-approved methods and appropriate adult supervision; never improvise chemical starch tests or gas-flame procedures."
  },
  {
    "id": "relationships",
    "title": "Plants, animals & connections",
    "short": "Relationships",
    "description": "Explain ecosystem relationships, plant services and respectful learning about plants sacred to First Nations and Métis.",
    "colour": "#765eaf",
    "outcome": "Learning Outcome: Students investigate the characteristics and components of and interactions within ecosystems.",
    "source": {
      "row": 193,
      "K": [
        "Plants play a variety of roles in an ecosystem, such as photosynthesizing, cleaning and filtering water, reducing soil erosion, providing food and shelter for animals.",
        "Humans, like all animals, depend on plants to produce oxygen that is used for respiration.",
        "Humans also rely on plants in various other ways, such as food, clothing, paper, building materials, medicine, fuel.",
        "Plants benefit from animals, including humans, to help provide carbon dioxide, which they need to survive.",
        "Certain plants are considered sacred to First Nations and Métis, such as sage, sweetgrass, cedar, tobacco.",
        "The offering of tobacco signifies balance and harmony, giving back to the land, respect for the plant, a sustainable relationship."
      ],
      "U": [
        "There are significant relationships between plants and animals within ecosystems."
      ],
      "SP": [
        "Examine ways that plants and animals rely on each other to meet their needs.",
        "Discuss plants that are considered sacred to First Nations and Métis."
      ]
    },
    "handsOn": "Seek local community-approved guidance on sacred plants and protocols; do not portray any Nation's teachings as universal."
  }
];
const parts=typeof module!=='undefined'?[require('./living-ecosystems.js'),require('./living-photosynthesis.js'),require('./living-relationships.js')]:[root.ScienceLabLivingEcosystems,root.ScienceLabLivingPhotosynthesis,root.ScienceLabLivingRelationships];
const data={version:'living-1.0',groups,questions:parts.flat()};
root.ScienceLabLiving=data;if(typeof module!=='undefined')module.exports=data;
})(typeof globalThis!=='undefined'?globalThis:this);
