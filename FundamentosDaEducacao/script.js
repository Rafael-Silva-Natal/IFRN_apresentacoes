// =====================
// Função: Tela Cheia
// =====================
// =====================
// Função: Tela Cheia com botão oculto durante fullscreen
// =====================
function toggleFullscreen() {
  const btn = document.getElementById("btn-fullscreen");

  if (!document.fullscreenElement) {
    // Entrar em tela cheia
    document.documentElement.requestFullscreen();
    btn.style.display = "none"; // Esconde o botão
  } else {
    // Sair de tela cheia
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Quando sair da tela cheia (ESC ou outro evento), o botão reaparece
document.addEventListener("fullscreenchange", () => {
  const btn = document.getElementById("btn-fullscreen");
  if (!document.fullscreenElement) {
    btn.style.display = "inline-block"; // Mostra novamente
  }
});

document.getElementById("btn-fullscreen")?.addEventListener("click", toggleFullscreen);


// =====================
// Função: Seleção de interesse
// =====================
let picks = [];
function pick(topic) {
  picks.push(topic);
  updateCounter();
}

function updateCounter() {
  const counter = document.getElementById("count");
  if (counter) {
    counter.textContent = picks.length;
  }
}

// =====================
// Função: Quiz
// =====================
let quizAnswer = null;
function answerQuiz(option) {
  quizAnswer = option;
  const state = document.getElementById("quiz-state");
  if (state) {
    state.textContent = `Você respondeu: ${quizAnswer}`;
  }
}

// =====================
// Função: Downloads 
// =====================
function baixarArquivo() {
  const caminhoArquivo = encodeURI("Downloads/Seminario.html");
  const link = document.createElement("a");
  link.href = caminhoArquivo;
  link.download = "Seminario.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// =====================
// Função: Downloads2 
// =====================

function baixarArquivo2() {
  const caminhoArquivo = encodeURI("Downloads/Seminario_Interativo_Cascudo.pptx");
  const link = document.createElement("a");
  link.href = caminhoArquivo;
  link.download = "seminario_Interativo_Cascudo.pptx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// =====================
// Função: Downloads3 
// =====================

function baixarArquivo3() {
  const caminhoArquivo = encodeURI("Downloads/Seminario_Interativo_Cascudo.odp");
  const link = document.createElement("a");
  link.href = caminhoArquivo;
  link.download = "seminario_Interativo_Cascudo.odp";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// =====================
// Funções de navegação de slides
// =====================
let step = 0;
function nextStep() {
  step++;
  updateProgress();
}
function prevStep() {
  if (step > 0) step--;
  updateProgress();
}
function jumpTo(n) {
  step = n;
  updateProgress();
}
function updateProgress() {
  const bar = document.getElementById("present-progress");
  if (bar) {
    const percent = Math.min(100, (step + 1) * 25); // exemplo
    bar.style.width = percent + "%";
  }
}

// =====================
// Funções de notas do apresentador
// =====================
function closeNotes() {
  document.getElementById("presenter-notes").style.display = "none";
}
function saveNotes() {
  const notes = document.getElementById("notes-text").innerText;
  localStorage.setItem("presenterNotes", notes);
  alert("Notas salvas localmente!");
}

// Recarregar notas se existirem
window.addEventListener("load", () => {
  const saved = localStorage.getItem("presenterNotes");
  if (saved) {
    document.getElementById("notes-text").innerText = saved;
  }
});

