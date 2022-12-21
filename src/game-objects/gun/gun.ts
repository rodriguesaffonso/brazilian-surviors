import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Bullet, BulletCombatComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { World } from "../world";


export class Gun extends GameObject {
    public weapons: Bullet[];

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, world: World, components: ObjectComponents) {
        super({ 
            combat: components.combat 
        }, GameObjectKind.Gun);

        this.weapons = [new Bullet(camera, world, { // TODO: make gun automatically shoots new bullets over time
            physics: new BulletPhysicsComponent(), 
            combat: new BulletCombatComponent({}),
            graphic: new BulletGraphicComponent(ctx), 
        })];
    }
}