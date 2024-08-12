import { Events } from "../../utils";
import { GameCanvas } from "../canvas/GameCanvas";
import { IClock } from "../clock/IClock";
import { GameObject } from "../game-objects/GameObject";
import { IGameObjectList } from "../game-objects/IGameObjectList";
import { GameRender } from "../render/GameRender";
import { Timer } from "../timer/Timer";
import { IGame } from "./IGame";
import { IGameParams } from "./IGameParams";

export class Game implements IGame {
    private _clock: IClock;
    private _objects: IGameObjectList;
    private _canvas: GameCanvas;
    private _render: GameRender;

    private constructor(params: IGameParams) {
        this._clock = params.clock;
        this._objects = params.objects;
        this._canvas = params.canvas;
        this._render = params.render;
    }
    addGameObject(obj: GameObject): void {
        this._objects.add(obj);
    }
    removeGameObject(obj: GameObject): void {
        this._objects.remove(obj);
    }
    queueTimer(timer: Timer): void {
        timer.on(Events.Timer_TimeoutFinished, () => {
            this._objects.remove(timer);
        });
        this._objects.add(timer);
        timer.start();
    }
    cancelTimer(timer: Timer): void {
        timer.cancel();
        if (this._objects.contains(timer)) {
            this._objects.remove(timer);
        } 
    }

    public get clock() { return this._clock; }
    public get objects() { return this._objects; }
    public get canvas() { return this._canvas; }
    public get render() { return this._render; }

    public static create(params: IGameParams): Game {
        return new Game(params);
    }
}