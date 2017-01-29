const PieFile = require('./pie.js');
const Pie = PieFile.pie;
const Junk = PieFile.junk;
const Utils = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Game = require('./game.js');

const GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;

  document.addEventListener("keydown", function(event) {
      console.log(event.which);
      switch (event.which) {
          case 40:
              this.game.player.moveIt([0,1]);
              console.log(this.game.player.pos);
              break;
          case 38:
              this.game.player.moveIt([0,-1]);
              console.log(this.game.player.pos);
              break;
          case 37:
              this.game.player.moveIt([-1,0]);
              console.log(this.game.player.pos);
              break;
          case 39:
              this.game.player.moveIt([1,0]);
              console.log(this.game.player.pos);
              break;
          default:
              console.log('k');
      }
  }.bind(this));
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
  self.game.addPlayer(self.game);
};

GameView.prototype.moveAndDraw = function (game) {
  this.game.moveObjects();
  this.game.draw(this.ctx);
};

module.exports = GameView;
