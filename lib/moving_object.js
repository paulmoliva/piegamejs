const MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
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
} else if (this.collides(this.game.player)){
    this.game.remove(this);
  }
};

MovingObject.prototype.collides = function(player){
    console.log(this.game.player);
    console.log(this);
    if (this.pos[0] < player.pos[0] + player.radius &&
   this.pos[0] + this.radius > player.pos[0] &&
   this.pos[1] < player.pos[1] + player.radius &&
   this.radius + this.pos[1] > player.pos[1]) {
    this.game.lives -= 1;
    console.log('ouch');
    return true;
   }
};

MovingObject.prototype.moveIt = function(arr){
    this.pos[0] += arr[0] * 50;
    this.pos[1] += arr[1] * 50;
};


module.exports = MovingObject;
