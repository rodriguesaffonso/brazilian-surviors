import { Game } from "./game";

const ctx = document.querySelector("canvas").getContext("2d");

let game: Game;
function startGame() {
    game = new Game(ctx);
    game.startGame();
}

function stopGame() {
    if (game) {
        game.stopGame();
    }
}

function init() {
    document.getElementById("startGameButton").addEventListener("click", startGame);
    document.getElementById("stopGameButton").addEventListener("click", stopGame);
}

init();
