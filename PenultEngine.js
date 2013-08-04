function initPenultEngine(canvasIDs)
{
	PENULT_GAME_ENGINE = new PenultEngine();
	var modifiedID ="";
	
	// TODO formalize id names for the engine.
	for(var id in canvasIDs)
	{
		modifiedID = canvasIDs[id].split('_')[1];
		
		PENULT_GAME_ENGINE.layers[modifiedID] = document.getElementById(canvasIDs[id]);
	}
	
	// Load Sprite Handler
	PenultSprite.initSpriteSheet();
	
	// Load Sound Engine
	PenultSound.init();

	// Load Physics Engine
	
	
	// Initialize game code
}

// Draw calls need to be limited...


function PenultEngine(){}

PenultEngine.prototype.layers={};
//PenultEngine.prototype.canvases=[];
//PenultEngine.prototype.drawingContexts=[];
PenultEngine.prototype.renderingEngine=null;




// Utility functions.
PenultEngine.degreesToRadians = function(angleInDegrees)
{
	return angleInDegrees*0.01745329251;
}

// Make sure your cell size is larger than your object size!
function SpatialHash(cellSize)
{
	this.cellSize=cellSize || 1;
	this.map ={};
}

SpatialHash.prototype.hash = function(point)
{
console.log(point[0]/this.cellSize)
	return [point[0]/this.cellSize , point[1]/this.cellSize];
}

// anchor assumed at 0,0 (top left)
SpatialHash.prototype.insert = function(point, dimensions, object)
{
	console.log(this.map);

this.checkAndAdd(this.hash(point))
	console.log(object, object===object);
	
}

SpatialHash.prototype.checkAndAdd = function(hash, object)
{
	if(!this.map[hash[0]] || !this.map[hash[0]][hash[1]])
	{
	/*console.log({ hash[1] : [object]});
		this.map[hash[0]] = { hash[1] : [object]};*/
	}
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, ANIM_TIMEOUT);
          };
})();
