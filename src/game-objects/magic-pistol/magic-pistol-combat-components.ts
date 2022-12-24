import { CombatComponent, CommandParms } from "../../components";
import { GameObject } from "../../interfaces";
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

    public cooldownTimeout: number;

    public range: number;
    public attackingEnemy: GameObject;

    constructor() {
        super({
            amount: 2,
            cooldown: 1000
        });
        this.state = MagicPistolState.ReadyToShoot;
        this.bulletIntervalMs = 100;
        this.bulletIntervalTimeout = this.bulletIntervalMs;
        this.cooldownTimeout = this.cooldown;
        this.range = 200;
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
            const enemy = this.getCloseEnemy(pistol);
            if (!enemy) {
                this.toOnCooldownState();
            }

            const bullet = createMagicPistolBullet(pistol, enemy, params.game);

            if (pistol.bullets.length === this.amount) {
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
        if (pistol.bullets.length !== 0) return;

        // Check if there is close a close enemy
        const enemy = this.getCloseEnemy(pistol);
        if (enemy) {
            this.toShootingState();
        }
    }

    private toShootingState(): void {
        this.bulletIntervalTimeout = this.bulletIntervalMs;
        this.state = MagicPistolState.Shooting;
    }

    private getCloseEnemy(pistol: MagicPistol): GameObject {
        const enemies = pistol.world.enemies
            .map(enemy => {
                return {
                    enemy, dist: pistol.player.getPosition().sub(enemy.getPosition()).modulo()
                }
            })
            .sort((a, b) => a.dist - b.dist);

        for (const { enemy } of enemies) {
            const distToPlayer = pistol.player.getPosition().sub(enemy.getPosition()).modulo();
            if (distToPlayer <= this.range) {
                return enemy;
            }
        }
        return undefined;
    }
}
