import { Events } from "../../../utils";
import { CircleCollider } from "../../components/CircleCollider";
import { CollisionComponent, CollisionEventParams } from "../../components/CollisionComponent";
import { GameObject } from "../GameObject";
import { GameObjectKind } from "../GameObjectKind";
import { EnemyShape } from "./EnemyShape";

export class EnemyCollisionComponent extends CollisionComponent {
    constructor() {
        super({ shape: new EnemyShape() });
        this.on(Events.CollisionComponent_Collision, (params: CollisionEventParams) => {
            if (params.other.kind === GameObjectKind.Player) {
                this.emit(Events.EnemyCollisionComponent_CollidingWithPlayer, params.other);
            }
        })
    }
    collide(enemy: GameObject, other: GameObject): boolean {
        return new CircleCollider().collideFromGameObjects(enemy, other);
    }
}