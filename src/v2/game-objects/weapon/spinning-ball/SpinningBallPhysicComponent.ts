import { Vector2D } from "../../../../utils";
import { IComponentUpdateParams } from "../../../components/Component";
import { PhysicComponent } from "../../../components/PhysicComponent";
import { PlayerShape } from "../../player/PlayerShape";
import { SpinningBall } from "./SpinningBall";
import { SpinningBallShape } from "./SpinningBallShape";

export class SpinningBallPhysicComponent extends PhysicComponent {
    private thetaSpeed: number;
    constructor() {
        super({});
        this.thetaSpeed = 5;
    }
    update(weapon: SpinningBall, params?: IComponentUpdateParams): void {
        const playerShape = new PlayerShape();
        const weaponShape = new SpinningBallShape();
        const radius = (playerShape.getRadius() + weaponShape.getRadius()) * 4;
        const theta = (params.game.clock.time() * this.thetaSpeed / 1000) % (2 * Math.PI);

        const position = new Vector2D(Math.cos(theta), Math.sin(theta)).multiply(radius);
        this.position = position.add(weapon.player.physicComponent.getPosition());
    }
}