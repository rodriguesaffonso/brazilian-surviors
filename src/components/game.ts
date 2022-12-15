import { AbstractObject, Vector2D } from "./interfaces";
import { Player } from "./actors/player";
import { Triangle } from "./actors/triangle";
import { Gun } from "./weapons/gun";
import { World } from "./world";
import { InputHandler } from "./input-handler";

export class Game {
    public ctx: any;
    public inputHandler: InputHandler;

    public world: World;
    public player: Player;

    public isRunning: boolean = true;
    public startTimestamp: number;
    public lastTimestamp: number;
    public objects: AbstractObject[] = [];
    public totalNumberObjects: number = 0;
    public newObjectFrequency: number = 1;
    public kills: number = 0;

    public animationRequestId: number;

    constructor(ctx: any) {
        this.ctx = ctx;
    }

    public startGame(): void {
        this.world = new World(this.ctx, 0);
        this.player = new Player(this.ctx, this.world, 0);
        this.player.addWeapon(new Gun(this.ctx, this.player.center, 0));

        this.isRunning = true;
        this.startTimestamp = undefined;
        this.lastTimestamp = undefined;
        this.objects = [];
        this.totalNumberObjects = 0;
        this.newObjectFrequency = 1 // 1 new obj per second
        this.kills = 0;

        this.ctx.canvas.height = this.world.height;
        this.ctx.canvas.width = this.world.width;

        this.inputHandler = new InputHandler(this.player);
        this.inputHandler.attach();

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    public stopGame(): void {
        this.isRunning = false;
        this.ctx.canvas.height = 0;
        this.ctx.canvas.width = 0;

        // alert('Game Over');
        this.inputHandler.release();
        window.cancelAnimationFrame(this.animationRequestId);

        console.log({
            duration: this.lastTimestamp - this.startTimestamp,
            kills: this.kills
        });
    }

    private renderLoop(timestamp: number): void {
        if (!this.lastTimestamp) {
            this.startTimestamp = timestamp;
            this.lastTimestamp = timestamp;
            this.gameLoop(timestamp);
        }

        const elapsed = timestamp - this.lastTimestamp;
        if (elapsed >= 10) {
            this.gameLoop(timestamp);
            this.lastTimestamp = timestamp;

            if (this.isGameEnded()) {
                this.stopGame();
                return;
            }
        }

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    private gameLoop(timestamp: number): void {
        // Move player
        this.player.move();

        // Center canvas on player
        this.centerCanvasOnPlayer();

        // Player attacks, Enemy attacks, enemy move
        this.objects.forEach((enemy, index) => {
            if (!this.player.isAlive()) {
                return;
            }

            // Player attacks
            if (this.player.attack(enemy)) {
                if (!enemy.isAlive()) {
                    this.kills++;
                    this.objects.splice(index, 1);
                    return;
                }
            }

            // Enemy attacks
            if (enemy.attack(this.player)) {
                if (!this.player.isAlive()) {
                    return;
                }
                return;
            }

            // Enemy move
            enemy.move();
        });

        // Draw map, player, objects
        this.world.draw();
        this.objects.forEach(enemy => enemy.draw());
        this.player.draw();
        this.drawTime();

        this.tryCreateNewObjects(timestamp);
    }

    private tryCreateNewObjects(timestamp: number): void {
        const totalElapsedSec = (timestamp - this.startTimestamp) / 1000;
        while (this.totalNumberObjects < totalElapsedSec) {
            this.objects.push(this.createNewObject(timestamp));
            this.totalNumberObjects++;
        }
    }

    private createNewObject(timestamp: number): AbstractObject {
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.max(this.world.width, this.world.height) / 2;
        const x = Math.cos(theta) * r + this.player.center.x;
        const y = Math.sin(theta) * r + this.player.center.y;
        return new Triangle(this.ctx, new Vector2D(x, y), this.player, timestamp);
    }

    private isGameEnded(): boolean {
        return this.kills === 10
            || !this.player.isAlive();
    }

    private centerCanvasOnPlayer(): void {
        const translationVector = this.world.center.sub(this.player.center);

        this.player.translate(translationVector);
        this.objects.forEach(obj => obj.translate(translationVector));
    }

    private drawTime(): void {
        const elapsedMs = this.lastTimestamp - this.startTimestamp;
        const min = Math.floor(elapsedMs / 1000 / 60);
        const sec = Math.floor(elapsedMs / 1000 - min * 60);

        this.ctx.font = "24px serif";
        this.ctx.fillText(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, 10, 60);
    }
}