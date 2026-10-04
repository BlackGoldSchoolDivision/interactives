"""Curated teaching content. Full base spellings are preserved in word sums.

No unrestricted concatenation is used: each accepted word is listed explicitly.
"""

LEVELS = {
    'start': {'title': 'Start with meaning', 'detail': 'One prefix or suffix · familiar bases', 'colour': 'teal'},
    'meaning': {'title': 'Meaning makers', 'detail': 'Combined parts · different affix jobs', 'colour': 'purple'},
    'spelling': {'title': 'Spelling shifts', 'detail': 'Final e · y to i · doubled consonants', 'colour': 'orange'},
}

def mission(level, word, prefix, base, suffix, sentence, meaning, wrong1, wrong2,
            rule='', spellings=None, prefix_job='', suffix_job=''):
    return dict(id=word, level=level, word=word, parts=[prefix, base, suffix],
                sentence=sentence, meanings=[meaning, wrong1, wrong2], rule=rule,
                spellings=spellings or [], prefixJob=prefix_job, suffixJob=suffix_job)

MISSIONS = [
    mission('start', 'replay', 're', 'play', '', 'We missed the best part. Please ___ the video.', 'play again', 'play before everyone else', 'stop playing'),
    mission('start', 'reread', 're', 'read', '', 'The directions are tricky. I will ___ them.', 'read again', 'read incorrectly', 'read without help'),
    mission('start', 'repack', 're', 'pack', '', 'I forgot my lunch, so I need to ___ my bag.', 'pack again', 'take everything out', 'pack before breakfast'),
    mission('start', 'preheat', 'pre', 'heat', '', 'Before the dough goes in, ___ the oven.', 'heat beforehand', 'heat again after baking', 'remove the heat'),
    mission('start', 'misread', 'mis', 'read', '', 'I thought the sign said 15, but it said 18. I ___ it.', 'read incorrectly', 'read again', 'read before a friend'),
    mission('start', 'unfair', 'un', 'fair', '', 'Only one team gets a turn. That is ___.', 'not fair', 'fair again', 'very fair'),
    mission('start', 'disagree', 'dis', 'agree', '', 'You prefer blue and I prefer green. We ___.', 'have different opinions; not agree', 'agree again', 'agree before a meeting'),
    mission('start', 'helpful', '', 'help', 'ful', 'You carried the heavy box for me. That was ___.', 'giving help; useful', 'without help', 'a person who helps'),
    mission('start', 'careless', '', 'care', 'less', 'Leaving the lid open was a ___ mistake.', 'not taking enough care', 'taking great care', 'someone who provides care'),
    mission('start', 'kindness', '', 'kind', 'ness', 'Sharing her lunch showed ___.', 'the quality of being kind', 'a kind person', 'being less kind'),
    mission('start', 'teacher', '', 'teach', 'er', 'Our ___ helps us learn new things.', 'a person who teaches', 'more able to teach', 'the act of teaching again', suffix_job='a person who does the action'),
    mission('start', 'painted', '', 'paint', 'ed', 'Yesterday, we ___ the fence blue.', 'put paint on it in the past', 'are putting paint on it now', 'will paint it again', suffix_job='marks an action in the past'),
    mission('meaning', 'unhelpful', 'un', 'help', 'ful', 'Directions that leave out every step are ___.', 'not helpful', 'helpful again', 'a person who gives help'),
    mission('meaning', 'unkindness', 'un', 'kind', 'ness', 'Laughing at someone’s mistake shows ___.', 'the quality of being unkind', 'an especially kind person', 'being kind again'),
    mission('meaning', 'rereading', 're', 'read', 'ing', 'I am ___ the chapter to check a detail.', 'reading again', 'reading incorrectly', 'someone who reads', suffix_job='shows an ongoing action here'),
    mission('meaning', 'repainted', 're', 'paint', 'ed', 'The wall was blue. Yesterday, we ___ it green.', 'painted again in the past', 'painted incorrectly', 'are painting it for the first time', suffix_job='marks an action in the past'),
    mission('meaning', 'dislike', 'dis', 'like', '', 'I really ___ the bitter taste of that medicine.', 'not like', 'like again', 'like very much'),
    mission('meaning', 'misplace', 'mis', 'place', '', 'If I put my keys somewhere and forget where, I ___ them.', 'put something somewhere and lose track of it', 'put something back in its usual place', 'put something down beforehand', prefix_job='wrongly; in the wrong place here'),
    mission('meaning', 'hopeful', '', 'hope', 'ful', 'The sky is clearing. We are ___ that the game will go ahead.', 'feeling hope; expecting something good', 'without hope', 'hoping again', rule='Keep the final e in hope before -ful. This suffix begins with a consonant.'),
    mission('meaning', 'joyful', '', 'joy', 'ful', 'We cheered together at the ___ celebration.', 'feeling or showing great joy', 'without joy', 'a person who brings joy', rule='Keep the y in joy. A vowel comes before it: joy + ful → joyful.'),
    mission('meaning', 'fearless', '', 'fear', 'less', 'The ___ climber stayed calm on the high wall.', 'showing no fear', 'full of fear', 'a person who causes fear'),
    mission('meaning', 'darkness', '', 'dark', 'ness', 'When we turned off the light, the room filled with ___.', 'the state of being dark', 'darker than something else', 'a person who likes the dark'),
    mission('meaning', 'quickly', '', 'quick', 'ly', 'The rabbit moved ___ across the path.', 'in a quick way', 'more quick than another rabbit', 'the quality of being quick'),
    mission('meaning', 'smaller', '', 'small', 'er', 'This pebble is ___ than that rock.', 'more small; less large than the other one', 'a person who is small', 'the quality of being small', suffix_job='compares two things: more small'),
    mission('spelling', 'making', '', 'make', 'ing', 'We are ___ a model of a bridge.', 'creating something now', 'created something in the past', 'creating it again', rule='Remove the final e in make before adding -ing: make + ing → making.', spellings=['making', 'makeing', 'makking'], suffix_job='shows an ongoing action here'),
    mission('spelling', 'hoping', '', 'hope', 'ing', 'I am ___ that my friend can visit.', 'wanting something good to happen', 'jumping on one foot', 'a person who has hope', rule='Remove the final e in hope before -ing. Hoping comes from hope; hopping comes from hop.', spellings=['hoping', 'hopeing', 'hopping'], suffix_job='shows an ongoing action here'),
    mission('spelling', 'caring', '', 'care', 'ing', 'The nurse is ___ for an injured person.', 'looking after someone now', 'not taking care', 'looked after someone in the past', rule='Remove the final e in care before adding -ing: care + ing → caring.', spellings=['caring', 'careing', 'carring'], suffix_job='shows an ongoing action here'),
    mission('spelling', 'baker', '', 'bake', 'er', 'The ___ makes bread every morning.', 'a person who bakes', 'more baked than something else', 'the act of baking again', rule='Remove the final e in bake before adding -er: bake + er → baker.', spellings=['baker', 'bakeer', 'bakker'], suffix_job='a person who does the action'),
    mission('spelling', 'happiness', '', 'happy', 'ness', 'Her smile showed her ___.', 'the state of being happy', 'a person who is happy', 'not happy', rule='In happy, a consonant comes before y. Change y to i before -ness: happy + ness → happiness.', spellings=['happiness', 'happyness', 'happines']),
    mission('spelling', 'luckily', '', 'lucky', 'ly', '___, we found the missing mittens before the bus came.', 'by good luck', 'without luck', 'the state of being lucky', rule='In lucky, a consonant comes before y. Change y to i before -ly: lucky + ly → luckily.', spellings=['luckily', 'luckyly', 'luckly']),
    mission('spelling', 'tried', '', 'try', 'ed', 'Yesterday, I ___ a new strategy.', 'made an attempt in the past', 'am making an attempt now', 'a person who makes attempts', rule='In try, a consonant comes before y. Change y to i before -ed: try + ed → tried.', spellings=['tried', 'tryed', 'tryied'], suffix_job='marks an action in the past'),
    mission('spelling', 'carried', '', 'carry', 'ed', 'Yesterday, we ___ the books to class.', 'moved something while holding it in the past', 'are holding it now', 'a person who carries things', rule='In carry, a consonant comes before y. Change y to i before -ed: carry + ed → carried.', spellings=['carried', 'carryed', 'carred'], suffix_job='marks an action in the past'),
    mission('spelling', 'running', '', 'run', 'ing', 'The children are ___ around the field.', 'moving quickly on foot now', 'ran around the field in the past', 'a person who runs', rule='Run has one syllable and ends in one vowel letter + one consonant. Double n before -ing: run + ing → running.', spellings=['running', 'runing', 'runng'], suffix_job='shows an ongoing action here'),
    mission('spelling', 'stopped', '', 'stop', 'ed', 'The bus ___ at the school yesterday.', 'came to a halt in the past', 'is coming to a halt now', 'a person who stops things', rule='Stop has one syllable and ends in one vowel letter + one consonant. Double p before -ed: stop + ed → stopped.', spellings=['stopped', 'stoped', 'stoppped'], suffix_job='marks an action in the past'),
    mission('spelling', 'swimmer', '', 'swim', 'er', 'The ___ crossed the pool.', 'a person who swims', 'more able to swim', 'the state of swimming', rule='Swim has one syllable and ends in one vowel letter + one consonant. Double m before -er: swim + er → swimmer.', spellings=['swimmer', 'swimer', 'swimemer'], suffix_job='a person who does the action'),
    mission('spelling', 'bigger', '', 'big', 'er', 'A horse is ___ than a mouse.', 'more big; larger than the other one', 'a person who is big', 'the state of being big', rule='Big has one syllable and ends in one vowel letter + one consonant. Double g before -er: big + er → bigger.', spellings=['bigger', 'biger', 'biggger'], suffix_job='compares two things: more big'),
]

