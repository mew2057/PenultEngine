function initKoreWaCrashGame(canvasIDs)
{
	KORE_WA_GAME = new KoreCrashGame(canvasIDs);
};

KoreCrashGame.scene = {};

function KoreCrashGame(canvasIDs)
{

	initPenultEngine(canvasIDs);
	// TESTING	
	PenultSound.load("main", bgm["main"]);
	//PenultSound.play("main", true);
	
	KoreCrashGame.scene = new PenultScene();
	
	KoreCrashGame.scene.load(
		[['KoreWaCrashDesuKa/assets/lightSpec.json', 'light'],
		 ['KoreWaCrashDesuKa/assets/ground.json', 'ground']],
		 'KoreWaCrashDesuKa/assets/level0.json');
	

	//KoreCrashGame.scene.loadTMX('KoreWaCrashDesuKa/assets/level0.json');
	for (var id in PENULT_GAME_ENGINE.layers)
	{
		KoreCrashGame.scene.createLayer(id, PENULT_GAME_ENGINE.layers[id]);
	}
	
	KoreCrashGame.ayumu = new PenultPhysicsActor();
	KoreCrashGame.test = new PenultActor();
	KoreCrashGame.ayumu.init(KoreCrashGame.scene.getLayer('fg'),0,0,80,80);
	KoreCrashGame.test.init(KoreCrashGame.scene.getLayer('fg'),400,50,160,160);
	
	
	
	/*PenultSprite.importSpriteSheet('KoreWaCrashDesuKa/assets/lightSpec.json', 'light');
	PenultSprite.importSpriteSheet('KoreWaCrashDesuKa/assets/ground.json', 'ground');*/
	//PenultSprite.appendToSpriteSheet(SPRITE_SOURCES['Ayumu_Spinning'],'Ayumu_Spinning');
	

//PenultSprite.preRenderSheet();

//return;

	KoreCrashGame.ayumu.setImageSource(SPRITE_SOURCES['Ayumu_Spinning'].src);
		KoreCrashGame.test.setImageSource(SPRITE_SOURCES['Ayumu_Spinning'].src);

	KoreCrashGame.ayumu.applyKinematics(PenultPhysics.convertToVectorComponents(Math.atan(500/1024),15));
	
	console.log(KoreCrashGame.ayumu);

		KoreCrashGame.ayumu.draw();
		KoreCrashGame.test.draw();
	window.requestAnimFrame(KoreCrashGame.koreWaLoop);
};

var angle=0;
KoreCrashGame.koreWaLoop = function()
{

    KoreCrashGame.scene.getLayer('fg').clear();

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
