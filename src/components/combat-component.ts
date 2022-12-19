import { World } from "../game-objects/world";
import { GameObject } from "../interfaces";

export interface CombatComponentParams {
    dead?: boolean,
    damage?: number,
    hp?: number,
    maxHp?: number,
}

export abstract class CombatComponent implements CombatComponentParams {
    public dead: boolean = false;
    public hp: number;
    public maxHp?: number;
    public damage: number;

    constructor(params: CombatComponentParams) {
        this.dead = params.dead;
        this.hp = params.hp ?? 100;
        this.maxHp = params.maxHp ?? this.hp;
    }

    public update(obj: GameObject, world?: World): void {
        throw new Error('NYI');
    }

    public takeHit(damage: number): void {
        console.log(damage);
        
        if (this.dead) { return; }
        this.hp -= damage
        if (this.hp < 0) {
            this.hp = 0;
            this.dead = true;
        }
    }
}
