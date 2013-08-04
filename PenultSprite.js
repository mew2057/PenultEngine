/**
 * A sprite sheet object to aid in the packing of sprite sheets for pre-rendering.
 **/ 
function PenultSpriteSheet(spriteSource, spriteName, details)
{
	this.img = new Image();	
	this.img.src = spriteSource;
	this.name = spriteName;
	this.node = {};
}

 // TODO ERROR CHECKING! 
// This should be hidden from user access Ideally.
/**
 * Contains position details for sprite rending. 
 */
function PenultSprite()
{
	this.posVec     = [0,0];
	this.dimensions = [0,0];
	this.offset 	= [0,0];
}

/**
 * Creates the canvas that the sprite sheets will "live" in for the sake of pre-rendering.
 * This should only be executed once.
 */
PenultSprite.initSpriteSheet = function()
{
	PenultSprite.SpriteSheet = document.createElement("canvas");
	PenultSprite.SpriteSheet.width = PenultSprite.SpriteSheet.height =0;
	PenultSprite.SpriteSheetContext = PenultSprite.SpriteSheet.getContext('2d');
	PenultSprite.SpritePacker=new SpritePacker();
	
	PenultSprite.SpritesLoading = 0;
	PenultSprite.Sheets 	    = [];
		
	// A collection of sprite Arrays
	PenultSprite.Sprites	= {};
	
	// A collection of animation Objects
	PenultSprite.Animations = {};
	
	PenultSprite.SpriteHeap = new SpriteHeap();
}

/**
 * Imports a sprite sheet with a strict format using an ajax query.
 *
 * @param sheetSpecURI The address of the sprite sheet specification ( I use Texture Packer )
 * @param sheetName The identifier for the sprite sheet, user specified for the sake of easy sprite access.
 */
PenultSprite.importSpriteSheet = function(sheetSpecURI, sheetName)
{
	PenultSprite.processSpriteSheet( JSON.parse($.ajax({
        type    : "GET",
        url     : sheetSpecURI,
        async	: false
    }).responseText), sheetName);
}

/**
 * Converts the sprite sheet data into something more useful to the pentult engine. Inserts the sheets into a maxheap that uses the largest dimension as the key.
 *
 * @param spriteSheetData JSON containing the specification of sprites, animations and image locations.
 * @param sheetName The name of the sprite sheet, this is used to access the sprite data by other portions of the engine.
 */
PenultSprite.processSpriteSheet = function(spriteSheetData,sheetName){
	var frame, sprite, animation, sheet;

	// Creates an array of the sprites contained in the sprite sheet.
	PenultSprite.Sprites[sheetName] = [];
	
	// Extract frame data.
	for (var index in spriteSheetData.frames)
	{
		frame = spriteSheetData.frames[index];
		sprite = new PenultSprite();
		sprite.posVec = [frame.frame.x, frame.frame.y]
		sprite.dimensions = [frame.frame.w, frame.frame.h];
		
		PenultSprite.Sprites[sheetName][index]= sprite;
	}
	
	// Create an animation obejct for the sprite sheet.
	PenultSprite.Animations[sheetName] = {};
	
	for (index in spriteSheetData.animations)
	{
		animation = new PenultAnimation();
		animation.frames = spriteSheetData.animations[index].frames;
		PenultSprite.Animations[sheetName][spriteSheetData.animations[index].name] = animation;	
	}
	
	sheet = new PenultSpriteSheet(spriteSheetData.meta.image, sheetName);

	// Insert into the max heap for the sake of the bin packing algorithm.
	PenultSprite.SpriteHeap.insert(sheet);
}

/**
 * Appends an image to the Sprite Sheet with absolutely no formatting data whatsoever.
 *
 * @param imageSource The URI of the image in question.
 * @param spriteName The name of the sprite as a reference to access the image on the pre-rendered canvas.
 */
PenultSprite.appendToSpriteSheet = function(imageSource, spriteName)
{	
	PenultSprite.SpriteHeap.insert(new PenultSpriteSheet(imageSource.src, spriteName));
}

/**
 * After all of the sprites have been accounted for the invoccation of this function will actually create the canvas with the sprite sheet data.
 * To do this it makes use of a bin packing algorithm that adds sprite sheets to the canvas with a precedence for the most dimensionally massive sheets.
 */
PenultSprite.preRenderSheet = function()
{
	var sheets, index, spriteIndex;

	// Reset the canvas
	PenultSprite.SpriteSheet.width = PenultSprite.SpriteSheet.height = 0;
	
	// Clear out any old sprite sheet refernces as they are about to become invalid.
	PenultSprite.Sheets = [];
	
	// Move the sheets from the Sprite heap to the canvas and the Sheets array.
	// Please note that as SpriteHeap allows for same key values, the value portion of the key-velue pairs are arrays of sprites sheets.
	while(sheets = PenultSprite.SpriteHeap.remove())
	{
		for(index in sheets)
		{
			// Add the sheet to the canvas via bin packing.
			sheets[index].node = PenultSprite.SpritePacker.insert(sheets[index].img.width, sheets[index].img.height);
			// Keep a record of the sheet in the Sheets array.
			PenultSprite.Sheets.push(sheets[index]);			
			
			// Adds the offset of the sprite sheet to the individual sprites.
			for(spriteIndex in PenultSprite.Sprites[sheets[index].name])
			{
				PenultSprite.Sprites[sheets[index].name][spriteIndex].offset[0]=sheets[index].node.x;
				PenultSprite.Sprites[sheets[index].name][spriteIndex].offset[0]=sheets[index].node.y;
			}
		}
		
	}
	console.log(PenultSprite.Sprites);

	// Set the canvas size for an exact fit.
	PenultSprite.SpriteSheet.width  = PenultSprite.SpritePacker.root.w;
	PenultSprite.SpriteSheet.height = PenultSprite.SpritePacker.root.h;
	
	// XXX
	document.getElementById('gameBox').appendChild(PenultSprite.SpriteSheet);
	// This will be invisible in the final version.
	for(index in PenultSprite.Sheets)
	{
		PenultSprite.SpriteSheetContext.drawImage(PenultSprite.Sheets[index].img, PenultSprite.Sheets[index].node.x, PenultSprite.Sheets[index].node.y);
	}
}

