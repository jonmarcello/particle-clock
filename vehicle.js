function Vehicle(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y)
    this.vel = createVector();
    this.acc = createVector();
    this.r = 6;
    this.maxspeed = 10;
    this.maxforce = 1;
}

Vehicle.prototype.behaviours = function() {
    const arrive = this.arrive(this.target);
    const mouse = createVector(mouseX, mouseY);
    const flee = this.flee(mouse);
    
    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive)
    this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f);
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y)
}

Vehicle.prototype.arrive = function(target) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    let speed = this.maxspeed;
    if(d < 100) {
        speed = map(d, 0, 100, 0, this.maxspeed)
    }

    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer
}

Vehicle.prototype.flee = function(target) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    if(d < 50) {
        desired.setMag(this.maxspeed);
        desired.mult(-1);
        const steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer
    }

    return createVector(0, 0);
}