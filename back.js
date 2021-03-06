class Question {
    constructor(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}

// Create an array of objects that has each question, its respective options and the correct answer
const questionsGlobal = [
    new Question("Javascript supports which of the following?", ["Functions", "XHTML", "CSS", "XML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("What is not a Javascript?", ["Python script", "JQuery", "Django", "NodeJS"], "Python script"),
    new Question("What is used for connecting to a database?", ["PHP", "HTML", "JS", "All"], "PHP")
];

class Quiz {
    constructor(questionsGlobal) {
        this.questions = questionsGlobal;
        this.score = 0;
        this.questionIndex = 0;
    }
}

// Prototype function of Quiz object
// Get current question, get answer and get whether the quiz has ended (all questions have been submitted)
Quiz.prototype.getQuestionByIndex = function () {
    return quiz.questions[this.questionIndex];
}

Quiz.prototype.getAnswerByIndex = function (userAnswer) {
    if (userAnswer === this.getQuestionByIndex().answer) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isQuizEnded = function () {
    return this.questionIndex === this.questions.length;
}

// Function for population the question and its choices in the HTML page
// onClick handler has been added (handleOptionButton)
function populate() {
    if (quiz.isQuizEnded()) {
        showScore();
    } else {
        let questionPara = document.getElementById("question");
        questionPara.innerText = quiz.getQuestionByIndex().question;
        let choices = quiz.getQuestionByIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let element = document.getElementById("choice" + i);
            element.innerText = choices[i];
            handleOptionButton(choices[i], "btn" + i);
        }
        showProgress();
    }
}

// In case all questions are submitted, this function is called to display score and calculate percentage
function showScore() {
    let x = "<h1>Here is the result of the quiz!</h1>";
    x += "<h2>Your score is " + quiz.score + "</h2>";
    x += "<h2>You got " + ((quiz.score / quiz.questions.length) * 100) + "%</h2>";
    let result = document.getElementById("quiz");
    result.innerHTML = x;
    result.style.color = "#01BBFF";
}

// Question x of y but x and y are numbers
function showProgress() {
    let progress = document.getElementById("progress");
    let score = quiz.questionIndex + 1;
    progress.innerText = "Question " + score + " of " + quiz.questions.length;
}

// Function called in case of button click, this checks the answer and calls populate()
function handleOptionButton(choice, id) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.getAnswerByIndex(choice);
        populate();
    }
};

let quiz = new Quiz(questionsGlobal);

// Call populate on page load
window.onload = function() {
    populate();
}