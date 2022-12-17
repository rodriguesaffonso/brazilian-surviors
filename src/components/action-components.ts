import { AbstractObject } from "../game-objects/interfaces";
import { World } from "../game-objects/world/world";

export interface ActionComponent {
    update(obj: AbstractObject, world?: World): void;
}
