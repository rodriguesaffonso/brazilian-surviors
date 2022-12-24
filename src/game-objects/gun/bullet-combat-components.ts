
import { CommandParms } from "../../components";
import { CombatComponent } from "../../components/combat-component";
import { CombatComponentParams } from "../../interfaces";
import { Bullet, BulletCombatComponent, BulletGraphicComponent, BulletPhysicsComponent } from "../bullet";
import { Camera } from "../camera";
import { World } from "../world";
import { Gun } from "./gun";

export class GunCombatComponent extends CombatComponent {
    public camera: Camera;
    public projectiles: number;
    public cooldownTimeout: number;
    public readyToAttack: boolean;
    
    public ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, camera: Camera, params: CombatComponentParams) {
        super({ coldown: params.coldown ?? 100 });
        this.camera = camera;
        this.ctx = ctx;
        this.projectiles = 3;
        this.cooldownTimeout = this.cooldown;
        this.readyToAttack = false;
    }

    public update(gun: Gun, params: CommandParms): void {
        this.decreaseCooldownTimeout(params);

        if (this.cooldownTimeout <= 0) {
            if (this.tryAddNewBullet(gun, params.world)) {
                this.readyToAttack = false;
            }
        }

        // remove dead bullets from this weapon array
        gun.weapons.forEach((bullet, index) => {
            if (bullet.combatComponent.dead) {
                gun.weapons.splice(index, 1);
            }
        });
        
        this.resetCooldown();
    }

    private tryAddNewBullet(gun: Gun, world: World): boolean {       
        if (this.readyToAttack && gun.weapons.length < this.projectiles) {
            const bullet = new Bullet(this.camera, world, gun, {
                physics: new BulletPhysicsComponent({ position: this.camera.getPosition() }), 
                combat: new BulletCombatComponent({}),
                graphic: new BulletGraphicComponent(this.ctx), 
            });
            
            // add in weapom array
            gun.weapons.push(bullet);
    
            // add in game object array in game class
            gun.addBulletToGameObjectArray(bullet);

            return true;
        }
        return false;
    }

    private decreaseCooldownTimeout(params: CommandParms): void {
        if (!this.readyToAttack) {
            this.cooldownTimeout -= params.elapsedMs;
            if (this.cooldownTimeout <= 0) {
                this.cooldownTimeout = 0;
                this.readyToAttack = true;
            }
        }
    }

    private resetCooldown(): void {
        if (!this.readyToAttack && this.cooldownTimeout <= 0) {
            this.cooldownTimeout = this.cooldown;
        }
    }
}
