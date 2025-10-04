// =====================
// Função: Tela Cheia
// =====================
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

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
// Função: Downloads (exemplo)
// =====================
function downloadSample(fileName) {
  alert("Simulação de download: " + fileName);
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
