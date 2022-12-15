export class InputHandler {
    public keyStates: Record<string, boolean> = {};
    
    public attach(): void {
        window.addEventListener("keydown", this.onKeyEvent.bind(this));
        window.addEventListener("keyup", this.onKeyEvent.bind(this));
    }

    public release(): void {
        window.removeEventListener("keydown", this.onKeyEvent.bind(this));
        window.removeEventListener("keyup", this.onKeyEvent.bind(this));
    }
    
    public clear(): void {
        this.keyStates = {};
    }

    public onKeyEvent(event: any): void {
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

    private handleInput(key: string, isPressed: boolean): void {
        if (this.isValidKey(key)) this.keyStates[key] = isPressed
    }

    private isValidKey(key: string): boolean {
        return ['w', 'a', 's', 'd'].includes(key);
    }
}