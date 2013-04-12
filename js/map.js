var map = {};

map.width = 0;
map.height = 0;

map.gridWidth = 10;
map.gridHeight = 10;

map.init = function(height, width) {
	map.width = width;
	map.height = height;
	map.fields = [height][width];
}
map.draw = function(stage) {
	for(var w = 0; w < map.width; w++) {
		for(var h = 0; h < map.height; h++) {
			var rndColor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random()) * 255 + "," + Math.floor(Math.random() * 255) + ",1)";
			
			//canvasContext.fillStyle = rndColor;
			//canvasContext.fillRect(map.gridWith * w, map.gridHeight * w, map.gridWith, map.gridHeight);
			 var shape = new createjs.Shape();
			shape.graphics.beginFill(rndColor).drawRect(map.gridWith * w, map.gridHeight * w, map.gridWith, map.gridHeight);
			stage.addChild(shape);
			//stage.addChild(new createjs.Graphics().beginFill(rndColor).rect(map.gridWith * w, map.gridHeight * w, map.gridWith, map.gridHeight));
		}
	}
}