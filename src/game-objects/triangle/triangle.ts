import { CombatComponent, GraphicComponent, PhysicsComponent } from "../../components";
import { AbstractObject, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { Player } from "../player";
import { TriangleGraphicComponent, TriangleCombatComponent } from "../triangle";

export class Triangle extends AbstractObject {
    public ctx: CanvasRenderingContext2D;
    public player: Player;
    public camera: Camera;
    
    public graphicComponent: GraphicComponent;
    public physicsComponent: PhysicsComponent;
    public combatComponent: CombatComponent;

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, player: Player, camera: Camera, t: number, graphic: TriangleGraphicComponent, physics: PhysicsComponent, combat: TriangleCombatComponent) {
        super(ctx, center, t);
        this.ctx = ctx;
        this.player = player;
        this.camera = camera;

        this.damage = 8;

        this.graphicComponent = graphic;
        this.physicsComponent = physics;
        this.combatComponent = combat;
    }

    public update(): void {
        this.physicsComponent.update(this);
        this.combatComponent.update(this);
        this.graphicComponent.update(this);
    }
}