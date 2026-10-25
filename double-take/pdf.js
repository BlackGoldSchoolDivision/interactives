(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./vendor/jspdf.umd.min.js').jsPDF,require('./vendor/print-fonts.js'),require('./model.js'));else root.DoubleTakePDF=factory(root.jspdf.jsPDF,root.LadderPrintFonts,root.DoubleTake);})(typeof globalThis!=='undefined'?globalThis:this,function(jsPDF,fonts,M){
  'use strict';
  const clean=s=>String(s).replace(/[\u2010-\u2015]/g,'-').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[^\x20-\x7e\n]/g,'');
  const chunk=(items,n)=>Array.from({length:Math.ceil(items.length/n)},(_,i)=>items.slice(i*n,(i+1)*n));
  function pages(questions,key=false){return chunk(questions,4).map(questions=>({questions,key:false})).concat(key?chunk(questions,8).map(questions=>({questions,key:true})):[]);}
  const filename=qs=>'double-take-'+qs[0].level+'-'+qs[0].mode+'.pdf';
  function build(questions,{answerKey=false,paper='letter'}={}){
    if(!questions.length)throw Error('Choose some questions.');const doc=new jsPDF({unit:'pt',format:paper==='a4'?'a4':'letter',compress:true,putOnlyUsedFonts:true});
    doc.addFileToVFS('LadderPrint-Regular.ttf',fonts.normal);doc.addFont('LadderPrint-Regular.ttf','Print','normal');doc.addFileToVFS('LadderPrint-Bold.ttf',fonts.bold);doc.addFont('LadderPrint-Bold.ttf','Print','bold');
    doc.setProperties({title:'Double Take - word practice',author:'Engaging Students - Black Gold School Division',creator:'Double Take teacher PDF'});
    const plan=pages(questions,answerKey);let number=0,keyNumber=0;
    plan.forEach((p,i)=>{if(i)doc.addPage();const w=doc.internal.pageSize.getWidth(),h=doc.internal.pageSize.getHeight(),margin=36,content=w-margin*2;doc.setTextColor(22,35,48);doc.setDrawColor(120);doc.setLineWidth(.6);doc.setFont('Print','bold');doc.setFontSize(26);doc.text('Double Take',margin,52);doc.setFont('Print','normal');doc.setFontSize(10);const level=M.levels[questions[0].level].name,mode=M.modes[questions[0].mode].name;doc.text(clean(level+' | '+mode+' | '+(p.key?'TEACHER ANSWER KEY':'Student practice')),margin,72);doc.line(margin,83,w-margin,83);
      if(!p.key){doc.setFontSize(11);doc.text('Name: ______________________________   Date: ______________',margin,109);doc.setFontSize(10);doc.text('Circle the sticker that fits. Underline a clue in each sentence.',margin,132);
        p.questions.forEach((q,k)=>{const y=156+k*142;number++;doc.setFont('Print','bold');doc.setFontSize(10);doc.text(clean(number+'. '+(q.mode==='sound'?'Find the missing word.':'Find the meaning of "'+q.focus+'".')),margin,y);doc.setFont('Print','normal');doc.setFontSize(13);doc.text(doc.splitTextToSize(clean(q.sentence.replace('___','__________')),content),margin,y+22);
          const opts=M.options(q,1047),gap=13,bw=(content-gap)/2;opts.forEach((o,j)=>{const x=margin+j*(bw+gap);doc.setDrawColor(130);doc.roundedRect(x,y+55,bw,44,5,5);doc.setFont('Print','bold');doc.setFontSize(q.mode==='sound'?13:10.5);const label=clean(q.mode==='sound'?o.label.toUpperCase():o.label);doc.text(doc.splitTextToSize(label,bw-20),x+10,y+73);});doc.setFont('Print','normal');doc.setFontSize(9);doc.setTextColor(80);doc.text('My clue:',margin,y+119);doc.line(margin+40,y+121,w-margin,y+121);doc.setTextColor(22,35,48);
        });
      }else{doc.setFontSize(10);doc.text('Answers and explanations. Keep separate from student pages.',margin,109);p.questions.forEach((q,k)=>{const y=141+k*74;keyNumber++;const answer=q.options[q.answer].label;doc.setFont('Print','bold');doc.setFontSize(11);doc.text(doc.splitTextToSize(clean(keyNumber+'. '+q.focus.toUpperCase()+' - '+answer),content),margin,y);doc.setFont('Print','normal');doc.setFontSize(9.5);doc.text(doc.splitTextToSize(clean(q.why),content),margin,y+23);});}
      doc.setDrawColor(170);doc.line(margin,h-39,w-margin,h-39);doc.setFont('Print','normal');doc.setFontSize(8);doc.setTextColor(80);doc.text('Engaging Students | Black Gold School Division',margin,h-24);doc.text((p.key?'Answer key':'Student practice')+' | '+(i+1)+' / '+plan.length,w-margin,h-24,{align:'right'});
    });return doc;
  }
  return {pages,filename,build};
});
