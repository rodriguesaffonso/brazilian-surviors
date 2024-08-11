import { GameRender } from "./v2/render/GameRender";
import { GameCanvas } from "./v2/canvas/GameCanvas";
import { Clock } from "./v2/clock/Clock";
import { GameObjectList } from "./v2/game-objects/GameObjectList";
import { IGame } from "./v2/game/IGame";
import { Game } from "./v2/game/Game";
import { KeyboardInputComponent } from "./v2/components/KeyboardInputComponent";
import { Player } from "./v2/game-objects/player/Player";
import { World } from "./v2/game-objects/world/World";
import { Enemy } from "./v2/game-objects/enemy/Enemy";

function createGame(): IGame {
    const clock = new Clock();
    const objects = new GameObjectList();
    const canvas = GameCanvas.getCanvas();
    const render = GameRender.create({ clock, gameObjects: objects, gameCanvas: canvas });
    const game = Game.create({
        clock,
        objects,
        canvas,
        render,
    });
    render.setGame(game);
    return game;
}

function init() {
    const game = createGame();

    const world = World.create(game.canvas.ctx);
    game.objects.add(world);
    
    const keyboardInputComponent = new KeyboardInputComponent();
    const player = Player.create(game.canvas.ctx, keyboardInputComponent);
    game.objects.add(player);

    const enemy = Enemy.create(game.canvas.ctx);
    game.objects.add(enemy);
        
    keyboardInputComponent.enable();
    game.render.start();
}
init();
