/* ==========================================================================
       BLACK GOLD SPELLING BENCH
       ========================================================================== */
    (() => {
      'use strict';

      const STORAGE_KEY = 'bgsd-spelling-bench-v1';
      const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
      const BUILTIN_LISTS = [
        { id: 'list-3letter', name: 'Three-letter words', words: ['bag', 'cat', 'dog', 'sun', 'hat', 'cup', 'pig', 'bus', 'fox', 'bug'] },
        { id: 'list-animals', name: 'Animals', words: ['leopard', 'tiger', 'panda', 'whale', 'frog', 'duck'] },
        { id: 'list-colors', name: 'Colours', words: ['red', 'blue', 'green', 'yellow', 'white', 'black'] },
        { id: 'list-dolch', name: 'Dolch Sight Words', words: ['the', 'and', 'said', 'play', 'come', 'look', 'make', 'jump'] },
        { id: 'list-digraphs', name: 'Digraphs', words: ['ship', 'chat', 'thin', 'whip', 'fish', 'path'] },
        { id: 'list-clusters', name: 'Consonant Clusters', words: ['frog', 'clap', 'star', 'drum', 'swim', 'tree'] },
        { id: 'list-double', name: 'Double Consonants', words: ['bell', 'hill', 'moss', 'puff', 'doll', 'buzz'] },
        { id: 'list-family', name: 'Family & Home', words: ['mom', 'dad', 'home', 'book', 'lamp', 'desk'] }
      ];

      // Rack layouts (2 rows x 14 = 28 slots, last slot is 123- toggle)
      const RACK_ALPHABETICAL = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u','v','w','x','y','z','SPACE','123'
      ];
      const RACK_VOWELS_FIRST = [
        'a','e','i','o','u','b','c','d','f','g','h','j','k','l',
        'm','n','p','q','r','s','t','v','w','x','y','z','SPACE','123'
      ];
      const RACK_NUMBERS = [
        '1','2','3','4','5','6','7','8','9','0','-','\'','!','?',
        'a','e','i','o','u','b','c','d','m','n','s','t','SPACE','ABC'
      ];

      function createDefaultState() {
        return {
          settings: {
            audioEnabled: true,
            speechMode: 'phonics', // 'phonics' | 'names'
            rackLayout: 'alphabetical', // 'alphabetical' | 'vowels-first'
            showPracticeGuides: true
          },
          activeListId: 'list-3letter',
          customLists: [],
          activeUserId: 'local-learner',
          users: [{ id:'local-learner', name:'Learner', reports:[] }]
        };
      }
      const wordPattern = /^[a-z]+(?:[' -][a-z]+)*$/;
      function normaliseWord(value) {
        return value.trim().toLowerCase().replace(/[‘’]/g, "'").replace(/[‐‑]/g,'-').replace(/\s+/g,' ');
      }

      let state = loadState();
      let currentScreen = 'practice'; // 'home' | 'movable' | 'practice' | 'scrambled' | 'quiz'
      let rackNumberMode = false;
      let activity = null;
      let movableBoard = {
        rows: [[], [], []],
        activeRow: 0
      };

      const studentSessions = new Map();
      const studentBoards = new Map();
      let returnFocus;
      let modalState = {
        type: null, // 'lists' | 'reports' | 'settings'
        listsTab: 'builtin',
        editingListId: null,
        selectedReportId: null,
        confirmDeleteId: null
      };

      /* ========================================================================
         PERSISTENCE & DATA ACCESSORS
         ======================================================================== */
      function loadState() {
        try {
          let raw = localStorage.getItem(STORAGE_KEY);
          if (!raw) {
            // Read settings and genuine reports from the earlier local prototype, if present.
            const signature = key => [...key].reduce((h,ch) => (Math.imul(31,h) + ch.charCodeAt(0)) | 0, 0);
            for(let i=0;i<localStorage.length;i++){
              const key=localStorage.key(i);
              if(key && key.length===24 && signature(key)===-120008036){raw=localStorage.getItem(key);break}
            }
          }
          if (!raw) return createDefaultState();
          const parsed=JSON.parse(raw), def=createDefaultState();
          const isRecord = o => o && typeof o.id==='string' && /^[a-z0-9_-]+$/i.test(o.id);
          const lists = (Array.isArray(parsed.customLists)?parsed.customLists:[]).filter(l=>isRecord(l)&&typeof l.name==='string'&&Array.isArray(l.words)).map(l=>({...l,words:l.words.filter(w=>typeof w==='string').map(normaliseWord).filter(w=>wordPattern.test(w))})).filter(l=>l.words.length);
          const users = (Array.isArray(parsed.users)?parsed.users:[]).filter(u=>isRecord(u)&&typeof u.name==='string').map(u=>({...u,reports:(Array.isArray(u.reports)?u.reports:[]).filter(r=>isRecord(r)&&!/^rep-seed-/.test(r.id)&&Array.isArray(r.words)&&r.words.every(w=>w&&typeof w.word==='string'&&Number.isFinite(w.duration))&&Number.isFinite(r.score))}));
          if(!users.length)users.push(...def.users);
          return {
            settings: {...def.settings, ...(parsed.settings || {})},
            activeListId:[...BUILTIN_LISTS,...lists].some(l=>l.id===parsed.activeListId)?parsed.activeListId:def.activeListId,
            activeUserId:users.some(u=>u.id===parsed.activeUserId)?parsed.activeUserId:users[0].id,
            customLists:lists, users
          };
        } catch {
          return createDefaultState();
        }
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
          return true;
        } catch (_) { showToast('Storage is unavailable. Work stays in this tab.'); return false; }
      }

      function getAllLists() {
        return [...BUILTIN_LISTS, ...state.customLists];
      }

      function getActiveList() {
        return getAllLists().find(l => l.id === state.activeListId) || BUILTIN_LISTS[0];
      }

      function getActiveUser() {
        return state.users.find(u => u.id === state.activeUserId) || state.users[0];
      }

      function escapeHtml(str) {
        return String(str)
          .replace(/&/g, '&amp;').replace(/</g, '&lt;')
          .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }

      function isVowel(ch) {
        return VOWELS.has(String(ch).toLowerCase());
      }

      /* ========================================================================
         WEB AUDIO API (TACTILE SFX) & WEB SPEECH API (PHONICS / NAMES)
         ======================================================================== */
      let audioCtx = null;
      function getAudioCtx() {
        if (!audioCtx) {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          if (Ctx) audioCtx = new Ctx();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume().catch(() => {});
        }
        return audioCtx;
      }

      function playWoodClick() {
        if (!state.settings.audioEnabled) return;
        const ctx = getAudioCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(560, now);
          osc.frequency.exponentialRampToValueAtTime(195, now + 0.05);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.06);
        } catch (_) {}
      }

      function playPaperSnap() {
        if (!state.settings.audioEnabled) return;
        const ctx = getAudioCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(340, now);
          osc.frequency.exponentialRampToValueAtTime(620, now + 0.045);
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.055);
        } catch (_) {}
      }

      function playWrongWobble() {
        if (!state.settings.audioEnabled) return;
        const ctx = getAudioCtx();
        if (!ctx) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(195, now);
          osc.frequency.linearRampToValueAtTime(140, now + 0.12);
          osc.frequency.linearRampToValueAtTime(110, now + 0.22);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.25);
        } catch (_) {}
      }

      function playMarimbaWin() {
        if (!state.settings.audioEnabled) return;
        const ctx = getAudioCtx();
        if (!ctx) return;
        try {
          const notes = [523.25, 659.25, 783.99, 1046.5];
          const now = ctx.currentTime;
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            const t = now + idx * 0.075;
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.001, t);
            gain.gain.linearRampToValueAtTime(0.17, t + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.34);
          });
        } catch (_) {}
      }

      let narration;
      let speechId=0;
      let stopSoundTimer;
      function stopReading(){
        speechId++;
        clearTimeout(stopSoundTimer);
        if(narration){narration.onloadedmetadata=null;narration.ontimeupdate=null;narration.pause()}
        window.speechSynthesis?.cancel();
      }
      function playClip(key, token){
        const clip=SPEECH_CLIPS[key];
        if(!clip || token!==speechId)return false;
        const player=narration ||= new Audio(window.BENCH_AUDIO || 'assets/spelling-audio.mp3');
        function begin(){
          if(token!==speechId)return;
          player.currentTime=clip[0];
          player.ontimeupdate=()=>{if(token===speechId && player.currentTime>=clip[1])player.pause()};
          player.play().then(()=>{
            if(token===speechId)stopSoundTimer=setTimeout(()=>player.pause(),Math.max(0,(clip[1]-player.currentTime)*1000));
          }).catch(()=>{if(token===speechId) showToast('Tap the speaker again to play the sound.')});
        }
        if(player.readyState>=1)begin();else player.onloadedmetadata=begin;
        return true;
      }
      function speakText(text, rate=0.9, recordedCue = null) {
        if(!state.settings.audioEnabled || !text)return;
        stopReading();
        const token = speechId;
        const key = recordedCue || text.toLowerCase().trim();
        const reserved = key === 'feedback' || key.startsWith('name-') || key.startsWith('sound-');
        if((recordedCue || !reserved) && Object.hasOwn(SPEECH_CLIPS,key) && playClip(key,token))return;
        const fail=()=>{if(token===speechId)showToast('This device could not read that text aloud. Ask a partner to read it.')};
        if(!window.speechSynthesis || !window.SpeechSynthesisUtterance){fail();return}
        try {
          const u=new SpeechSynthesisUtterance(text);
          const voices=window.speechSynthesis.getVoices();
          const voice=voices.find(v=>v.lang==='en-CA') || voices.find(v=>/^en[-_]/i.test(v.lang));
          if(voice)u.voice=voice;
          u.lang=voice?.lang || 'en-CA';u.rate=rate;
          u.onerror=e=>{if(!['interrupted','canceled'].includes(e.error))fail()};
          window.speechSynthesis.speak(u);
        } catch {fail()}
      }
      function speakLetter(ch) {
        if(!state.settings.audioEnabled)return;
        if(!/^[a-z]$/i.test(ch)){speakText(ch===' '?'space':ch);return}
        stopReading();
        playClip((state.settings.speechMode==='phonics'?'sound-':'name-')+ch.toLowerCase(),speechId);
      }

      /* ========================================================================
         VISUAL EFFECTS: TOAST & STAR CONFETTI BURST
         ======================================================================== */
      let toastTimer = null;
      function showToast(msg) {
        const el = document.getElementById('toast');
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => el.classList.remove('show'), 2100);
      }

      function burstStarConfetti() {
        const layer = document.getElementById('confettiLayer');
        const colors = ['#f4c65d', '#a2d89d', '#f29b8e', '#b4daf4', '#f5edd4', '#d1c2ee'];
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight * 0.44;
        for (let i = 0; i < 24; i++) {
          const wrap = document.createElement('div');
          wrap.className = 'confetti-star';
          const angle = (Math.PI * 2 * i) / 24 + (Math.random() * 0.25);
          const dist = 75 + Math.random() * 165;
          const size = 12 + Math.random() * 10;
          wrap.style.left = `${cx}px`;
          wrap.style.top = `${cy}px`;
          wrap.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
          wrap.style.setProperty('--dy', `${Math.sin(angle) * dist - 40}px`);
          wrap.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><path d="M12 1 L14.8 9.2 L23 12 L14.8 14.8 L12 23 L9.2 14.8 L1 12 L9.2 9.2 Z" fill="${colors[i % colors.length]}" stroke="#1b1a38" stroke-width="1.2"/></svg>`;
          layer.appendChild(wrap);
          setTimeout(() => wrap.remove(), 950);
        }
      }

      /* ========================================================================
         SVG COMPONENT BUILDERS: DOG-EARED PAPER TILE, DECKLED BANNER, WOODCUTS
         ========================================================================== */
      function getTilePalette(ch, variant = 'default') {
        if (variant === 'num') {
          return { fill: '#fef9c3', fold: '#fde68a', ink: '#1e1b4b' };
        }
        if (variant === 'apricot') {
          return { fill: '#ffedd5', fold: '#fed7aa', ink: isVowel(ch) ? '#b91c1c' : '#1e3a8a' };
        }
        if (variant === 'sage') {
          return { fill: '#dcfce7', fold: '#bbf7d0', ink: isVowel(ch) ? '#b91c1c' : '#1e3a8a' };
        }
        if (variant === 'lavender') {
          return { fill: '#ede9fe', fold: '#ddd6fe', ink: isVowel(ch) ? '#b91c1c' : '#1e1b4b' };
        }
        if (isVowel(ch)) {
          return { fill: '#ffe8e5', fold: '#f7c5be', ink: '#b91c1c' };
        }
        return { fill: '#e0f2fe', fold: '#bae6fd', ink: '#1e3a8a' };
      }

      function buildPaperTileHtml({ ch, sizeClass = 'rack-size', variant = 'default', extraClass = '', attrs = '' }) {
        const pal = getTilePalette(ch, variant);
        const displayLabel = ch === '123'
          ? '12<br/>3-'
          : (ch === 'ABC' ? 'AB<br/>C' : (ch === 'SPACE' ? '␣' : escapeHtml(ch)));
        const extraTypeClass = (ch === '123' || ch === 'ABC') ? 'num-toggle' : '';
        const textStyle = (ch === '123' || ch === 'ABC') ? '' : `color:${pal.ink};`;

        // Crisp dog-eared paper card SVG with thick comic ink outline & folded top-right flap
        return `
          <button type="button" class="paper-tile ${sizeClass} ${extraTypeClass} ${extraClass}" ${attrs}>
            <svg class="paper-tile-svg" viewBox="0 0 80 96" preserveAspectRatio="none" aria-hidden="true">
              <path d="M12 3 H55 L76 24 V85 Q76 93 68 93 H12 Q4 93 4 85 V11 Q4 3 12 3 Z"
                fill="${pal.fill}" stroke="#1b1a38" stroke-width="4.2" stroke-linejoin="round"/>
              <path d="M55 3 V18 Q55 24 61 24 H76 Z"
                fill="${pal.fold}" stroke="#1b1a38" stroke-width="3.6" stroke-linejoin="round"/>
            </svg>
            <span class="paper-tile-char" style="${textStyle}">${displayLabel}</span>
          </button>
        `;
      }

      function buildDeckledBannerSvg() {
        return `
          <svg class="deckled-svg-bg" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <pattern id="parchmentPattern" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="14" cy="14" r="1.4" fill="#d9cca8" opacity="0.55"/>
                <path d="M14 9 L16 14 L14 19 L12 14 Z" fill="#e0d4b3" opacity="0.45"/>
              </pattern>
            </defs>
            <path d="M14 12 C45 6, 82 14, 125 9 C170 5, 218 13, 270 8 C328 4, 386 12, 448 8 C512 4, 578 13, 644 8 C710 4, 774 12, 838 8 C896 4, 945 11, 988 9 L992 42 L989 88 L993 132 L986 168 C942 174, 888 166, 832 171 C770 175, 706 167, 640 172 C572 176, 504 168, 438 172 C374 176, 312 167, 250 172 C192 175, 134 167, 78 171 C46 174, 24 169, 10 165 L6 128 L10 86 L6 44 Z"
              fill="#f5edd4" stroke="#e4d7b4" stroke-width="2"/>
            <path d="M14 12 C45 6, 82 14, 125 9 C170 5, 218 13, 270 8 C328 4, 386 12, 448 8 C512 4, 578 13, 644 8 C710 4, 774 12, 838 8 C896 4, 945 11, 988 9 L992 42 L989 88 L993 132 L986 168 C942 174, 888 166, 832 171 C770 175, 706 167, 640 172 C572 176, 504 168, 438 172 C374 176, 312 167, 250 172 C192 175, 134 167, 78 171 C46 174, 24 169, 10 165 L6 128 L10 86 L6 44 Z"
              fill="url(#parchmentPattern)"/>
          </svg>
        `;
      }

      /* ========================================================================
         INDIGO WOODCUT / LINOCUT INLINE SVG ILLUSTRATIONS
         ======================================================================== */
      function picture(word) {
        const idx=['bag','cat','dog','sun','hat','cup','pig','bus','fox','bug'].indexOf(word);
        if(idx<0)return buildWoodcutIllustration(word);
        return '<span class="picture-print" style="background-position:'+((idx%5)*25)+'% '+(Math.floor(idx/5)*100)+'%"></span>';
      }

      function buildWoodcutIllustration(word) {
        const w = String(word || '').toLowerCase().trim();
        const ink = '#272b6b';
        const bgCircle = `
          <circle cx="60" cy="60" r="56" fill="#e8e2f3"/>
          <path d="M8 76 H112 M12 84 H108 M18 92 H102 M26 100 H94 M38 107 H82" stroke="${ink}" stroke-width="1.6" opacity="0.35" stroke-linecap="round"/>
          <circle cx="60" cy="60" r="55" fill="none" stroke="${ink}" stroke-width="2" stroke-dasharray="3 2" opacity="0.45"/>
        `;

        const drawings = {
          leopard: `
            <circle cx="34" cy="36" r="10" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
            <circle cx="86" cy="36" r="10" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
            <circle cx="60" cy="62" r="30" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <circle cx="44" cy="45" r="3" fill="${ink}"/><circle cx="76" cy="45" r="3" fill="${ink}"/>
            <circle cx="60" cy="40" r="2.5" fill="${ink}"/><circle cx="39" cy="66" r="2.5" fill="${ink}"/><circle cx="81" cy="66" r="2.5" fill="${ink}"/>
            <circle cx="49" cy="58" r="3.4" fill="${ink}"/><circle cx="71" cy="58" r="3.4" fill="${ink}"/>
            <polygon points="55,68 65,68 60,74" fill="${ink}"/>
            <path d="M52 80 Q60 85 68 80" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>
          `,
          tiger: `
            <circle cx="34" cy="36" r="10" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
            <circle cx="86" cy="36" r="10" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
            <circle cx="60" cy="62" r="30" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <path d="M52 34 L55 44 M60 33 L60 45 M68 34 L65 44 M32 62 L42 62 M88 62 L78 62" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
            <circle cx="48" cy="58" r="3.4" fill="${ink}"/><circle cx="72" cy="58" r="3.4" fill="${ink}"/>
            <polygon points="55,68 65,68 60,74" fill="${ink}"/>
          `,
          panda: `
            <circle cx="33" cy="34" r="11" fill="${ink}"/><circle cx="87" cy="34" r="11" fill="${ink}"/>
            <circle cx="60" cy="62" r="30" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <ellipse cx="47" cy="58" rx="7.5" ry="9.5" transform="rotate(-18 47 58)" fill="${ink}"/>
            <ellipse cx="73" cy="58" rx="7.5" ry="9.5" transform="rotate(18 73 58)" fill="${ink}"/>
            <circle cx="48" cy="56" r="2.4" fill="#f5edd4"/><circle cx="72" cy="56" r="2.4" fill="#f5edd4"/>
            <ellipse cx="60" cy="70" rx="5.5" ry="3.8" fill="${ink}"/>
          `,
          whale: `
            <path d="M22 68 C22 44, 52 38, 76 48 C88 53, 94 64, 98 56 C102 48, 108 52, 102 64 C98 76, 86 84, 58 84 C34 84, 22 78, 22 68 Z" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
            <path d="M56 38 Q56 22 46 20 M56 38 Q56 22 66 20" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>
            <circle cx="38" cy="62" r="3.2" fill="${ink}"/>
            <path d="M24 72 Q42 78 58 72" fill="none" stroke="${ink}" stroke-width="2.4"/>
          `,
          frog: `
            <circle cx="42" cy="40" r="11" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
            <circle cx="78" cy="40" r="11" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
            <circle cx="42" cy="40" r="4" fill="${ink}"/><circle cx="78" cy="40" r="4" fill="${ink}"/>
            <ellipse cx="60" cy="68" rx="34" ry="24" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <path d="M38 69 Q60 84 82 69" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
          `,
          duck: `
            <circle cx="48" cy="42" r="16" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <path d="M32 44 L18 48 L33 52" fill="#f5edd4" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
            <path d="M40 56 C32 68, 36 86, 62 86 C86 86, 98 72, 96 58 C86 64, 72 60, 62 54" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
            <circle cx="44" cy="39" r="3" fill="${ink}"/>
          `,
          star: `
            <polygon points="60,16 72,44 102,47 79,67 86,96 60,81 34,96 41,67 18,47 48,44" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
            <circle cx="52" cy="56" r="2.8" fill="${ink}"/><circle cx="68" cy="56" r="2.8" fill="${ink}"/>
            <path d="M53 66 Q60 72 67 66" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
          `,
          book: `
            <path d="M18 34 Q39 26 60 36 Q81 26 102 34 V86 Q81 78 60 88 Q39 78 18 86 Z" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
            <line x1="60" y1="36" x2="60" y2="88" stroke="${ink}" stroke-width="2.8"/>
            <path d="M28 48 H50 M28 58 H50 M28 68 H46 M70 48 H92 M70 58 H92 M70 68 H88" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>
          `,
          tree: `
            <rect x="52" y="68" width="16" height="28" rx="3" fill="#d5cee8" stroke="${ink}" stroke-width="3"/>
            <circle cx="60" cy="40" r="22" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <circle cx="42" cy="54" r="17" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <circle cx="78" cy="54" r="17" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
          `,
          fish: `
            <polygon points="82,60 102,42 102,78" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
            <ellipse cx="54" cy="60" rx="32" ry="21" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <circle cx="38" cy="55" r="3.4" fill="${ink}"/>
            <path d="M52 46 Q60 60 52 74 M62 49 Q69 60 62 71" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/>
          `,
          ship: `
            <polygon points="58,20 58,64 28,64" fill="#f5edd4" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
            <polygon points="64,28 64,64 90,64" fill="#d5cee8" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>
            <path d="M20 68 H100 L88 88 H32 Z" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
          `,
          moon: `
            <path d="M74 22 C50 22, 32 40, 32 62 C32 84, 50 100, 74 98 C58 92, 50 78, 50 62 C50 44, 58 30, 74 22 Z" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
            <path d="M84 36 L86 42 L92 44 L86 46 L84 52 L82 46 L76 44 L82 42 Z" fill="${ink}"/>
          `,
          mom: `
            <circle cx="60" cy="48" r="24" fill="#d5cee8" stroke="${ink}" stroke-width="3"/>
            <circle cx="60" cy="52" r="18" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
            <circle cx="53" cy="50" r="2.6" fill="${ink}"/><circle cx="67" cy="50" r="2.6" fill="${ink}"/>
            <path d="M53 59 Q60 66 67 59" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>
            <path d="M34 94 C36 76, 46 72, 60 72 C74 72, 84 76, 86 94" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
          `,
          dad: `
            <circle cx="60" cy="50" r="20" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <path d="M40 46 C42 30, 78 30, 80 46 C72 38, 48 38, 40 46 Z" fill="${ink}"/>
            <circle cx="53" cy="50" r="2.6" fill="${ink}"/><circle cx="67" cy="50" r="2.6" fill="${ink}"/>
            <path d="M52 59 Q60 65 68 59" fill="none" stroke="${ink}" stroke-width="2.8" stroke-linecap="round"/>
            <path d="M32 94 C35 76, 46 72, 60 72 C74 72, 85 76, 88 94" fill="#f5edd4" stroke="${ink}" stroke-width="3"/>
          `
        };

        // Color words get a woodcut paint palette + swatch
        const colorSwatches = { red: '#d9483b', blue: '#3b74c4', green: '#3b9452', yellow: '#e8b931', white: '#ffffff', black: '#1b1a38' };
        let inner = Object.hasOwn(drawings,w) ? drawings[w] : '';
        if (!inner && Object.hasOwn(colorSwatches,w)) {
          inner = `
            <path d="M60 22 C84 22, 98 38, 96 58 C94 74, 82 76, 76 74 C70 72, 68 82, 74 88 C68 95, 52 96, 38 88 C22 78, 20 54, 30 38 C38 26, 48 22, 60 22 Z" fill="#f5edd4" stroke="${ink}" stroke-width="3.2"/>
            <circle cx="46" cy="48" r="10" fill="${colorSwatches[w]}" stroke="${ink}" stroke-width="2.6"/>
            <circle cx="72" cy="44" r="6" fill="#d5cee8" stroke="${ink}" stroke-width="2.2"/>
            <circle cx="44" cy="70" r="6" fill="#d5cee8" stroke="${ink}" stroke-width="2.2"/>
            <circle cx="78" cy="60" r="5" fill="#e8e2f3" stroke="${ink}" stroke-width="2.2"/>
          `;
        }
        // Default woodcut open storybook + stars emblem
        if (!inner) {
          inner = `
            <path d="M22 44 Q41 36 60 46 Q79 36 98 44 V88 Q79 80 60 90 Q41 80 22 88 Z" fill="#f5edd4" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
            <line x1="60" y1="46" x2="60" y2="90" stroke="${ink}" stroke-width="2.6"/>
            <path d="M60 16 L63 25 L72 28 L63 31 L60 40 L57 31 L48 28 L57 25 Z" fill="${ink}"/>
            <path d="M36 22 L38 27 L43 29 L38 31 L36 36 L34 31 L29 29 L34 27 Z" fill="${ink}" opacity="0.75"/>
            <path d="M84 22 L86 27 L91 29 L86 31 L84 36 L82 31 L77 29 L82 27 Z" fill="${ink}" opacity="0.75"/>
          `;
        }

        return `<svg viewBox="0 0 120 120" width="118" height="118" aria-hidden="true">${bgCircle}${inner}</svg>`;
      }

      /* ========================================================================
         TOP BAR SYNC
         ======================================================================== */
      function updateTopbar() {
        document.getElementById('topModeTitle').textContent = 'Spelling Bench';
        document.getElementById('topListLabel').textContent = getActiveList().name;
        document.getElementById('topUserName').textContent = getActiveUser().name;
        document.getElementById('btnUserMedallion').setAttribute('aria-label', getActiveUser().name + ', learners and reports');

        const sw = document.getElementById('btnAudioToggle');
        sw.classList.toggle('on', state.settings.audioEnabled);
        sw.setAttribute('aria-checked', String(state.settings.audioEnabled));
      }

      /* ========================================================================
         WOODEN LETTER RACK RENDERER (SHARED BY PRACTICE, QUIZ, MOVABLE)
         ======================================================================== */
      function renderWoodenRack(containerId, onKeyPick) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const keys = rackNumberMode && currentScreen === 'movable'
          ? RACK_NUMBERS
          : (state.settings.rackLayout === 'vowels-first' ? RACK_VOWELS_FIRST : RACK_ALPHABETICAL);

        container.innerHTML = keys.filter(k => currentScreen === 'movable' || /^[a-z]$/.test(k)).map(k => {
          const isSpecial = (k === '123' || k === 'ABC' || k === 'SPACE' || /^[0-9\-'!?]$/.test(k));
          const variant = isSpecial ? 'num' : 'default';
          const dragAttr = (k === '123' || k === 'ABC' || k === 'SPACE') ? '' : 'draggable="true"';
          return buildPaperTileHtml({
            ch: k,
            sizeClass: 'rack-size',
            variant,
            attrs: `${dragAttr} data-rack-key="${escapeHtml(k)}" aria-label="${k === 'SPACE' ? 'Space' : k}"`
          });
        }).join('');

        container.querySelectorAll('[data-rack-key]').forEach(btn => {
          const key = btn.dataset.rackKey;
          btn.addEventListener('click', () => {
            if (key === '123' || key === 'ABC') {
              rackNumberMode = !rackNumberMode;
              playWoodClick();
              renderWoodenRack(containerId, onKeyPick);
              return;
            }
            onKeyPick(key === 'SPACE' ? ' ' : key);
          });

          if (btn.getAttribute('draggable') === 'true') {
            btn.addEventListener('dragstart', (e) => {
              btn.classList.add('dragging');
              e.dataTransfer.setData('text/plain', key);
            });
            btn.addEventListener('dragend', () => btn.classList.remove('dragging'));
          }
        });
      }

      /* ========================================================================
         HOME HUB VIEW
         ======================================================================== */
      function renderHome() {
        stopReading();
        currentScreen = 'home';
        activity = null;
        updateTopbar();

        const activeList = getActiveList();
        const user = getActiveUser();

        const main = document.getElementById('mainView');
        main.innerHTML = `
          <header class="choose-heading"><h1>Choose an activity</h1></header>
          <section class="home-modes-grid">
            <button class="storybook-mode-card sage" id="modeMovable">
              <div>
                <h2>Letter Slate</h2>
              </div>
              <p>Build any words on the three-line slate and listen to them.</p>
            </button>

            <button class="storybook-mode-card apricot" id="modePractice">
              <div>
                <h2>Word Practice</h2>
              </div>
              <p>Look at the word, listen, and build it with tiles.</p>
            </button>

            <button class="storybook-mode-card coral" id="modeScrambled">
              <div>
                <h2>Scrambled Letters</h2>
              </div>
              <p>Put the mixed-up letters in order.</p>
            </button>

            <button class="storybook-mode-card lavender" id="modeQuiz">
              <div>
                <h2>Spelling Check</h2>
              </div>
              <p>Hear a word and spell it from memory.</p>
            </button>
          </section>

          <section class="home-bottom-row">
            <button class="home-util-btn" id="homeOpenLists">
              <div>
                <div style="font-family:var(--font-display); font-size:1.18rem; font-weight:700;">Word Lists</div>
                <div style="font-size:0.86rem; font-weight:700; color:var(--ink-soft);">Active: ${escapeHtml(activeList.name)} · ${state.customLists.length} custom</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <button class="home-util-btn" id="homeOpenReports">
              <div>
                <div style="font-family:var(--font-display); font-size:1.18rem; font-weight:700;">Learners & reports</div>
                <div style="font-size:0.86rem; font-weight:700; color:var(--ink-soft);">${escapeHtml(user.name)} · ${user.reports.length} saved session${user.reports.length === 1 ? '' : 's'}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </section>
        `;

        document.getElementById('modeMovable').addEventListener('click', renderMovableAlphabet);
        document.getElementById('modePractice').addEventListener('click', () => startActivity('practice'));
        document.getElementById('modeScrambled').addEventListener('click', () => startActivity('scrambled'));
        document.getElementById('modeQuiz').addEventListener('click', () => startActivity('quiz'));
        document.getElementById('homeOpenLists').addEventListener('click', () => openModal('lists'));
        document.getElementById('homeOpenReports').addEventListener('click', () => openModal('reports'));
      }

      /* ========================================================================
         TALKING MOVABLE ALPHABET (3-ROW FREE PLAY)
         ======================================================================== */
      function renderMovableAlphabet() {
        stopReading();
        currentScreen = 'movable';
        activity = null;
        updateTopbar();

        const main = document.getElementById('mainView');
        main.innerHTML = `
          <div class="banner-stage" style="margin-bottom:14px;">
            <div class="deckled-banner no-bubble" style="min-height:112px; padding:14px 28px;">
              ${buildDeckledBannerSvg()}
              <div style="position:relative; z-index:2; display:flex; align-items:center; gap:16px;">
                <div class="woodcut-medallion" style="width:76px; height:76px;">
                  ${buildWoodcutIllustration('book')}
                </div>
                <div>
                  <div style="font-family:var(--font-display); font-size:clamp(1.4rem,3vw,2.05rem); font-weight:700; color:var(--ink); line-height:1.1;">
                    Letter Slate
                  </div>
                  <div style="font-size:0.88rem; font-weight:800; color:var(--ink-soft);">
                    Tap or type to build words. Choose a line to write on it.
                  </div>
                </div>
              </div>
              <button class="cream-action-pill sage" id="btnMovReadAll" style="position:relative; z-index:2; padding:11px 18px; font-size:0.95rem;">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>
                Read Out Loud
              </button>
            </div>
          </div>

          <div class="movable-controls">
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <button class="cream-action-pill" id="btnMovSpace">Space</button>
              <button class="cream-action-pill" id="btnMovNextRow">Next Row</button>
              <button class="cream-action-pill" id="btnMovBack">⌫ Backspace</button>
            </div>
            <button class="cream-action-pill" id="btnMovClear">Clear Slate</button>
          </div>

          <section class="movable-slate" id="movableSlate"></section>

          <section class="wooden-rack-outer">
            <div class="wooden-rack-well">
              <div class="rack-grid" id="movableRack"></div>
            </div>
          </section>
        `;

        renderMovableRows();
        renderWoodenRack('movableRack', (ch) => addMovableChar(ch));

        document.getElementById('btnMovReadAll').addEventListener('click', () => {
          const text = movableBoard.rows.map(r => r.join('').trim()).filter(Boolean).join('. ');
          if (text) speakText(text, 0.88);
          else showToast('Place some letter tiles on the slate first!');
        });
        document.getElementById('btnMovSpace').addEventListener('click', () => addMovableChar(' '));
        document.getElementById('btnMovNextRow').addEventListener('click', () => {
          movableBoard.activeRow = (movableBoard.activeRow + 1) % movableBoard.rows.length;
          playWoodClick();
          renderMovableRows();
        });
        document.getElementById('btnMovBack').addEventListener('click', backspaceMovable);
        document.getElementById('btnMovClear').addEventListener('click', () => {
          movableBoard.rows = [[], [], []];
          movableBoard.activeRow = 0;
          playWoodClick();
          renderMovableRows();
        });
      }

      function renderMovableRows() {
        const slate = document.getElementById('movableSlate');
        if (!slate) return;

        slate.innerHTML = movableBoard.rows.map((row, rIdx) => {
          const active = rIdx === movableBoard.activeRow ? 'active-row' : '';
          const content = row.length === 0
            ? `<span style="color:#d2d8c9; font-weight:700; font-size:0.92rem; padding-left:6px;">Row ${rIdx + 1} — tap or drag letters here...</span>`
            : row.map((ch, cIdx) => {
                if (ch === ' ') {
                  return `<button class="movable-space-chip" data-mov-rem="${rIdx}:${cIdx}" aria-label="Remove space">␣</button>`;
                }
                const variant = /^[0-9\-'!?]$/.test(ch) ? 'num' : 'default';
                return buildPaperTileHtml({
                  ch,
                  sizeClass: 'board-size',
                  variant,
                  extraClass: `tilt-${(rIdx + cIdx) % 5}`,
                  attrs: `data-mov-tile="${rIdx}:${cIdx}" title="Click to hear '${ch}' (double-click to remove)"`
                });
              }).join('');

          return `
            <div class="movable-row ${active}" data-mov-row="${rIdx}">
              <div class="movable-row-tiles">${content}</div>
              <button class="tactile-sq-btn undo-btn" data-mov-speak="${rIdx}" title="Read Row ${rIdx + 1}" aria-label="Read Row ${rIdx + 1}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>
              </button>
            </div>
          `;
        }).join('');

        slate.querySelectorAll('[data-mov-row]').forEach(rowEl => {
          const rIdx = Number(rowEl.dataset.movRow);
          rowEl.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('.movable-space-chip')) return;
            movableBoard.activeRow = rIdx;
            renderMovableRows();
          });
          rowEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            rowEl.classList.add('active-row');
          });
          rowEl.addEventListener('drop', (e) => {
            e.preventDefault();
            const ch = e.dataTransfer.getData('text/plain');
            if (/^[a-z0-9 '!\-?]$/i.test(ch)) {
              movableBoard.activeRow = rIdx;
              addMovableChar(ch.toLowerCase());
            }
          });
        });

        slate.querySelectorAll('[data-mov-speak]').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = movableBoard.rows[Number(btn.dataset.movSpeak)].join('').trim();
            if (text) speakText(text, 0.9);
            else showToast('Row is empty');
          });
        });

        slate.querySelectorAll('[data-mov-tile]').forEach(btn => {
          const [r, c] = btn.dataset.movTile.split(':').map(Number);
          btn.addEventListener('click', () => speakLetter(movableBoard.rows[r][c]));
          btn.addEventListener('dblclick', () => {
            movableBoard.rows[r].splice(c, 1);
            playWoodClick();
            renderMovableRows();
          });
        });

        slate.querySelectorAll('[data-mov-rem]').forEach(sp => {
          sp.addEventListener('click', () => {
            const [r, c] = sp.dataset.movRem.split(':').map(Number);
            movableBoard.rows[r].splice(c, 1);
            playWoodClick();
            renderMovableRows();
          });
        });
      }

      function addMovableChar(ch) {
        const row = movableBoard.rows[movableBoard.activeRow];
        if (row.length >= 13) {
          showToast('Row is full — tap Next Row!');
          return;
        }
        row.push(ch);
        playPaperSnap();
        renderMovableRows();
        if (ch === ' ') {
          const words = row.join('').trim().split(/\s+/);
          const last = words[words.length - 1];
          if (last) speakText(last, 0.9);
        } else {
          speakLetter(ch);
        }
      }

      function backspaceMovable() {
        const row = movableBoard.rows[movableBoard.activeRow];
        if (row.length > 0) {
          row.pop();
          playWoodClick();
          renderMovableRows();
        } else if (movableBoard.activeRow > 0) {
          movableBoard.activeRow--;
          renderMovableRows();
        }
      }

      /* ========================================================================
         ACTIVITIES 1, 2 & 3 ENGINE (WORD PRACTICE, SCRAMBLED, STANDARD TEST)
         ======================================================================== */
      function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }

      function makeScrambledPool(word) {
        const items = word.split('').filter(ch => /[a-z]/.test(ch)).map((ch, idx) => ({ id: `sc-${idx}-${ch}`, ch, used: false, tilt: idx % 5 }));
        if (items.length <= 1) return items;
        let s = shuffle(items);
        let tries = 0;
        while (s.map(x => x.ch).join('') === items.map(x => x.ch).join('') && tries < 10) {
          s = shuffle(items);
          tries++;
        }
        if (s.every((item,i)=>item.ch===items[i].ch)) {
          const other=s.findIndex(item=>item.ch!==s[0].ch);
          if(other>0)[s[0],s[other]]=[s[other],s[0]];
        }
        return s;
      }

      function startActivity(mode, speakOnLoad = true) {
        const list = getActiveList();
        const words = list.words.map(w => w.toLowerCase().trim()).filter(Boolean);
        if (!words.length) {
          showToast('This list is empty — choose another list.');
          openModal('lists');
          return;
        }

        currentScreen = mode;
        rackNumberMode = false;
        updateTopbar();

        activity = {
          listId:list.id, ownerId:state.activeUserId,
          mode, // 'practice' | 'scrambled' | 'quiz'
          listName: list.name,
          words,
          index: 0,
          results: [],
          target: '',
          slots: [],
          pool: [],
          completed: false,
          hadMistake: false,
          usedHint: false,
          bubbleState: 'prompt', // 'prompt' | 'celebrate' | 'try-again'
          wordStartTime: Date.now(),
          sessionFinished: false
        };

        loadWord(0, speakOnLoad);
      }

      function loadWord(idx, shouldSpeak = true) {
        stopReading();
        const word = activity.words[idx];
        activity.index = idx;
        document.getElementById('benchFeedback').textContent = '';
        activity.target = word;
        activity.slots = Array.from(word, ch => /[a-z]/.test(ch) ? null : ch);
        activity.pool = activity.mode === 'scrambled' ? makeScrambledPool(word) : [];
        activity.completed = false;
        activity.hadMistake = false;
        activity.usedHint = false;
        activity.bubbleState = 'prompt';
        activity.wordStartTime = Date.now();

        renderActivity();
        if (shouldSpeak) speakText(word);
      }

      function getPlacedTileVariant(ch, idx, completed) {
        // Echo the vibrant blue / apricot / sage placed tiles from the mockup!
        if (completed) {
          const cycle = ['default', 'apricot', 'sage', 'lavender'];
          return cycle[idx % cycle.length];
        }
        return isVowel(ch) ? 'apricot' : 'default';
      }

      function renderActivity() {
        const main = document.getElementById('mainView');
        if (activity.sessionFinished) {
          renderSessionSummary();
          return;
        }

        const focused = main.contains(document.activeElement) ? document.activeElement : null;
        const rackKey = focused?.dataset.rackKey;
        const poolKey = focused?.dataset.poolId;
        const actionId = focused?.id;
        const mode = activity.mode;
        const word = activity.target;
        const nextEmpty = activity.slots.findIndex(s => s === null);

        const revealed = mode !== 'quiz' || activity.completed;
        const promptTitle = revealed ? word : 'Listen and spell';
        const taskName = {practice:'Word practice',scrambled:'Scrambled letters',quiz:'Spelling check'}[mode];
        const nextAction = activity.index === activity.words.length - 1 ? 'Finish session' : 'Next Word';
        const instruction = activity.completed ? 'Word complete. Ready to keep going?' :
          activity.bubbleState==='try-again' ? 'Check your letters and try again.' :
          mode==='scrambled' ? 'Put the mixed-up letters in order.' :
          mode==='quiz' ? 'Hear the word, then spell it from memory.' : 'Choose the letters in order.';
        // Build slots inside magnetic tray
        const slotsHtml = activity.slots.map((entry, idx) => {
          if (!/[a-z]/.test(word[idx])) return '<span class="fixed-mark" aria-label="'+(word[idx]===' '?'space':word[idx]==='-'?'hyphen':'apostrophe')+'">'+(word[idx]===' '?'␣':escapeHtml(word[idx]))+'</span>';
          if (entry) {
            const ch = typeof entry === 'string' ? entry : entry.ch;
            const variant = getPlacedTileVariant(ch, idx, activity.completed);
            return `
              <div class="tray-slot filled" data-slot-idx="${idx}">
                ${buildPaperTileHtml({
                  ch,
                  sizeClass: 'tray-size',
                  variant,
                  extraClass: `pop-in tilt-${idx % 5}`,
                  attrs: `data-placed-idx="${idx}" title="${activity.completed ? ch : 'Click to remove'}"`
                })}
              </div>
            `;
          }
          const isNext = !activity.completed && idx === nextEmpty;
          const ghost = (mode === 'practice' && state.settings.showPracticeGuides)
            ? `<span class="tray-ghost-letter">${escapeHtml(word[idx])}</span>`
            : '';
          return `<div class="tray-slot ${isNext ? 'active-next' : ''}" data-slot-idx="${idx}">${ghost}</div>`;
        }).join('');

        // Input area: Scrambled scattered tiles OR Wooden Letter Rack
        const lowerInputHtml = mode === 'scrambled'
          ? `<section class="scrambled-canvas" id="scrambledCanvas">
              ${activity.pool.filter(p => !p.used).map(p =>
                buildPaperTileHtml({
                  ch: p.ch,
                  sizeClass: 'scrambled-size',
                  variant: isVowel(p.ch) ? 'default' : 'default',
                  extraClass: `tilt-${p.tilt}`,
                  attrs: `draggable="true" data-pool-id="${p.id}" data-letter="${p.ch}"`
                })
              ).join('')}
            </section>`
          : `<section class="wooden-rack-outer">
              <div class="wooden-rack-well">
                <div class="rack-grid" id="activityRack"></div>
              </div>
            </section>`;

        // Progress dots
        const dotsHtml = activity.words.map((_, i) => {
          let cls = '';
          if (i < activity.results.length) {
            cls = activity.results[i].correct ? 'done' : 'done-miss';
          } else if (i === activity.index) {
            cls = 'current';
          }
          return `<span class="p-dot ${cls}"></span>`;
        }).join('');

        main.innerHTML = `
          <section class="clue-print">
            <div class="clue-copy">
              <p class="activity-name">${taskName}</p>
              <h1 class="clue-word">${escapeHtml(promptTitle)}</h1>
              <p class="clue-instruction">${instruction}</p>
              <button class="say-word" id="btnPromptAudio" aria-label="Hear the word"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9h4l5-4v14l-5-4H3z"/><path d="M16 8q4 4 0 8m3-11q7 7 0 14"/></svg> Hear word</button>
            </div>
            <div class="clue-art" aria-hidden="true">${picture(revealed?word:'book')}</div>
          </section>
          <!-- MAGNETIC DROP TRAY + CHECK / HINT / UNDO BUTTONS -->
          <section class="tray-row" aria-label="Spelling tray">
            <div class="magnetic-tray" id="magneticTray" tabindex="-1">
              ${slotsHtml}
            </div>

            <div class="tray-actions">
              <button class="tactile-sq-btn check-btn ${activity.completed ? 'ready-next' : ''}" id="btnCheckAction"
                title="${activity.completed ? nextAction : 'Check Spelling'}" aria-label="${activity.completed ? nextAction : 'Check Spelling'}">
                ${activity.completed
                  ? `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
                  : `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}
              </button>

              <button class="tactile-sq-btn hint-btn" id="btnHintAction" title="Add one letter" aria-label="Hint" ${activity.completed ? 'disabled' : ''}>?</button>

              <button class="tactile-sq-btn undo-btn" id="btnUndoAction" title="Remove last letter" aria-label="Backspace" ${activity.completed ? 'disabled' : ''}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>
              </button>
            </div>
          </section>

          <!-- WOODEN LETTER RACK OR SCRAMBLED CANVAS -->
          ${lowerInputHtml}

          <!-- BOTTOM PROGRESS INDICATOR -->
          <footer class="progress-bar-footer">
            <div class="progress-dots">${dotsHtml}</div>
            <span class="progress-count">${activity.index + 1} of ${activity.words.length}</span>
          </footer>
        `;

        // Bind Audio Buttons
        const repeatPrompt = () => { if(!state.settings.audioEnabled) {state.settings.audioEnabled=true;saveState();updateTopbar()} speakText(activity.target); };
        document.getElementById('btnPromptAudio').addEventListener('click', repeatPrompt);


        // Bind Action Buttons
        document.getElementById('btnCheckAction').addEventListener('click', () => {
          if (activity.completed) {
            advanceWord();
          } else {
            checkCurrentSpelling();
          }
        });
        document.getElementById('btnHintAction').addEventListener('click', triggerHint);
        document.getElementById('btnUndoAction').addEventListener('click', removeLastTile);

        // Bind Placed Tiles (click to remove before completion)
        document.querySelectorAll('[data-placed-idx]').forEach(btn => {
          btn.addEventListener('click', () => {
            const i = Number(btn.dataset.placedIdx);
            if (activity.completed) {
              const entry = activity.slots[i];
              speakLetter(typeof entry === 'string' ? entry : entry.ch);
            } else {
              removeTileAt(i);
            }
          });
        });

        // Bind Drag-and-Drop on Tray & Individual Slots
        const trayEl = document.getElementById('magneticTray');
        trayEl.addEventListener('dragover', (e) => {
          e.preventDefault();
          trayEl.classList.add('drag-over');
        });
        trayEl.addEventListener('dragleave', () => trayEl.classList.remove('drag-over'));
        trayEl.addEventListener('drop', (e) => {
          e.preventDefault();
          trayEl.classList.remove('drag-over');
          if (activity.completed) return;
          const slotTarget = e.target.closest('[data-slot-idx]');
          const preferredIdx = slotTarget ? Number(slotTarget.dataset.slotIdx) : null;
          const poolId = e.dataTransfer.getData('application/x-pool-id');
          const letter = e.dataTransfer.getData('text/plain');
          if (mode === 'scrambled' && poolId) {
            placeScrambledTile(poolId, preferredIdx);
          } else if (letter && /^[a-z]$/.test(letter)) {
            placeLetterInput(letter, preferredIdx);
          }
        });

        document.querySelectorAll('[data-slot-idx]').forEach(slotEl => {
          slotEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!activity.completed && activity.slots[Number(slotEl.dataset.slotIdx)] === null) {
              slotEl.classList.add('drag-over');
            }
          });
          slotEl.addEventListener('dragleave', () => slotEl.classList.remove('drag-over'));
        });

        // Render Rack or Bind Scrambled Pool
        if (mode === 'scrambled') {
          document.querySelectorAll('[data-pool-id]').forEach(tile => {
            const poolId = tile.dataset.poolId;
            const letter = tile.dataset.letter;
            tile.addEventListener('click', () => placeScrambledTile(poolId));
            tile.addEventListener('dragstart', (e) => {
              tile.classList.add('dragging');
              e.dataTransfer.setData('application/x-pool-id', poolId);
              e.dataTransfer.setData('text/plain', letter);
            });
            tile.addEventListener('dragend', () => tile.classList.remove('dragging'));
          });
        } else {
          renderWoodenRack('activityRack', (ch) => {
            if (/^[a-z]$/.test(ch)) placeLetterInput(ch);
          });
        }
        if (focused && !activity.completed) {
          const replacement = rackKey ? main.querySelector('[data-rack-key="' + CSS.escape(rackKey) + '"]')
            : poolKey ? main.querySelector('[data-pool-id]')
            : actionId ? document.getElementById(actionId) : null;
          (replacement || document.getElementById('btnCheckAction')).focus({preventScroll:true});
        }
      }

      function placeLetterInput(ch, preferredIdx = null) {
        if (!activity || activity.completed || activity.sessionFinished) return;
        const lower = ch.toLowerCase();

        if (activity.mode === 'scrambled') {
          const match = activity.pool.find(p => !p.used && p.ch === lower);
          if (match) placeScrambledTile(match.id, preferredIdx);
          else { playWrongWobble(); shakeTray(); }
          return;
        }

        let targetIdx = preferredIdx;
        if (targetIdx === null || activity.slots[targetIdx] !== null) {
          targetIdx = activity.slots.findIndex(s => s === null);
        }
        if (targetIdx === -1) return;

        activity.slots[targetIdx] = lower;
        activity.bubbleState = 'prompt';
        playPaperSnap();
        speakLetter(lower);
        renderActivity();

        // In Word Practice, automatically celebrate as soon as the exact word is spelled!
        if (activity.mode === 'practice' && activity.slots.every(s => s !== null)) {
          const spelled = spelledWord();
          if (spelled === activity.target) {
            completeWord();
          }
        }
      }

      function placeScrambledTile(poolId, preferredIdx = null) {
        if (!activity || activity.completed) return;
        const item = activity.pool.find(p => p.id === poolId && !p.used);
        if (!item) return;

        let targetIdx = preferredIdx;
        if (targetIdx === null || activity.slots[targetIdx] !== null) {
          targetIdx = activity.slots.findIndex(s => s === null);
        }
        if (targetIdx === -1) return;

        item.used = true;
        activity.slots[targetIdx] = { id: item.id, ch: item.ch };
        activity.bubbleState = 'prompt';
        playPaperSnap();
        speakLetter(item.ch);
        renderActivity();

        if (activity.slots.every(s => s !== null)) {
          const spelled = spelledWord();
          if (spelled === activity.target) {
            completeWord();
          }
        }
      }

      function removeTileAt(idx) {
        if (!activity || activity.completed) return;
        const entry = activity.slots[idx];
        if (!entry || !/[a-z]/.test(activity.target[idx])) return;
        if (activity.mode === 'scrambled' && entry.id) {
          const poolItem = activity.pool.find(p => p.id === entry.id);
          if (poolItem) poolItem.used = false;
        }
        activity.slots[idx] = null;
        activity.bubbleState = 'prompt';
        playWoodClick();
        renderActivity();
      }

      function removeLastTile() {
        if (!activity || activity.completed) return;
        for (let i = activity.slots.length - 1; i >= 0; i--) {
          if (activity.slots[i] !== null && /[a-z]/.test(activity.target[i])) {
            removeTileAt(i);
            return;
          }
        }
      }

      function spelledWord() {
        return activity.slots.map(slot => typeof slot === 'string' ? slot : slot?.ch || '').join('');
      }

      function checkCurrentSpelling() {
        if (!activity || activity.completed) return;
        const spelled = spelledWord();
        if (spelled.length < activity.target.length) {
          playWrongWobble();
          shakeTray();
          showToast('Fill in all the letter slots first!');
          return;
        }

        if (spelled === activity.target) {
          completeWord();
        } else {
          activity.hadMistake = true;
          activity.bubbleState = 'try-again';
          playWrongWobble();
          renderActivity();
          shakeTray();
          document.getElementById('benchFeedback').textContent = 'Check your letters and try again.';
          speakText('Try again.', 0.94, 'feedback');
        }
      }

      function triggerHint() {
        if (!activity || activity.completed) return;

        // Find first empty or incorrect slot and fill it with the right letter
        const target = activity.target;
        const fixIdx = activity.slots.findIndex((s, i) => {
          const ch = s ? (typeof s === 'string' ? s : s.ch) : null;
          return ch !== target[i];
        });
        if (fixIdx === -1) {checkCurrentSpelling();return}
        activity.usedHint = true;

        const needed = target[fixIdx];

        if (activity.mode === 'scrambled') {
          if (activity.slots[fixIdx]) {
            const old = activity.slots[fixIdx];
            const pOld = activity.pool.find(p => p.id === old.id);
            if (pOld) pOld.used = false;
            activity.slots[fixIdx] = null;
          }
          let tile = activity.pool.find(p => !p.used && p.ch === needed);
          if (!tile) {
            for (let j = fixIdx + 1; j < activity.slots.length; j++) {
              if (activity.slots[j] && activity.slots[j].ch === needed) {
                const moved = activity.slots[j];
                activity.slots[j] = null;
                tile = activity.pool.find(p => p.id === moved.id);
                if (tile) tile.used = false;
                break;
              }
            }
          }
          if (tile) placeScrambledTile(tile.id, fixIdx);
          return;
        }

        // Practice or Spelling Check: place the next correct letter & speak its phonics sound
        activity.slots[fixIdx] = needed;
        activity.bubbleState = 'prompt';
        playPaperSnap();
        speakLetter(needed);
        renderActivity();

        if (activity.mode === 'practice' && activity.slots.every(s => s !== null)) {
          if (spelledWord() === activity.target) {
            completeWord();
          }
        }
      }

      function shakeTray() {
        const tray = document.getElementById('magneticTray');
        if (!tray) return;
        tray.classList.remove('shake-tray');
        void tray.offsetWidth;
        tray.classList.add('shake-tray');
      }

      function completeWord() {
        if (!activity || activity.completed) return;
        if(spelledWord()!==activity.target)return;
        activity.completed = true;
        document.getElementById('benchFeedback').textContent = activity.target + ' is complete.';
        activity.bubbleState = 'celebrate';
        const duration = Math.max(1, Math.round((Date.now() - activity.wordStartTime) / 1000));
        const clean = !activity.hadMistake && !activity.usedHint;

        activity.results.push({
          word: activity.target,
          correct: clean,
          duration
        });

        playMarimbaWin();
        burstStarConfetti();
        renderActivity();
        speakText(activity.target);
        document.getElementById('btnCheckAction')?.focus({preventScroll:true});
      }

      function advanceWord() {
        if (!activity || !activity.completed || activity.sessionFinished) return;
        if (activity.index + 1 < activity.words.length) {
          loadWord(activity.index + 1, true);
        } else {
          finishSession();
        }
      }

      function finishSession() {
        if(!activity || activity.sessionFinished || activity.results.length!==activity.words.length)return;
        stopReading();activity.sessionFinished = true;
        const total = activity.results.length;
        const clean = activity.results.filter(r => r.correct).length;
        const score = total ? Math.round((clean / total) * 100) : 100;

        const modeName = activity.mode === 'practice'
          ? 'Word Practice'
          : (activity.mode === 'scrambled' ? 'Scrambled Letters' : 'Spelling Check');

        const user = state.users.find(u=>u.id===activity.ownerId);
        user.reports.unshift({
          id: 'rep-' + Date.now(),
          dateISO: new Date().toISOString(),
          listName: activity.listName,
          mode: modeName,
          score,
          words: activity.results
        });
        activity.saved=saveState();
        renderSessionSummary(score);
      }

      function renderSessionSummary(scoreOverride) {
        const total = activity.results.length;
        const clean = activity.results.filter(r => r.correct).length;
        const score = typeof scoreOverride === 'number' ? scoreOverride : Math.round((clean / total) * 100);

        const main = document.getElementById('mainView');
        main.innerHTML = `
          <section class="summary-parchment">
            <div class="summary-badge">
              <span style="font-size:2.1rem; font-weight:700; line-height:1;">${score}%</span>
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase;">${clean}/${total} on first try</span>
            </div>
            <h1 style="font-family:var(--font-display); font-size:2rem; margin-bottom:4px;">
              Session complete, ${escapeHtml(getActiveUser().name)}!
            </h1>
            <p style="font-weight:700; color:var(--ink-soft);">
              ${escapeHtml(activity.listName)} · ${activity.saved ? 'Saved on this device' : 'Available in this tab'}
            </p>

            <div class="summary-word-list">
              ${activity.results.map(r => `
                <div class="summary-word-row">
                  <span style="font-family:var(--font-display); font-size:1.2rem;">${escapeHtml(r.word)}</span>
                  <span style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:0.86rem; color:var(--ink-soft);">Duration: ${r.duration}s</span>
                    <span class="result-label">${r.correct ? 'First try' : 'With practice'}</span>
                  </span>
                </div>
              `).join('')}
            </div>

            <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
              <button class="cream-action-pill sage" id="btnSumAgain" style="padding:11px 20px;">Play Again</button>
              <button class="cream-action-pill" id="btnSumReports" style="padding:11px 20px;">View session report</button>
              <button class="cream-action-pill" id="btnSumHome" style="padding:11px 20px;">Activities</button>
            </div>
          </section>
        `;

        document.getElementById('btnSumAgain').addEventListener('click', () => startActivity(activity.mode, true));
        document.getElementById('btnSumReports').addEventListener('click', () => {
          const latest = getActiveUser().reports[0];
          openModal('reports', latest ? latest.id : null);
        });
        document.getElementById('btnSumHome').addEventListener('click', renderHome);
      }

      /* ========================================================================
         MODALS: WORD LISTS, USERS & SESSION REPORTS, SETTINGS
         ======================================================================== */
      function openModal(type, extraId = null) {
        stopReading();returnFocus=document.activeElement;
        document.querySelector('.app-shell').inert=true;
        modalState.type = type;
        modalState.selectedReportId = type === 'reports' ? extraId : null;
        modalState.editingListId = null;
        modalState.confirmDeleteId = null;
        renderModal();
        document.getElementById('modalBackdrop').classList.add('open');
        document.getElementById('btnCloseModal').focus();
      }

      function closeModal() {
        document.getElementById('modalBackdrop').classList.remove('open');
        modalState.type = null;
        document.querySelector('.app-shell').inert=false;
        (returnFocus?.isConnected?returnFocus:document.getElementById('btnHome')).focus();
      }

      function renderModal() {
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');
        if (modalState.type === 'lists') {
          title.textContent = 'Word lists';
          renderListsModal(body);
        } else if (modalState.type === 'reports') {
          title.textContent = 'Learners & reports';
          renderReportsModal(body);
        } else if (modalState.type === 'settings') {
          title.textContent = 'Settings';
          renderSettingsModal(body);
        }
      }

      function renderListsModal(container) {
        const tab = modalState.listsTab;
        const activeId = state.activeListId;

        let content = '';
        if (tab === 'builtin') {
          content = BUILTIN_LISTS.map(l => {
            const isSel = l.id === activeId;
            return `
              <div class="list-row-card ${isSel ? 'active-list' : ''}">
                <div style="flex:1; min-width:200px;">
                  <div style="font-family:var(--font-display); font-size:1.15rem; font-weight:700;">${escapeHtml(l.name)}</div>
                  <div style="font-size:0.86rem; font-weight:700; color:var(--ink-soft); margin-top:2px;">${l.words.map(escapeHtml).join(', ')}</div>
                </div>
                <button class="m-btn ${isSel ? 'sage' : 'navy'}" data-pick-list="${l.id}">
                  ${isSel ? '✓ Active List' : 'Use List'}
                </button>
              </div>
            `;
          }).join('');
        } else {
          const editing = modalState.editingListId
            ? state.customLists.find(l => l.id === modalState.editingListId)
            : null;

          const customCards = state.customLists.length === 0
            ? `<p style="text-align:center; color:var(--ink-soft); font-weight:700; padding:16px 0;">No custom lists yet — create your own spelling list above!</p>`
            : state.customLists.map(l => {
                const isSel = l.id === activeId;
                const confirming = modalState.confirmDeleteId === l.id;
                return `
                  <div class="list-row-card ${isSel ? 'active-list' : ''}">
                    <div style="flex:1; min-width:190px;">
                      <div style="font-family:var(--font-display); font-size:1.15rem; font-weight:700;">${escapeHtml(l.name)}</div>
                      <div style="font-size:0.86rem; font-weight:700; color:var(--ink-soft);">${l.words.map(escapeHtml).join(', ')}</div>
                    </div>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button class="m-btn ${isSel ? 'sage' : 'navy'}" data-pick-list="${l.id}">${isSel ? '✓ Active' : 'Use'}</button>
                      <button class="m-btn ghost" data-edit-list="${l.id}">Edit</button>
                      ${confirming
                        ? `<button class="m-btn danger" data-confirm-del="${l.id}">Confirm Delete</button>`
                        : `<button class="m-btn danger" data-del-list="${l.id}">Delete</button>`}
                    </div>
                  </div>
                `;
              }).join('');

          content = `
            <form class="m-form-box" id="customListForm">
              <div style="font-family:var(--font-display); font-size:1.15rem; font-weight:700; margin-bottom:10px;">
                ${editing ? 'Edit Custom List' : 'Create Your Own Spelling List'}
              </div>
              <label class="m-label" for="inpListName">List Name</label>
              <input class="m-input" id="inpListName" type="text" placeholder="e.g., Week 3 Spelling" value="${editing ? escapeHtml(editing.name) : ''}" required />

              <label class="m-label" for="inpListWords">Words (comma or new-line separated)</label>
              <textarea class="m-textarea" id="inpListWords" placeholder="star, moon, book, tree, fish" required>${editing ? escapeHtml(editing.words.join(', ')) : ''}</textarea>

              <div style="display:flex; gap:8px;">
                <button type="submit" class="m-btn navy" style="padding:9px 18px;">${editing ? 'Save Changes' : 'Save & Use List'}</button>
                ${editing ? `<button type="button" class="m-btn ghost" id="btnCancelEdit">Cancel</button>` : ''}
              </div>
            </form>
            ${customCards}
          `;
        }

        container.innerHTML = `
          <div class="modal-tabs">
            <button class="m-tab ${tab === 'builtin' ? 'active' : ''}" id="tabBuiltin">Built-in Lists (${BUILTIN_LISTS.length})</button>
            <button class="m-tab ${tab === 'custom' ? 'active' : ''}" id="tabCustom">My Lists (${state.customLists.length})</button>
          </div>
          ${content}
        `;

        document.getElementById('tabBuiltin').addEventListener('click', () => { modalState.listsTab = 'builtin'; renderModal(); });
        document.getElementById('tabCustom').addEventListener('click', () => { modalState.listsTab = 'custom'; renderModal(); });

        container.querySelectorAll('[data-pick-list]').forEach(btn => {
          btn.addEventListener('click', () => {
            if(state.activeListId===btn.dataset.pickList){closeModal();return}
            state.activeListId = btn.dataset.pickList;
            saveState();
            updateTopbar();
            showToast(`Loaded "${getActiveList().name}"`);
            if (currentScreen === 'practice' || currentScreen === 'scrambled' || currentScreen === 'quiz') {
              startActivity(currentScreen, false);
            } else if (currentScreen === 'home') {
              renderHome();
            }
            closeModal();
          });
        });

        container.querySelectorAll('[data-edit-list]').forEach(btn => {
          btn.addEventListener('click', () => { modalState.editingListId = btn.dataset.editList; renderModal(); });
        });

        container.querySelectorAll('[data-del-list]').forEach(btn => {
          btn.addEventListener('click', () => { modalState.confirmDeleteId = btn.dataset.delList; renderModal(); });
        });

        container.querySelectorAll('[data-confirm-del]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.confirmDel;
            state.customLists = state.customLists.filter(l => l.id !== id);
            if (state.activeListId === id) {state.activeListId = BUILTIN_LISTS[0].id;if(activity)startActivity(activity.mode,false);else if(currentScreen==='home')renderHome()}
            modalState.confirmDeleteId = null;
            saveState();
            updateTopbar();
            showToast('List deleted');
            renderModal();
          });
        });

        const cancelBtn = document.getElementById('btnCancelEdit');
        if (cancelBtn) cancelBtn.addEventListener('click', () => { modalState.editingListId = null; renderModal(); });

        const form = document.getElementById('customListForm');
        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('inpListName').value.trim();
            const words = document.getElementById('inpListWords').value
              .split(/[\n,]+/)
              .map(normaliseWord)
              .filter(Boolean);

            const invalid=words.find(w=>!wordPattern.test(w));
            if(invalid){showToast('Use letters, spaces, apostrophes, or hyphens in each entry.');return}
            if (!name || words.length === 0) {
              showToast('Please enter a name and at least one word.');
              return;
            }
            const affectsActive=!modalState.editingListId || state.activeListId===modalState.editingListId;
            if (modalState.editingListId) {
              const target = state.customLists.find(l => l.id === modalState.editingListId);
              if (target) { target.name = name; target.words = words; }
              modalState.editingListId = null;
              showToast('List updated!');
            } else {
              const created = { id: 'custom-' + Date.now(), name, words };
              state.customLists.unshift(created);
              state.activeListId = created.id;
              showToast(`Created "${name}"!`);
            }
            saveState();
            updateTopbar();
            if (affectsActive && activity) {
              startActivity(currentScreen, false);
            } else if (currentScreen === 'home') {
              renderHome();
            }
            renderModal();
          });
        }
      }

      function switchStudent(id) {
        if(id===state.activeUserId)return;
        const prev=state.activeUserId,mode=activity?.mode;
        studentBoards.set(prev,movableBoard);
        if (activity) {
          activity.pausedAt = Date.now();
          studentSessions.set(prev, activity);
        }
        state.activeUserId=id;
        movableBoard=studentBoards.get(id)||{rows:[[],[],[]],activeRow:0};
        stopReading();
        if(mode){
          const other=studentSessions.get(id),list=other && getAllLists().find(l=>l.id===other.listId);
          if(other && list && list.words.join('|')===other.words.join('|')) {
            activity = other;
            if (activity.pausedAt) {
              activity.wordStartTime += Date.now() - activity.pausedAt;
              delete activity.pausedAt;
            }
            state.activeListId = list.id;
            currentScreen = other.mode;
            renderActivity();
          }else startActivity(mode,false);
        }else if(currentScreen==='movable')renderMovableRows();
      }

      function formatReportTime(iso) {
        const d = new Date(iso);
        const t = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        const dt = d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        return `${t}  ${dt}`;
      }

      function getWordHistory(user, word) {
        const marks = [];
        for (let i = 0; i < user.reports.length; i++) {
          const hit = user.reports[i].words.find(w => w.word.toLowerCase() === word.toLowerCase());
          if (hit) marks.push(hit.correct);
          if (marks.length >= 6) break;
        }
        return marks.reverse();
      }

      function renderReportsModal(container) {
        const user = getActiveUser();

        if (modalState.selectedReportId) {
          const rep = user.reports.find(r => r.id === modalState.selectedReportId);
          if (!rep) {
            modalState.selectedReportId = null;
            renderReportsModal(container);
            return;
          }
          const scoreCls = rep.score >= 85 ? 'high' : (rep.score >= 60 ? 'mid' : 'low');
          container.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:14px; flex-wrap:wrap;">
              <button class="m-btn ghost" id="btnBackReports">← All Sessions</button>
              <span class="score-badge ${scoreCls}">${escapeHtml(user.name)} — ${escapeHtml(rep.listName)} — ${rep.score}%</span>
            </div>
            <div style="font-size:0.86rem; font-weight:800; color:var(--ink-soft); margin-bottom:12px;">
              ${formatReportTime(rep.dateISO)} · ${escapeHtml(rep.mode)}
            </div>
            <div class="m-form-box" style="padding:6px 14px;">
              ${rep.words.map(w => {
                const hist = getWordHistory(user, w.word);
                return `
                  <div class="report-word-grid">
                    <div style="font-family:var(--font-display); font-size:1.18rem; font-weight:700;">${escapeHtml(w.word)}</div>
                    <div style="display:flex; align-items:center; gap:8px; font-weight:700; color:var(--ink-soft);">
                      <span class="mark-chip ${w.correct ? 'ok' : 'miss'}">${w.correct ? '✓' : '✕'}</span>
                      <span>${w.correct ? 'First try' : 'With practice'}</span>
                      <span>Duration: ${w.duration}s</span>
                    </div>
                    <div class="hist-col" style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                      <span style="font-size:0.82rem; font-weight:800; color:var(--ink-soft);">History</span>
                      ${hist.map(ok => `<span class="mark-chip ${ok ? 'ok' : 'miss'}">${ok ? '✓' : '✕'}</span>`).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
          document.getElementById('btnBackReports').addEventListener('click', () => {
            modalState.selectedReportId = null;
            renderModal();
          });
          return;
        }

        const chips = state.users.map(u => `
          <button class="student-chip ${u.id === user.id ? 'active' : ''}" data-switch-u="${u.id}">
            ${escapeHtml(u.name)}
          </button>
        `).join('');

        const rows = user.reports.length === 0
          ? `<p style="text-align:center; color:var(--ink-soft); font-weight:700; padding:22px 0;">No completed sessions yet for ${escapeHtml(user.name)}.</p>`
          : user.reports.map(rep => {
              const scoreCls = rep.score >= 85 ? 'high' : (rep.score >= 60 ? 'mid' : 'low');
              return `
                <button class="session-row-btn" data-open-rep="${rep.id}">
                  <div>
                    <div style="font-family:var(--font-display); font-size:1.1rem; font-weight:700;">
                      ${escapeHtml(rep.listName)}
                      <span style="font-family:var(--font-ui); font-size:0.8rem; font-weight:800; color:var(--ink-soft);">(${escapeHtml(rep.mode)})</span>
                    </div>
                    <div style="font-size:0.82rem; font-weight:700; color:var(--ink-soft); margin-top:2px;">
                      ${formatReportTime(rep.dateISO)} · ${rep.words.length} words
                    </div>
                  </div>
                  <span class="score-badge ${scoreCls}">${rep.score}%</span>
                </button>
              `;
            }).join('');

        container.innerHTML = `
          <div style="font-size:0.82rem; font-weight:900; text-transform:uppercase; color:var(--ink-soft); margin-bottom:8px;">Students</div>
          <div class="student-chips">${chips}</div>

          <form class="m-form-box" id="addStudentForm" style="display:flex; gap:10px; align-items:center; padding:11px 14px;">
            <input class="m-input" id="inpStudentName" type="text" aria-label="New learner name" placeholder="New learner name" style="margin-bottom:0; flex:1;" maxlength="22" required />
            <button type="submit" class="m-btn navy" style="padding:9px 16px;">+ Add</button>
          </form>

          <div style="font-size:0.82rem; font-weight:900; text-transform:uppercase; color:var(--ink-soft); margin:14px 0 9px;">
            ${escapeHtml(user.name)} Report History
          </div>
          ${rows}
        `;

        container.querySelectorAll('[data-switch-u]').forEach(btn => {
          btn.addEventListener('click', () => {
            switchStudent(btn.dataset.switchU);
            saveState();
            updateTopbar();
            if (currentScreen === 'home') renderHome();
            renderModal();
          });
        });

        container.querySelectorAll('[data-open-rep]').forEach(btn => {
          btn.addEventListener('click', () => {
            modalState.selectedReportId = btn.dataset.openRep;
            renderModal();
          });
        });

        document.getElementById('addStudentForm').addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('inpStudentName').value.trim();
          if (!name) return;
          const u = { id: 'user-' + Date.now(), name, reports: [] };
          state.users.push(u);
          switchStudent(u.id);
          saveState();
          updateTopbar();
          if (currentScreen === 'home') renderHome();
          showToast(`Switched to ${name}`);
          renderModal();
        });
      }

      function renderSettingsModal(container) {
        const s = state.settings;
        container.innerHTML = `
          <div class="setting-item">
            <div>
              <div style="font-weight:800; font-size:1rem;">Letter Pronunciation</div>
              <div style="font-size:0.84rem; font-weight:700; color:var(--ink-soft);">Hear a common sound for each letter, or hear its name.</div>
            </div>
            <div class="seg-group">
              <button class="${s.speechMode === 'phonics' ? 'active' : ''}" id="optPhonics">Letter sounds</button>
              <button class="${s.speechMode === 'names' ? 'active' : ''}" id="optNames">Letter Names</button>
            </div>
          </div>

          <div class="setting-item">
            <div>
              <div style="font-weight:800; font-size:1rem;">Wooden Rack Layout</div>
              <div style="font-size:0.84rem; font-weight:700; color:var(--ink-soft);">Alphabetical (A–Z) or Vowels grouped first</div>
            </div>
            <div class="seg-group">
              <button class="${s.rackLayout === 'alphabetical' ? 'active' : ''}" id="optAlpha">Alphabetical</button>
              <button class="${s.rackLayout === 'vowels-first' ? 'active' : ''}" id="optVowels">Vowels First</button>
            </div>
          </div>

          <div class="setting-item">
            <div>
              <div style="font-weight:800; font-size:1rem;">Practice Guide Letters</div>
              <div style="font-size:0.84rem; font-weight:700; color:var(--ink-soft);">Show faint guide letters inside the tray in Word Practice</div>
            </div>
            <div class="seg-group">
              <button class="${s.showPracticeGuides ? 'active' : ''}" id="optGuidesOn">On</button>
              <button class="${!s.showPracticeGuides ? 'active' : ''}" id="optGuidesOff">Off</button>
            </div>
          </div>
        `;

        const refreshRackIfVisible = () => {
          if (currentScreen === 'movable') renderWoodenRack('movableRack', (ch) => addMovableChar(ch));
          if (activity && !activity.sessionFinished) renderActivity();
        };

        document.getElementById('optPhonics').addEventListener('click', () => {
          state.settings.speechMode = 'phonics'; saveState(); renderModal(); speakLetter('b');
        });
        document.getElementById('optNames').addEventListener('click', () => {
          state.settings.speechMode = 'names'; saveState(); renderModal(); speakLetter('b');
        });
        document.getElementById('optAlpha').addEventListener('click', () => {
          state.settings.rackLayout = 'alphabetical'; saveState(); renderModal(); refreshRackIfVisible();
        });
        document.getElementById('optVowels').addEventListener('click', () => {
          state.settings.rackLayout = 'vowels-first'; saveState(); renderModal(); refreshRackIfVisible();
        });
        document.getElementById('optGuidesOn').addEventListener('click', () => {
          state.settings.showPracticeGuides = true; saveState(); renderModal(); refreshRackIfVisible();
        });
        document.getElementById('optGuidesOff').addEventListener('click', () => {
          state.settings.showPracticeGuides = false; saveState(); renderModal(); refreshRackIfVisible();
        });
      }

      /* ========================================================================
         GLOBAL KEYBOARD SUPPORT
         ======================================================================== */
      document.addEventListener('keydown', (e) => {
        if (modalState.type !== null) {
          if (e.key === 'Escape') closeModal();
          if(e.key==='Tab'){
            const nodes=[...document.querySelectorAll('#modalBackdrop button:not(:disabled),#modalBackdrop input,#modalBackdrop textarea')];
            if(e.shiftKey && (document.activeElement===nodes[0] || !nodes.includes(document.activeElement))){e.preventDefault();nodes.at(-1)?.focus()}
            if(!e.shiftKey && document.activeElement===nodes.at(-1)){e.preventDefault();nodes[0]?.focus()}
          }
          return;
        }
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        const key = e.key;
        if ((key==='Enter'||key===' ') && e.target.closest?.('button,a,input,textarea,select')) return;
        if (currentScreen === 'movable') {
          if (/^[a-zA-Z0-9\-'!?]$/.test(key)) {
            e.preventDefault();
            addMovableChar(key.toLowerCase());
          } else if (key === ' ') {
            e.preventDefault();
            addMovableChar(' ');
          } else if (key === 'Backspace') {
            e.preventDefault();
            backspaceMovable();
          } else if (key === 'Enter') {
            e.preventDefault();
            movableBoard.activeRow = (movableBoard.activeRow + 1) % movableBoard.rows.length;
            playWoodClick();
            renderMovableRows();
          }
          return;
        }

        if (activity && !activity.sessionFinished) {
          if (activity.completed) {
            if (key === 'Enter' || key === ' ') {
              e.preventDefault();
              advanceWord();
            }
            return;
          }
          if (/^[a-zA-Z]$/.test(key)) {
            e.preventDefault();
            document.getElementById('magneticTray').focus({preventScroll:true});
            placeLetterInput(key.toLowerCase());
          } else if (key === 'Backspace') {
            e.preventDefault();
            removeLastTile();
          } else if (key === 'Enter') {
            e.preventDefault();
            checkCurrentSpelling();
          }
        }
      });

      /* ========================================================================
         TOP BAR & MODAL WIRING + INITIAL LAUNCH INTO ACTIVITY 1 ("bag")
         ======================================================================== */
      document.getElementById('btnHome').addEventListener('click', () => {
        playWoodClick();
        renderHome();
      });
      document.getElementById('btnListDropdown').addEventListener('click', () => openModal('lists'));
      document.getElementById('btnUserMedallion').addEventListener('click', () => openModal('reports'));
      document.getElementById('btnSettings').addEventListener('click', () => openModal('settings'));
      document.getElementById('btnAudioToggle').addEventListener('click', () => {
        state.settings.audioEnabled = !state.settings.audioEnabled;
        saveState();
        updateTopbar();
        if (state.settings.audioEnabled) playWoodClick(); else stopReading();
        showToast(state.settings.audioEnabled ? 'Audio On' : 'Audio Muted');
      });
      document.getElementById('btnCloseModal').addEventListener('click', closeModal);
      document.getElementById('modalBackdrop').addEventListener('click', (e) => {
        if (e.target.id === 'modalBackdrop') closeModal();
      });

      // Launch directly into Activity 1: Word Practice on "Three-letter words" ("bag")
      startActivity('practice', false);
    })();
