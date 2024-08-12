import { getCanvasSize, Vector2D } from "../../../utils";
import { PhysicComponent, PhysicComponentParams } from "../../components/PhysicComponent";

export class EnemyPhysicComponent extends PhysicComponent {
    constructor(params: PhysicComponentParams) {
        super(params);
        const ws = getCanvasSize();
        this.position = params.position ?? new Vector2D(ws.width / 2, ws.height / 2);
    }
}