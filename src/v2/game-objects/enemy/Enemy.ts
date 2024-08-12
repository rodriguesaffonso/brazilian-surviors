import { ObjectComponents } from "../../components/ObjectComponents";
import { GameObject } from "../GameObject";
import { GameObjectKind } from "../GameObjectKind";
import { EnemyCollisionComponent } from "./EnemyCollisionComponent";
import { EnemyCombatComponent } from "./EnemyCombatComponent";
import { EnemyGraphicComponent } from "./EnemyGraphicComponent";
import { EnemyPhysicComponent } from "./EnemyPhysicComponent";

export class Enemy extends GameObject {
    private constructor(components: ObjectComponents) {
        super(components, GameObjectKind.Enemy);
    }

    public static create(ctx: CanvasRenderingContext2D, components?: ObjectComponents): Enemy {
        const physicComp = components.physic ?? new EnemyPhysicComponent({});
        const graphComp = components.graphic ?? new EnemyGraphicComponent({ physicComponent: physicComp, ctx });
        const colliComp = components.collision ??new EnemyCollisionComponent();
        const combatComp = components.combat ??new EnemyCombatComponent(colliComp);
        return new Enemy({
            physic: physicComp,
            graphic: graphComp,
            collision: colliComp,
            combat: combatComp,
        });
    }
}