import { Game } from "./game";

let game: Game;

export function menuPauseGame() {
    if (game) {
        game.pauseGame();
    }
}

export function menuResumeGame() {
    if (game) {
        game.resumeGame();
    }
}

export function menuStopGame() {
    if (game) {
        game.stopGame();
        game = undefined;
    }
}

export function menuLoadMainMenu() {
    game = new Game();
    game.loadMainMenuScreen();
}

export function menuStartNewGame() {
    game = new Game();
    game.startGame();
}

function init() {    
    menuLoadMainMenu();
}

init();
