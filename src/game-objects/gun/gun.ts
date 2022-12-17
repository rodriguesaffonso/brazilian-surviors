import { AbstractObject, Vector2D } from "../../interfaces";
import { Bullet, BulletActionComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { GunActionCompoment } from "../gun";
import { World } from "../world";


export class Gun extends AbstractObject {
    public ctx: CanvasRenderingContext2D
    public weapons: Bullet[];

    public actionComponent: GunActionCompoment;
    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, camera: Camera, world: World, t: number, action: GunActionCompoment) {
        super(ctx, center, t);

        this.speed = 0;
        this.damage = 0;
        this.weapons = [new Bullet(ctx, center, camera, world, t, new BulletGraphicComponent(ctx), new BulletPhysicsComponent(), new BulletActionComponent())];

        this.actionComponent = action;
    }

    public update(): void {
        this.actionComponent.update(this);
    }
}