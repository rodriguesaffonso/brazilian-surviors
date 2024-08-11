import { Observer } from "../../utils";
import { GameObject } from "../game-objects/GameObject";
import { Component } from "./Component";
import { IComponentUpdateParams } from "./IComponentUpdateParams";


export abstract class InputComponent extends Observer implements Component {
    public update(_?: GameObject, params?: IComponentUpdateParams): void {
        throw Error('NYI');
    }
    public enable(): void {
        throw Error('NYI');
    }
    public disable(): void {
        throw Error('NYI');
    }
}