LAB_EXTRAS = [
    mission('start','playing','','play','ing','The children are ___ a game.','taking part in a game now','','',rule='Keep the y in play. A vowel comes before it.',suffix_job='shows an ongoing action here'),
    mission('start','played','','play','ed','Yesterday, we ___ a game.','took part in a game in the past','','',rule='Keep the y in play. A vowel comes before it.',suffix_job='marks an action in the past'),
    mission('start','crying','','cry','ing','The baby is ___.','shedding tears now','','',rule='Keep the y in cry before -ing. The suffix already begins with i.',suffix_job='shows an ongoing action here'),
    mission('start','helper','','help','er','The ___ carried the box.','a person who helps','','',suffix_job='a person who does the action'),
    mission('start','careful','','care','ful','Be ___ near the road.','taking care','','',rule='Keep the final e in care before the consonant suffix -ful.'),
    mission('start','unhappy','un','happy','','The missed visit made him ___.','not happy','',''),
]

PART_MEANINGS = {
    're':'again', 'un':'not here', 'pre':'before', 'mis':'wrongly', 'dis':'not; the opposite here',
    'ful':'having or showing the base quality', 'less':'without; lacking', 'ness':'a state or quality',
    'ly':'in this way', 'ed':'marks an action in the past', 'ing':'an ongoing action here', 'er':'check its job in this sentence',
}

