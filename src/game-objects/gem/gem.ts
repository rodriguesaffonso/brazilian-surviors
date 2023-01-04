import { GameObject, GameObjectKind, ObjectComponents } from "../../utils";

export class Gem extends GameObject {
  constructor(components: ObjectComponents) {
    super(components, GameObjectKind.Gem);
  }
}