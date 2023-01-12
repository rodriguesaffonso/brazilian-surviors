export class Timer {
  private intraElapsed: number;
  private lastTimestamp: number;
  private startTimestamp: number;
  private gameLoopTimeMs: number;
  private totalElapsedTime: number;

  public start(): void {
    this.gameLoopTimeMs = 10;
    this.intraElapsed = 0;
    this.totalElapsedTime = 0;
    this.lastTimestamp = Date.now();
    this.startTimestamp = this.lastTimestamp;
  }

  public beforeLoop(): number {
    const now = Date.now();
    const elapsed = now - this.lastTimestamp;
    this.totalElapsedTime += elapsed;
    return elapsed > this.gameLoopTimeMs ? now : undefined;
  }

  public afterLoop(timestamp: number): void {
    this.lastTimestamp = timestamp;
  }

  public getTotalElapsedTime(): number {
    return this.totalElapsedTime;
  }

  public getElapsedLoopTime(time: number): number {
    return time - this.lastTimestamp;
  }

  public pause(): void {
    this.intraElapsed = Date.now() - this.lastTimestamp;
  }

  public resume(): void {
    this.lastTimestamp = Date.now() - this.intraElapsed;
  }
}