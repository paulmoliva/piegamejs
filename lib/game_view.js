const Pie = require('./pie.js');
const Utils = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Game = require('./game.js');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function(game) {
  let self = this;
  setInterval(function() {
    self.moveAndDraw();
  }, 20);
  setInterval(function (){
    self.game.addPies(self.game);
  }, 600);
  setInterval(function (){
    self.game.addJunk(self.game);
  }, 1200);
};

GameView.prototype.moveAndDraw = function (game) {
  this.game.moveObjects();
  this.game.draw(this.ctx);
};

module.exports = GameView;
