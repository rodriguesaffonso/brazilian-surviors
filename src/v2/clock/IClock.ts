import { ClockState } from "./ClockState";

export interface IClock {
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    time(): number;
    state(): ClockState;
    tick(timestamp: number): void;
    elapsed(): number;
}
