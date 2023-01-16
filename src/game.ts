import { Camera, createCamera } from "./game-objects/camera";
import { createMagicPistol } from "./game-objects/magic-pistol";
import { createPlayer, Player } from "./game-objects/player";
import { createTriangle } from "./game-objects/triangle";
import { createWorld, World } from "./game-objects/world";
import { GameObject, GameObjectKind, Vector2D } from "./utils";
import { Events, Observer } from "./utils/observer";

import { menuPauseGame, menuResumeGame, menuStopGame } from ".";
import { CommandParms } from "./components";
import { UpgradeManager } from "./components/upgrade-manager/upgrade-manager";
import { Timer } from "./utils/timer";
import { createSkillTree, SkillTree } from "./game-objects/skill-tree/skill-tree";
import { SkillNode, SkillPath } from "./game-objects/skill-tree/interfaces";
import { SkillTreeGraphicComponent } from "./game-objects/skill-tree/skill-tree-graphic-component";
import { HudCanvas } from "./canvas/hud";
import { GameCanvas } from "./canvas/game";
import { Canvas } from "./canvas/canvas";

interface SkillNotification {
    path: SkillPath,
    node: SkillNode
}

export class Game extends Observer {
    public player: Player;
    public camera: Camera;
    public world: World;

    public upgradeManager: UpgradeManager;
    public skillTree: SkillTree;
    public skillNotificationManager: SkillNotificationManager;

    public running: boolean;
    public paused: boolean;

    public lastObjectAtTime: number;

    public objects: GameObject[] = [];
    public totalNumberObjects: number = 0;
    public newObjectFrequency: number = 1;
    public kills: number = 0;
    public gemsCollected: number = 0;
    public killsToEndGame: number;
    public gameObjects: GameObject[] = [];

    public animationRequestId: number;
    public clock: Timer;
    public gameOverAfterMs: number;

    private visibilityEventListener: () => void;
    private keyEventListener: (e: KeyboardEvent) => void;

    private hudCanvas: HudCanvas;
    private gameCanvas: GameCanvas;

    constructor() {
        super();
        this.clock = new Timer();

        this.visibilityEventListener = () => {
            if (document.visibilityState === 'hidden') {
                menuPauseGame();
            }
        }

        this.keyEventListener = (e) => {
            if (e.key === 'p') {
                if (this.paused) {
                    menuResumeGame();
                } else {
                    menuPauseGame();
                }
            }
        }
    }

    public startGame(): void {
        this.gameCanvas = GameCanvas.getCanvas();
        this.hudCanvas = HudCanvas.getCanvas();

        this.skillTree = createSkillTree(this);
        this.upgradeManager = new UpgradeManager(this);
        this.clock.start();

        this.camera = createCamera();
        this.world = createWorld(this.gameCanvas.ctx, this.camera);
        this.player = createPlayer(this.gameCanvas.ctx, this.camera, this.upgradeManager);

        this.gameObjects.push(...[
            this.world,
            this.camera,
            this.skillTree,
            this.player,
            createMagicPistol(this)
        ]);

        this.running = true;
        this.paused = false;

        this.lastObjectAtTime = 0;
        this.objects = [];
        this.totalNumberObjects = 0;
        this.newObjectFrequency = 1;
        this.kills = 0;
        this.killsToEndGame = 100;
        this.gemsCollected = 0;
        this.gameOverAfterMs = 6 * 60 * 1000; // Game last 6s and time upgrades happens every 1min for 5min

        this.skillNotificationManager = new SkillNotificationManager(this.hudCanvas);

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
        window.addEventListener('visibilitychange', this.visibilityEventListener);
        window.addEventListener("keydown", this.keyEventListener);

        this
            .on(Events.NextTimestamp, () => {
                this.upgradeManager.tryTriggerNextUpgrage(Events.NextTimestamp);
            })
            .on(Events.ItemCollected, () => {
                this.upgradeManager.tryTriggerNextUpgrage(Events.ItemCollected);
            });
    }

    public stopGame(): void {
        this.running = false;
        this.closeCanvas();

        this.player.inputComponent.stop();
        window.cancelAnimationFrame(this.animationRequestId);
        window.removeEventListener('visibilitychange', this.visibilityEventListener);
        window.removeEventListener('keydown', this.keyEventListener);
        this.clear();

        console.log({
            duration: this.clock.getTotalElapsedTime(),
            kills: this.kills,
            gems: this.gemsCollected
        });
    }

    private closeCanvas(): void {
        GameCanvas.remove();
        this.gameCanvas = undefined;

        HudCanvas.remove();
        this.hudCanvas = undefined;
    }

    public pauseGame(): void {
        const drawPopupSquare = () => {
            const borderSize = 5;
            this.gameCanvas.ctx.save();
            this.gameCanvas.ctx.fillStyle = "rgba(50, 50, 50, 0.8)"; // gray half transparent
            this.gameCanvas.ctx.fillRect(borderSize, borderSize, this.camera.canvasWidth - 2 * borderSize, this.camera.canvasHeight - 2 * borderSize);
            this.gameCanvas.ctx.fill();
            this.gameCanvas.ctx.restore();
        }

        const drawPauseIcon = () => {
            const barSize = 10;
            this.gameCanvas.ctx.save();
            this.gameCanvas.ctx.fillStyle = "white";
            this.gameCanvas.ctx.fillRect(this.camera.canvasWidth / 2 - 7 - barSize, 50, 10, 70);
            this.gameCanvas.ctx.fillRect(this.camera.canvasWidth / 2 + 7, 50, 10, 70);
            this.gameCanvas.ctx.fill();
            this.gameCanvas.ctx.restore();
        }

        if (!this.paused) {
            drawPopupSquare();
            drawPauseIcon();
            this.paused = true;
            this.clock.pause();
            window.cancelAnimationFrame(this.animationRequestId);
            this.skillTree.drawOnPause(this);
        }
    }

