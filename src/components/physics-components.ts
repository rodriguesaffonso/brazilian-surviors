import { GameObject } from "../interfaces";

export interface PhysicsComponent {
    update(obj?: GameObject): void;
}
