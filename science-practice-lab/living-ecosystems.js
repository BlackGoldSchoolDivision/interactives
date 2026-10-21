(function(root){'use strict';const questions=[
  {
    "id": "ecosystems-01",
    "group": "ecosystems",
    "type": "single",
    "prompt": "A student notices fungi growing on fallen leaves in a forest. What is one important role of decomposers?",
    "data": {
      "options": [
        "They break down dead material and help return nutrients to the soil.",
        "They replace sunlight as the main energy source for green plants.",
        "They prevent every insect from living in the forest.",
        "They turn all soil directly into oxygen."
      ]
    },
    "answer": 0,
    "explanation": "Decomposers such as fungi and many microorganisms break down dead organic matter, helping recycle nutrients that plants can use.",
    "hint": "Consider what happens to fallen leaves over time.",
    "refs": [
      "ecosystems.K2",
      "ecosystems.K4",
      "ecosystems.U1",
      "ecosystems.SP1"
    ]
  },
  {
    "id": "ecosystems-02",
    "group": "ecosystems",
    "type": "single",
    "prompt": "Two ecosystems are surveyed using the same observation method. Which finding best supports the claim that one has greater observed plant diversity?",
    "data": {
      "options": [
        "It contains a greater number of different plant species.",
        "Its largest plant is taller.",
        "It has a larger rock.",
        "A single species covers all of its ground."
      ],
      "table": {
        "caption": "Illustrative biodiversity survey",
        "headers": [
          "Ecosystem",
          "Observed plant species"
        ],
        "rows": [
          [
            "Site A",
            "17"
          ],
          [
            "Site B",
            "6"
          ]
        ]
      }
    },
    "answer": 0,
    "explanation": "Species richness is the number of distinct species observed. A fair survey should also account for area and sampling effort.",
    "hint": "Diversity concerns the variety of living organisms, not just their size.",
    "refs": [
      "ecosystems.K8",
      "ecosystems.K9",
      "ecosystems.U1",
      "ecosystems.SP6"
    ]
  },
  {
    "id": "ecosystems-03",
    "group": "ecosystems",
    "type": "multi",
    "prompt": "Select THREE abiotic components that can influence a wetland ecosystem.",
    "data": {
      "options": [
        "Water depth",
        "Sunlight",
        "Frogs",
        "Temperature",
        "Reeds"
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Water, sunlight and temperature are non-living environmental factors. Frogs and reeds are biotic because they are living organisms.",
    "hint": "Abiotic means non-living, even when it influences life.",
    "refs": [
      "ecosystems.K1",
      "ecosystems.K3",
      "ecosystems.K4",
      "ecosystems.SP1"
    ]
  },
  {
    "id": "ecosystems-04",
    "group": "ecosystems",
    "type": "multi",
    "prompt": "Which THREE statements explain why preserving ecosystems may support climate action?",
    "data": {
      "options": [
        "Wetlands can store carbon in plants and soils.",
        "Forests can store carbon in trees and soils.",
        "Protecting habitat can help maintain living systems that use and store carbon.",
        "Removing every plant always increases carbon storage.",
        "A protected ecosystem can never change."
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Healthy wetlands and forests can store carbon; conserving their vegetation and soils can help maintain these stores. Conservation has other ecological benefits too.",
    "hint": "Choose realistic effects of preservation, not guarantees.",
    "refs": [
      "ecosystems.K7",
      "ecosystems.U1",
      "ecosystems.SP3"
    ]
  },
  {
    "id": "ecosystems-05",
    "group": "ecosystems",
    "type": "dropdown",
    "prompt": "Complete the ecosystem observations.",
    "data": {
      "blanks": [
        {
          "label": "A dragonfly is a",
          "options": [
            "biotic component",
            "non-living temperature reading"
          ]
        },
        {
          "label": "Sunlight is an",
          "options": [
            "abiotic energy input",
            "animal consumer"
          ]
        },
        {
          "label": "Microorganisms in soil may act as",
          "options": [
            "decomposers",
            "landforms"
          ]
        }
      ]
    },
    "answer": [
      "biotic component",
      "abiotic energy input",
      "decomposers"
    ],
    "explanation": "Organisms are biotic. Sunlight is an abiotic energy input, and many microorganisms contribute to decomposition.",
    "hint": "Separate living things from their environmental conditions.",
    "refs": [
      "ecosystems.K1",
      "ecosystems.K2",
      "ecosystems.K3",
      "ecosystems.K4",
      "ecosystems.SP1"
    ]
  },
  {
    "id": "ecosystems-06",
    "group": "ecosystems",
    "type": "dropdown",
    "prompt": "A student compares a grassland with a wetland. Choose the most appropriate observation for each factor.",
    "data": {
      "blanks": [
        {
          "label": "For vegetation structure, record",
          "options": [
            "types and layers of plants",
            "only yesterday's cloud colour"
          ]
        },
        {
          "label": "For water availability, record",
          "options": [
            "soil moisture and surface water",
            "the number of notebook pages"
          ]
        },
        {
          "label": "For animal diversity, record",
          "options": [
            "different animal species observed",
            "the largest single rock"
          ]
        }
      ]
    },
    "answer": [
      "types and layers of plants",
      "soil moisture and surface water",
      "different animal species observed"
    ],
    "explanation": "Ecosystem comparisons should measure relevant characteristics consistently. Water, vegetation and animal diversity provide complementary evidence.",
    "hint": "Think about which evidence directly describes the factor.",
    "refs": [
      "ecosystems.K5",
      "ecosystems.K6",
      "ecosystems.K9",
      "ecosystems.U1",
      "ecosystems.SP5",
      "ecosystems.SP6"
    ]
  },
  {
    "id": "ecosystems-07",
    "group": "ecosystems",
    "type": "sort",
    "prompt": "Drag each example into the correct ecosystem-component group.",
    "data": {
      "zones": [
        {
          "id": "biotic",
          "label": "Biotic: living or once-living organisms"
        },
        {
          "id": "abiotic",
          "label": "Abiotic: non-living physical factor"
        }
      ],
      "items": [
        {
          "id": "moss",
          "text": "Living moss on a log"
        },
        {
          "id": "bacteria",
          "text": "Soil bacteria"
        },
        {
          "id": "light",
          "text": "Energy from the Sun"
        },
        {
          "id": "water",
          "text": "Rainwater in the soil"
        }
      ],
      "diagram": "living-component-panels"
    },
    "answer": {
      "moss": "biotic",
      "bacteria": "biotic",
      "light": "abiotic",
      "water": "abiotic"
    },
    "explanation": "Moss and bacteria are living organisms; sunlight and water are non-living components needed by many organisms.",
    "hint": "Classify the component itself, not its importance.",
    "refs": [
      "ecosystems.K1",
      "ecosystems.K2",
      "ecosystems.K3",
      "ecosystems.SP1"
    ]
  },
  {
    "id": "ecosystems-08",
    "group": "ecosystems",
    "type": "sort",
    "prompt": "Classify the observation by which ecosystem it most directly describes.",
    "data": {
      "zones": [
        {
          "id": "wetland",
          "label": "Wetland"
        },
        {
          "id": "grassland",
          "label": "Grassland"
        }
      ],
      "items": [
        {
          "id": "cattails",
          "text": "Cattails grow in standing or saturated water."
        },
        {
          "id": "sedges",
          "text": "Shallow pools support aquatic insect larvae."
        },
        {
          "id": "grasses",
          "text": "Open ground is dominated by prairie grasses."
        },
        {
          "id": "burrows",
          "text": "Grassland mammals use burrows in mostly dry soil."
        }
      ]
    },
    "answer": {
      "cattails": "wetland",
      "sedges": "wetland",
      "grasses": "grassland",
      "burrows": "grassland"
    },
    "explanation": "Wetlands contain water-saturated habitats; grasslands are dominated by grasses. Both habitats can vary widely.",
    "hint": "Look for features of water-saturated land versus open prairie.",
    "refs": [
      "ecosystems.K5",
      "ecosystems.K6",
      "ecosystems.K9",
      "ecosystems.SP5",
      "ecosystems.SP6"
    ]
  },
  {
    "id": "ecosystems-09",
    "group": "ecosystems",
    "type": "order",
    "prompt": "Arrange the steps for a responsible local ecosystem investigation.",
    "data": {
      "items": [
        {
          "id": "prepare",
          "text": "Identify a safe site and agree on respectful observation rules."
        },
        {
          "id": "observe",
          "text": "Use a camera or magnifier to observe without disturbing organisms."
        },
        {
          "id": "record",
          "text": "Record biotic and abiotic observations using the same method."
        },
        {
          "id": "compare",
          "text": "Compare findings and note what the observations cannot tell you."
        }
      ]
    },
    "answer": [
      "prepare",
      "observe",
      "record",
      "compare"
    ],
    "explanation": "Begin with site safety, respectful conduct and an observation plan; collect evidence before drawing conclusions.",
    "hint": "Responsible planning comes before collecting field data.",
    "refs": [
      "ecosystems.K8",
      "ecosystems.SP2",
      "ecosystems.SP5"
    ]
  },
  {
    "id": "ecosystems-10",
    "group": "ecosystems",
    "type": "order",
    "prompt": "Order the simplified path by which sunlight supports a meadow bird.",
    "data": {
      "items": [
        {
          "id": "sun",
          "text": "Sunlight provides energy to green plants."
        },
        {
          "id": "plant",
          "text": "A meadow plant captures light and makes sugars."
        },
        {
          "id": "insect",
          "text": "A plant-eating insect uses energy from the plant."
        },
        {
          "id": "bird",
          "text": "A bird eats the insect to obtain energy."
        }
      ],
      "diagram": "living-meadow-chain"
    },
    "answer": [
      "sun",
      "plant",
      "insect",
      "bird"
    ],
    "explanation": "Energy reaches many animals through food made by producers. Real food webs have more connections than this one path.",
    "hint": "Start at the energy source and follow food to the bird.",
    "refs": [
      "ecosystems.K4",
      "ecosystems.U1",
      "ecosystems.SP1",
      "ecosystems.SP4"
    ]
  },
  {
    "id": "ecosystems-11",
    "group": "ecosystems",
    "type": "match",
    "prompt": "Match each ecosystem to a characteristic that could help identify it.",
    "data": {
      "zones": [
        {
          "id": "arctic",
          "label": "Arctic tundra"
        },
        {
          "id": "desert",
          "label": "Desert"
        },
        {
          "id": "wetland",
          "label": "Wetland"
        },
        {
          "id": "forest",
          "label": "Forest"
        }
      ],
      "items": [
        {
          "id": "permafrost",
          "text": "Low-growing plants where soils may be frozen for long periods."
        },
        {
          "id": "dry",
          "text": "Very low precipitation and plants adapted to water scarcity."
        },
        {
          "id": "reeds",
          "text": "Water-saturated soil supporting emergent plants."
        },
        {
          "id": "canopy",
          "text": "Several layers of trees and shrubs."
        }
      ]
    },
    "answer": {
      "permafrost": "arctic",
      "dry": "desert",
      "reeds": "wetland",
      "canopy": "forest"
    },
    "explanation": "Different ecosystem types have recognizable vegetation, climate and water conditions.",
    "hint": "Use a distinctive characteristic rather than an animal that might visit multiple ecosystems.",
    "refs": [
      "ecosystems.K5",
      "ecosystems.K6",
      "ecosystems.K9",
      "ecosystems.SP5"
    ]
  },
  {
    "id": "ecosystems-12",
    "group": "ecosystems",
    "type": "match",
    "prompt": "Match the investigation tool to what it is especially useful for documenting.",
    "data": {
      "zones": [
        {
          "id": "camera",
          "label": "Camera"
        },
        {
          "id": "magnifier",
          "label": "Hand magnifier"
        },
        {
          "id": "thermometer",
          "label": "Thermometer"
        },
        {
          "id": "fieldnotes",
          "label": "Field notebook"
        }
      ],
      "items": [
        {
          "id": "photo",
          "text": "Repeatable photographs of plant cover without collecting specimens."
        },
        {
          "id": "small",
          "text": "Close observations of leaf veins or small organisms."
        },
        {
          "id": "heat",
          "text": "Air or soil temperature readings."
        },
        {
          "id": "sketch",
          "text": "Written descriptions, sketches and dates of observations."
        }
      ]
    },
    "answer": {
      "photo": "camera",
      "small": "magnifier",
      "heat": "thermometer",
      "sketch": "fieldnotes"
    },
    "explanation": "Choosing appropriate tools can make observations more reliable and reduce disturbance.",
    "hint": "Match the purpose to how each tool collects evidence.",
    "refs": [
      "ecosystems.K6",
      "ecosystems.K8",
      "ecosystems.SP2"
    ]
  },
  {
    "id": "ecosystems-13",
    "group": "ecosystems",
    "type": "label",
    "prompt": "The wetland model shows four numbered features. Drag each component description onto its letter.",
    "data": {
      "zones": [
        {
          "id": "A",
          "label": "Area A"
        },
        {
          "id": "B",
          "label": "Area B"
        },
        {
          "id": "C",
          "label": "Area C"
        },
        {
          "id": "D",
          "label": "Area D"
        }
      ],
      "items": [
        {
          "id": "sun",
          "text": "Sunlight"
        },
        {
          "id": "reeds",
          "text": "Living emergent plants"
        },
        {
          "id": "water",
          "text": "Surface water"
        },
        {
          "id": "soil",
          "text": "Wet soil and decomposers"
        }
      ],
      "diagram": "living-wetland-model"
    },
    "answer": {
      "sun": "A",
      "reeds": "B",
      "water": "C",
      "soil": "D"
    },
    "explanation": "The simplified model shows sunlight, plant growth, water and soil interacting. Soil contains both abiotic material and biotic decomposers.",
    "hint": "Read where each area is located rather than guessing from its letter.",
    "refs": [
      "ecosystems.K1",
      "ecosystems.K2",
      "ecosystems.K3",
      "ecosystems.K4",
      "ecosystems.SP1",
      "ecosystems.SP4"
    ]
  },
  {
    "id": "ecosystems-14",
    "group": "ecosystems",
    "type": "label",
    "prompt": "Place the forest-layer labels on the four numbered zones of this habitat model.",
    "data": {
      "zones": [
        {
          "id": "A",
          "label": "Zone A"
        },
        {
          "id": "B",
          "label": "Zone B"
        },
        {
          "id": "C",
          "label": "Zone C"
        },
        {
          "id": "D",
          "label": "Zone D"
        }
      ],
      "items": [
        {
          "id": "canopy",
          "text": "Tree canopy"
        },
        {
          "id": "understory",
          "text": "Shrubs and young trees"
        },
        {
          "id": "floor",
          "text": "Forest floor with fallen leaves"
        },
        {
          "id": "soil",
          "text": "Soil and decomposers"
        }
      ],
      "diagram": "living-forest-layers"
    },
    "answer": {
      "canopy": "A",
      "understory": "B",
      "floor": "C",
      "soil": "D"
    },
    "explanation": "Vertical layers of vegetation create varied habitats. Decomposers are important at and below the forest floor.",
    "hint": "Follow the forest from the treetops down.",
    "refs": [
      "ecosystems.K4",
      "ecosystems.K6",
      "ecosystems.K9",
      "ecosystems.U1",
      "ecosystems.SP4"
    ]
  },
  {
    "id": "ecosystems-15",
    "group": "ecosystems",
    "type": "hotspot",
    "prompt": "Which field-note excerpt provides the strongest evidence for comparing two ecosystems?",
    "data": {
      "sourceTitle": "Two ecosystem field notes",
      "intro": "Two classes want to compare the number and kinds of organisms observed.",
      "options": [
        "We visited both locations for the same amount of time, recorded species separately and noted the weather and survey area.",
        "The forest looked more interesting to me.",
        "Our wetland photograph was taken with a brighter phone screen.",
        "We counted birds at one site for one hour but at the other for only one minute."
      ]
    },
    "answer": 0,
    "explanation": "Comparable survey effort and records give stronger evidence than personal impressions or unequal observation times.",
    "hint": "Which procedure lets another class judge the comparison?",
    "refs": [
      "ecosystems.K8",
      "ecosystems.K9",
      "ecosystems.SP2",
      "ecosystems.SP5",
      "ecosystems.SP6"
    ]
  },
  {
    "id": "ecosystems-16",
    "group": "ecosystems",
    "type": "hotspot",
    "prompt": "Which proposed school action most reasonably supports ecosystem preservation and climate goals?",
    "data": {
      "sourceTitle": "Local restoration ideas",
      "intro": "Students are evaluating a disturbed wetland next to their community.",
      "options": [
        "Pave the entire wetland so there are no insects.",
        "Protect remaining vegetation and restore native plants after consulting local land stewards.",
        "Remove all wetland soil because it stores no carbon.",
        "Assume every new tree will survive without water or care."
      ]
    },
    "answer": 1,
    "explanation": "Protecting wetlands and restoring suitable vegetation can benefit habitat and maintain ecosystem carbon stores, but results require local expertise and monitoring.",
    "hint": "Choose an action that protects habitat rather than removing it.",
    "refs": [
      "ecosystems.K7",
      "ecosystems.U1",
      "ecosystems.SP3"
    ]
  },
  {
    "id": "ecosystems-17",
    "group": "ecosystems",
    "type": "numeric",
    "prompt": "A class observes 15 plant species in a forest sample and 9 in a grassland sample. How many more species did the forest sample contain?",
    "data": {
      "unit": "species",
      "table": {
        "caption": "Fictional equal-effort sampling exercise",
        "headers": [
          "Sample",
          "Distinct plant species recorded"
        ],
        "rows": [
          [
            "Forest plot",
            "15"
          ],
          [
            "Grassland plot",
            "9"
          ]
        ]
      }
    },
    "answer": 6,
    "explanation": "15 − 9 = 6 additional species recorded in the forest plot. A single sample does not prove all forests are more diverse than grasslands.",
    "hint": "Subtract the smaller species count from the larger.",
    "refs": [
      "ecosystems.K9",
      "ecosystems.U1",
      "ecosystems.SP5",
      "ecosystems.SP6"
    ]
  },
  {
    "id": "ecosystems-18",
    "group": "ecosystems",
    "type": "numeric",
    "prompt": "In a student model, 8 organisms and 5 non-living environmental factors are recorded. How many total components were recorded?",
    "data": {
      "unit": "components",
      "table": {
        "caption": "Illustrative ecosystem-model inventory",
        "headers": [
          "Component category",
          "Count"
        ],
        "rows": [
          [
            "Biotic entries",
            "8"
          ],
          [
            "Abiotic entries",
            "5"
          ]
        ]
      }
    },
    "answer": 13,
    "explanation": "8 + 5 = 13 recorded components. The model is simplified and does not capture every interaction in an actual ecosystem.",
    "hint": "Include both kinds of components.",
    "refs": [
      "ecosystems.K1",
      "ecosystems.K2",
      "ecosystems.K3",
      "ecosystems.SP1",
      "ecosystems.SP4"
    ]
  }
];root.ScienceLabLivingEcosystems=questions;if(typeof module!=='undefined')module.exports=questions;})(typeof globalThis!=='undefined'?globalThis:this);
