(function(root){'use strict';const questions=[
  {
    "id": "climate-01",
    "group": "climate",
    "type": "single",
    "prompt": "A student says greenhouse gases warm Earth by reflecting every ray of sunlight back into space. Which correction is most accurate?",
    "data": {
      "options": [
        "Greenhouse gases absorb and emit some outgoing infrared radiation, slowing heat loss to space.",
        "Greenhouse gases supply most of Earth's incoming light.",
        "Greenhouse gases are only present during summer.",
        "Greenhouse gases stop sunlight from reaching land."
      ]
    },
    "answer": 0,
    "explanation": "Sunlight warms Earth's surface, which gives off infrared energy. Greenhouse gases absorb and emit some outgoing infrared energy, affecting the planet's energy balance.",
    "hint": "Distinguish incoming sunlight from outgoing heat.",
    "refs": [
      "climate.K1",
      "climate.U1",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-02",
    "group": "climate",
    "type": "single",
    "prompt": "Two places are at similar latitude, but one is beside a large lake and the other is far inland. What comparison is most reasonable?",
    "data": {
      "options": [
        "The lakeside location may have moderated temperatures because water warms and cools more slowly than land.",
        "The lake always makes every day hotter.",
        "Latitude stops affecting both places.",
        "The inland place has no seasons."
      ]
    },
    "answer": 0,
    "explanation": "Large water bodies tend to moderate nearby temperatures, though winds and other factors also matter.",
    "hint": "Think about how water stores and releases heat.",
    "refs": [
      "climate.K3",
      "climate.U1",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-03",
    "group": "climate",
    "type": "multi",
    "prompt": "Select the THREE processes that can contribute to climate change on different time scales.",
    "data": {
      "options": [
        "A major volcanic eruption sends particles high into the atmosphere.",
        "Long-term changes in Earth's orbit alter how sunlight is distributed.",
        "One person's daily weather forecast changes the climate.",
        "Human activities increase atmospheric greenhouse gas concentrations.",
        "The colour chosen for a classroom weather poster."
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Volcanic aerosols, orbital changes and human greenhouse gas emissions can affect climate. A forecast describes conditions; it does not change them.",
    "hint": "Look for mechanisms that can alter Earth's energy balance.",
    "refs": [
      "climate.K4",
      "climate.K5",
      "climate.K6",
      "climate.U1",
      "climate.SP2"
    ]
  },
  {
    "id": "climate-04",
    "group": "climate",
    "type": "multi",
    "prompt": "Which THREE proposed actions can reasonably help reduce a school's contribution to climate change?",
    "data": {
      "options": [
        "Reduce wasted energy by turning off unneeded equipment.",
        "Use clean, reliable energy when practical and available.",
        "Claim planting a single garden immediately cancels all emissions.",
        "Reduce waste and unnecessary purchases.",
        "Keep lights on all night so classrooms are ready."
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Avoided energy use and waste can reduce emissions; cleaner energy can further reduce them. Their actual impact depends on implementation and local conditions.",
    "hint": "Choose realistic changes, not exaggerated guarantees.",
    "refs": [
      "climate.K7",
      "climate.K8",
      "climate.U1",
      "climate.SP3"
    ]
  },
  {
    "id": "climate-05",
    "group": "climate",
    "type": "dropdown",
    "prompt": "Complete the description of Earth's energy balance.",
    "data": {
      "blanks": [
        {
          "label": "Bright snow or ice usually",
          "options": [
            "reflects more incoming sunlight",
            "absorbs every ray"
          ]
        },
        {
          "label": "Many clouds can",
          "options": [
            "reflect some incoming sunlight",
            "create sunlight"
          ]
        },
        {
          "label": "Greenhouse gases influence",
          "options": [
            "outgoing infrared energy",
            "Earth's distance from the Sun"
          ]
        }
      ]
    },
    "answer": [
      "reflects more incoming sunlight",
      "reflect some incoming sunlight",
      "outgoing infrared energy"
    ],
    "explanation": "Ice and clouds can reflect sunlight. Greenhouse gases interact with outgoing infrared radiation. Cloud effects are complex and also include trapping outgoing heat.",
    "hint": "Think about the direction and kind of energy involved.",
    "refs": [
      "climate.K1",
      "climate.K2",
      "climate.U1",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-06",
    "group": "climate",
    "type": "dropdown",
    "prompt": "Choose the climate influence described in each case.",
    "data": {
      "blanks": [
        {
          "label": "A town farther from the equator differs mainly in",
          "options": [
            "latitude",
            "pollution colour"
          ]
        },
        {
          "label": "A mountain settlement is much higher above sea level, changing",
          "options": [
            "elevation",
            "ocean salinity"
          ]
        },
        {
          "label": "A dense city has more pavement than nearby farmland, changing the",
          "options": [
            "urban or rural setting",
            "Moon's orbit"
          ]
        }
      ]
    },
    "answer": [
      "latitude",
      "elevation",
      "urban or rural setting"
    ],
    "explanation": "Latitude affects solar energy patterns, elevation often affects temperature, and urban development can influence local heat conditions.",
    "hint": "Match a place's physical characteristic to the factor.",
    "refs": [
      "climate.K3",
      "climate.U1",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-07",
    "group": "climate",
    "type": "sort",
    "prompt": "Classify the causes according to their origin.",
    "data": {
      "zones": [
        {
          "id": "natural",
          "label": "Natural processes"
        },
        {
          "id": "human",
          "label": "Human activities"
        }
      ],
      "items": [
        {
          "id": "eruption",
          "text": "A large volcanic eruption releases sun-blocking aerosols."
        },
        {
          "id": "orbit",
          "text": "Earth's orbital geometry changes gradually."
        },
        {
          "id": "fuel",
          "text": "People burn more fossil fuels for transport."
        },
        {
          "id": "industry",
          "text": "Industrial activity increases greenhouse gas emissions."
        }
      ],
      "layout": "earth-climate-sort"
    },
    "answer": {
      "eruption": "natural",
      "orbit": "natural",
      "fuel": "human",
      "industry": "human"
    },
    "explanation": "Volcanoes and orbital cycles are natural processes; fuel combustion and industrial greenhouse gas emissions are human activities.",
    "hint": "Which change would happen without people carrying it out?",
    "refs": [
      "climate.K4",
      "climate.K5",
      "climate.K6",
      "climate.SP2"
    ]
  },
  {
    "id": "climate-08",
    "group": "climate",
    "type": "sort",
    "prompt": "Sort each observation by its main role in the simplified energy-balance model.",
    "data": {
      "zones": [
        {
          "id": "sun",
          "label": "Incoming sunlight reflected"
        },
        {
          "id": "heat",
          "label": "Outgoing heat affected"
        }
      ],
      "items": [
        {
          "id": "cloud",
          "text": "A bright cloud sends part of the sunlight back toward space."
        },
        {
          "id": "ice",
          "text": "Sea ice reflects some sunlight."
        },
        {
          "id": "gas",
          "text": "Atmospheric carbon dioxide absorbs outgoing infrared radiation."
        },
        {
          "id": "vapour",
          "text": "Atmospheric water vapour absorbs outgoing infrared radiation."
        }
      ]
    },
    "answer": {
      "cloud": "sun",
      "ice": "sun",
      "gas": "heat",
      "vapour": "heat"
    },
    "explanation": "Clouds and ice can reflect incoming solar energy, while greenhouse gases absorb and emit outgoing infrared energy.",
    "hint": "Decide whether each example starts with sunlight or surface heat.",
    "refs": [
      "climate.K1",
      "climate.U1",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-09",
    "group": "climate",
    "type": "order",
    "prompt": "Put these steps in a useful order for comparing possible climate influences.",
    "data": {
      "items": [
        {
          "id": "question",
          "text": "Define the climate question and time period."
        },
        {
          "id": "collect",
          "text": "Gather reliable observations of temperature and possible drivers."
        },
        {
          "id": "compare",
          "text": "Compare trends while considering competing explanations."
        },
        {
          "id": "explain",
          "text": "Explain the conclusions and remaining uncertainties."
        }
      ]
    },
    "answer": [
      "question",
      "collect",
      "compare",
      "explain"
    ],
    "explanation": "A clear question, reliable data and careful comparison come before a conclusion. Climate attribution needs more than one isolated observation.",
    "hint": "Evidence should be collected before conclusions are made.",
    "refs": [
      "climate.K4",
      "climate.K5",
      "climate.K6",
      "climate.U1",
      "climate.SP2"
    ]
  },
  {
    "id": "climate-10",
    "group": "climate",
    "type": "order",
    "prompt": "A school wants to reduce energy-related emissions. Order a reasonable decision process.",
    "data": {
      "items": [
        {
          "id": "audit",
          "text": "Record which equipment uses energy and when."
        },
        {
          "id": "options",
          "text": "Compare realistic ways to save energy or use cleaner sources."
        },
        {
          "id": "plan",
          "text": "Choose an affordable, safe approach suited to the school."
        },
        {
          "id": "review",
          "text": "Measure results and revise the plan if needed."
        }
      ]
    },
    "answer": [
      "audit",
      "options",
      "plan",
      "review"
    ],
    "explanation": "Decisions are stronger when energy use is measured, options are compared and outcomes are checked.",
    "hint": "Begin by understanding the current situation.",
    "refs": [
      "climate.K7",
      "climate.K8",
      "climate.SP3"
    ]
  },
  {
    "id": "climate-11",
    "group": "climate",
    "type": "match",
    "prompt": "Match each geographic factor to the evidence a climate investigator would collect.",
    "data": {
      "zones": [
        {
          "id": "lat",
          "label": "Latitude"
        },
        {
          "id": "water",
          "label": "Large body of water nearby"
        },
        {
          "id": "height",
          "label": "Elevation"
        },
        {
          "id": "city",
          "label": "Urban or rural setting"
        }
      ],
      "items": [
        {
          "id": "sun",
          "text": "Distance north or south of the equator"
        },
        {
          "id": "shore",
          "text": "Distance to a large lake or ocean"
        },
        {
          "id": "alt",
          "text": "Height above sea level"
        },
        {
          "id": "roads",
          "text": "Proportion of paved and built-up surfaces"
        }
      ]
    },
    "answer": {
      "sun": "lat",
      "shore": "water",
      "alt": "height",
      "roads": "city"
    },
    "explanation": "Each geographic variable can influence climate. Investigators should identify and measure the actual variable.",
    "hint": "Think about how each factor is described on a map.",
    "refs": [
      "climate.K3",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-12",
    "group": "climate",
    "type": "match",
    "prompt": "Match the climate-related mechanism to the most direct effect.",
    "data": {
      "zones": [
        {
          "id": "reflect",
          "label": "More sunlight reflected to space"
        },
        {
          "id": "infrared",
          "label": "More outgoing infrared energy absorbed"
        },
        {
          "id": "volcano",
          "label": "Short-term cooling influence from volcanic aerosols"
        }
      ],
      "items": [
        {
          "id": "snow",
          "text": "Increasing bright ice or snow cover, all else equal"
        },
        {
          "id": "gas",
          "text": "Increasing greenhouse gas concentration, all else equal"
        },
        {
          "id": "ash",
          "text": "A large explosive eruption injects reflective sulfate aerosols into the stratosphere"
        }
      ]
    },
    "answer": {
      "snow": "reflect",
      "gas": "infrared",
      "ash": "volcano"
    },
    "explanation": "Reflectivity, atmospheric infrared absorption and stratospheric aerosols affect energy in different ways; the whole climate response depends on other conditions.",
    "hint": "Separate reflection of sunlight from absorption of heat.",
    "refs": [
      "climate.K1",
      "climate.K4",
      "climate.K6",
      "climate.U1",
      "climate.SP1",
      "climate.SP2"
    ]
  },
  {
    "id": "climate-13",
    "group": "climate",
    "type": "label",
    "prompt": "Place labels A–C on the interactions shown in the simplified climate diagram.",
    "data": {
      "diagram": "earth-energy",
      "zones": [
        {
          "id": "A",
          "label": "Arrow A"
        },
        {
          "id": "B",
          "label": "Arrow B"
        },
        {
          "id": "C",
          "label": "Arrow C"
        }
      ],
      "items": [
        {
          "id": "clouds",
          "text": "Sunlight reflected by cloud"
        },
        {
          "id": "ice",
          "text": "Sunlight reflected by bright ice"
        },
        {
          "id": "heat",
          "text": "Outgoing infrared energy affected by greenhouse gases"
        }
      ]
    },
    "answer": {
      "clouds": "A",
      "ice": "B",
      "heat": "C"
    },
    "explanation": "A is incoming sunlight reflected at the clouds, B is reflected at the icy surface, and C represents outgoing infrared energy affected by greenhouse gases.",
    "hint": "Follow the arrows between the Sun, Earth and atmosphere.",
    "refs": [
      "climate.K1",
      "climate.U1",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-14",
    "group": "climate",
    "type": "label",
    "prompt": "Match the four labelled places in the map-style model to their main geographic factors.",
    "data": {
      "diagram": "earth-locations",
      "zones": [
        {
          "id": "A",
          "label": "Location A"
        },
        {
          "id": "B",
          "label": "Location B"
        },
        {
          "id": "C",
          "label": "Location C"
        },
        {
          "id": "D",
          "label": "Location D"
        }
      ],
      "items": [
        {
          "id": "latitude",
          "text": "Farther from the equator"
        },
        {
          "id": "coast",
          "text": "Beside a large body of water"
        },
        {
          "id": "elevation",
          "text": "High on a mountain"
        },
        {
          "id": "urban",
          "text": "Paved city centre"
        }
      ]
    },
    "answer": {
      "latitude": "A",
      "coast": "B",
      "elevation": "C",
      "urban": "D"
    },
    "explanation": "The panels illustrate latitude, water proximity, elevation and built-up urban settings.",
    "hint": "Look at the physical characteristics of each labelled place.",
    "refs": [
      "climate.K3",
      "climate.SP1"
    ]
  },
  {
    "id": "climate-15",
    "group": "climate",
    "type": "hotspot",
    "prompt": "Which source note best supports a claim about a long-term human influence on global climate?",
    "data": {
      "sourceTitle": "Source notes",
      "intro": "A researcher is investigating why long-term global temperatures have changed.",
      "options": [
        "A single unusually warm afternoon occurred in July.",
        "A classroom plant grew taller this week.",
        "Long-term measurements show both increasing greenhouse gas concentrations and increasing global temperatures; additional evidence and models examine their relationship.",
        "A photograph shows one cloudy sky."
      ]
    },
    "answer": 2,
    "explanation": "Multiple long-term observations, combined with physical mechanisms and model comparisons, are stronger evidence than one day's weather.",
    "hint": "Look for long-term measurements, not an isolated event.",
    "refs": [
      "climate.K5",
      "climate.K6",
      "climate.U1",
      "climate.SP2"
    ]
  },
  {
    "id": "climate-16",
    "group": "climate",
    "type": "hotspot",
    "prompt": "Which student proposal is the most defensible personal action?",
    "data": {
      "sourceTitle": "Student proposals",
      "intro": "The school is choosing a realistic response to human-related climate change.",
      "options": [
        "Measure avoidable waste and energy use, then reduce them while checking results.",
        "Announce that one recycling bin has ended climate change.",
        "Stop recording energy consumption so the results look better.",
        "Claim that any energy source has zero environmental impacts in all settings."
      ]
    },
    "answer": 0,
    "explanation": "Measured and practical reductions can help; the scale of benefit should be evaluated rather than exaggerated.",
    "hint": "Choose a plan with a measurable action and review.",
    "refs": [
      "climate.K7",
      "climate.K8",
      "climate.SP3"
    ]
  },
  {
    "id": "climate-17",
    "group": "climate",
    "type": "numeric",
    "prompt": "In an example classroom model, energy-related emissions drop from 18 to 11 units after changes. How many fewer units are recorded?",
    "data": {
      "unit": "units",
      "table": {
        "caption": "Illustrative school audit, not a measured Alberta total",
        "headers": [
          "Period",
          "Example emissions units"
        ],
        "rows": [
          [
            "Before changes",
            "18"
          ],
          [
            "After changes",
            "11"
          ]
        ]
      }
    },
    "answer": 7,
    "explanation": "18 − 11 = 7 example units. Comparing before-and-after totals helps evaluate an action; it does not by itself prove causation.",
    "hint": "Subtract the smaller recorded total from the larger.",
    "refs": [
      "climate.K7",
      "climate.K8",
      "climate.SP3"
    ]
  },
  {
    "id": "climate-18",
    "group": "climate",
    "type": "numeric",
    "prompt": "A hypothetical city station has a monthly average of 15°C and a nearby rural station 12°C for the same month. What is the difference?",
    "data": {
      "unit": "°C",
      "table": {
        "caption": "Illustrative comparison · same month and measurement method",
        "headers": [
          "Station",
          "Example monthly mean"
        ],
        "rows": [
          [
            "Built-up city",
            "15°C"
          ],
          [
            "Nearby rural area",
            "12°C"
          ]
        ]
      }
    },
    "answer": 3,
    "explanation": "15 − 12 = 3°C. This illustrative local difference could reflect urban effects, but other site differences must also be examined.",
    "hint": "Compare the two monthly averages.",
    "refs": [
      "climate.K3",
      "climate.U1",
      "climate.SP1"
    ]
  }
];root.ScienceLabEarthClimate=questions;if(typeof module!=='undefined')module.exports=questions;})(typeof globalThis!=='undefined'?globalThis:this);
