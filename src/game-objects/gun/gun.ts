import { GameObject, GameObjectKind, ObjectComponents } from "../../interfaces";
import { Bullet, BulletCombatComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { GunCombatComponent } from "../gun";
import { World } from "../world";


export class Gun extends GameObject {
    public ctx: CanvasRenderingContext2D
    public weapons: Bullet[];

    public CombatComponent: GunCombatComponent;
    
    constructor(ctx: CanvasRenderingContext2D, camera: Camera, world: World, components: ObjectComponents) {
        super({ 
            combat: components.combat 
        }, GameObjectKind.Gun);

        this.weapons = [new Bullet(camera, world, {
            physics: new BulletPhysicsComponent(), 
            combat: new BulletCombatComponent({}),
            graphic: new BulletGraphicComponent(ctx), 
        })];
    }
}