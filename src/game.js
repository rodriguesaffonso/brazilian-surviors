const ctx = document.querySelector("canvas").getContext("2d");

class Map {
    HEIGHT = 800;
    WIDTH = 800;
    BACKGROUND_COLOR = "#201A23";

    Center = {
        x: this.WIDTH / 2,
        y: this.HEIGHT / 2,
    };

    constructor(ctx) {
        this.ctx = ctx;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        this.ctx.fillStyle = this.BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    }
}

class Player {
    width = 10;
    height = 10;
    backgroundColor = "#8DAA9D";

    vx = 0;
    vy = 0;
    dv = 2;

    constructor(ctx, map) {
        this.ctx = ctx;
        this.map = map;
        this.x = map.Center.x;
        this.y = map.Center.y;
    }

    draw() {
        ctx.clearRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    setMovmentState(keyState) {
        this.vx = keyState["d"] ? this.dv : 0;
        this.vx += keyState["a"] ? -this.dv : 0;
        this.vy = keyState["s"] ? this.dv : 0;
        this.vy += keyState["w"] ? -this.dv : 0;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.map = new Map(ctx);
        this.player = new Player(ctx, this.map);
        
        this.lastTimestamp = undefined;
        this.animationRequestId = undefined;

        this.KeyStates = {};
    }

    startGame() {
        this.ctx.canvas.height = this.map.HEIGHT;
        this.ctx.canvas.width = this.map.WIDTH;

        window.addEventListener("keydown", this.onKeyEvent.bind(this));
        window.addEventListener("keyup", this.onKeyEvent.bind(this));
        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    stopGame() {
        window.removeEventListener("keydown", this.onKeyEvent.bind(this));
        window.removeEventListener("keyup", this.onKeyEvent.bind(this));
        window.cancelAnimationFrame(this.animationRequestId);
    }

    onKeyEvent(event) {    
        if (event.type === "keydown") {
            if (this.isValidaKey(event.key)) {
                this.KeyStates[event.key] = true;
            }
        }
        else if (event.type === "keyup") {
            if (this.isValidaKey(event.key)) {
                this.KeyStates[event.key] = false;
            }
        }
        else {
            console.log("unknown event type", event);
        }
        this.player.setMovmentState(this.KeyStates);
    }

    isValidaKey(key) {
        return ['w', 'a', 's', 'd'].includes(key);
    }

    renderLoop(timestamp) {
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            this.gameLoop();
        }

        const elapsed = timestamp - this.lastTimestamp;
        if (elapsed >= 10) {
            this.gameLoop();
            this.lastTimestamp = timestamp;
        }

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    gameLoop() {
        this.map.draw();
        this.player.move();
        this.player.draw();
    }
}

let game;
function startGame() {
    game = new Game(ctx);
    game.startGame();
}

function stopGame() {
    ctx.canvas.height = 0;
    ctx.canvas.width = 0;
    if (game) {
        game.stopGame();
    }
}