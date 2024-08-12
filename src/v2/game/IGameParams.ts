import { GameCanvas } from "../canvas/GameCanvas";
import { IClock } from "../clock/IClock";
import { IGameObjectList } from "../game-objects/IGameObjectList";
import { GameRender } from "../render/GameRender";

export interface IGameParams {
    clock: IClock;
    objects: IGameObjectList;
    canvas: GameCanvas;
    render: GameRender;
}
