import { ObjectComponents } from "../../components/ObjectComponents";
import { GameObject } from "../GameObject";
import { GameObjectKind } from "../GameObjectKind";
import { WorldGraphicComponent } from "./WorldGraphicComponent";

export class World extends GameObject {
    private constructor(components: ObjectComponents) {
        super(components, GameObjectKind.World);
    }

    public static create(ctx: CanvasRenderingContext2D) {
        const graphComp = new WorldGraphicComponent({ ctx });
        return new World({
            graphic: graphComp
        });
    }
}