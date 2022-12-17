import { AbstractObject, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { World } from "../world";
import { BulletGraphicComponent, BulletPhysicsComponent, BulletActionComponent } from "../bullet";


export class Bullet extends AbstractObject {
    public ctx: CanvasRenderingContext2D;
    public enemy: AbstractObject;
    public camera: Camera;
    public world: World;

    public graphicComponent: BulletGraphicComponent;
    public physicsComponent: BulletPhysicsComponent;
    public actionComponent: BulletActionComponent;

    public speed = 3;
    public damage = 20;
    public distToAttack = 50;

    public travelling = false;

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, camera: Camera, world: World, t: number, graphic: BulletGraphicComponent, physics: BulletPhysicsComponent, action: BulletActionComponent) {
        super(ctx, center, t);
        this.camera = camera;
        this.world = world;

        this.graphicComponent = graphic;
        this.physicsComponent = physics;
        this.actionComponent = action;
    }

    public update(): void {
        this.physicsComponent.update(this);
        this.actionComponent.update(this, this.world);
        this.graphicComponent.update(this);
    }
}