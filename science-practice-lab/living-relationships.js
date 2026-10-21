(function(root){'use strict';const questions=[
  {
    "id": "relationships-01",
    "group": "relationships",
    "type": "single",
    "prompt": "A flowering plant attracts bees. The bees obtain nectar while transferring pollen between flowers. Which explanation is most reasonable?",
    "data": {
      "options": [
        "The bees provide sunlight to the plant.",
        "The interaction can benefit both the bees and the flowering plant.",
        "The flowers prevent every bee from visiting another plant.",
        "Pollen is a non-living form of sunlight."
      ]
    },
    "answer": 1,
    "explanation": "Bees can obtain food from flowers, and some visits transfer pollen that contributes to plant reproduction. The degree of benefit depends on the plant and pollinator.",
    "hint": "Think about what each organism gains from the interaction.",
    "refs": [
      "relationships.K1",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-02",
    "group": "relationships",
    "type": "single",
    "prompt": "Which statement is most appropriate when a class discusses sacred plants used by First Nations and Métis?",
    "data": {
      "options": [
        "Every community uses exactly the same plants and practices.",
        "Sacred plants are important only because they can be sold.",
        "Different Nations and communities may have distinct relationships, teachings and protocols concerning plants; ask appropriate Knowledge Keepers before sharing specifics.",
        "Students can collect sacred plants wherever they find them."
      ]
    },
    "answer": 2,
    "explanation": "Sacred-plant knowledge is diverse, community-specific and may have protocols for sharing and gathering. Respect and permission matter.",
    "hint": "Avoid generalizing or inventing a community's practices.",
    "refs": [
      "relationships.K5",
      "relationships.K6",
      "relationships.SP2"
    ]
  },
  {
    "id": "relationships-03",
    "group": "relationships",
    "type": "multi",
    "prompt": "Select THREE ways plants can benefit animals living near a stream.",
    "data": {
      "options": [
        "Roots and vegetation can help reduce soil erosion.",
        "Trees and shrubs can provide food and shelter.",
        "Some vegetation helps filter water moving through soil.",
        "Plants make every stream permanently pollution-free.",
        "Plants mean animals never need water."
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Plants can stabilize banks, support habitat and help filter water; these effects are not absolute or the same in every ecosystem.",
    "hint": "Think about water quality, land stability and animal survival.",
    "refs": [
      "relationships.K1",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-04",
    "group": "relationships",
    "type": "multi",
    "prompt": "Which THREE examples show human dependence on plants?",
    "data": {
      "options": [
        "Many foods and fibres come from plants.",
        "Wood is used in buildings and paper.",
        "Oxygen made by photosynthesis contributes to air used in respiration.",
        "All medicines are made from a single plant.",
        "People are the only organisms that need oxygen."
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "People rely on plants for food, fibres, materials and photosynthetic oxygen. Medicine may also derive from plants, but not all medicines or ecosystems have the same sources.",
    "hint": "Consider everyday materials and breathing.",
    "refs": [
      "relationships.K2",
      "relationships.K3",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-05",
    "group": "relationships",
    "type": "dropdown",
    "prompt": "Choose the role that completes each ecosystem interaction.",
    "data": {
      "blanks": [
        {
          "label": "A bird nesting in a tree depends on plants for",
          "options": [
            "shelter",
            "gravity"
          ]
        },
        {
          "label": "Some animals support flowering plants when they",
          "options": [
            "transfer pollen",
            "turn soil into stars"
          ]
        },
        {
          "label": "Animals release carbon dioxide during",
          "options": [
            "respiration",
            "photosynthesis without light"
          ]
        }
      ]
    },
    "answer": [
      "shelter",
      "transfer pollen",
      "respiration"
    ],
    "explanation": "Trees supply shelter; some animals support pollination; organisms' respiration releases carbon dioxide that plants can use.",
    "hint": "Look for reciprocal relationships without assuming every species behaves identically.",
    "refs": [
      "relationships.K1",
      "relationships.K4",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-06",
    "group": "relationships",
    "type": "dropdown",
    "prompt": "Complete the respectful community-science statement.",
    "data": {
      "blanks": [
        {
          "label": "Examples of plants with sacred importance in some First Nations and Métis traditions include",
          "options": [
            "sage and sweetgrass",
            "plastic flowers"
          ]
        },
        {
          "label": "An offering of tobacco may express",
          "options": [
            "respect and reciprocity according to local protocol",
            "a universal rule required of every Nation"
          ]
        },
        {
          "label": "Before teaching specific cultural practices, educators should",
          "options": [
            "seek community-approved guidance and permission",
            "assume all information is public"
          ]
        }
      ]
    },
    "answer": [
      "sage and sweetgrass",
      "respect and reciprocity according to local protocol",
      "seek community-approved guidance and permission"
    ],
    "explanation": "The curriculum names examples of sacred plants and meanings of offering tobacco. Practices differ by Nation and community; local voices and permissions guide teaching.",
    "hint": "Respect local protocols and avoid a single generic account.",
    "refs": [
      "relationships.K5",
      "relationships.K6",
      "relationships.SP2"
    ]
  },
  {
    "id": "relationships-07",
    "group": "relationships",
    "type": "sort",
    "prompt": "Sort the ways a flowering plant and pollinating insect may help one another.",
    "data": {
      "zones": [
        {
          "id": "plant",
          "label": "How the plant supports the insect"
        },
        {
          "id": "insect",
          "label": "How the insect may support the plant"
        }
      ],
      "items": [
        {
          "id": "nectar",
          "text": "The flower provides nectar."
        },
        {
          "id": "pollenfood",
          "text": "The flower supplies pollen as a food resource."
        },
        {
          "id": "transfer",
          "text": "The insect carries pollen to another flower."
        },
        {
          "id": "visit",
          "text": "The insect helps a compatible flower receive pollen during a visit."
        }
      ],
      "diagram": "living-pollination-scene"
    },
    "answer": {
      "nectar": "plant",
      "pollenfood": "plant",
      "transfer": "insect",
      "visit": "insect"
    },
    "explanation": "Plants can provide food; insects can transport pollen. Not every pollinator benefits every plant in the same way.",
    "hint": "Which organism provides each benefit?",
    "refs": [
      "relationships.K1",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-08",
    "group": "relationships",
    "type": "sort",
    "prompt": "Sort the products by the plant-based resource they are commonly made from.",
    "data": {
      "zones": [
        {
          "id": "fibre",
          "label": "Plant fibre"
        },
        {
          "id": "wood",
          "label": "Wood from trees"
        }
      ],
      "items": [
        {
          "id": "shirt",
          "text": "A cotton shirt"
        },
        {
          "id": "rope",
          "text": "A flax-fibre rope"
        },
        {
          "id": "desk",
          "text": "A wooden desk"
        },
        {
          "id": "paper",
          "text": "Paper made from wood pulp"
        }
      ]
    },
    "answer": {
      "shirt": "fibre",
      "rope": "fibre",
      "desk": "wood",
      "paper": "wood"
    },
    "explanation": "Plants supply cellulose fibres and wood that can be processed into textiles, rope, paper and furniture.",
    "hint": "Think about the plant material used to make each object.",
    "refs": [
      "relationships.K3",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-09",
    "group": "relationships",
    "type": "order",
    "prompt": "Arrange a plausible chain of interactions in which a plant supports a small mammal.",
    "data": {
      "items": [
        {
          "id": "sun",
          "text": "Sunlight helps a seed-producing plant make food."
        },
        {
          "id": "seed",
          "text": "The plant develops seeds."
        },
        {
          "id": "mouse",
          "text": "A mouse eats some of the seeds."
        },
        {
          "id": "owl",
          "text": "An owl may eat the mouse in a connected food web."
        }
      ],
      "diagram": "living-foodweb-scene"
    },
    "answer": [
      "sun",
      "seed",
      "mouse",
      "owl"
    ],
    "explanation": "This is one possible energy pathway through a larger food web. The Sun supports plant photosynthesis, and consumers obtain energy from food.",
    "hint": "Start with the source of energy and follow who eats whom.",
    "refs": [
      "relationships.K1",
      "relationships.K2",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-10",
    "group": "relationships",
    "type": "order",
    "prompt": "A class is preparing a display about sacred plants. Arrange the respectful planning steps.",
    "data": {
      "items": [
        {
          "id": "ask",
          "text": "Consult appropriate local community contacts about goals and protocols."
        },
        {
          "id": "consent",
          "text": "Agree on what teachings, photographs or descriptions may be shared."
        },
        {
          "id": "create",
          "text": "Prepare the display using only approved information."
        },
        {
          "id": "review",
          "text": "Invite contributors to review the final display before publication."
        }
      ]
    },
    "answer": [
      "ask",
      "consent",
      "create",
      "review"
    ],
    "explanation": "A respectful display is developed with guidance, consent and review. Indigenous communities are not a single interchangeable source.",
    "hint": "Permission and collaboration should come before publication.",
    "refs": [
      "relationships.K5",
      "relationships.K6",
      "relationships.SP2"
    ]
  },
  {
    "id": "relationships-11",
    "group": "relationships",
    "type": "match",
    "prompt": "Match each plant role to its ecosystem effect.",
    "data": {
      "zones": [
        {
          "id": "oxygen",
          "label": "Releases oxygen through photosynthesis"
        },
        {
          "id": "roots",
          "label": "Helps hold soil in place"
        },
        {
          "id": "shelter",
          "label": "Offers an animal shelter"
        },
        {
          "id": "filter",
          "label": "Can help filter water"
        }
      ],
      "items": [
        {
          "id": "breath",
          "text": "Green leaves contribute oxygen that many organisms use in respiration."
        },
        {
          "id": "bank",
          "text": "Roots help stabilize a riverbank."
        },
        {
          "id": "nest",
          "text": "Branches create nesting places for birds."
        },
        {
          "id": "wetland",
          "text": "Wetland vegetation helps trap or transform some materials in water."
        }
      ]
    },
    "answer": {
      "breath": "oxygen",
      "bank": "roots",
      "nest": "shelter",
      "wetland": "filter"
    },
    "explanation": "Plants influence oxygen, erosion, habitat and water quality in many interconnected ways.",
    "hint": "Match each consequence to the direct plant role.",
    "refs": [
      "relationships.K1",
      "relationships.K2",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-12",
    "group": "relationships",
    "type": "match",
    "prompt": "Match the plant-derived item to a familiar use.",
    "data": {
      "zones": [
        {
          "id": "cotton",
          "label": "Cotton fibre"
        },
        {
          "id": "lumber",
          "label": "Lumber"
        },
        {
          "id": "fruit",
          "label": "Fruit and seeds"
        },
        {
          "id": "medicine",
          "label": "Plant-derived compounds"
        }
      ],
      "items": [
        {
          "id": "fabric",
          "text": "Textiles such as clothing"
        },
        {
          "id": "construction",
          "text": "Building material"
        },
        {
          "id": "food",
          "text": "Food for humans and other animals"
        },
        {
          "id": "drug",
          "text": "Some compounds used in medicine after appropriate research and processing"
        }
      ]
    },
    "answer": {
      "fabric": "cotton",
      "construction": "lumber",
      "food": "fruit",
      "drug": "medicine"
    },
    "explanation": "People use plants for fabrics, structures, food and some medicinal compounds. Medicines require evidence-based preparation and evaluation.",
    "hint": "Which plant resource best matches the use?",
    "refs": [
      "relationships.K3",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-13",
    "group": "relationships",
    "type": "label",
    "prompt": "Label the four numbered areas of a plant–animal interaction scene.",
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
          "id": "flower",
          "text": "Flower producing nectar and pollen"
        },
        {
          "id": "insect",
          "text": "Insect visiting the flower"
        },
        {
          "id": "leaves",
          "text": "Leaves carrying out photosynthesis"
        },
        {
          "id": "soil",
          "text": "Roots anchored in soil"
        }
      ],
      "diagram": "living-pollination-scene"
    },
    "answer": {
      "flower": "A",
      "insect": "B",
      "leaves": "C",
      "soil": "D"
    },
    "explanation": "The model highlights connected parts of a flowering plant and a visiting insect, with roots obtaining resources and leaves capturing light.",
    "hint": "Identify the plant parts and visiting animal.",
    "refs": [
      "relationships.K1",
      "relationships.K4",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-14",
    "group": "relationships",
    "type": "label",
    "prompt": "Complete the model showing how a tree benefits different organisms.",
    "data": {
      "zones": [
        {
          "id": "A",
          "label": "Feature A"
        },
        {
          "id": "B",
          "label": "Feature B"
        },
        {
          "id": "C",
          "label": "Feature C"
        },
        {
          "id": "D",
          "label": "Feature D"
        }
      ],
      "items": [
        {
          "id": "leaves",
          "text": "Leaves supporting photosynthesis"
        },
        {
          "id": "nest",
          "text": "Branches providing nesting habitat"
        },
        {
          "id": "fruit",
          "text": "Fruit or seeds used by animals"
        },
        {
          "id": "roots",
          "text": "Roots helping stabilize soil"
        }
      ],
      "diagram": "living-tree-services"
    },
    "answer": {
      "leaves": "A",
      "nest": "B",
      "fruit": "C",
      "roots": "D"
    },
    "explanation": "Different plant structures can support photosynthesis, shelter, food and soil stability.",
    "hint": "Follow the labelled parts of the tree.",
    "refs": [
      "relationships.K1",
      "relationships.K2",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-15",
    "group": "relationships",
    "type": "hotspot",
    "prompt": "Which class display statement is the most respectful and accurate?",
    "data": {
      "sourceTitle": "Cultural learning display drafts",
      "intro": "Students are writing about plants valued by First Nations and Métis.",
      "options": [
        "Some Nations and communities identify plants such as sage, sweetgrass, cedar and tobacco as sacred; teachings and protocols differ, so local guidance is important.",
        "All Indigenous groups use exactly the same plants for the same reason.",
        "Any sacred plant may be gathered at any time without permission.",
        "Specific spiritual practices may be invented if they sound traditional."
      ]
    },
    "answer": 0,
    "explanation": "Respectful science education acknowledges that teachings vary and seeks community-approved guidance rather than inventing or generalizing traditions.",
    "hint": "Look for accurate examples and respect for local knowledge.",
    "refs": [
      "relationships.K5",
      "relationships.K6",
      "relationships.SP2"
    ]
  },
  {
    "id": "relationships-16",
    "group": "relationships",
    "type": "hotspot",
    "prompt": "A student claims animals do not benefit plants because only animals use oxygen. Which response best improves the explanation?",
    "data": {
      "sourceTitle": "Classroom discussion",
      "intro": "A plant grows near birds, insects and mammals.",
      "options": [
        "Animals produce sunlight for photosynthesis.",
        "Some animals release carbon dioxide through respiration and others help with pollination or seed dispersal.",
        "Every animal produces glucose from sunlight.",
        "Plants and animals cannot influence one another."
      ]
    },
    "answer": 1,
    "explanation": "Animals can influence plants through carbon dioxide release, pollination, seed dispersal and other relationships. These connections differ between species.",
    "hint": "Consider gases and ways animals can move pollen or seeds.",
    "refs": [
      "relationships.K1",
      "relationships.K4",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-17",
    "group": "relationships",
    "type": "numeric",
    "prompt": "A school garden survey finds 7 flowering plant species visited by insects and 5 flowering plant species with no insect visits during the observation period. How many flowering plant species were counted?",
    "data": {
      "unit": "species",
      "table": {
        "caption": "Fictional one-day school garden observation",
        "headers": [
          "Observation category",
          "Distinct plant species"
        ],
        "rows": [
          [
            "Visited by insects",
            "7"
          ],
          [
            "Not seen being visited",
            "5"
          ]
        ]
      }
    },
    "answer": 12,
    "explanation": "7 + 5 = 12 distinct plant species counted. A lack of visits in one short observation does not prove insects never visit those flowers.",
    "hint": "Add both groups of plant species.",
    "refs": [
      "relationships.K1",
      "relationships.U1",
      "relationships.SP1"
    ]
  },
  {
    "id": "relationships-18",
    "group": "relationships",
    "type": "numeric",
    "prompt": "A restoration group plants 18 native shrubs that provide shelter and 14 native flowering plants that support pollinators. How many plants are added altogether?",
    "data": {
      "unit": "plants",
      "table": {
        "caption": "Illustrative school habitat project",
        "headers": [
          "Planting type",
          "Plants"
        ],
        "rows": [
          [
            "Native shrubs",
            "18"
          ],
          [
            "Native flowers",
            "14"
          ]
        ]
      }
    },
    "answer": 32,
    "explanation": "18 + 14 = 32 plants in this example. Different plantings may contribute shelter and food for animals.",
    "hint": "Combine the two plant totals.",
    "refs": [
      "relationships.K1",
      "relationships.K3",
      "relationships.U1",
      "relationships.SP1"
    ]
  }
];root.ScienceLabLivingRelationships=questions;if(typeof module!=='undefined')module.exports=questions;})(typeof globalThis!=='undefined'?globalThis:this);
