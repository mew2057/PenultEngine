function initPenultEngine(canvasIDs)
{
	PENULT_GAME_ENGINE = new PenultEngine();
	var modifiedID ="";
	
	// TODO formalize id names for the engine.
	for(var id in canvasIDs)
	{
		modifiedID = canvasIDs[id].split('_')[0];
		
		PENULT_GAME_ENGINE.canvases[modifiedID] = document.getElementById(canvasIDs[id]);		
		PENULT_GAME_ENGINE.drawingContexts[modifiedID]  = PENULT_GAME_ENGINE.canvases[modifiedID].getContext("2d");
	}
	
	// Load Sprite Renderer
	
	// Load Sound Engine
	PenultSound.init();

	// Load Physics Engine
	
	// Initialize game code
}

// Draw calls need to be limited...


function PenultEngine(){}

PenultEngine.prototype.canvases=[];
PenultEngine.prototype.drawingContexts=[];
PenultEngine.prototype.renderingEngine=null;




// Utility functions.
PenultEngine.degreesToRadians = function(angleInDegrees)
{
	return angleInDegrees*0.01745329251;
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
