import { Events } from "../../../utils";
import { CircleCollider } from "../../components/CircleCollider";
import { CollisionComponent } from "../../components/CollisionComponent";
import { GameObject } from "../GameObject";
import { PlayerShape } from "./PlayerShape";

export class PlayerCollisionComponent extends CollisionComponent {
    constructor() {
        super({ shape: new PlayerShape() });
        this.on(Events.CollisionComponent_Collision, () => {
            this.emit(Events.PlayerCollisionComponent_Collision)
        });
    }

    collide(player: GameObject, other: GameObject): boolean {
        return new CircleCollider().collideFromGameObjects(player, other);
    }
}