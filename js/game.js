(function() {
	var game = {};
	var supportsCanvas, canvasElement, canvasContext;

	game.init = function() {
		supportsCanvas = !!document.createElement('canvas').getContext;
		canvasElement = document.getElementById('gameCanvas');
		canvasContext = canvasElement.getContext('2d');
		console.log('Game Loaded, And canvas support is: ' + supportsCanvas);
		game.draw();
	}

	game.startGameLoop = function () {
        window.requestAnimationFrame(game.gameLoop);
    },

    game.gameLoop = function () {
        game.draw();
        window.requestAnimationFrame(game.gameLoop);
    },

    game.draw = function () {
    	game.clear;
        canvasContext.fillStyle = "rgba(0,0,0,1)";
        canvasContext.fillRect(Math.random() * 400, Math.random() * 300, 10, 10);
    }

    game.clear = function () {
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    }

	document.addEventListener("DOMContentLoaded", game.init, false);

})();
