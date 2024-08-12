import { Canvas } from "./Canvas";

export class GameCanvas extends Canvas {
  private static canvas: GameCanvas;

  public static getCanvas(): GameCanvas {
    if (!this.canvas) {
      GameCanvas.canvas = new GameCanvas('#gameCanvas');
    }
    return this.canvas;
  }

  public static remove(): void {
    GameCanvas.canvas.removeElement();
    GameCanvas.canvas = undefined;
  }
}