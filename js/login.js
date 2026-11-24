function startQuiz() {

    let username = document.getElementById("username").value;
    let subject = document.getElementById("subject").value;

    if (username === "") {
        alert("Please enter your name.");
        return;
    }

    if (subject === "") {
        alert("Please select a subject.");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("subject", subject);

    window.location.href = "quiz.html";
}