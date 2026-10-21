(function(root){'use strict';const questions=[
  {
    "id": "evidence-01",
    "group": "evidence",
    "type": "single",
    "prompt": "Which observation would give the strongest evidence about a change in a region's climate?",
    "data": {
      "options": [
        "A consistent record of average temperatures collected over several decades.",
        "One very hot afternoon.",
        "One family's thermometer reading from yesterday.",
        "One photograph of the sky."
      ]
    },
    "answer": 0,
    "explanation": "Climate trends are identified using repeated observations over long periods, not a single weather event.",
    "hint": "Climate describes patterns across many years.",
    "refs": [
      "evidence.K1",
      "evidence.U1",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-02",
    "group": "evidence",
    "type": "single",
    "prompt": "A severe thunderstorm is approaching a Canadian city. Which technology is especially useful for tracking nearby precipitation and storm motion over the next hour?",
    "data": {
      "options": [
        "Weather radar.",
        "A centuries-old climate estimate by itself.",
        "An uncalibrated kitchen clock.",
        "A photo of last winter's snowfall."
      ]
    },
    "answer": 0,
    "explanation": "Weather radar can track precipitation location and movement, helping forecasters assess short-term storm hazards.",
    "hint": "Which instrument tracks precipitation over a region as it moves?",
    "refs": [
      "evidence.K5",
      "evidence.K6",
      "evidence.U1",
      "evidence.SP3"
    ]
  },
  {
    "id": "evidence-03",
    "group": "evidence",
    "type": "multi",
    "prompt": "Which THREE kinds of evidence can contribute to understanding long-term climate change?",
    "data": {
      "options": [
        "Repeated temperature and precipitation records.",
        "Ice cores containing evidence of past atmospheric conditions.",
        "One celebrity's memory of a single picnic.",
        "Changes in sea-ice extent observed over many years.",
        "A storm warning issued for tomorrow only."
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Instrument records, proxies such as ice cores, and long-term sea-ice observations provide complementary evidence over time.",
    "hint": "Long-term records or proxies can reveal change across periods.",
    "refs": [
      "evidence.K1",
      "evidence.K2",
      "evidence.K3",
      "evidence.U1",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-04",
    "group": "evidence",
    "type": "multi",
    "prompt": "Select the THREE events that can occur in Canada and create serious weather-related hazards.",
    "data": {
      "options": [
        "Blizzards with strong wind and blowing snow.",
        "Tornadoes.",
        "Intense rain that causes flooding.",
        "A daily sunrise.",
        "A permanently cloudless sky across Canada."
      ]
    },
    "answer": [
      0,
      1,
      2
    ],
    "explanation": "Blizzards, tornadoes and torrential rainfall occur in Canada, although risks differ among regions and seasons.",
    "hint": "Consider short-term hazardous weather, not ordinary daily events.",
    "refs": [
      "evidence.K4",
      "evidence.K5",
      "evidence.SP2"
    ]
  },
  {
    "id": "evidence-05",
    "group": "evidence",
    "type": "dropdown",
    "prompt": "Choose the main role of each weather forecasting technology.",
    "data": {
      "blanks": [
        {
          "label": "Weather radar can estimate",
          "options": [
            "precipitation location and movement",
            "the exact climate in 100 years"
          ]
        },
        {
          "label": "Weather satellites observe",
          "options": [
            "cloud patterns and other atmospheric conditions",
            "only the inside of a thermometer"
          ]
        },
        {
          "label": "Computer models combine data with",
          "options": [
            "physical equations to estimate future conditions",
            "guaranteed outcomes without uncertainty"
          ]
        }
      ]
    },
    "answer": [
      "precipitation location and movement",
      "cloud patterns and other atmospheric conditions",
      "physical equations to estimate future conditions"
    ],
    "explanation": "Radar, satellites and modelling contribute different information, and forecasts have uncertainty.",
    "hint": "Match the tool to its method of observation or prediction.",
    "refs": [
      "evidence.K6",
      "evidence.SP3"
    ]
  },
  {
    "id": "evidence-06",
    "group": "evidence",
    "type": "dropdown",
    "prompt": "A researcher compares weather data from two 30-year periods. Complete the conclusion.",
    "data": {
      "blanks": [
        {
          "label": "The comparison is about",
          "options": [
            "climate trends",
            "only tomorrow's weather"
          ]
        },
        {
          "label": "To make the comparison fair, they should consider",
          "options": [
            "station methods and locations",
            "the colour of the notebooks"
          ]
        },
        {
          "label": "A single cold day within a warming trend",
          "options": [
            "does not by itself disprove the trend",
            "proves that the entire trend is false"
          ]
        }
      ]
    },
    "answer": [
      "climate trends",
      "station methods and locations",
      "does not by itself disprove the trend"
    ],
    "explanation": "Climate comparisons depend on consistent measurements across long intervals. Short-term weather variability still occurs.",
    "hint": "An unusual single day is not the same as a multi-decade pattern.",
    "refs": [
      "evidence.K1",
      "evidence.U1",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-07",
    "group": "evidence",
    "type": "sort",
    "prompt": "Place each item under weather or climate evidence.",
    "data": {
      "zones": [
        {
          "id": "weather",
          "label": "Short-term weather"
        },
        {
          "id": "climate",
          "label": "Long-term climate"
        }
      ],
      "items": [
        {
          "id": "storm",
          "text": "Today's tornado warning."
        },
        {
          "id": "tomorrow",
          "text": "Forecast rainfall for tomorrow afternoon."
        },
        {
          "id": "average",
          "text": "Thirty years of seasonal precipitation averages."
        },
        {
          "id": "ice",
          "text": "Measured sea-ice thickness trends over multiple decades."
        }
      ]
    },
    "answer": {
      "storm": "weather",
      "tomorrow": "weather",
      "average": "climate",
      "ice": "climate"
    },
    "explanation": "Weather refers to immediate conditions; climate describes longer-term patterns and changes.",
    "hint": "Check the time scale.",
    "refs": [
      "evidence.K1",
      "evidence.K2",
      "evidence.U1",
      "evidence.SP1",
      "evidence.SP2"
    ]
  },
  {
    "id": "evidence-08",
    "group": "evidence",
    "type": "sort",
    "prompt": "Identify which notes represent climate measurements or unsupported claims.",
    "data": {
      "zones": [
        {
          "id": "measured",
          "label": "Usable measurement or dated proxy"
        },
        {
          "id": "claim",
          "label": "Unsupported statement"
        }
      ],
      "items": [
        {
          "id": "permafrost",
          "text": "Repeated measurements of permafrost depth at a fixed site."
        },
        {
          "id": "icecore",
          "text": "Measured layers and trapped gases in dated ice cores."
        },
        {
          "id": "post",
          "text": "A social media post saying all storms are identical."
        },
        {
          "id": "guess",
          "text": "A claim that climate cannot change because it snowed yesterday."
        }
      ]
    },
    "answer": {
      "permafrost": "measured",
      "icecore": "measured",
      "post": "claim",
      "guess": "claim"
    },
    "explanation": "Comparable, dated observations can help reconstruct change. A claim without suitable evidence cannot establish a trend.",
    "hint": "Which notes could be checked against records or physical evidence?",
    "refs": [
      "evidence.K2",
      "evidence.K3",
      "evidence.U1",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-09",
    "group": "evidence",
    "type": "order",
    "prompt": "Put these steps in order when comparing historical and current precipitation records.",
    "data": {
      "items": [
        {
          "id": "define",
          "text": "Define the location, season and time periods to compare."
        },
        {
          "id": "gather",
          "text": "Collect comparable observations from the two periods."
        },
        {
          "id": "calculate",
          "text": "Summarize each period using the same measure."
        },
        {
          "id": "report",
          "text": "Describe the difference, variation and limitations."
        }
      ]
    },
    "answer": [
      "define",
      "gather",
      "calculate",
      "report"
    ],
    "explanation": "Specify what is being compared before calculating or interpreting trends. Differences in stations and methods matter.",
    "hint": "A fair comparison starts with choosing comparable records.",
    "refs": [
      "evidence.K1",
      "evidence.U1",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-10",
    "group": "evidence",
    "type": "order",
    "prompt": "Arrange the main stages of preparing a short-range severe-weather forecast.",
    "data": {
      "items": [
        {
          "id": "observe",
          "text": "Collect radar, satellite and surface observations."
        },
        {
          "id": "model",
          "text": "Use observations and computer models to estimate conditions."
        },
        {
          "id": "warn",
          "text": "Communicate an appropriate forecast or warning with uncertainty."
        },
        {
          "id": "update",
          "text": "Monitor new information and update guidance."
        }
      ]
    },
    "answer": [
      "observe",
      "model",
      "warn",
      "update"
    ],
    "explanation": "Forecasting combines incoming observations and numerical models, followed by communication and revision.",
    "hint": "New observations are needed before a useful forecast.",
    "refs": [
      "evidence.K4",
      "evidence.K5",
      "evidence.K6",
      "evidence.SP2",
      "evidence.SP3"
    ]
  },
  {
    "id": "evidence-11",
    "group": "evidence",
    "type": "match",
    "prompt": "Match the observation source to the information it provides.",
    "data": {
      "zones": [
        {
          "id": "radar",
          "label": "Weather radar"
        },
        {
          "id": "satellite",
          "label": "Weather satellite"
        },
        {
          "id": "core",
          "label": "Dated ice core"
        },
        {
          "id": "station",
          "label": "Surface weather station"
        }
      ],
      "items": [
        {
          "id": "rain",
          "text": "Locations and movement of precipitation."
        },
        {
          "id": "cloud",
          "text": "Broad cloud imagery across a region."
        },
        {
          "id": "past",
          "text": "Layers that can preserve indicators of past climates."
        },
        {
          "id": "local",
          "text": "Repeated measurements such as temperature and precipitation at one site."
        }
      ]
    },
    "answer": {
      "rain": "radar",
      "cloud": "satellite",
      "past": "core",
      "local": "station"
    },
    "explanation": "No single source provides every kind of evidence. Their strengths complement one another.",
    "hint": "Think about the sensor and the span of time.",
    "refs": [
      "evidence.K1",
      "evidence.K3",
      "evidence.K6",
      "evidence.SP1",
      "evidence.SP3"
    ]
  },
  {
    "id": "evidence-12",
    "group": "evidence",
    "type": "match",
    "prompt": "Match the extreme weather description to the event.",
    "data": {
      "zones": [
        {
          "id": "heat",
          "label": "Heatwave"
        },
        {
          "id": "tornado",
          "label": "Tornado"
        },
        {
          "id": "blizzard",
          "label": "Blizzard"
        },
        {
          "id": "monsoon",
          "label": "Monsoon rainfall"
        }
      ],
      "items": [
        {
          "id": "hot",
          "text": "Prolonged unusually high temperatures."
        },
        {
          "id": "funnel",
          "text": "A rotating column of air extending to the ground."
        },
        {
          "id": "snow",
          "text": "Wind-driven blowing snow and greatly reduced visibility."
        },
        {
          "id": "season",
          "text": "Seasonal circulation linked to heavy rainfall in some regions."
        }
      ],
      "layout": "earth-storm-match"
    },
    "answer": {
      "hot": "heat",
      "funnel": "tornado",
      "snow": "blizzard",
      "season": "monsoon"
    },
    "explanation": "These hazards have different mechanisms and distributions. Monsoons are seasonal wind and rainfall patterns, not just one storm.",
    "hint": "Look for the characteristic pattern in each description.",
    "refs": [
      "evidence.K4",
      "evidence.K5",
      "evidence.SP2"
    ]
  },
  {
    "id": "evidence-13",
    "group": "evidence",
    "type": "label",
    "prompt": "The four panels show example observations over time. Match each panel to its measurement.",
    "data": {
      "diagram": "earth-record-panels",
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
          "id": "temp",
          "text": "Air temperature record"
        },
        {
          "id": "rain",
          "text": "Precipitation record"
        },
        {
          "id": "sea",
          "text": "Sea-ice extent record"
        },
        {
          "id": "fire",
          "text": "Recorded wildfire counts"
        }
      ]
    },
    "answer": {
      "temp": "A",
      "rain": "B",
      "sea": "C",
      "fire": "D"
    },
    "explanation": "Climate research considers multiple variables and repeated observations, including temperature, precipitation, sea ice and fire records.",
    "hint": "Check each panel's units and visible data pattern.",
    "refs": [
      "evidence.K1",
      "evidence.K2",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-14",
    "group": "evidence",
    "type": "label",
    "prompt": "Use the schematic to match each labelled forecasting source to its function.",
    "data": {
      "diagram": "earth-forecast-tools",
      "zones": [
        {
          "id": "A",
          "label": "Source A"
        },
        {
          "id": "B",
          "label": "Source B"
        },
        {
          "id": "C",
          "label": "Source C"
        }
      ],
      "items": [
        {
          "id": "radar",
          "text": "Ground radar scanning precipitation"
        },
        {
          "id": "satellite",
          "text": "Space-based weather observation"
        },
        {
          "id": "model",
          "text": "Computer weather-model output"
        }
      ],
      "layout": "earth-forecast-lab"
    },
    "answer": {
      "radar": "A",
      "satellite": "B",
      "model": "C"
    },
    "explanation": "Radar, satellite observations and computer models work together in forecasts.",
    "hint": "Look at where the instrument or data product is located.",
    "refs": [
      "evidence.K6",
      "evidence.SP3"
    ]
  },
  {
    "id": "evidence-15",
    "group": "evidence",
    "type": "hotspot",
    "prompt": "Which report excerpt is strong evidence that a region's average conditions have shifted over time?",
    "data": {
      "sourceTitle": "Station reports",
      "intro": "A team is studying climate change, not merely a forecast.",
      "options": [
        "One afternoon's temperature reached 31°C.",
        "Comparable 30-year average temperatures differed by 1.4°C between two consecutive periods; methods and station changes were checked.",
        "A storm forecast was revised twice.",
        "One person says the weather feels different today."
      ]
    },
    "answer": 1,
    "explanation": "Comparable multi-decade averages with methods checked give stronger evidence of climate change than single events.",
    "hint": "Look for comparable periods and consistent methods.",
    "refs": [
      "evidence.K1",
      "evidence.U1",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-16",
    "group": "evidence",
    "type": "hotspot",
    "prompt": "Which note most accurately explains what a weather satellite contributes before a storm?",
    "data": {
      "sourceTitle": "Forecast desk notes",
      "intro": "A forecaster is reviewing a changing weather system.",
      "options": [
        "The satellite guarantees exactly where a tornado will touch down.",
        "Satellite observations help track clouds and large-scale weather systems, which are interpreted alongside radar and model data.",
        "A satellite supplies dinosaur fossil dates.",
        "The satellite eliminates forecast uncertainty."
      ]
    },
    "answer": 1,
    "explanation": "Satellites provide broad spatial coverage; radar and other observations add detail. No instrument guarantees a specific outcome.",
    "hint": "How might one instrument complement the others?",
    "refs": [
      "evidence.K6",
      "evidence.U1",
      "evidence.SP3"
    ]
  },
  {
    "id": "evidence-17",
    "group": "evidence",
    "type": "numeric",
    "prompt": "In a fictional class dataset, the average winter temperature is −12°C for an earlier period and −9°C for a later period. How many degrees warmer is the later average?",
    "data": {
      "unit": "°C",
      "table": {
        "caption": "Hypothetical matched-station winter averages",
        "headers": [
          "Period",
          "Mean winter temperature"
        ],
        "rows": [
          [
            "Earlier",
            "−12°C"
          ],
          [
            "Later",
            "−9°C"
          ]
        ]
      }
    },
    "answer": 3,
    "explanation": "−9 minus −12 equals +3°C. The later period is 3°C warmer in this invented example.",
    "hint": "Subtract the earlier mean from the later mean, including the negative signs.",
    "refs": [
      "evidence.K1",
      "evidence.U1",
      "evidence.SP1"
    ]
  },
  {
    "id": "evidence-18",
    "group": "evidence",
    "type": "numeric",
    "prompt": "Example satellite records show average late-summer sea-ice area of 5.8 million km² in an earlier period and 4.6 million km² later. What is the decrease?",
    "data": {
      "unit": "million km²",
      "table": {
        "caption": "Illustrative figures for arithmetic · not published observations",
        "headers": [
          "Period",
          "Average late-summer sea-ice area (million km²)"
        ],
        "rows": [
          [
            "Earlier",
            "5.8"
          ],
          [
            "Later",
            "4.6"
          ]
        ]
      }
    },
    "answer": 1.2,
    "explanation": "5.8 − 4.6 = 1.2 million km². Long-term measured changes can provide evidence of climate change.",
    "hint": "Use the same units in both periods.",
    "refs": [
      "evidence.K2",
      "evidence.U1",
      "evidence.SP1"
    ]
  }
];root.ScienceLabEarthEvidence=questions;if(typeof module!=='undefined')module.exports=questions;})(typeof globalThis!=='undefined'?globalThis:this);
