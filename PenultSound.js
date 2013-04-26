function PenultSound(){}

PenultSound.init = function()
{
	PenultSound.sceneAudio={};
	
	try {
		PenultSound.audioContext.audioContext = new window.webkitAudioContext();
		throw "fail";
	}
	catch(e)
	{
		// Bind the functions for the supported audio.
		PenultSound.play = PenultSound.playAudioElem;
		PenultSound.load = PenultSound.loadAudioElem;
		PenultSound.stop = PenultSound.stopAudioElem;
		
		console.log("Audio API is not supported in this browser, using <audio> fallback. Not all features may be supported.");		
	}
}

PenultSound.clearBuffers = function()
{
	PenultSound.sceneAudio={};
}

// Audio context stuff
PenultSound.play = function(name, source)
{

}

PenultSound.load = function(name, repeat)
{

}

PenultSound.stop = function(name)
{

}

// Audio Tag stuff.
PenultSound.loadAudioElem = function(name, source)
{
	PenultSound.sceneAudio[name] = document.createElement("audio");
	PenultSound.sceneAudio[name].setAttribute('src', source);
}

PenultSound.playAudioElem = function(name, repeat)
{
	if(repeat)
		PenultSound.sceneAudio[name].setAttribute('loop', repeat);
		
	PenultSound.sceneAudio[name].play();
}

PenultSound.stopAudioElem = function(name)
{
	PenultSound.sceneAudio[name].setAttribute('loop', false);
	PenultSound.sceneAudio[name].pause();
}

