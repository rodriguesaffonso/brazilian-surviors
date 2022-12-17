import { ActionComponent, GraphicComponent, PhysicsComponent } from "../../components";
import { AbstractObject, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { Player } from "../player";
import { TriangleGraphicComponent, TriangleActionComponent } from "../triangle";

export class Triangle extends AbstractObject {
    public ctx: CanvasRenderingContext2D;
    public player: Player;
    public camera: Camera;
    
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