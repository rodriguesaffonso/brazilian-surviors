import { UpgradeManager } from "../../components/upgrade-manager";
import { Game } from "../../game";
import { GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../interfaces";
import { Camera } from "../camera";
import { Player } from "../player";
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

export function createTriangle(g: Game, position: Vector2D, ctx: CanvasRenderingContext2D, upgrade: UpgradeManager): Triangle {
    const baseParams = upgrade.getBaseParams(GameObjectKind.Triangle);
    return new Triangle(g.player, g.camera, {
        graphic: new TriangleGraphicComponent(ctx),
        physics: new TrianglePhysicsComponent({ position }),
        combat: new TriangleCombatComponent(g.world, { hp: baseParams.hp, damage: baseParams.hp }),
    });
}