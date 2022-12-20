import { GameObject, GameObjectKind } from "../../interfaces";
import { Camera } from "../camera";
import { World } from "../world";
import { BulletGraphicComponent, BulletPhysicsComponent, BulletCombatComponent } from "../bullet";


export class Bullet extends GameObject {
    public ctx: CanvasRenderingContext2D;
    public enemy: GameObject;
    public camera: Camera;
    public world: World;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, world: World, t: number, graphic: BulletGraphicComponent, physics: BulletPhysicsComponent, combat: BulletCombatComponent) {
        super({
            graphic, physics, combat
        }, GameObjectKind.Bullet);
        this.camera = camera;
        this.world = world;
    }

    public update(): void {
        this.physicsComponent.update(this);
        this.combatComponent.update(this, this.world);
        this.graphicComponent.update(this);
    }
}