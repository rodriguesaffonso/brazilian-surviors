import { Observer } from "../../utils";
import { CollisionComponent } from "../components/CollisionComponent";
import { CombatComponent } from "../components/CombatComponent";
import { IComponentUpdateParams } from "../components/Component";
import { GraphicComponent } from "../components/GraphicComponent";
import { HealthComponent } from "../components/HealthComponent";
import { InputComponent } from "../components/InputComponent";
import { ObjectComponents } from "../components/ObjectComponents";
import { PhysicComponent } from "../components/PhysicComponent";
import { GameObjectKind } from "./GameObjectKind";

export abstract class GameObject extends Observer {
    public readonly kind: GameObjectKind;
    public readonly inputComponent: InputComponent;
    public readonly physicComponent: PhysicComponent;
    public readonly graphicComponent: GraphicComponent;
    public readonly collisionComponent: CollisionComponent;
    public readonly combatComponent: CombatComponent;
    public readonly healthComponent: HealthComponent;
    // constructor(components: ObjectComponents, kind: GameObjectKind) {
    constructor(components: ObjectComponents, kind: GameObjectKind) {
        super();
        this.kind = kind;
        this.inputComponent = components.input;
        this.physicComponent = components.physic;
        this.graphicComponent = components.graphic;
        this.collisionComponent = components.collision;
        this.combatComponent = components.combat;
        this.healthComponent = components.health;
    }

    public update(params: IComponentUpdateParams): void {
        this.inputComponent?.update(this, params);
        this.physicComponent?.update(this, params);
        this.graphicComponent?.update(this, params);
        this.collisionComponent?.update(this, params);
        this.combatComponent?.update(this, params);
        this.healthComponent?.update(this, params);
    }
}
