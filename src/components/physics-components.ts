import { AbstractObject } from "../game-objects/interfaces";

export interface PhysicsComponent {
    update(obj?: AbstractObject): void;
}
