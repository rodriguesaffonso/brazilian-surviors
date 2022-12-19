import { AbstractObject, Vector2D } from "../../interfaces";
import { Bullet, BulletCombatComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { GunCombatComponent } from "../gun";
import { World } from "../world";


export class Gun extends AbstractObject {
    public ctx: CanvasRenderingContext2D
    public weapons: Bullet[];

    public CombatComponent: GunCombatComponent;
    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, camera: Camera, world: World, t: number, combat: GunCombatComponent) {
        super(ctx, center, t);

        this.speed = 0;
        this.damage = 0;
        this.weapons = [new Bullet(ctx, center, camera, world, t, new BulletGraphicComponent(ctx), new BulletPhysicsComponent(), new BulletCombatComponent({}))];

        this.combatComponent = combat;
    }

    public update(): void {
        this.combatComponent.update(this);
    }
}