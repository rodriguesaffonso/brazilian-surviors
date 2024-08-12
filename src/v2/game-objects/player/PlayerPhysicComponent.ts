import { Vector2D } from "../../../utils";
import { IComponentUpdateParams } from "../../components/IComponentUpdateParams";
import { PhysicComponent } from "../../components/PhysicComponent";
import { GameObject } from "../GameObject";
import { PlayerInputComponent } from "./PlayerInputComponent";

export class PlayerPhysicComponent extends PhysicComponent {
    constructor() {
        super({ speed: 200 });
    }
    update(player: GameObject, params?: IComponentUpdateParams): void {
        const inputComp = player.inputComponent();
        if (inputComp === undefined) {
            throw Error('Missing player input component');
        }
        this.velocity = (inputComp as PlayerInputComponent).getMovingDirection().unit().multiply(this.speed);
        super.update(player, params);
    }
}