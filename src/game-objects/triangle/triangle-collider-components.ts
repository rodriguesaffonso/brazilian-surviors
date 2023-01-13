
import { CommandParms } from "../../components";
import { ColliderComponent } from "../../components/collider-components";
import { ColliderComponentParams } from "../../utils";
import { Triangle } from "./triangle";

export class TriangleColliderComponent extends ColliderComponent {
    constructor(params: ColliderComponentParams) {
        super(params);
    }

    public update(triangle: Triangle, params: CommandParms): void {}
}
