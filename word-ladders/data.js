(function(root,factory){const data=factory();if(typeof module==='object'&&module.exports)module.exports=data;else root.LadderPuzzles=data;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const p=(id,level,words,clues)=>({id,level,words:words.split(' '),clues:['Start here.',...clues]});
  return [
    p('head-tail','explorer','HEAD HEAL TEAL TELL TALL TAIL',['Get better after an injury.','A blue-green colour.','Give someone information.','Having a great height.','Part that sticks out behind many animals.']),
    p('hat-fit','starter','HAT CAT CAN FAN FIN FIT',['An animal that often purrs.','A metal container for food.','Something that moves air to cool you.','A part that helps a fish swim.','Be the right size or shape.']),
    p('cat-pig','starter','CAT COT DOT DOG DIG PIG',['A small bed.','A small round mark.','An animal that often barks.','Make a hole in the ground.','A farm animal with a snout.']),
    p('sun-pan','starter','SUN FUN FAN FIN PIN PAN',['Something you enjoy.','Something that moves air to cool you.','A part that helps a fish swim.','A small pointed fastener.','A shallow container used for cooking.']),
    p('map-dog','starter','MAP MAT CAT COT DOT DOG',['A covering placed on the floor.','An animal that often purrs.','A small bed.','A small round mark.','An animal that often barks.']),
    p('bed-dog','starter','BED BAD BAG BIG DIG DOG',['The opposite of good.','Something used to carry things.','Large in size.','Make a hole in the ground.','An animal that often barks.']),
    p('pen-cat','starter','PEN PIN PIT SIT SAT CAT',['A small pointed fastener.','A deep hole in the ground.','Rest on a chair.','Rested on a chair.','An animal that often purrs.']),
    p('cold-warm','explorer','COLD CORD CARD CARE WARE WARM',['A thick string or thin rope.','A small rectangle of stiff paper.','Look after someone or something.','A manufactured product, especially pottery.','A little hot, in a pleasant way.']),
    p('milk-will','explorer','MILK MILE MILD WILD WILT WILL',['A unit of distance, about 1.6 kilometres.','Not strong or severe.','Living in nature, not tame.','Droop because of heat or a lack of water.','Complete this sentence: I ___ help you tomorrow.']),
    p('sand-word','explorer','SAND HAND HARD CARD CORD WORD',['The body part at the end of an arm.','Firm and difficult to bend.','A small rectangle of stiff paper.','A thick string or thin rope.','A unit of language with a meaning.']),
    p('book-goal','explorer','BOOK BOOT BOAT COAT COAL GOAL',['Footwear that covers the ankle.','A small vessel that travels on water.','Outer clothing worn to keep warm.','A black rock used as a fuel.','Something you aim to achieve.']),
    p('fish-most','explorer','FISH FIST FAST LAST LOST MOST',['A tightly closed hand.','Moving at a high speed.','Coming after all the others.','Unable to find the way.','The greatest amount or number.']),
    p('stone-spark','expert','STONE SHONE SHORE SHARE SHARK SPARK',['Gave out light; the past tense of shine.','The land along the edge of water.','Let someone use or have part of something.','A fish with a skeleton made of cartilage.','A tiny bright piece that flies from a fire.']),
    p('plate-scent','expert','PLATE PLANE PLANT SLANT SCANT SCENT',['An aircraft with fixed wings.','A living thing such as a tree or flower.','Slope or lean to one side.','Barely enough; limited in amount.','A smell, especially a noticeable one.']),
    p('brain-grail','expert','BRAIN DRAIN TRAIN TRAIL FRAIL GRAIL',['A pipe or channel that carries water away.','A line of railway carriages.','A path or track through an area.','Physically weak or delicate.','An object or goal people eagerly search for.']),
    p('smart-black','expert','SMART START STARK STACK SLACK BLACK',['Begin doing something.','Plain, severe or very noticeable.','A neat pile of things.','Loose rather than pulled tight.','The darkest colour.']),
    p('sweet-cheek','expert','SWEET SHEET SHEEP SHEER CHEER CHEEK',['A large thin piece of material or paper.','An animal raised for wool.','Very steep, as a cliff can be.','Shout to show encouragement.','The side of the face below an eye.']),
    p('master-sorter','expert','MASTER FASTER FOSTER POSTER PORTER SORTER',['Moving more quickly.','Encourage something to develop.','A large printed notice or picture.','A person whose job is to carry luggage or goods.','A person or machine that puts things into groups.'])
  ];
});
