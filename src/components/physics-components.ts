import { GameObject, Vector2D } from "../interfaces";
import { CommandParms } from "./params";

export interface PhysicsComponent {
    position: Vector2D;
    velocity: Vector2D;
    update(obj: GameObject, params?: CommandParms): void;
}
