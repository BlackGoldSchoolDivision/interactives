(function(root){'use strict';
const groups=[
  {
    "id": "planetary",
    "title": "Solar system & celestial bodies",
    "short": "Solar system",
    "description": "Identify celestial bodies, compare their characteristics and interpret models of the solar system.",
    "colour": "#315ba8",
    "outcome": "Learning Outcome: Students analyze and represent celestial bodies of the solar system.",
    "source": {
      "row": 206,
      "K": [
        "Scientific exploration of space has revealed that Earth is an interconnected part of a group of planets that orbit the Sun.",
        "The solar system is a complex group of celestial bodies that include the Sun (a star), planets and their moons, dwarf planets, asteroids, comets, meteoroids.",
        "Celestial bodies are natural bodies located beyond Earth’s atmosphere.",
        "Celestial bodies have characteristics that vary in many ways, including surface conditions; e.g., temperature, gravity, and atmosphere composition; e.g., gas, ice, or visible rings, size, shape; e.g., round or irregular.",
        "Some celestial bodies emit light and others reflect light.",
        "An asteroid belt is a collection of asteroids found within the solar system.",
        "Although Pluto was originally classified as a planet, new information led to the reclassification of Pluto as a dwarf planet.",
        "The solar system can be modelled to represent the size of the Sun and the planets and the distance between them."
      ],
      "U": [
        "Information about Earth can be acquired through exploration of the solar system."
      ],
      "SP": [
        "Name and order the planets in the solar system and identify the location of the main asteroid belt.",
        "Classify celestial bodies of the solar system as planets, moons, dwarf planets, asteroids, comets, meteoroids, or the Sun.",
        "Represent and describe the characteristics of celestial bodies in our solar system.",
        "Examine celestial bodies that emit or reflect light.",
        "Discuss the reclassification of Pluto.",
        "Interpret physical, pictorial, or digital models of the solar system.",
        "Investigate digital or non-digital resources that contribute to understandings of the solar system."
      ]
    },
    "handsOn": "Compare trusted NASA/CSA solar-system illustrations, then label which aspects are and are not to scale."
  },
  {
    "id": "exploration",
    "title": "Space exploration & satellites",
    "short": "Space technology",
    "description": "Explore space-observation tools, natural and artificial satellites, AlbertaSat and barriers to living in space.",
    "colour": "#7a45a8",
    "outcome": "Learning Outcome: Students analyze and represent celestial bodies of the solar system.",
    "source": {
      "row": 226,
      "K": [
        "Technologies that are used to explore the solar system include telescopes, satellites, probes, rovers, manned spacecraft and space stations, computer modelling.",
        "Satellites are objects in space that orbit around another larger object.",
        "An orbit is the recurring path of an object around another object in space. Natural satellites are celestial bodies.",
        "Artificial satellites are constructed and put into orbit by humans.",
        "The first satellite put into orbit by Alberta (Ex-Alta 1) was designed by a group of students and faculty at the University of Alberta (AlbertaSat) and was successfully launched from the International Space Station in 2017.",
        "The International Space Station is a research facility that orbits Earth."
      ],
      "U": [
        "Knowledge of the solar system continues to develop with further space exploration, discovery, and use of technologies."
      ],
      "SP": [
        "Identify and compare technologies used to gather knowledge about planets and other objects in space.",
        "Compare and contrast natural satellites and artificial satellites.",
        "Discuss potential personal, societal, technological, and environmental barriers to living and working in space."
      ]
    },
    "handsOn": "Build a simplified model of satellite orbits; investigate real Earth-observation data, with clear distinction between simulations and measurements."
  }
];
const parts=typeof module!=='undefined'?[require('./space-bodies.js'),require('./space-exploration.js')]:[root.ScienceLabSpaceBodies,root.ScienceLabSpaceExploration];
const data={version:'space-1.0',groups,questions:parts.flat()};
root.ScienceLabSpace=data;if(typeof module!=='undefined')module.exports=data;
})(typeof globalThis!=='undefined'?globalThis:this);
