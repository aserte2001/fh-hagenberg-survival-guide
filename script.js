// Quiz Daten
const questions = [
  {
    question: "Wann beginnt das Wintersemester an der FH Hagenberg?",
    options: ["1. September", "1. Oktober", "15. September", "1. August"],
    answer: 1 // Index 1 = "1. Oktober"
  },
  {
    question: "Welche Programmiersprache ist Pflicht im 1. Semester?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 1 // Java
  },
  {
    question: "Wo findest du die Mensa?",
    options: ["Gebäude A", "Gebäude B", "Gebäude C", "Im Park"],
    answer: 1 // Gebäude B
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

// Navigation: Zeige Quiz
document.querySelector('a[href="#quiz"]').addEventListener('click', (e) => {
  e.preventDefault();
  hideAllSections();
  document.getElementById('quiz').classList.remove('d-none');
  startQuiz();
});

// Starte Quiz
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = score;
  showQuestion();
}

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

  nextBtn.style.display = 'none'; // Verstecke bis Antwort gegeben
}

function selectAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    scoreEl.textContent = score;
    alert("Richtig! 🚀");
  } else {
    alert(`Falsch 😅\nRichtig: ${questions[currentQuestion].options[correct]}`);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 600);
  } else {
    setTimeout(() => {
      alert(`Quiz beendet! 🎉\nDein Score: ${score}/${questions.length}`);
      hideAllSections();
      document.getElementById('home').classList.remove('d-none');
    }, 600);
  }
}

function hideAllSections() {
  document.querySelectorAll('section').forEach(s => s.classList.add('d-none'));
}

// Nächste-Frage-Button (falls man manuell will)
nextBtn.onclick = () => {
  if (currentQuestion < questions.length) {
    showQuestion();
  }
};
