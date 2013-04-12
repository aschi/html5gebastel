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
		var rndColor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random()) * 255 + "," + Math.floor(Math.random() * 255) + ",1)";

		
		// create a new stage and point it at our canvas:
		stage = new createjs.Stage(canvas);

		// grab canvas width and height for later calculations:
		screen_width = canvas.width;
		screen_height = canvas.height;
		
		
		//create map
		game.map = function(width, height, cellWidth, cellHeight, offsetX, offsetY){
			this.width=width;
			this.height=height;
			this.cellWidth=cellWidth;
			this.cellHeight=cellHeight;
			this.offsetX = offsetX;
			this.offsetY = offsetY;
			this.cells = Create2DArray(height);
			
			this.colorConfig = {
				path: "white",
				blocked: "grey",
				entrance: "red",
				exit: "green"
			};
			
			this.cellStates = {
				path: 0,
				blocked: 1,
				entrance: 2,
				exit: 3
			};
			
			
			this.parse = function(inputStr){
				var lines = inputStr.split("\n");
				for(var l = 0;l < lines.length;l++){
					for(var c = 0; c < lines[l].length;c++){
						if(lines[l].charAt(c) === '#'){
							this.cells[l][c] = this.cellStates.blocked;
						}else if(lines[l].charAt(c) === 'p'){
							this.cells[l][c] = this.cellStates.path;
						}else if(lines[l].charAt(c) === 'i'){
							this.cells[l][c] = this.cellStates.entrance;
						}else if(lines[l].charAt(c) === 'o'){
							this.cells[l][c] = this.cellStates.exit;
						}	
					}
				}
			}
			
			
			this.draw = function(){
				var sh = new createjs.Shape();
				var color = "#000000";
		
				for(var r = 0; r < this.cells.length; r++) {
					for(var c = 0; c < this.cells[0].length; c++) {
						color = "black";
						
						if(this.cells[r][c] === 0){
							color = this.colorConfig.path;
						}else if(this.cells[r][c] === 1){
							color = this.colorConfig.blocked;
						}else if(this.cells[r][c] === 2){
							color = this.colorConfig.entrance;
						}else if(this.cells[r][c] === 3){
							color = this.colorConfig.exit;
						}
						
						sh.graphics.beginFill(color).drawRect(this.cellWidth * c + this.offsetX, this.cellHeight * r + this.offsetY, this.cellWidth, this.cellHeight);
						
						//canvasContext.fillStyle = rndColor;
						//canvasContext.fillRect(map.gridWith * w, map.gridHeight * w, map.gridWith, map.gridHeight);
						
						//stage.addChild(new createjs.Graphics().beginFill(rndColor).rect(map.gridWith * w, map.gridHeight * w, map.gridWith, map.gridHeight));
						
					}
				}
				stage.addChild(sh);
				
			}
		}
		var m = new game.map(20,20,15,15,0,0);
		
		var mapCfg = "";
		mapCfg += "################pppo\n"; //0
		mapCfg += "##ppppppppppppppp###\n"; //1
		mapCfg += "##p#################\n"; //2
		mapCfg += "##p#################\n"; //3
		mapCfg += "##p#################\n"; //4
		mapCfg += "##p#################\n"; //5
		mapCfg += "##p#################\n"; //6
		mapCfg += "##p#################\n"; //7
		mapCfg += "##ppppppppppppppp###\n"; //8
		mapCfg += "################p###\n"; //9
		mapCfg += "################p###\n"; //10
		mapCfg += "################p###\n"; //11
		mapCfg += "################p###\n"; //12
		mapCfg += "################p###\n"; //13
		mapCfg += "################p###\n"; //14
		mapCfg += "##ppppppppppppppp###\n"; //15
		mapCfg += "##p#################\n"; //16
		mapCfg += "##p#################\n"; //17
		mapCfg += "##p#################\n"; //18
		mapCfg += "ipp#################"; //19
		
		m.parse(mapCfg);	
		
		m.draw();
		//game.map.draw();

/*
	    //Create a Shape DisplayObject.
	    sh = new createjs.Shape();
	    //circle.graphics.beginFill("red").drawCircle(0, 0, 40);
	    sh.graphics.beginFill(rndColor).drawRect(0, 0, 10, 10);
	    var rndColor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random()) * 255 + "," + Math.floor(Math.random() * 255) + ",1)";

 		sh.graphics.beginFill(rndColor).drawRect(0, 10, 10, 10);
var rndColor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random()) * 255 + "," + Math.floor(Math.random() * 255) + ",1)";
		sh.graphics.beginFill(rndColor).drawRect(0, 20, 10, 10);
 		stage.addChild(sh);
 		*/
 		
	    //Set position of Shape instance.
	    //circle.x = circle.y = 50;
	    //Add Shape instance to stage display list.
	    //map.init(20,20);
	   	//map.draw();
	    
	    //Update stage will render next frame
	    stage.update();

/*
		map.init(20,20);
		map.draw(stage);
		
		// we want to do some work before we update the canvas,
		// otherwise we could use Ticker.addListener(stage);
		createjs.Ticker.addListener(stage);
		createjs.Ticker.useRAF = true;
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick", game.tick);
		*/
	}

	game.tick = function() {
		// Hit testing the screen width, otherwise our sprite would disappear
		
		// update the stage:
		stage.update();
	}
	
	document.addEventListener("DOMContentLoaded", game.init, false);
})();


function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }
  return arr;
}