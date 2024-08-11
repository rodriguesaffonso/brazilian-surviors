import { ClockState } from "./ClockState";
import { IClock } from "./IClock";

export class Clock implements IClock {
    private elapsedFromLastLoop: number = 0;
    private lastTimstamp: number;
    private totalElapsedTime: number = 0;
    private _state: ClockState = ClockState.Idle;

    public start(): void {
        if (this._state === ClockState.Stopped) {
            throw Error('Clock already stopped.');
        }
        this._state = ClockState.Running;
    }
    public stop(): void {
        if (this._state === ClockState.Idle) {
            throw Error('Clock not started.');
        }
        if (this._state === ClockState.Stopped) {
            throw Error('Clock already stopped.');
        }
        this._state = ClockState.Stopped;
    }
    public tick(timestamp: number): void {
        if (this._state === ClockState.Idle) {
            console.log('Ticking a not started clock');
        }
        if (this._state === ClockState.Stopped) {
            console.log('Ticking a stopped clock');
        }
        if (this._state === ClockState.Paused) {
            console.log('Ticking a pasued clock');
        }
        if (this.lastTimstamp === undefined) {
            this.lastTimstamp = timestamp;
        }

        this.elapsedFromLastLoop = timestamp - this.lastTimstamp;
        this.totalElapsedTime += this.elapsedFromLastLoop;
        this.lastTimstamp = timestamp;
    }
    public pause(): void {
        if (this._state === ClockState.Paused) {
            throw Error('Pausing a paused clock');
        }
        if (this._state === ClockState.Idle) {
            console.log('Pausing a not started clock');
        }
        if (this._state === ClockState.Stopped) {
            console.log('Pausing a stopped clock');
        }
        this._state = ClockState.Paused;
        this.lastTimstamp = undefined;
        this.elapsedFromLastLoop = 0;
    }
    public resume(): void {
        if (this._state === ClockState.Running) {
            throw Error('Resuming a running clock');
        }
        if (this._state === ClockState.Idle) {
            console.log('Resuming a not started clock');
        }
        if (this._state === ClockState.Stopped) {
            console.log('Resuming a stopped clock');
        }
        this._state = ClockState.Running;
    }
    public time(): number {
        return this.totalElapsedTime;
    }
    public state(): ClockState {
        return this._state;
    }
    public elapsed(): number {
        return this.elapsedFromLastLoop;
    }
}
