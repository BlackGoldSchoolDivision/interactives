(function(root,factory){const data=factory();if(typeof module==='object'&&module.exports)module.exports=data;else root.OrbitWords=data;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const n=(word,parts,meaning,note='')=>({word,parts:parts.split('+'),meaning,note});
  return [
    {base:'play',meaning:'do something for fun',words:[
      n('plays','play+s','does something for fun'),n('played','play+ed','did something for fun'),n('playing','play+ing','taking part in a game or activity'),
      n('player','play+er','a person who plays'),n('players','play+er+s','more than one person who plays'),
      n('replay','re+play','play again'),n('replays','re+play+s','plays again'),n('replayed','re+play+ed','played again'),n('replaying','re+play+ing','playing again'),
      n('misplay','mis+play','make a mistake while playing'),n('misplays','mis+play+s','makes a mistake while playing'),n('misplayed','mis+play+ed','made a mistake while playing'),n('misplaying','mis+play+ing','making a mistake while playing'),
      n('playful','play+ful','full of fun and ready to play'),n('playfully','play+ful+ly','in a fun or playful way'),n('playfulness','play+ful+ness','the quality of being playful')
    ]},
    {base:'pack',meaning:'put things together for carrying or storing',words:[
      n('packs','pack+s','puts things together for carrying'),n('packed','pack+ed','put things together for carrying'),n('packing','pack+ing','putting things together for carrying'),
      n('packer','pack+er','a person who packs things'),n('packers','pack+er+s','more than one person who packs things'),
      n('unpack','un+pack','take things out of a bag or box'),n('unpacks','un+pack+s','takes things out of a bag or box'),n('unpacked','un+pack+ed','took things out of a bag or box'),n('unpacking','un+pack+ing','taking things out of a bag or box'),
      n('repack','re+pack','pack again'),n('repacks','re+pack+s','packs again'),n('repacked','re+pack+ed','packed again'),n('repacking','re+pack+ing','packing again')
    ]},
    {base:'help',meaning:'make something easier for someone',words:[
      n('helps','help+s','makes something easier for someone'),n('helped','help+ed','made something easier for someone'),n('helping','help+ing','making something easier for someone'),
      n('helper','help+er','someone who helps'),n('helpers','help+er+s','more than one person who helps'),
      n('helpful','help+ful','giving useful help'),n('helpfully','help+ful+ly','in a way that gives useful help'),n('helpfulness','help+ful+ness','the quality of being helpful'),
      n('unhelpful','un+help+ful','not giving useful help'),n('unhelpfully','un+help+ful+ly','in a way that does not help'),n('unhelpfulness','un+help+ful+ness','the quality of not being helpful'),
      n('helpless','help+less','unable to manage without help'),n('helplessly','help+less+ly','in a way that shows you cannot manage without help'),n('helplessness','help+less+ness','the feeling of being unable to manage without help')
    ]},
    {base:'care',meaning:'look after someone or something',words:[
      n('cares','care+s','looks after someone or something'),n('cared','care+ed','looked after someone or something','Drop the final e before -ed.'),
      n('caring','care+ing','looking after someone or something','Drop the final e before -ing.'),
      n('carer','care+er','someone who looks after another person','Drop the final e before -er.'),n('carers','care+er+s','more than one person who looks after others'),
      n('uncaring','un+care+ing','not showing care for others','The e stays out in caring.'),
      n('careful','care+ful','taking care to avoid mistakes or harm'),n('carefully','care+ful+ly','with care and attention'),n('carefulness','care+ful+ness','the quality of taking care'),
      n('careless','care+less','not taking enough care'),n('carelessly','care+less+ly','without enough care'),n('carelessness','care+less+ness','a lack of care or attention')
    ]},
    {base:'kind',meaning:'friendly and caring',words:[
      n('kinder','kind+er','more kind'),n('kindest','kind+est','most kind'),n('kindly','kind+ly','in a kind way'),n('kindness','kind+ness','the quality of being kind'),
      n('unkind','un+kind','not kind'),n('unkinder','un+kind+er','less kind'),n('unkindest','un+kind+est','least kind'),n('unkindly','un+kind+ly','in a way that is not kind'),n('unkindness','un+kind+ness','behaviour that is not kind')
    ]},
    {base:'paint',meaning:'cover or make a picture with paint',words:[
      n('paints','paint+s','makes pictures or covers things with paint'),n('painted','paint+ed','made a picture or covered something with paint'),n('painting','paint+ing','making a picture or covering something with paint'),
      n('paintings','paint+ing+s','more than one picture made with paint'),n('painter','paint+er','a person who paints'),n('painters','paint+er+s','more than one person who paints'),
      n('repaint','re+paint','paint again'),n('repaints','re+paint+s','paints again'),n('repainted','re+paint+ed','painted again'),n('repainting','re+paint+ing','painting again'),
      n('unpainted','un+paint+ed','not covered in paint')
    ]},
    {base:'box',meaning:'a container, or to put things in a container',focus:'-es · -ed · un- · re-',words:[
      n('boxes','box+es','more than one box'),n('boxed','box+ed','put something in a box'),n('boxing','box+ing','putting something in a box'),
      n('unbox','un+box','take something out of its box'),n('unboxes','un+box+es','takes something out of its box'),n('unboxed','un+box+ed','took something out of its box'),n('unboxing','un+box+ing','taking something out of its box'),
      n('rebox','re+box','put something in a box again'),n('reboxes','re+box+es','puts something in a box again'),n('reboxed','re+box+ed','put something in a box again'),n('reboxing','re+box+ing','putting something in a box again')
    ]},
    {base:'jump',meaning:'push off the ground into the air',focus:'-ed · -ing · -y · comparisons',words:[
      n('jumps','jump+s','pushes off the ground into the air'),n('jumped','jump+ed','pushed off the ground into the air'),n('jumping','jump+ing','pushing off the ground into the air'),
      n('jumper','jump+er','a person who jumps'),n('jumpers','jump+er+s','more than one person who jumps'),
      n('jumpy','jump+y','nervous and easily startled'),n('jumpier','jump+y+er','more easily startled','Change y to i before -er.'),n('jumpiest','jump+y+est','most easily startled','Change y to i before -est.'),n('jumpiness','jump+y+ness','the feeling of being nervous and easily startled','Change y to i before -ness.')
    ]},
    {base:'green',meaning:'the colour of grass and many leaves',focus:'-ish · -er · -est',words:[
      n('greener','green+er','more green'),n('greenest','green+est','most green'),n('greenish','green+ish','a little green, or almost green'),n('greenness','green+ness','the quality of being green')
    ]},
    {base:'read',meaning:'understand written words',focus:'re- · mis- · -able · -ity',words:[
      n('reads','read+s','understands written words'),n('reading','read+ing','understanding written words'),n('readings','read+ing+s','more than one reading or way of interpreting a text'),
      n('reader','read+er','a person who reads'),n('readers','read+er+s','more than one person who reads'),
      n('reread','re+read','read again'),n('rereads','re+read+s','reads again'),n('rereading','re+read+ing','reading again'),
      n('misread','mis+read','read or understand something incorrectly'),n('misreads','mis+read+s','reads or understands something incorrectly'),n('misreading','mis+read+ing','reading or understanding something incorrectly'),
      n('readable','read+able','easy or possible to read'),n('readability','read+able+ity','how easy something is to read','Before -ity, -able changes to -abil-.'),
      n('unreadable','un+read+able','too difficult to read'),n('unreadability','un+read+able+ity','the quality of being too difficult to read','Before -ity, -able changes to -abil-.')
    ]},
    {base:'agree',meaning:'have the same opinion, or say yes to something',focus:'dis- · -able · -ment',words:[
      n('agrees','agree+s','has the same opinion, or says yes'),n('agreed','agree+ed','had the same opinion, or said yes','Drop one e before -ed.'),n('agreeing','agree+ing','having the same opinion, or saying yes','Keep both e letters before -ing.'),
      n('agreement','agree+ment','a shared opinion or an accepted plan'),n('agreements','agree+ment+s','more than one shared decision or accepted plan'),
      n('agreeable','agree+able','pleasant or easy to accept'),n('agreeably','agree+able+ly','in a pleasant way','Change the ending -able to -ably.'),
      n('disagree','dis+agree','have a different opinion'),n('disagrees','dis+agree+s','has a different opinion'),n('disagreed','dis+agree+ed','had a different opinion','Drop one e before -ed.'),n('disagreeing','dis+agree+ing','having a different opinion','Keep both e letters before -ing.'),
      n('disagreement','dis+agree+ment','a difference of opinion'),n('disagreements','dis+agree+ment+s','more than one difference of opinion')
    ]},
    {base:'act',meaning:'do something, or perform',focus:'re- · in- · -or · -ity',words:[
      n('acts','act+s','does something or performs'),n('acted','act+ed','did something or performed'),n('acting','act+ing','doing something or performing'),n('actor','act+or','a person who performs a role'),n('actors','act+or+s','more than one person who performs a role'),
      n('action','act+ion','something that is done'),n('actions','act+ion+s','things that are done'),
      n('react','re+act','respond to something that happens'),n('reacts','re+act+s','responds to something that happens'),n('reacted','re+act+ed','responded to something that happened'),n('reacting','re+act+ing','responding to something that happens'),n('reaction','re+act+ion','a response to something that happens'),n('reactions','re+act+ion+s','more than one response'),
      n('active','act+ive','moving or doing things'),n('actively','act+ive+ly','in a way that involves taking part'),n('activity','act+ive+ity','something you do','Drop the final e before -ity.'),n('activities','act+ive+ity+es','things you do','Change the final y to i before -es.'),
      n('inactive','in+act+ive','not moving or taking part'),n('inactivity','in+act+ive+ity','a lack of movement or activity','Drop the final e before -ity.')
    ]},
    {base:'art',meaning:'creative work or skill',focus:'-ist · -ic',words:[
      n('artist','art+ist','a person who makes art'),n('artists','art+ist+s','more than one person who makes art'),n('artistic','art+ist+ic','connected with art or skill in making it')
    ]},
    {base:'hero',meaning:'someone admired for brave or helpful actions',focus:'super- · -es · -ic',words:[
      n('heroes','hero+es','more than one hero'),n('superhero','super+hero','a fictional hero with extraordinary abilities'),n('superheroes','super+hero+es','more than one superhero'),
      n('heroic','hero+ic','very brave or like a hero'),n('heroism','hero+ism','great bravery or heroic actions')
    ]},
    {base:'music',meaning:'sounds arranged with rhythm or melody',focus:'-al · -ian · -ity',words:[
      n('musical','music+al','connected with music'),n('musically','music+al+ly','in a way that involves music'),n('musician','music+ian','a person who makes or performs music'),n('musicians','music+ian+s','more than one person who makes music'),n('musicality','music+al+ity','skill or sensitivity in music')
    ]},
    {base:'danger',meaning:'the possibility of harm',focus:'-ous · en- · -ment',words:[
      n('dangers','danger+s','things or situations that could cause harm'),n('dangerous','danger+ous','likely to cause harm'),n('dangerously','danger+ous+ly','in a way that could cause harm'),
      n('endanger','en+danger','put someone or something at risk of harm'),n('endangers','en+danger+s','puts someone or something at risk'),n('endangered','en+danger+ed','put at risk of harm; a species may be at risk of disappearing'),n('endangering','en+danger+ing','putting someone or something at risk'),n('endangerment','en+danger+ment','the act of putting someone or something at risk')
    ]},
    {base:'assist',meaning:'help someone do something',focus:'-ant · -ance',words:[
      n('assists','assist+s','helps someone do something'),n('assisted','assist+ed','helped someone do something'),n('assisting','assist+ing','helping someone do something'),
      n('assistant','assist+ant','a person who helps'),n('assistants','assist+ant+s','more than one person who helps'),n('assistance','assist+ance','help or support')
    ]},
    {base:'depend',meaning:'rely on someone or something',focus:'in- · -ent · -ence',words:[
      n('depends','depend+s','relies on someone or something'),n('depended','depend+ed','relied on someone or something'),n('depending','depend+ing','relying on someone or something'),
      n('dependent','depend+ent','relying on someone or something'),n('dependents','depend+ent+s','people who rely on someone else for support'),n('dependence','depend+ence','reliance on someone or something'),
      n('independent','in+depend+ent','able to act without relying on someone else'),n('independently','in+depend+ent+ly','without relying on someone else'),n('independence','in+depend+ence','the ability or freedom to act for yourself')
    ]},
    {base:'dark',meaning:'having little or no light',focus:'-en · -er · -est',words:[
      n('darker','dark+er','more dark'),n('darkest','dark+est','most dark'),n('darkly','dark+ly','in a dark or gloomy way'),n('darkness','dark+ness','a lack of light'),
      n('darken','dark+en','make or become darker'),n('darkens','dark+en+s','makes or becomes darker'),n('darkened','dark+en+ed','made or became darker'),n('darkening','dark+en+ing','making or becoming darker')
    ]},
    {base:'modern',meaning:'connected with recent times or new ideas',focus:'-ize · -ity · -ist',words:[
      n('modernize','modern+ize','change something to suit recent times or new ideas'),n('modernizes','modern+ize+s','changes something to suit recent times'),n('modernized','modern+ize+ed','changed something to suit recent times','Drop the final e before -ed.'),n('modernizing','modern+ize+ing','changing something to suit recent times','Drop the final e before -ing.'),
      n('modernization','modern+ize+ation','the process of making something modern','Drop the final e of -ize before -ation.'),
      n('modernity','modern+ity','the quality of being modern'),n('modernist','modern+ist','someone who favours new ideas or styles'),n('modernists','modern+ist+s','people who favour new ideas or styles')
    ]},
    {base:'pony',meaning:'a small horse',focus:'y → i · plural -es',words:[
      n('ponies','pony+es','more than one pony','Change the final y to i before -es.')
    ]},
    {base:'leaf',meaning:'a flat plant part that often grows from a stem',focus:'f → v · -es · -y · -less',words:[
      n('leaves','leaf+es','more than one leaf','Change the final f to v before -es.'),
      n('leafy','leaf+y','covered with many leaves'),n('leafier','leaf+y+er','covered with more leaves','Change y to i before -er.'),n('leafiest','leaf+y+est','covered with the most leaves','Change y to i before -est.'),n('leafless','leaf+less','having no leaves')
    ]},
    {base:'flex',meaning:'bend or tighten a muscle',focus:'-ible · -ity · in-',words:[
      n('flexes','flex+es','bends or tightens a muscle'),n('flexed','flex+ed','bent or tightened a muscle'),n('flexing','flex+ing','bending or tightening a muscle'),
      n('flexible','flex+ible','able to bend or adapt'),n('flexibly','flex+ible+ly','in a way that can bend or adapt','Change the ending -ible to -ibly.'),n('flexibility','flex+ible+ity','the ability to bend or adapt','Before -ity, -ible changes to -ibil-.'),
      n('inflexible','in+flex+ible','not able or willing to bend or adapt'),n('inflexibly','in+flex+ible+ly','in a way that does not bend or adapt','Change the ending -ible to -ibly.'),n('inflexibility','in+flex+ible+ity','an inability or unwillingness to bend or adapt','Before -ity, -ible changes to -ibil-.')
    ]}
  ];
});