    public resumeGame(): void {
        if (this.paused) {
            this.paused = false;
            this.clock.resume();
            this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
        }
    }

    private renderLoop(): void {
        const now = this.clock.beforeLoop();
        if (now) {
            this.emit(Events.NextTimestamp, this.clock.getElapsedLoopTime(now));
            this.gameLoop(now);

            if (this.isGameEnded()) {
                menuStopGame();
                return;
            }

            this.clock.afterLoop(now);
            this.renderHUD({ elapsedMs: this.clock.getElapsedLoopTime(now), game: this });
        }

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    private gameLoop(timestamp: number): void {
        const updateParams: CommandParms = { elapsedMs: this.clock.getElapsedLoopTime(timestamp), game: this };

        this.tryCreateNewEnemies(timestamp);

        this.gameObjects.forEach((obj) => obj.update(updateParams));
        this.gameObjects.sort((a, b) => a.kind - b.kind);

        this.skillNotificationManager.update(updateParams);
        this.clearDeadObjects();
        this.removeFarObjects();
    }

    private renderHUD(command: CommandParms): void {
        this.hudCanvas.update(command);
    }

    private tryCreateNewEnemies(timestamp: number): void {
        const elapsedFromLastObject = this.clock.getTotalElapsedTime() - this.lastObjectAtTime;
        let numberOfNewObjects = Math.floor(elapsedFromLastObject / 1000 * this.newObjectFrequency);
        while (numberOfNewObjects--) {
            const enemy = this.createNewEnemy();

            this.objects.push(enemy);
            this.totalNumberObjects++;

            this.gameObjects.push(enemy);

            this.lastObjectAtTime = this.clock.getTotalElapsedTime();
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

        const obj = createTriangle(this, pos, this.gameCanvas.ctx, this.upgradeManager);
        obj.on(Events.ObjectDead, () => {
            this.kills++;
            this.emit(Events.ObjectDead);
        });
        return obj;
    }

    private isGameEnded(): boolean {
        return this.player.combatComponent.dead || this.clock.getTotalElapsedTime() > this.gameOverAfterMs;
    }

    public addToObjectsArray(obj: GameObject): void {
        this.gameObjects.push(obj);

        if (obj.kind === GameObjectKind.Gem) {
            obj.on(Events.ItemCollected, () => {
                this.gemsCollected++;
                this.emit(Events.ItemCollected);
            });
        }
    }

    private clearDeadObjects(): void {
        this.gameObjects.forEach((obj, index) => {
            if (obj.combatComponent?.dead) {
                this.gameObjects.splice(index, 1);
            }
        })
    }

    private removeFarObjects(): void {
        const { farMaxP, farMinP } = this.camera.getCanvasLimits();

        const insideFarCanvas = (p: Vector2D): boolean => {
            return p.x >= farMinP.x && p.x <= farMaxP.x && p.y >= farMinP.y && p.y <= farMaxP.y;
        }
        this.gameObjects.forEach((obj, index) => {
            if (obj.kind === GameObjectKind.Triangle) {
                if (!insideFarCanvas(obj.getPosition())) {
                    this.gameObjects.splice(index, 1);
                }
            }
        })
    }
}


class SkillNotificationManager {
    private skillNotifications: SkillNotification[];
    private currentNotification: SkillNotification;
    private timeout: number;
    private timeoutDefault: number;
    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.skillNotifications = [];
        this.currentNotification = undefined;
        this.timeoutDefault = 5000;
        this.timeout = this.timeoutDefault;
    }

    public add(notification: SkillNotification): void {
        if (!this.currentNotification) {
            this.currentNotification = notification;
        } else {
            this.skillNotifications.push(notification);
        }
    }

    public update(params: CommandParms): void {
        if (!this.currentNotification) return;

        const { elapsedMs, game } = params;
        this.timeout -= elapsedMs;

        if (this.timeout > 0) {
            this.drawCurrentNotification(game);
        } else {
            this.timeout = this.timeoutDefault;
            this.currentNotification = undefined;

            if (this.skillNotifications.length > 0) {
                this.currentNotification = this.skillNotifications.splice(0, 1)[0];
            }
        }
    }

    private drawCurrentNotification(g: Game): void {
        if (this.currentNotification) {
            const posY = g.camera.canvasHeight - 10;
            const component = (g.skillTree.graphicComponent as SkillTreeGraphicComponent);

            this.canvas.ctx.save();
            this.canvas.ctx.fillStyle = "rgba(50, 50, 50, 0.8)"; // gray half transparent
            this.canvas.ctx.fillRect(0, posY, g.camera.canvasWidth, g.camera.canvasHeight - posY - 27);
            this.canvas.ctx.fill();

            this.canvas.ctx.fillStyle = 'white';
            this.canvas.ctx.font = "italic 14px serif";
            this.canvas.ctx.fillText(this.currentNotification.node.description(), 30, posY);
            this.canvas.ctx.restore();

            component.drawPathIcon(this.currentNotification.path, new Vector2D(15, posY - component.radius), this.canvas.ctx);

            this.canvas.ctx.strokeStyle = 'white';
            this.canvas.ctx.beginPath();
            this.canvas.ctx.arc(g.camera.canvasWidth - 15, posY - component.radius, component.radius, - Math.PI / 2, 3 / 2 * Math.PI * (this.timeout / this.timeoutDefault));
            this.canvas.ctx.stroke();
        }
    }
}