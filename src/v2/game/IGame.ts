import { GameObject } from "../game-objects/GameObject";
import { Timer } from "../timer/Timer";
import { IGameParams } from "./IGameParams";

export interface IGame extends IGameParams {
    addGameObject(obj: GameObject): void;
    removeGameObject(obj: GameObject): void;
    queueTimer(timer: Timer): void;
}
