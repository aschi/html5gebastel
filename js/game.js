// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};

})(); (function() {
	var game = {};

	var canvas;
	var stage;
	var screen_width;
	var screen_height;
	var bmpAnimation;

	game.init = function() {
		//find canvas and load images, wait for last image to load
		canvas = document.getElementById("gameCanvas");
		game.startGame();
	}

	game.startGame = function() {
		// create a new stage and point it at our canvas:
		stage = new createjs.Stage(canvas);

		// grab canvas width and height for later calculations:
		screen_width = canvas.width;
		screen_height = canvas.height;

		map.init(stage);

		// we want to do some work before we update the canvas,
		// otherwise we could use Ticker.addListener(stage);
		createjs.Ticker.addListener(window);
		createjs.Ticker.useRAF = true;
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", game.tick);
	}

	game.tick = function() {
		// Hit testing the screen width, otherwise our sprite would disappear
		
		// update the stage:
		stage.update();
	}
	document.addEventListener("DOMContentLoaded", game.init, false);

})();
