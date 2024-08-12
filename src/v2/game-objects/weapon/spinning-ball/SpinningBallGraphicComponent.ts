import { IComponentUpdateParams } from "../../../components/Component";
import { GraphicComponent } from "../../../components/GraphicComponent";
import { SpinnigBall } from "./SpinningBall";
import { SpinningBallShape } from "./SpinningBallShape";

export class SpinnigBallGraphicComponent extends GraphicComponent {
  private shape = new SpinningBallShape();

  public update(weapon: SpinnigBall, params?: IComponentUpdateParams): void {
    const physicComponent = weapon.physicComponent;
    if (physicComponent === undefined) {
      throw Error('Missing SpinnigBall physic component');
    }
    this.shape.setCenter(physicComponent.getPosition());
    this.shape.draw(this.ctx);
  }
}