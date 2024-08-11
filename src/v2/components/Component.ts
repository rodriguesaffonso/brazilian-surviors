import { GameObject } from "../game-objects/GameObject";
import { IComponentUpdateParams } from "./IComponentUpdateParams";

export interface Component {
    update(obj: GameObject, params?: IComponentUpdateParams): void;
}
