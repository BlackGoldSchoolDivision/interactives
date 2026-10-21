(function(root){'use strict';const questions=[
  {
    "id": "impacts-01",
    "group": "impacts",
    "type": "single",
    "prompt": "A herd's migration route changes as seasonal snow and vegetation patterns change. Which consequence is most directly supported?",
    "data": {
      "options": [
        "Access to customary hunting areas and travel routes may also change.",
        "Every herd will follow exactly the same new route.",
        "All traditional knowledge about wildlife is no longer useful.",
        "The change can only have been caused by one day's weather."
      ]
    },
    "answer": 0,
    "explanation": "Climate-related changes to migration can affect hunting and travel. Effects differ among regions and communities; local observations are important.",
    "hint": "Connect animal movements with people who rely on access to land and animals.",
    "refs": [
      "impacts.K1",
      "impacts.K3",
      "impacts.U1",
      "impacts.SP1",
      "impacts.SP4"
    ]
  },
  {
    "id": "impacts-02",
    "group": "impacts",
    "type": "single",
    "prompt": "Which statement best compares ideas about the extinction of non-avian dinosaurs?",
    "data": {
      "options": [
        "An asteroid impact has extensive geological evidence; volcanism and associated climate changes are also studied.",
        "One hypothesis has been proven solely from modern photographs.",
        "All proposed causes must have contributed exactly equally.",
        "Only one species of dinosaur became extinct at the end of the Cretaceous."
      ]
    },
    "answer": 0,
    "explanation": "The Chicxulub impact is strongly supported by a worldwide iridium-rich boundary layer and impact evidence. Researchers also investigate volcanic activity and environmental change.",
    "hint": "Ask what physical traces each explanation would leave.",
    "refs": [
      "impacts.K4",
      "impacts.U1",
      "impacts.SP5"
    ]
  },
  {
    "id": "impacts-03",
    "group": "impacts",
    "type": "multi",
    "prompt": "Which THREE examples describe possible effects of climate change on agriculture?",
    "data": {
      "options": [
        "Farmers may need different crop varieties suited to changing conditions.",
        "Changing precipitation can influence irrigation planning.",
        "Every farm's growing season must shrink.",
        "Pest and disease pressures may change.",
        "Crop yields will increase by the same amount everywhere."
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Climate trends can affect crop choice, water availability, pests and yields, but impacts vary by place, crop and adaptation.",
    "hint": "Choose plausible, location-dependent changes, not universal guarantees.",
    "refs": [
      "impacts.K2",
      "impacts.U1",
      "impacts.SP2"
    ]
  },
  {
    "id": "impacts-04",
    "group": "impacts",
    "type": "multi",
    "prompt": "Select the THREE respectful and evidence-based approaches for learning about climate effects on harvesting and land-based activities.",
    "data": {
      "options": [
        "Invite interested community members and appropriate Knowledge Keepers to share perspectives with consent.",
        "Use local records alongside community observations when interpreting change.",
        "Assume all Inuit and First Nations communities have identical experiences.",
        "Discuss how changes in sea ice, wildlife or water access affect particular places.",
        "Publish knowledge shared in confidence without permission."
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Place-specific knowledge, appropriate consent and multiple evidence sources support respectful investigation. No single observation speaks for every community.",
    "hint": "Respect diversity among nations, places and knowledge holders.",
    "refs": [
      "impacts.K1",
      "impacts.K3",
      "impacts.U1",
      "impacts.SP3",
      "impacts.SP4"
    ]
  },
  {
    "id": "impacts-05",
    "group": "impacts",
    "type": "dropdown",
    "prompt": "Complete a careful interpretation of a change in northern sea-ice conditions.",
    "data": {
      "blanks": [
        {
          "label": "Shorter periods of safe sea-ice travel may affect",
          "options": [
            "access to routes and harvesting areas",
            "the tilt of Earth's axis"
          ]
        },
        {
          "label": "To learn about the change, researchers should consult",
          "options": [
            "community members and observations from that region",
            "a guess about every northern community"
          ]
        },
        {
          "label": "The best summary acknowledges that impacts",
          "options": [
            "vary among places and people",
            "are identical everywhere"
          ]
        }
      ]
    },
    "answer": [
      "access to routes and harvesting areas",
      "community members and observations from that region",
      "vary among places and people"
    ],
    "explanation": "Travel, safety and harvesting may be affected in different ways. Consultation and local evidence are essential for understanding a particular community.",
    "hint": "Avoid claiming that one experience represents every northern community.",
    "refs": [
      "impacts.K3",
      "impacts.U1",
      "impacts.SP3",
      "impacts.SP4"
    ]
  },
  {
    "id": "impacts-06",
    "group": "impacts",
    "type": "dropdown",
    "prompt": "A farming community is reviewing crop planning. Select the statement supported by each observation.",
    "data": {
      "blanks": [
        {
          "label": "A longer frost-free period may change",
          "options": [
            "planting and harvest timing",
            "Earth's rotation"
          ]
        },
        {
          "label": "Less reliable summer rainfall may change",
          "options": [
            "irrigation decisions",
            "which month follows July"
          ]
        },
        {
          "label": "Warmer winters may alter",
          "options": [
            "which pests survive in the area",
            "the number of days in a year"
          ]
        }
      ]
    },
    "answer": [
      "planting and harvest timing",
      "irrigation decisions",
      "which pests survive in the area"
    ],
    "explanation": "Growing conditions influence crops, schedules, irrigation and pest pressure. A change can bring advantages or risks depending on the crop and location.",
    "hint": "Match the climate factor to the farming decision.",
    "refs": [
      "impacts.K2",
      "impacts.SP2"
    ]
  },
  {
    "id": "impacts-07",
    "group": "impacts",
    "type": "sort",
    "prompt": "Place these examples under the type of climate-related impact they illustrate.",
    "data": {
      "zones": [
        {
          "id": "land",
          "label": "Land, water and ecosystems"
        },
        {
          "id": "people",
          "label": "Human activities and access"
        }
      ],
      "items": [
        {
          "id": "stream",
          "text": "Changed streamflow affects freshwater habitat."
        },
        {
          "id": "fire",
          "text": "A longer fire season alters some forest ecosystems."
        },
        {
          "id": "travel",
          "text": "Unreliable ice conditions change access to a community's winter travel route."
        },
        {
          "id": "harvest",
          "text": "A changed growing season alters the date a farmer harvests a crop."
        }
      ]
    },
    "answer": {
      "stream": "land",
      "fire": "land",
      "travel": "people",
      "harvest": "people"
    },
    "explanation": "Ecological effects and human effects can be connected. This task sorts each statement by the direct effect it describes.",
    "hint": "Look at what the statement says changes first.",
    "refs": [
      "impacts.K1",
      "impacts.K2",
      "impacts.K3",
      "impacts.U1",
      "impacts.SP1",
      "impacts.SP2",
      "impacts.SP4"
    ]
  },
  {
    "id": "impacts-08",
    "group": "impacts",
    "type": "sort",
    "prompt": "Sort the research notes by whether they are directly relevant evidence about the end-Cretaceous extinction.",
    "data": {
      "zones": [
        {
          "id": "evidence",
          "label": "Evidence researchers can investigate"
        },
        {
          "id": "not",
          "label": "Not evidence about that extinction event"
        }
      ],
      "items": [
        {
          "id": "crater",
          "text": "The age and chemistry of the Chicxulub impact structure."
        },
        {
          "id": "rock",
          "text": "Changes in fossils and sediment near the Cretaceous–Paleogene boundary."
        },
        {
          "id": "movie",
          "text": "A fictional dinosaur movie's release date."
        },
        {
          "id": "toy",
          "text": "The colour of a plastic dinosaur toy."
        }
      ]
    },
    "answer": {
      "crater": "evidence",
      "rock": "evidence",
      "movie": "not",
      "toy": "not"
    },
    "explanation": "Datable geologic layers and impact evidence help evaluate extinction theories; entertainment materials do not.",
    "hint": "Look for observations of rocks, fossils and dates.",
    "refs": [
      "impacts.K4",
      "impacts.SP5"
    ]
  },
  {
    "id": "impacts-09",
    "group": "impacts",
    "type": "order",
    "prompt": "Order the steps of a respectful local investigation into changing seasonal access to the land.",
    "data": {
      "items": [
        {
          "id": "permission",
          "text": "Ask the community about priorities and appropriate permissions."
        },
        {
          "id": "records",
          "text": "Collect locally relevant observations and existing records with consent."
        },
        {
          "id": "interpret",
          "text": "Compare changes with contributors, considering different explanations."
        },
        {
          "id": "share",
          "text": "Share findings in an agreed way and check interpretations with contributors."
        }
      ]
    },
    "answer": [
      "permission",
      "records",
      "interpret",
      "share"
    ],
    "explanation": "Respectful research begins with relationships, permission and community priorities, not with taking or publishing information.",
    "hint": "What must happen before collecting or sharing community knowledge?",
    "refs": [
      "impacts.K3",
      "impacts.SP3",
      "impacts.SP4"
    ]
  },
  {
    "id": "impacts-10",
    "group": "impacts",
    "type": "order",
    "prompt": "Order a farmer's evidence-based response to repeated summer water shortages.",
    "data": {
      "items": [
        {
          "id": "monitor",
          "text": "Review several years of rainfall and soil-moisture information."
        },
        {
          "id": "explore",
          "text": "Compare crop choices, irrigation options and costs."
        },
        {
          "id": "choose",
          "text": "Select a feasible approach for the particular farm."
        },
        {
          "id": "check",
          "text": "Track yields and water use, then adjust next season."
        }
      ]
    },
    "answer": [
      "monitor",
      "explore",
      "choose",
      "check"
    ],
    "explanation": "The farmer begins with evidence, considers options and then checks whether the plan works.",
    "hint": "Collect a baseline before changing the plan.",
    "refs": [
      "impacts.K2",
      "impacts.U1",
      "impacts.SP2"
    ]
  },
  {
    "id": "impacts-11",
    "group": "impacts",
    "type": "match",
    "prompt": "Match each climate effect to a possible area of concern.",
    "data": {
      "zones": [
        {
          "id": "fire",
          "label": "Wildfire risk"
        },
        {
          "id": "water",
          "label": "Water availability"
        },
        {
          "id": "species",
          "label": "Animal migration"
        },
        {
          "id": "farming",
          "label": "Agriculture"
        }
      ],
      "items": [
        {
          "id": "forest",
          "text": "Hotter, drier conditions may contribute to more severe fire seasons."
        },
        {
          "id": "river",
          "text": "Changed snowmelt timing alters seasonal river flow."
        },
        {
          "id": "caribou",
          "text": "A herd shifts the timing of its movements."
        },
        {
          "id": "crop",
          "text": "A grower adjusts planting dates and pest monitoring."
        }
      ]
    },
    "answer": {
      "forest": "fire",
      "river": "water",
      "caribou": "species",
      "crop": "farming"
    },
    "explanation": "Climate change can affect interconnected environmental and human systems, including fire risk, water, migration and food production.",
    "hint": "Identify the most direct subject of each note.",
    "refs": [
      "impacts.K1",
      "impacts.K2",
      "impacts.U1",
      "impacts.SP1",
      "impacts.SP2"
    ]
  },
  {
    "id": "impacts-12",
    "group": "impacts",
    "type": "match",
    "prompt": "Match the proposed dinosaur-extinction explanation to the kind of evidence scientists investigate.",
    "data": {
      "zones": [
        {
          "id": "asteroid",
          "label": "Asteroid impact"
        },
        {
          "id": "volcanic",
          "label": "Large volcanic eruptions"
        },
        {
          "id": "climate",
          "label": "Environmental and climate change"
        }
      ],
      "items": [
        {
          "id": "crater",
          "text": "Crater rocks and global impact-related debris."
        },
        {
          "id": "lava",
          "text": "Dates and composition of extensive lava-flow deposits."
        },
        {
          "id": "fossil",
          "text": "Long-term shifts in fossils, temperature proxies and habitats."
        }
      ]
    },
    "answer": {
      "crater": "asteroid",
      "lava": "volcanic",
      "fossil": "climate"
    },
    "explanation": "Different kinds of geological evidence test different mechanisms; the hypotheses can also interact.",
    "hint": "Think about what each process would leave behind.",
    "refs": [
      "impacts.K4",
      "impacts.SP5"
    ]
  },
  {
    "id": "impacts-13",
    "group": "impacts",
    "type": "label",
    "prompt": "Using the four panels, place the labels on impacts shown in a changing northern coastal environment.",
    "data": {
      "diagram": "earth-impacts-coast",
      "zones": [
        {
          "id": "A",
          "label": "Panel A"
        },
        {
          "id": "B",
          "label": "Panel B"
        },
        {
          "id": "C",
          "label": "Panel C"
        },
        {
          "id": "D",
          "label": "Panel D"
        }
      ],
      "items": [
        {
          "id": "ice",
          "text": "Changing sea-ice travel access"
        },
        {
          "id": "shore",
          "text": "Coastal erosion risk"
        },
        {
          "id": "wildlife",
          "text": "Changes in wildlife migration"
        },
        {
          "id": "fish",
          "text": "Changes in fishing conditions"
        }
      ],
      "layout": "earth-coast-lab"
    },
    "answer": {
      "ice": "A",
      "shore": "B",
      "wildlife": "C",
      "fish": "D"
    },
    "explanation": "The illustrations represent possible local impacts. Their timing and severity vary, and local observations should determine which apply.",
    "hint": "Match each physical scene to its direct effect.",
    "refs": [
      "impacts.K1",
      "impacts.K3",
      "impacts.SP1",
      "impacts.SP3",
      "impacts.SP4"
    ]
  },
  {
    "id": "impacts-14",
    "group": "impacts",
    "type": "label",
    "prompt": "Match the four labelled farming observations to possible decisions.",
    "data": {
      "diagram": "earth-farm-panels",
      "zones": [
        {
          "id": "A",
          "label": "Observation A"
        },
        {
          "id": "B",
          "label": "Observation B"
        },
        {
          "id": "C",
          "label": "Observation C"
        },
        {
          "id": "D",
          "label": "Observation D"
        }
      ],
      "items": [
        {
          "id": "heat",
          "text": "Plan for heat stress on crops"
        },
        {
          "id": "water",
          "text": "Review irrigation needs"
        },
        {
          "id": "pest",
          "text": "Monitor a changing pest population"
        },
        {
          "id": "season",
          "text": "Adjust planting or harvesting period"
        }
      ]
    },
    "answer": {
      "heat": "A",
      "water": "B",
      "pest": "C",
      "season": "D"
    },
    "explanation": "Agricultural adaptations need to be tied to observed heat, water, pest and seasonal patterns in each location.",
    "hint": "Identify the stressor or observation in each panel.",
    "refs": [
      "impacts.K2",
      "impacts.SP2"
    ]
  },
  {
    "id": "impacts-15",
    "group": "impacts",
    "type": "hotspot",
    "prompt": "Which research statement best handles climate effects on northern ways of living?",
    "data": {
      "sourceTitle": "Research summaries",
      "intro": "Four students summarize a study of community experiences.",
      "options": [
        "Every northern community must face exactly the same changes.",
        "Observations from the specific community, along with community-approved testimony and long-term records, help describe local changes and responses.",
        "A satellite photograph means Elders need not be consulted.",
        "A single unusually cold day disproves long-term changes."
      ]
    },
    "answer": 1,
    "explanation": "Sound research is local and collaborative, acknowledges community ownership of knowledge, and uses evidence across time.",
    "hint": "Prefer local evidence and consent over generalization.",
    "refs": [
      "impacts.K3",
      "impacts.U1",
      "impacts.SP3",
      "impacts.SP4"
    ]
  },
  {
    "id": "impacts-16",
    "group": "impacts",
    "type": "hotspot",
    "prompt": "A class is evaluating competing explanations of dinosaur extinction. Which note is the strongest scientific reasoning?",
    "data": {
      "sourceTitle": "Class investigation notes",
      "intro": "Students compare published evidence about events about 66 million years ago.",
      "options": [
        "Choose the theory whose name sounds most exciting.",
        "Use fossil and rock-layer changes, radiometric dates and impact or volcanic evidence to evaluate explanations.",
        "Conclude nothing happened because nobody photographed the extinction.",
        "Assume all causes have equal evidence without examining any sources."
      ]
    },
    "answer": 1,
    "explanation": "Geological layers, fossils, dates and physical traces allow scientists to test explanations; impact evidence is especially strong for the end-Cretaceous event.",
    "hint": "What types of evidence survive from deep time?",
    "refs": [
      "impacts.K4",
      "impacts.SP5"
    ]
  },
  {
    "id": "impacts-17",
    "group": "impacts",
    "type": "numeric",
    "prompt": "An illustrative farm record shows a frost-free period of 116 days in one historical period and 129 days in a later period. How many days longer is the later period?",
    "data": {
      "unit": "days",
      "table": {
        "caption": "Hypothetical station averages · not a prediction for all Alberta farms",
        "headers": [
          "Comparison period",
          "Average frost-free days"
        ],
        "rows": [
          [
            "Earlier",
            "116"
          ],
          [
            "Later",
            "129"
          ]
        ]
      }
    },
    "answer": 13,
    "explanation": "129 − 116 = 13 days. Average growing-season length is one piece of evidence; actual crop decisions also depend on rainfall, heat, soil and pests.",
    "hint": "Subtract the earlier average from the later average.",
    "refs": [
      "impacts.K2",
      "impacts.U1",
      "impacts.SP2"
    ]
  },
  {
    "id": "impacts-18",
    "group": "impacts",
    "type": "numeric",
    "prompt": "A community-approved example record counts 28 safe winter travel days in one period and 19 in another. What is the difference?",
    "data": {
      "unit": "days",
      "table": {
        "caption": "Fictional teaching example · observations must not be generalized",
        "headers": [
          "Period",
          "Reported safe days"
        ],
        "rows": [
          [
            "Earlier",
            "28"
          ],
          [
            "Later",
            "19"
          ]
        ]
      }
    },
    "answer": 9,
    "explanation": "28 − 19 = 9 days. These are fictional numbers for data interpretation, not measurements of an actual community.",
    "hint": "Find the absolute difference between the two periods.",
    "refs": [
      "impacts.K3",
      "impacts.U1",
      "impacts.SP3",
      "impacts.SP4"
    ]
  }
];root.ScienceLabEarthImpacts=questions;if(typeof module!=='undefined')module.exports=questions;})(typeof globalThis!=='undefined'?globalThis:this);
