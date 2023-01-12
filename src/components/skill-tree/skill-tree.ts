import { Game } from "../../game";
import { Vector2D } from "../../utils";
import { SkillPath } from "./interfaces";
import { MagnetRangeSkillPath } from "./paths/magnet-range";
import { MaxHealthSkillPath } from "./paths/max-health";
import { NumberProjectilesSkillPath } from "./paths/number-projectiles";
import { SpeedSkillPath } from "./paths/speed";

export class SkillTree {
  private paths: SkillPath[];
  private maxOffers: number;

  constructor() {
    this.paths = [
      new MaxHealthSkillPath(),
      new SpeedSkillPath(),
      new NumberProjectilesSkillPath(),
      new MagnetRangeSkillPath(),
    ]
    this.maxOffers = 1;
  }

  public offers(): SkillPath[] {
    const possibleOffers = [];
    for (const path of this.paths) {
      if (!path.isComplete()) {
        possibleOffers.push(path);
      }
    }

    return possibleOffers
      .sort(() => Math.random() > 0.5 ? 1 : -1)
      .slice(0, this.maxOffers);
  }

  public apply(path: SkillPath, g: Game): void {
    if (path.isComplete) {
      throw Error('You cannot apply a new skill to a complete skill path');
    }

    path.apply(g);
  }

  public visibleTree(): SkillPath[] {
    const paths: SkillPath[] = [];
    for (const path of this.paths) {
      if (!path.isLocked()) {
        paths.push(path);
      }
    }
    return paths;
  }

  public drawOnPause(g: Game): void {
    const { ctx } = g;

    const nodeRadius = 10;

    const drawTreeNode = (nodeColor: string, nodePosition: Vector2D, nodeBorderColor = 'white') => {
      ctx.save();

      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(nodePosition.x, nodePosition.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = 'white'
      ctx.beginPath();
      ctx.arc(nodePosition.x, nodePosition.y, nodeRadius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.restore();
    }

    const drawStartNode = (position: Vector2D) => {
      drawTreeNode('#0D0D0D', position);
    }

    const topPosition = new Vector2D(g.camera.canvasWidth / 2, g.camera.canvasHeight / 2 - 70);
    drawStartNode(topPosition);
    const visiblePaths = this.visibleTree();

    if (visiblePaths.length === 0) return;
    const distBtwNodes = new Vector2D(
      visiblePaths.length === 1 ? 0 : Math.min(50, (0.9 * g.camera.canvasWidth - 2 * nodeRadius) / (visiblePaths.length - 1)),
      50
    );

    const drawSkillPath = (startPosition: Vector2D, path: SkillPath) => {
      const visiblePath = path.visiblePath();
      let lastPosition = startPosition;
      for (let i = 0; i < visiblePath.length; i++) {
        const nodePosition = new Vector2D(startPosition.x, startPosition.y + i * distBtwNodes.y);
        drawTreeNode(
          visiblePath[i].isLocked() ? 'gray' : path.nodeColor,
          nodePosition
        );
        drawLineBtwNodes(lastPosition, nodePosition);
        lastPosition = nodePosition;
      }
    }

    const drawLineBtwNodes = (nodePositionA: Vector2D, nodePositionB: Vector2D) => {
      const dist = nodePositionB.sub(nodePositionA).modulo();
      const p = nodeRadius / dist;
      const p1 = nodePositionA.multiply(1 - p).add(nodePositionB.multiply(p));
      const p2 = nodePositionB.multiply(1 - p).add(nodePositionA.multiply(p));

      ctx.save();
      ctx.strokeStyle = 'white';
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }

    // Left most X position for the path to start
    const startOffset = new Vector2D(- (visiblePaths.length - 1) * distBtwNodes.x / 2, distBtwNodes.y);
    for (let i = 0; i < visiblePaths.length; i++) {
      // X start position of the current path (added offset) 
      const startPathPosition = topPosition.add(startOffset).add(new Vector2D(i * distBtwNodes.x, 0));
      drawLineBtwNodes(topPosition, startPathPosition);
      drawSkillPath(startPathPosition, visiblePaths[i]);
    }
  }
}