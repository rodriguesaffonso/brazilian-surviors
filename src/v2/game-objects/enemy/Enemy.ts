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

    public static create(ctx: CanvasRenderingContext2D): Enemy {
        const physicComp = new EnemyPhysicComponent({});
        const graphComp = new EnemyGraphicComponent({ physicComponent: physicComp, ctx });
        const colliComp = new EnemyCollisionComponent();
        const combatComp = new EnemyCombatComponent(colliComp);
        return new Enemy({
            physic: physicComp,
            graphic: graphComp,
            collision: colliComp,
            combat: combatComp,
        });
    }
}