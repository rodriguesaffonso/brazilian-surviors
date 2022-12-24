# brazilian-survivors

TODO
- magic bullet can hit any enemy on the way
- adds pause and resume features (popup, pause game, correct amange timestamp btw loops)
- Manage timer when there is tabs switch or apps switchs

BUG
- Visor animation reset when moving only up or down
- Bullet dont move after spawned and after some delay
- Magic Pistol: bullet stop when first bullet kills the enemy quickly

DONE
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
