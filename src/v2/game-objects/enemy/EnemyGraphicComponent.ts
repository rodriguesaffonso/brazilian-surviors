import { IComponentUpdateParams } from "../../components/Component";
import { GraphicComponent, GraphicComponentParams } from "../../components/GraphicComponent";
import { GameObject } from "../GameObject";
import { EnemyPhysicComponent } from "./EnemyPhysicComponent";
import { EnemyShape } from "./EnemyShape";

export interface EnemyGraphicComponentParams extends GraphicComponentParams {
    physicComponent: EnemyPhysicComponent;
} 

export class EnemyGraphicComponent extends GraphicComponent {
    private physicComponent: EnemyPhysicComponent;
    constructor(params: EnemyGraphicComponentParams) {
        super(params);
        this.physicComponent = params.physicComponent;
    }
    public update(obj: GameObject, params?: IComponentUpdateParams): void {
        const shape = new EnemyShape();
        shape.setCenter(this.physicComponent.getPosition());
        shape.draw(this.ctx);
    }
}