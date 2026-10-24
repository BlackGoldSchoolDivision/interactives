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
    ]}
  ];
});
