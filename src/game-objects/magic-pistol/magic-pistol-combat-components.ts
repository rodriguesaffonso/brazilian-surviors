import { CombatComponent, CommandParms } from "../../components";
import { Game } from "../../game";
import { GameObject, GameObjectKind } from "../../utils";
import { MagicPistol } from "./magic-pistol";
import { createMagicPistolBullet } from "./magic-pistol-bullet";

enum MagicPistolState {
    Shooting,
    OnCooldown,
    ReadyToShoot
};

export class MagicPistolCombatComponent extends CombatComponent {
    public state: MagicPistolState;

    public bulletIntervalMs: number;
    public bulletIntervalTimeout: number;
    public bulletsShoot: number;

    public cooldownTimeout: number;

    public range: number;
    public attackingEnemy: GameObject;

    constructor() {
        super({
            amount: 2,
            cooldown: 1200
        });
        this.state = MagicPistolState.ReadyToShoot;
        this.bulletIntervalMs = 150;
        this.bulletIntervalTimeout = this.bulletIntervalMs;
        this.cooldownTimeout = this.cooldown;
        this.range = 200;
        this.bulletsShoot = 0;
    }

    public update(pistol: MagicPistol, params: CommandParms): void {
        if (this.state === MagicPistolState.Shooting) {
            this.handleShooting(pistol, params);
        }
        else if (this.state === MagicPistolState.OnCooldown) {
            this.handleOnCooldown(pistol, params);
        }
        else if (this.state === MagicPistolState.ReadyToShoot) {
            this.handleReadyToShoot(pistol, params);
        }
    }
    private handleShooting(pistol: MagicPistol, params: CommandParms): void {
        this.bulletIntervalTimeout -= params.elapsedMs;
        if (this.bulletIntervalTimeout <= 0) {
            // Add new bullet to pistol.bullets array (needs the delete on killed method to remove them from the array)
            const enemy = this.getCloseEnemy(params.game);
            if (!enemy) {
                this.toOnCooldownState();
                return;
            }

            createMagicPistolBullet(pistol, enemy, params.game);
            this.bulletsShoot++;

            if (this.bulletsShoot === this.amount) {
                this.toOnCooldownState();
            } else {
                // There is more bullets to shoot, reset bullet timeout
                this.bulletIntervalTimeout = this.bulletIntervalMs;
            }
        }
    }

    private toOnCooldownState(): void {
        this.cooldownTimeout = this.cooldown;
        this.state = MagicPistolState.OnCooldown;
    }

    private handleOnCooldown(pistol: MagicPistol, params: CommandParms): void {
        this.cooldownTimeout -= params.elapsedMs;
        if (this.cooldownTimeout <= 0) {
            this.toReadyToShootState();
        }
    }

    private toReadyToShootState(): void {
        this.state = MagicPistolState.ReadyToShoot;
    }

    private handleReadyToShoot(pistol: MagicPistol, params: CommandParms): void {
        // Check if there is close a close enemy
        const enemy = this.getCloseEnemy(params.game);
        if (enemy) {
            this.toShootingState();
        }
    }

    private toShootingState(): void {
        this.bulletsShoot = 0;
        this.bulletIntervalTimeout = this.bulletIntervalMs;
        this.state = MagicPistolState.Shooting;
    }

    private getCloseEnemy(g: Game): GameObject {
        const enemies = g.gameObjects
            .filter(obj => obj.kind === GameObjectKind.Triangle)
            .map(enemy => {
                return {
                    enemy, dist: g.player.getPosition().sub(enemy.getPosition()).modulo()
                }
            })
            .sort((a, b) => a.dist - b.dist);

        for (const { enemy } of enemies) {
            const distToPlayer = g.player.getPosition().sub(enemy.getPosition()).modulo();
            if (distToPlayer <= this.range) {
                return enemy;
            }
        }
        return undefined;
    }
}
