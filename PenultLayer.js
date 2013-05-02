function PenultLayer(canvas)
{
	this.width = 0;
	this.height = 0;
	this.view = new PenultViewport(canvas);
}

/*
PenultLayer.prototype.drawSprite = function(img, x, y, width, height)
{
	this.ctx.drawImage(img, x, this.calcY(y), width, height);
}

PenultLayer.prototype.clear = function()
{
	this.ctx.clearRect(0, 0, this.width, this.height);
}

PenultLayer.prototype.calcY = function(y)
{
	return this.height - y;
	
}
PenultLayer.prototype.setDefaultFillColor = function(color)
{
	this.ctx.fillStyle=color;
}*/
	//this.setDefaultFillColor(PenultLayer.defaultFillColor);

//PenultLayer.defaultFillColor = 'blue';


function PenultViewport(canvas)
{
	this.x=0;
	this.y=0;
	this.width = canvas.width;
	this.height = canvas.height;
	this.scale=2;
	this.ctx = canvas.getContext("2d");

}

PenultViewport.prototype.translate = function(x, y)
{
	this.x = x;
	this.y = y;
}

PenultViewport.prototype.translateX = function(x)
{
	this.x = x;
}

PenultViewport.prototype.translateY = function(y)
{
	this.y = y;
}

PenultViewport.prototype.clear = function()
{
	this.ctx.clearRect(0, 0, this.width, this.height);
}

PenultViewport.prototype.drawSprite = function(img, x, y, width, height)
{
	this.ctx.drawImage(img, x - this.x ,  (this.height - y) - this.y, width  , height );
}

PenultViewport.prototype.tranpose = function(globalCoordinates)
{
	reutrn [globalCoordinates[0] - this.x, globalCoordinates[1] - this.y];
}