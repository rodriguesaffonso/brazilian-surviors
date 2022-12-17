import { InputComponent } from "../../components/input-components";
import {  Vector2D } from "../interfaces";
import { PlayerPhysicsComponent } from "./physics-components";
import { Player } from "./player";

export class PlayerInputComponent implements InputComponent {
    private keyStates: Record<string, boolean> = {};
    private physicsComponent: PlayerPhysicsComponent;

    constructor(physics: PlayerPhysicsComponent) {
        this.physicsComponent = physics;
    }

    public update(player: Player): void {
        let vx: number, vy: number;
        vy = this.keyStates['w'] ? -1 : this.keyStates['s'] ? 1 : 0;
        vx = this.keyStates['a'] ? -1 : this.keyStates['d'] ? 1 : 0;
        this.physicsComponent.setVelocityDirection(new Vector2D(vx, vy));
    }

    public onKeyEvent(event: KeyboardEvent): void {
        if (event.type === "keydown") {
            this.handleInput(event.key, true);
        }
        else if (event.type === "keyup") {
            this.handleInput(event.key, false);
        }
        else {
            console.log("unknown event type", event);
        }
    }

    public start(): void {
        window.addEventListener("keydown", this.onKeyEvent.bind(this));
        window.addEventListener("keyup", this.onKeyEvent.bind(this));
    }

    public stop(): void {
        window.removeEventListener("keydown", this.onKeyEvent.bind(this));
        window.removeEventListener("keyup", this.onKeyEvent.bind(this));
    }

    private handleInput(key: string, isPressed: boolean): void {
        if (this.isValidKey(key)) this.keyStates[key] = isPressed
    }

    private isValidKey(key: string): boolean {
        return ['w', 'a', 's', 'd'].includes(key);
    }
}