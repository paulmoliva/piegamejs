const MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.raadius;
  this.img = options.img;
};

MovingObject.prototype.draw = function(ctx) {
  var thumbImg = document.createElement('img');
  thumbImg.src = this.img;
  ctx.fillStyle = "#505050";
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    true
  );

  ctx.drawImage(thumbImg, this.pos[0], this.pos[1]);
  ctx.fill();

};

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.game.isOutOfBounds(this.pos)){
    this.game.remove(this);
    console.log('bye pie!');
  }
};

module.exports = MovingObject;
