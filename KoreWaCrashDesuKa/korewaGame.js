function initKoreWaCrashGame(canvasIDs)
{
	KORE_WA_GAME = new KoreCrashGame(canvasIDs);
};

function KoreCrashGame(canvasIDs)
{
	initPenultEngine(canvasIDs);
	// TESTING	
	PenultSound.load("main", bgm["main"]);
	PenultSound.play("main", true);
	
	KoreCrashGame.ayumu = new PenultActor('fg',0,0,80,80);
	KoreCrashGame.ayumu.setImageSource(SPRITE_SOURCES['Ayumu_Spinning']);
	
	window.requestAnimFrame(KoreCrashGame.koreWaLoop);
};

var angle=0;
KoreCrashGame.koreWaLoop = function()
{
    PENULT_GAME_ENGINE.drawingContexts['fg'].fillRect(0,0,
		PENULT_GAME_ENGINE.canvases['fg'].width,PENULT_GAME_ENGINE.canvases['fg'].height);

	//
	
	angle=(angle+10)%360
	/*KoreCrashGame.ayumu.x+=5;
	KoreCrashGame.ayumu.y+=5*/
	KoreCrashGame.ayumu.rotate(angle);
	//KoreCrashGame.ayumu.draw();
	window.requestAnimFrame(KoreCrashGame.koreWaLoop);

};
