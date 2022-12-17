import { Camera } from "../camera/camera";
import { AbstractObject, Vector2D } from "../interfaces";
import { PhysicsComponent } from "../../components/physics-components";
import { Player } from "../player/player";
import { ActionComponent } from "../../components/action-components";
import { TriangleActionComponent } from "../bullet/action-components";
import { GraphicComponent } from "../../components/graphic-components";
import { TriangleGraphicComponent } from "./graphic-components";

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