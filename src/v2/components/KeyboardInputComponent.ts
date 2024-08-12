import { InputComponent } from "./InputComponent";
import { Events } from "../../utils";

export class KeyboardInputComponent extends InputComponent {
    public enable(): void {
        this.emit(Events.KeyboardInputComponent_Enabled);
    }

    public disable(): void {
        this.emit(Events.KeyboardInputComponent_Disabled);
    }
}
