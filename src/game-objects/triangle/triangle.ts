import { CombatComponent, GraphicComponent, PhysicsComponent } from "../../components";
import { GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { Player } from "../player";
import { World } from "../world";
import { TriangleCombatComponent } from "./triangle-combat-components";
import { TriangleGraphicComponent } from "./triangle-graphic-components";
import { TrianglePhysicsComponent } from "./triangle-physics-components";

export class Triangle extends GameObject {
    public player: Player;
    public camera: Camera;

    constructor(player: Player, camera: Camera, components: ObjectComponents) {
        super({ 
            physics: components.physics, 
            combat: components.combat, 
            graphic: components.graphic, 
        }, GameObjectKind.Triangle);

        this.player = player;
        this.camera = camera;
    }
}

export function createTriangle(world: World, player: Player, camera: Camera, position: Vector2D, ctx: CanvasRenderingContext2D): Triangle {
    return new Triangle(player, camera, {
        graphic: new TriangleGraphicComponent(ctx),
        physics: new TrianglePhysicsComponent(position),
        combat: new TriangleCombatComponent(world),
    });
}