let questions = [];
let currentQuestion = 0;
let time = 30;
let timer;

let answers = [];

let username = localStorage.getItem("username");
let subject = localStorage.getItem("subject");

document.getElementById("welcome").innerText =
    "Hello, " + username + "!";


async function loadQuiz() {

    try {

        let url =
            "https://the-trivia-api.com/v2/questions?limit=10&categories="
            + subject;

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        questions = await response.json();

        if (questions.length === 0) {
            throw new Error("No questions found");
        }

        answers = new Array(questions.length).fill(null);

        showQuestion();

    } catch (error) {

        console.log(error);

        document.getElementById("question").innerText =
            "Unable to load questions.";

    }
}


function showQuestion() {

    clearInterval(timer);

    time = 30;

    document.getElementById("timer").innerText = time;

    startTimer();


    let q = questions[currentQuestion];


    document.getElementById("question-number").innerText =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    document.getElementById("progress").innerText =
        Math.round(
            ((currentQuestion + 1) / questions.length) * 100
        ) + "% completed";


    document.getElementById("question").innerText =
        q.question.text;


    let options = [
        ...q.incorrectAnswers,
        q.correctAnswer
    ];


    options.sort(() => Math.random() - 0.5);


    let optionsContainer =
        document.getElementById("options");

    optionsContainer.innerHTML = "";


    options.forEach(option => {

        let button = document.createElement("button");

        button.className = "option";

        button.innerText = option;


        button.addEventListener("click", function () {

            selectAnswer(button, option);

        });


        optionsContainer.appendChild(button);

    });


    // Show saved answer
    if (answers[currentQuestion] !== null) {

        let savedAnswer = answers[currentQuestion];

        let buttons =
            document.querySelectorAll(".option");

        buttons.forEach(button => {

            if (button.innerText === savedAnswer) {

                button.classList.add("selected");

            }

        });

    }


    document.getElementById("previous-btn").disabled =
        currentQuestion === 0;

}


function selectAnswer(button, answer) {

    let buttons =
        document.querySelectorAll(".option");


    buttons.forEach(btn => {

        btn.classList.remove("selected");

    });


    button.classList.add("selected");


    answers[currentQuestion] = answer;

}


function saveAnswer() {

    if (answers[currentQuestion] === null) {

        alert("Please select an answer first.");

        return;

    }


    localStorage.setItem(
        "quizAnswers",
        JSON.stringify(answers)
    );


    alert("Answer saved successfully!");

}


function nextQuestion() {

    clearInterval(timer);


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        finishQuiz();

    }

}


function previousQuestion() {

    if (currentQuestion > 0) {

        clearInterval(timer);

        currentQuestion--;

        showQuestion();

    }

}


function finishQuiz() {

    clearInterval(timer);

    let score = 0;


    questions.forEach((question, index) => {

        if (
            answers[index] ===
            question.correctAnswer
        ) {

            score++;

        }

    });


    localStorage.setItem("score", score);

    localStorage.setItem(
        "total",
        questions.length
    );


    window.location.href = "result.html";

}


function startTimer() {

    timer = setInterval(() => {

        time--;

        document.getElementById("timer").innerText =
            time;


        if (time <= 0) {

            clearInterval(timer);

            nextQuestion();

        }

    }, 1000);

}


loadQuiz();