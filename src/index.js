const ctx = document.querySelector("canvas").getContext("2d");

let game;
function startGame() {
    game = new Game(ctx);
    game.startGame();
}

function stopGame() {
    if (game) {
        game.stopGame();
    }
}