import { IComponentUpdateParams } from "../../../components/Component";
import { GraphicComponent } from "../../../components/GraphicComponent";
import { SpinningBall } from "./SpinningBall";
import { SpinningBallShape } from "./SpinningBallShape";

export class SpinningBallGraphicComponent extends GraphicComponent {
  private shape = new SpinningBallShape();

  public update(weapon: SpinningBall, params?: IComponentUpdateParams): void {
    const physicComponent = weapon.physicComponent;
    if (physicComponent === undefined) {
      throw Error('Missing SpinnigBall physic component');
    }
    this.shape.setCenter(physicComponent.getPosition());
    this.shape.draw(this.ctx);
  }
}