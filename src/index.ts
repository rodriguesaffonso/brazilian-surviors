import { Game } from "./game";

const ctx = document.querySelector("canvas").getContext("2d");

const startB = document.getElementById("startGameButton");
const stopB = document.getElementById("stopGameButton");
const pauseB = document.getElementById("pauseGameButton");
const resumeB = document.getElementById("resumeGameButton");

function hide(elements: HTMLElement[]) { elements.forEach(e => e.hidden = true); }
function show(elements: HTMLElement[]) { elements.forEach(e => e.hidden = false); }

let game: Game;
function startGame() {
    game = new Game(ctx);
    game.startGame();

    show([pauseB]);
    hide([stopB, startB, resumeB]);
}

function pauseGame() {
    if (game) {
        game.pauseGame();

        show([resumeB, stopB]);
        hide([pauseB, startB]);
    }
}

function resumeGame() {
    if (game) {
        game.resumeGame();

        show([pauseB]);
        hide([resumeB, stopB, startB]);
    }
}

function stopGame() {
    if (game) {
        game.stopGame();
        game = undefined;

        show([startB]);
        hide([stopB, pauseB, resumeB]);
    }
}

function init() {    
    show([startB]);
    hide([stopB, pauseB, resumeB]);
    
    startB.addEventListener("click", startGame);
    stopB.addEventListener("click", stopGame);
    pauseB.addEventListener("click", pauseGame);
    resumeB.addEventListener("click", resumeGame);
}

init();
