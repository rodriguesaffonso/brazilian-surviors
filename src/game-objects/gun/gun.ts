import { Camera } from "../camera/camera";
import { AbstractObject, Vector2D } from "../interfaces";
import { World } from "../world/world";
import { Bullet } from "../bullet/bullet";
import { BulletPhysicsComponent } from "../bullet/physics-components";
import { GunActionCompoment } from "./action-components";
import { BulletActionComponent } from "../triangle/action-components";
import { BulletGraphicComponent } from "../bullet/graphic-components";

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