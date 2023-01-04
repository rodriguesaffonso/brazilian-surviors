# brazilian-survivors

TODO
- enemy progression: time triggered upgrades
- player progression: stage triggered progression (pop up selection)
- objects might drop collectatable items (collectable component)
- make upgrade progression event driven
- refactor base objects config to better apply upgrades
- camera and player using the same components
- object colision: enemies colide and dont stack on top of each other

BUG
- Last triangle are colored with white when game is paused
- Visor animation reset when moving only up or down
- Magic Pistol: Bullet dont move after spawned and after some delay
- Magic Pistol: bullet stop when first bullet kills the enemy quickly

DONE
- player health bar
- Magic bullet: bullet does not follow anymore, it just go in straight line
- responsive canvas size
- add upgrade component
- Manage timer when there is tabs switch or apps switchs
- fix game end when player dead
- adds pause and resume features (popup, pause game, correct amange timestamp btw loops)
- magic bullet can hit any enemy on the way
- Kill marker on screen
- Remove old gun and bullet weapons
- New weapon: Magic Pistol
- create world horion limit: delete enemies far beyond the far limit (only for triangle and bullet)
- Gun: add cooldown and add new bullet every cooldown interval (add into game object array)
- Bullet: add duration and destroy it after that (remove from game object array)
- add direction vector in physics component
- make all components abstract classes instead of interfaces
- pass time to game loop update function
- leave update call to the base GameObject class
- getPosition in GameObject class
- move method in physics component
