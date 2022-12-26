import { InputComponent } from "../../components";
import { Vector2D } from "../../utils";
import { PlayerPhysicsComponent, Player } from ".";

enum InputType {
    Keyboard = 1,
    Touch
}

export class PlayerInputComponent extends InputComponent {
    private inputType: InputType;
    private keyStates: Record<string, boolean> = {};
    private nextVelocityDirection: Vector2D;
    private physicsComponent: PlayerPhysicsComponent;

    private canvasElement: HTMLElement;

    constructor(physics: PlayerPhysicsComponent) {
        super();
        this.canvasElement = document.getElementById('gameCanvas');
        this.physicsComponent = physics;
        this.inputType = InputType.Keyboard;
        this.nextVelocityDirection = Vector2D.zero();
        this.start();
    }

    public update(player: Player): void {
        this.physicsComponent.setVelocityDirection(this.nextVelocityDirection);
    }

    public onKeyEvent(event: KeyboardEvent): void {
        this.inputType = InputType.Keyboard;
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

    public onTouchEvent(event: TouchEvent): void {
        this.inputType = InputType.Touch;
        if (event.type === 'touchmove') {
            if (event.touches.length > 1) return;
    
            const touch = event.touches[0];
            const touchPosition = new Vector2D(
                touch.pageX,
                touch.pageY
            );

            const canvasPosition = new Vector2D(
                window.screenX + this.canvasElement.getBoundingClientRect().left,
                window.screenY + this.canvasElement.getBoundingClientRect().top,
            );
            
            const positionOnCanvas = touchPosition.sub(canvasPosition);
            const velocityDirection = positionOnCanvas.sub(new Vector2D(400, 400));
            this.nextVelocityDirection = velocityDirection;
        }
        else if (event.type === 'touchend') {
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
        this.canvasElement.addEventListener('touchmove', this.onTouchEvent.bind(this));
        this.canvasElement.addEventListener('touchend', this.onTouchEvent.bind(this));
    }

    public stop(): void {
        // Keyboard events
        window.removeEventListener("keydown", this.onKeyEvent.bind(this));
        window.removeEventListener("keyup", this.onKeyEvent.bind(this));

        // Touch events
        this.canvasElement.addEventListener('touchmove', this.onTouchEvent.bind(this));
        this.canvasElement.addEventListener('touchend', this.onTouchEvent.bind(this));
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


}