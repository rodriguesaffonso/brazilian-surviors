import { Events, getCanvasSize, Vector2D } from "../../../utils";
import { IGame } from "../../game/IGame";
import { Timer } from "../../timer/Timer";
import { Enemy } from "../enemy/Enemy";
import { EnemyPhysicComponent } from "../enemy/EnemyPhysicComponent";
import { GameObject } from "../GameObject";
import { GameObjectKind } from "../GameObjectKind";

export class EnemyGenerator extends GameObject {
    private game: IGame;
    private generateCooldown: number = 5000;
    private enemy: Enemy;
    private generateEnemyTimer: Timer;
    constructor(game: IGame) {
        super({}, GameObjectKind.EnemyGenerator);
        this.game = game;
        this.generateEnemy();
    }
    private generateEnemy(): void {
        this.generateEnemyTimer = new Timer(this.game.clock, this.generateCooldown);
        this.generateEnemyTimer.on(Events.Timer_TimeoutFinished, () => {
            if (this.game.objects.contains(this.enemy)) {
                this.game.removeGameObject(this.enemy);
                this.generateEnemy();
            }
        });
        this.game.queueTimer(this.generateEnemyTimer);

        this.enemy = Enemy.create(this.game.canvas.ctx, { physic: new EnemyPhysicComponent({ position: this.enemyPosition() }) });
        this.enemy.healthComponent.on(Events.HealthComponent_Dead, () => {
            if (this.game.objects.contains(this.enemy)) {
                this.game.removeGameObject(this.enemy);
                this.game.cancelTimer(this.generateEnemyTimer);
                this.generateEnemy();
            }
        });
        this.game.addGameObject(this.enemy);
    }
    private enemyPosition(): Vector2D {
        const ws = getCanvasSize();
        const offset = 0.2;
        const wsVector = new Vector2D(ws.width, ws.height);
        const randomPos = new Vector2D(Math.random(), Math.random());
        const position = new Vector2D(wsVector.x * (1 - 2 * offset) * randomPos.x, wsVector.y * (1 - 2 * offset) * randomPos.y);
        return position;
    }
}