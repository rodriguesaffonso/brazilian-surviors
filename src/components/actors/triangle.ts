import { ActionComponent, TriangleActionComponent } from "../action-components";
import { Camera } from "../camera";
import { GraphicComponent, TriangleGraphicComponent } from "../graphic-components";
import { AbstractObject, Vector2D } from "../interfaces";
import { PhysicsComponent } from "../physics-components";
import { Player } from "./player";

export class Triangle extends AbstractObject {
    public ctx: CanvasRenderingContext2D;
    public player: Player;
    public camera: Camera;
    
    public edgeLength: number = 10;
    
    public maxHp = 10;
    public hp = 10;
    public damage = 8;

    public distToAttack = 10;

    public graphicComponent: GraphicComponent;
    public physicsComponent: PhysicsComponent;
    public actionComponent: ActionComponent;

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, player: Player, camera: Camera, t: number, graphic: TriangleGraphicComponent, physics: PhysicsComponent, action: TriangleActionComponent) {
        super(ctx, center, t);
        this.ctx = ctx;
        this.player = player;
        this.camera = camera;

        this.graphicComponent = graphic;
        this.physicsComponent = physics;
        this.actionComponent = action;
    }

    public update(): void {
        this.physicsComponent.update(this);
        this.actionComponent.update(this);
        this.graphicComponent.update(this);
    }
}