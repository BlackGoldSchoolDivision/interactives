"""Build local spoken prompts with the installed Flite synthesizer in FFmpeg."""
import json, pathlib, subprocess, wave
root=pathlib.Path(__file__).resolve().parent.parent
work=root/'speech-work';work.mkdir(exist_ok=True)
texts={
 'q-distance':'Which car will go farther? Tap a track. Then press play. Tap both if you think they will match.',
 'q-speed':'Which car will pass the white line faster? Tap a track. Then press play.',
 'q-stop':'Which car will stop first? Tap a track. Then press play.',
 'q-target':'Which car will reach its flag? Tap a track. Then press play.',
 'choose-a':'The top track. Press play to test your idea.',
 'choose-b':'The bottom track. Press play to test your idea.',
 'choose-same':'Both tracks. Press play to test your idea.',
 'result-wood-felt':'The top car went farther. The felt slowed the other car more. Press the arrow to keep exploring.',
 'result-speed':'The bottom car passed the white line faster. The wood slowed its car less. Press the arrow to keep exploring.',
 'result-height':'The bottom car went farther. It started higher. Press the arrow to keep exploring.',
 'result-sandpaper':'The top car stopped first. The sandpaper slowed that car more. Press the arrow to keep exploring.',
 'result-same':'They matched! Both tracks were the same. Press the arrow to keep exploring.',
 'result-flag':'The bottom car reached the flag. The felt car stopped before its flag. Press the arrow to keep exploring.',
 'free-a':'The top car went farther. Look at what changed. Press the arrow to change your experiment.',
 'free-b':'The bottom car went farther. Look at what changed. Press the arrow to change your experiment.',
 'free-same':'They matched! Press the arrow to change your experiment.',
 'complete':'You did it! You made predictions and tested your ideas. Press the round arrow to play again.'
}
rate=22050;cues={};parts=[];cursor=0
for i,(key,text) in enumerate(texts.items()):
    textfile=work/f'{i}.txt';textfile.write_text(text)
    wav=work/f'{i}.wav'
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','lavfi','-i',f'flite=textfile={textfile}:voice=slt','-af','atempo=0.94','-ar',str(rate),'-ac','1',str(wav)],check=True)
    with wave.open(str(wav),'rb') as f:
        frames=f.readframes(f.getnframes());length=len(frames)//2
    cues[key]={'text':text,'start':round(cursor/rate,5),'end':round((cursor+length)/rate,5)}
    parts.extend([frames,b'\0\0'*int(rate*.4)]);cursor+=length+int(rate*.4)
joined=work/'speech.wav'
with wave.open(str(joined),'wb') as f:
    f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(b''.join(parts))
dest=root/'assets/speech.mp3'
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(joined),'-codec:a','libmp3lame','-b:a','48k',str(dest)],check=True)
(root/'speech.js').write_text('/* Local synthesized English prompts. Build: python3 source/make-speech.py */\nwindow.RollSpeech='+json.dumps({'cues':cues},separators=(',',':'))+';\n')
print(json.dumps({'clips':len(cues),'seconds':round(cursor/rate,1),'bytes':dest.stat().st_size}))
