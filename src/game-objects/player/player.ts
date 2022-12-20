import { GraphicComponent, InputComponent, PhysicsComponent } from "../../components";
import { GameObject, GameObjectKind } from "../../interfaces";
import { Camera } from "../camera";
import { PlayerCombatComponent } from "./combat-component";

export class Player extends GameObject {
    public weapons: GameObject[];
    public camera: Camera;
    constructor(ctx: CanvasRenderingContext2D, camera: Camera, t: number, input: InputComponent, physics: PhysicsComponent, graphic: GraphicComponent) {
        super({
            input,
            physics,
            combat: new PlayerCombatComponent({ hp: 100, maxHp: 100, damage: 0 }),
            graphic
        }, GameObjectKind.Player);

        this.camera = camera;
        this.weapons = [];
        input.start();
    }

    public addWeapon(w: GameObject): Player {
        this.weapons.push(w);
        return this;
    }

    public update(): void {
        this.inputComponent.update(this);
        this.physicsComponent.update(this);
        this.combatComponent.update(this);
        this.graphicComponent.update(this);
    }
}