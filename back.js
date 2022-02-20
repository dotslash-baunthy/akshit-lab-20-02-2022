class Question {
    constructor(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}

const questionsGlobal = [
    new Question("Javascript supports which of the following?", ["Functions", "XHTML", "CSS", "XML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("What is not a Javascript?", ["Python script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("What is used for connecting to a database?", ["PHP", "HTML", "JS", "All"], "PHP")
];

class Quiz {
    constructor(questionsGlobal) {
        this.questions = questionsGlobal;
        this.score = 0;
        this.questionIndex = 0;
    }
}

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

function showScore() {
    let x = "<h1>Here is the result of the quiz!</h1>";
    x += "<h2>Your score is " + quiz.score + "</h2>";
    x += "<h2>You got " + ((quiz.score / quiz.questions.length) * 100) + "%</h2>";
    let result = document.getElementById("quiz");
    result.innerHTML = x;
    result.style.color = "#01BBFF";
}

function showProgress() {
    let progress = document.getElementById("progress");
    let score = quiz.questionIndex + 1;
    progress.innerText = "Question " + score + " of " + quiz.questions.length;
}

function handleOptionButton(choice, id) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.getAnswerByIndex(choice);
        populate();
    }
};

let quiz = new Quiz(questionsGlobal);

populate();