import { Player } from "./actors";
import { AbstractObject, Vector2D } from "./interfaces";

export interface Command {
    execute(ator: AbstractObject): void;
    undo(ator: AbstractObject): void;
}

export abstract class KeyMovementCommand implements Command {
    protected direction: Vector2D;
    constructor(vector: Vector2D) { this.direction = vector; }
    public execute(actor: AbstractObject): void {
        actor.velocity = actor.velocity.add(this.direction);
    }
    public undo(actor: AbstractObject): void {
        actor.velocity = actor.velocity.add(this.direction.multiply(-1));
    }
}

class MoveUpCommand extends KeyMovementCommand {
    constructor() { super(new Vector2D(0, -1)); }
}

class MoveDownCommand extends KeyMovementCommand {
    constructor() { super(new Vector2D(0, 1)); }
}

class MoveRightCommand extends KeyMovementCommand {
    constructor() { super(new Vector2D(1, 0)); }
}

class MoveLeftCommand extends KeyMovementCommand {
    constructor() { super(new Vector2D(-1, 1)); }
}

export class InputHandler {
    public keyStates: Record<string, boolean> = {};
    public player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    public attach(): void {
        window.addEventListener("keydown", this.onKeyEvent.bind(this));
        window.addEventListener("keyup", this.onKeyEvent.bind(this));
    }

    public release(): void {
        window.removeEventListener("keydown", this.onKeyEvent.bind(this));
        window.removeEventListener("keyup", this.onKeyEvent.bind(this));
    }

    public onKeyEvent(event: any): void {
        const command = this.handleInput(event.key);
        if (event.type === "keydown") {
            if (command) {
                command.execute(this.player);
            }
        }
        else if (event.type === "keyup") {
            if (command) {
                command.undo(this.player);
            }
        }
        else {
            console.log("unknown event type", event);
        }
    }

    private handleInput(key: string): Command {
        if (key === 'w') return new MoveUpCommand();
        if (key === 's') return new MoveDownCommand();
        if (key === 'd') return new MoveRightCommand();
        if (key === 'a') return new MoveLeftCommand();
        return undefined;
    }
}