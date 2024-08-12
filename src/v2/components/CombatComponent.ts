import { GameObject } from "../game-objects/GameObject";
import { Component, IComponentUpdateParams } from "./Component";

export abstract class CombatComponent extends Component  {
    update(obj: GameObject, params?: IComponentUpdateParams): void {
        throw new Error('NYI');
    }
}
