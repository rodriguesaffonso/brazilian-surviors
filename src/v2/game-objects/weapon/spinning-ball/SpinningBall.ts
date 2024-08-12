import { ObjectComponents } from "../../../components/ObjectComponents";
import { GameObject } from "../../GameObject";
import { GameObjectKind } from "../../GameObjectKind";
import { Player } from "../../player/Player";
import { SpinningBallPhysicComponent } from "./SpinninBallPhysicComponent";
import { SpinnigBallGraphicComponent } from "./SpinningBallGraphicComponent";

export class SpinnigBall extends GameObject {
  public readonly player: Player;
  private constructor(components: ObjectComponents, player: Player) {
    super(components, GameObjectKind.Weapon);
    this.player = player;
  }

  static create(ctx: CanvasRenderingContext2D, player: Player): SpinnigBall {
    const graphic = new SpinnigBallGraphicComponent({ ctx });
    const physic = new SpinningBallPhysicComponent();
    return new SpinnigBall({
      graphic,
      physic,
    }, player);
  }
}