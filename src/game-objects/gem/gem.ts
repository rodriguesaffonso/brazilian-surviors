import { GameObject, GameObjectKind, ObjectComponents, Vector2D } from "../../utils";
import { GemCombatComponent } from "./gem-combat-components";
import { GemGraphicComponent } from "./gem-graphic-components";
import { GemPhysicsComponent } from "./gem-physics-components";

export class Gem extends GameObject {
  constructor(components: ObjectComponents) {
    super(components, GameObjectKind.Gem);
  }
}

export function createGem(position: Vector2D, ctx: CanvasRenderingContext2D): Gem {
  return new Gem({
    graphic: new GemGraphicComponent(ctx),
    physics: new GemPhysicsComponent({ position }),
    combat: new GemCombatComponent({})
  });
}