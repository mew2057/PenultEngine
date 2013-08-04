function PenultScene()
{
	this.width = 0;
	this.height = 0;
	this.layers = {};
	this.tiles =[];
}

PenultScene.prototype = {
	
	load:function(spriteSheets, map)
	{
		for (var sheet in spriteSheets)
		{
			PenultSprite.importSpriteSheet(spriteSheets[sheet][0], spriteSheets[sheet][1]);
		}
		
		PenultSprite.preRenderSheet();
		
		this.loadTMX(map);
		
	},
	
	loadTMX:function(mapFile)
	{
		map = JSON.parse($.ajax({
				type    : "GET",
				url     : mapFile,
				async	: false
			}).responseText);
			
		for (var setid in map.tilesets)
		{
			console.log(map.tilesets[setid].name);
			map.tilesets[setid].name;
		};
		
		
	},
	
	createLayer:function(id, renderRegion)
	{
		this.layers[id] = new PenultLayer(renderRegion);
	},
	
	getLayer:function(layer)
	{
		return this.layers[layer];
	}
}

function PenultLayer(renderRegion)
{
	this.x=0;
	this.y=0;
	this.width = renderRegion.width;
	this.height = renderRegion.height;
	this.scale=2;
	this.ctx = renderRegion.getContext("2d");
	this.map = null;

}

PenultLayer.prototype = {
	translate:function(x, y)
	{
		this.x = x;
		this.y = y;
	},

	translateX:function(x)
	{
		this.x = x;
	},

	translateY:function(y)
	{
		this.y = y;
	},

	clear:function()
	{
		this.ctx.clearRect(0, 0, this.width, this.height);
	},

	drawSprite:function(img, x, y, width, height)
	{
		this.ctx.drawImage(img, x - this.x ,  (this.height - y) - this.y, width  , height );
	},

	tranpose:function(globalCoordinates)
	{
		reutrn [globalCoordinates[0] - this.x, globalCoordinates[1] - this.y];
	}
}

function TMXTileLayer ()
{
	this.tiles  = [];
	this.height = 0;
	this.width  = 0;
}

function TMXObjectLayer ()
{
	this.objects = [];
}