BASE_MEANINGS = {'play':'take part in an activity','read':'understand written words','pack':'put things into a bag or container','heat':'make warm or hot','fair':'treating people justly','agree':'have the same opinion','help':'give support','care':'look after; give attention','kind':'thoughtful and caring','teach':'help someone learn','paint':'put colour on a surface','like':'enjoy; have a positive feeling about','place':'put somewhere','hope':'want something good to happen','joy':'a feeling of great happiness','fear':'a feeling of being afraid','dark':'with little or no light','quick':'fast','small':'little in size','make':'create','bake':'cook with dry heat','happy':'feeling pleased','lucky':'having good luck','try':'make an attempt','carry':'move while holding','run':'move quickly on foot','stop':'come to a halt','swim':'move through water','big':'large','cry':'shed tears'}

def card(word, group, evidence, sentence=''):
    return dict(word=word, group=group, evidence=evidence, sentence=sentence)

def question(prompt, answer, wrong1, wrong2, explanation):
    return dict(prompt=prompt, answers=[answer, wrong1, wrong2], explanation=explanation)

def family_case(id, title, base, meaning, cards, evidence, apply, tip):
    return dict(id=id,title=title,kind='Word families',intro=f'Investigate the base {base}, meaning {meaning}. A family member keeps a connection to this base and its meaning.',
                groups=[dict(id='family',label=f'{base} family',detail='The base and its meaning connect'),dict(id='lookalike',label='Another base',detail='Similar letters or sounds are not enough')],cards=cards,evidence=evidence,apply=apply,tip=tip)

