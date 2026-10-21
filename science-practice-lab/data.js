(function(root){'use strict';const data={
  "version": "matter-1.0",
  "groups": [
    {
      "id": "particles",
      "title": "Particles & phase changes",
      "short": "Particles",
      "description": "Explain heating, cooling, and changes of state.",
      "colour": "#087c8c",
      "source": {
        "row": 5,
        "K": [
          "The particle model of matter states that heating matter causes particles to move faster.",
          "As particles move faster, the attractive forces between them weaken and the space between them increases.",
          "The particle model of matter states that cooling matter causes particles to move slower.",
          "As particles slow down, the attractive forces between them increase and the space between them decreases.",
          "A phase change is a change from one state of matter to another.",
          "During a phase change, the volume of the matter may change but the mass remains constant."
        ],
        "U": [
          "Particles change speed and distance from each other when heated or cooled."
        ],
        "SP": [
          "Discuss the connection between movement of particles and temperature in degrees Celsius.",
          "Explain phase changes of matter when heated or cooled using the particle model of matter.",
          "Conduct a controlled experiment to prove the mass of a substance is the same after a phase change."
        ]
      }
    },
    {
      "id": "temperature",
      "title": "Thermometers & Celsius",
      "short": "Temperature",
      "description": "Read temperatures and explain how liquid thermometers work.",
      "colour": "#ac5a24",
      "source": {
        "row": 18,
        "K": [
          "A liquid thermometer uses the expansion or contraction of matter to measure temperature using a scale.",
          "Scientists use the Celsius scale to measure temperature in degrees Celsius (°C).",
          "The Celsius scale is based on the changes of state of water and defines 0°C as the melting/freezing point of water and 100°C as the boiling point of water."
        ],
        "U": [
          "Expansion and contraction of matter can be the basis for the design of tools that measure temperature."
        ],
        "SP": [
          "Describe how a liquid thermometer works.",
          "Create a tool that measures temperature based on expansion and contraction of a liquid.",
          "Relate the melting/freezing and boiling points of water to the Celsius scale.",
          "Identify safety practices associated with measuring temperature and the use of measurement tools."
        ]
      }
    },
    {
      "id": "expansion",
      "title": "Expansion, contraction & ice",
      "short": "Expansion & ice",
      "description": "Investigate changing volume, floating ice, and structures.",
      "colour": "#4666a2",
      "source": {
        "row": 29,
        "K": [
          "Expansion is the typical response materials have to heating.",
          "Contraction is the typical response materials have to cooling.",
          "Water has the unusual property of having greater volume in solid form than in liquid form.",
          "Because of water’s unusual property, it is less dense in solid form than in liquid form.",
          "The surface of a body of water freezes when the temperature of the water drops below the freezing point.",
          "The frozen surface of a large body of water forms an insulating sheet of ice that protects aquatic life.",
          "A material’s response to temperature change requires consideration when designing and constructing infrastructure, including sidewalks bridges roads."
        ],
        "U": [
          "Most matter expands when heated and contracts when cooled."
        ],
        "SP": [
          "Conduct an investigation to demonstrate that liquid water is denser than solid water.",
          "Hypothesize the effect on aquatic life if solid water were denser than liquid water.",
          "Explain the significance of expansion or contraction in the design and construction of structures."
        ]
      }
    }
  ],
  "questions": [
    {
      "id": "particles-01",
      "group": "particles",
      "type": "single",
      "prompt": "Water warms from 10°C to 30°C without changing state. Which model best describes the change?",
      "data": {
        "options": [
          "Particles move faster and are generally farther apart.",
          "Each particle grows larger.",
          "Particles move more slowly and pack closer together.",
          "Some particles disappear."
        ]
      },
      "answer": 0,
      "explanation": "Warming increases particle motion. The particles themselves do not grow or disappear; the spacing between them generally increases.",
      "hint": "Think about what changes: the movement and spacing, or the particles themselves?",
      "refs": [
        "particles.K1",
        "particles.K2",
        "particles.U1",
        "particles.SP1"
      ],
      "visual": "particleHeat"
    },
    {
      "id": "particles-02",
      "group": "particles",
      "type": "single",
      "prompt": "Which particle model best represents a gas? Every model shows nine equal-sized particles.",
      "data": {
        "options": [
          "Model A",
          "Model B",
          "Model C",
          "Model D"
        ],
        "optionVisuals": [
          {
            "kind": "particle",
            "style": "solid"
          },
          {
            "kind": "particle",
            "style": "liquid"
          },
          {
            "kind": "particle",
            "style": "gas"
          },
          {
            "kind": "particle",
            "style": "bottom"
          }
        ],
        "optionDescriptions": [
          "Nine particles close together in regular rows.",
          "Nine particles close together in an irregular cluster.",
          "Nine particles spread throughout the container.",
          "Nine particles close together across the bottom of the container."
        ],
        "layout": "particle-image-card"
      },
      "answer": 2,
      "explanation": "Gas particles are much farther apart than particles in a solid or liquid. All four models keep the particles the same size and number.",
      "hint": "Compare the spaces between particles.",
      "refs": [
        "particles.K5",
        "particles.U1",
        "particles.SP2"
      ],
      "visual": null
    },
    {
      "id": "particles-03",
      "group": "particles",
      "type": "multi",
      "prompt": "A sample of liquid water cools from 30°C to 10°C. Select the TWO changes predicted by the particle model.",
      "data": {
        "options": [
          "Particles move more slowly.",
          "Particles become smaller.",
          "The space between particles generally decreases.",
          "The water loses particles."
        ]
      },
      "answer": [
        0,
        2
      ],
      "explanation": "As liquid water cools over this range, particles move more slowly and generally move closer together. The particles do not shrink or vanish.",
      "hint": "Compare particle speed and spacing at the two temperatures.",
      "refs": [
        "particles.K3",
        "particles.K4",
        "particles.U1",
        "particles.SP1"
      ],
      "visual": null
    },
    {
      "id": "particles-04",
      "group": "particles",
      "type": "multi",
      "prompt": "A tightly closed, leak-proof container holds ice. The ice melts. Select the THREE correct statements.",
      "data": {
        "options": [
          "The total mass of the closed container and contents stays the same.",
          "The substance changes from solid water to liquid water.",
          "The volume of the water may change.",
          "The water particles disappear when ice melts.",
          "Melting always creates a new substance."
        ],
        "photo": {
          "asset": "mass-investigations",
          "panel": 0,
          "caption": "Closed-container investigation"
        }
      },
      "answer": [
        0,
        1,
        2
      ],
      "explanation": "Melting is a phase change, not a change into a new substance. In this closed system, matter cannot enter or escape, so total mass stays the same even if volume changes.",
      "hint": "Track mass separately from state and volume.",
      "refs": [
        "particles.K5",
        "particles.K6",
        "particles.SP3"
      ],
      "visual": null
    },
    {
      "id": "particles-05",
      "group": "particles",
      "type": "dropdown",
      "prompt": "Complete the particle-model explanation.",
      "data": {
        "blanks": [
          {
            "label": "When liquid water warms from 15°C to 35°C, its particles move",
            "options": [
              "faster",
              "more slowly"
            ]
          },
          {
            "label": "The space between particles generally",
            "options": [
              "decreases",
              "increases"
            ]
          },
          {
            "label": "The particles themselves",
            "options": [
              "grow larger",
              "remain the same size"
            ]
          }
        ]
      },
      "answer": [
        "faster",
        "increases",
        "remain the same size"
      ],
      "explanation": "Heating over this temperature range increases particle motion and spacing, rather than the size of individual particles.",
      "hint": "Do not confuse particle size with the space between particles.",
      "refs": [
        "particles.K1",
        "particles.K2",
        "particles.U1",
        "particles.SP1"
      ],
      "visual": null
    },
    {
      "id": "particles-06",
      "group": "particles",
      "type": "dropdown",
      "prompt": "Complete the explanation of cooling and mass.",
      "data": {
        "blanks": [
          {
            "label": "When liquid water cools from 25°C to 10°C, particle motion becomes",
            "options": [
              "slower",
              "faster"
            ]
          },
          {
            "label": "When that water later freezes in a leak-proof closed container, total mass",
            "options": [
              "decreases",
              "increases",
              "stays the same"
            ]
          }
        ]
      },
      "answer": [
        "slower",
        "stays the same"
      ],
      "explanation": "Cooling reduces particle motion. A phase change does not change the total mass of a leak-proof closed system.",
      "hint": "Can any matter leave the container?",
      "refs": [
        "particles.K3",
        "particles.K4",
        "particles.K6",
        "particles.SP3"
      ],
      "visual": null
    },
    {
      "id": "particles-07",
      "group": "particles",
      "type": "sort",
      "prompt": "Sort these changes by whether the material is gaining or losing thermal energy.",
      "data": {
        "zones": [
          {
            "id": "gain",
            "label": "Gaining thermal energy"
          },
          {
            "id": "lose",
            "label": "Losing thermal energy"
          }
        ],
        "items": [
          {
            "id": "melt",
            "text": "Ice melts in a warm room."
          },
          {
            "id": "freeze",
            "text": "Liquid water freezes."
          },
          {
            "id": "warm",
            "text": "Water warms from 10°C to 30°C."
          },
          {
            "id": "cool",
            "text": "Water cools from 30°C to 10°C."
          }
        ]
      },
      "answer": {
        "melt": "gain",
        "freeze": "lose",
        "warm": "gain",
        "cool": "lose"
      },
      "explanation": "Melting and warming involve gaining thermal energy; freezing and cooling involve losing thermal energy. During a phase change, energy can change without the temperature rising or falling.",
      "hint": "Ask whether thermal energy is entering or leaving the material.",
      "refs": [
        "particles.K1",
        "particles.K3",
        "particles.K5",
        "particles.SP2"
      ],
      "visual": null
    },
    {
      "id": "particles-08",
      "group": "particles",
      "type": "sort",
      "prompt": "Classify each observation from a sealed-container experiment.",
      "data": {
        "zones": [
          {
            "id": "mass",
            "label": "Evidence about mass"
          },
          {
            "id": "state",
            "label": "Evidence about state"
          }
        ],
        "items": [
          {
            "id": "before",
            "text": "Container + ice: 184 g before melting."
          },
          {
            "id": "after",
            "text": "Container + water: 184 g after melting."
          },
          {
            "id": "ice",
            "text": "Solid pieces become a flowing liquid."
          },
          {
            "id": "shape",
            "text": "The water takes the shape of the container."
          }
        ],
        "photo": {
          "asset": "mass-investigations",
          "panel": 0,
          "caption": "Closed-container investigation"
        }
      },
      "answer": {
        "before": "mass",
        "after": "mass",
        "ice": "state",
        "shape": "state"
      },
      "explanation": "Equal before-and-after masses support conservation of mass. Flow and shape observations describe the change in state.",
      "hint": "Which observations came from the balance?",
      "refs": [
        "particles.K5",
        "particles.K6",
        "particles.SP3"
      ],
      "visual": null
    },
    {
      "id": "particles-09",
      "group": "particles",
      "type": "order",
      "prompt": "Put this supervised investigation into a sensible order.",
      "data": {
        "items": [
          {
            "id": "record",
            "text": "Record the mass of the closed container and ice."
          },
          {
            "id": "melt",
            "text": "Let the ice melt while the container stays closed."
          },
          {
            "id": "remeasure",
            "text": "Measure the mass of the same closed container again."
          },
          {
            "id": "compare",
            "text": "Compare the before-and-after masses."
          }
        ],
        "photo": {
          "asset": "mass-investigations",
          "panel": 0,
          "caption": "Closed-container investigation"
        }
      },
      "answer": [
        "record",
        "melt",
        "remeasure",
        "compare"
      ],
      "explanation": "Measure the same complete closed system before and after the phase change, then compare the results.",
      "hint": "You need a starting measurement before the ice melts.",
      "refs": [
        "particles.K6",
        "particles.SP3"
      ],
      "visual": null
    },
    {
      "id": "particles-10",
      "group": "particles",
      "type": "order",
      "prompt": "Order these stages as ice becomes water vapour during heating at ordinary room pressure.",
      "data": {
        "items": [
          {
            "id": "solid",
            "text": "Solid ice"
          },
          {
            "id": "melting",
            "text": "Melting: solid and liquid are present"
          },
          {
            "id": "liquid",
            "text": "Liquid water"
          },
          {
            "id": "gas",
            "text": "Water vapour after vaporization"
          }
        ]
      },
      "answer": [
        "solid",
        "melting",
        "liquid",
        "gas"
      ],
      "explanation": "As thermal energy is added, ice can melt to liquid water, which can then vaporize. Water vapour is the gas form of water.",
      "hint": "Start with the cold solid sample.",
      "refs": [
        "particles.K5",
        "particles.SP2"
      ],
      "visual": null
    },
    {
      "id": "particles-11",
      "group": "particles",
      "type": "match",
      "prompt": "Match each temperature change to its particle-model description.",
      "data": {
        "zones": [
          {
            "id": "heating",
            "label": "Warming from 10°C to 30°C"
          },
          {
            "id": "cooling",
            "label": "Cooling from 30°C to 10°C"
          }
        ],
        "items": [
          {
            "id": "fast",
            "text": "Faster motion; generally more space between particles"
          },
          {
            "id": "slow",
            "text": "Slower motion; generally less space between particles"
          }
        ]
      },
      "answer": {
        "fast": "heating",
        "slow": "cooling"
      },
      "explanation": "These descriptions apply to liquid water in the given temperature range. Motion and spacing change together.",
      "hint": "Warmer samples have more particle motion.",
      "refs": [
        "particles.K1",
        "particles.K2",
        "particles.K3",
        "particles.K4",
        "particles.U1",
        "particles.SP1"
      ],
      "visual": null
    },
    {
      "id": "particles-12",
      "group": "particles",
      "type": "match",
      "prompt": "Match each process to its change of state.",
      "data": {
        "zones": [
          {
            "id": "melt",
            "label": "Solid → liquid"
          },
          {
            "id": "freeze",
            "label": "Liquid → solid"
          },
          {
            "id": "evaporate",
            "label": "Liquid → gas"
          },
          {
            "id": "condense",
            "label": "Gas → liquid"
          }
        ],
        "items": [
          {
            "id": "a",
            "text": "Melting"
          },
          {
            "id": "b",
            "text": "Freezing"
          },
          {
            "id": "c",
            "text": "Vaporization"
          },
          {
            "id": "d",
            "text": "Condensation"
          }
        ],
        "sceneStrip": {
          "asset": "phase-change-scenes",
          "panels": [
            0,
            1,
            2,
            3
          ],
          "columns": 4,
          "groupLabel": "Illustrative water and phase-change investigation contexts",
          "caption": "Observe ice, liquid water, a kettle with visible condensed droplets, and condensation on a lid. Water vapour itself is invisible."
        }
      },
      "answer": {
        "a": "melt",
        "b": "freeze",
        "c": "evaporate",
        "d": "condense"
      },
      "explanation": "A phase-change name describes the starting state and ending state. Vaporization includes evaporation and boiling.",
      "hint": "Read each arrow from left to right.",
      "refs": [
        "particles.K5",
        "particles.SP2"
      ],
      "visual": null
    },
    {
      "id": "particles-13",
      "group": "particles",
      "type": "label",
      "prompt": "Label the four changes of state shown by arrows A–D.",
      "data": {
        "diagram": "phases",
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
          },
          {
            "id": "D",
            "label": "Arrow D"
          }
        ],
        "items": [
          {
            "id": "m",
            "text": "Melting"
          },
          {
            "id": "v",
            "text": "Vaporization"
          },
          {
            "id": "c",
            "text": "Condensation"
          },
          {
            "id": "f",
            "text": "Freezing"
          }
        ],
        "sceneStrip": {
          "asset": "phase-change-scenes",
          "panels": [
            0,
            1,
            2,
            3
          ],
          "columns": 2,
          "groupLabel": "Four original water-state context images",
          "caption": "Four water-related settings. Use the diagram arrows, not the pictures, to label each change of state."
        }
      },
      "answer": {
        "m": "A",
        "v": "B",
        "c": "C",
        "f": "D"
      },
      "explanation": "Melting and vaporization go toward less fixed arrangements. Condensation and freezing reverse those changes.",
      "hint": "Use both the start and finish of each arrow.",
      "refs": [
        "particles.K5",
        "particles.U1",
        "particles.SP2"
      ],
      "visual": null
    },
    {
      "id": "particles-14",
      "group": "particles",
      "type": "label",
      "prompt": "Label models A and B. Both show the same liquid water at different temperatures.",
      "data": {
        "diagram": "particleCompare",
        "zones": [
          {
            "id": "A",
            "label": "Model A"
          },
          {
            "id": "B",
            "label": "Model B"
          }
        ],
        "items": [
          {
            "id": "slow",
            "text": "Slower motion; particles generally closer"
          },
          {
            "id": "fast",
            "text": "Faster motion; particles generally farther apart"
          }
        ]
      },
      "answer": {
        "slow": "A",
        "fast": "B"
      },
      "explanation": "Both drawings contain the same number of equal-sized particles. Temperature changes their motion and spacing.",
      "hint": "Look at the spacing and the relative arrow lengths.",
      "refs": [
        "particles.K1",
        "particles.K2",
        "particles.K3",
        "particles.K4",
        "particles.U1",
        "particles.SP1"
      ],
      "visual": null
    },
    {
      "id": "particles-15",
      "group": "particles",
      "type": "hotspot",
      "prompt": "Select the piece of evidence that best supports conservation of mass.",
      "data": {
        "intro": "A student keeps a container closed while its ice melts.",
        "options": [
          "The ice was white before melting.",
          "The balance reads 184 g both before and after melting.",
          "The liquid water is measured at 10°C.",
          "The water takes the shape of the container."
        ],
        "sourceTitle": "Observation notes",
        "scenePair": {
          "asset": "mass-investigations",
          "panels": [
            0,
            1
          ],
          "labels": [
            "Before melting · closed",
            "After melting · still closed"
          ],
          "readings": [
            "184 g",
            "184 g"
          ]
        }
      },
      "answer": 1,
      "explanation": "A balance reading that stays the same for the same closed system is evidence that total mass is conserved.",
      "hint": "Choose a measurement of how much matter is present.",
      "refs": [
        "particles.K6",
        "particles.SP3"
      ],
      "visual": null
    },
    {
      "id": "particles-16",
      "group": "particles",
      "type": "hotspot",
      "prompt": "Select the observation that best supports the explanation that liquid particles can move past one another.",
      "data": {
        "intro": "A student compares solid ice with liquid water.",
        "options": [
          "The ice is cold.",
          "The water is colourless.",
          "The ice and water are the same substance.",
          "The water flows and takes the shape of a different container."
        ],
        "sourceTitle": "Observation notes",
        "photo": {
          "asset": "temperature-contexts",
          "panel": 2,
          "caption": "Liquid water changes container"
        }
      },
      "answer": 3,
      "explanation": "Flow and changing shape are evidence that particles in a liquid can move past one another.",
      "hint": "Choose the observation about movement and shape.",
      "refs": [
        "particles.K5",
        "particles.U1",
        "particles.SP2"
      ],
      "visual": null
    },
    {
      "id": "particles-17",
      "group": "particles",
      "type": "numeric",
      "prompt": "A closed container and its ice have a total mass of 236 g. The ice melts and nothing enters or leaves. What is the total mass afterward?",
      "data": {
        "unit": "g",
        "context": "Same closed container · before melting: 236 g",
        "photo": {
          "asset": "mass-investigations",
          "panel": 0,
          "caption": "Closed-container investigation"
        }
      },
      "answer": 236,
      "explanation": "The total mass remains 236 g because the closed system keeps all its matter.",
      "hint": "A change of state does not remove matter.",
      "refs": [
        "particles.K6",
        "particles.SP3"
      ],
      "visual": null
    },
    {
      "id": "particles-18",
      "group": "particles",
      "type": "numeric",
      "prompt": "Water evaporates from an open container. How much mass leaves the container as water vapour?",
      "data": {
        "unit": "g",
        "context": "No water is spilled. Nothing else enters or leaves the container.",
        "table": {
          "caption": "Example balance readings · container and water",
          "headers": [
            "When",
            "Total mass (g)"
          ],
          "rows": [
            [
              "Before evaporation",
              "175"
            ],
            [
              "After evaporation",
              "162"
            ]
          ]
        },
        "scenePair": {
          "asset": "mass-investigations",
          "panels": [
            2,
            3
          ],
          "labels": [
            "Before evaporation · open",
            "After evaporation · open"
          ],
          "readings": [
            "175 g",
            "162 g"
          ]
        }
      },
      "answer": 13,
      "explanation": "175 − 162 = 13 g of water leaves as vapour. The matter has moved into the surrounding air; it has not been destroyed.",
      "hint": "Compare the two balance readings. Include the vapour when thinking about conservation of mass.",
      "refs": [
        "particles.K5",
        "particles.K6",
        "particles.SP3"
      ],
      "visual": null,
      "revision": 2
    },
    {
      "id": "temperature-01",
      "group": "temperature",
      "type": "single",
      "prompt": "Why does the liquid level rise in a typical liquid thermometer when it warms?",
      "data": {
        "options": [
          "More liquid is created.",
          "The glass turns into liquid.",
          "The liquid expands and rises in the narrow tube.",
          "The liquid particles become larger."
        ]
      },
      "answer": 2,
      "explanation": "The thermometer liquid expands when warmed, so it takes up more space and rises in the narrow tube.",
      "hint": "Think about volume, not the creation of liquid.",
      "refs": [
        "temperature.K1",
        "temperature.U1",
        "temperature.SP1"
      ],
      "visual": "thermoResponse"
    },
    {
      "id": "temperature-02",
      "group": "temperature",
      "type": "single",
      "prompt": "Which thermometer shows 30°C? Each small interval is 5°C.",
      "data": {
        "options": [
          "Thermometer A",
          "Thermometer B",
          "Thermometer C",
          "Thermometer D"
        ],
        "optionVisuals": [
          {
            "kind": "thermo",
            "min": 0,
            "max": 40,
            "step": 5,
            "value": 10
          },
          {
            "kind": "thermo",
            "min": 0,
            "max": 40,
            "step": 5,
            "value": 30
          },
          {
            "kind": "thermo",
            "min": 0,
            "max": 40,
            "step": 5,
            "value": 20
          },
          {
            "kind": "thermo",
            "min": 0,
            "max": 40,
            "step": 5,
            "value": 40
          }
        ],
        "photo": {
          "asset": "thermometer-study",
          "panel": 0,
          "caption": "An example temperature probe in an ice bath. Read the separate calibrated models below."
        }
      },
      "answer": 1,
      "explanation": "Thermometer B has its liquid level at the 30°C mark. Read the scale at the top of the coloured liquid column.",
      "hint": "Find the 30°C mark on each scale.",
      "refs": [
        "temperature.K2",
        "temperature.SP3"
      ],
      "visual": null
    },
    {
      "id": "temperature-03",
      "group": "temperature",
      "type": "multi",
      "prompt": "Select the THREE suitable safety practices for a classroom temperature investigation.",
      "data": {
        "options": [
          "Use a thermometer appropriate for the expected temperature range.",
          "Follow teacher instructions and check equipment for damage.",
          "Stir vigorously with the thermometer.",
          "Use suitable protection and a safe holder when handling warm containers.",
          "Hold a hot container still with bare hands while measuring."
        ],
        "photo": {
          "asset": "temperature-contexts",
          "panel": 0,
          "caption": "Classroom thermometer setup"
        }
      },
      "answer": [
        0,
        1,
        3
      ],
      "explanation": "Use an appropriate, undamaged thermometer and supervised handling procedures. Use protection or a holder for warm containers. A thermometer is not a stirrer.",
      "hint": "Choose practices that protect people and the measuring tool.",
      "refs": [
        "temperature.SP4"
      ],
      "visual": null
    },
    {
      "id": "temperature-04",
      "group": "temperature",
      "type": "multi",
      "prompt": "At standard atmospheric pressure, select the TWO correct Celsius reference points for pure water.",
      "data": {
        "options": [
          "Melting/freezing: 0°C",
          "Melting/freezing: 32°C",
          "Boiling: 100°C",
          "Boiling: 212°C"
        ]
      },
      "answer": [
        0,
        2
      ],
      "explanation": "The Celsius reference points for pure water are 0°C for melting/freezing and approximately 100°C for boiling at standard atmospheric pressure. The 100°C reference assumes about sea-level air pressure; water can boil at a lower temperature at higher elevations.",
      "hint": "The question asks for Celsius, not Fahrenheit.",
      "refs": [
        "temperature.K2",
        "temperature.K3",
        "temperature.SP3"
      ],
      "visual": null
    },
    {
      "id": "temperature-05",
      "group": "temperature",
      "type": "dropdown",
      "prompt": "Explain how a liquid thermometer responds.",
      "data": {
        "blanks": [
          {
            "label": "When the thermometer warms, its liquid generally",
            "options": [
              "expands",
              "contracts"
            ]
          },
          {
            "label": "The liquid level in its tube",
            "options": [
              "rises",
              "falls"
            ]
          },
          {
            "label": "The scale reports the temperature in",
            "options": [
              "grams",
              "degrees Celsius",
              "millilitres"
            ]
          }
        ]
      },
      "answer": [
        "expands",
        "rises",
        "degrees Celsius"
      ],
      "explanation": "Warming expands the liquid and raises its level. A Celsius scale converts the level to a temperature reading.",
      "hint": "Expansion changes the space the liquid occupies.",
      "refs": [
        "temperature.K1",
        "temperature.K2",
        "temperature.U1",
        "temperature.SP1"
      ],
      "visual": null
    },
    {
      "id": "temperature-06",
      "group": "temperature",
      "type": "dropdown",
      "prompt": "Complete the Celsius reference-point statements.",
      "data": {
        "blanks": [
          {
            "label": "Pure water melts/freezes at approximately",
            "options": [
              "0°C",
              "10°C",
              "100°C"
            ]
          },
          {
            "label": "At standard atmospheric pressure, pure water boils at approximately",
            "options": [
              "0°C",
              "50°C",
              "100°C"
            ]
          }
        ]
      },
      "answer": [
        "0°C",
        "100°C"
      ],
      "explanation": "These reference points anchor the Celsius scale. Actual boiling temperature varies with air pressure. The 100°C reference assumes about sea-level air pressure; water can boil at a lower temperature at higher elevations.",
      "hint": "Think of the two water reference points used for Celsius.",
      "refs": [
        "temperature.K2",
        "temperature.K3",
        "temperature.SP3"
      ],
      "visual": null
    },
    {
      "id": "temperature-07",
      "group": "temperature",
      "type": "sort",
      "prompt": "Classify these readings of pure water at standard atmospheric pressure.",
      "data": {
        "zones": [
          {
            "id": "freeze",
            "label": "Melting/freezing point"
          },
          {
            "id": "boil",
            "label": "Boiling point"
          },
          {
            "id": "between",
            "label": "Between those points"
          }
        ],
        "items": [
          {
            "id": "zero",
            "text": "0°C"
          },
          {
            "id": "hundred",
            "text": "100°C"
          },
          {
            "id": "twenty",
            "text": "20°C"
          },
          {
            "id": "sixty",
            "text": "60°C"
          }
        ]
      },
      "answer": {
        "zero": "freeze",
        "hundred": "boil",
        "twenty": "between",
        "sixty": "between"
      },
      "explanation": "0°C and 100°C are the reference points. 20°C and 60°C fall between them. The 100°C reference assumes about sea-level air pressure; water can boil at a lower temperature at higher elevations.",
      "hint": "Compare each reading with 0 and 100.",
      "refs": [
        "temperature.K2",
        "temperature.K3",
        "temperature.SP3"
      ],
      "visual": null
    },
    {
      "id": "temperature-08",
      "group": "temperature",
      "type": "sort",
      "prompt": "Sort actions for using a glass liquid thermometer.",
      "data": {
        "zones": [
          {
            "id": "safe",
            "label": "Suitable practice"
          },
          {
            "id": "unsafe",
            "label": "Unsafe practice"
          }
        ],
        "items": [
          {
            "id": "inspect",
            "text": "Check the thermometer for cracks before use."
          },
          {
            "id": "stir",
            "text": "Use the thermometer to stir."
          },
          {
            "id": "hold",
            "text": "Use the holder and follow teacher instructions."
          },
          {
            "id": "hot",
            "text": "Touch a hot container with bare hands."
          }
        ],
        "photo": {
          "asset": "temperature-contexts",
          "panel": 0,
          "caption": "Classroom thermometer setup"
        }
      },
      "answer": {
        "inspect": "safe",
        "stir": "unsafe",
        "hold": "safe",
        "hot": "unsafe"
      },
      "explanation": "Inspect equipment, use safe holders, and follow teacher directions. A glass thermometer can break if used as a stirrer.",
      "hint": "A measuring tool should be handled for its intended purpose.",
      "refs": [
        "temperature.SP4"
      ],
      "visual": null
    },
    {
      "id": "temperature-09",
      "group": "temperature",
      "type": "order",
      "prompt": "Order these steps for reading a thermometer safely in a supervised water investigation.",
      "data": {
        "items": [
          {
            "id": "check",
            "text": "Check the tool and follow the teacher's setup instructions."
          },
          {
            "id": "place",
            "text": "Use the holder to suspend the bulb in the water, clear of the container's bottom and sides."
          },
          {
            "id": "wait",
            "text": "Wait until the reading becomes steady."
          },
          {
            "id": "read",
            "text": "Read the liquid level at eye height and record °C."
          }
        ],
        "photo": {
          "asset": "temperature-contexts",
          "panel": 0,
          "caption": "Classroom thermometer setup"
        }
      },
      "answer": [
        "check",
        "place",
        "wait",
        "read"
      ],
      "explanation": "Suspend the bulb in the water without touching the container, wait for a steady level, then read at eye height. Contact with the container or viewing at an angle can affect the reading.",
      "hint": "The measurement comes after the liquid level settles.",
      "refs": [
        "temperature.K1",
        "temperature.K2",
        "temperature.SP4"
      ],
      "visual": null
    },
    {
      "id": "temperature-10",
      "group": "temperature",
      "type": "order",
      "prompt": "Order the explanation of a typical liquid thermometer placed in warmer water.",
      "data": {
        "items": [
          {
            "id": "energy",
            "text": "Thermal energy transfers from the warmer water to the thermometer."
          },
          {
            "id": "expand",
            "text": "The thermometer liquid warms and expands."
          },
          {
            "id": "rise",
            "text": "The liquid level rises in the narrow tube."
          },
          {
            "id": "read",
            "text": "The scale indicates a higher temperature."
          }
        ]
      },
      "answer": [
        "energy",
        "expand",
        "rise",
        "read"
      ],
      "explanation": "A change in temperature causes expansion; expansion moves the liquid level; the scale lets us read the temperature.",
      "hint": "Begin with what causes the liquid to warm.",
      "refs": [
        "temperature.K1",
        "temperature.U1",
        "temperature.SP1"
      ],
      "visual": null
    },
    {
      "id": "temperature-11",
      "group": "temperature",
      "type": "match",
      "prompt": "Match each part of the thermometer to its role.",
      "data": {
        "zones": [
          {
            "id": "bulb",
            "label": "Bulb / reservoir"
          },
          {
            "id": "tube",
            "label": "Narrow tube"
          },
          {
            "id": "scale",
            "label": "Marked scale"
          }
        ],
        "items": [
          {
            "id": "holds",
            "text": "Holds most of the thermometer liquid"
          },
          {
            "id": "level",
            "text": "Makes the level change easy to see"
          },
          {
            "id": "value",
            "text": "Connects the liquid level to a temperature value"
          }
        ],
        "photo": {
          "asset": "temperature-contexts",
          "panel": 0,
          "caption": "Glass-liquid thermometer in a beaker. Identify how its parts help show temperature."
        }
      },
      "answer": {
        "holds": "bulb",
        "level": "tube",
        "value": "scale"
      },
      "explanation": "The reservoir holds liquid, the narrow tube shows a visible level change, and the scale assigns temperature values.",
      "hint": "Which part supplies the numbers?",
      "refs": [
        "temperature.K1",
        "temperature.U1",
        "temperature.SP1",
        "temperature.SP2"
      ],
      "visual": null
    },
    {
      "id": "temperature-12",
      "group": "temperature",
      "type": "match",
      "prompt": "Match the observation to the explanation.",
      "data": {
        "zones": [
          {
            "id": "warm",
            "label": "Thermometer is warming"
          },
          {
            "id": "cool",
            "label": "Thermometer is cooling"
          }
        ],
        "items": [
          {
            "id": "a",
            "text": "Liquid expands; its level rises"
          },
          {
            "id": "b",
            "text": "Liquid contracts; its level falls"
          }
        ]
      },
      "answer": {
        "a": "warm",
        "b": "cool"
      },
      "explanation": "The liquid level responds to expansion and contraction as its temperature changes.",
      "hint": "A lower volume fits lower in the tube.",
      "refs": [
        "temperature.K1",
        "temperature.U1",
        "temperature.SP1"
      ],
      "visual": null
    },
    {
      "id": "temperature-13",
      "group": "temperature",
      "type": "label",
      "prompt": "Label parts A, B, and C on the thermometer.",
      "data": {
        "diagram": "thermometerParts",
        "zones": [
          {
            "id": "A",
            "label": "Part A"
          },
          {
            "id": "B",
            "label": "Part B"
          },
          {
            "id": "C",
            "label": "Part C"
          }
        ],
        "items": [
          {
            "id": "bulb",
            "text": "Bulb / reservoir"
          },
          {
            "id": "tube",
            "text": "Narrow tube"
          },
          {
            "id": "scale",
            "text": "Celsius scale"
          }
        ],
        "photo": {
          "asset": "temperature-contexts",
          "panel": 0,
          "caption": "Classroom thermometer setup"
        }
      },
      "answer": {
        "bulb": "A",
        "tube": "B",
        "scale": "C"
      },
      "explanation": "The bulb holds liquid, the tube shows level changes, and the marked scale gives temperature readings.",
      "hint": "Look at the location of each letter.",
      "refs": [
        "temperature.K1",
        "temperature.K2",
        "temperature.U1",
        "temperature.SP1"
      ],
      "visual": null
    },
    {
      "id": "temperature-14",
      "group": "temperature",
      "type": "label",
      "prompt": "At standard atmospheric pressure, place the water reference-point labels on the Celsius scale.",
      "data": {
        "diagram": "celsiusReference",
        "zones": [
          {
            "id": "A",
            "label": "Mark A"
          },
          {
            "id": "B",
            "label": "Mark B"
          }
        ],
        "items": [
          {
            "id": "boil",
            "text": "Boiling: about 100°C"
          },
          {
            "id": "freeze",
            "text": "Melting/freezing: about 0°C"
          }
        ]
      },
      "answer": {
        "boil": "A",
        "freeze": "B"
      },
      "explanation": "At standard atmospheric pressure, pure water boils at about 100°C and melts/freezes at about 0°C. The 100°C reference assumes about sea-level air pressure; water can boil at a lower temperature at higher elevations.",
      "hint": "The higher reference temperature belongs at the higher mark.",
      "refs": [
        "temperature.K2",
        "temperature.K3",
        "temperature.SP3"
      ],
      "visual": null
    },
    {
      "id": "temperature-15",
      "group": "temperature",
      "type": "hotspot",
      "prompt": "Select the observation that best shows expansion in a model liquid thermometer.",
      "data": {
        "intro": "The same model thermometer is moved from cool water to warmer water. No liquid is added.",
        "options": [
          "The coloured-liquid level rises in the narrow tube.",
          "The thermometer's total mass stays the same.",
          "The surrounding water is warmer.",
          "The glass tube remains unbroken."
        ],
        "sourceTitle": "Observation notes",
        "photo": {
          "asset": "temperature-contexts",
          "panel": 1,
          "caption": "Liquid-expansion model"
        }
      },
      "answer": 0,
      "explanation": "With no liquid added, the higher level is evidence that the warmed liquid occupies more volume.",
      "hint": "Which observation involves a volume change?",
      "refs": [
        "temperature.K1",
        "temperature.U1",
        "temperature.SP1",
        "temperature.SP2"
      ],
      "visual": null
    },
    {
      "id": "temperature-16",
      "group": "temperature",
      "type": "hotspot",
      "prompt": "Select the feature that would make a model thermometer easier to read.",
      "data": {
        "intro": "A class is designing a supervised model that shows the expansion of a liquid.",
        "options": [
          "An opaque, narrow tube beside a marked scale.",
          "A clear, wide bowl with no reference marks.",
          "A clear, narrow tube beside a marked scale.",
          "A clear, narrow tube with no fixed reference marks."
        ],
        "sourceTitle": "Design proposals",
        "photo": {
          "asset": "temperature-contexts",
          "panel": 1,
          "caption": "Liquid-expansion model"
        }
      },
      "answer": 2,
      "explanation": "A narrow transparent tube makes a small volume change easier to see, and a scale gives reference values. Follow the teacher's safe model-building instructions.",
      "hint": "The design must make a small change visible.",
      "refs": [
        "temperature.K1",
        "temperature.U1",
        "temperature.SP2",
        "temperature.SP4"
      ],
      "visual": null
    },
    {
      "id": "temperature-17",
      "group": "temperature",
      "type": "numeric",
      "prompt": "Read the thermometer. Each small interval is 5°C.",
      "data": {
        "unit": "°C",
        "context": "Read the top of the red liquid column.",
        "thermo": {
          "min": 0,
          "max": 50,
          "step": 5,
          "value": 25
        }
      },
      "answer": 25,
      "explanation": "The liquid level is halfway between 20°C and 30°C, at 25°C.",
      "hint": "Count the 5-degree intervals from 20°C.",
      "refs": [
        "temperature.K2",
        "temperature.SP3"
      ],
      "visual": "reading"
    },
    {
      "id": "temperature-18",
      "group": "temperature",
      "type": "numeric",
      "prompt": "Read the outdoor thermometer. Each small interval is 2°C.",
      "data": {
        "unit": "°C",
        "context": "Read the top of the red liquid column.",
        "thermo": {
          "min": -10,
          "max": 20,
          "step": 2,
          "labelEvery": 10,
          "value": -4
        }
      },
      "answer": -4,
      "explanation": "The liquid ends two 2-degree intervals below 0°C: −2°C, then −4°C. Include the minus sign.",
      "hint": "Find 0°C first. Is the top of the liquid above or below it?",
      "refs": [
        "temperature.K2",
        "temperature.SP3"
      ],
      "visual": "reading",
      "revision": 2
    },
    {
      "id": "expansion-01",
      "group": "expansion",
      "type": "single",
      "prompt": "Why are expansion gaps included in many bridges?",
      "data": {
        "options": [
          "They allow materials to expand and contract as temperature changes.",
          "They prevent the bridge sections from changing length.",
          "They remove the need to allow for temperature changes.",
          "They are needed only when the bridge material melts."
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 0,
          "caption": "Bridge expansion joint"
        }
      },
      "answer": 0,
      "explanation": "Most construction materials expand when heated and contract when cooled. A designed gap allows movement and reduces damage.",
      "hint": "Think about what a long structure does on a hot day.",
      "refs": [
        "expansion.K1",
        "expansion.K2",
        "expansion.K7",
        "expansion.U1",
        "expansion.SP3"
      ],
      "visual": "bridge"
    },
    {
      "id": "expansion-02",
      "group": "expansion",
      "type": "single",
      "prompt": "Which equal-mass model shows what happens to pure water's volume when it freezes near 0°C?",
      "data": {
        "options": [
          "Model A",
          "Model B",
          "Model C",
          "Model D"
        ],
        "optionVisuals": [
          {
            "kind": "volume",
            "ice": 50
          },
          {
            "kind": "volume",
            "ice": 90
          },
          {
            "kind": "volume",
            "ice": 70
          },
          {
            "kind": "volume",
            "ice": 25
          }
        ],
        "optionDescriptions": [
          "Equal masses: the ice occupies a smaller volume than the liquid water.",
          "Equal masses: the ice occupies a larger volume than the liquid water.",
          "Equal masses: the ice and liquid water occupy the same volume.",
          "Equal masses: the ice occupies a very small volume compared with the liquid water."
        ],
        "sceneStrip": {
          "asset": "equal-mass-ice-water",
          "panels": [
            0,
            1
          ],
          "columns": 2,
          "groupLabel": "Ice and water beakers, illustrative only",
          "caption": "Illustrative beakers; their pictured levels are not measurements. Compare the four equal-mass scientific models below."
        }
      },
      "answer": 1,
      "explanation": "Model B shows a larger volume for the same mass of water when frozen. The same mass occupies more space as ice, so its density is lower.",
      "hint": "Compare equal masses. Which model gives the ice more space?",
      "refs": [
        "expansion.K3",
        "expansion.K4",
        "expansion.SP1"
      ],
      "visual": null
    },
    {
      "id": "expansion-03",
      "group": "expansion",
      "type": "multi",
      "prompt": "Select the THREE statements that explain the effect of surface ice on a lake.",
      "data": {
        "options": [
          "Solid water is less dense than liquid water near freezing.",
          "Ice that forms stays at the surface because it floats.",
          "The surface ice helps insulate the water underneath.",
          "Ice always makes the entire lake freeze solid immediately.",
          "Freezing creates extra water particles."
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 1,
          "caption": "Surface ice on a lake"
        }
      },
      "answer": [
        0,
        1,
        2
      ],
      "explanation": "Surface water can cool to its freezing point. The ice that forms is less dense than liquid water, so it floats and helps slow heat loss from the water below. Some water can remain liquid; conditions vary among lakes.",
      "hint": "Connect floating ice with insulation.",
      "refs": [
        "expansion.K4",
        "expansion.K5",
        "expansion.K6",
        "expansion.SP2"
      ],
      "visual": "ice"
    },
    {
      "id": "expansion-04",
      "group": "expansion",
      "type": "multi",
      "prompt": "Select the TWO observations that directly show bridge material expanding as it warms.",
      "data": {
        "options": [
          "A bridge joint has a smaller gap on a warmer day.",
          "A bridge section keeps the same total mass when warmed.",
          "A metal section becomes slightly longer when warmed.",
          "A thermometer beside the bridge shows a higher temperature."
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 0,
          "caption": "Bridge expansion joint"
        }
      },
      "answer": [
        0,
        2
      ],
      "explanation": "A narrower joint gap and a longer metal section show increased size. A temperature reading alone does not measure expansion, and unchanged mass does not show a size change.",
      "hint": "Choose observations caused by temperature changes.",
      "refs": [
        "expansion.K1",
        "expansion.K2",
        "expansion.K7",
        "expansion.SP3"
      ],
      "visual": null
    },
    {
      "id": "expansion-05",
      "group": "expansion",
      "type": "dropdown",
      "prompt": "Explain floating ice.",
      "data": {
        "blanks": [
          {
            "label": "When liquid water freezes, its volume",
            "options": [
              "increases",
              "decreases"
            ]
          },
          {
            "label": "For the same mass, its density becomes",
            "options": [
              "lower",
              "higher"
            ]
          },
          {
            "label": "This causes ice to",
            "options": [
              "float on liquid water",
              "sink below liquid water"
            ]
          }
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 1,
          "caption": "Surface ice on a lake"
        }
      },
      "answer": [
        "increases",
        "lower",
        "float on liquid water"
      ],
      "explanation": "Freezing increases the volume of pure water. With the same mass in more space, ice is less dense and floats.",
      "hint": "Density compares mass with volume.",
      "refs": [
        "expansion.K3",
        "expansion.K4",
        "expansion.SP1"
      ],
      "visual": null
    },
    {
      "id": "expansion-06",
      "group": "expansion",
      "type": "dropdown",
      "prompt": "Explain temperature changes in a bridge.",
      "data": {
        "blanks": [
          {
            "label": "On warming, most bridge materials",
            "options": [
              "expand",
              "contract"
            ]
          },
          {
            "label": "On cooling, most bridge materials",
            "options": [
              "expand",
              "contract"
            ]
          },
          {
            "label": "A designed gap provides room for",
            "options": [
              "these size changes",
              "particles to escape"
            ]
          }
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 0,
          "caption": "Bridge expansion joint"
        }
      },
      "answer": [
        "expand",
        "contract",
        "these size changes"
      ],
      "explanation": "Expansion joints allow temperature-related size changes while helping prevent buckling or cracking.",
      "hint": "The material keeps its particles while its dimensions change.",
      "refs": [
        "expansion.K1",
        "expansion.K2",
        "expansion.K7",
        "expansion.U1",
        "expansion.SP3"
      ],
      "visual": "bridge"
    },
    {
      "id": "expansion-07",
      "group": "expansion",
      "type": "sort",
      "prompt": "Sort these typical responses to temperature change.",
      "data": {
        "zones": [
          {
            "id": "expand",
            "label": "Expansion"
          },
          {
            "id": "contract",
            "label": "Contraction"
          }
        ],
        "items": [
          {
            "id": "warmmetal",
            "text": "A metal bridge section becomes warmer."
          },
          {
            "id": "coolmetal",
            "text": "A metal bridge section becomes cooler."
          },
          {
            "id": "warmair",
            "text": "Air in a flexible balloon warms."
          },
          {
            "id": "coolair",
            "text": "Air in a flexible balloon cools."
          }
        ]
      },
      "answer": {
        "warmmetal": "expand",
        "coolmetal": "contract",
        "warmair": "expand",
        "coolair": "contract"
      },
      "explanation": "Most materials expand on warming and contract on cooling. Freezing water is an important exception to the simple cooling pattern.",
      "hint": "These examples involve typical materials and no change of state.",
      "refs": [
        "expansion.K1",
        "expansion.K2",
        "expansion.U1"
      ],
      "visual": null
    },
    {
      "id": "expansion-08",
      "group": "expansion",
      "type": "sort",
      "prompt": "Compare freezing water with the typical response of most materials to cooling.",
      "data": {
        "zones": [
          {
            "id": "typical",
            "label": "Typical cooling response"
          },
          {
            "id": "water",
            "label": "Water freezing near 0°C"
          }
        ],
        "items": [
          {
            "id": "less",
            "text": "Volume generally decreases."
          },
          {
            "id": "more",
            "text": "Volume increases during freezing."
          },
          {
            "id": "contract",
            "text": "The material contracts."
          },
          {
            "id": "float",
            "text": "The solid is less dense than its liquid near freezing."
          }
        ]
      },
      "answer": {
        "less": "typical",
        "more": "water",
        "contract": "typical",
        "float": "water"
      },
      "explanation": "Water expands as it freezes, so the solid is less dense. This differs from the typical contraction of materials on cooling.",
      "hint": "Water's freezing behaviour is the exception in this comparison.",
      "refs": [
        "expansion.K1",
        "expansion.K2",
        "expansion.K3",
        "expansion.K4",
        "expansion.U1"
      ],
      "visual": null
    },
    {
      "id": "expansion-09",
      "group": "expansion",
      "type": "order",
      "prompt": "Order this supervised investigation of freezing water.",
      "data": {
        "items": [
          {
            "id": "mark",
            "text": "Record the water's mass and volume in suitable freezer-safe equipment with expansion space."
          },
          {
            "id": "freeze",
            "text": "Freeze the sample without losing any water."
          },
          {
            "id": "compare",
            "text": "Measure the ice's mass and volume, accounting for the same container."
          },
          {
            "id": "conclude",
            "text": "Use the unchanged mass and larger volume to explain the lower density of ice."
          }
        ],
        "photo": {
          "asset": "temperature-contexts",
          "panel": 3,
          "caption": "Container with room for expansion"
        }
      },
      "answer": [
        "mark",
        "freeze",
        "compare",
        "conclude"
      ],
      "explanation": "Record both mass and volume before and after freezing without losing water. An unchanged mass with increased volume supports the conclusion that ice has lower density. Use a teacher-approved method and suitable expansion space.",
      "hint": "The initial liquid measurement must come first.",
      "refs": [
        "expansion.K3",
        "expansion.K4",
        "expansion.SP1"
      ],
      "visual": null
    },
    {
      "id": "expansion-10",
      "group": "expansion",
      "type": "order",
      "prompt": "Order this explanation of how surface ice can help aquatic life.",
      "data": {
        "items": [
          {
            "id": "cool",
            "text": "Water at the lake surface cools to its freezing point."
          },
          {
            "id": "ice",
            "text": "Ice forms and floats because it is less dense."
          },
          {
            "id": "layer",
            "text": "A surface layer of ice helps insulate the water underneath."
          },
          {
            "id": "life",
            "text": "Some water below can remain liquid, supporting aquatic life."
          }
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 1,
          "caption": "Surface ice on a lake"
        }
      },
      "answer": [
        "cool",
        "ice",
        "layer",
        "life"
      ],
      "explanation": "The lower density of ice lets it remain at the surface, where it helps insulate liquid water below. Conditions differ among lakes and winters.",
      "hint": "Start with cooling, then connect floating ice with insulation.",
      "refs": [
        "expansion.K4",
        "expansion.K5",
        "expansion.K6",
        "expansion.SP2"
      ],
      "visual": "ice"
    },
    {
      "id": "expansion-11",
      "group": "expansion",
      "type": "match",
      "prompt": "Match each temperature change to its effect on the joint.",
      "data": {
        "zones": [
          {
            "id": "narrow",
            "label": "Joint gap becomes narrower"
          },
          {
            "id": "wide",
            "label": "Joint gap becomes wider"
          }
        ],
        "items": [
          {
            "id": "bridgewarm",
            "text": "Bridge sections warm and expand toward the joint."
          },
          {
            "id": "bridgecool",
            "text": "Bridge sections cool and contract away from the joint."
          },
          {
            "id": "walkwarm",
            "text": "Concrete sidewalk sections warm and expand toward the joint."
          }
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 0,
          "caption": "Bridge expansion joint"
        }
      },
      "answer": {
        "bridgewarm": "narrow",
        "bridgecool": "wide",
        "walkwarm": "narrow"
      },
      "explanation": "Expanding sections take up more of the gap. Contracting sections leave more space. Engineers allow for these movements when designing joints.",
      "hint": "Follow the movement of the ends of the sections.",
      "refs": [
        "expansion.K7",
        "expansion.SP3"
      ],
      "visual": null,
      "revision": 2
    },
    {
      "id": "expansion-12",
      "group": "expansion",
      "type": "match",
      "prompt": "Match each observation to its explanation.",
      "data": {
        "zones": [
          {
            "id": "density",
            "label": "Ice has lower density than water near freezing"
          },
          {
            "id": "insulation",
            "label": "Surface ice helps slow heat loss"
          }
        ],
        "items": [
          {
            "id": "float",
            "text": "An ice cube floats in liquid water."
          },
          {
            "id": "liquid",
            "text": "Water can remain liquid beneath lake ice."
          }
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 1,
          "caption": "Surface ice on a lake"
        }
      },
      "answer": {
        "float": "density",
        "liquid": "insulation"
      },
      "explanation": "Lower density explains floating; insulation helps explain why water beneath surface ice can remain liquid.",
      "hint": "These observations have related but different explanations.",
      "refs": [
        "expansion.K4",
        "expansion.K5",
        "expansion.K6",
        "expansion.SP1",
        "expansion.SP2"
      ],
      "visual": "ice"
    },
    {
      "id": "expansion-13",
      "group": "expansion",
      "type": "label",
      "prompt": "The same bridge joint is shown at two temperatures. Label views A and B.",
      "data": {
        "diagram": "bridgeCompare",
        "zones": [
          {
            "id": "A",
            "label": "View A"
          },
          {
            "id": "B",
            "label": "View B"
          }
        ],
        "items": [
          {
            "id": "cool",
            "text": "Cooler bridge: sections contract"
          },
          {
            "id": "warm",
            "text": "Warmer bridge: sections expand"
          }
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 0,
          "caption": "Bridge expansion joint"
        },
        "sceneStrip": {
          "asset": "bridge-joint-seasons",
          "panels": [
            0,
            1
          ],
          "columns": 1,
          "groupLabel": "Bridge in contrasting weather conditions",
          "caption": "Examples of a bridge in different weather. The separate model uses exaggerated gap sizes."
        }
      },
      "answer": {
        "cool": "A",
        "warm": "B"
      },
      "explanation": "When bridge sections expand, they take up more of the available space and the gap narrows. Cooling reverses the pattern.",
      "hint": "Follow the change in the section lengths.",
      "refs": [
        "expansion.K1",
        "expansion.K2",
        "expansion.K7",
        "expansion.U1",
        "expansion.SP3"
      ],
      "visual": null
    },
    {
      "id": "expansion-14",
      "group": "expansion",
      "type": "label",
      "prompt": "Label the lake cross-section.",
      "data": {
        "diagram": "lake",
        "zones": [
          {
            "id": "A",
            "label": "Region A"
          },
          {
            "id": "B",
            "label": "Region B"
          }
        ],
        "items": [
          {
            "id": "ice",
            "text": "Ice: lower density, helps insulate"
          },
          {
            "id": "liquid",
            "text": "Liquid water: habitat below the ice"
          }
        ],
        "photo": {
          "asset": "matter-contexts",
          "panel": 1,
          "caption": "Surface ice on a lake"
        }
      },
      "answer": {
        "ice": "A",
        "liquid": "B"
      },
      "explanation": "Ice floats at the surface and helps insulate water below. Liquid water provides a habitat for aquatic life.",
      "hint": "Which part floats, and which part provides the liquid habitat?",
      "refs": [
        "expansion.K4",
        "expansion.K5",
        "expansion.K6",
        "expansion.SP2"
      ],
      "visual": null
    },
    {
      "id": "expansion-15",
      "group": "expansion",
      "type": "hotspot",
      "prompt": "Select the observation that best supports the claim that ice is less dense than liquid water.",
      "data": {
        "intro": "Students compare equal masses of ice and liquid water near 0°C.",
        "options": [
          "Both samples are measured near 0°C.",
          "The ice occupies more volume than the liquid water.",
          "Both samples contain water.",
          "The balance confirms that the two masses are equal."
        ],
        "sourceTitle": "Observation notes"
      },
      "answer": 1,
      "explanation": "With equal masses, the sample occupying more volume has lower density. That is why this observation supports the claim.",
      "hint": "A fair density comparison must consider both mass and volume.",
      "refs": [
        "expansion.K3",
        "expansion.K4",
        "expansion.SP1"
      ],
      "visual": null
    },
    {
      "id": "expansion-16",
      "group": "expansion",
      "type": "hotspot",
      "prompt": "Select the most reasonable prediction if solid water were denser than liquid water.",
      "data": {
        "intro": "Imagine a world in which ice sinks instead of floating.",
        "options": [
          "A floating surface ice layer would always form normally.",
          "Aquatic life would have exactly the same protection.",
          "Sinking ice could reduce the insulating surface layer and allow more water to freeze.",
          "Water could never freeze."
        ],
        "sourceTitle": "Possible predictions",
        "photo": {
          "asset": "matter-contexts",
          "panel": 1,
          "caption": "Surface ice on a lake"
        }
      },
      "answer": 2,
      "explanation": "If ice sank, the usual floating insulating layer would be reduced or absent. That could allow more cooling and freezing, affecting aquatic habitats.",
      "hint": "Think about what happens to the insulating layer if ice sinks.",
      "refs": [
        "expansion.K4",
        "expansion.K6",
        "expansion.SP2"
      ],
      "visual": null
    },
    {
      "id": "expansion-17",
      "group": "expansion",
      "type": "numeric",
      "prompt": "The same water sample is measured before and after freezing. By how much does its volume increase?",
      "data": {
        "unit": "mL",
        "table": {
          "caption": "Example measurements · no water lost",
          "headers": [
            "State",
            "Mass (g)",
            "Volume (mL)"
          ],
          "rows": [
            [
              "Liquid water",
              "100",
              "100"
            ],
            [
              "Ice",
              "100",
              "109"
            ]
          ]
        }
      },
      "answer": 9,
      "explanation": "109 − 100 = 9 mL. The mass stays 100 g, but the ice takes up more space. Equal mass in a larger volume means lower density.",
      "hint": "Subtract the liquid volume from the ice volume. The masses are equal.",
      "refs": [
        "expansion.K3",
        "expansion.K4",
        "expansion.SP1"
      ],
      "visual": null,
      "revision": 2
    },
    {
      "id": "expansion-18",
      "group": "expansion",
      "type": "numeric",
      "prompt": "Two model bridge sections have a 12 mm gap between them. Warming makes each section expand 2 mm into the gap. How wide is the gap afterward?",
      "data": {
        "unit": "mm",
        "photo": {
          "asset": "matter-contexts",
          "panel": 0,
          "caption": "Bridge expansion joint"
        }
      },
      "answer": 8,
      "explanation": "Both sections expand into the gap: 12 − 2 − 2 = 8 mm. This models why engineers allow space for expansion.",
      "hint": "Account for the movement from BOTH sides.",
      "refs": [
        "expansion.K1",
        "expansion.K7",
        "expansion.SP3"
      ],
      "visual": "bridgeMeasured"
    }
  ]
};root.ScienceLabData=data;if(typeof module!=='undefined')module.exports=data;})(typeof globalThis!=='undefined'?globalThis:this);