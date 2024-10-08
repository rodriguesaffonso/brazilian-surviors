import { getCanvasSize } from "../../../utils";
import { IComponentUpdateParams } from "../../components/Component";
import { GraphicComponent } from "../../components/GraphicComponent";
import { GameObject } from "../GameObject";

export class WorldGraphicComponent extends GraphicComponent {
    public update(obj: GameObject, params?: IComponentUpdateParams): void {
        this.ctx.fillStyle = '#545f5f';
        const ws = getCanvasSize();
        this.ctx.fillRect(0, 0, ws.width, ws.height);
    }
}