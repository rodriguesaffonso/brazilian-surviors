import { Events } from "../../../utils";
import { HealthComponent, HealthComponentParams } from "../../components/HealthComponent";
import { IGame } from "../../game/IGame";

export class EnemyHealthComponent extends HealthComponent {
  constructor(params: HealthComponentParams) {
    super({
      hp: 100,
      maxHp: 100,
      ...params
    });
    this
      .on(Events.HealthComponent_DamageTaken, (value) => {
        console.log('Enemy damage taken', value, this.hp);
      })
      .on(Events.HealthComponent_Dead, () => {
        console.log('Enemy dead');
      });
  }
}