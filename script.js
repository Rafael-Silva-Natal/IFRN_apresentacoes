
    // --- Presentation flow and reveals ---
    const reveals = document.querySelectorAll('.reveal');
    const progress = document.getElementById('present-progress');
    let step = 0;
    function updateProgress(){
      const pct = Math.round((step / (reveals.length-1))*100);
      progress.style.width = pct + '%';
    }
    function showStep(i){
      step = Math.max(0, Math.min(i, reveals.length-1));
      reveals.forEach((r,idx)=> r.classList.toggle('visible', idx<=step));
      updateProgress();
    }
    function nextStep(){ showStep(step+1); }
    function prevStep(){ showStep(step-1); }
    function jumpTo(i){ showStep(i); }

    // initialize
    showStep(0);

    // --- Local "interest" collector ---
    const picks = new Map();
    function pick(topic){
      const count = picks.get(topic) || 0;
      picks.set(topic,count+1);
      document.getElementById('count').innerText = Array.from(picks.values()).reduce((a,b)=>a+b,0);
      toast(`Registrado: ${topic}`);
    }

    // --- Quiz ---
    const quizState = {answered:false};
    function answerQuiz(ans){
      quizState.answered = true;
      quizState.answer = ans;
      document.getElementById('quiz-state').innerText = `Respondido: ${ans}`;
      toast('Obrigado pela resposta!');
    }

    // --- Simple toast ---
    function toast(msg){
      const el = document.createElement('div');
      el.textContent = msg; el.style.position='fixed'; el.style.right='18px'; el.style.bottom='18px';
      el.style.background='rgba(2,6,23,0.9)'; el.style.padding='10px 12px'; el.style.borderRadius='8px'; el.style.boxShadow='0 8px 20px rgba(0,0,0,0.6)';
      document.body.appendChild(el); setTimeout(()=>{el.style.opacity='0';},1600); setTimeout(()=>el.remove(),2200);
    }

    // --- Downloads (generate example files on the fly) ---
    function downloadSample(kind){
      if(kind==='Resumo'){
        const content = `Resumo do seminário\n\nTópicos:\n- Introdução\n- Demonstração\n- Recursos\n`;
        downloadBlob(content, 'Resumo.txt', 'text/plain');
      } else if(kind==='Exercicios'){
        // create a simple zip-like structure by bundling multiple files in a folder is complex without libraries.
        // Instead create a single text that describes contents, or create multiple downloads in sequence.
        const ex1 = 'Exercicio 1: ...\n';
        downloadBlob(ex1, 'Exercicio1.txt', 'text/plain');
        setTimeout(()=>downloadBlob('Exercicio 2: ...\n', 'Exercicio2.txt','text/plain'), 200);
        setTimeout(()=>downloadBlob('Exercicio 3: ...\n', 'Exercicio3.txt','text/plain'), 400);
      } else if(kind==='Codigo'){
        const code = `// Exemplo de codigo\nconsole.log('Olá, mundo!');\n`;
        downloadBlob(code,'codigo-exemplo.js','application/javascript');
      }
    }
    function downloadBlob(content, filename, mime){
      const blob = new Blob([content], {type: mime});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(()=>URL.revokeObjectURL(url), 2000);
    }

    // --- Save and export responses ---
    document.getElementById('btn-export-resp').addEventListener('click', ()=>{
      exportResponses();
    });
    function exportResponses(){
      const data = {
        picks: Array.from(picks.entries()),
        quiz: quizState
      };
      downloadBlob(JSON.stringify(data, null, 2), 'respostas-seminario.json','application/json');
    }

    // --- Presenter notes modal ---
    const notesModal = document.getElementById('presenter-notes');
    document.getElementById('btn-toggle-notes').addEventListener('click', openNotes);
    function openNotes(){ notesModal.style.display='flex'; }
    function closeNotes(){ notesModal.style.display='none'; }
    function saveNotes(){ const txt = document.getElementById('notes-text').innerText; localStorage.setItem('presenter-notes', txt); toast('Notas salvas localmente'); }
    function loadNotes(){ const n = localStorage.getItem('presenter-notes'); if(n) document.getElementById('notes-text').innerText = n; }
    loadNotes();

    // close with ESC
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeNotes(); if(e.key==='ArrowRight') nextStep(); if(e.key==='ArrowLeft') prevStep(); });

    // --- Fullscreen ---
    document.getElementById('btn-fullscreen').addEventListener('click', ()=>{
      if(!document.fullscreenElement){ document.documentElement.requestFullscreen().catch(()=>{}); }
      else document.exitFullscreen();
    });

    // --- Start button toggles presentation mode ---
    document.getElementById('btn-start').addEventListener('click', ()=>{
      showStep(0); document.documentElement.requestFullscreen().catch(()=>{});
      toast('Modo apresentação iniciado — use ← → para navegar');
    });

    // --- Export saved notes as a file ---
    function exportNotesFile(){ const n = localStorage.getItem('presenter-notes') || ''; downloadBlob(n, 'Notas-Apresentador.txt','text/plain'); }

    // attach small helpers to global scope for buttons
    window.nextStep = nextStep; window.prevStep = prevStep; window.jumpTo = jumpTo; window.pick = pick; window.answerQuiz = answerQuiz; window.downloadSample = downloadSample; window.exportResponses = exportResponses; window.closeNotes = closeNotes; window.saveNotes = saveNotes; window.exportNotesFile = exportNotesFile;

    // --- Intersection observer for reveal animations when not in fullscreen mode ---
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
    },{threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  