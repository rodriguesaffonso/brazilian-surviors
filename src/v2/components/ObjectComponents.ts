import { CollisionComponent } from "./CollisionComponent";
import { CombatComponent } from "./CombatComponent";
import { GraphicComponent } from "./GraphicComponent";
import { InputComponent } from "./InputComponent";
import { PhysicComponent } from "./PhysicComponent";

export interface ObjectComponents {
    input?: InputComponent;
    physic?: PhysicComponent;
    graphic?: GraphicComponent;
    collision?: CollisionComponent;
    combat?: CombatComponent;
}
