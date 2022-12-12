class KeyEventHandler {
    constructor(player) {
        this.KeyStates = {};
        this.player = player;
    }

    attach() {
        window.addEventListener("keydown", this.onKeyEvent.bind(this));
        window.addEventListener("keyup", this.onKeyEvent.bind(this));
    }

    release() {
        window.removeEventListener("keydown", this.onKeyEvent.bind(this));
        window.removeEventListener("keyup", this.onKeyEvent.bind(this));
    }

    onKeyEvent(event) {
        if (event.type === "keydown") {
            if (this.isValidKey(event.key)) {
                this.KeyStates[event.key] = true;
            }
        }
        else if (event.type === "keyup") {
            if (this.isValidKey(event.key)) {
                this.KeyStates[event.key] = false;
            }
        }
        else {
            console.log("unknown event type", event);
        }
        this.player.setMovmentState(this.KeyStates);
    }

    isValidKey(key) {
        return ['w', 'a', 's', 'd'].includes(key);
    }
}

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.world = new World(ctx);
        this.player = new Player(ctx, this.world);
        this.keyHandler = undefined;
    }

    startGame() {
        this.isRunning = true;
        this.startTimestamp = undefined;
        this.lastTimestamp = undefined;
        this.objects = [];
        this.totalNumberObjects = 0;
        this.newObjectFrequency = 1 // 1 new obj per second
        this.kills = 0;
        
        this.ctx.canvas.height = this.world.height;
        this.ctx.canvas.width = this.world.width;
        
        this.keyHandler = new KeyEventHandler(this.player);
        this.keyHandler.attach();
        
        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    stopGame() {
        this.isRunning = false;
        this.ctx.canvas.height = 0;
        this.ctx.canvas.width = 0;

        alert('Game Over')
        this.keyHandler.release();
        window.cancelAnimationFrame(this.animationRequestId);

        console.log({
            duration: this.lastTimestamp - this.startTimestamp,
            kills: this.kills
        });
    }

    renderLoop(timestamp) {
        if (!this.lastTimestamp) {
            this.startTimestamp = timestamp;
            this.lastTimestamp = timestamp;
            this.gameLoop();
        }

        const elapsed = timestamp - this.lastTimestamp;
        if (elapsed >= 10) {
            this.gameLoop(timestamp);
            this.lastTimestamp = timestamp;

            if (this.isGameEnded()) {
                this.stopGame(timestamp);
                return;
            }
        }

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    gameLoop(timestamp) {
        // Move player
        this.player.move();
        // Move objects
        this.objects.forEach((obj, index) => {
            obj.move();
            if (obj.touch(this.player)) {
                this.objects.splice(index, 1);
                this.player.hit(obj);
            }
        });

        // Center canvas on player
        this.centerCanvasOnPlayer();

        // Draw map, player, objects
        this.world.draw();
        this.player.draw();
        this.objects.forEach(obj => obj.draw());
        this.drawTime();

        this.tryCreateNewObjects(timestamp);
    }

    tryCreateNewObjects(timestamp) {
        const totalElapsedSec = (timestamp - this.startTimestamp) / 1000;
        while (this.totalNumberObjects < totalElapsedSec) {
            this.objects.push(this.createNewObject());
            this.totalNumberObjects++;
        }
    }

    createNewObject() {
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.max(this.world.width, this.world.height);
        const x = Math.cos(theta) * r + this.player.center.x;
        const y = Math.sin(theta) * r + this.player.center.y;
        return new Triangle({ x, y }, this.player);
    }

    isGameEnded() {
        return this.kills === 10
            || this.player.isDead();
    }

    centerCanvasOnPlayer() {
        const translationVector = {
            x: this.world.center.x - this.player.center.x,
            y: this.world.center.y - this.player.center.y
        };

        this.player.center.x += translationVector.x;
        this.player.center.y += translationVector.y;

        this.objects.forEach(obj => {
            obj.center.x += translationVector.x;
            obj.center.y += translationVector.y;
        });
    }

    drawTime() {
        const elapsedMs = this.lastTimestamp - this.startTimestamp;
        const min = Math.floor(elapsedMs / 1000 / 60);
        const sec = Math.floor(elapsedMs / 1000 - min * 60);
        
        this.ctx.font = "24px serif";
        this.ctx.fillText(`${min < 10 ? "0" : ""}${min} : ${sec < 10 ? "0" : ""}${sec}`, 10, 60);
    }
}