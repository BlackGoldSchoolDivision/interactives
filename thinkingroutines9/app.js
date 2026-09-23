const phases=[
  {id:"launch",label:"🚀 Launch",title:"Launch the learning",intro:"Surface what students notice, think, know, assume, or wonder before you start teaching."},
  {id:"explore",label:"🔎 Explore",title:"Explore ideas & evidence",intro:"Slow the thinking down. Compare perspectives, examine evidence, and build understanding."},
  {id:"discuss",label:"👥 Discuss",title:"Discuss & make meaning",intro:"Help students test ideas, hear other perspectives, and explain the reasoning behind their thinking."},
  {id:"reflect",label:"💡 Reflect / Act",title:"Reflect, synthesize & act",intro:"Make the learning visible: what changed, what matters, what remains unresolved, and what could happen next?"}
];

const routines={
  tpe:{name:"Think, Puzzle, Explore",tag:"Inquiry starter",short:"Activate prior thinking and turn uncertainty into questions worth investigating.",purpose:"A strong opener when students have some ideas about the topic but need a reason to investigate it more deeply.",time:"8–12 min",group:"Individual → pairs → class",steps:["Give students the topic, question, image, quotation, or short scenario without teaching it first.","Students record what they currently think they know. Treat these as starting ideas, not answers to mark right or wrong.","Students list puzzles, tensions, or questions they genuinely want resolved.","Ask how those puzzles could be explored. Save the thinking and revisit it later in the learning."],prompts:["What are you already thinking about this?","What feels puzzling, uncertain, or worth questioning?","What evidence or information would help us explore that?"],look:["Prior conceptions and assumptions","Student-generated questions","Possible directions for inquiry"],source:"https://www.pz.harvard.edu/resources/think-puzzle-explore"},
  stw:{name:"See, Think, Wonder",tag:"Close observation",short:"Move students from observation to interpretation to curiosity.",purpose:"Best when you can begin with something students can inspect closely: an image, map, graph, artifact, quotation, political cartoon, or short source.",time:"8–15 min",group:"Quiet think → class",steps:["Show one strong source and give silent observation time before discussion.","Collect only observations first: details students can point to in the source.","Move to interpretations. Require students to connect interpretations back to something they noticed.","Finish with genuine questions or wonderings that the class could investigate."],prompts:["What do you notice?","What do you think is going on, and what leads you there?","What does this make you wonder?"],look:["Observation before judgment","Evidence connected to interpretation","Questions that can drive inquiry"],source:"https://pz.harvard.edu/resources/see-think-wonder"},
  bridge:{name:"3–2–1 Bridge",tag:"Before & after",short:"Capture thinking before learning and deliberately bridge it to new understanding.",purpose:"Useful when students already have some prior ideas and you want visible evidence of conceptual change across a lesson or sequence.",time:"5 min + 8 min later",group:"Individual → pairs",steps:["Before learning, students quickly capture three ideas or words, two questions, and one analogy or comparison connected to the topic.","Teach, investigate, read, discuss, or examine new evidence.","Students complete a fresh 3–2–1 after the learning without erasing the first.","Students build the bridge: explain what changed, what stayed, and what caused the shift."],prompts:["What comes to mind right now?","What is different in your second response?","What experience or evidence helped move your thinking?"],look:["Movement in understanding","Persistent questions or misconceptions","Evidence students use to explain change"],source:"https://pz.harvard.edu/resources/3-2-1-bridge"},
  cov:{name:"Circle of Viewpoints",tag:"Perspective taking",short:"Explore how the same issue can look different from different positions.",purpose:"Use this when a curriculum question involves competing interests, beliefs, roles, or experiences and students need to see beyond a simple two-sided debate.",time:"15–25 min",group:"Small groups or class",steps:["Name the issue or event, then brainstorm people, groups, or roles that could reasonably hold different viewpoints.","Assign or let students choose a viewpoint. Give them evidence and context before asking them to speak from it.","Students explain how the issue may look from that position and identify a question that viewpoint might raise.","Step out of the roles. Compare what became visible from different viewpoints and identify what still requires evidence."],prompts:["Whose viewpoint could change how we understand this?","What might matter most from that position?","What new question appears when we look from there?"],look:["Multiple plausible perspectives","Use of context rather than stereotypes","Awareness that perspective shapes interpretation"],source:"https://pz.harvard.edu/thinking-routines-archive"},
  csq:{name:"Claim, Support, Question",tag:"Evidence & reasoning",short:"Turn an interpretation into a claim that must be supported and questioned.",purpose:"Excellent for analysis tasks where students need to move beyond opinion and make a defensible interpretation from evidence.",time:"12–20 min",group:"Individual or groups",steps:["Give students a source set, data, case, reading, or problem to investigate.","Students state one clear claim or interpretation.","They identify the strongest evidence or reasoning that supports the claim.","They add a question: something unexplained, uncertain, missing, or capable of challenging the claim."],prompts:["What is your claim?","What evidence gives that claim support?","What remains uncertain or needs to be tested?"],look:["Claims that answer the actual question","Evidence tied directly to claims","Questions that deepen rather than end inquiry"],source:"https://www.pz.harvard.edu/resources/claim-support-question"},
  stepinside:{name:"Step Inside",tag:"Viewpoint",short:"Examine what a person or role might perceive, know, believe, or care about.",purpose:"Useful for historical and civic situations when students have enough contextual evidence to reason from a particular role without pretending to know another person's inner life.",time:"12–20 min",group:"Pairs or small groups",steps:["Choose a clearly defined person, group, institution, or role connected to the issue.","Provide enough contextual evidence that students are not relying on stereotypes or guessing.","Students consider what this viewpoint could perceive, know or believe, and care about based on the available evidence.","Return to the class perspective and compare viewpoints, noting where evidence is strong and where uncertainty remains."],prompts:["What would this role be able to see or know?","What might matter to them in this situation?","Where are we inferring rather than knowing?"],look:["Context-grounded perspective taking","Distinction between evidence and inference","Recognition of different priorities"],source:"https://pz.harvard.edu/resources/step-inside"},
  seek:{name:"Seek to See",tag:"Dignity & complexity",short:"Look deliberately for complexity, strengths, connection, and human dignity.",purpose:"Especially valuable when studying people who may otherwise be reduced to a label, victim category, stereotype, or single event.",time:"15–25 min",group:"Individual → small group",steps:["Choose a rich first-person story, image, video, or text that provides meaningful context about a person or community.","Invite students to notice a range of possible feelings while avoiding the assumption that one feeling defines the person.","Look for strengths, cultural richness, agency, relationships, and sources of power—not only hardship.","Identify human connections and finish by articulating what preserves the person's complexity and dignity. Reflect on any shift in thinking."],prompts:["What complexity are we noticing in this person or story?","Where do you see strength, agency, connection, or cultural richness?","How can we describe this person in a way that honours their full humanity?"],look:["People represented as more than victims","Complexity rather than a single emotional story","Language that preserves dignity and agency"],source:"https://pz.harvard.edu/resources/seek-see"},
  wmys:{name:"What Makes You Say That?",tag:"Reasoning move",short:"Make students' evidence and reasoning visible with one deceptively powerful question.",purpose:"A flexible routine for moments when students offer an interpretation, assumption, judgment, or explanation and you want to uncover the thinking beneath it.",time:"5–15 min",group:"Any",steps:["Present a source, issue, concept, or question and invite an interpretation.","When a student offers an idea, follow with the routine question rather than immediately evaluating the answer.","Ask students to identify the detail, evidence, experience, or reasoning that led them there.","Invite others to build, question, or offer a different interpretation supported by evidence."],prompts:["What makes you say that?","What are you noticing that supports that idea?","What might someone else point to and interpret differently?"],look:["Evidence-based reasoning","Students explaining how they know","Multiple interpretations supported by evidence"],source:"https://pz.harvard.edu/resources/what-makes-you-say"},
  compass:{name:"Compass Points",tag:"Evaluate a proposition",short:"Examine an idea through excitement, concern, needed information, and a current stance.",purpose:"A good choice when students are considering a policy, proposal, spending choice, civic action, or other decision with trade-offs.",time:"15–25 min",group:"Groups → class",steps:["State one specific proposition or choice clearly enough that students know exactly what is being considered.","Students identify potential upsides or opportunities before moving to concerns and possible downsides.","List what additional information would be needed to evaluate the proposition responsibly.","Students give a current stance or suggestion for moving forward and explain what evidence could change it."],prompts:["What looks promising or beneficial here?","What concerns or risks should be examined?","What do we still need to know before reaching a conclusion?"],look:["Trade-offs rather than slogans","Questions about missing information","Stances that remain open to evidence"],source:"https://www.pz.harvard.edu/resources/compass-points"},
  tug:{name:"Tug for Truth",tag:"Evidence & complexity",short:"Lay out the evidence pulling a contested claim in different directions.",purpose:"Use when a historical or contemporary claim appears simple at first but needs careful evidence, qualification, and attention to complexity.",time:"20–30 min",group:"Small groups → class",steps:["Frame one claim that can be investigated with evidence. Avoid a vague opinion question.","Students add pieces of evidence that pull toward accepting, rejecting, or qualifying the claim.","Discuss the strength and relevance of each piece of evidence rather than counting how many appear on each side.","Identify what evidence would help settle or refine the question and write a more nuanced conclusion."],prompts:["What evidence pulls us toward accepting this claim?","What evidence complicates or weakens it?","What would we need to know to reach a better-supported conclusion?"],look:["Quality of evidence over quantity","Nuance and qualification","Willingness to revise a claim"],source:"https://pz.harvard.edu/resources/tug-truth"},
  cec:{name:"Connect, Extend, Challenge",tag:"Synthesis",short:"Connect new learning to prior understanding, identify what it extends, and surface remaining challenges.",purpose:"Works well after students have taken in substantial new information and need to process how it changes their understanding.",time:"10–18 min",group:"Individual → pairs",steps:["Students identify a meaningful connection between the new learning and something they already understood.","They name one idea that extended, broadened, or complicated their thinking.","They identify a challenge, tension, or puzzle that remains unresolved.","Share selectively, then use the challenges to plan the next investigation or discussion."],prompts:["What connects to something you already understood?","What extended or complicated your thinking?","What remains challenging or unresolved?"],look:["Specific conceptual connections","Evidence of extended thinking","Productive unanswered questions"],source:"https://www.pz.harvard.edu/resources/connect-extend-challenge"},
  headline:{name:"Headlines",tag:"Capture the essence",short:"Distill the most important learning into one concise headline.",purpose:"A fast synthesis routine for the end of a discussion, source investigation, or lesson when you want students to identify the core idea rather than list details.",time:"5–10 min",group:"Individual → class",steps:["Ask students to decide what idea matters most from the learning—not merely the most memorable detail.","Students write a short headline that captures that idea clearly.","Pair-share headlines and explain why each headline captures the essence.","Invite revisions after hearing others, then compare the range of emphasis across the class."],prompts:["What is the idea you would not want someone to miss?","Why does your headline capture the essence?","What would you revise after hearing another perspective?"],look:["Synthesis rather than summary lists","Different defensible emphases","Concise evidence of understanding"],source:"https://pz.harvard.edu/resources/headlines"},
  usedthink:{name:"I Used to Think… Now I Think…",tag:"Reflection",short:"Make a genuine shift in thinking visible and explain what caused it.",purpose:"Best after learning experiences likely to change, deepen, or complicate students' initial ideas.",time:"8–15 min",group:"Individual → pairs",steps:["Return students to an earlier idea, response, prediction, or first impression if one is available.","Students write what they previously thought in a concise, fair way.","They write what they now think, emphasizing how the new idea differs or has become more nuanced.","Students explain what evidence, experience, source, or discussion contributed to the change."],prompts:["What did you think at the beginning?","What do you think now?","What caused your thinking to change, deepen, or become more complicated?"],look:["Authentic conceptual change","Reasons for the shift","Comfort with revising ideas"],source:"https://www.pz.harvard.edu/resources/i-used-think-now-i-think"}
};

