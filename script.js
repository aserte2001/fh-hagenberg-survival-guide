// Quiz Daten
const questions = [
  {
    question: "Wann beginnt das Wintersemester an der FH Hagenberg?",
    options: ["1. September", "1. Oktober", "15. September", "1. August"],
    answer: 1
  },
  {
    question: "Welche Programmiersprache ist Pflicht im 1. Semester?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: 1
  },
  {
    question: "Wo findest du die Mensa?",
    options: ["Gebäude A", "Gebäude B", "Gebäude C", "Im Park"],
    answer: 1
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
  document.querySelectorAll('section').forEach(s => s.classList.add('d-none'));
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
}

function selectAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    scoreEl.textContent = score;
    alert("Richtig! 🚀");
  } else {
    alert("Leider falsch 😅 Richtig wäre: " + questions[currentQuestion].options[correct]);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 500);
  } else {
    setTimeout(() => {
      alert(`Quiz beendet! Dein Score: ${score}/${questions.length} 🎉`);
      document.getElementById('home').classList.remove('d-none');
      document.getElement:getElementById('quiz').classList.add('d-none');
    }, 500);
  }
}

// Nächste Frage Button
nextBtn.onclick = () => {
  if (currentQuestion < questions.length) {
    showQuestion();
  }
};
