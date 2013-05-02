function initKoreWaCrashGame(canvasIDs)
{
	KORE_WA_GAME = new KoreCrashGame(canvasIDs);
};

function KoreCrashGame(canvasIDs)
{

	initPenultEngine(canvasIDs);
	// TESTING	
	PenultSound.load("main", bgm["main"]);
	//PenultSound.play("main", true);

	KoreCrashGame.ayumu = new PenultPhysicsActor();
	KoreCrashGame.test = new PenultActor();
	KoreCrashGame.ayumu.init('fg',0,0,80,80);
	KoreCrashGame.test.init('fg',400,50,160,160);

	KoreCrashGame.ayumu.setImageSource(SPRITE_SOURCES['Ayumu_Spinning']);
		KoreCrashGame.test.setImageSource(SPRITE_SOURCES['Ayumu_Spinning']);

	KoreCrashGame.ayumu.applyKinematics(PenultPhysics.convertToVectorComponents(Math.atan(500/1024),15));
	
	console.log(KoreCrashGame.ayumu);

		KoreCrashGame.ayumu.draw();
		KoreCrashGame.test.draw();
	window.requestAnimFrame(KoreCrashGame.koreWaLoop);
};

var angle=0;
KoreCrashGame.koreWaLoop = function()
{
    PENULT_GAME_ENGINE.layers['fg'].view.clear();

	//
	KoreCrashGame.ayumu.applyKinematics(PenultPhysics.pointVector);
	angle=(angle+10)%360
	/*KoreCrashGame.ayumu.x+=5;
	KoreCrashGame.ayumu.y+=5*/
	//KoreCrashGame.ayumu.rotate(angle);
	
	//PENULT_GAME_ENGINE.layers['fg'].view.translate(KoreCrashGame.ayumu.posVec[0],KoreCrashGame.ayumu.posVec[1] );
	KoreCrashGame.ayumu.draw();		
	KoreCrashGame.test.draw();

	window.requestAnimFrame(KoreCrashGame.koreWaLoop);

};
