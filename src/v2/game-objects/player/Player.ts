import { Events } from "../../../utils";
import { KeyboardInputComponent } from "../../components/KeyboardInputComponent";
import { ObjectComponents } from "../../components/ObjectComponents";
import { GameObject } from "../GameObject";
import { GameObjectKind } from "../GameObjectKind";
import { PlayerCollisionComponent } from "./PlayerCollisionComponent";
import { PlayerGraphicComponent } from "./PlayerGraphicComponent";
import { PlayerInputComponent } from "./PlayerInputComponent";
import { PlayerPhysicComponent } from "./PlayerPhysicComponent";

export class Player extends GameObject {
    private constructor(components: ObjectComponents) {
        super(components, GameObjectKind.Player);
    }

    public static create(ctx: CanvasRenderingContext2D, keyboard: KeyboardInputComponent): Player {
        const inputComp = new PlayerInputComponent(keyboard);
        const physicComp = new PlayerPhysicComponent();
        const graphComp = new PlayerGraphicComponent({ ctx });
        const colliComp = new PlayerCollisionComponent();
        return new Player({
            input: inputComp,
            physic: physicComp,
            graphic: graphComp,
            collision: colliComp,
        });
    }
}
