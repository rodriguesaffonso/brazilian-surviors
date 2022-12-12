class AbstractObject {
    center = {};
    constructor(center) {
        this.center.x = center.x;
        this.center.y = center.y;
        
        this.maxHp = 100;
        this.hp = 100;
        this.damage = 10;
    }
    draw() { throw Error('Should implement draw'); }
    attack() { throw Error('Should implement attach object'); }
    hit(obj) {throw Error('Should implement hit by object'); }
    isDead() { return this.hp === 0; }
}