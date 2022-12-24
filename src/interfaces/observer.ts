export type ObserverEventCallback = () => void;

export enum Events {
  ObjectDead = 1
}

export abstract class Observer {
  private cbsByEvent: Map<Events, ObserverEventCallback[]>;

  constructor() {
    this.cbsByEvent = new Map();
  }

  public on(event: Events, cb: ObserverEventCallback): void {
    let cbs = this.cbsByEvent.get(event);
    if (cbs === undefined) {
      cbs = [];
      this.cbsByEvent.set(event, cbs);
    }

    cbs.push(cb);
  }

  public emit(event: Events): void {
    for (const cb of this.cbsByEvent.get(event) || []) {
      cb();
    }
  }

  // TODO: How to handle remove observer and callbacks?
}