import { ITimer } from "./ITimer";
import { Events } from "../../utils";
import { IClock } from "../clock/IClock";
import { GameObject } from "../game-objects/GameObject";
import { GameObjectKind } from "../game-objects/GameObjectKind";
import { IComponentUpdateParams } from "../components/Component";

export enum TimerState {
    Idle,
    Running,
    Finished
}

export class Timer extends GameObject implements ITimer {
    private timeoutMs: number;
    private startedAt: number;
    private clock: IClock;
    private state: TimerState;

    constructor(clock: IClock, timeoutMs: number) {
        super({}, GameObjectKind.Timer);
        this.clock = clock;
        this.timeoutMs = timeoutMs;
        this.state = TimerState.Idle;
    }

    public start(): Timer {
        if (this.state !== TimerState.Idle) {
            throw Error('Timer must be in Idle state to start.');
        }
        this.startedAt = this.clock.time();
        this.state = TimerState.Running;
        this.emit(Events.Timer_Started);
        return this;
    }

    public cancel(): Timer {
        this.state = TimerState.Idle;
        this.startedAt = undefined;
        this.emit(Events.Timer_Cancelled);
        return this;
    }

    public update(_: IComponentUpdateParams) {
        if (this.state === TimerState.Idle) {
            throw Error('Timer must be started before run.');
        }
        if (this.state === TimerState.Finished) {
            return;
        }
        const elapsed = this.clock.time() - this.startedAt;
        if (elapsed >= this.timeoutMs) {
            this.emit(Events.Timer_TimeoutFinished);
            this.state = TimerState.Finished;
        }
    }
}
