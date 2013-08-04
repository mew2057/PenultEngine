PenultPhysicsActor.prototype = new PenultActor();
PenultPhysicsActor.prototype.constructor = PenultPhysicsActor;

function PenultPhysicsActor(){
	this.velocity=[];
}


PenultPhysicsActor.prototype.init=function(drawingContext, x, y, height, width)
{
// Stupid mistake...
	PenultActor.prototype.init.call(this,drawingContext, x, y, height, width);
	
	this.velocity = [0,0];
	// Acceleration should be an external force.
	//this.acceleration = [0,0];
}

PenultPhysicsActor.prototype.applyKinematics = function(acceleration)
{
	// Note acceleration is only possible with an outside force, as such the actor should have no notion of its current acceleration!
	this.velocity[0]+=acceleration[0];
	this.velocity[1]+=acceleration[1];
	
	this.velocity = PenultPhysics.applyGravity(this.velocity, 1, .25);
	
	this.posVec[0]+=(this.velocity[0] +.5)|0;
	this.posVec[1]+=(this.velocity[1] +.5)|0;
}

/*
PenultPhysicsActor.prototype = {	
	init:function(drawingContext, x, y, height, width)
	{
		// Stupid mistake...
		PenultActor.prototype.init.call(this,drawingContext, x, y, height, width);
		
		this.velocity = [0,0];
		// Acceleration should be an external force.
		//this.acceleration = [0,0];
	},
	
	applyKinematics:function(acceleration)
	{
		this.velocity[0]+=acceleration[0];
		this.velocity[1]+=acceleration[1];
		
		this.velocity = PenultPhysics.applyGravity(this.velocity, 1, .25);
		
		this.posVec[0]+=(this.velocity[0] +.5)|0;
		this.posVec[1]+=(this.velocity[1] +.5)|0;
	}
}*/