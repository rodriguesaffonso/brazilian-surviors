import { CombatComponent, CommandParms } from "../../components";
import { TriggerReason } from "../../components/upgrade-manager";
import { CombatComponentParams, Events } from "../../utils";
import { Player } from "../player/player";
import { World } from "../world/world";
import { Gem } from "./gem";

export class GemCombatComponent extends CombatComponent {
    public distToAttack: number = 10;

    constructor(params: CombatComponentParams) {
        super(params);
    }

    public update(gem: Gem, params: CommandParms): void {
        const player = params.game.player;
        if (player.combatComponent.dead) {
            return;
        }

        if (this.canAttack(gem, player)) {
            this.kill(gem);
            gem.emit(Events.ItemCollected);
            params.game.upgradeManager.update(TriggerReason.Gems, params);
        }
    }

    private canAttack(gem: Gem, player: Player): boolean {
        const p = player.getPosition();
        const e = gem.getPosition();
        return e.sub(p).modulo() < this.distToAttack;
    }
}
