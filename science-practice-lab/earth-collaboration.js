(function(root){'use strict';const questions=[
  {
    "id": "collaboration-01",
    "group": "collaboration",
    "type": "single",
    "prompt": "Scientists have a 25-year record of river freeze-up dates. A local Knowledge Keeper offers observations of changing travel routes. What is the best next step?",
    "data": {
      "options": [
        "Discuss how the records and place-based observations may inform each other, with permission and agreed use of the knowledge.",
        "Ignore the local observations because they were not collected by a satellite.",
        "Publish all of the Knowledge Keeper's information without asking.",
        "Replace every date in the measured record with a guess."
      ]
    },
    "answer": 0,
    "explanation": "Instrument records and local knowledge can reveal complementary patterns. Collaboration needs mutual respect, permission and careful interpretation.",
    "hint": "Which response respects people and different forms of evidence?",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-02",
    "group": "collaboration",
    "type": "single",
    "prompt": "A community wants to understand changing seasonal weather risks. Why collaborate with Elders and scientists?",
    "data": {
      "options": [
        "Different knowledge systems and observations can improve understanding of local changes and their effects.",
        "A scientific instrument can answer every question about cultural practices.",
        "Elders can only discuss events from the current week.",
        "Collaboration means everyone must agree before looking at evidence."
      ]
    },
    "answer": 0,
    "explanation": "Knowledge Keepers may contribute long-term, place-based observations and perspectives, while scientists contribute instruments and analytical methods. Both can inform shared questions.",
    "hint": "Consider the strengths each participant brings.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-03",
    "group": "collaboration",
    "type": "multi",
    "prompt": "Select the THREE respectful practices for a collaborative climate investigation.",
    "data": {
      "options": [
        "Ask which observations the community wants investigated.",
        "Agree on what information may be recorded or shared.",
        "Assume published data automatically grant permission to share private community stories.",
        "Offer participants opportunities to review how their contributions are interpreted.",
        "Treat all Indigenous communities as having exactly the same knowledge."
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Co-defined priorities, informed permission and interpretation review help support meaningful and ethical collaboration.",
    "hint": "A good process includes consent at more than one stage.",
    "refs": [
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-04",
    "group": "collaboration",
    "type": "multi",
    "prompt": "Which THREE information sources could complement each other when studying changes in a local winter travel season?",
    "data": {
      "options": [
        "A series of instrument records for freeze-up temperatures and ice conditions.",
        "With permission, accounts of long-term travel observations from local Knowledge Keepers.",
        "A single unrelated advertisement for winter boots.",
        "Agreed community records of changing access and safety conditions.",
        "An assumption that one cold day reveals the entire climate trend."
      ]
    },
    "answer": [
      0,
      1,
      3
    ],
    "explanation": "Measurements, community-approved observations and locally grounded records can build a more complete picture than any one source.",
    "hint": "Look for relevant sources that can be interpreted together.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-05",
    "group": "collaboration",
    "type": "dropdown",
    "prompt": "Complete the collaboration plan.",
    "data": {
      "blanks": [
        {
          "label": "Before interviewing a Knowledge Keeper, the team should",
          "options": [
            "seek permission and discuss the purpose",
            "publish a questionnaire without contact"
          ]
        },
        {
          "label": "To interpret a local trend, the team can compare",
          "options": [
            "agreed observations and long-term measurements",
            "one unrelated day's weather"
          ]
        },
        {
          "label": "Before sharing findings, the team should",
          "options": [
            "follow agreed review and sharing expectations",
            "assume all knowledge is public"
          ]
        }
      ]
    },
    "answer": [
      "seek permission and discuss the purpose",
      "agreed observations and long-term measurements",
      "follow agreed review and sharing expectations"
    ],
    "explanation": "Ethical collaboration includes permission, complementary sources, and negotiated control over sharing.",
    "hint": "Imagine that the shared knowledge belongs to real people and communities.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.SP1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-06",
    "group": "collaboration",
    "type": "dropdown",
    "prompt": "Match each contribution to a potential strength.",
    "data": {
      "blanks": [
        {
          "label": "A calibrated weather station can provide",
          "options": [
            "consistent numerical readings",
            "permission to publish oral histories"
          ]
        },
        {
          "label": "Long-term place-based observations may describe",
          "options": [
            "seasonal changes and effects on community activities",
            "guaranteed worldwide forecasts"
          ]
        },
        {
          "label": "Together, participants can explore",
          "options": [
            "patterns and questions that one source alone may miss",
            "a rule that no source may ever be questioned"
          ]
        }
      ]
    },
    "answer": [
      "consistent numerical readings",
      "seasonal changes and effects on community activities",
      "patterns and questions that one source alone may miss"
    ],
    "explanation": "Combining measurement with place-based knowledge can connect numerical change with lived effects and local context.",
    "hint": "Avoid framing the two sources as competitors.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-07",
    "group": "collaboration",
    "type": "sort",
    "prompt": "Sort each information source by how it was gathered.",
    "data": {
      "zones": [
        {
          "id": "instrument",
          "label": "Instrument or remote observation"
        },
        {
          "id": "community",
          "label": "Community-shared observation"
        }
      ],
      "items": [
        {
          "id": "station",
          "text": "A calibrated station records nightly temperature."
        },
        {
          "id": "satellite",
          "text": "A weather satellite records sea-ice cover."
        },
        {
          "id": "elder",
          "text": "With permission, a Knowledge Keeper describes remembered freeze-up patterns."
        },
        {
          "id": "harvest",
          "text": "A community member shares a consented record of harvest timing."
        }
      ]
    },
    "answer": {
      "station": "instrument",
      "satellite": "instrument",
      "elder": "community",
      "harvest": "community"
    },
    "explanation": "These sources can all be useful, with different methods and responsibilities. The sorting describes how information was gathered, not which source is better.",
    "hint": "Identify who or what first recorded the observation.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-08",
    "group": "collaboration",
    "type": "sort",
    "prompt": "Which practices would support a respectful shared investigation?",
    "data": {
      "zones": [
        {
          "id": "respect",
          "label": "Supports respectful collaboration"
        },
        {
          "id": "not",
          "label": "Undermines respectful collaboration"
        }
      ],
      "items": [
        {
          "id": "plan",
          "text": "Ask participants to help choose a useful local question."
        },
        {
          "id": "review",
          "text": "Offer agreed opportunities to review interpretations."
        },
        {
          "id": "publish",
          "text": "Post recordings of private stories without consent."
        },
        {
          "id": "generalize",
          "text": "Say one person's observation represents all First Nations, Métis and Inuit peoples."
        }
      ]
    },
    "answer": {
      "plan": "respect",
      "review": "respect",
      "publish": "not",
      "generalize": "not"
    },
    "explanation": "Community participation and review can improve quality and respect. Publishing private knowledge or making sweeping claims breaks trust.",
    "hint": "Think about permission and avoiding stereotypes.",
    "refs": [
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-09",
    "group": "collaboration",
    "type": "order",
    "prompt": "Place the steps for a jointly planned local climate investigation in a sensible order.",
    "data": {
      "items": [
        {
          "id": "connect",
          "text": "Meet community partners to identify interests and agree on roles and permissions."
        },
        {
          "id": "gather",
          "text": "Collect authorized observations and relevant measurements."
        },
        {
          "id": "interpret",
          "text": "Examine patterns together, including disagreements or uncertainty."
        },
        {
          "id": "share",
          "text": "Share only approved conclusions and plan any next steps together."
        }
      ]
    },
    "answer": [
      "connect",
      "gather",
      "interpret",
      "share"
    ],
    "explanation": "Co-planning and permission precede data gathering; shared interpretation should precede release of findings.",
    "hint": "Start with people, priorities and permission.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-10",
    "group": "collaboration",
    "type": "order",
    "prompt": "How should a class handle an offered oral observation about changing river ice?",
    "data": {
      "items": [
        {
          "id": "ask",
          "text": "Ask the speaker what may be recorded and how it may be used."
        },
        {
          "id": "listen",
          "text": "Listen carefully and accurately document only what is permitted."
        },
        {
          "id": "compare",
          "text": "With permission, compare observations with local measurements."
        },
        {
          "id": "confirm",
          "text": "Check the draft interpretation and sharing plans with the speaker."
        }
      ]
    },
    "answer": [
      "ask",
      "listen",
      "compare",
      "confirm"
    ],
    "explanation": "Oral and community-held information requires appropriate protocols and consent; comparing does not replace the contributor's voice.",
    "hint": "Permission is needed before recording, not after publishing.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.SP1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-11",
    "group": "collaboration",
    "type": "match",
    "prompt": "Match each collaborator to a relevant contribution in a shared river-ice study.",
    "data": {
      "zones": [
        {
          "id": "keeper",
          "label": "Local Elder or Knowledge Keeper"
        },
        {
          "id": "weather",
          "label": "Meteorological researcher"
        },
        {
          "id": "community",
          "label": "Community project coordinator"
        },
        {
          "id": "students",
          "label": "Student field team"
        }
      ],
      "items": [
        {
          "id": "routes",
          "text": "Context about past travel patterns shared with consent."
        },
        {
          "id": "series",
          "text": "Quality-checked station and ice records over time."
        },
        {
          "id": "consent",
          "text": "Helps plan community priorities, permissions and sharing."
        },
        {
          "id": "notes",
          "text": "Logs repeatable, approved observations using a shared method."
        }
      ]
    },
    "answer": {
      "routes": "keeper",
      "series": "weather",
      "consent": "community",
      "notes": "students"
    },
    "explanation": "Partners bring different expertise and responsibilities. Roles are illustrative and should be agreed locally.",
    "hint": "Identify the main expertise or responsibility in each card.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-12",
    "group": "collaboration",
    "type": "match",
    "prompt": "Connect a research question to its strongest combined information source.",
    "data": {
      "zones": [
        {
          "id": "freeze",
          "label": "Changes in river freeze-up timing"
        },
        {
          "id": "access",
          "label": "Effects on travel and harvesting"
        },
        {
          "id": "storm",
          "label": "Short-term severe-weather tracking"
        }
      ],
      "items": [
        {
          "id": "dates",
          "text": "Station and historical ice dates plus consented local accounts."
        },
        {
          "id": "experience",
          "text": "Community-approved travel observations with relevant weather and ice records."
        },
        {
          "id": "forecast",
          "text": "Weather radar, satellite observations and forecasts, shared with local context."
        }
      ]
    },
    "answer": {
      "dates": "freeze",
      "experience": "access",
      "forecast": "storm"
    },
    "explanation": "Good sources depend on the question. Climate change, its lived effects and immediate weather warnings are related but distinct topics.",
    "hint": "Decide whether the question concerns dates, community activities or the next storm.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-13",
    "group": "collaboration",
    "type": "label",
    "prompt": "Match the four numbered panels of a collaborative inquiry to their stages.",
    "data": {
      "diagram": "earth-collaboration-flow",
      "zones": [
        {
          "id": "A",
          "label": "Stage A"
        },
        {
          "id": "B",
          "label": "Stage B"
        },
        {
          "id": "C",
          "label": "Stage C"
        },
        {
          "id": "D",
          "label": "Stage D"
        }
      ],
      "items": [
        {
          "id": "agree",
          "text": "Agree on purpose, roles and consent"
        },
        {
          "id": "gather",
          "text": "Collect agreed records and local observations"
        },
        {
          "id": "interpret",
          "text": "Interpret patterns together"
        },
        {
          "id": "approve",
          "text": "Review and share agreed findings"
        }
      ]
    },
    "answer": {
      "agree": "A",
      "gather": "B",
      "interpret": "C",
      "approve": "D"
    },
    "explanation": "The model shows how co-planning, gathering, interpretation and agreed sharing fit together.",
    "hint": "Follow the arrows and think about research ethics.",
    "refs": [
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-14",
    "group": "collaboration",
    "type": "label",
    "prompt": "The records model shows three labelled kinds of source. Place the appropriate source label.",
    "data": {
      "diagram": "earth-source-panels",
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
          "id": "sensor",
          "text": "Instrument measurements"
        },
        {
          "id": "oral",
          "text": "Permission-based oral observation"
        },
        {
          "id": "archive",
          "text": "Historical written or mapped record"
        }
      ]
    },
    "answer": {
      "sensor": "A",
      "oral": "B",
      "archive": "C"
    },
    "explanation": "Measurements, oral sources and older records can each contribute information about changing conditions, with attention to permission and quality.",
    "hint": "Identify the format in which each source is recorded.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-15",
    "group": "collaboration",
    "type": "hotspot",
    "prompt": "Select the note that most clearly reflects respectful collaboration.",
    "data": {
      "sourceTitle": "Shared project planning",
      "intro": "A class proposes to study changing fall freeze-up dates.",
      "options": [
        "Write conclusions in advance and use interviews only to decorate the poster.",
        "Meet local partners first, agree on data use, and compare approved local observations with long-term measurements.",
        "Upload every interview recording automatically.",
        "Use satellite numbers to decide what community members are allowed to remember."
      ]
    },
    "answer": 1,
    "explanation": "An ethical and useful project is co-planned, uses permission-based knowledge, and respects contributors' review and sharing expectations.",
    "hint": "A good investigation builds relationships before collecting data.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP2"
    ]
  },
  {
    "id": "collaboration-16",
    "group": "collaboration",
    "type": "hotspot",
    "prompt": "Which conclusion follows from two different, credible sources reporting different freeze-up dates?",
    "data": {
      "sourceTitle": "Research discussion",
      "intro": "A dated instrument record and a Knowledge Keeper's description refer to two different river locations.",
      "options": [
        "One source must be deliberately misleading.",
        "The team should check which locations and definitions each source uses, then discuss the difference with contributors.",
        "Delete whichever date seems less convenient.",
        "Combine the dates without keeping the original context."
      ]
    },
    "answer": 1,
    "explanation": "Sites, seasons and definitions may differ. Careful reconciliation and communication are better than assuming one source is wrong.",
    "hint": "Are the sources describing exactly the same place and event?",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.U1",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-17",
    "group": "collaboration",
    "type": "numeric",
    "prompt": "In an illustrative shared record, freeze-up is reported on day 320 of one year and day 328 of another. How many days later was the second date?",
    "data": {
      "unit": "days",
      "table": {
        "caption": "Invented teaching dates · same location and definition of freeze-up",
        "headers": [
          "Example year",
          "Day of year"
        ],
        "rows": [
          [
            "Year A",
            "320"
          ],
          [
            "Year B",
            "328"
          ]
        ]
      }
    },
    "answer": 8,
    "explanation": "328 − 320 = 8 days later. A two-year difference alone cannot establish a long-term climate trend.",
    "hint": "Subtract the earlier day-of-year number from the later one.",
    "refs": [
      "collaboration.K1",
      "collaboration.U1",
      "collaboration.SP1"
    ]
  },
  {
    "id": "collaboration-18",
    "group": "collaboration",
    "type": "numeric",
    "prompt": "A collaborative project has 15 agreed-upon observation years; 11 years have both instrument records and permission-to-use community observations. How many years lack both sources?",
    "data": {
      "unit": "years",
      "table": {
        "caption": "Illustrative completeness check · not a real community dataset",
        "headers": [
          "Status",
          "Years"
        ],
        "rows": [
          [
            "Total years",
            "15"
          ],
          [
            "Years with both sources",
            "11"
          ]
        ]
      }
    },
    "answer": 4,
    "explanation": "15 − 11 = 4 years. Not every period has identical sources; missing records should be reported, not invented.",
    "hint": "Subtract the years with paired sources from the total.",
    "refs": [
      "collaboration.K1",
      "collaboration.K2",
      "collaboration.SP1",
      "collaboration.SP2"
    ]
  }
];root.ScienceLabEarthCollaboration=questions;if(typeof module!=='undefined')module.exports=questions;})(typeof globalThis!=='undefined'?globalThis:this);
