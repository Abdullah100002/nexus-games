```javascript
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const levels = {
        easy: { max: 10, attempts: 3, name: "سهل" },
        medium: { max: 50, attempts: 5, name: "متوسط" },
        hard: { max: 100, attempts: 7, name: "صعب" }
    };

    const playerForm = document.getElementById("playerForm");
    const playerNameInput = document.getElementById("playerName");
    const gamePanel = document.getElementById("gamePanel");
    const welcomeName = document.getElementById("welcomeName");
    const guessForm = document.getElementById("guessForm");
    const guessInput = document.getElementById("guess");
    const attemptsDisplay = document.getElementById("attempts");
    const currentLevelText = document.getElementById("currentLevelText");
    const message = document.getElementById("message");
    const levelButtons = document.querySelectorAll(".level");
    const restartButton = document.getElementById("restartBtn");
    const changeNameButton = document.getElementById("changeNameBtn");

    if (
        !playerForm ||
        !playerNameInput ||
        !gamePanel ||
        !welcomeName ||
        !guessForm ||
        !guessInput ||
        !attemptsDisplay ||
        !currentLevelText ||
        !message ||
        !restartButton ||
        !changeNameButton
    ) {
        console.error("تأكد من أن index.html يحتوي على عناصر اللعبة المطلوبة.");
        return;
    }

    let playerName = "";
    let currentLevel = "easy";
    let secretNumber = 0;
    let attemptsLeft = 0;
    let gameOver = true;

    function startGame(level) {
        currentLevel = levels[level] ? level : "easy";

        const settings = levels[currentLevel];

        secretNumber = Math.floor(Math.random() * settings.max) + 1;
        attemptsLeft = settings.attempts;
        gameOver = false;

        attemptsDisplay.textContent = attemptsLeft;
        currentLevelText.textContent = settings.name;

        guessInput.value = "";
        guessInput.min = "1";
        guessInput.max = String(settings.max);
        guessInput.placeholder = "من 1 إلى " + settings.max;
        guessInput.disabled = false;

        const guessButton = guessForm.querySelector('button[type="submit"]');

        if (guessButton) {
            guessButton.disabled = false;
        }

        restartButton.disabled = false;

        message.textContent =
            "بالتوفيق يا " + playerName + "! خمّن الرقم.";

        levelButtons.forEach(function (button) {
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

        const guessButton = guessForm.querySelector('button[type="submit"]');

        if (guessButton) {
            guessButton.disabled = true;
        }
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
            message.textContent =
                "أدخل عددًا صحيحًا من 1 إلى " + max + ".";
            return;
        }

        attemptsLeft--;
        attemptsDisplay.textContent = attemptsLeft;

        if (guess === secretNumber) {
            message.textContent =
                "أحسنت يا " + playerName +
                "! الرقم الصحيح هو " + secretNumber + ".";
            finishGame();
            return;
        }

        if (attemptsLeft === 0) {
            message.textContent =
                "انتهت المحاولات يا " + playerName +
                "! الرقم الصحيح هو " + secretNumber + ".";
            finishGame();
            return;
        }

        if (guess < secretNumber) {
            message.textContent =
                "رقمك أصغر من الرقم السري. جرّب رقمًا أكبر!";
        } else {
            message.textContent =
                "رقمك أكبر من الرقم السري. جرّب رقمًا أصغر!";
        }

        guessInput.value = "";
        guessInput.focus();
    }

    playerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = playerNameInput.value.trim();

        if (name === "") {
            message.textContent = "اكتب اسمك أولًا.";
            playerNameInput.focus();
            return;
        }

        playerName = name;
        welcomeName.textContent = playerName;

        playerForm.classList.add("hidden");
        gamePanel.classList.remove("hidden");

        startGame("easy");
    });

    guessForm.addEventListener("submit", function (event) {
        event.preventDefault();
        checkGuess();
    });

    levelButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (playerName !== "") {
                startGame(button.dataset.level);
            }
        });
    });

    restartButton.addEventListener("click", function () {
        startGame(currentLevel);
    });

    changeNameButton.addEventListener("click", function () {
        gameOver = true;
        playerName = "";

        playerForm.reset();
        guessForm.reset();

        guessInput.disabled = true;

        const guessButton = guessForm.querySelector('button[type="submit"]');

        if (guessButton) {
            guessButton.disabled = true;
        }

        restartButton.disabled = true;

        gamePanel.classList.add("hidden");
        playerForm.classList.remove("hidden");

        playerNameInput.focus();
    });

    guessInput.disabled = true;

    const initialGuessButton = guessForm.querySelector('button[type="submit"]');

    if (initialGuessButton) {
        initialGuessButton.disabled = true;
    }

    restartButton.disabled = true;
});
```