const outcomes=[
  {
    "title": "Urbanization & Industry",
    "tag": "Time & Place",
    "color": "c0",
    "focus": "Students examine the impacts of urbanization and the growth of industry on Canada.",
    "skills": [
      "Push & pull factors",
      "Postwar demographics",
      "Urban impacts",
      "Petroleum growth"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "City photographs, migration maps, suburban growth images, or environmental data make urban change visible before students explain it.",
          "Postwar immigration, suburbanization, industrial growth, oil and gas development, pollution, and land-use change."
        ],
        [
          "tpe",
          "Surfaces what students already think causes cities to grow and what effects urbanization can have.",
          "Migration, population growth, industry, suburbs, infrastructure, and environmental change."
        ],
        [
          "bridge",
          "Captures students’ starting model of urbanization so they can later show how demographic, economic, and environmental factors connect.",
          "Before and after learning about migration, growth, industry, and urban consequences."
        ]
      ],
      "explore": [
        [
          "csq",
          "Supports evidence-based explanations of how urbanization changes population, economy, and environment.",
          "Demographic data, push-pull factors, industrial growth, suburbanization, and environmental impacts."
        ],
        [
          "cec",
          "Helps students connect separate postwar developments into one urbanization story.",
          "Immigration, industry, suburbs, infrastructure, petroleum, and environmental effects."
        ],
        [
          "wmys",
          "Useful when students interpret graphs, maps, photographs, or claims about urban and industrial change.",
          "Population graphs, land-use maps, energy development, pollution, and urban expansion."
        ]
      ],
      "discuss": [
        [
          "compass",
          "A strong fit for weighing benefits, concerns, information needs, and next steps around urban or industrial development.",
          "Petroleum development, new infrastructure, suburban growth, or responses to urban challenges."
        ],
        [
          "tug",
          "Lets students test a precise claim about whether a particular kind of growth brought more benefit, cost, or mixed consequences.",
          "Urbanization, oil and gas growth, suburbanization, or industrial expansion."
        ],
        [
          "csq",
          "Keeps discussions about growth and impact grounded in evidence instead of broad opinion.",
          "Social, economic, and environmental consequences of urbanization."
        ]
      ],
      "reflect": [
        [
          "cec",
          "Connects multiple causes and consequences and surfaces what remains unresolved about urban growth.",
          "End of the urbanization sequence."
        ],
        [
          "headline",
          "Helps students distill the most important effect or trade-off they now see in Canada’s urban growth.",
          "End of a lesson on demographics, suburbs, industry, or petroleum."
        ],
        [
          "usedthink",
          "Shows how students’ view of urbanization has shifted from simple city growth to a multi-system process.",
          "After studying several urbanization impacts."
        ]
      ]
    }
  },
  {
    "title": "Independence & Democratic Rights",
    "tag": "Time & Place",
    "color": "c1",
    "focus": "Students explain how Canada gained independence and expanded democratic rights.",
    "skills": [
      "Balfour Declaration",
      "Statute of Westminster",
      "Famous Five",
      "Identity & participation"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "Political cartoons, legal documents, photographs, or timelines help students notice evidence of changing independence and participation.",
          "Balfour Declaration, Statute of Westminster, Famous Five, and changing political rights."
        ],
        [
          "tpe",
          "Surfaces what students think political independence and democratic rights mean before studying the milestones.",
          "Sovereignty, foreign policy, voting, representation, and political participation."
        ],
        [
          "bridge",
          "Makes changing ideas about independence and rights visible across the sequence.",
          "Before and after learning about sovereignty and expanded democratic participation."
        ]
      ],
      "explore": [
        [
          "csq",
          "Helps students support claims about how specific legal and political changes altered Canada’s independence or participation.",
          "Balfour Declaration, Statute of Westminster, Famous Five case."
        ],
        [
          "cov",
          "Useful for examining how expanded political rights and changing independence could matter differently to different groups.",
          "Government leaders, women seeking political rights, citizens, and institutions affected by constitutional change."
        ],
        [
          "wmys",
          "A good reasoning move when students interpret historical documents or make claims about significance.",
          "Legal texts, political decisions, and evidence of changing participation."
        ]
      ],
      "discuss": [
        [
          "tug",
          "Supports careful examination of claims about which developments most changed Canada’s political independence or democratic participation.",
          "A precise claim about sovereignty, foreign-policy control, or expanded rights."
        ],
        [
          "wmys",
          "Keeps discussion of significance connected to evidence.",
          "Balfour, Westminster, Famous Five, and changes in political participation."
        ],
        [
          "cov",
          "Helps compare different historical experiences of political change without collapsing them into one perspective.",
          "Citizens, activists, political leaders, and groups gaining or still lacking rights."
        ]
      ],
      "reflect": [
        [
          "usedthink",
          "Excellent for showing how students’ understanding of independence and democratic rights has become more nuanced.",
          "End of the independence and rights sequence."
        ],
        [
          "headline",
          "Captures the central change students see in Canada’s political development.",
          "End of a lesson on Westminster, foreign policy, or expanded rights."
        ],
        [
          "cec",
          "Connects political independence to participation and national identity.",
          "After students have studied both sovereignty and democratic-rights developments."
        ]
      ]
    }
  },
  {
    "title": "Canada in WWII",
    "tag": "Time & Place",
    "color": "c2",
    "focus": "Students examine how Canada’s identity was shaped by its independent role in WWII and growing global influence.",
    "skills": [
      "1939 declaration of war",
      "Military contributions",
      "Chinese Canadians",
      "Cree code talkers"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "Wartime photographs, enlistment materials, maps, or the 1939 declaration provide a concrete starting point for thinking about independence and identity.",
          "Declaration of war, major battles, wartime service, and Canada’s growing international role."
        ],
        [
          "tpe",
          "Surfaces what students already think makes wartime participation significant to national independence.",
          "Sovereignty, military participation, international reputation, and national identity."
        ],
        [
          "bridge",
          "Captures initial thinking about WWII as a turning point, then revisits that claim after evidence is studied.",
          "Before and after learning about Canada’s independent declaration and wartime role."
        ]
      ],
      "explore": [
        [
          "csq",
          "Supports evidence-based explanations of Canada’s contribution and growing sovereignty.",
          "1939 declaration, Hong Kong, Dieppe, Italy, D-Day, liberation of Europe, and postwar influence."
        ],
        [
          "seek",
          "Particularly useful with personal stories of service because it keeps people visible as complex human beings rather than symbols.",
          "Chinese Canadians in Force 136, Cree code talkers, soldiers, families, and community stories."
        ],
        [
          "wmys",
          "Useful while students interpret battle evidence or claims about Canada’s significance.",
          "Military records, battle evidence, service stories, and wartime documents."
        ]
      ],
      "discuss": [
        [
          "tug",
          "Directly supports the curriculum’s turning-point question by weighing evidence for and against a strong historical claim.",
          "Whether WWII was a turning point in Canada’s independence and influence."
        ],
        [
          "wmys",
          "Keeps claims about contribution, sacrifice, and national identity tied to evidence.",
          "Battles, declaration of war, diverse wartime contributions, and global reputation."
        ],
        [
          "cov",
          "Helps students examine different wartime roles and experiences through evidence-based perspectives.",
          "Service members, families, communities, political leaders, and groups whose contributions were historically overlooked."
        ]
      ],
      "reflect": [
        [
          "headline",
          "Students capture the most important way WWII changed Canada’s place in the world.",
          "End of the WWII sequence."
        ],
        [
          "usedthink",
          "Shows how students’ understanding of Canada’s independence and wartime contribution has changed.",
          "After the turning-point investigation."
        ],
        [
          "cec",
          "Connects wartime participation to sovereignty, identity, and later international influence.",
          "After multiple military and political developments have been examined."
        ]
      ]
    }
  },
  {
    "title": "Postwar Canada & Identity",
    "tag": "Time & Place",
    "color": "c3",
    "focus": "Students analyze how post-war developments shaped Canada as a modern nation.",
    "skills": [
      "Welfare state",
      "Global role & peacekeeping",
      "Multiculturalism",
      "Regional tensions & Charter"
    ],
    "map": {
      "launch": [
        [
          "tpe",
          "Surfaces what students associate with modern Canadian identity before they examine the postwar developments that shaped it.",
          "Healthcare, peacekeeping, immigration, multiculturalism, regional tensions, Constitution, Charter, and resource politics."
        ],
        [
          "stw",
          "A postwar source set can quickly reveal visible changes in society, politics, identity, and Canada’s global role.",
          "Immigration images, peacekeeping, welfare-state programs, protests, energy development, or Charter-era sources."
        ],
        [
          "bridge",
          "Makes students’ initial image of modern Canada visible so they can revisit how much of it was built after WWII.",
          "Before and after the postwar-Canada sequence."
        ]
      ],
      "explore": [
        [
          "csq",
          "Helps students build defensible claims about how specific postwar developments strengthened or challenged Canadian identity.",
          "Welfare state, NATO, Korea, peacekeeping, multiculturalism, Quebec nationalism, Western alienation, Charter."
        ],
        [
          "cov",
          "Useful for comparing how national developments looked from different regional, cultural, or political perspectives.",
          "Quebec, Western Canada, immigrants, Indigenous communities, federal government, and other documented groups."
        ],
        [
          "seek",
          "A careful fit for rich first-person accounts of Residential Schools, the Sixties Scoop, migration, or displacement because it foregrounds dignity and complexity.",
          "Survivor accounts, immigrant stories, refugee experiences, and other first-person postwar narratives."
        ]
      ],
      "discuss": [
        [
          "tug",
          "Well suited to evaluating a precise claim about whether a postwar development strengthened or challenged Canadian identity.",
          "Multiculturalism, peacekeeping, welfare programs, regional conflict, Constitution Act, or Charter."
        ],
        [
          "compass",
          "Useful for policy choices that involve benefits, concerns, information needs, and competing priorities.",
          "Social programs, energy policy, constitutional change, or national-unity initiatives."
        ],
        [
          "wmys",
          "Keeps big claims about identity, unity, fairness, and national development connected to evidence.",
          "Postwar case studies, policies, constitutional changes, and regional tensions."
        ]
      ],
      "reflect": [
        [
          "cec",
          "A strong synthesis for connecting many postwar developments into one evolving story of identity.",
          "End of the postwar Canada sequence."
        ],
        [
          "headline",
          "Helps students identify the defining postwar development or tension they think matters most.",
          "End of a major postwar case study."
        ],
        [
          "usedthink",
          "Shows how students’ conception of Canadian identity has become more complex.",
          "After studying cooperation, conflict, diversity, rights, and regional change."
        ]
      ]
    }
  },
  {
    "title": "Modern Economy",
    "tag": "Systems",
    "color": "c4",
    "focus": "Students analyze how economic crisis, growth, and global trade shaped Canada’s modern economy.",
    "skills": [
      "Great Depression",
      "Government response",
      "Postwar growth",
      "Trade & interdependence"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "Economic photographs, unemployment data, trade maps, or graphs provide a concrete entry point into crisis and growth.",
          "Great Depression, public works, industrial expansion, urbanization, trade with the United States, and NAFTA."
        ],
        [
          "tpe",
          "Surfaces student ideas about why economies fail, recover, and become interconnected.",
          "Depression, government intervention, industrial growth, urbanization, and global trade."
        ],
        [
          "compass",
          "Works well with a policy proposal or historical economic response that has clear trade-offs.",
          "Public works, deficit spending, social programs, or free-trade decisions."
        ]
      ],
      "explore": [
        [
          "csq",
          "Supports evidence-based analysis of causes, responses, and consequences across the modern economy.",
          "Great Depression causes, government responses, industrial growth, urbanization, trade, and NAFTA."
        ],
        [
          "cec",
          "Helps students connect crisis, policy, industrialization, cities, and trade into one economic system.",
          "From Depression-era change through postwar growth and continental trade."
        ],
        [
          "wmys",
          "A strong move while students interpret graphs, economic indicators, or historical policy evidence.",
          "Unemployment, production, trade, urban growth, and industrial change."
        ]
      ],
      "discuss": [
        [
          "compass",
          "Makes trade-offs visible when students evaluate economic policies or agreements.",
          "Deficit spending, government intervention, free trade, or continental economic integration."
        ],
        [
          "tug",
          "Useful for a precise claim about whether a policy or economic development strengthened Canada’s economy.",
          "Government response to the Depression, postwar industrial growth, free trade, or NAFTA."
        ],
        [
          "csq",
          "Keeps discussion grounded in evidence and open questions.",
          "Economic growth, interdependence, and social consequences."
        ]
      ],
      "reflect": [
        [
          "cec",
          "Connects the sequence’s major economic shifts and reveals remaining tensions.",
          "End of the modern-economy sequence."
        ],
        [
          "headline",
          "Captures the key transformation students see in Canada’s economy.",
          "End of a lesson on Depression response, industrial growth, urbanization, or trade."
        ],
        [
          "usedthink",
          "Shows how students’ understanding of government, markets, and trade has become more nuanced.",
          "After comparing crisis, policy response, and global integration."
        ]
      ]
    }
  },
  {
    "title": "Power in Canada’s Government",
    "tag": "Systems",
    "color": "c5",
    "focus": "Students analyze how power is distributed and exercised in Canada’s government.",
    "skills": [
      "Responsible government",
      "Federalism",
      "Law-making & courts",
      "Rights & accountability"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "A Parliament diagram, bill pathway, jurisdiction map, or court hierarchy gives students a concrete system to inspect.",
          "Parliament, Crown, Senate, House of Commons, federalism, judiciary, and legislative process."
        ],
        [
          "tpe",
          "Surfaces what students already think about where political power sits and how governments are held accountable.",
          "Responsible government, federal-provincial powers, law making, courts, and rights."
        ],
        [
          "bridge",
          "Captures students’ starting model of government power so structural growth in understanding becomes visible.",
          "Before and after studying Parliament, federalism, courts, and the Charter."
        ]
      ],
      "explore": [
        [
          "csq",
          "Supports defensible claims about how a particular institution distributes, limits, or exercises power.",
          "Responsible government, Parliament, federalism, judiciary, Charter, and natural-resource jurisdiction."
        ],
        [
          "stepinside",
          "Useful for examining institutional roles when students have clear evidence about the responsibilities of each role.",
          "MP, senator, cabinet minister, judge, provincial government, federal government, or citizen."
        ],
        [
          "cov",
          "Helps students compare how the same decision can look different across institutions and jurisdictions.",
          "Federal government, provincial government, courts, elected representatives, and citizens."
        ]
      ],
      "discuss": [
        [
          "tug",
          "Excellent for carefully framed claims about whether power is fairly distributed or effectively limited.",
          "Federalism, responsible government, judicial review, natural-resource jurisdiction, or citizen influence."
        ],
        [
          "compass",
          "Useful when students examine a government decision with competing priorities and information needs.",
          "Resource jurisdiction, regulations, law-making choices, or federal-provincial conflict."
        ],
        [
          "wmys",
          "Keeps claims about accountability, fairness, and constitutional power tied to evidence.",
          "Government structures, laws, constitutional rules, and real examples."
        ]
      ],
      "reflect": [
        [
          "headline",
          "Students distill the central way Canada’s system balances power and accountability.",
          "End of the government-power sequence."
        ],
        [
          "cec",
          "Connects separate institutions into the larger constitutional system.",
          "After Parliament, federalism, judiciary, and rights have been studied together."
        ],
        [
          "usedthink",
          "Shows how students’ original idea of ‘who has power’ has become more precise.",
          "End of the systems sequence."
        ]
      ]
    }
  },
  {
    "title": "Citizenship & Evolving Rights",
    "tag": "Citizenship",
    "color": "c6",
    "focus": "Students examine the impact of changing legislation on citizenship in Canada.",
    "skills": [
      "Rights & responsibilities",
      "Advocacy & legislation",
      "Pluralism & immigration",
      "Charter & reasonable limits"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "A rights document, protest image, citizenship form, court case, or legislation excerpt provides a strong evidence-first entry point.",
          "Canadian Citizenship Act, Bill of Rights, Charter, Famous Five, multiculturalism, or advocacy for legislative change."
        ],
        [
          "tpe",
          "Surfaces student ideas about where rights come from, why they change, and what responsibilities accompany them.",
          "Citizenship, rights, responsibilities, legislation, advocacy, and pluralism."
        ],
        [
          "bridge",
          "Captures students’ starting ideas about rights so they can later show how law, advocacy, and social change interact.",
          "Before and after learning about changing rights and citizenship."
        ]
      ],
      "explore": [
        [
          "csq",
          "Helps students support interpretations of how legislation changed citizenship, rights, or pluralism.",
          "Citizenship Act, Bill of Rights, Charter, Official Languages Act, multiculturalism policy, and constitutional amendments."
        ],
        [
          "cov",
          "Useful for examining how a legal change or limit can affect different groups and institutions differently.",
          "Citizens, permanent residents, refugees, advocacy groups, governments, and communities affected by legislation."
        ],
        [
          "seek",
          "A careful choice for rich stories of migration, exclusion, discrimination, or advocacy because it keeps human dignity at the centre.",
          "Immigrant and refugee stories, advocacy movements, and accounts of people affected by changing rights."
        ]
      ],
      "discuss": [
        [
          "tug",
          "A strong fit for examining a precise claim about rights, reasonable limits, constitutional change, or the impact of legislation.",
          "Section 1 limits, notwithstanding clause, citizenship changes, Charter impacts, or constitutional debates."
        ],
        [
          "compass",
          "Useful for exploring a proposed or historical rights-related policy through benefits, concerns, and information needs.",
          "Limits on rights, constitutional amendments, citizenship policy, or multiculturalism initiatives."
        ],
        [
          "wmys",
          "Keeps ethical and legal claims grounded in evidence rather than slogans.",
          "Legislation, Charter sections, court reasoning, advocacy evidence, and historical examples."
        ]
      ],
      "reflect": [
        [
          "usedthink",
          "Shows how students’ understanding of rights has shifted from something fixed to something shaped by law, advocacy, and social change.",
          "End of the citizenship and rights sequence."
        ],
        [
          "cec",
          "Connects legislation, advocacy, pluralism, and constitutional rights while surfacing unresolved tensions.",
          "After several rights and citizenship developments have been studied."
        ],
        [
          "headline",
          "A concise way to capture the central relationship between citizenship, rights, and social change.",
          "End of a lesson or source investigation on changing rights."
        ]
      ]
    }
  }
];

