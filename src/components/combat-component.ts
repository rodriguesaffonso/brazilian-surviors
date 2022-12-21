import { World } from "../game-objects/world";
import { CombatComponentParams, GameObject } from "../interfaces";
import { CommandParms } from "./params";

export abstract class CombatComponent implements CombatComponentParams {
    public dead: boolean = false;
    public hp: number;
    public maxHp?: number;
    public damage: number;

    constructor(params: CombatComponentParams) {
        this.dead = params.dead ?? false;
        this.hp = params.hp ?? 100;
        this.maxHp = params.maxHp ?? this.hp;
    }

    public update(obj: GameObject, params: CommandParms): void {
        throw new Error('NYI');
    }

    public takeHit(damage: number): void {
        if (this.dead) { return; }
        this.hp -= damage
        if (this.hp <= 0) {
            this.hp = 0;
            this.dead = true;
        }
    }
}
