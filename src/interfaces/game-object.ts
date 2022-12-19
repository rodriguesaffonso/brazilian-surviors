
import { CombatComponent } from "../components/combat-component";
import { GraphicComponent } from "../components/graphic-components";
import { InputComponent } from "../components/input-components";
import { PhysicsComponent } from "../components/physics-components";

export interface ObjectComponents {
    input?: InputComponent;
    action?: CombatComponent;
    physics?: PhysicsComponent;
    graphic?: GraphicComponent;
}

export abstract class GameObject {
    public dead: boolean = false;
    public hp: number = 100;

    public inputComponent: InputComponent;
    public combatComponent: CombatComponent;
    public physicsComponent: PhysicsComponent;
    public graphicComponent: GraphicComponent;

    constructor(components: ObjectComponents) {
        this.inputComponent = components.input;
        this.combatComponent = components.action;
        this.physicsComponent = components.physics;
        this.graphicComponent = components.graphic;
    }

    public update(): void {
        this.inputComponent?.update(this);
        this.combatComponent?.update(this);
        this.physicsComponent?.update(this);
        this.graphicComponent?.update(this);
    }

    public takeHit(damage: number): void {
        console.log(damage);
        
        if (this.dead) { return; }
        this.hp -= damage
        if (this.hp < 0) {
            this.hp = 0;
            this.dead = true;
        }
    }
}