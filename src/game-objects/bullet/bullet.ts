import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Camera } from "../camera";
import { World } from "../world";
import { BulletGraphicComponent, BulletPhysicsComponent, BulletCombatComponent } from "../bullet";


export class Bullet extends GameObject {
    public enemy: GameObject;
    public camera: Camera;
    public world: World;

    constructor(camera: Camera, world: World, components: ObjectComponents) {
        super({ 
            physics: components.physics,
            combat: components.combat,
            graphic: components.graphic,
        }, GameObjectKind.Bullet);

        this.camera = camera;
        this.world = world;
    }

    public update(): void { // overriding this method to pass world to update combat call
        this.physicsComponent.update(this);
        this.combatComponent.update(this, this.world);
        this.graphicComponent.update(this);
    }
}