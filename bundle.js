/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(7);

	document.addEventListener("DOMContentLoaded", function(){
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;

	  const ctx = canvasEl.getContext("2d");
	  var game = new Game();
	  console.log('starting');
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Pie = __webpack_require__(2);
	const Junk = __webpack_require__(5);
	const Utils = __webpack_require__(3);
	const Player = __webpack_require__(6);
	const MovingObject = __webpack_require__(4);




	const Game = function(options ={}) {
	  this.size = [Game.DIM_X, Game.DIM_Y] || options.size;
	  this.pies = [];
	  this.junk = [];
	  this.player = null;
	  this.game.lives = 5;
	};

	Game.DIM_X = 1000;
	Game.DIM_Y = 700;

	Game.prototype.addPies = function (game) {
	  game.pies.push(new Pie({game: game, img: Math.floor(Math.random() * 2)}));
	};

	Game.prototype.addJunk = function (game) {
	  game.junk.push(new Junk({game: game, img: Math.floor(Math.random() * 2)}));
	};

	Game.prototype.addPlayer = game => {
	    game.player = new Player({game: game});
	};

	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.pies.forEach( pie => pie.draw(ctx));
	  this.junk.forEach( junk => junk.draw(ctx));
	  this.player.draw(ctx);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);

	const DEFAULTS = {
	  RADIUS: 25,
	  SPEED: 4
	};

	const Pie = function(options = {}) {
	  let options1 = {};
	  options1.pos = [Math.random() * options.game.size[0], -20];
	  options1.vel = [0, DEFAULTS.SPEED];
	  options1.img = 'lib/pie' + options.img.toString() + '.png';
	  options1.radius = DEFAULTS.RADIUS;
	  this.game = options.game;
	  MovingObject.call(this, options1);
	};

	Util.inherits(Pie, MovingObject);

	module.exports = Pie;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass; }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  }
	};

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);

	const DEFAULTS = {
	  RADIUS: 25,
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Pie = __webpack_require__(2);
	const Utils = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	const Game = __webpack_require__(1);

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


/***/ }
/******/ ]);