CASES = [
    family_case('flow','The flower puzzle','flow','move steadily, like water',[
        card('flowed','family','flow + ed → flowed: moved steadily in the past.'),
        card('flowing','family','flow + ing → flowing: moving steadily.'),
        card('overflow','family','over + flow → overflow: flow beyond a limit.'),
        card('overflowing','family','over + flow + ing → overflowing: flowing beyond a limit.'),
        card('flower','lookalike','Flower means a bloom. It is not flow + er; the letters do not make that meaning.'),
        card('flowers','lookalike','flower + s → flowers. The base is flower, not flow.'),
    ],question('Why is flower outside this flow family?','Its base and meaning are different, even though some letters match.','Every word ending in -er is a person who does something.','A family member must sound exactly like its base.','A spelling resemblance is a clue to investigate, not proof. Flower has its own base and word history.'),
       question('“Rain made the pond overflow.” What happened?','Water flowed beyond the pond’s limit.','Flowers grew in the pond.','The water stopped moving.','Over- adds the idea of going beyond a limit to flow.'),
       'Use both structure and meaning. Do not cut a word just because a familiar letter string appears.'),
    family_case('play','Play or display?','play','take part in a game or activity',[
        card('player','family','play + er → player: a person who plays.'),card('playing','family','play + ing → playing: taking part in the activity.'),
        card('replay','family','re + play → replay: play again.'),card('playful','family','play + ful → playful: enjoying play; full of fun.'),
        card('display','lookalike','Display means show. It is not dis + play meaning “not play”.'),
        card('displayed','lookalike','display + ed → displayed. Its base here is display, not play.'),
    ],question('What is the strongest evidence that replay belongs?','Re- means again, and the word still means play.','It has the same number of letters as player.','Every word ending in play belongs automatically.','Replay has a meaningful prefix plus the base play. Display has a different base and history.'),
       question('“Let’s replay the final scene.” What should we do?','Play the scene again.','Stop playing the scene.','Show a poster of the scene.','Re- means again in replay.'),
       'A word family is based on a meaningful base, not just a matching ending.'),
    family_case('care','The missing e','care','look after; give attention',[
        card('careful','family','care + ful → careful: taking care. Keep the final e before -ful.'),
        card('careless','family','care + less → careless: not taking enough care.'),
        card('caring','family','care + ing → caring: looking after someone. Remove final e before -ing.'),
        card('cared','family','care + ed → cared: gave care in the past. Remove final e before -ed.'),
        card('scare','lookalike','Scare means frighten. There is no prefix s- meaning “frighten” attached to care.'),
        card('scared','lookalike','scare + ed → scared: frightened. Its base is scare, not care.'),
    ],question('Why does caring still belong to care?','The full base is care; its final e is removed before -ing.','Its base is always car because those letters stay.','Any word starting with car belongs to care.','Word sums show the underlying base even when a suffix changes its written ending.'),
       question('“A careless spill soaked the notebook.” What does careless tell us?','Someone did not take enough care.','Someone took extra care.','Someone frightened the notebook.','-less adds the idea of lacking care in this context.'),
       'Compare care + ful → careful with care + ing → caring. The base is the same; the suffix boundary behaves differently.'),
    family_case('hope','Hoping or hopping?','hope','want something good to happen',[
        card('hopeful','family','hope + ful → hopeful: feeling hope. Keep final e before -ful.'),
        card('hopeless','family','hope + less → hopeless: without hope.'),
        card('hoping','family','hope + ing → hoping: wanting something good to happen. Remove final e.'),
        card('hoped','family','hope + ed → hoped: felt hope in the past. Remove final e.'),
        card('hop','lookalike','Hop means jump on one foot or make a small jump. It is a different base.'),
        card('hopping','lookalike','hop + ing → hopping. Double p at this boundary. It belongs to hop, not hope.'),
    ],question('Which word sum explains hoping?','hope + ing → hoping','hop + ing → hoping','hop + ping → hoping','Hoping keeps the meaning of hope. Hopping comes from hop and doubles p.'),
       question('“Ari is hoping for snow.” What is Ari doing?','Wishing that snow will fall.','Jumping on one foot.','Playing in snow that already fell.','The spelling and the sentence point to hope, not hop.'),
       'Say and compare hoping and hopping. Read the whole sentence before deciding.'),
    family_case('heat','Heat hidden in wheat?','heat','make warm or hot',[
        card('heated','family','heat + ed → heated: made warm in the past.'),card('heating','family','heat + ing → heating: making warm.'),
        card('reheat','family','re + heat → reheat: heat again.'),card('heater','family','heat + er → heater: a thing that provides heat.'),
        card('wheat','lookalike','Wheat is a grain. It is not w + heat; w- is not a meaningful prefix here.'),
        card('cheat','lookalike','Cheat means act dishonestly. Its base is cheat, not heat.'),
    ],question('What makes heater a member of the heat family?','It names something that provides heat.','All words ending in -er are people.','Any word with h-e-a-t letters has the base heat.','Here -er makes a noun for a thing that does the action. Meaning matters as well as letters.'),
       question('“Reheat the soup before lunch.” What should happen?','The soup should be heated again.','Wheat should be added to the soup.','The soup should be cooled.','Re- adds again to heat.'),
       'An -er noun can name a person or a thing. Check what the word means.'),
    family_case('corn','Two bases can join','corn','the grain we eat',[
        card('popcorn','family','pop + corn → popcorn: corn that has popped. This is a compound.'),
        card('cornfield','family','corn + field → cornfield: a field of corn. Both parts are bases.'),
        card('cornbread','family','corn + bread → cornbread: bread made with cornmeal. Both parts are bases.'),
        card('sweetcorn','family','sweet + corn → sweetcorn: a kind of corn. This is a compound.'),
        card('corner','lookalike','Corner means a place where edges meet. It is not corn (the grain) + er.'),
        card('unicorn','lookalike','Unicorn’s corn comes from a Latin word for horn, not the grain corn.'),
    ],question('Why is cornfield a compound?','It joins two bases: corn and field.','Field is a suffix meaning person.','Every long word is a compound.','Both corn and field can stand as words and contribute meaning. A compound joins bases.'),
       question('“We walked beside the cornfield.” What did we walk beside?','A field where corn grows.','A corner of a room.','An animal with one horn.','Corn + field gives a useful clue to the compound’s meaning.'),
       'The grain corn and the Latin element for horn have similar spellings but different meanings and histories.'),
    dict(id='er',title='The -er mystery',kind='Affix jobs',intro='The ending -er can do different jobs. Read each word and its sentence before deciding.',
         groups=[dict(id='doer',label='Person who does it',detail='Names someone who does the base action'),dict(id='compare',label='More than another',detail='Compares a quality')],cards=[
             card('teacher','doer','teach + er → teacher: a person who teaches.','The teacher explained the task.'),
             card('runner','doer','run + er → runner: a person who runs. Double n.','The runner crossed the line.'),
             card('baker','doer','bake + er → baker: a person who bakes. Remove final e.','The baker made bread.'),
             card('faster','compare','fast + er → faster: more fast.','The rabbit is faster than the turtle.'),
             card('smaller','compare','small + er → smaller: less large.','This box is smaller than that one.'),
             card('colder','compare','cold + er → colder: more cold.','Today is colder than yesterday.'),
         ],evidence=question('How can we decide what -er does?','Look at the base, the word’s meaning, and its sentence.','-er always means a person.','-er always means more.','The same written ending can serve different grammatical jobs. Context and the kind of base help.'),
         apply=question('“This coat is warmer than mine.” What does -er do?','It compares warmth: more warm.','It names a person who warms things.','It means warmth happened in the past.','Warmer is a comparison here, not a name for a person.'),tip='Compare teach → teacher with small → smaller. Ask: a person, or a comparison?'),
    dict(id='s',title='The two jobs of -s',kind='Affix jobs',intro='An -s ending can mark more than one noun, or a present-tense verb with he, she, it, or one named person. Use the sentences.',
         groups=[dict(id='plural',label='More than one',detail='Plural noun'),dict(id='verb',label='One subject does it',detail='Present-tense verb')],cards=[
             card('cats','plural','cat + s → cats: more than one cat.','Three cats sat on the wall.'),
             card('books','plural','book + s → books: more than one book.','I borrowed several books.'),
             card('paints','plural','paint + s → paints: more than one kind or container of paint here.','The artist chose three paints.'),
             card('jumps','verb','jump + s → jumps: what one named person does.','Amir jumps over the puddle.'),
             card('reads','verb','read + s → reads: what one named person does.','Mia reads after lunch.'),
             card('paints','verb','paint + s → paints: what one named person does here.','Noah paints the fence.'),
         ],evidence=question('Why are the two paints cards in different groups?','One is a plural noun; the other is a verb in its sentence.','Identical spellings must always have the same job.','The longer sentence always contains a plural.','The spelling alone does not settle the job. Read “three paints” and “Noah paints” in context.'),
         apply=question('“The dog barks at the door.” What does -s mark?','A present-tense action with one subject: the dog.','More than one dog.','An action in the past.','Barks is a verb here. The noun dog is singular.'),tip='Read aloud: “Three paints are on the shelf” and “Noah paints the fence.” Same spelling, different jobs.'),
    dict(id='un',title='What does un- undo?',kind='Affix jobs',intro='Un- can mean “not” with a quality, or reverse an action. Investigate its job in each word.',
         groups=[dict(id='not',label='Not this quality',detail='Describes the opposite state'),dict(id='reverse',label='Reverse the action',detail='Undo what the base action does')],cards=[
             card('unhappy','not','un + happy → unhappy: not happy.'),card('unfair','not','un + fair → unfair: not fair.'),card('unkind','not','un + kind → unkind: not kind.'),
             card('unwrap','reverse','un + wrap → unwrap: remove the wrapping.'),card('untie','reverse','un + tie → untie: undo a knot.'),card('unlock','reverse','un + lock → unlock: undo the locked state.'),
         ],evidence=question('Does un- always mean exactly “not”?','No. It can also mean reverse an action, as in untie.','Yes. Untie means never tie anything.','No. Un- always means again.','Unhappy describes a state. Untie describes undoing an action. Keep the meaning connected to the base.'),
         apply=question('“Please unwrap the gift.” What should you do?','Remove the wrapping.','Wrap it a second time.','Decide that it is not a gift.','Here un- reverses wrap.'),tip='Act out wrap/unwrap and tie/untie, then contrast happy/unhappy.'),
    dict(id='ed',title='One ending, three sounds',kind='Affix jobs',intro='These words all use -ed for a past action. Sort by the ending you hear when you say the whole word. /t/ sounds like t; /d/ like d; /ɪd/ adds a syllable, like id.',
         groups=[dict(id='t',label='/t/ sound',detail='No extra syllable'),dict(id='d',label='/d/ sound',detail='No extra syllable'),dict(id='id',label='/ɪd/ sound',detail='An extra syllable')],cards=[
             card('jumped','t','jump + ed → jumped. The ending sounds like /t/; it still marks the past.'),card('helped','t','help + ed → helped. The ending sounds like /t/.'),
             card('played','d','play + ed → played. The ending sounds like /d/.'),card('cleaned','d','clean + ed → cleaned. The ending sounds like /d/.'),
             card('wanted','id','want + ed → wanted. The ending sounds like /ɪd/ and adds a syllable.'),card('needed','id','need + ed → needed. The ending sounds like /ɪd/ and adds a syllable.'),
         ],evidence=question('What stays the same in these six words?','The -ed spelling and its job of marking a past action.','The ending always sounds exactly the same.','Every ending adds an extra syllable.','A morpheme can keep its spelling and grammatical job while its pronunciation varies.'),
         apply=question('“We walked home yesterday.” What does -ed tell us?','The walking happened in the past, even though the ending sounds like /t/.','There was more than one walk.','The action is happening now.','Walk + ed → walked. The suffix marks the past; its sound here is /t/.'),tip='Read each whole word. Do not pronounce every -ed as a separate “ed” syllable.'),
]

