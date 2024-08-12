import { IComponentUpdateParams } from "../../components/Component";
import { GraphicComponent } from "../../components/GraphicComponent";
import { GameObject } from "../GameObject";
import { PlayerShape } from "./PlayerShape";

export class PlayerGraphicComponent extends GraphicComponent {
    public update(player: GameObject, params?: IComponentUpdateParams): void {
        const shape = new PlayerShape();
        const playerPhysicComponent = player.physicComponent();
        if (playerPhysicComponent === undefined) {
            throw Error('Missing player physic component');
        }
        shape.setCenter(playerPhysicComponent.getPosition());
        shape.draw(this.ctx);
    }
}