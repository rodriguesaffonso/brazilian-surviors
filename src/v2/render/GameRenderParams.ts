import { GameCanvas } from "../canvas/GameCanvas";
import { IClock } from "../clock/IClock";
import { IGameObjectList } from "../game-objects/IGameObjectList";

export interface GameRenderParams {
    clock: IClock;
    gameObjects: IGameObjectList;
    gameCanvas: GameCanvas;
}
