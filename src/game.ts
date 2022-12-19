import { Camera } from "./game-objects/camera";
import { Gun, GunCombatComponent } from "./game-objects/gun";
import { Player, PlayerGraphicComponent, PlayerInputComponent, PlayerPhysicsComponent } from "./game-objects/player";
import { Triangle, TriangleCombatComponent, TriangleGraphicComponent, TrianglePhysicsComponent } from "./game-objects/triangle";
import { World, WorldGraphicComponent } from "./game-objects/world";
import { AbstractObject, Vector2D } from "./interfaces";

export class Game {
    public ctx: CanvasRenderingContext2D;

    public player: Player;
    public camera: Camera;
    public world: World;

    public isRunning: boolean = true;
    public startTimestamp: number;
    public lastTimestamp: number;
    public objects: AbstractObject[] = [];
    public totalNumberObjects: number = 0;
    public newObjectFrequency: number = 1;
    public kills: number = 0;
    public gameObjects: AbstractObject[] = [];

    public animationRequestId: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    public startGame(): void {
        this.camera = createCamera();
        this.world = createWorld(this.ctx, this.camera);
        this.player = createPlayer(this.ctx, this.camera);

        const playerGun = new Gun(this.ctx, this.camera.center, this.camera, this.world, 0, new GunCombatComponent({}));
        this.player.addWeapon(playerGun);

        this.gameObjects.push(...[
            this.world, 
            this.camera, 
            this.player,
            playerGun,
            ...playerGun.weapons
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

    private renderLoop(timestamp: number): void {
        const currentTime = Date.now();
        const elapsed = currentTime - this.lastTimestamp;
        
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
        this.tryCreateNewObjects(timestamp);

        this.gameObjects.forEach((obj, index) => {
            obj.update();

            if (obj != this.player && obj.dead) {
                this.gameObjects.splice(index, 1);
            }
        });
    }

    private render(): void {
        this.drawTime();
    }

    private tryCreateNewObjects(timestamp: number): void {
        const totalElapsedSec = (timestamp - this.startTimestamp) / 1000;
        while (this.totalNumberObjects < totalElapsedSec) {
            const enemy = this.createNewObject(timestamp);
            this.objects.push(enemy);
            this.totalNumberObjects++;
            
            this.world.addEnemy(enemy);
            this.gameObjects.push(enemy);
        }
    }

    private createNewObject(timestamp: number): AbstractObject {
        const theta = Math.random() * 2 * Math.PI;
        const r = Math.max(this.camera.canvasWidth, this.camera.canvasHeight) / 2;
        const x = Math.cos(theta) * r + this.player.center.x;
        const y = Math.sin(theta) * r + this.player.center.y;
        return new Triangle(this.ctx, new Vector2D(x, y), this.player, this.camera, timestamp, new TriangleGraphicComponent(this.ctx), new TrianglePhysicsComponent(), new TriangleCombatComponent(this.world)); // TODO: add components option in one object to constructor
    }

    private isGameEnded(): boolean {
        return this.kills === 10
            || !this.player.isAlive();
    }

    private drawTime(): void {
        const elapsedMs = this.lastTimestamp - this.startTimestamp;
        
        const min = Math.floor(elapsedMs / 1000 / 60);
        const sec = Math.floor(elapsedMs / 1000 - min * 60);

        this.ctx.font = "24px serif";
        this.ctx.fillText(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, 10, 60);
    }
}

function createCamera(): Camera {
    const physicsComponent = new PlayerPhysicsComponent();
    return new Camera(undefined, 0, new PlayerInputComponent(physicsComponent), physicsComponent)
}

function createPlayer(ctx: CanvasRenderingContext2D, camera: Camera): Player {
    const physicsComponent = new PlayerPhysicsComponent();
    return new Player(ctx, camera, 0, new PlayerInputComponent(physicsComponent), physicsComponent, new PlayerGraphicComponent(ctx));
}

function createWorld(ctx: CanvasRenderingContext2D, camera: Camera): World {
    return new World(ctx, camera, 0, new WorldGraphicComponent(ctx, camera));
}
