import { World } from "../game-objects/world";
import { GameObject } from "../interfaces";

export interface ActionComponent {
    update(obj: GameObject, world?: World): void;
}
