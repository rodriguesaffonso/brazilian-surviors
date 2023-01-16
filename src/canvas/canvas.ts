import { CommandParms } from "../components";
import { getCanvasSize } from "../utils";

export abstract class Canvas {
  private width: number;
  private height: number;
  
  private docElement: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;

  constructor(docId: string) {
    this.docElement = document.querySelector(docId);
    this.ctx = this.docElement.getContext("2d");

    const ws = getCanvasSize();
    this.width = ws.width;
    this.height = ws.height;
    
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;
  }

  public update(params: CommandParms): void {
    this.clear();
  }

  protected removeElement(): void {
    this.docElement.width = 0;
    this.docElement.height = 0;
  }

  protected clear(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

