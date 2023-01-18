import { CommandParms } from "../../components";
import { Game } from "../../game";
import { SkillNode, SkillPath } from "../../game-objects/skill-tree/interfaces";
import { SkillTreeGraphicComponent } from "../../game-objects/skill-tree/skill-tree-graphic-component";
import { Vector2D } from "../../utils";
import { Canvas } from "../canvas";

export interface SkillNotification {
  path: SkillPath,
  node: SkillNode
}

export class SkillNotificationManager {
  private skillNotifications: SkillNotification[];
  private currentNotification: SkillNotification;
  private timeout: number;
  private timeoutDefault: number;
  private canvas: Canvas;

  constructor(canvas: Canvas) {
      this.canvas = canvas;
      this.skillNotifications = [];
      this.currentNotification = undefined;
      this.timeoutDefault = 5000;
      this.timeout = this.timeoutDefault;
  }

  public add(notification: SkillNotification): void {
      if (!this.currentNotification) {
          this.currentNotification = notification;
      } else {
          this.skillNotifications.push(notification);
      }
  }

  public update(params: CommandParms): void {
      if (!this.currentNotification) return;

      const { elapsedMs, game } = params;
      this.timeout -= elapsedMs;

      if (this.timeout > 0) {
          this.drawCurrentNotification(game);
      } else {
          this.timeout = this.timeoutDefault;
          this.currentNotification = undefined;

          if (this.skillNotifications.length > 0) {
              this.currentNotification = this.skillNotifications.splice(0, 1)[0];
          }
      }
  }

  private drawCurrentNotification(g: Game): void {
      if (this.currentNotification) {
          const posY = g.camera.canvasHeight - 10;
          const component = (g.skillTree.graphicComponent as SkillTreeGraphicComponent);

          this.canvas.ctx.save();
          this.canvas.ctx.fillStyle = "rgba(50, 50, 50, 0.8)"; // gray half transparent
          this.canvas.ctx.fillRect(0, posY, g.camera.canvasWidth, g.camera.canvasHeight - posY - 27);
          this.canvas.ctx.fill();

          this.canvas.ctx.fillStyle = 'white';
          this.canvas.ctx.font = "italic 14px serif";
          this.canvas.ctx.fillText(this.currentNotification.node.description(), 30, posY);
          this.canvas.ctx.restore();

          component.drawPathIcon(this.currentNotification.path, new Vector2D(15, posY - component.radius), this.canvas.ctx);

          this.canvas.ctx.strokeStyle = 'white';
          this.canvas.ctx.beginPath();
          this.canvas.ctx.arc(g.camera.canvasWidth - 15, posY - component.radius, component.radius, - Math.PI / 2, 3 / 2 * Math.PI * (this.timeout / this.timeoutDefault));
          this.canvas.ctx.stroke();
      }
  }
}