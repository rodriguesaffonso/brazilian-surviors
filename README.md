# brazilian-survivors

TODO

- create world horion limit: delete enemies far beyond the far limit
- Manage timer when there is tabs switch or apps switchs
- Bullet: should track the closet to the player enemy

BUG

- Visor animation reset when moving only up or down
- Bullet dont move after spawned and after some delay

DONE
- Gun: add cooldown and add new bullet every cooldown interval (add into game object array)
- Bullet: add duration and destroy it after that (remove from game object array)
- add direction vector in physics component
- make all components abstract classes instead of interfaces
- pass time to game loop update function
- leave update call to the base GameObject class
- getPosition in GameObject class
- move method in physics component
