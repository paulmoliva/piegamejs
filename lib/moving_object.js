const PieFile = require('./pie.js');
const Pie = PieFile.pie;
const Junk = PieFile.junk;

const MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.img = options.img;
  this.tag = options.tag;
};

MovingObject.prototype.draw = function(ctx) {
  var thumbImg = document.createElement('img');
  thumbImg.src = this.img;
  ctx.fillStyle = "rgba(0,0,0,0.0)";
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    true
  );

  ctx.drawImage(thumbImg, this.pos[0] - (Number(this.radius)), this.pos[1] - (Number(this.radius)));
  ctx.fill();

};

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.game.isOutOfBounds(this.pos)){
    this.game.remove(this);
    console.log('bye pie!');
} else if (this.collides(this.game.player)){
    if(this.tag === 'pie'){
        this.game.score += 1;
        var x = document.createElement("AUDIO");
        x.src = './lib/nom.wav';
        x.play();
    } else {
        this.game.lives -= 1;
        var x = document.createElement("AUDIO");
        if (this.img === 'lib/junk0.png')
            x.src = './lib/ouch.wav';
        else {
            x.src = './lib/eww.wav';
            console.log(this.img);
        }
        x.play();
    }
    this.game.remove(this);
  }
};

MovingObject.prototype.collides = function(rect) {
    return !( rect.pos[0]           > (this.pos[0] + this.radius) ||
             (rect.pos[0] + rect.radius) <  this.pos[0]           ||
              rect.pos[1]           > (this.pos[1] + this.radius) ||
             (rect.pos[1] + rect.radius) <  this.pos[1]);
};

MovingObject.prototype.moveIt = function(arr){
    this.pos[0] += arr[0] * 50;
    this.pos[1] += arr[1] * 50;
};


module.exports = MovingObject;
