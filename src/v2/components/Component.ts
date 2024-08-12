import { Observer } from "../../utils";
import { GameObject } from "../game-objects/GameObject";
import { IGame } from "../game/IGame";

export interface IComponentUpdateParams {
    timestamp: number;
    game: IGame;
}

export interface IComponent {
    update(obj: GameObject, params?: IComponentUpdateParams): void;
}

export abstract class Component extends Observer implements IComponent {
    update(obj: GameObject, params?: IComponentUpdateParams): void {
        throw new Error('NYI');
    }
}
