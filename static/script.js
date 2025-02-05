let questions = [
    { step: "riddle1", text: "I’m from the land of backwaters, beaches, and spices. I am known for my beautiful landscapes and vibrant culture. Where am I?" },
    { step: "riddle2", text: "I am full of colors, and I create art that speaks to hearts. I capture beauty in every stroke. Who am I?" },
    { step: "riddle3", text: "I was born in the month when the air turns cooler, and the festivals are in full swing. When is my birthday?" },
    { step: "riddle4", text: "I can watch a movie for hours and lose myself in the story. My empathy makes me feel every moment deeply. What am I?" },
    { step: "riddle5", text: "I’m a woman who is always in charge, leading and inspiring. I take charge of my world. Who am I?" }
];

let currentQuestionIndex = 0;
let chatBox = document.getElementById("chat-box");

function addMessage(text, sender) {
    let message = document.createElement("p");
    message.classList.add(sender);
    message.innerHTML = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function askNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        addMessage(questions[currentQuestionIndex].text, "bot");
    } else if (currentQuestionIndex === questions.length) {
        addMessage("Let's see what you've got, shall we? 💖", "bot");
    }
}

function sendAnswer() {
    let userInput = document.getElementById("user-input");
    let answer = userInput.value.trim();

    if (answer === "") return;

    addMessage(answer, "user");
    userInput.value = "";

    fetch("/process", {
        method: "POST",
        body: JSON.stringify({ step: questions[currentQuestionIndex].step, answer: answer }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.response, "bot");
        currentQuestionIndex++;
        setTimeout(() => {
            if (currentQuestionIndex < questions.length) {
                askNextQuestion();
            } else {
                addMessage("Vava, I know we are taking it slow but I wanted you to know I am doing this corny thing just for you. I loved doing this hectic thing, fixing mistakes using GPT and trying to make something worthy of you... I failed badly but I am glad I made something for someone I love so dearly... I love you so much it burns my heart and my lazy ass made this", "bot");
            }
        }, 2000);
    });
}

function handleKeyPress(event) {
    if (event.key === "Enter") sendAnswer();
}

window.onload = () => {
    askNextQuestion();
};
