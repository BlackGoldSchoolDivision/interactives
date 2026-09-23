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
    "title": "State Building & Expansion",
    "tag": "Time & Place",
    "color": "c0",
    "focus": "Students examine the deliberate acts of state building.",
    "skills": [
      "Shifting boundaries",
      "Western expansion",
      "Red River Conflict",
      "First Nations & Métis impacts"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "Maps, boundary changes, settlement posters, and primary sources make the changing shape of Canada visible before students explain why it changed.",
          "Maps and timelines of Confederation and expansion; settlement posters; images or documents connected to Rupert’s Land and the West."
        ],
        [
          "tpe",
          "Surfaces what students already think state building means and turns assumptions about Confederation and expansion into questions for investigation.",
          "Confederation; territorial expansion; authority, settlement, and control."
        ],
        [
          "bridge",
          "Captures students’ first ideas about how Canada grew so they can later distinguish simple geographic growth from deliberate political decisions.",
          "Before-and-after thinking about Confederation, expansion west, and changing political boundaries."
        ]
      ],
      "explore": [
        [
          "cov",
          "Helps students examine expansion through several historically grounded perspectives instead of treating state building as a single national story.",
          "Canadian government, Métis communities, First Nations, settlers, and other groups affected by westward expansion."
        ],
        [
          "csq",
          "Keeps analysis of government expansion anchored in evidence about motives, decisions, and consequences.",
          "Acquisition of Rupert’s Land and the North-Western Territory; immigration and settlement policies; government authority in the West."
        ],
        [
          "stepinside",
          "Useful when students have enough source evidence to reason from a defined historical role without guessing at people’s inner lives.",
          "A Métis community member, government official, settler, or other well-documented role connected to the Red River Conflict or western expansion."
        ]
      ],
      "discuss": [
        [
          "tug",
          "A strong fit for testing historical claims about why Canada expanded west and how those actions shaped the emerging state.",
          "A precise claim about expansion, authority, territorial security, or the consequences of state building."
        ],
        [
          "wmys",
          "Prompts students to support statements about government motives, territorial change, and consequences with specific evidence.",
          "Maps, treaties, government decisions, settlement policies, and accounts of the Red River Conflict."
        ],
        [
          "cov",
          "Helps a class compare how the same act of expansion could have different meanings and consequences for different groups.",
          "Government, First Nations, Métis, immigrants, settlers, and regional communities."
        ]
      ],
      "reflect": [
        [
          "cec",
          "Connects individual events into the larger idea that Canada was built through deliberate political, territorial, and settlement decisions.",
          "End of the state-building sequence after Confederation, expansion, treaties, immigration, and the Red River Conflict have been examined."
        ],
        [
          "headline",
          "Forces students to identify the most important idea about how the Canadian state expanded and established authority.",
          "A lesson or sequence on Confederation, western expansion, or changing political boundaries."
        ],
        [
          "usedthink",
          "Shows how students’ idea of Canada’s growth has changed from a simple map story to a more complex account of decisions and consequences.",
          "End of learning about state building and westward expansion."
        ]
      ]
    }
  },
  {
    "title": "Armed Forces & Sovereignty",
    "tag": "Time & Place",
    "color": "c1",
    "focus": "Students relate the development of armed forces in Canada to sovereignty.",
    "skills": [
      "Police & military evolution",
      "Boer War & First World War",
      "Military accomplishments",
      "Statute of Westminster"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "A memorial, uniform, recruiting poster, military photograph, or document creates a concrete entry point into sovereignty and service.",
          "Local war memorials; Canadian military images; Boer War or First World War sources; the Statute of Westminster."
        ],
        [
          "tpe",
          "Surfaces students’ existing ideas about what sovereignty means and why a country might develop national police and military forces.",
          "Sovereignty; defence; police forces; military development after Confederation."
        ],
        [
          "bridge",
          "Makes changes in students’ understanding of sovereignty visible before and after the military story is studied.",
          "Canada’s independence, military forces, and the relationship between defence and sovereignty."
        ]
      ],
      "explore": [
        [
          "csq",
          "Supports evidence-based explanations of how military development and wartime participation contributed to a growing sense of Canadian sovereignty.",
          "Evolution of national police and military forces; Boer War; First World War; Statute of Westminster."
        ],
        [
          "wmys",
          "Useful while students interpret battle accounts, military records, memorials, or claims about national significance.",
          "Key battles, military accomplishments, war memorials, and evidence of Canada’s changing autonomy."
        ],
        [
          "cov",
          "Helps students recognize that military participation and national service could be understood differently by people in different roles and communities.",
          "Soldiers, families, government leaders, communities, and Canadians debating participation in overseas conflicts."
        ]
      ],
      "discuss": [
        [
          "tug",
          "Well suited to the curriculum’s larger historical claim that developing armed forces advanced Canadian sovereignty.",
          "Evidence for, against, or qualifying a claim about military development and national sovereignty."
        ],
        [
          "wmys",
          "Keeps discussion of sacrifice, significance, and sovereignty connected to evidence rather than patriotic generalizations.",
          "Battle evidence, military developments, memorials, and the Statute of Westminster."
        ],
        [
          "cov",
          "Useful for examining differing contemporary perspectives on military participation without requiring one class-wide conclusion.",
          "Different historical viewpoints on the Boer War, First World War service, remembrance, and national independence."
        ]
      ],
      "reflect": [
        [
          "headline",
          "A concise way to capture the central relationship students now see between military development and sovereignty.",
          "End of a lesson on the First World War, military development, or the Statute of Westminster."
        ],
        [
          "usedthink",
          "Shows how students’ understanding of sovereignty has developed beyond the idea of simply ‘being a country.’",
          "End of the armed forces and sovereignty sequence."
        ],
        [
          "cec",
          "Connects military developments to earlier state building and extends thinking toward Canada’s gradual political independence.",
          "After multiple military and sovereignty milestones have been studied."
        ]
      ]
    }
  },
  {
    "title": "Government & the Economy",
    "tag": "Systems",
    "color": "c2",
    "focus": "Students examine the Canadian government’s role in developing the economy post-Confederation.",
    "skills": [
      "National Policy",
      "Tariffs & free trade",
      "Natural resources",
      "Banking & GDP"
    ],
    "map": {
      "launch": [
        [
          "tpe",
          "Surfaces students’ ideas about how much influence governments can have on economic growth before historical policies are introduced.",
          "Railways, tariffs, settlement, resources, banking, and government economic decisions."
        ],
        [
          "stw",
          "A tariff poster, railway map, resource map, banknote, or economic graph lets students observe the system before interpreting it.",
          "National Policy; railway expansion; regional resources; GDP or banking visuals."
        ],
        [
          "compass",
          "Works well when a historical economic choice is framed as a proposition with benefits, concerns, and information needs.",
          "Tariffs versus free trade; government support for regions; resource-development decisions."
        ]
      ],
      "explore": [
        [
          "csq",
          "Helps students make defensible claims about how government policy affected growth, regions, and industries.",
          "National Policy; tariffs; free trade; regional support; natural resources; banking."
        ],
        [
          "cec",
          "Useful after students encounter several economic mechanisms and need to connect them into a system.",
          "Expansion west, resource development, GDP, banking, tariffs, and government support."
        ],
        [
          "wmys",
          "A strong reasoning move when students interpret graphs, policies, or claims about economic effects.",
          "Economic data, National Policy evidence, resource maps, and regional examples."
        ]
      ],
      "discuss": [
        [
          "compass",
          "Makes trade-offs visible when students compare economic policy choices rather than treating them as automatically positive or negative.",
          "Tariffs, free trade, regional financial support, and resource-development decisions."
        ],
        [
          "tug",
          "Supports careful analysis of claims about the short- and long-term consequences of the National Policy.",
          "Evidence of growth, regional effects, industry protection, costs, and unintended consequences."
        ],
        [
          "csq",
          "Keeps discussion of economic policy grounded in evidence and open questions.",
          "Government intervention, trade policy, natural resources, GDP, and banking."
        ]
      ],
      "reflect": [
        [
          "cec",
          "Helps students connect separate economic policies and institutions into the larger idea that government decisions shape development.",
          "End of the post-Confederation economy sequence."
        ],
        [
          "headline",
          "Reveals the central economic relationship students think matters most.",
          "A lesson on the National Policy, trade, resources, GDP, or banking."
        ],
        [
          "usedthink",
          "Useful when students’ initial ideas about government and the economy have become more nuanced.",
          "After comparing several government roles in economic development."
        ]
      ]
    }
  },
  {
    "title": "Government at Confederation",
    "tag": "Systems",
    "color": "c3",
    "focus": "Students examine how Confederation created Canada’s system of government.",
    "skills": [
      "Path to Confederation",
      "Division of powers",
      "Constitution",
      "Three branches & courts"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "A government diagram, Confederation timeline, constitutional excerpt, or historic meeting image provides a concrete system to inspect.",
          "Quebec Conference; London Conference; British North America Act; branches of government; federalism."
        ],
        [
          "tpe",
          "Surfaces what students already think a constitution and federal system do before the formal structure is taught.",
          "Confederation; constitutions; federal and provincial powers; executive, legislative, and judicial branches."
        ],
        [
          "bridge",
          "Captures students’ starting model of Canadian government and makes later structural understanding visible.",
          "Before and after learning about federalism, branches, courts, and the Constitution."
        ]
      ],
      "explore": [
        [
          "csq",
          "Supports evidence-based explanations of why particular Confederation decisions mattered to the government Canada created.",
          "Conference decisions; constitutional provisions; federal-provincial powers; national courts."
        ],
        [
          "stepinside",
          "Useful for understanding institutional roles when students have clear evidence about each role’s responsibilities.",
          "A federal representative, provincial representative, legislator, executive official, or judge."
        ],
        [
          "cov",
          "Helps students see how dividing power can look different from the federal, provincial, and citizen perspectives.",
          "Federal government, provincial governments, courts, and citizens."
        ]
      ],
      "discuss": [
        [
          "compass",
          "A natural fit for examining benefits, concerns, and information needs around dividing power between levels of government.",
          "Federal-provincial division of powers; national court system; constitutional design."
        ],
        [
          "tug",
          "Lets students test a precise claim about whether a structural feature improves consistency, accountability, or decision making.",
          "A claim about federalism, the national court system, or the value of divided powers."
        ],
        [
          "wmys",
          "Keeps comparisons of branches and levels of government tied to constitutional evidence.",
          "Constitutional roles, government diagrams, and examples of jurisdiction."
        ]
      ],
      "reflect": [
        [
          "headline",
          "Students distill the most important design idea in Canada’s Confederation-era government.",
          "End of a lesson on federalism, branches, courts, or the Constitution."
        ],
        [
          "cec",
          "Connects the system’s separate parts and extends thinking toward how division of power shapes real decisions.",
          "After the government structure has been studied as a whole."
        ],
        [
          "usedthink",
          "Shows how students’ original picture of ‘government’ has become more precise and differentiated.",
          "End of the Confederation government sequence."
        ]
      ]
    }
  },
  {
    "title": "Immigration & the Canadian State",
    "tag": "Citizenship",
    "color": "c4",
    "focus": "Students examine immigration in post-Confederation Canada.",
    "skills": [
      "Settlement opportunities",
      "Immigration restrictions",
      "Komagata Maru & riots",
      "Evidence, fairness & discrimination"
    ],
    "map": {
      "launch": [
        [
          "stw",
          "Historic photographs, immigration posters, newspaper pages, or policy documents let students notice details before judging causes and consequences.",
          "Prairie settlement; immigration campaigns; Komagata Maru; Anti-Asian Riots; restrictive policies."
        ],
        [
          "tpe",
          "Surfaces what students think attracts immigrants and why governments might encourage some migration while restricting other groups.",
          "Land, settlement, labour, immigration policy, discrimination, and nation building."
        ],
        [
          "bridge",
          "Captures initial ideas about immigration and belonging so students can later show how historical evidence complicated them.",
          "Before and after learning about settlement opportunities, exclusion, conflict, and discrimination."
        ]
      ],
      "explore": [
        [
          "seek",
          "Especially useful with rich first-person accounts because it keeps people visible as complex human beings with strengths, relationships, and dignity.",
          "Immigrant stories; community accounts; testimony connected to exclusion, settlement, the Komagata Maru, or anti-Asian discrimination."
        ],
        [
          "cov",
          "Helps students understand how immigration policy and settlement could be experienced differently across well-documented groups and roles.",
          "Immigrants, community members, government officials, settlers, employers, and people affected by discriminatory policy."
        ],
        [
          "csq",
          "Supports conclusions about government policy and discrimination that are explicitly tied to historical evidence.",
          "Immigration laws, official documents, newspaper accounts, photographs, and event evidence."
        ]
      ],
      "discuss": [
        [
          "tug",
          "Useful for testing a precise historical claim about the causes, consequences, or fairness of an immigration policy using evidence.",
          "Restrictive laws, government decisions, Komagata Maru, Anti-Asian Riots, or settlement policy."
        ],
        [
          "wmys",
          "Helps students distinguish evidence-supported conclusions from unsupported opinion when discussing discrimination and government policy.",
          "Competing historical accounts, laws, newspaper sources, and official records."
        ],
        [
          "cov",
          "Makes room for several historically grounded perspectives while keeping the discussion focused on evidence and context.",
          "People affected by immigration restrictions, policy makers, communities, and other documented participants."
        ]
      ],
      "reflect": [
        [
          "usedthink",
          "Strong for showing how students’ understanding of immigration changed from a simple settlement story to one that includes opportunity, exclusion, and conflict.",
          "End of the immigration sequence."
        ],
        [
          "cec",
          "Connects immigration to state building and extends thinking toward citizenship, belonging, and government policy.",
          "After several post-Confederation immigration experiences have been studied."
        ],
        [
          "headline",
          "A concise synthesis of the most important relationship students see between immigration and the development of Canada.",
          "End of a lesson or source investigation on immigration policy and experience."
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
  $("crumb").textContent=`Grade 7 • ${o.tag} • ${o.title} • ${p.label.replace(/^.. /,"")}`;
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