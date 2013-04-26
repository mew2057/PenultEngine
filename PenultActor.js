function PenultActor(drawingContext, x, y, height, width, rotX, rotY)
{
	// This holds a reference to a context!
	this.ctx = PENULT_GAME_ENGINE.drawingContexts[drawingContext];
	
	// These are the global coordinates for the map.
	this.x = x || 0;
	this.y = y || 0;
	
	// This is the width of the actor in pixels.
	this.width = width || 0;
	this.height = height || 0;
	
	// The rotation point of the actor.
	this.rotX =  rotX || (this.width / 2);
	this.rotY = rotY || (this.height / 2);	
	
	// The "sprite" this is a placeholder at present XXX refine me.
	this.image=new Image();
};


// XXX This is not robust enough to handle animations.
PenultActor.prototype.setImageSource = function(uri)
{
// TODO load callback.
	this.image.src = uri;
};
/**

 */
PenultActor.prototype.rotate = function(angle, rotX, rotY)
{	
	
	this.ctx.save();
	
	// Translate to rotation center
	this.ctx.translate((rotX || (this.rotX + this.x)),(rotY || (this.rotY + this.y)));
	this.ctx.rotate(PenultEngine.degreesToRadians(angle));
	this.ctx.translate(-(rotX || (this.rotX + this.x)),-(rotY || (this.rotY + this.y)));
	this.ctx.drawImage(this.image, this.x,this.y, this.width, this.height);
	this.ctx.restore();
};

PenultActor.prototype.draw = function()
{
	this.ctx.drawImage(this.image,this.x, this.y,this.height, this.width);
};
