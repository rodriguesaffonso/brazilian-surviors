import { GameObject } from "../interfaces";

export interface InputComponent {
    update(obj?: GameObject): void;
    start(): void;
    stop(): void
}
