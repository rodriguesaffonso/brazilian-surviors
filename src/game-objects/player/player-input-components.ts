import { InputComponent } from "../../components";
import { Vector2D } from "../../utils";
import { PlayerPhysicsComponent, Player } from ".";

enum InputType {
    Keyboard = 1,
    Touch
}

export class PlayerInputComponent extends InputComponent {
    private keyStates: Record<string, boolean> = {};
    private nextVelocityDirection: Vector2D;
    private physicsComponent: PlayerPhysicsComponent;

    private startTouchPosition: Vector2D;

    constructor(physics: PlayerPhysicsComponent) {
        super();
        this.physicsComponent = physics;
        this.nextVelocityDirection = Vector2D.zero();
        this.start();
    }

    public update(player: Player): void {
        this.physicsComponent.setVelocityDirection(this.nextVelocityDirection);
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

    public resetKeyStates(): void {
        this.keyStates = {};
        this.nextVelocityDirection = Vector2D.zero();
    }

    public onTouchEvent(event: TouchEvent): void {
        if (event.touches.length > 1) return;
        const touch = event.touches[0];

        if (event.type === 'touchstart') {
            this.startTouchPosition = this.getTouchPosition(touch);
        }
        else if (event.type === 'touchmove') {
            const touchPosition = this.getTouchPosition(touch);
            this.nextVelocityDirection = touchPosition.sub(this.startTouchPosition);
        }
        else if (event.type === 'touchend') {
            this.startTouchPosition = Vector2D.zero();
            this.nextVelocityDirection = Vector2D.zero();
        }
        else {
            console.log('unknow touch event type');
        }
    }

    public start(): void {
        // Keyboard events
        window.addEventListener("keydown", this.onKeyEvent.bind(this));
        window.addEventListener("keyup", this.onKeyEvent.bind(this));

        // Touch events
        window.addEventListener('touchstart', this.onTouchEvent.bind(this));
        window.addEventListener('touchmove', this.onTouchEvent.bind(this));
        window.addEventListener('touchend', this.onTouchEvent.bind(this));
    }

    public stop(): void {
        // Keyboard events
        window.removeEventListener("keydown", this.onKeyEvent.bind(this));
        window.removeEventListener("keyup", this.onKeyEvent.bind(this));

        // Touch events
        window.addEventListener('touchmove', this.onTouchEvent.bind(this));
        window.addEventListener('touchend', this.onTouchEvent.bind(this));
    }

    private handleInput(key: string, isPressed: boolean): void {
        if (this.isValidKey(key)) {
            this.keyStates[key] = isPressed;

            this.nextVelocityDirection = new Vector2D(
                this.keyStates['a'] ? -1 : this.keyStates['d'] ? 1 : 0,
                this.keyStates['w'] ? -1 : this.keyStates['s'] ? 1 : 0
            );
        }
    }

    private isValidKey(key: string): boolean {
        return ['w', 'a', 's', 'd'].includes(key);
    }

    private getTouchPosition(t: Touch): Vector2D {
        return new Vector2D(t.pageX, t.pageY);
    }

}