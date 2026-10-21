(function(root){'use strict';const questions=[
  {
    "id": "exploration-01",
    "group": "exploration",
    "type": "single",
    "prompt": "Scientists want to study the rocks on the surface of Mars without sending astronauts. Which technology is best designed to move across the surface and collect close-up measurements?",
    "data": {
      "options": [
        "A robotic rover with scientific instruments",
        "A radio dish that never points toward Mars",
        "A weather balloon floating over Alberta",
        "A camera inside a submarine in the Pacific Ocean"
      ],
      "diagram": "space-tools"
    },
    "answer": 0,
    "explanation": "A Mars rover can travel across the surface and examine nearby rocks and soil using instruments. Telescopes and orbiters can support the mission but do different jobs.",
    "hint": "Which tool moves across another world's surface?",
    "refs": [
      "exploration.K1",
      "exploration.U1",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-02",
    "group": "exploration",
    "type": "single",
    "prompt": "What makes Alberta's Ex-Alta 1 especially meaningful to the story of space exploration in Alberta?",
    "data": {
      "options": [
        "It was a University of Alberta student-and-faculty-built artificial satellite launched from the ISS in 2017.",
        "It was a new natural moon found orbiting Mars.",
        "It was the first human landing on the Sun.",
        "It was a telescope installed on the surface of Neptune."
      ]
    },
    "answer": 0,
    "explanation": "The AlbertaSat team at the University of Alberta built Ex-Alta 1, a small satellite deployed from the International Space Station in 2017.",
    "hint": "Was Ex-Alta 1 a natural body or a Canadian-designed piece of technology?",
    "refs": [
      "exploration.K4",
      "exploration.K5",
      "exploration.K6",
      "exploration.U1"
    ]
  },
  {
    "id": "exploration-03",
    "group": "exploration",
    "type": "multi",
    "prompt": "Select THREE technologies that can collect or transmit information useful for investigating the solar system.",
    "data": {
      "options": [
        "A space telescope",
        "A planetary robotic probe",
        "A scientific surface rover",
        "A regular classroom pencil by itself",
        "A kitchen kettle without sensors"
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Telescopes, space probes and rovers provide observations and measurements about celestial bodies. Everyday objects are not automatically scientific observation systems.",
    "hint": "Look for technology designed to gather observations from Earth, orbit or a planetary surface.",
    "refs": [
      "exploration.K1",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-04",
    "group": "exploration",
    "type": "multi",
    "prompt": "Choose THREE realistic challenges people may face while living or working for extended periods in space.",
    "data": {
      "options": [
        "Exposure to higher levels of radiation outside Earth's protective atmosphere",
        "Changes to the body from prolonged microgravity",
        "Limited supplies and delayed emergency support",
        "A guarantee that all astronauts can breathe without equipment",
        "An absence of any technical failures or waste"
      ],
      "diagram": "space-work"
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Radiation, microgravity, limited resources and isolation create challenges that engineers, medical teams and astronauts must plan for.",
    "hint": "Think about life support, human health and the difficulty of receiving help far from Earth.",
    "refs": [
      "exploration.K1",
      "exploration.U1",
      "exploration.SP3"
    ]
  },
  {
    "id": "exploration-05",
    "group": "exploration",
    "type": "dropdown",
    "prompt": "Choose the correct satellite classification for each example.",
    "data": {
      "diagram": "space-orbits",
      "blanks": [
        {
          "label": "Earth's Moon is a",
          "options": [
            "natural satellite",
            "human-built orbital station",
            "robotic rover"
          ]
        },
        {
          "label": "A small human-built spacecraft orbiting Earth is an",
          "options": [
            "artificial satellite",
            "asteroid",
            "natural moon"
          ]
        },
        {
          "label": "The repeating path of an object around a larger object is an",
          "options": [
            "orbit",
            "landing site",
            "atmosphere"
          ]
        }
      ]
    },
    "answer": [
      "natural satellite",
      "artificial satellite",
      "orbit"
    ],
    "explanation": "Natural satellites are bodies such as moons; artificial satellites are human-made objects placed in orbit. Orbit describes their repeated path.",
    "hint": "One satellite forms naturally; another is engineered and launched.",
    "refs": [
      "exploration.K2",
      "exploration.K3",
      "exploration.K4",
      "exploration.SP2"
    ]
  },
  {
    "id": "exploration-06",
    "group": "exploration",
    "type": "dropdown",
    "prompt": "Complete this research-station description.",
    "data": {
      "diagram": "space-work",
      "blanks": [
        {
          "label": "The International Space Station primarily serves as an orbiting",
          "options": [
            "research facility",
            "planet",
            "natural moon"
          ]
        },
        {
          "label": "Scientists can examine microgravity because the ISS is continually",
          "options": [
            "in free fall around Earth",
            "motionless above one city",
            "resting on a cloud"
          ]
        },
        {
          "label": "An important need for astronauts on the ISS is",
          "options": [
            "reliable life-support equipment",
            "open windows with unlimited outside air",
            "protection from gravity alone"
          ]
        }
      ]
    },
    "answer": [
      "research facility",
      "in free fall around Earth",
      "reliable life-support equipment"
    ],
    "explanation": "The ISS is an artificial research facility in low Earth orbit. It is constantly falling around Earth, producing microgravity conditions, and its crews need life support.",
    "hint": "Think about why the ISS is used for experiments and why it requires engineering systems.",
    "refs": [
      "exploration.K3",
      "exploration.K4",
      "exploration.K6",
      "exploration.U1",
      "exploration.SP3"
    ]
  },
  {
    "id": "exploration-07",
    "group": "exploration",
    "type": "sort",
    "prompt": "Classify these orbiting objects as NATURAL or ARTIFICIAL satellites.",
    "data": {
      "zones": [
        {
          "id": "natural",
          "label": "Natural satellite"
        },
        {
          "id": "artificial",
          "label": "Artificial satellite"
        }
      ],
      "items": [
        {
          "id": "moon",
          "text": "Earth's Moon"
        },
        {
          "id": "europa",
          "text": "Europa orbiting Jupiter"
        },
        {
          "id": "exalta",
          "text": "Ex-Alta 1 built at the University of Alberta"
        },
        {
          "id": "gps",
          "text": "Human-made navigation satellite around Earth"
        }
      ],
      "diagram": "space-orbits"
    },
    "answer": {
      "moon": "natural",
      "europa": "natural",
      "exalta": "artificial",
      "gps": "artificial"
    },
    "explanation": "Moons are natural satellites. Ex-Alta 1 and navigation satellites were designed and launched by humans.",
    "hint": "Consider whether an orbiting object formed naturally or was constructed.",
    "refs": [
      "exploration.K2",
      "exploration.K3",
      "exploration.K4",
      "exploration.K5",
      "exploration.SP2"
    ]
  },
  {
    "id": "exploration-08",
    "group": "exploration",
    "type": "sort",
    "prompt": "Which technology performs ON-SURFACE exploration, and which can observe from ABOVE a surface?",
    "data": {
      "zones": [
        {
          "id": "surface",
          "label": "Working on a planetary or lunar surface"
        },
        {
          "id": "remote",
          "label": "Observing remotely from above the surface"
        }
      ],
      "items": [
        {
          "id": "marsrover",
          "text": "A wheeled rover exploring Martian soil"
        },
        {
          "id": "lander",
          "text": "A stationary lunar lander sampling nearby dust"
        },
        {
          "id": "telescope",
          "text": "A telescope viewing a distant planet"
        },
        {
          "id": "orbiter",
          "text": "A probe orbiting Mars and taking photographs"
        }
      ],
      "diagram": "space-tools"
    },
    "answer": {
      "marsrover": "surface",
      "lander": "surface",
      "telescope": "remote",
      "orbiter": "remote"
    },
    "explanation": "Rovers and landers can work directly on a world's surface. Telescopes and orbiters collect remote observations.",
    "hint": "Decide where each instrument must be physically located to gather data.",
    "refs": [
      "exploration.K1",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-09",
    "group": "exploration",
    "type": "order",
    "prompt": "Arrange these major steps in a typical robotic Mars rover investigation, from planning to discovery.",
    "data": {
      "items": [
        {
          "id": "plan",
          "text": "Scientists select a research question and instruments."
        },
        {
          "id": "launch",
          "text": "The spacecraft launches and travels toward Mars."
        },
        {
          "id": "land",
          "text": "The rover reaches the surface and checks its systems."
        },
        {
          "id": "analyze",
          "text": "Scientists analyse transmitted measurements and images."
        }
      ],
      "diagram": "space-tools"
    },
    "answer": [
      "plan",
      "launch",
      "land",
      "analyze"
    ],
    "explanation": "Missions begin with scientific goals and engineering design, then launch and landing, then observations, analysis and sharing results.",
    "hint": "The rover cannot gather Martian soil data before it lands.",
    "refs": [
      "exploration.K1",
      "exploration.U1",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-10",
    "group": "exploration",
    "type": "order",
    "prompt": "Place these steps in a logical sequence for making an evidence-based space model.",
    "data": {
      "items": [
        {
          "id": "question",
          "text": "Ask what the model should explain about an orbit."
        },
        {
          "id": "data",
          "text": "Collect telescope or satellite observations."
        },
        {
          "id": "build",
          "text": "Create a computer model using the observations."
        },
        {
          "id": "test",
          "text": "Compare predictions with new observations and revise if needed."
        }
      ]
    },
    "answer": [
      "question",
      "data",
      "build",
      "test"
    ],
    "explanation": "Computational models use observations to make predictions; comparing those predictions with new evidence can refine understanding.",
    "hint": "A useful model is evaluated against observations after it is created.",
    "refs": [
      "exploration.K1",
      "exploration.U1",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-11",
    "group": "exploration",
    "type": "match",
    "prompt": "Match each space-exploration technology to the job it is particularly suited to do.",
    "data": {
      "zones": [
        {
          "id": "telescope",
          "label": "Telescope"
        },
        {
          "id": "rover",
          "label": "Rover"
        },
        {
          "id": "probe",
          "label": "Space probe"
        },
        {
          "id": "station",
          "label": "Space station"
        }
      ],
      "items": [
        {
          "id": "light",
          "text": "Collect light from distant celestial bodies"
        },
        {
          "id": "soil",
          "text": "Move around and examine nearby surface rocks"
        },
        {
          "id": "flyby",
          "text": "Carry instruments to investigate another world or pass by it"
        },
        {
          "id": "crew",
          "text": "Support repeated experiments by crews in orbit"
        }
      ],
      "diagram": "space-tools"
    },
    "answer": {
      "light": "telescope",
      "soil": "rover",
      "flyby": "probe",
      "crew": "station"
    },
    "explanation": "Different technologies are optimized for remote observations, direct surface work, deep-space missions or crewed research.",
    "hint": "Match the location and instruments of each technology with its purpose.",
    "refs": [
      "exploration.K1",
      "exploration.K6",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-12",
    "group": "exploration",
    "type": "match",
    "prompt": "Match a challenge of living in space to the most suitable engineering or health response.",
    "data": {
      "zones": [
        {
          "id": "shield",
          "label": "Radiation shielding and monitoring"
        },
        {
          "id": "exercise",
          "label": "Daily resistance exercise"
        },
        {
          "id": "scrubber",
          "label": "Air-recycling and life support"
        },
        {
          "id": "communications",
          "label": "Reliable communication planning"
        }
      ],
      "items": [
        {
          "id": "radiation",
          "text": "Some solar and cosmic radiation can harm tissues."
        },
        {
          "id": "muscle",
          "text": "Without exercise, muscles and bones can weaken over time in microgravity."
        },
        {
          "id": "air",
          "text": "Cabin air needs oxygen, suitable pressure and carbon dioxide removal."
        },
        {
          "id": "isolation",
          "text": "Crews far from Earth need to coordinate emergencies and mission instructions."
        }
      ],
      "diagram": "space-work"
    },
    "answer": {
      "radiation": "shield",
      "muscle": "exercise",
      "air": "scrubber",
      "isolation": "communications"
    },
    "explanation": "Radiation shielding, exercise, environmental controls and communication protocols each address different challenges of living away from Earth.",
    "hint": "Choose a response that directly addresses the named hazard.",
    "refs": [
      "exploration.K1",
      "exploration.SP3"
    ]
  },
  {
    "id": "exploration-13",
    "group": "exploration",
    "type": "label",
    "prompt": "Identify the four objects in the simplified EARTH ORBIT research diagram.",
    "data": {
      "diagram": "space-orbit-labels",
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
          "id": "earth",
          "text": "Earth"
        },
        {
          "id": "moon",
          "text": "Natural satellite: the Moon"
        },
        {
          "id": "cubesat",
          "text": "Artificial satellite: small CubeSat"
        },
        {
          "id": "iss",
          "text": "Orbiting research station (ISS)"
        }
      ]
    },
    "answer": {
      "earth": "A",
      "moon": "B",
      "cubesat": "C",
      "iss": "D"
    },
    "explanation": "Earth is the central planet; the Moon is a natural satellite; a CubeSat and the ISS are human-made objects in orbit. Positions are illustrative and not to scale.",
    "hint": "Look at the planet, the natural Moon, a small human-built satellite and a large station.",
    "refs": [
      "exploration.K2",
      "exploration.K3",
      "exploration.K4",
      "exploration.K6",
      "exploration.SP2"
    ]
  },
  {
    "id": "exploration-14",
    "group": "exploration",
    "type": "label",
    "prompt": "Label the steps of a simplified ROBOTIC SPACE MISSION data path.",
    "data": {
      "diagram": "space-data-labels",
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
          "id": "craft",
          "text": "Spacecraft instruments observe a distant world"
        },
        {
          "id": "signal",
          "text": "Radio signal carries recorded data"
        },
        {
          "id": "receiver",
          "text": "Ground antenna receives the signal"
        },
        {
          "id": "scientist",
          "text": "Scientists interpret data and update models"
        }
      ]
    },
    "answer": {
      "craft": "A",
      "signal": "B",
      "receiver": "C",
      "scientist": "D"
    },
    "explanation": "A robotic spacecraft gathers observations, sends data through radio communications, and research teams evaluate the results using analysis and models.",
    "hint": "Follow information from the spacecraft back to a team on Earth.",
    "refs": [
      "exploration.K1",
      "exploration.U1",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-15",
    "group": "exploration",
    "type": "hotspot",
    "prompt": "Which evidence would best support a claim about the mineral composition of rocks in a specific area on Mars?",
    "data": {
      "sourceTitle": "Comparing possible mission data",
      "intro": "A science team wants evidence about actual surface materials, rather than an artist's illustration.",
      "options": [
        "A rover's measurements from a calibrated rock-analysis instrument",
        "An illustration of Mars with dramatic colours",
        "A story claiming all Mars rocks are identical",
        "An unlabelled model planet on a classroom shelf"
      ]
    },
    "answer": 0,
    "explanation": "Calibrated measurements collected directly from rock samples can test claims about mineral composition. Illustrations and unsupported stories cannot do so.",
    "hint": "Look for an observation produced by an instrument designed for the question.",
    "refs": [
      "exploration.K1",
      "exploration.U1",
      "exploration.SP1"
    ]
  },
  {
    "id": "exploration-16",
    "group": "exploration",
    "type": "hotspot",
    "prompt": "A student says people could live on Mars tomorrow with ordinary camping equipment. Which response uses the best evidence?",
    "data": {
      "sourceTitle": "Evaluating a space settlement claim",
      "intro": "Mars has a thin atmosphere and presents radiation, temperature and life-support challenges.",
      "options": [
        "Living there would require dependable oxygen, pressure, temperature control, food and radiation protection systems.",
        "Camping tents always create a breathable atmosphere on another planet.",
        "Astronauts never need water if they bring tools.",
        "A rover photograph alone proves humans can live safely anywhere on Mars."
      ]
    },
    "answer": 0,
    "explanation": "Human space habitats need engineered protection and life-support systems. The challenges cannot be solved by assuming Earth's conditions apply everywhere.",
    "hint": "Which explanation directly addresses the conditions humans require?",
    "refs": [
      "exploration.K1",
      "exploration.SP3"
    ]
  },
  {
    "id": "exploration-17",
    "group": "exploration",
    "type": "numeric",
    "prompt": "In a fictional classroom orbit model, a satellite completes 4 orbits in 6 hours. At the same rate, how many orbits would it complete in 12 hours?",
    "data": {
      "unit": "orbits",
      "table": {
        "caption": "Illustrative simulation, not an actual satellite's orbital period",
        "headers": [
          "Time (hours)",
          "Completed orbits"
        ],
        "rows": [
          [
            "6",
            "4"
          ],
          [
            "12",
            "?"
          ]
        ]
      }
    },
    "answer": 8,
    "explanation": "12 hours is twice 6 hours, so the model would complete 2 × 4 = 8 orbits if the rate stays constant.",
    "hint": "Double the number of orbits when you double the simulated time.",
    "refs": [
      "exploration.K2",
      "exploration.K3",
      "exploration.SP2"
    ]
  },
  {
    "id": "exploration-18",
    "group": "exploration",
    "type": "numeric",
    "prompt": "A fictional robotic probe transmits 5 new research images each day for 6 days. How many images would scientists receive in total?",
    "data": {
      "unit": "images",
      "table": {
        "caption": "Illustrative probe communication plan",
        "headers": [
          "Images per day",
          "Number of days"
        ],
        "rows": [
          [
            "5",
            "6"
          ]
        ]
      }
    },
    "answer": 30,
    "explanation": "5 images each day × 6 days = 30 images. Investigators can compare repeated observations to learn about space environments.",
    "hint": "Multiply the daily image count by the number of days.",
    "refs": [
      "exploration.K1",
      "exploration.U1",
      "exploration.SP1"
    ]
  }
];
root.ScienceLabSpaceExploration=questions;if(typeof module!=='undefined')module.exports=questions;
})(typeof globalThis!=='undefined'?globalThis:this);
