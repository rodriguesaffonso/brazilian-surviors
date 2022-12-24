import { Game } from "./game";

const ctx = document.querySelector("canvas").getContext("2d");

const startB = document.getElementById("startGameButton");
const stopB = document.getElementById("stopGameButton");
const pauseB = document.getElementById("pauseGameButton");
const resumeB = document.getElementById("resumeGameButton");

function hide(elements: HTMLElement[]) { elements.forEach(e => e.hidden = true); }
function show(elements: HTMLElement[]) { elements.forEach(e => e.hidden = false); }

let game: Game;
function menuStartGame() {
    game = new Game(ctx);
    game.startGame();

    show([pauseB]);
    hide([stopB, startB, resumeB]);
}

export function menuPauseGame() {
    if (game) {
        game.pauseGame();

        show([resumeB, stopB]);
        hide([pauseB, startB]);
    }
}

function menuResumeGame() {
    if (game) {
        game.resumeGame();

        show([pauseB]);
        hide([resumeB, stopB, startB]);
    }
}

export function menuStopGame() {
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
    
    startB.addEventListener("click", menuStartGame);
    stopB.addEventListener("click", menuStopGame);
    pauseB.addEventListener("click", menuPauseGame);
    resumeB.addEventListener("click", menuResumeGame);
}

init();
