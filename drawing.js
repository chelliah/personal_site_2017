var system;

function setup() {
  createCanvas(windowWidth,windowHeight);

  system = new ParticleSystem();

}


function draw() {
  background(51);
  system.addParticle();
  system.run();
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(random(0, width), random(0, height))
  this.lifespan = 800;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  var fillIntensity = Math.min(this.lifespan, 800-this.lifespan)
  stroke(127, fillIntensity);
  strokeWeight(2);
  fill(127, fillIntensity);
  ellipse(this.position.x, this.position.y, 3, 3);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  var dead = this.lifespan < 0;
  var outOfBounds = this.position.x < 0 || this.position.y < 0 || this.position.x > width || this.position.y > height;
  if (dead || outOfBounds) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function() {
  this.particles = [];
  this.connections = []
};

ParticleSystem.prototype.addParticle = function() {
  if( this.particles.length < 50) {
    this.particles.push(new Particle(this.origin));
  }
};

ParticleSystem.prototype.checkConnections = function(p, particles){
  for (var i = particles.length-1; i >= 0; i--) {
    var dist = p.position.dist(particles[i].position);
    if (dist < 100) {
      // stroke(200, 1000/dist)
      this.connections.push({a: p.position, b: particles[i].position})
      // line(p.position.x, p.position.y, particles[i].position.x, particles[i].position.y)
    }
  }
}

ParticleSystem.prototype.updateConnections = function(){
  for (var i = this.connections.length-1; i>= 0; i--) {
    var connection = this.connections[i]
    var weight = 1000/connection.a.dist(connection.b) - 10 || 1
    stroke(250, weight)
    line(connection.a.x, connection.a.y, connection.b.x, connection.b.y)
  }
}

ParticleSystem.prototype.run = function() {
  this.connections = [];
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    this.checkConnections(p, this.particles)
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
  this.updateConnections()
};
