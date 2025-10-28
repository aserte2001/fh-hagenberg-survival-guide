// === FH HAGENBERG SURVIVAL GUIDE – QUIZ LOGIK ===

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

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function hideAllSections() {
  document.querySelectorAll('section, main').forEach(s => s.classList.add('d-none'));
}

document.addEventListener('DOMContentLoaded', () => {
  const quizLink = document.querySelector('a[href="#quiz"]');
  if (quizLink) {
    quizLink.addEventListener('click', (e) => {
      e.preventDefault();
      hideAllSections();
      document.getElementById('quiz').classList.remove('d-none');
      setTimeout(startQuiz, 100);
    });
  }
});

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
    alert(`Falsch 😅 Richtig: ${questions[currentQuestion].options[correct]}`);
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    setTimeout(() => {
      alert(`Quiz fertig! 🎉 Score: ${score}/${questions.length}`);
      hideAllSections();
      document.getElementById('home').classList.remove('d-none');
    }, 1000);
  }
}
