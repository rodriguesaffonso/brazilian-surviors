import { CombatComponent, GraphicComponent, PhysicsComponent } from "../../components";
import { GameObject, GameObjectKind, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { Player } from "../player";
import { TriangleGraphicComponent, TriangleCombatComponent } from "../triangle";

export class Triangle extends GameObject {
    public player: Player;
    public camera: Camera;

    constructor(ctx: CanvasRenderingContext2D, center: Vector2D, player: Player, camera: Camera, t: number, graphic: TriangleGraphicComponent, physics: PhysicsComponent, combat: TriangleCombatComponent) {
        super({ graphic, physics, combat }, GameObjectKind.Triangle);
        this.player = player;
        this.camera = camera;

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