import { GameObject } from "../game-objects/GameObject";
import { Component, IComponentUpdateParams } from "./Component";


export abstract class InputComponent extends Component {
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
