// import { Clock } from "./src/Clock";
// import { GameObjectList } from "./src/GameObjectList";
// import { GameRender } from "./src/GameRender";
// import { IClock } from "./src/IClock";

// let gameObjects: GameObjectList;
// let clock: IClock;

// beforeEach(() => {
//     gameObjects = new GameObjectList();
//     clock = new Clock();
//     jest.spyOn(gameObjects, 'update');
// });

// test('renderFrame updates game objects and requests next frame', () => {
//     const render = GameRender.create({ clock, gameObjects });
//     render.start();
//     expect(gameObjects.update).toHaveBeenCalled();
//     expect(global.requestAnimationFrame).toHaveBeenCalledWith((render as any).render);
// });
