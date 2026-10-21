(function(root){'use strict';const questions=[
  {
    "id": "photosynthesis-01",
    "group": "photosynthesis",
    "type": "single",
    "prompt": "A student covers part of a leaf with opaque paper, gives the plant water, and places it in sunlight. What is the purpose of the opaque paper?",
    "data": {
      "options": [
        "To prevent light from reaching part of the leaf.",
        "To increase carbon dioxide around the leaf.",
        "To remove the chlorophyll from the whole plant instantly.",
        "To make the plant absorb more minerals from soil."
      ]
    },
    "answer": 0,
    "explanation": "A light-blocking cover makes it possible to compare exposed and unexposed leaf regions for evidence of photosynthesis.",
    "hint": "What is different between the exposed and covered parts?",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K4",
      "photosynthesis.U1",
      "photosynthesis.SP2"
    ]
  },
  {
    "id": "photosynthesis-02",
    "group": "photosynthesis",
    "type": "single",
    "prompt": "Where is the light energy needed for photosynthesis collected in most green leaves?",
    "data": {
      "options": [
        "By chlorophyll in chloroplasts.",
        "By the roots absorbing sound.",
        "By glucose molecules reflecting all light.",
        "By the soil surrounding the plant."
      ]
    },
    "answer": 0,
    "explanation": "Chlorophyll is a pigment that absorbs light used for photosynthesis. Leaves contain chloroplasts where much of this process happens.",
    "hint": "Think about what makes many leaves green.",
    "refs": [
      "photosynthesis.K4",
      "photosynthesis.U1",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-03",
    "group": "photosynthesis",
    "type": "multi",
    "prompt": "Choose the THREE inputs or conditions needed for photosynthesis in a green plant.",
    "data": {
      "options": [
        "Light",
        "Water",
        "Carbon dioxide",
        "Soil made of pure sand",
        "Oxygen supplied as an input from the Sun"
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Photosynthesis uses light energy, water and carbon dioxide to produce sugars and oxygen. Plants also need other resources to stay healthy.",
    "hint": "Identify what enters the photosynthesis process.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K4",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-04",
    "group": "photosynthesis",
    "type": "multi",
    "prompt": "Select the THREE statements that help explain why photosynthesis supports ecosystem life.",
    "data": {
      "options": [
        "It produces sugars that plants use as food and energy sources.",
        "It releases oxygen that organisms can use during respiration.",
        "It provides food energy that can move through food webs.",
        "It causes every animal to make glucose directly from sunlight.",
        "It makes decomposers unnecessary."
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Plant sugars support plant functions and food webs, while oxygen from photosynthesis supports many organisms' respiration.",
    "hint": "Link plants, food and oxygen without claiming animals photosynthesize.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K2",
      "photosynthesis.K3",
      "photosynthesis.U1",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-05",
    "group": "photosynthesis",
    "type": "dropdown",
    "prompt": "Complete the simplified photosynthesis description.",
    "data": {
      "blanks": [
        {
          "label": "Light is absorbed by",
          "options": [
            "chlorophyll",
            "oxygen bubbles"
          ]
        },
        {
          "label": "Carbon dioxide and water are used to produce",
          "options": [
            "sugar and oxygen",
            "only soil"
          ]
        },
        {
          "label": "Plants can store some of the produced sugar as",
          "options": [
            "starch",
            "rock"
          ]
        }
      ]
    },
    "answer": [
      "chlorophyll",
      "sugar and oxygen",
      "starch"
    ],
    "explanation": "In light, green plants use carbon dioxide and water to make glucose and release oxygen; some sugars are stored as starch.",
    "hint": "Follow what goes into and comes out of the process.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K4",
      "photosynthesis.K6",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-06",
    "group": "photosynthesis",
    "type": "dropdown",
    "prompt": "A class observes an aquatic plant in a clear beaker under a lamp. Select the most appropriate interpretation.",
    "data": {
      "blanks": [
        {
          "label": "Gas bubbles released from a photosynthesizing plant may contain",
          "options": [
            "oxygen",
            "liquid soil"
          ]
        },
        {
          "label": "To compare the effect of light, keep plant type, time and water conditions",
          "options": [
            "the same",
            "all different"
          ]
        },
        {
          "label": "A higher bubble count alone proves",
          "options": [
            "only that more bubbles were counted, not the exact oxygen volume",
            "that all bubbles are exactly the same volume"
          ]
        }
      ]
    },
    "answer": [
      "oxygen",
      "the same",
      "only that more bubbles were counted, not the exact oxygen volume"
    ],
    "explanation": "Aquatic plant bubbles can provide evidence of oxygen release, but counts are indirect and may be affected by bubble size and other variables.",
    "hint": "A controlled experiment changes one condition at a time.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K5",
      "photosynthesis.U1",
      "photosynthesis.SP2",
      "photosynthesis.SP3"
    ]
  },
  {
    "id": "photosynthesis-07",
    "group": "photosynthesis",
    "type": "sort",
    "prompt": "Classify each substance or factor in a simplified photosynthesis model.",
    "data": {
      "zones": [
        {
          "id": "input",
          "label": "Input or needed energy"
        },
        {
          "id": "output",
          "label": "Product"
        }
      ],
      "items": [
        {
          "id": "light",
          "text": "Sunlight"
        },
        {
          "id": "water",
          "text": "Water taken in by the plant"
        },
        {
          "id": "sugar",
          "text": "Glucose made in the leaf"
        },
        {
          "id": "oxygen",
          "text": "Oxygen released from the plant"
        }
      ],
      "diagram": "living-photosynthesis-flow"
    },
    "answer": {
      "light": "input",
      "water": "input",
      "sugar": "output",
      "oxygen": "output"
    },
    "explanation": "Light and water are needed; sugar and oxygen are products. Carbon dioxide is another input not included among the four cards.",
    "hint": "The process must take in resources before producing sugars and oxygen.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K4",
      "photosynthesis.U1",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-08",
    "group": "photosynthesis",
    "type": "sort",
    "prompt": "Sort each observation by what it is useful for investigating.",
    "data": {
      "zones": [
        {
          "id": "oxygen",
          "label": "Oxygen production investigation"
        },
        {
          "id": "starch",
          "label": "Stored sugar investigation"
        }
      ],
      "items": [
        {
          "id": "bubble",
          "text": "Observe gas released from a submerged plant in suitable light."
        },
        {
          "id": "gas",
          "text": "Collect gas in a controlled setup and test its properties safely using an approved protocol."
        },
        {
          "id": "leaf",
          "text": "Test a prepared leaf for starch using an approved iodine procedure."
        },
        {
          "id": "covered",
          "text": "Compare starch observations for illuminated and light-blocked leaf areas."
        }
      ]
    },
    "answer": {
      "bubble": "oxygen",
      "gas": "oxygen",
      "leaf": "starch",
      "covered": "starch"
    },
    "explanation": "Gas release can support investigation of oxygen production; starch testing can help detect where sugars were made and stored.",
    "hint": "Which observations involve released gas, and which involve stored material?",
    "refs": [
      "photosynthesis.K5",
      "photosynthesis.K6",
      "photosynthesis.SP3",
      "photosynthesis.SP4"
    ]
  },
  {
    "id": "photosynthesis-09",
    "group": "photosynthesis",
    "type": "order",
    "prompt": "Put the major events of photosynthesis and plant sugar use in a useful order.",
    "data": {
      "items": [
        {
          "id": "sun",
          "text": "Sunlight reaches a green leaf."
        },
        {
          "id": "absorb",
          "text": "Chlorophyll absorbs some of the light."
        },
        {
          "id": "make",
          "text": "The plant uses light energy, water and carbon dioxide to produce glucose and oxygen."
        },
        {
          "id": "store",
          "text": "The plant uses or stores some glucose for growth and survival."
        }
      ],
      "diagram": "living-photosynthesis-flow"
    },
    "answer": [
      "sun",
      "absorb",
      "make",
      "store"
    ],
    "explanation": "The steps simplify a connected chemical process. Chlorophyll captures light; plants produce sugars and can store some energy in starch.",
    "hint": "Start with incoming light and end with how the sugar may be used.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K2",
      "photosynthesis.K4",
      "photosynthesis.K6",
      "photosynthesis.U1",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-10",
    "group": "photosynthesis",
    "type": "order",
    "prompt": "Arrange the steps of a fair investigation of how light affects photosynthesis.",
    "data": {
      "items": [
        {
          "id": "question",
          "text": "Ask whether the amount of light changes a measurable outcome."
        },
        {
          "id": "design",
          "text": "Use similar plants and keep water, temperature and observation time consistent."
        },
        {
          "id": "measure",
          "text": "Compare light exposure and agreed evidence of photosynthesis."
        },
        {
          "id": "conclude",
          "text": "Review results and other explanations before making a claim."
        }
      ]
    },
    "answer": [
      "question",
      "design",
      "measure",
      "conclude"
    ],
    "explanation": "A controlled investigation identifies its question, holds competing variables steady, gathers comparable observations and interprets the data.",
    "hint": "Design a fair comparison before interpreting results.",
    "refs": [
      "photosynthesis.K5",
      "photosynthesis.U1",
      "photosynthesis.SP2"
    ]
  },
  {
    "id": "photosynthesis-11",
    "group": "photosynthesis",
    "type": "match",
    "prompt": "Match each photosynthesis-related substance to its role in the process.",
    "data": {
      "zones": [
        {
          "id": "water",
          "label": "Water"
        },
        {
          "id": "carbon",
          "label": "Carbon dioxide"
        },
        {
          "id": "glucose",
          "label": "Glucose"
        },
        {
          "id": "oxygen",
          "label": "Oxygen"
        }
      ],
      "items": [
        {
          "id": "roots",
          "text": "A reactant often absorbed by roots and carried to leaves."
        },
        {
          "id": "air",
          "text": "A gas taken in from surrounding air."
        },
        {
          "id": "food",
          "text": "A sugar produced by plants that can be stored as starch."
        },
        {
          "id": "released",
          "text": "A gas released during photosynthesis."
        }
      ]
    },
    "answer": {
      "roots": "water",
      "air": "carbon",
      "food": "glucose",
      "released": "oxygen"
    },
    "explanation": "Water and carbon dioxide are reactants; glucose and oxygen are products.",
    "hint": "Separate reactants from products, then identify their descriptions.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K2",
      "photosynthesis.K3",
      "photosynthesis.K6",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-12",
    "group": "photosynthesis",
    "type": "match",
    "prompt": "Match the investigation feature to its purpose.",
    "data": {
      "zones": [
        {
          "id": "variable",
          "label": "Variable changed deliberately"
        },
        {
          "id": "control",
          "label": "Variable kept the same"
        },
        {
          "id": "measure",
          "label": "Evidence measured"
        },
        {
          "id": "repeat",
          "label": "Repeated observations"
        }
      ],
      "items": [
        {
          "id": "lamp",
          "text": "Use a lamp at different distances from matched plants."
        },
        {
          "id": "time",
          "text": "Observe every plant for the same length of time."
        },
        {
          "id": "count",
          "text": "Record gas bubbles or a tested output using the same method."
        },
        {
          "id": "replicate",
          "text": "Repeat trials and compare the results."
        }
      ]
    },
    "answer": {
      "lamp": "variable",
      "time": "control",
      "count": "measure",
      "replicate": "repeat"
    },
    "explanation": "Fair tests identify a deliberate change, keep other conditions comparable, measure an outcome and repeat when possible.",
    "hint": "What do we change, hold steady, measure and repeat?",
    "refs": [
      "photosynthesis.K5",
      "photosynthesis.U1",
      "photosynthesis.SP2",
      "photosynthesis.SP3"
    ]
  },
  {
    "id": "photosynthesis-13",
    "group": "photosynthesis",
    "type": "label",
    "prompt": "Complete the plant model by placing each description on the appropriate labelled area.",
    "data": {
      "zones": [
        {
          "id": "A",
          "label": "Position A"
        },
        {
          "id": "B",
          "label": "Position B"
        },
        {
          "id": "C",
          "label": "Position C"
        },
        {
          "id": "D",
          "label": "Position D"
        }
      ],
      "items": [
        {
          "id": "light",
          "text": "Incoming sunlight"
        },
        {
          "id": "carbon",
          "text": "Carbon dioxide from air"
        },
        {
          "id": "water",
          "text": "Water entering through roots"
        },
        {
          "id": "oxygen",
          "text": "Oxygen released near a leaf"
        }
      ],
      "diagram": "living-plant-inputs"
    },
    "answer": {
      "light": "A",
      "carbon": "B",
      "water": "C",
      "oxygen": "D"
    },
    "explanation": "The plant needs light, water and carbon dioxide; oxygen is one of the products released to its surroundings.",
    "hint": "Trace the arrows entering and leaving the plant.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K4",
      "photosynthesis.U1",
      "photosynthesis.SP1"
    ]
  },
  {
    "id": "photosynthesis-14",
    "group": "photosynthesis",
    "type": "label",
    "prompt": "Place the descriptions on a simplified leaf investigation showing light and starch.",
    "data": {
      "zones": [
        {
          "id": "A",
          "label": "Region A"
        },
        {
          "id": "B",
          "label": "Region B"
        },
        {
          "id": "C",
          "label": "Region C"
        }
      ],
      "items": [
        {
          "id": "lit",
          "text": "Exposed portion of the leaf"
        },
        {
          "id": "blocked",
          "text": "Opaque-covered leaf portion"
        },
        {
          "id": "test",
          "text": "Starch test result after appropriate preparation"
        }
      ],
      "diagram": "living-leaf-starch"
    },
    "answer": {
      "lit": "A",
      "blocked": "B",
      "test": "C"
    },
    "explanation": "Comparing illuminated and shaded sections can support an inference about the role of light in forming and storing sugars.",
    "hint": "Which region receives light? Where would starch be tested?",
    "refs": [
      "photosynthesis.K5",
      "photosynthesis.K6",
      "photosynthesis.U1",
      "photosynthesis.SP2",
      "photosynthesis.SP4"
    ]
  },
  {
    "id": "photosynthesis-15",
    "group": "photosynthesis",
    "type": "hotspot",
    "prompt": "Which experiment best isolates the importance of light for photosynthesis?",
    "data": {
      "sourceTitle": "Student investigation proposals",
      "intro": "All plants receive the same type of soil and amounts of water unless the proposal says otherwise.",
      "options": [
        "Give one plant light and the other darkness, using similar plants and otherwise similar conditions.",
        "Give one plant more light, more water and different soil.",
        "Compare different kinds of plants at different temperatures and light levels.",
        "Observe one plant for five minutes and another for three weeks."
      ]
    },
    "answer": 0,
    "explanation": "A fair test changes light exposure while keeping other relevant conditions consistent.",
    "hint": "Change only the proposed variable.",
    "refs": [
      "photosynthesis.K1",
      "photosynthesis.K5",
      "photosynthesis.U1",
      "photosynthesis.SP2"
    ]
  },
  {
    "id": "photosynthesis-16",
    "group": "photosynthesis",
    "type": "hotspot",
    "prompt": "Which conclusion is best supported by a controlled plant starch investigation?",
    "data": {
      "sourceTitle": "Leaf starch test notes",
      "intro": "After an appropriate safe preparation, the illuminated green part shows the characteristic positive iodine response, while a covered part does not.",
      "options": [
        "The observation supports a link between exposure to light and starch in the leaf under these conditions.",
        "It proves light has no influence on plants.",
        "It proves all leaves in every environment behave identically.",
        "It proves the plant produced no oxygen at any time."
      ]
    },
    "answer": 0,
    "explanation": "The comparison supports a relationship between light and starch formation or storage; one experiment does not prove every possible biological claim.",
    "hint": "Interpret the specific starch observations, not unrelated outcomes.",
    "refs": [
      "photosynthesis.K5",
      "photosynthesis.K6",
      "photosynthesis.U1",
      "photosynthesis.SP2",
      "photosynthesis.SP4"
    ]
  },
  {
    "id": "photosynthesis-17",
    "group": "photosynthesis",
    "type": "numeric",
    "prompt": "A plant is observed for two equal 5-minute trials. The class counts 12 bubbles in dim light and 29 bubbles in brighter light. How many more bubbles were counted in brighter light?",
    "data": {
      "unit": "bubbles",
      "table": {
        "caption": "Fictional classroom count; bubble size may vary",
        "headers": [
          "Light condition",
          "Bubbles in 5 min"
        ],
        "rows": [
          [
            "Dim light",
            "12"
          ],
          [
            "Brighter light",
            "29"
          ]
        ]
      }
    },
    "answer": 17,
    "explanation": "29 − 12 = 17 more bubbles. Bubble counts are indirect observations and cannot determine an exact volume of oxygen by themselves.",
    "hint": "Compare the number of bubbles during the same observation time.",
    "refs": [
      "photosynthesis.K5",
      "photosynthesis.U1",
      "photosynthesis.SP2",
      "photosynthesis.SP3"
    ]
  },
  {
    "id": "photosynthesis-18",
    "group": "photosynthesis",
    "type": "numeric",
    "prompt": "A class repeats a light-exposure trial three times, recording 8, 10 and 12 bubbles. What is the mean number of bubbles per trial?",
    "data": {
      "unit": "bubbles per trial",
      "table": {
        "caption": "Illustrative repeated bubble counts",
        "headers": [
          "Trial",
          "Bubble count"
        ],
        "rows": [
          [
            "1",
            "8"
          ],
          [
            "2",
            "10"
          ],
          [
            "3",
            "12"
          ]
        ]
      }
    },
    "answer": 10,
    "explanation": "(8 + 10 + 12) ÷ 3 = 10 bubbles per trial. Repetition can help assess variability; bubbles are not a direct measurement of oxygen volume.",
    "hint": "Add the three counts and divide by three.",
    "refs": [
      "photosynthesis.K5",
      "photosynthesis.U1",
      "photosynthesis.SP2",
      "photosynthesis.SP3"
    ]
  }
];root.ScienceLabLivingPhotosynthesis=questions;if(typeof module!=='undefined')module.exports=questions;})(typeof globalThis!=='undefined'?globalThis:this);
