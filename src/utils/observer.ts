export type ObserverEventCallback = (params?: any) => void;

export enum Events {
  ObjectDead = 1,
  ItemCollected,
  NextTimestamp,
  DamageDone
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