import { Events, Vector2D } from "../../../utils";
import { InputComponent } from "../../components/InputComponent";
import { KeyboardInputComponent } from "../../components/KeyboardInputComponent";
import { Player } from "./Player";

const Keys = {
    MoveUp: 'w',
    MoveDown: 's',
    MoveLeft: 'a',
    MoveRight: 'd',
}

const keyboardEventMap = new Map([
    [Keys.MoveUp, [
        Events.PlayerInputComponent_MovingUpReleased,
        Events.PlayerInputComponent_MovingUpPressed,
    ]],
    [Keys.MoveDown, [
        Events.PlayerInputComponent_MovingDownReleased,
        Events.PlayerInputComponent_MovingDownPressed,
    ]],
    [Keys.MoveRight, [
        Events.PlayerInputComponent_MovingRightReleased,
        Events.PlayerInputComponent_MovingRightPressed,
    ]],
    [Keys.MoveLeft, [
        Events.PlayerInputComponent_MovingLeftReleased,
        Events.PlayerInputComponent_MovingLeftPressed,
    ]]
]);

export class PlayerInputComponent extends InputComponent {
    private keyStates: Record<string, boolean> = {};
    private onKeyEventBound: (e: KeyboardEvent) => void;

    constructor(keyboardComponent: KeyboardInputComponent) {
        super();
        this.onKeyEventBound = this.onKeyEvent.bind(this);
        keyboardComponent
            .on(Events.KeyboardInputComponent_Enabled, () => {
                console.log('On PlayerInputComponent KeyboardInputComponent_Enabled callback');
                this.enable();
            })
            .on(Events.KeyboardInputComponent_Disabled, () => {
                console.log('On PlayerInputComponent KeyboardInputComponent_Disabled callback');
                this.disable();
            });
    }

    public update(player: Player): void {
    }

    public onKeyEvent(event: KeyboardEvent): void {
        if (event.type === "keydown") {
            this.handleInput(event.key, true);
        }
        else if (event.type === "keyup") {
            this.handleInput(event.key, false);
        }
        else {
            console.log("unknown key event type", event);
        }
    }

    public enable(): void {
        // Keyboard events
        console.log('On enable');
        window.addEventListener("keydown", this.onKeyEventBound);
        window.addEventListener("keyup", this.onKeyEventBound);
    }

    public disable(): void {
        // Keyboard events
        console.log('On disable');
        window.removeEventListener("keydown", this.onKeyEventBound);
        window.removeEventListener("keyup", this.onKeyEventBound);
    }

    public getKeyStates(): Record<string, boolean> {
        return this.keyStates;
    }

    public getMovingDirection(): Vector2D {
        let x: number;
        let y: number;
        if (this.keyStates[Keys.MoveUp] === this.keyStates[Keys.MoveDown]) {
            y = 0;
        } else {
            y = this.keyStates[Keys.MoveUp] ? -1 : this.keyStates[Keys.MoveDown] ? 1 : 0;
        }
        if (this.keyStates[Keys.MoveRight] === this.keyStates[Keys.MoveLeft]) {
            x = 0;
        } else {
            x = this.keyStates[Keys.MoveRight] ? 1 : this.keyStates[Keys.MoveLeft] ? -1 : 0;
        }
        return new Vector2D(x, y);
    }

    private handleInput(key: string, isPressed: boolean): void {
        if (this.isValidKey(key)) {
            this.keyStates[key] = isPressed;
            this.emit(keyboardEventMap.get(key)[isPressed ? 1 : 0]);
        }
    }

    private isValidKey(key: string): boolean {
        return keyboardEventMap.has(key);
    }
}