let oi=0,pi=0,choice=null;
const $=id=>document.getElementById(id);

function renderOutcomes(){
  $("outcomes").innerHTML=outcomes.map((o,i)=>`<button class="outcome ${o.color} ${i===oi?"on":""}" data-o="${i}"><small>${o.tag}</small><b>${i+1}. ${o.title}</b><span>${o.focus}</span></button>`).join("");
  document.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{oi=+b.dataset.o;choice=null;render();$("workspace").scrollIntoView({behavior:"smooth",block:"start"});});
}
function renderPhases(){
  $("phases").innerHTML=phases.map((p,i)=>`<button class="phase p${i} ${i===pi?"on":""}" data-p="${i}" aria-pressed="${i===pi}">${p.label}</button>`).join("");
  document.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{pi=+b.dataset.p;choice=null;renderPhases();renderPhase();});
}
function renderPhase(){
  const o=outcomes[oi],p=phases[pi],items=o.map[p.id];
  $("phaseTitle").textContent=p.title;
  $("phaseIntro").textContent=p.intro;
  $("routines").innerHTML=items.map(([id,why,useWith],index)=>{
    const r=routines[id];
    return `<button class="routine ${choice===id?"on":""} ${index===0?"suggested-card":""}" data-r="${id}" aria-pressed="${choice===id}">
      <span class="dot" aria-hidden="true"></span>
      <div class="routine-top">
        <i>${r.tag}</i>
        ${index===0?'<span class="suggested">★ Suggested starting point</span>':""}
      </div>
      <h3>${r.name}</h3>
      <p class="routine-desc">${r.short}</p>
      <div class="fit"><b>Why here:</b> ${why}</div>
      <div class="routine-foot"><span>⏱ ${r.time}</span><span>Teacher process →</span></div>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{choice=b.dataset.r;renderPhase();});
  if(choice){
    requestAnimationFrame(()=>{
      document.querySelector(`[data-r="${choice}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});
    });
  }
  $("go").disabled=!choice;
  $("selected").textContent=choice?`${routines[choice].name} selected`:"Choose a routine to continue.";
}
function render(){
  renderOutcomes();renderPhases();
  const o=outcomes[oi];
  $("outTitle").textContent=o.title;
  $("outText").textContent=o.focus;
  $("skills").innerHTML=o.skills.map(s=>`<span>${s}</span>`).join("");
  renderPhase();
}
function openPlan(){
  if(!choice)return;
  const o=outcomes[oi],p=phases[pi],r=routines[choice],match=o.map[p.id].find(x=>x[0]===choice);
  $("crumb").textContent=`Grade 9 • ${o.tag} • ${o.title} • ${p.label.replace(/^.. /,"")}`;
  $("planName").textContent=r.name;
  $("purpose").textContent=r.purpose;
  $("meta").innerHTML=`<span>⏱ ${r.time}</span><span>👥 ${r.group}</span><span>🎯 ${p.title}</span>`;
  $("why").textContent=match[1];
  $("steps").innerHTML=r.steps.map(s=>`<div class="step">${s}</div>`).join("");
  $("use").innerHTML=match[2].split("; ").map(x=>`<li>${x}</li>`).join("");
  $("prompts").innerHTML=r.prompts.map(x=>`<li>${x}</li>`).join("");
  $("look").innerHTML=r.look.map(x=>`<li>${x}</li>`).join("");
  $("source").href=r.source;
  $("source").textContent=`View ${r.name} at Project Zero ↗`;
  $("plan").classList.add("open");
  $("plan").scrollIntoView({behavior:"smooth",block:"start"});
}
$("go").onclick=openPlan;
$("back").onclick=()=>{$("plan").classList.remove("open");$("workspace").scrollIntoView({behavior:"smooth",block:"start"});};
render();