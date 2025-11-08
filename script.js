// === FH HAGENBERG SURVIVAL GUIDE – QUIZ & MAP LOGIK ===

// --- QUIZ FRAGEN ---
const questions = [
  {
    question: "Wann beginnt das Wintersemester an der FH Hagenberg?",
    options: ["1. September", "1. Oktober", "15. September", "1. August"],
    answer: 1
  },
  {
    question: "Welche Programmiersprache ist Pflicht im 1. Semester Software Engineering?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 1
  },
  {
    question: "In welchem Gebäude ist die Mensa?",
    options: ["Gebäude A", "Gebäude B", "Gebäude C", "Im Park"],
    answer: 1
  }
];

// --- VARIABLEN ---
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');

// --- HILFSFUNKTION: Alle Sektionen verstecken ---
function hideAllSections() {
  document.querySelectorAll('section, main').forEach(s => s.classList.add('d-none'));
}

// --- NAVIGATION: DOM GELADEN ---
document.addEventListener('DOMContentLoaded', () => {
  // Quiz öffnen
  const quizLink = document.querySelector('a[href="#quiz"]');
  if (quizLink) {
    quizLink.addEventListener('click', (e) => {
      e.preventDefault();
      hideAllSections();
      document.getElementById('quiz').classList.remove('d-none');
      startQuiz();
    });
  }

  // Map öffnen
  const mapLink = document.querySelector('a[href="#map"]');
  if (mapLink) {
    mapLink.addEventListener('click', (e) => {
      e.preventDefault();
      hideAllSections();
      document.getElementById('map').classList.remove('d-none');
    });
  }
});

// --- QUIZ STARTEN ---
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = score;

  // Nur 1x Highscore anzeigen
  const quizContainer = document.querySelector('#quiz .bg-white');
  const oldHs = quizContainer.querySelector('.highscore-text');
  if (oldHs) oldHs.remove();

  showHighscore();
  showQuestion();
}

// --- FRAGE ANZEIGEN ---
function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary w-100 mb-2';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsEl.appendChild(btn);
  });
}

// --- ANTWORT PRÜFEN ---
function selectAnswer(selected) {
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    score++;
    scoreEl.textContent = score;
    alert("Richtig!");
  } else {
    alert(`Falsch\nRichtig wäre: ${questions[currentQuestion].options[correct]}`);
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    setTimeout(finishQuiz, 1000);
  }
}

// --- QUIZ BEENDEN ---
function finishQuiz() {
  // HIGHSCORE SPEICHERN (WICHTIG!)
  saveHighscore();

  alert(`Quiz beendet!\nDein Score: ${score}/${questions.length}`);

  // Zurück zu Home
  hideAllSections();
  document.getElementById('home').classList.remove('d-none');

  // Highscore auf Home aktualisieren
  updateHomeHighscore();
}

// --- HIGHSCORE SPEICHERN ---
function saveHighscore() {
  const saved = localStorage.getItem('fhHighscore') || 0;
  if (score > saved) {
    localStorage.setItem('fhHighscore', score);
  }
}

// --- HIGHSCORE IM QUIZ ANZEIGEN ---
function showHighscore() {
  const highscore = localStorage.getItem('fhHighscore') || 0;
  const hsText = document.createElement('p');
  hsText.className = 'highscore-text text-center mt-3 text-muted';
  hsText.innerHTML = `<strong>Bester Score:</strong> ${highscore}/${questions.length}`;
  document.querySelector('#quiz .bg-white').appendChild(hsText);
}

// --- HIGHSCORE AUF HOME ANZEIGEN ---
function updateHomeHighscore() {
  const home = document.getElementById('home');
  let hsEl = home.querySelector('.home-highscore');
  if (!hsEl) {
    hsEl = document.createElement('p');
    hsEl.className = 'home-highscore text-center text-primary mt-4 fw-bold';
    home.appendChild(hsEl);
  }
  const highscore = localStorage.getItem('fhHighscore') || 0;
  hsEl.innerHTML = `Bester Score bisher: <strong>${highscore}</strong> von ${questions.length}`;
}

// Highscore laden und anzeigen
function showHighscoreList() {
  const highscoreList = JSON.parse(localStorage.getItem('highscores')) || [];
  const ul = document.getElementById('highscore-list');
  ul.innerHTML = '';
  highscoreList
    .sort((a, b) => b.score - a.score) // höchster Score zuerst
    .forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.name}: ${entry.score} Punkte`;
      ul.appendChild(li);
    });
}
showHighscoreList(); // beim Seitenstart anzeigen

// Füge diese Funktion ein, wenn User am Ende des Quiz einen Score hat!
function addHighscore(name, score) {
  const highscoreList = JSON.parse(localStorage.getItem('highscores')) || [];
  highscoreList.push({ name, score });
  localStorage.setItem('highscores', JSON.stringify(highscoreList));
  showHighscoreList();
}

const score = /* dein Quiz-Score */;
const name = prompt("Trag deinen Nicknamen für die Highscore-Liste ein:");
if (name) {
  addHighscore(name, score);
}



