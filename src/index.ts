import { Game } from "./game";
import { getCanvasSize } from "./utils";

const canvasEl = document.querySelector("canvas"); 
const ctx = canvasEl.getContext("2d");

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

    show([pauseB, canvasEl]);
    hide([stopB, startB, resumeB]);
}

export function menuPauseGame() {
    if (game) {
        game.pauseGame();

        show([resumeB, stopB, canvasEl]);
        hide([pauseB, startB]);
    }
}

export function menuResumeGame() {
    if (game) {
        game.resumeGame();

        show([pauseB, canvasEl]);
        hide([resumeB, stopB, startB]);
    }
}

export function menuStopGame() {
    if (game) {
        game.stopGame();
        game = undefined;

        show([startB]);
        hide([stopB, pauseB, resumeB, canvasEl]);
    }
}

function init() {    
    show([startB]);
    hide([stopB, pauseB, resumeB, canvasEl]);
    
    startB.addEventListener("click", menuStartGame);
    stopB.addEventListener("click", menuStopGame);
    pauseB.addEventListener("click", menuPauseGame);
    resumeB.addEventListener("click", menuResumeGame);

    console.log(getCanvasSize());
}

init();
