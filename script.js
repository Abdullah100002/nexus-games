
const levels = {
    easy: { max: 10, attempts: 3 },
    medium: { max: 50, attempts: 5 },
    hard: { max: 100, attempts: 7 }
};

const playerForm = document.querySelector("#playerForm");
const playerNameInput = document.querySelector("#playerName");
const gamePanel = document.querySelector("#gamePanel");
const welcomeName = document.querySelector("#welcomeName");

const levelButtons = document.querySelectorAll(".level");
const guessInput = document.querySelector("#guess");
const guessButton = document.querySelector("#guessBtn");
const restartButton = document.querySelector("#restartBtn");
const changeNameButton = document.querySelector("#changeNameBtn");

const attemptsDisplay = document.querySelector("#attempts");
const message = document.querySelector("#message");

let playerName = "";
let currentLevel = "easy";
let secretNumber = 0;
let attemptsLeft = 0;
let gameOver = true;

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
    guessInput.placeholder = `من 1 إلى ${settings.max}`;
    guessInput.disabled = false;

    guessButton.disabled = false;
    restartButton.disabled = false;

    message.textContent = `بالتوفيق يا ${playerName}! خمّن الرقم.`;

    levelButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.level === currentLevel
        );
    });

    guessInput.focus();
}

function finishGame() {
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
}

function checkGuess() {
    if (gameOver) {
        return;
    }

    const rawGuess = guessInput.value.trim();
    const guess = Number(rawGuess);
    const max = levels[currentLevel].max;

    if (
        rawGuess === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > max
    ) {
        message.textContent = `يا ${playerName}، أدخل عددًا صحيحًا من 1 إلى ${max}.`;
        return;
    }

    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

    if (guess === secretNumber) {
        message.textContent = `🎉 أحسنت يا ${playerName}! خمنت الرقم الصحيح ${secretNumber}.`;
        finishGame();
        return;
    }

    if (attemptsLeft === 0) {
        message.textContent = `انتهت المحاولات يا ${playerName}! الرقم الصحيح هو ${secretNumber}.`;
        finishGame();
        return;
    }

    if (guess < secretNumber) {
        message.textContent = `⬆️ رقمك أصغر من الرقم السري يا ${playerName}. جرّب أكبر!`;
    } else {
        message.textContent = `⬇️ رقمك أكبر من الرقم السري يا ${playerName}. جرّب أصغر!`;
    }

    guessInput.value = "";
    guessInput.focus();
}

playerForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = playerNameInput.value.trim();

    if (!name) {
        playerNameInput.setCustomValidity("اكتب اسمك أولًا.");
        playerNameInput.reportValidity();
        return;
    }

    playerNameInput.setCustomValidity("");

    playerName = name;

    welcomeName.textContent = playerName;
    playerForm.classList.add("hidden");
    gamePanel.classList.remove("hidden");

    startGame("easy");
});

playerNameInput.addEventListener("input", () => {
    playerNameInput.setCustomValidity("");
});

levelButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (playerName) {
            startGame(button.dataset.level);
        }
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

changeNameButton.addEventListener("click", () => {
    gameOver = true;

    playerName = "";
    playerNameInput.value = "";

    guessInput.value = "";
    guessInput.disabled = true;
    guessButton.disabled = true;
    restartButton.disabled = true;

    gamePanel.classList.add("hidden");
    playerForm.classList.remove("hidden");

    message.textContent = "اكتب اسمك واضغط ابدأ اللعب.";

    playerNameInput.focus();
});
