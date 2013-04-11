(function() {
	var map = {};

	map.width = 0;
	map.height = 0;
	
	map.gridWidth = 10;
	map.gridHeight = 10;
	
	map.map.init = function(height, width) {
		map.width = width;
		map.height = height;
		map.fields = [height][width];
	}
	
	map.draw = function(canvasContext){
		for(var w = 0;w < map.width; w++){
			for(var h = 0;h < map.height;h++){
				canvasContext.fillStyle = "rgba("+Math.random() * 255+","+Math.random() * 255+","+Math.random() * 255+",1)";
        		canvasContext.fillRect(map.gridWith*w, map.gridHeight*w, map.gridWith, map.gridHeight);
			}
		}		
		 
	}
})();
