import { UpgradeManager } from "../../components/upgrade-manager/upgrade-manager";
import { Game } from "../../game";
import { Events, GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../utils";
import { Camera } from "../camera";
import { createGem } from "../gem";
import { Player } from "../player";
import { TriangleCollectableCompoment } from "./triangle-collectable-components";
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
    const triangle = new Triangle(g.player, g.camera, {
        graphic: new TriangleGraphicComponent(ctx, baseParams.color),
        physics: new TrianglePhysicsComponent({ position }),
        combat: new TriangleCombatComponent({ hp: baseParams.hp, damage: baseParams.hp }),
    });

    const collectableComponent = new TriangleCollectableCompoment(baseParams.probToGenerate);
    triangle.on(Events.ObjectDead, () => {
        if (collectableComponent.canGenerateCollectables()) {
            g.addToObjectsArray(createGem(triangle.getPosition(), ctx, upgrade));
        }
    });
    return triangle;
}