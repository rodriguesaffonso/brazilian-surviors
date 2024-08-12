import { CircleShape } from "../../components/Shapes";

export class EnemyShape extends CircleShape {
    constructor() {
        super({ color: 'black', radius: 5 });
    }
}
