
function PenultActor(){
	this.layer={};
	this.posVec=[];
	this.dimensions=[];
	this.anchor=[];
	this.image={};
	
	// TODO link animations and sprites.
	this.sprites = {};
	this.animations ={};
};

PenultActor.prototype = {

	init:function (layer, x, y, height, width)
	{
		this.layer = layer;

		// These are the global coordinates for the map.
		this.posVec = [x || 0, y || 0];
			
		// [width, height]
		this.dimensions = [width || 0,height || 0];
		
		// The anchor of the actor.
		this.anchor = [0,height];
		
		// The "sprite" this is a placeholder at present XXX refine me.
		this.image=new Image();
	},

	// XXX This is not robust enough to handle animations.
	setImageSource:function(uri)
	{
	// TODO load callback.
		this.image.src = uri;
	},

	setAnchor:function(anchorX, anchorY)
	{
		this.anchor[0] = anchorX;
		this.anchor[1] = this.dimensions - anchorY;
	},
	
	draw:function()
	{
		this.layer.drawSprite(this.image,this.posVec[0]-this.anchor[0],this.posVec[1]+this.anchor[1],this.dimensions[0], this.dimensions[1]);
	}
}
/**
This code is good but needs a refactor
 *
PenultActor.prototype.rotate = function(angle, anchorX, anchorY)
{	
	this.layer.save();
	
	// Translate to rotation center
	this.layer.translate(
		(anchorX || (this.anchor[0] + this.posVec[0])),
		(anchorY || (this.anchor[1] + this.posVec[1])));
		
	this.layer.rotate(PenultEngine.degreesToRadians(angle));
	this.layer.translate(
		-(anchorX || (this.anchor[0] + this.posVec[0])),
		-(anchorY || (this.anchor[1] + this.posVec[1])));
		
	this.layer.drawImage(this.image, this.posVec[0],this.posVec[1], this.dimensions[0], this.dimensions[1]);
	
	this.layer.restore();
};*/


