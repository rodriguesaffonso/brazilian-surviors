import { AbstractObject } from "../game-objects/interfaces";

export interface GraphicComponent {
    update(obj?: AbstractObject): void;
}

