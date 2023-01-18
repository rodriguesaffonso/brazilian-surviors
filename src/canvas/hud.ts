import { CommandParms } from "../components";
import { Canvas } from "./canvas";

export class HudCanvas extends Canvas {
  private static canvas: HudCanvas;
  public progressBar = {
    margin: 2,
    borderSize: 0,
    height: 15,
    totalHeight: function () {
      return (this.margin + this.borderSize + this.height / 2) * 2;
    }
  }

  public static getCanvas(): HudCanvas {
    if (!this.canvas) {
      HudCanvas.canvas = new HudCanvas('#gameHud');
    }
    return this.canvas;
  }

  public static remove(): void {
    HudCanvas.canvas.removeElement();
    HudCanvas.canvas = undefined;
  }

  public update(params: CommandParms): void {
    super.update(params);
    this.render(params);
  }

  private render(params: CommandParms): void {
    const game = params.game;
    this.ctx.fillStyle = "white";

    const drawLevelProgress = () => {
      const currentLevel = game.upgradeManager.level;
      const levelPerc = (game.gemsCollected - game.upgradeManager.totalGemsToLevel(currentLevel - 1)) / game.upgradeManager.gemsToLevel(currentLevel);

      const bckgBarColor = "#394D44";
      const barColor = "#8DAA9D";
      this.ctx.save();
      this.ctx.fillStyle = bckgBarColor;
      this.ctx.fillRect(this.progressBar.margin, this.progressBar.margin, this.width - this.progressBar.margin * 2, this.progressBar.height);
      this.ctx.fillStyle = barColor;
      this.ctx.fillRect(this.progressBar.margin, this.progressBar.margin, (this.width - this.progressBar.margin * 2) * levelPerc, this.progressBar.height);
      this.ctx.restore();
    }

    const drawTime = () => {
      const totalTime = game.clock.getTotalElapsedTime();
      const min = Math.floor(totalTime / 1000 / 60);
      const sec = Math.floor(totalTime / 1000 - min * 60);
      const timeLeft = game.gameOverAfterMs - totalTime;

      this.ctx.save();
      if (timeLeft < 10 * 1000) { // Last 10s countdown
        // Glowing countdown
        const phase = timeLeft > 5 * 1000 ? 1000 : 500; // First 5s slow glow, last 5s fast glow
        const ms = totalTime % phase;
        const frames = [
          { color: "#FFFFFF", fontSize: '16', offset: 15 },

          { color: "#FBDDDD", fontSize: '17', offset: 16 },
          { color: "#F7BCBA", fontSize: '18', offset: 17 },
          { color: "#F29A98", fontSize: '19', offset: 18 },
          { color: "#EE7975", fontSize: '20', offset: 19 },

          { color: "#EA5753", fontSize: '21', offset: 20 },

          { color: "#EE7975", fontSize: '20', offset: 19 },
          { color: "#F29A98", fontSize: '19', offset: 18 },
          { color: "#F7BCBA", fontSize: '18', offset: 17 },
          { color: "#FBDDDD", fontSize: '17', offset: 16 },
        ];
        const frameIndex = Math.floor(ms * frames.length / phase);
        const currentFrame = frames[frameIndex];

        this.ctx.fillStyle = currentFrame.color;
        this.ctx.font = `${currentFrame.fontSize}px serif`;
        this.ctx.fillText(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, game.camera.canvasWidth / 2 - currentFrame.offset, 5 + currentFrame.offset + this.progressBar.totalHeight());
      } else {
        this.ctx.fillStyle = 'white';
        this.ctx.font = "16px serif";
        this.ctx.fillText(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, game.camera.canvasWidth / 2 - 15, 20 + this.progressBar.totalHeight());
      }
      this.ctx.restore();
    }

    const drawKills = () => {
      this.ctx.font = "16px serif";
      this.ctx.fillText(`Kills: ${game.kills}`, 10, 20 + this.progressBar.totalHeight());
    }

    const drawGems = () => {
      this.ctx.save();
      this.ctx.font = "16px serif";
      this.ctx.fillText(`Gems: ${game.gemsCollected}`, 10, 40 + this.progressBar.totalHeight());
      this.ctx.restore();
    }

    drawTime();
    drawKills();
    drawGems();
    drawLevelProgress();
    game.skillNotificationManager.update(params);
  }
}