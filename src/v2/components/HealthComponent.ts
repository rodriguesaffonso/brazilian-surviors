import { Events } from "../../utils";
import { GameObject } from "../game-objects/GameObject";
import { Component, IComponentUpdateParams } from "./Component";

export interface HealthComponentParams {
  hp?: number;
  maxHp?: number;
  dead?: boolean;
}

export class HealthComponent extends Component {
  protected _hp: number;
  protected _maxHp: number;
  protected _dead: boolean;
  constructor(params: HealthComponentParams) {
    super();
    this._hp = params.hp ?? 100;
    this._maxHp = params.maxHp ?? 100;
    this._dead = params.dead ?? false;
  }
  update(obj: GameObject, params?: IComponentUpdateParams): void {
    if (this._dead) {
      return;
    }
  }

  public get hp() { return this._hp; }
  public get maxHp() { return this._maxHp; }
  public get dead() { return this._dead; }

  public takeDamage(value: number) {
    if (this._dead) {
      return;
    }

    this._hp -= value;
    this.emit(Events.HealthComponent_DamageTaken, value);
    if (this._hp <= 0) {
      this._dead = true;
      this.emit(Events.HealthComponent_Dead);
    }
  }

  public healthRegen(value: number) {
    if (this._dead) {
      return;
    }
    if (this._hp === this._maxHp) {
      return;
    }

    this._hp += value;
    this.emit(Events.HealthComponent_HealthRegen, value);
    if (this._hp >= this._maxHp) {
      this._hp = this._maxHp;
      this.emit(Events.HealthComponent_HealthFull);
    }
  }
}