const Pie = require('./pie.js');
const Junk = require('./junk.js');
const Utils = require('./utils.js');
const MovingObject = require('./moving_object.js');




const Game = function(options ={}) {
  this.size = [Game.DIM_X, Game.DIM_Y] || options.size;
  this.pies = [];
  this.junk = [];
};

Game.DIM_X = 1024;
Game.DIM_Y = 768;

Game.prototype.addPies = function (game) {
  game.pies.push(new Pie({game: game, img: Math.floor(Math.random() * 2)}));
};

Game.prototype.addJunk = function (game) {
  game.junk.push(new Junk({game: game, img: Math.floor(Math.random() * 2)}));
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.pies.forEach( pie => pie.draw(ctx));
  this.junk.forEach( junk => junk.draw(ctx));
};

Game.prototype.moveObjects = function () {
  this.pies.forEach ( pie => pie.move() );
  this.junk.forEach ( junk => junk.move() );
};

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] < 0) || 
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
};

Game.prototype.remove = function(object) {
  if (object instanceof Pie)
    this.pies.splice(this.pies.indexOf(object), 1);
  else if (object instanceof Junk)
    this.junk.splice(this.junk.indexOf(object), 1);
};

module.exports = Game;
