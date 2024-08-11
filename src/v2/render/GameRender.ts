import { Canvas } from "../canvas/Canvas";
import { ClockState } from "../clock/ClockState";
import { GameCanvas } from "../canvas/GameCanvas";
import { GameRenderParams } from "./GameRenderParams";
import { IClock } from "../clock/IClock";
import { IGameObjectList } from "../game-objects/IGameObjectList";
import { IGame } from "../game/IGame";

export class GameRender {
    private handle: number; // handle id referenced by current requestAninamtionFrame call
    private paused: boolean = false;
    private clock: IClock;
    private gameObjects: IGameObjectList;
    private gameCanvas: GameCanvas;
    private game: IGame;

    private constructor(params: GameRenderParams) {
        this.clock = params.clock;
        this.gameObjects = params.gameObjects;
        this.gameCanvas = params.gameCanvas;
    }
    public canvas(): Canvas {
        return this.gameCanvas;
    }

    public setGame(game: IGame): void { this.game =  game; }
    private render(timestamp: number) {
        if (!this.handle) {
            return;
        }
        if (!this.paused) {
            this.clock.tick(timestamp);
            this.gameObjects.update({ timestamp, game: this.game });
        }
        if (this.handle) {
            this.handle = window.requestAnimationFrame(this.render.bind(this));
        }
    }

    public start() {
        if (this.clock.state() !== ClockState.Idle) {
            throw Error('Clock should be on Idle state');
        }
        this.clock.start();
        // window.addEventListener("keydown", keyboardEventListener);
        this.handle = window.requestAnimationFrame(this.render.bind(this));
    }

    public stop() {
        window.cancelAnimationFrame(this.handle);
        this.handle = undefined;
    }

    public isPaused(): boolean { return this.paused; }
    public pause(): void {
        if (this.paused) {
            console.log('Render already paused');
            return;
        }
        console.log('pause');
        this.paused = true;
        this.clock.pause();
    }
    public resume(): void {
        if (!this.paused) {
            console.log('Render already resumed');
            return;
        }
        console.log('resume');
        this.clock.resume();
        this.paused = false;
    }

    public static create(params: GameRenderParams): GameRender {
        return new GameRender(params);
    }
}
