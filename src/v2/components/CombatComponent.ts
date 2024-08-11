import { Observer } from "../../utils";
import { GameObject } from "../game-objects/GameObject";
import { Component } from "./Component";
import { IComponentUpdateParams } from "./IComponentUpdateParams";

export abstract class CombatComponent extends Observer implements Component  {
    update(obj: GameObject, params?: IComponentUpdateParams): void {
        throw new Error('NYI');
    }
}
