import { GameObject, Vector2D } from "../interfaces";

export interface PhysicsComponent {
    position: Vector2D;
    update(obj?: GameObject): void;
}
