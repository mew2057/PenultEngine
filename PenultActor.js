
function PenultActor(){};

PenultActor.prototype.init = function (drawingContext, x, y, height, width)
{
	// This holds a reference to a context!
	this.ctx = PENULT_GAME_ENGINE.drawingContexts[drawingContext];

	// These are the global coordinates for the map.
	this.posVec = [x || 0, y || 0];
		
	// [width, height]
	this.dimensions = [width || 0,height || 0];
	
	// The anchor of the actor.
	this.anchor = [(this.dimensions[0] / 2),(this.dimensions[1] / 2)];
	
	// The "sprite" this is a placeholder at present XXX refine me.
	this.image=new Image();
}

// XXX This is not robust enough to handle animations.
PenultActor.prototype.setImageSource = function(uri)
{
// TODO load callback.
	this.image.src = uri;
};

PenultActor.prototype.setAnchor = function(anchorX, anchorY)
{
	this.anchor[0] = anchorX;
	this.anchor[1] = anchorY;
}
/**

 */
PenultActor.prototype.rotate = function(angle, anchorX, anchorY)
{	
	this.ctx.save();
	
	// Translate to rotation center
	this.ctx.translate(
		(anchorX || (this.anchor[0] + this.posVec[0])),
		(anchorY || (this.anchor[1] + this.posVec[1])));
		
	this.ctx.rotate(PenultEngine.degreesToRadians(angle));
	this.ctx.translate(
		-(anchorX || (this.anchor[0] + this.posVec[0])),
		-(anchorY || (this.anchor[1] + this.posVec[1])));
		
	this.ctx.drawImage(this.image, this.posVec[0],this.posVec[1], this.dimensions[0], this.dimensions[1]);
	
	this.ctx.restore();
};

PenultActor.prototype.draw = function()
{
	this.ctx.drawImage(this.image,this.posVec[0],this.posVec[1],this.dimensions[0], this.dimensions[1]);
};
