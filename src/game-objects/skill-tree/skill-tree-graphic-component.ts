import { CommandParms, GraphicComponent } from "../../components";
import { Vector2D } from "../../utils";
import { SkillPath } from "./interfaces";
import { SkillTree } from "./skill-tree";

export class SkillTreeGraphicComponent extends GraphicComponent {
  public radius: number;
  private margin: number;
  private distBtwIcon: number;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
    this.radius = 5;
    this.margin = 10;
    this.distBtwIcon = 5;
  }

  public update(skillTree: SkillTree, params: CommandParms): void {
    const paths = skillTree.getActivePaths();
    if (paths.length === 0) return;

    const cw = params.game.camera.canvasWidth;
    for (let i = 0; i < paths.length; i++) {
      const position = new Vector2D(cw - (i * this.distBtwIcon + (2 * i + 1) * this.radius + this.margin), this.margin + this.radius + params.game.hudCanvas.progressBar.totalHeight());
      this.drawPathIcon(paths[i], position);
    }
  }

  public drawPathIcon(path: SkillPath, p: Vector2D, ctx: CanvasRenderingContext2D = this.ctx): void {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = path.nodeColor;
    ctx.beginPath();
    ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
