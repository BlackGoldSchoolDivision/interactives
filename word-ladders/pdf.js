(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./vendor/jspdf.umd.min.js').jsPDF,require('./vendor/print-fonts.js'));else root.LadderPDF=factory(root.jspdf.jsPDF,root.LadderPrintFonts);})(typeof globalThis!=='undefined'?globalThis:this,function(jsPDF,fonts){
  'use strict';
  const clean=s=>String(s).replace(/[\u2010-\u2015]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[^\x20-\x7e\n]/g,'');
  function pages(puzzles,answerKey=false){return puzzles.map(puzzle=>({puzzle,key:false})).concat(answerKey?puzzles.map(puzzle=>({puzzle,key:true})):[]);}
  function filename(puzzles){return puzzles.length===1?'word-ladders-'+puzzles[0].words[0].toLowerCase()+'-to-'+puzzles[0].words[5].toLowerCase()+'.pdf':'word-ladders-'+puzzles[0].level+'-pack.pdf';}
  function build(puzzles,{answerKey=false,paper='letter'}={}){
    if(!puzzles.length)throw new Error('Choose at least one ladder.');
    const doc=new jsPDF({unit:'pt',format:paper==='a4'?'a4':'letter',orientation:'portrait',compress:true,putOnlyUsedFonts:true});
    doc.addFileToVFS('LadderPrint-Regular.ttf',fonts.normal);doc.addFont('LadderPrint-Regular.ttf','LadderPrint','normal');doc.addFileToVFS('LadderPrint-Bold.ttf',fonts.bold);doc.addFont('LadderPrint-Bold.ttf','LadderPrint','bold');
    doc.setProperties({title:'Word Ladders - '+(puzzles.length===1?puzzles[0].words[0]+' to '+puzzles[0].words[5]:puzzles[0].level+' pack'),author:'Engaging Students - Black Gold School Division',creator:'Word Ladders teacher PDF'});
    const plan=pages(puzzles,answerKey);
    plan.forEach(({puzzle:p,key},page)=>{
      if(page)doc.addPage();const w=doc.internal.pageSize.getWidth(),h=doc.internal.pageSize.getHeight();
      const margin=36;doc.setTextColor(22,43,64);doc.setFont('LadderPrint','bold');doc.setFontSize(27);doc.text('Word Ladders',margin,53);
      doc.setFontSize(10);doc.setFont('LadderPrint','normal');doc.text(clean(p.level[0].toUpperCase()+p.level.slice(1)+' | Six words, five changes'),margin,73);
      doc.setDrawColor(75,92,106);doc.setLineWidth(.8);doc.line(margin,84,w-margin,84);
      doc.setFont('LadderPrint','bold');doc.setFontSize(17);doc.text(p.words[0]+'  to  '+p.words[5],margin,110);
      if(key){doc.setFontSize(11);doc.text('TEACHER ANSWER KEY',w-margin,110,{align:'right'});}
      else {doc.setFont('LadderPrint','normal');doc.setFontSize(11);doc.text('Name:',margin,139);doc.line(margin+36,141,w*.62,141);doc.text('Date:',w*.67,139);doc.line(w*.67+31,141,w-margin,141);}
      doc.setFont('LadderPrint','normal');doc.setFontSize(11);
      const directions=key?'One checked route is shown. In free climb, other valid routes may also work.':'Start at the bottom. Follow each clue and change exactly one letter. Keep the letters in the same order.';
      doc.text(doc.splitTextToSize(directions,w-margin*2),margin,172);
      const size=Math.min(46,Math.floor((252-(p.words[0].length-1)*5)/p.words[0].length)),gap=5;
      const boxes=p.words[0].length*size+(p.words[0].length-1)*gap;
      const left=69+(253-boxes)/2,clueX=347,clueWidth=w-margin-clueX;
      for(let row=0;row<6;row++){
        const i=5-row,y=215+row*72,word=p.words[i],shown=key||i===0;
        doc.setDrawColor(130);doc.setLineWidth(.65);doc.circle(49,y+size/2,10);
        doc.setFont('LadderPrint','bold');doc.setFontSize(10);doc.setTextColor(55);doc.text(String(i+1),49,y+size/2+3.5,{align:'center'});
        if(row<5)doc.line(49,y+size/2+10,49,y+72+size/2-10);
        for(let j=0;j<word.length;j++){
          const x=left+j*(size+gap);doc.setDrawColor(100);doc.setFillColor(255);doc.setLineWidth(.75);doc.roundedRect(x,y,size,size,3,3,'FD');
          if(shown){doc.setFont('LadderPrint','bold');doc.setFontSize(size*.57);doc.setTextColor(20);doc.text(word[j],x+size/2,y+size*.71,{align:'center'});}
        }
        doc.setFont('LadderPrint','bold');doc.setFontSize(10);doc.setTextColor(35);
        doc.text(i===0?'START':i===5?'FINISH':'CLUE '+i,clueX,y+10);
        doc.setFont('LadderPrint','normal');doc.setFontSize(11);
        doc.text(doc.splitTextToSize(clean(i===0?'Your first word is given.':p.clues[i]),clueWidth),clueX,y+26);
        if(key&&i>0){const pos=[...word].findIndex((c,k)=>c!==p.words[i-1][k]);doc.setFontSize(9);doc.setTextColor(90);doc.text('Letter '+(pos+1)+': '+p.words[i-1][pos]+' to '+word[pos],clueX,y+57);}
      }
      doc.setTextColor(45);doc.setFont('LadderPrint','normal');doc.setFontSize(11);
      if(!key){doc.text('Read your ladder aloud. Which word was new to you?',margin,h-91);doc.setDrawColor(160);doc.line(margin,h-69,w-margin,h-69);}
      doc.setDrawColor(180);doc.line(margin,h-44,w-margin,h-44);doc.setFontSize(8);doc.setTextColor(85);
      doc.text('Engaging Students | Black Gold School Division',margin,h-29);doc.text((key?'Answer key':'Student worksheet')+' | '+(page+1)+' / '+plan.length,w-margin,h-29,{align:'right'});
      doc.setFontSize(7);doc.text('interactives.blackgold.ca/word-ladders/',margin,h-17);
    });
    return doc;
  }
  return {build,pages,filename};
});
