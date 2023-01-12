import { Game } from "../../game";

export enum SkillKind {
  MaxHealth = 'MH',
  HealthRegen = 'HR',
  Speed = 'SP',
  NumberProjectiles = 'NP',
  WeaponDamage = 'WD',
  ProjectileSpeed = 'PS',
  ProjectilePiercing = 'PP',
  XpAmount = 'XP',
  MagnetRange = 'MR'
}

export abstract class SkillNode {
  public next: SkillNode;
  public kind: SkillKind;
  protected locked: boolean;
  protected applied: boolean;

  constructor(kind: SkillKind) {
    this.kind = kind;
    this.next = undefined;
    this.applied = false;
    this.locked = true;
  }

  public apply(game: Game): void { throw Error('NYI'); }
  public description(): string { throw Error('NYI'); }

  public unlock(): void { this.locked = false; }
  public isLocked(): boolean { return this.locked; }
}

export abstract class SkillPath {
  protected begin: SkillNode;
  protected current: SkillNode;

  constructor(path: SkillNode[]) {
    if (path.length === 0) {
      throw Error('SkillPath needs to have at least 1 node');
    }
    this.begin = path[0];
    this.current = this.begin;
    for (let i = 1; i < path.length; i++) {
      const node = path[i];
      this.current.next = node;
      this.current = node;
    }
    this.current = this.begin;
  }

  public visiblePath(): SkillNode[] {
    const path: SkillNode[] = [this.begin];

    let node = this.begin;
    while (node !== undefined) {
      if (node.isLocked()) {
        break;
      }

      node = node.next;
      if (node !== undefined) {
        path.push(node);
      }
    }
    return path;
  }

  public isComplete(): boolean {
    return this.current === undefined;
  }

  public apply(g: Game): void {
    if (this.isComplete()) return;

    this.current.unlock();
    this.current.apply(g);
    this.current = this.current.next;
  }

  public nextUpgrade(): SkillNode {
    if (this.isComplete()) return undefined;

    return this.current;
  }
}