for c in CASES:
    for index, item in enumerate(c['cards']):
        item['id'] = f'{c["id"]}-{index}'  # Two paints cards deliberately have different sentence jobs.

RESEARCH = [
    dict(title='Colenbrander et al. (2024)',url='https://link.springer.com/article/10.1007/s10648-024-09953-3',
         note='A preregistered review of 28 studies found positive reading and spelling outcomes, strongest for directly taught words. Transfer to untaught spelling was possible; reading transfer and comprehension benefits were not clearly established. Evidence certainty varied.'),
    dict(title='Goodwin & Ahn (2013)',url='https://scholarship.miami.edu/esploro/outputs/journalArticle/A-Meta-Analysis-of-Morphological-Interventions-in/991031575910102976',
         note='A meta-analysis of 30 studies reported benefits for morphological knowledge, vocabulary, decoding and spelling. It did not find significant effects on reading comprehension or fluency.'),
    dict(title='Bowers, Kirby & Deacon (2010)',url='https://langlabatdal.weebly.com/uploads/1/0/6/3/10631014/bowers.kirby.deacon.2010.pdf',
         note='This earlier review of 22 studies supported teaching meaningful word parts and found stronger outcomes when morphology was integrated with other literacy instruction. Later reviews add caution about transfer and comparisons with other approaches.'),
]

SPELLING_SOURCES = [
    dict(title='Cambridge: English spelling',url='https://dictionary.cambridge.org/us/grammar/british-grammar/spelling_2'),
    dict(title='Language Portal of Canada: final y',url='https://our-languages.canada.ca/en/writing-tips-plus/spelling-words-ending-in-y'),
    dict(title='Language Portal of Canada: doubling consonants',url='https://our-languages.canada.ca/en/writing-tips-plus/spelling-final-consonants-doubled-before-a-suffix'),
    dict(title='Merriam-Webster: flower',url='https://www.merriam-webster.com/dictionary/flower'),
    dict(title='Merriam-Webster: corner',url='https://www.merriam-webster.com/dictionary/corner'),
    dict(title='Merriam-Webster: display',url='https://www.merriam-webster.com/dictionary/display'),
    dict(title='Merriam-Webster: scare',url='https://www.merriam-webster.com/dictionary/scare'),
    dict(title='American Heritage: unicorn',url='https://ahdictionary.com/word/search.html?q=unicorn'),
]
