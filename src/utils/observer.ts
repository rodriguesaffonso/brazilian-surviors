export type ObserverEventCallback = (params?: any) => void;

export enum IEvents {

};

export enum Events {
  ObjectDead = 1,
  ItemCollected,
  NextTimestamp,
  DamageDone,

  Timer_Started,
  Timer_TimeoutFinished,
  KeyboardInputComponent_Enabled,
  KeyboardInputComponent_Disabled,

  PlayerInputComponent_MovingDirectionUpdate,
  PlayerInputComponent_MovingUpPressed,
  PlayerInputComponent_MovingUpReleased,
  PlayerInputComponent_MovingDownPressed,
  PlayerInputComponent_MovingDownReleased,
  PlayerInputComponent_MovingRightPressed,
  PlayerInputComponent_MovingRightReleased,
  PlayerInputComponent_MovingLeftPressed,
  PlayerInputComponent_MovingLeftReleased,

  CollisionComponent_Collision,
  PlayerCollisionComponent_Collision,
  EnemyCollisionComponent_CollidingWithPlayer,
}

export abstract class Observer {
  private cbsByEvent: Map<Events, ObserverEventCallback[]>;

  constructor() {
    this.cbsByEvent = new Map();
  }

  public on(event: Events, cb: ObserverEventCallback): Observer {
    let cbs = this.cbsByEvent.get(event);
    if (cbs === undefined) {
      cbs = [];
      this.cbsByEvent.set(event, cbs);
    }

    cbs.push(cb);

    return this;
  }

  public emit(event: Events, params?: any): void {
    for (const cb of this.cbsByEvent.get(event) || []) {
      cb(params);
    }
  }

  public clear(): void {
    this.cbsByEvent.clear();
  }

  // TODO: How to handle remove observer and callbacks?
}