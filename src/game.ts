import { Camera } from "./game-objects/camera";
import { Gun, GunCombatComponent } from "./game-objects/gun";
import { Player, PlayerGraphicComponent, PlayerInputComponent, PlayerPhysicsComponent } from "./game-objects/player";
import { Triangle, TriangleCombatComponent, TriangleGraphicComponent, TrianglePhysicsComponent } from "./game-objects/triangle";
import { World, WorldGraphicComponent } from "./game-objects/world";
import { GameObject, GameObjectKind, Vector2D } from "./interfaces";

export class Game {
    public ctx: CanvasRenderingContext2D;

    public player: Player;
    public camera: Camera;
    public world: World;

    public isRunning: boolean = true;
    public startTimestamp: number;
    public lastTimestamp: number;
    public objects: GameObject[] = [];
    public totalNumberObjects: number = 0;
    public newObjectFrequency: number = 1;
    public kills: number = 0;
    public gameObjects: GameObject[] = [];

    public animationRequestId: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public startGame(): void {
        this.camera = createCamera();
        this.world = createWorld(this.ctx, this.camera);
        this.player = createPlayer(this.ctx, this.camera);

        const playerGun = createGun(this.ctx, this.camera, this.world, this.player, this.addToGameObjectsArray.bind(this));

        this.gameObjects.push(...[
            this.world,
            this.camera,
            this.player,
            playerGun,
        ]);

        this.isRunning = true;
        this.startTimestamp = undefined;
        this.lastTimestamp = undefined;
        this.objects = [];
        this.totalNumberObjects = 0;
        this.newObjectFrequency = 1;
        this.kills = 0;

        this.ctx.canvas.height = this.camera.canvasHeight;
        this.ctx.canvas.width = this.camera.canvasWidth;

        this.lastTimestamp = Date.now();
        this.startTimestamp = this.lastTimestamp;
        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    public stopGame(): void {
        this.isRunning = false;
        this.ctx.canvas.height = 0;
        this.ctx.canvas.width = 0;

        this.player.inputComponent.stop();
        this.camera.inputComponent.stop();
        window.cancelAnimationFrame(this.animationRequestId);

        console.log({
            duration: this.lastTimestamp - this.startTimestamp,
            kills: this.kills
        });
    }

    private renderLoop(): void {
        const currentTime = Date.now();
        const elapsed = this.getElapsedLoopTime(currentTime);

        if (elapsed >= 10) {
            this.gameLoop(currentTime);

            if (this.isGameEnded()) {
                this.stopGame();
                return;
            }

            this.lastTimestamp = currentTime;
            this.render();
        }

        this.animationRequestId = window.requestAnimationFrame(this.renderLoop.bind(this));
    }

    private gameLoop(timestamp: number): void {
        const elapsedMs = this.getElapsedLoopTime(timestamp);
        this.tryCreateNewObjects(timestamp);

        this.gameObjects.forEach((obj, index) => {
            obj.update({ elapsedMs, world: this.world });

            // Remove dead enemies from the game
            if (obj.combatComponent?.dead) {
                this.gameObjects.splice(index, 1);

                if (obj.kind === GameObjectKind.Triangle) {
                    this.kills++;
                }
            }
        });

        this.gameObjects.sort((a, b) => a.kind - b.kind);
    }

    private render(): void {
        this.drawTime();
    }

    private tryCreateNewObjects(timestamp: number): void {
        const totalElapsedSec = (timestamp - this.startTimestamp) / 1000;
        while (this.totalNumberObjects < totalElapsedSec) {
            const enemy = this.createNewObject();
            this.objects.push(enemy);
            this.totalNumberObjects++;

            this.world.addEnemy(enemy);
            this.gameObjects.push(enemy);
        }
    }

    private createNewObject(): GameObject {
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.max(this.camera.canvasWidth, this.camera.canvasHeight) / 2;
        const x = Math.cos(theta) * r + this.player.getPosition().x;
        const y = Math.sin(theta) * r + this.player.getPosition().y;
        return new Triangle(this.player, this.camera, {
            graphic: new TriangleGraphicComponent(this.ctx),
            physics: new TrianglePhysicsComponent(new Vector2D(x, y)),
            combat: new TriangleCombatComponent(this.world),
        });
    }

    private isGameEnded(): boolean {
        return this.kills === 10 || this.player.combatComponent.dead;
    }

    private drawTime(): void {
        const elapsedMs = this.lastTimestamp - this.startTimestamp;

        const min = Math.floor(elapsedMs / 1000 / 60);
        const sec = Math.floor(elapsedMs / 1000 - min * 60);

        this.ctx.font = "24px serif";
        this.ctx.fillText(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, 10, 60);
    }

    private getElapsedLoopTime(currentTime: number): number {
        return currentTime - this.lastTimestamp;
    }

    private addToGameObjectsArray(obj: GameObject): void {
        this.gameObjects.push(obj);
    }
}

function createCamera(): Camera {
    const physicsComponent = new PlayerPhysicsComponent();
    return new Camera({
        input: new PlayerInputComponent(physicsComponent),
        physics: physicsComponent
    });
}

function createPlayer(ctx: CanvasRenderingContext2D, camera: Camera): Player {
    const physicsComponent = new PlayerPhysicsComponent();
    return new Player(camera, {
        input: new PlayerInputComponent(physicsComponent),
        physics: physicsComponent,
        graphic: new PlayerGraphicComponent(ctx)
    });
}

function createWorld(ctx: CanvasRenderingContext2D, camera: Camera): World {
    return new World({
        graphic: new WorldGraphicComponent(ctx, camera)
    });
}

function createGun(ctx: CanvasRenderingContext2D, camera: Camera, world: World, player: Player, cb: (obj: GameObject) => void): Gun {
    const gun = new Gun(ctx, camera, world, { combat: new GunCombatComponent(ctx, camera, {}) });
    gun.setAddBulletToGameObjectArray(cb);

    player.addWeapon(gun);
    return gun;
}
