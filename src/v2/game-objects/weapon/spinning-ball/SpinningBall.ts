import { ObjectComponents } from "../../../components/ObjectComponents";
import { GameObject } from "../../GameObject";
import { GameObjectKind } from "../../GameObjectKind";
import { Player } from "../../player/Player";
import { SpinningBallPhysicComponent } from "./SpinningBallPhysicComponent";
import { SpinningBallGraphicComponent } from "./SpinningBallGraphicComponent";
import { SpinningBallCollisionComponent } from "./SpinningBallCollisionComponent";
import { SpinningBallCombatComponent } from "./SpinningBallCombatComponent";

export class SpinningBall extends GameObject {
  public readonly player: Player;
  private constructor(components: ObjectComponents, player: Player) {
    super(components, GameObjectKind.Weapon);
    this.player = player;
  }

  static create(ctx: CanvasRenderingContext2D, player: Player): SpinningBall {
    const graphic = new SpinningBallGraphicComponent({ ctx });
    const physic = new SpinningBallPhysicComponent();
    const collision = new SpinningBallCollisionComponent();
    const combat = new SpinningBallCombatComponent(collision);
    return new SpinningBall({
      graphic,
      physic,
      collision,
      combat,
    }, player);
  }
}