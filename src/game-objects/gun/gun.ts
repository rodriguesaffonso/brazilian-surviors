import { GameObject, GameObjectKind } from "../../interfaces";
import { Bullet, BulletCombatComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { GunCombatComponent } from "../gun";
import { World } from "../world";


export class Gun extends GameObject {
    public ctx: CanvasRenderingContext2D
    public weapons: Bullet[];

    public CombatComponent: GunCombatComponent;
    constructor(ctx: CanvasRenderingContext2D, camera: Camera, world: World, t: number, combat: GunCombatComponent) {
        super({ combat }, GameObjectKind.Gun);

        this.weapons = [new Bullet(ctx, camera, world, t, new BulletGraphicComponent(ctx), new BulletPhysicsComponent(), new BulletCombatComponent({}))];
    }

    public update(): void {
        this.combatComponent.update(this);
    }
}