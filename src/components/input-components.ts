import { AbstractObject } from "../game-objects/interfaces";

export interface InputComponent {
    update(obj?: AbstractObject): void;
    start(): void;
    stop(): void
}
