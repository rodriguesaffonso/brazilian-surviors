import { IComponentUpdateParams } from "../../components/Component";
import { GraphicComponent } from "../../components/GraphicComponent";
import { GameObject } from "../GameObject";
import { PlayerShape } from "./PlayerShape";

export class PlayerGraphicComponent extends GraphicComponent {
    private shape = new PlayerShape();
    
    public update(player: GameObject, params?: IComponentUpdateParams): void {
        const playerPhysicComponent = player.physicComponent;
        if (playerPhysicComponent === undefined) {
            throw Error('Missing player physic component');
        }
        this.shape.setCenter(playerPhysicComponent.getPosition());
        this.shape.draw(this.ctx);
    }
}