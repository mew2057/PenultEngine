
function PenultPhysics()
{

}

// This is something used frequently in transforms.
PenultPhysics.pointVector=[0,0];

PenultPhysics.updatePhysicsActor = function(physicsActor)
{
	
}


PenultPhysics.convertToVectorComponentsDegree = function(angleDegrees, magnitude)
{
	return PenultPhysics.convertToVectorComponents(PenultEngine.degreesToRadians(angleDegrees), magnitude);
}

/**
 * Breaks apart the vector into its x and y components.
 *
 */
PenultPhysics.convertToVectorComponents = function(angleRadians, magnitude)
{

	// This may need to be rounded in the future...
	return [Math.cos(angleRadians) * magnitude,Math.sin(angleRadians) * magnitude];
	//return [((Math.cos(angleRadians) * magnitude) + 0.5) | 0, ((Math.sin(angleRadians) * magnitude)+ 0.5) | 0];
}
