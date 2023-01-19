import { Camera, createCamera } from "./game-objects/camera";
import { createMagicPistol } from "./game-objects/magic-pistol";
import { createPlayer, Player } from "./game-objects/player";
import { createTriangle } from "./game-objects/triangle";
import { createWorld, World } from "./game-objects/world";
import { GameObject, GameObjectKind, getCanvasSize, Vector2D } from "./utils";
import { Events, Observer } from "./utils/observer";

import { menuLoadMainMenu, menuPauseGame, menuResumeGame, menuStartNewGame, menuStopGame } from ".";
import { CommandParms } from "./components";
import { UpgradeManager } from "./components/upgrade-manager/upgrade-manager";
import { Timer } from "./utils/timer";
import { createSkillTree, SkillTree } from "./game-objects/skill-tree/skill-tree";
import { HudCanvas } from "./canvas/hud";
import { GameCanvas } from "./canvas/game";
import { SkillNotificationManager } from "./canvas/elements/skill-notification";

interface DamageLabel {
    damage: number,
    position: Vector2D,
    time: number;
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

    public damageDoneLabels: DamageLabel[];
    public damageLabelTimeout: number;

    public animationRequestId: number;
    public clock: Timer;
    public gameOverAfterMs: number;

    private visibilityEventListener: () => void;
    private keyEventListener: (e: KeyboardEvent) => void;

    public hudCanvas: HudCanvas;
    public gameCanvas: GameCanvas;

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

    private loadCanvas(): void {
        this.gameCanvas = GameCanvas.getCanvas();
        this.hudCanvas = HudCanvas.getCanvas();
    }

    public startGame(): void {
        this.loadCanvas();

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

        this.damageDoneLabels = [];
        this.damageLabelTimeout = 300;

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
        this.player.inputComponent.stop();

        let opac: number = 0;
        let start: number;
        const frames = 50;
        const frameSize = 1000 / frames;
        let opacStep: number = 1 / frames;
        const fadeOutCanvas = (t: number) => {
            if (!start) start = t;
            const elapsed = t - start;
            if (elapsed >= frameSize) {
                start = t;
                if (opac > 1) {
                    window.removeEventListener('visibilitychange', this.visibilityEventListener);
                    window.removeEventListener('keydown', this.keyEventListener);
                    window.cancelAnimationFrame(this.animationRequestId);

                    this.drawGameOverScreen();
                    return;
                }

                const color = `rgba(32, 26, 35, ${opac})`
                this.gameCanvas.ctx.fillStyle = color;
                this.gameCanvas.ctx.fillRect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
                this.gameCanvas.ctx.fill();
                this.hudCanvas.ctx.fillStyle = color;
                this.hudCanvas.ctx.fillRect(0, 0, this.camera.canvasWidth, this.camera.canvasHeight);
                this.hudCanvas.ctx.fill();
                opac += opacStep;
            }
            this.animationRequestId = window.requestAnimationFrame(fadeOutCanvas.bind(this));
        }

        this.animationRequestId = window.requestAnimationFrame(fadeOutCanvas.bind(this));
    }

    public loadMainMenuScreen(): void {
        this.loadCanvas();

        const bckgColor = `rgba(32, 26, 35)`;
        const { ctx } = this.gameCanvas;

        ctx.fillStyle = bckgColor;
        ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
        ctx.fill();

        this.animationRequestId = window.requestAnimationFrame(() => {});

        const stack = document.getElementById("stack");

        const elements: HTMLElement[] = [];
        const removeElements = () => elements.forEach(el => stack.removeChild(el));

        const fs1 = 24;
        const label = document.createElement('div');
        label.classList.add("pause-menu-option-button");
        label.innerHTML = "Brazilian Survivors";
        label.style.fontSize = `${fs1}px`;
        label.style.top = `${(this.gameCanvas.height - fs1) / 2}px`;
        stack.appendChild(label);
        elements.push(label);

        const fs2 = 14;
        const play = document.createElement("button");
        play.classList.add("pause-menu-option-button");
        play.classList.add("pause-menu-button-with-radius");
        play.innerHTML = "Play";
        play.style.fontSize = `${fs2}px`;
        play.style.top = `${(this.gameCanvas.height - fs2 + 120) / 2}px`;
        play.addEventListener('click', (e) => {
            console.log(e);
            removeElements();

            this.closeCanvas();
            this.clear();

            // Restart game
            this.startGame();
        });
        stack.appendChild(play);
        elements.push(play);
    }

    private drawGameOverScreen(): void {
        const stack = document.getElementById("stack");

        const elements: HTMLElement[] = [];
        const removeElements = () => elements.forEach(el => stack.removeChild(el));

        const fs1 = 24;
        const label = document.createElement('div');
        label.classList.add("pause-menu-option-button");
        label.innerHTML = "Game Over";
        label.style.fontSize = `${fs1}px`;
        label.style.top = `${(this.camera.canvasHeight - fs1) / 2}px`;
        stack.appendChild(label);
        elements.push(label);

        const fs2 = 14;
        const tryAgain = document.createElement("button");
        tryAgain.classList.add("pause-menu-option-button");
        tryAgain.classList.add("pause-menu-button-with-radius");
        tryAgain.innerHTML = "Try Again";
        tryAgain.style.fontSize = `${fs2}px`;
        tryAgain.style.top = `${(this.camera.canvasHeight - fs2 + 120) / 2}px`;
        tryAgain.addEventListener('click', (e) => {
            removeElements();

            this.closeCanvas();
            this.clear();

            // Restart game
            menuStartNewGame();
        });
        stack.appendChild(tryAgain);
        elements.push(tryAgain);

        const fs3 = 14;
        const quit = document.createElement("button");
        quit.classList.add("pause-menu-option-button");
        quit.classList.add("pause-menu-button-with-radius");
        quit.innerHTML = "Quit";
        quit.style.fontSize = `${fs3}px`;
        quit.style.top = `${(this.camera.canvasHeight - fs3 + 200) / 2}px`;
        quit.addEventListener('click', (e) => {
            removeElements();

            this.closeCanvas();
            this.clear();

            menuLoadMainMenu();
        });
        stack.appendChild(quit);
        elements.push(quit);
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
        this.damageDoneLabels.forEach((damageLabel, index) => this.drawDamage(damageLabel, index));

        this.skillNotificationManager.update(updateParams);
        this.clearDeadObjects();
        this.removeFarObjects();
    }

    private drawDamage(params: DamageLabel, index: number): void {
        const { time, damage, position } = params;
        if (time + this.damageLabelTimeout < this.clock.now()) {
            this.damageDoneLabels.splice(index, 1);
            return;
        }

        const p = position.sub(this.camera.getCanvasLimits().minP);
        const { ctx } = this.gameCanvas;
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '12px serif';
        ctx.fillText(Math.floor(damage).toString(), p.x, p.y);
        ctx.restore();
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
        })
            .on(Events.DamageDone, (params) => {
                this.damageDoneLabels.push({ ...params, time: this.clock.now() });
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