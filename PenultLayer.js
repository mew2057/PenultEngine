function PenultLayer(canvas)
{
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.setDefaultFillColor(PenultLayer.defaultFillColor);
}

PenultLayer.prototype.drawSprite = function(img, x, y, width, height)
{
	this.ctx.drawImage(img, x, this.calcY(y), width, height);
}

PenultLayer.prototype.clear = function()
{
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

PenultLayer.prototype.calcY = function(y)
{
	return this.canvas.height - y;
	
}
PenultLayer.prototype.setDefaultFillColor = function(color)
{
	this.ctx.fillStyle=color;
}

PenultLayer.defaultFillColor = 'blue';


