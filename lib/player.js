const Util = require("./utils.js");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  RADIUS: 40,
  SPEED: 4
};

const Player = function(options = {}) {
  let options1 = {};
  options1.pos = [options.game.size[0] - 400, options.game.size[1] - 40];
  options1.vel = [0, 0];
  options1.img = 'lib/player.png';
  options1.radius = DEFAULTS.RADIUS;
  this.game = options.game;
  MovingObject.call(this, options1);
};

Util.inherits(Player, MovingObject);

module.exports = Player;
