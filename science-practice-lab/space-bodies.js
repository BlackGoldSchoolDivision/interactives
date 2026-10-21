(function(root){'use strict';const questions=[
  {
    "id": "planetary-01",
    "group": "planetary",
    "type": "single",
    "prompt": "Students see the Sun lighting up the Moon's surface. Which statement explains the difference between these two celestial bodies?",
    "data": {
      "options": [
        "The Sun emits its own visible light, while the Moon reflects sunlight.",
        "The Moon produces most of its own visible light, while the Sun reflects it.",
        "Both the Sun and Moon emit visible light from nuclear fusion.",
        "Neither the Sun nor the Moon can be observed from Earth."
      ]
    },
    "answer": 0,
    "explanation": "The Sun is a star that emits light. The Moon does not make visible light of its own; it reflects sunlight.",
    "hint": "Think about why the Moon can appear bright when it is not a star.",
    "refs": [
      "planetary.K1",
      "planetary.K5",
      "planetary.U1",
      "planetary.SP4"
    ]
  },
  {
    "id": "planetary-02",
    "group": "planetary",
    "type": "single",
    "prompt": "A classroom diagram fits all eight planets and the Sun on one sheet of paper. What is the most important limitation to check?",
    "data": {
      "options": [
        "Planet sizes and orbital distances may not be shown at the same scale.",
        "A paper model cannot show any planets.",
        "Every planet must be exactly the same size as the Sun.",
        "All planets travel in the same straight line."
      ],
      "diagram": "space-solar-overview"
    },
    "answer": 0,
    "explanation": "Many solar-system diagrams exaggerate planet sizes or compress enormous distances to make the bodies visible. A model should state which quantities are to scale.",
    "hint": "Ask what details were changed to fit very large distances onto a page.",
    "refs": [
      "planetary.K8",
      "planetary.U1",
      "planetary.SP6"
    ]
  },
  {
    "id": "planetary-03",
    "group": "planetary",
    "type": "multi",
    "prompt": "Select THREE categories of natural celestial bodies found in our solar system.",
    "data": {
      "options": [
        "Comets",
        "Dwarf planets",
        "Asteroids",
        "Weather balloons",
        "Ground-based radio telescopes"
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Comets, dwarf planets and asteroids are naturally occurring bodies in space. Weather balloons and Earth-based telescopes are human technology.",
    "hint": "Which objects are naturally found beyond Earth's atmosphere?",
    "refs": [
      "planetary.K2",
      "planetary.K3",
      "planetary.SP2"
    ]
  },
  {
    "id": "planetary-04",
    "group": "planetary",
    "type": "multi",
    "prompt": "Select THREE accurate observations about sunlight and celestial bodies.",
    "data": {
      "options": [
        "Venus can be seen because it reflects sunlight.",
        "The Sun emits its own visible light.",
        "Saturn's rings reflect sunlight.",
        "Earth's Moon produces visible light through nuclear fusion.",
        "Asteroids all emit light like stars."
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Planets, rings and moons can reflect sunlight. The Sun is the star that emits most of the visible light in our solar system.",
    "hint": "Differentiate making light from reflecting light.",
    "refs": [
      "planetary.K5",
      "planetary.SP4"
    ]
  },
  {
    "id": "planetary-05",
    "group": "planetary",
    "type": "dropdown",
    "prompt": "Complete these classifications using evidence about our solar system.",
    "data": {
      "diagram": "space-solar-overview",
      "blanks": [
        {
          "label": "The Sun is classified as a",
          "options": [
            "star",
            "planet",
            "moon"
          ]
        },
        {
          "label": "Pluto is currently classified as a",
          "options": [
            "dwarf planet",
            "main planet",
            "comet"
          ]
        },
        {
          "label": "Earth is classified as a",
          "options": [
            "planet",
            "asteroid",
            "star"
          ]
        }
      ]
    },
    "answer": [
      "star",
      "dwarf planet",
      "planet"
    ],
    "explanation": "The Sun is a star, Earth is a planet, and Pluto has been classified as a dwarf planet since the formal 2006 reclassification.",
    "hint": "Use the scientific categories, not simply whether a body looks round.",
    "refs": [
      "planetary.K2",
      "planetary.K7",
      "planetary.SP2",
      "planetary.SP5"
    ]
  },
  {
    "id": "planetary-06",
    "group": "planetary",
    "type": "dropdown",
    "prompt": "A student makes a model of the inner solar system. Complete each location description.",
    "data": {
      "diagram": "space-belt",
      "blanks": [
        {
          "label": "The main asteroid belt is located mainly between",
          "options": [
            "Mars and Jupiter",
            "Earth and Mars",
            "Uranus and Neptune"
          ]
        },
        {
          "label": "A tiny rocky body travelling through space before entering an atmosphere is a",
          "options": [
            "meteoroid",
            "moon",
            "star"
          ]
        },
        {
          "label": "A body of ice, dust and rock that may develop a tail near the Sun is a",
          "options": [
            "comet",
            "natural satellite",
            "planet"
          ]
        }
      ]
    },
    "answer": [
      "Mars and Jupiter",
      "meteoroid",
      "comet"
    ],
    "explanation": "The main asteroid belt lies between Mars and Jupiter. Meteoroids are smaller rocky or metallic space objects; comets often contain ice and dust and may develop a coma or tail near the Sun.",
    "hint": "A belt is a region of orbits, not one large rock.",
    "refs": [
      "planetary.K2",
      "planetary.K6",
      "planetary.SP1",
      "planetary.SP2"
    ]
  },
  {
    "id": "planetary-07",
    "group": "planetary",
    "type": "sort",
    "prompt": "Sort each object into the scientifically accepted category.",
    "data": {
      "zones": [
        {
          "id": "planet",
          "label": "Planet"
        },
        {
          "id": "other",
          "label": "Another natural celestial-body category"
        }
      ],
      "items": [
        {
          "id": "mars",
          "text": "Mars, which orbits the Sun"
        },
        {
          "id": "neptune",
          "text": "Neptune, an outer planet"
        },
        {
          "id": "pluto",
          "text": "Pluto, a dwarf planet"
        },
        {
          "id": "ceres",
          "text": "Ceres, a dwarf planet within the asteroid belt"
        }
      ]
    },
    "answer": {
      "mars": "planet",
      "neptune": "planet",
      "pluto": "other",
      "ceres": "other"
    },
    "explanation": "Mars and Neptune are planets. Pluto and Ceres are classified as dwarf planets.",
    "hint": "Scientists classify Pluto and Ceres differently from the eight planets.",
    "refs": [
      "planetary.K2",
      "planetary.K7",
      "planetary.SP2",
      "planetary.SP5"
    ]
  },
  {
    "id": "planetary-08",
    "group": "planetary",
    "type": "sort",
    "prompt": "Classify these solar-system planets by their general physical group.",
    "data": {
      "zones": [
        {
          "id": "terrestrial",
          "label": "Inner rocky planets"
        },
        {
          "id": "giant",
          "label": "Outer giant planets"
        }
      ],
      "items": [
        {
          "id": "mercury",
          "text": "Mercury: small and rocky"
        },
        {
          "id": "venus",
          "text": "Venus: thick atmosphere and solid rocky surface"
        },
        {
          "id": "jupiter",
          "text": "Jupiter: gas giant with many moons"
        },
        {
          "id": "neptune",
          "text": "Neptune: ice giant with an atmosphere"
        }
      ]
    },
    "answer": {
      "mercury": "terrestrial",
      "venus": "terrestrial",
      "jupiter": "giant",
      "neptune": "giant"
    },
    "explanation": "Mercury and Venus are rocky terrestrial planets. Jupiter is a gas giant, while Neptune is an ice giant.",
    "hint": "Outer giant planets differ significantly from the inner rocky planets.",
    "refs": [
      "planetary.K4",
      "planetary.SP3"
    ]
  },
  {
    "id": "planetary-09",
    "group": "planetary",
    "type": "order",
    "prompt": "Drag the FOUR innermost planets into order, starting closest to the Sun.",
    "data": {
      "items": [
        {
          "id": "mars",
          "text": "Mars"
        },
        {
          "id": "mercury",
          "text": "Mercury"
        },
        {
          "id": "earth",
          "text": "Earth"
        },
        {
          "id": "venus",
          "text": "Venus"
        }
      ],
      "diagram": "space-solar-overview"
    },
    "answer": [
      "mercury",
      "venus",
      "earth",
      "mars"
    ],
    "explanation": "In order from the Sun, the inner planets are Mercury, Venus, Earth and Mars.",
    "hint": "Start with the smallest planet closest to the Sun.",
    "refs": [
      "planetary.K1",
      "planetary.SP1"
    ]
  },
  {
    "id": "planetary-10",
    "group": "planetary",
    "type": "order",
    "prompt": "Place the FOUR outer planets in order of their distance from the Sun, nearest to farthest.",
    "data": {
      "items": [
        {
          "id": "neptune",
          "text": "Neptune"
        },
        {
          "id": "saturn",
          "text": "Saturn"
        },
        {
          "id": "jupiter",
          "text": "Jupiter"
        },
        {
          "id": "uranus",
          "text": "Uranus"
        }
      ]
    },
    "answer": [
      "jupiter",
      "saturn",
      "uranus",
      "neptune"
    ],
    "explanation": "After Mars and the main asteroid belt, the outer planets are Jupiter, Saturn, Uranus and Neptune.",
    "hint": "The largest planet is the first of the four outer planets.",
    "refs": [
      "planetary.K2",
      "planetary.SP1"
    ]
  },
  {
    "id": "planetary-11",
    "group": "planetary",
    "type": "match",
    "prompt": "Match the space object to the characteristic used to classify it.",
    "data": {
      "zones": [
        {
          "id": "sun",
          "label": "Star"
        },
        {
          "id": "moon",
          "label": "Natural moon"
        },
        {
          "id": "comet",
          "label": "Comet"
        },
        {
          "id": "asteroid",
          "label": "Asteroid"
        }
      ],
      "items": [
        {
          "id": "fusion",
          "text": "The Sun, which produces light through processes in its core"
        },
        {
          "id": "europa",
          "text": "Europa, which orbits Jupiter"
        },
        {
          "id": "icy",
          "text": "An icy body that may form a tail as it approaches the Sun"
        },
        {
          "id": "rock",
          "text": "An irregular rocky body orbiting the Sun"
        }
      ]
    },
    "answer": {
      "fusion": "sun",
      "europa": "moon",
      "icy": "comet",
      "rock": "asteroid"
    },
    "explanation": "A star emits energy, a natural moon orbits a planet, a comet contains ice and dust, and many asteroids are rocky bodies orbiting the Sun.",
    "hint": "Use what each body is and how it moves.",
    "refs": [
      "planetary.K2",
      "planetary.K3",
      "planetary.SP2",
      "planetary.SP3"
    ]
  },
  {
    "id": "planetary-12",
    "group": "planetary",
    "type": "match",
    "prompt": "Match each planet to its observable or inferred characteristic.",
    "data": {
      "zones": [
        {
          "id": "jupiter",
          "label": "Jupiter"
        },
        {
          "id": "saturn",
          "label": "Saturn"
        },
        {
          "id": "mars",
          "label": "Mars"
        },
        {
          "id": "venus",
          "label": "Venus"
        }
      ],
      "items": [
        {
          "id": "gas",
          "text": "Large gas giant with a prominent long-lived storm"
        },
        {
          "id": "rings",
          "text": "Gas giant with extensive visible rings"
        },
        {
          "id": "rust",
          "text": "Rocky planet with a reddish, iron-oxide-rich surface"
        },
        {
          "id": "heat",
          "text": "Rocky planet with very high surface temperature and a dense atmosphere"
        }
      ]
    },
    "answer": {
      "gas": "jupiter",
      "rings": "saturn",
      "rust": "mars",
      "heat": "venus"
    },
    "explanation": "Jupiter has the Great Red Spot, Saturn has conspicuous rings, Mars appears reddish from iron oxide, and Venus has an extremely hot surface under a dense atmosphere.",
    "hint": "Think about atmospheric conditions, rings and surface materials.",
    "refs": [
      "planetary.K4",
      "planetary.SP3"
    ]
  },
  {
    "id": "planetary-13",
    "group": "planetary",
    "type": "label",
    "prompt": "Identify the labelled bodies in this simplified INNER solar-system model.",
    "data": {
      "diagram": "space-inner-labels",
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
          "id": "mercury",
          "text": "Mercury"
        },
        {
          "id": "venus",
          "text": "Venus"
        },
        {
          "id": "earth",
          "text": "Earth"
        },
        {
          "id": "mars",
          "text": "Mars"
        }
      ]
    },
    "answer": {
      "mercury": "A",
      "venus": "B",
      "earth": "C",
      "mars": "D"
    },
    "explanation": "The four planets nearest the Sun are Mercury, Venus, Earth and Mars, in that order. The schematic does not show true sizes or distances.",
    "hint": "The labels proceed outward from the Sun.",
    "refs": [
      "planetary.K8",
      "planetary.SP1",
      "planetary.SP6"
    ]
  },
  {
    "id": "planetary-14",
    "group": "planetary",
    "type": "label",
    "prompt": "Complete the labelled model showing the MAIN ASTEROID BELT and neighbouring planets.",
    "data": {
      "diagram": "space-belt",
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
          "id": "mars",
          "text": "Mars"
        },
        {
          "id": "belt",
          "text": "Main asteroid belt"
        },
        {
          "id": "jupiter",
          "text": "Jupiter"
        },
        {
          "id": "saturn",
          "text": "Saturn"
        }
      ]
    },
    "answer": {
      "mars": "A",
      "belt": "B",
      "jupiter": "C",
      "saturn": "D"
    },
    "explanation": "Mars orbits inside the main asteroid belt. Jupiter and Saturn orbit farther out. Most main-belt asteroids lie between Mars and Jupiter.",
    "hint": "Find the region of many small rocks, not a single planet.",
    "refs": [
      "planetary.K6",
      "planetary.K8",
      "planetary.SP1",
      "planetary.SP6"
    ]
  },
  {
    "id": "planetary-15",
    "group": "planetary",
    "type": "hotspot",
    "prompt": "Which statement is the best evidence-based evaluation of a solar-system model found online?",
    "data": {
      "sourceTitle": "Model review notes",
      "intro": "A drawing shows the Sun and eight planets with large planet symbols and nearly equal spaces between them.",
      "options": [
        "The model is useful for planet order, but it may distort the true sizes and separations.",
        "The model proves that the planets are the same distance apart.",
        "The model is unusable because simplified models never teach anything.",
        "The model proves that light takes exactly one second to travel between planets."
      ]
    },
    "answer": 0,
    "explanation": "Models simplify complex systems. A model can correctly show the order of planets without showing sizes and enormous distances at a uniform scale.",
    "hint": "Name what the model helps explain and what it could misrepresent.",
    "refs": [
      "planetary.K8",
      "planetary.SP6",
      "planetary.SP7"
    ]
  },
  {
    "id": "planetary-16",
    "group": "planetary",
    "type": "hotspot",
    "prompt": "Which scientific explanation best supports Pluto's reclassification as a dwarf planet?",
    "data": {
      "sourceTitle": "Scientific classification discussion",
      "intro": "Students compare the criteria for planets and dwarf planets that orbit the Sun.",
      "options": [
        "Pluto is no longer round enough to be in space.",
        "Pluto has not cleared its orbital neighbourhood of other objects.",
        "Pluto began orbiting the Moon in 2006.",
        "Pluto stopped reflecting sunlight when scientists renamed it."
      ]
    },
    "answer": 1,
    "explanation": "Pluto orbits the Sun and is nearly round, but it has not gravitationally cleared its orbital neighbourhood. Its 2006 classification is dwarf planet.",
    "hint": "The distinction concerns its orbit and nearby objects, not whether it disappeared.",
    "refs": [
      "planetary.K7",
      "planetary.SP5"
    ]
  },
  {
    "id": "planetary-17",
    "group": "planetary",
    "type": "numeric",
    "prompt": "In a deliberately simplified scale model, Mercury is 6 cm from the model Sun and Earth is 15 cm away. How many centimetres farther out is Earth in THIS model?",
    "data": {
      "unit": "cm",
      "table": {
        "caption": "Illustrative model distances; not the real size or scale of the solar system",
        "headers": [
          "Planet",
          "Distance from model Sun (cm)"
        ],
        "rows": [
          [
            "Mercury",
            "6"
          ],
          [
            "Venus",
            "11"
          ],
          [
            "Earth",
            "15"
          ],
          [
            "Mars",
            "23"
          ]
        ]
      }
    },
    "answer": 9,
    "explanation": "15 − 6 = 9 cm. These are invented classroom distances; they do not represent true solar-system measurements.",
    "hint": "Subtract Mercury's model distance from Earth's model distance.",
    "refs": [
      "planetary.K8",
      "planetary.SP6"
    ]
  },
  {
    "id": "planetary-18",
    "group": "planetary",
    "type": "numeric",
    "prompt": "A class compares two model planets: Planet A has a diameter of 8 mm and Planet B has a diameter of 30 mm. How many millimetres greater is Planet B's MODEL diameter?",
    "data": {
      "unit": "mm",
      "table": {
        "caption": "Fictional classroom planet-size model",
        "headers": [
          "Model body",
          "Diameter"
        ],
        "rows": [
          [
            "Planet A",
            "8 mm"
          ],
          [
            "Planet B",
            "30 mm"
          ]
        ]
      }
    },
    "answer": 22,
    "explanation": "30 − 8 = 22 mm. Representing size helps compare celestial bodies, but the model values here are fictional.",
    "hint": "Calculate the difference between the two model diameters.",
    "refs": [
      "planetary.K4",
      "planetary.K8",
      "planetary.SP3",
      "planetary.SP6"
    ]
  }
];
root.ScienceLabSpaceBodies=questions;if(typeof module!=='undefined')module.exports=questions;
})(typeof globalThis!=='undefined'?globalThis:this);
