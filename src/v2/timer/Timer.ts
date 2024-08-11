import { ITimer } from "./ITimer";
import { TimerState } from "./TimerState";
import { Events } from "../../utils";
import { IClock } from "../clock/IClock";
import { IComponentUpdateParams } from "../components/IComponentUpdateParams";
import { GameObject } from "../game-objects/GameObject";

export class Timer extends GameObject implements ITimer {
    private timeoutMs: number;
    private startedAt: number;
    private clock: IClock;
    private state: TimerState;

    constructor(clock: IClock, timeoutMs: number) {
        super({});
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
