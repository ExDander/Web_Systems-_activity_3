const QUESTIONS = [
  // Multiple Choice
  {
    id: 'q1',
    correctAnswer: 'a2',
    questionLabel:
      '1. What is the foundational language for creating web pages?',
    answers: [
      { id: 'a1', answerLabel: 'C++' },
      { id: 'a2', answerLabel: 'HTML' },
      { id: 'a3', answerLabel: 'Java' },
      { id: 'a4', answerLabel: 'CSS' },
    ],
  },
  {
    id: 'q2',
    correctAnswer: 'a4',
    questionLabel: '2. Which html tag is used where a user enters data?',
    answers: [
      { id: 'a1', answerLabel: '<form>' },
      { id: 'a2', answerLabel: '<p>' },
      { id: 'a3', answerLabel: '<label>' },
      { id: 'a4', answerLabel: '<input>' },
    ],
  },
  {
    id: 'q3',
    correctAnswer: 'a1',
    questionLabel: '3. Header information in a table is defined with what tag?',
    answers: [
      { id: 'a1', answerLabel: '<th>' },
      { id: 'a2', answerLabel: '<tr>' },
      { id: 'a3', answerLabel: '<td>' },
      { id: 'a4', answerLabel: '<table>' },
    ],
  },
  {
    id: 'q4',
    correctAnswer: 'a2',
    questionLabel: '4. What does an absolute url do?',
    answers: [
      {
        id: 'a1',
        answerLabel: 'Links an image that is hosted within the website.',
      },
      {
        id: 'a2',
        answerLabel:
          'Links to an external image that is hosted on another website.',
      },
      {
        id: 'a3',
        answerLabel: 'Links to an image that is saved from the device.',
      },
      {
        id: 'a4',
        answerLabel: 'Links to an image that is linked to another website.',
      },
    ],
  },
  {
    id: 'q5',
    correctAnswer: 'a1',
    questionLabel:
      '5. What is used to describe the visual presentation and layout of the document writter in markup languages like html?',
    answers: [
      { id: 'a1', answerLabel: 'CSS' },
      { id: 'a2', answerLabel: 'Java' },
      { id: 'a3', answerLabel: 'C#' },
      { id: 'a4', answerLabel: 'C' },
    ],
  },

  // True or False
  {
    id: 'q6',
    correctAnswer: 'a2',
    questionLabel:
      '6. Javascript is a high-level styling sheet used to make pages designs.',
    answers: [
      { id: 'a1', answerLabel: 'True' },
      { id: 'a2', answerLabel: 'False' },
    ],
  },
  {
    id: 'q7',
    correctAnswer: 'a1',
    questionLabel:
      '7. A function is a block of a reusable code that performs a specific task.',
    answers: [
      { id: 'a1', answerLabel: 'True' },
      { id: 'a2', answerLabel: 'False' },
    ],
  },
  {
    id: 'q8',
    correctAnswer: 'a2',
    questionLabel:
      '8. "\\d" is used to break a line, to move content to the next line.',
    answers: [
      { id: 'a1', answerLabel: 'True' },
      { id: 'a2', answerLabel: 'False' },
    ],
  },
  {
    id: 'q9',
    correctAnswer: 'a1',
    questionLabel: '9. A method is a function associated with an object',
    answers: [
      { id: 'a1', answerLabel: 'True' },
      { id: 'a2', answerLabel: 'False' },
    ],
  },
  {
    id: 'q10',
    correctAnswer: 'a1',
    questionLabel:
      '10. Operators are symbols that perform operations on values or variables',
    answers: [
      { id: 'a1', answerLabel: 'True' },
      { id: 'a2', answerLabel: 'False' },
    ],
  },
];

// Escape labels like "<form>" so they show as text instead of becoming real tags
function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadQuestionAnswersIntoDOM(answers, questionIndex) {
  return answers
    .map(
      (answer) => `
    <label class="option-container">
      <input type="radio" name="${questionIndex}" value="${answer.id}" />
      ${escapeHTML(answer.answerLabel)}
    </label>
    <br />
  `
    )
    .join('');
}

function loadQuestionsIntoDOM() {
  const form = document.getElementById('quiz-form');
  const buttonContainer = form.querySelector('.btn-container');

  const questionsHTML = QUESTIONS.map(
    (question) => `
      <div class="question-container">
        <p>${escapeHTML(question.questionLabel)}</p>
        ${loadQuestionAnswersIntoDOM(question.answers, question.id)}
      </div>
    `
  ).join('');

  buttonContainer.insertAdjacentHTML('beforebegin', questionsHTML);
}

function onSubmit() {
  const formElement = document.getElementById('quiz-form');

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!formElement.checkValidity()) {
      formElement.reportValidity();

      return;
    }

    const formData = new FormData(formElement);

    const parsedFormData = Object.fromEntries(formData.entries());

    let sum = 0;

    QUESTIONS.forEach((question) => {
      if (question.correctAnswer === parsedFormData[question.id]) {
        sum += 1;
      }
    });

    const quizScoreElement = document.getElementById('quiz-score');

    quizScoreElement.innerText = `Your quiz score is ${sum} / 10`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadQuestionsIntoDOM();
  onSubmit();
});
