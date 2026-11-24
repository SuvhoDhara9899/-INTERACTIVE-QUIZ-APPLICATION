let username = localStorage.getItem("username");

let score = Number(
    localStorage.getItem("score")
);

let total = Number(
    localStorage.getItem("total")
);

let wrong = total - score;

let percentage =
    Math.round((score / total) * 100);


// Grade Calculation

let grade;

if (percentage >= 90) {
    grade = "A+";
}
else if (percentage >= 80) {
    grade = "A";
}
else if (percentage >= 70) {
    grade = "B";
}
else if (percentage >= 60) {
    grade = "C";
}
else if (percentage >= 50) {
    grade = "D";
}
else {
    grade = "F";
}


// Show Result

document.getElementById("result-name").innerText =
    "Well done, " + username + "!";

document.getElementById("score").innerText =
    "Score: " + score + " / " + total;

document.getElementById("correct").innerText =
    "Correct Answers: " + score;

document.getElementById("wrong").innerText =
    "Wrong Answers: " + wrong;

document.getElementById("percentage").innerText =
    "Percentage: " + percentage + "%";

document.getElementById("grade").innerText =
    "Grade: " + grade;


// Certificate Page

function viewCertificate() {

    window.location.href = "certificate.html";

}


// Restart Quiz

function restartQuiz() {

    window.location.href = "quiz.html";

}


// Home

function goHome() {

    window.location.href = "index.html";

}