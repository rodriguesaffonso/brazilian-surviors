
import { CommandParms } from "../../components";
import { PhysicsComponent } from "../../components/physics-components";
import { PhysicsComponentParams } from "../../utils";
import { Gem } from "./gem";

export class GemPhysicsComponent extends PhysicsComponent {
    public radiusToPlayer: number;
    public attracted: boolean;

    constructor(params: PhysicsComponentParams) {
        super({ 
            position: params.position, 
            speed: params.speed ?? 4
        });

        this.radiusToPlayer = params.radiusToPlayer;
        this.attracted = false;
    }

    public update(gem: Gem, params: CommandParms): void {
        const vectorToPlayer = params.game.player.getPosition().sub(gem.getPosition());
        if (vectorToPlayer.modulo() < this.speed) {
            return;
        }

        if (this.attracted || vectorToPlayer.modulo() <= this.radiusToPlayer) {
            this.attracted = true;
            this.velocity = vectorToPlayer.unit().multiply(this.speed);
            super.update(gem, params);
        }
    }
}
