import { Camera, createCamera } from "./game-objects/camera";
import { createMagicPistol } from "./game-objects/magic-pistol";
import { createPlayer, Player } from "./game-objects/player";
import { createTriangle } from "./game-objects/triangle";
import { createWorld, World } from "./game-objects/world";
import { GameObject, Vector2D } from "./utils";
import { Events } from "./utils/observer";

import { menuPauseGame, menuStopGame } from ".";
import { CommandParms } from "./components";
import { TriggerReason, UpgradeManager } from "./components/upgrade-manager";

export class Game {
    public ctx: CanvasRenderingContext2D;

    public player: Player;
    public camera: Camera;
    public world: World;

    public upgradeManager: UpgradeManager;

    public running: boolean;
    public paused: boolean;

    public startTimestamp: number;
    public lastTimestamp: number;
    public intraElapsed: number;

    public objects: GameObject[] = [];
    public totalNumberObjects: number = 0;
    public newObjectFrequency: number = 1;
    public kills: number = 0;
    public gemsCollected: number = 0;
    public killsToEndGame: number;
    public gameObjects: GameObject[] = [];

    public animationRequestId: number;

    private visibilityEventListener: () => void;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.visibilityEventListener = () => {
            if (document.visibilityState === 'hidden') {
                menuPauseGame();
            }
        }
    }

    public startGame(): void {
        this.camera = createCamera();
        this.world = createWorld(this.ctx, this.camera);
        this.player = createPlayer(this.ctx, this.camera);

        const magicPistol = createMagicPistol(this);

        this.gameObjects.push(...[
            this.world,
            this.camera,
            this.player,
            magicPistol
        ]);

        this.upgradeManager = new UpgradeManager();

        this.running = true;
        this.paused = false;
        this.intraElapsed = 0;

        this.startTimestamp = undefined;
        this.lastTimestamp = undefined;
        this.objects = [];
        this.totalNumberObjects = 0;
        this.newObjectFrequency = 1;
        this.kills = 0;
        this.killsToEndGame = 100;
        this.gemsCollected = 0;

        this.ctx.canvas.height = this.camera.canvasHeight;
        this.ctx.canvas.width = this.camera.canvasWidth;

        this.lastTimestamp = Date.now();
        this.startTimestamp = this.lastTimestamp;
        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
        window.addEventListener('visibilitychange', this.visibilityEventListener);
    }

    public stopGame(): void {
        this.running = false;
        this.ctx.canvas.height = 0;
        this.ctx.canvas.width = 0;

        this.player.inputComponent.stop();
        window.cancelAnimationFrame(this.animationRequestId);
        window.removeEventListener('visibilitychange', this.visibilityEventListener);

        console.log({
            duration: this.lastTimestamp - this.startTimestamp,
            kills: this.kills,
            gems: this.gemsCollected
        });
    }

    public pauseGame(): void {
        const drawPauseIcon = () => {
            // Popup square
            const borderSize = 5;
            this.ctx.fillStyle = "rgba(50, 50, 50, 0.8)"; // gray half transparent
            this.ctx.fillRect(borderSize, borderSize, this.camera.canvasWidth - 2 * borderSize, this.camera.canvasHeight - 2 * borderSize);
            this.ctx.fill();

            // Pause icon
            const barSize = 10;
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(this.camera.canvasWidth / 2 - 7 - barSize, 50, 10, 70);
            this.ctx.fillRect(this.camera.canvasWidth / 2 + 7, 50, 10, 70);
            this.ctx.fill();
        }

        if (!this.paused) {
            this.paused = true;
            this.intraElapsed = Date.now() - this.lastTimestamp;
            drawPauseIcon();
            window.cancelAnimationFrame(this.animationRequestId);
        }
    }

    public resumeGame(): void {
        if (this.paused) {
            this.paused = false;
            this.lastTimestamp = Date.now() - this.intraElapsed;
            this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
        }
    }

    private renderLoop(): void {
        const currentTime = Date.now();
        const elapsed = this.getElapsedLoopTime(currentTime);

        if (elapsed >= 10) {
            this.gameLoop(currentTime);

            if (this.isGameEnded()) {
                menuStopGame();
                return;
            }

            this.lastTimestamp = currentTime;
            this.render();
        }

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    private gameLoop(timestamp: number): void {
        const updateParams: CommandParms = { elapsedMs: this.getElapsedLoopTime(timestamp), game: this };
        this.upgradeManager.update(TriggerReason.Time, updateParams);

        this.tryCreateNewEnemies(timestamp);

        this.gameObjects.forEach((obj) => obj.update(updateParams));
        this.gameObjects.sort((a, b) => a.kind - b.kind);

        this.clearDeadObjects();
    }

    private render(): void {
        this.ctx.fillStyle = "white";
        const drawTime = () => {
            const elapsedMs = this.lastTimestamp - this.startTimestamp;

            const min = Math.floor(elapsedMs / 1000 / 60);
            const sec = Math.floor(elapsedMs / 1000 - min * 60);

            this.ctx.font = "16px serif";
            this.ctx.fillText(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, this.camera.canvasWidth / 2 - 15, 20);
        }

        const drawKills = () => {
            this.ctx.font = "16px serif";
            this.ctx.fillText(`Kills: ${this.kills}`, 10, 20);
        }

        const drawGems = () => {
            this.ctx.font = "16px serif";
            this.ctx.fillText(`Gems: ${this.gemsCollected}`, 10, 40);
        }

        drawTime();
        drawKills();
        drawGems();
    }

    private tryCreateNewEnemies(timestamp: number): void {
        const totalElapsedSec = (timestamp - this.startTimestamp) / 1000;
        while (this.totalNumberObjects < totalElapsedSec) {
            const enemy = this.createNewEnemy();

            this.objects.push(enemy);
            this.totalNumberObjects++;

            this.world.addEnemy(enemy);
            this.gameObjects.push(enemy);
        }
    }

    private createNewEnemy(): GameObject {
        const { minP, maxP } = this.camera.getCanvasLimits();
        const A = minP
        const B = new Vector2D(maxP.x, minP.y);
        const C = maxP;
        const D = new Vector2D(minP.x, maxP.y);
        let pos: Vector2D;

        const side = Math.floor(Math.random() * 4);
        const p = Math.random();
        switch (side) {
            case 0:
                // Up
                pos = A.multiply(p).add(B.multiply(1 - p));
                break;
            case 1:
                // Right
                pos = B.multiply(p).add(C.multiply(1 - p));
                break;
            case 2:
                // Down
                pos = C.multiply(p).add(D.multiply(1 - p));
                break;
            case 3:
                // Left
                pos = D.multiply(p).add(A.multiply(1 - p));
                break;
        }

        console.log(minP, maxP);
        const obj = createTriangle(this, pos.add(this.player.getPosition()), this.ctx, this.upgradeManager);
        obj.on(Events.ObjectDead, () => {
            this.kills++;
            this.upgradeManager.update(TriggerReason.NumberOfKills, { game: this, elapsedMs: undefined });
        });
        return obj;
    }

    private isGameEnded(): boolean {
        return this.kills === this.killsToEndGame || this.player.combatComponent.dead;
    }

    private getElapsedLoopTime(currentTime: number): number {
        return currentTime - this.lastTimestamp;
    }

    public addToObjectsArray(obj: GameObject): void {
        this.gameObjects.push(obj);

        obj.on(Events.ItemCollected, () => {
            this.gemsCollected++;
        });
    }

    private clearDeadObjects(): void {
        this.gameObjects.forEach((obj, index) => {
            if (obj.combatComponent?.dead) {
                this.gameObjects.splice(index, 1);
            }
        })
    }
}
