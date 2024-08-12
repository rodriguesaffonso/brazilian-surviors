import { Events } from "../../../../utils";
import { CircleCollider } from "../../../components/CircleCollider";
import { CollisionComponent, CollisionEventParams } from "../../../components/CollisionComponent";
import { GameObject } from "../../GameObject";
import { GameObjectKind } from "../../GameObjectKind";
import { SpinningBallShape } from "./SpinningBallShape";

export class SpinningBallCollisionComponent extends CollisionComponent {
  constructor() {
    super({ shape: new SpinningBallShape() });
    this.on(Events.CollisionComponent_Collision, (params: CollisionEventParams) => {
        if (params.other.kind === GameObjectKind.Enemy) {
            this.emit(Events.SpinningBallCollisionComponent_CollidingWithEnemy, params.other);
        }
    });
}
  collide(weapon: GameObject, enemy: GameObject): boolean {
    return new CircleCollider().collideFromGameObjects(weapon, enemy);
  }
}