const playerNameInput = document.querySelector("#playerName");
const startButton = document.querySelector("#startBtn");

let playerName = "";

const levels = {
    easy: { max: 10, attempts: 3 },
    medium: { max: 50, attempts: 5 },
    hard: { max: 100, attempts: 7 }
};

const levelButtons = document.querySelectorAll(".level");
const guessInput = document.querySelector("#guess");
const guessButton = document.querySelector("#guessBtn");
const restartButton = document.querySelector("#restartBtn");
const attemptsDisplay = document.querySelector("#attempts");
const message = document.querySelector("#message");

let currentLevel = "easy";
let secretNumber;
let attemptsLeft;
let gameOver = false;


function startGame(level = currentLevel) {
    currentLevel = level;

    const settings = levels[currentLevel];
    secretNumber = Math.floor(Math.random() * settings.max) + 1;
    attemptsLeft = settings.attempts;
    gameOver = false;

    attemptsDisplay.textContent = attemptsLeft;
    guessInput.value = "";
    guessInput.min = 1;
    guessInput.max = settings.max;
    guessInput.placeholder = `1 - ${settings.max}`;

    guessInput.disabled = false;
    guessButton.disabled = false;

    message.textContent = playerName
        ? `بالتوفيق يا ${playerName}! خمّن الرقم.`
        : "اختر رقمًا وابدأ التحدي!";

    levelButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.level === currentLevel
        );
    });

    guessInput.focus();
}

    currentLevel = level;

    const settings = levels[currentLevel];
    secretNumber = Math.floor(Math.random() * settings.max) + 1;
    attemptsLeft = settings.attempts;
    gameOver = false;

    attemptsDisplay.textContent = attemptsLeft;
    guessInput.value = "";
    guessInput.min = 1;
    guessInput.max = settings.max;
    guessInput.placeholder = `1 - ${settings.max}`;

    guessInput.disabled = false;
    guessButton.disabled = false;

    message.textContent = "اختر رقمًا وابدأ التحدي!";

    levelButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.level === currentLevel
        );
    });

    guessInput.focus();


function checkGuess() {
    if (gameOver) return;

    const guess = Number(guessInput.value);
    const max = levels[currentLevel].max;

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > max
    ) {
        message.textContent = `أدخل عددًا صحيحًا من 1 إلى ${max}.`;
        return;
    }

    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

    if (guess === secretNumber) {
        message.textContent = "🎉 ممتاز! خمنت الرقم الصحيح!";
        finishGame();
        return;
    }

    if (attemptsLeft === 0) {
        message.textContent = `انتهت المحاولات! الرقم كان ${secretNumber}.`;
        finishGame();
        return;
    }

    message.textContent = guess < secretNumber
        ? "⬆️ جرّب رقمًا أكبر!"
        : "⬇️ جرّب رقمًا أصغر!";

    guessInput.value = "";
    guessInput.focus();
}

function finishGame() {
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
}

levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        startGame(button.dataset.level);
    });
});

guessButton.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        checkGuess();
    }
});

restartButton.addEventListener("click", () => {
    startGame(currentLevel);
});

startGame();

startButton.addEventListener("click", () => {
    const name = playerNameInput.value.trim();

    if (!name) {
        message.textContent = "اكتب اسمك أولًا يا بطل!";
        playerNameInput.focus();
        return;
    }

    playerName = name;
    startGame(currentLevel);
});
