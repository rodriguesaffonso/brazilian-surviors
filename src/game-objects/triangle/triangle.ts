import { UpgradeManager } from "../../components/upgrade-manager";
import { Game } from "../../game";
import { Events, GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../utils";
import { Camera } from "../camera";
import { Gem } from "../gem";
import { GemCombatComponent } from "../gem/gem-combat-components";
import { GemGraphicComponent } from "../gem/gem-graphic-components";
import { GemPhysicsComponent } from "../gem/gem-physics-components";
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
    const triangle =  new Triangle(g.player, g.camera, {
        graphic: new TriangleGraphicComponent(ctx),
        physics: new TrianglePhysicsComponent({ position }),
        combat: new TriangleCombatComponent(g.world, { hp: baseParams.hp, damage: baseParams.hp }),
    });

    const collectableComponent = new TriangleCollectableCompoment(baseParams.probToGenerate);
    triangle.on(Events.ObjectDead, () => {
        if (collectableComponent.canGenerateCollectables()) {
            const gem = new Gem({
                graphic: new GemGraphicComponent(ctx),
                physics: new GemPhysicsComponent({ position: triangle.getPosition() }),
                combat: new GemCombatComponent({})
            });

            g.addToObjectsArray(gem);

            gem.on(Events.ObjectDead, () => {
                g.removeFromObjectsArray(gem);
            })
        }
    });
    return triangle;
}