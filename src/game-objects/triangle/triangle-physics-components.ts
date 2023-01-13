
import { CommandParms } from "../../components";
import { PhysicsComponent } from "../../components/physics-components";
import { GameObjectKind, PhysicsComponentParams, Vector2D } from "../../utils";
import { Triangle } from "./triangle";

export class TrianglePhysicsComponent extends PhysicsComponent {
    constructor(params: PhysicsComponentParams) {
        super({
            position: params.position,
            speed: params.speed ?? 0.8
        });
    }

    public update(enemy: Triangle, params: CommandParms): void {
        const vectorToPlayer = enemy.player.getPosition().sub(enemy.getPosition());
        if (vectorToPlayer.modulo() < this.speed) {
            return;
        }

        this.velocity = vectorToPlayer.unit().multiply(this.speed);

        // Check colision and apply changes
        params.game.gameObjects.forEach(other => {
            if (enemy !== other && other.kind === GameObjectKind.Triangle) {
                const collider = enemy.colliderComponent;
                if (collider.colliding(enemy, other)) {
                    const d1 = enemy.getPosition().sub(params.game.player.getPosition()).modulo();
                    const d2 = other.getPosition().sub(params.game.player.getPosition()).modulo();

                    if (d1 > d2) {
                        const v = enemy.getPosition().sub(other.getPosition()).unit().multiply(this.speed);
                        this.velocity = this.velocity.add(v).unit().multiply(this.speed);
                    }
                }
            }
        })

        super.update(enemy, params);
    }
}
