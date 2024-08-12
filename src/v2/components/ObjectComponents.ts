import { CollisionComponent } from "./CollisionComponent";
import { CombatComponent } from "./CombatComponent";
import { GraphicComponent } from "./GraphicComponent";
import { HealthComponent } from "./HealthComponent";
import { InputComponent } from "./InputComponent";
import { PhysicComponent } from "./PhysicComponent";

export interface ObjectComponents {
    input?: InputComponent;
    physic?: PhysicComponent;
    graphic?: GraphicComponent;
    collision?: CollisionComponent;
    combat?: CombatComponent;
    health?: HealthComponent;
}