// ***************************************************************************************
// For the sprite sheet packing I'll be using the bin packing algorithm.
// This is where I learned about the algorithm http://codeincomplete.com/posts/2011/5/7/bin_packing/

function SpritePacker()
{
	this.root={x:0,y:0,w:0,h:0};
}

SpritePacker.prototype = {
	
	insert:function(w,h) {	
		if(!this.root.used)
		{
			this.root.w = w;
			this.root.h = h;
		}
		
		var node = this.findSpace(this.root, w, h);
		
		if(node)
			return this.prepNode(node, w, h);
		else
			return this.growSheet(w, h);
	},
	
	findSpace:function(node, w, h) {
		if(node.used)
				return this.findSpace(node.down, w, h) || this.findSpace(node.right, w, h);
		else if(node.w >= w && node.h >= h)
			return node;
		else
			return null;
	},
	
	prepNode:function(node, w, h) {
		node.right = { x:node.x + w, y:node.y,     w: node.w - w, h: node.h     };
		node.down  = { x:node.x,     y:node.y + h, w: node.w,     h: node.h - h };
		node.used  = true; 
		return node;
	},

	growSheet:function(w,h) {
		// > 0 down
		// < 0 right
		// == 0 down
		var growthPreference = this.root.w - this.root.h;
		
		// This moves the root up!
		// It's so stupidly elegant >.<
		//   r   ->  r'   Down transform
		//  / \     / \
		// d  ri   d'  r
		//            / \
		//           d  ri
		
		//   r   ->  r'   Right transform
		//  / \     / \
		// d  ri   r   ri'
		//        / \
		//       d  ri
		
		if( growthPreference >= 0)  // Down
			this.root = {
				used  : true,
				x     : 0,
				y     : 0,
				w     : this.root.w,
				h     : this.root.h + h,
				down  : { x:0, y: this.root.h, w: this.root.w, h: h},
				right : this.root
			}			
		else						// Right
			this.root = {
				used  : true,
				x     : 0,
				y     : 0,
				w     : this.root.w + w,
				h     : this.root.h,
				down  : this.root,
				right : { x: this.root.w, y: 0, w: w, h: this.root.h}
			}			
			
		return this.insert(w, h);
	}
}

// *****************************************
// SpriteHeap 
// XXX There's a -1 showing up somewhere(please look into this stupid).
// *****************************************

function SpriteHeap()
{
	this.heap=[]; // elements are assumed as {key:x, sheets:[]}
	this.size=0;
	
}

SpriteHeap.prototype={
	getKey:function(h,w) {
		return Math.max(h,w);
	},
	
	// This implementation is O(log(n))
	insert:function(spriteSheet) {
		var node, key = this.getKey(spriteSheet.img.height, spriteSheet.img.width);
		
		if(node = this.findNode(key))
		{
			node.sheets.push(spriteSheet);
		}
		else
		{
			this.heap.push({key:key, sheets:[spriteSheet]});
			this.trickleUp(this.size);
			this.size++;
		}
		
	},
	
	trickleUp:function(index){
		if(index!==0 && this.heap[index].key > this.heap[~~((index-1)/2)].key)
		{
			var tempNode = this.heap[index];
			this.heap[index] = this.heap[~~((index-1)/2)];
			this.heap[~~((index-1)/2)] = tempNode;
			
			this.trickleUp(~~((index-1)/2));
		}
	},
	
	trickleDown:function(index)	{
		if(this.size > 2 * index + 1)
		{
			var largestChild = 2 * index + 1;
			
			if(this.heap[largestChild].key < this.heap[largestChild+1].key)
				largestChild++;
				
			if(this.heap[index].key < this.heap[largestChild].key)
			{
				var tempNode = this.heap[index];
				
				this.heap[index] = this.heap[largestChild];
				this.heap[largestChild] = tempNode;
				
				this.trickleDown(largestChild);			
			}
		}
	},
	
	remove:function() {
		var head = this.heap[0].sheets;
		this.heap[0] = this.heap[--this.size];
		this.heap[this.size]={};
		
		this.trickleDown(0);
		
		return head;
	},
	
	findNode:function(key){
		var node = null;
		for (var i in this.heap)
		{
			if(this.heap[i].key === key)
			{
				node = this.heap[i];
				break;
			}
		}
		return node;
	}
}


// *****************************************
// Animations
// *****************************************
function PenultAnimation()
{	
	this.name   = "";
	this.delay  =  0; 
	this.frames = [];
}