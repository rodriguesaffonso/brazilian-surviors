import { AbstractObject, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { World } from "../world";
import { BulletGraphicComponent, BulletPhysicsComponent, BulletCombatComponent } from "../bullet";


export class Bullet extends AbstractObject {
    public ctx: CanvasRenderingContext2D;
    public enemy: AbstractObject;
    public camera: Camera;
    public world: World;

    public graphicComponent: BulletGraphicComponent;
    public physicsComponent: BulletPhysicsComponent;
    public combatComponent: BulletCombatComponent;

    public speed = 3;
    public damage = 20;
    public distToAttack = 50;

    public travelling = false;

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, camera: Camera, world: World, t: number, graphic: BulletGraphicComponent, physics: BulletPhysicsComponent, action: BulletCombatComponent) {
        super(ctx, center, t);
        this.camera = camera;
        this.world = world;

        this.graphicComponent = graphic;
        this.physicsComponent = physics;
        this.combatComponent = action;
    }

    public update(): void {
        this.physicsComponent.update(this);
        this.combatComponent.update(this, this.world);
        this.graphicComponent.update(this);
    }
}