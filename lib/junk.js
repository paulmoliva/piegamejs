const Util = require("./utils.js");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  RADIUS: 25,
  SPEED: 4
};

const Junk = function(options = {}) {
  let options1 = {};
  options1.pos = [Math.random() * options.game.size[0], -20];
  options1.vel = [0, DEFAULTS.SPEED];
  options1.img = 'lib/junk' + options.img.toString() + '.png';
  options1.radius = DEFAULTS.RADIUS;
  this.game = options.game;
  MovingObject.call(this, options1);
};

Util.inherits(Junk, MovingObject);

module.exports = Junk;
