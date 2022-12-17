import { GameObject } from "../interfaces";

export interface GraphicComponent {
    update(obj?: GameObject): void;
}

