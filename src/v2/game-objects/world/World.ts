import { ObjectComponents } from "../../components/ObjectComponents";
import { GameObject } from "../GameObject";
import { WorldGraphicComponent } from "./WorldGraphicComponent";

export class World extends GameObject {
    private constructor(components: ObjectComponents) {
        super(components);
    }

    public static create(ctx: CanvasRenderingContext2D) {
        const graphComp = new WorldGraphicComponent({ ctx });
        return new World({
            graphic: graphComp
        });
    }
}