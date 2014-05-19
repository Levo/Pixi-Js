var game = game || {};

(function(){

	PIXI.Stage.prototype.resetStage = function() {
		for (var i = 0; i < this.children.length; i++) {
			console.log(this.children[i]);
        	this.removeChild(this.children[i]);
		}
	};

	//76, 116, 48
	var green = 0x4C7430;

	game.stage = null;
	game.renderer = null;
	game.state = {
		currentScreen: null
	};
	game.font = {
		font: "16px Arial",
		fill: "white"
	};
	game.input = null;
	game.stats = null;

	game.init = function() {

		game.stats = new Stats();
		document.body.appendChild(game.stats.domElement);
		game.stats.domElement.style.position = "absolute";
		game.stats.domElement.style.top = "0px";

		// create an new instance of a pixi stage
		game.stage = new PIXI.Stage(green);

		// create a renderer instance
		game.renderer = PIXI.autoDetectRenderer(1280, 720);

		// add the renderer view element to the DOM
		document.body.appendChild(game.renderer.view);

		// action -> keycode mapping
		game.input = new Input({
			'start' 	: 13,		// enter
			'chop' 		: 67,		// space
			'walkleft' 	: 65,		// a 
			'walkright' : 68,		// d
			'walkup'	: 87,		// w
			'walkdown'	: 83,		// s
			'shake'		: 66,
		});

		game.trigger(game.PlayScreen);
	};

	game.trigger = function(screenType) {
		if (game.state.currentScreen) {
			game.state.currentScreen.exit();
		}

		game.stage.resetStage();

		game.state.currentScreen = new screenType();
		game.state.currentScreen.enter();
	};


	var last = Date.now();

	game.update = function() {
		game.stats.begin();

		requestAnimFrame(game.update);

		// Calculate time delta
		var now = Date.now();
    	var delta = (now - last) / 1000.0;
    	last = now;

		// Let current game state handle input.
		game.state.currentScreen.handleInput(game.input);
		
		// Update current game state
		game.state.currentScreen.update(delta);

		// Update Tweens
		TWEEN.update();

		// Render
		game.renderer.render(game.stage);

		// clear
		game.input.clear();

		game.stats.end();
	};


})();

window.onload = function() {
	game.init();
	game.update();
};