const questions = [
  {
    question:
      "Which of the following is not a primitive data type in JavaScript?",
    answers: [
      { text: "String", correct: false },
      { text: "Object", correct: true },
      { text: "Boolean", correct: false },
      { text: "Number", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the correct way to get the value of an element's property in JavaScript?",
    answers: [
      { text: "document.getElementById('elementId').value", correct: true },
      {
        text: "document.getElementById('elementId').getPropertyValue('value')",
        correct: false,
      },
      {
        text: "document.getElementById('elementId').getAttribute('value')",
        correct: false,
      },
      {
        text: "document.getElementById('elementId').property('value')",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which of the following is the correct syntax to create a function in JavaScript?",
    answers: [
      { text: "var myFunction = function() => { }", correct: false },
      { text: "var myFunction = new function() { }", correct: false },
      { text: "var myFunction = function() { }", correct: false },
      { text: "function myFunction() { }", correct: true },
    ],
  },
  {
    question:
      "Which of the following is the correct syntax to call a function in JavaScript?",
    answers: [
      { text: "var myFunction = function() { }", correct: false },
      { text: "myFunction()", correct: true },
      { text: "new myFunction()", correct: false },
      { text: "() => { }", correct: false },
    ],
  },
];

const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let Score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  Score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = questionNo + "." + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", SelectAnswer);
  });
}
function resetState() {
  nextBtn.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function SelectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    Score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}
function showScore() {
  resetState();
  question.innerHTML = `You scored ${Score} out of ${questions.length}!`;
  nextBtn.innerHTML = "play again";
  nextBtn.style.display = "block";
}
function handleNextbtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextbtn();
  } else {
    startQuiz();
  }
});

startQuiz();
