import { CombatComponentParams, GameObject } from "../utils";
import { Events } from "../utils/observer";
import { CommandParms, Component } from "./interfaces";

export abstract class CombatComponent implements CombatComponentParams, Component {
    public dead: boolean = false;
    public hp: number;
    public maxHp?: number;
    public damage: number;
    public cooldown: number;
    public duration: number;
    public amount: number;

    constructor(params: CombatComponentParams) {
        this.dead = params.dead ?? false;
        this.hp = params.hp ?? 100;
        this.maxHp = params.maxHp ?? this.hp;
        this.damage = params.damage ?? 10;
        this.cooldown = params.cooldown ?? 1000;
        this.duration = params.duration;
        this.amount = params.amount ?? 1;
    }

    public update(obj: GameObject, params: CommandParms): void {
        throw new Error('NYI');
    }

    public takeHit(obj: GameObject, damage: number): void {
        if (this.dead) { return; }
        this.hp -= damage
        obj.emit(Events.DamageDone, { damage, position: obj.getPosition() });
        if (this.hp <= 0) {
            this.kill(obj);
        }
    }

    protected kill(obj: GameObject): void {
        if (this.dead) return;

        this.hp = 0;
        this.dead = true;
        obj.emit(Events.ObjectDead);
    }
}
