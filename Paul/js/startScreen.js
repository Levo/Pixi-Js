var game = game || {};

game.StartScreen = function() {

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage("sprites/bunny.png");

	// create a new Sprite using the texture
	var bunny = new PIXI.Sprite(texture);

	// center the sprites anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite t the center of the screen
	bunny.position.x = 200;
	bunny.position.y = 150;

	game.stage.addChild(bunny);

	var text = new PIXI.Text("Press Start", game.font);
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	text.position.x = game.renderer.width / 2.0;
	text.position.y = game.renderer.height - text.height;
	game.stage.addChild(text);

	this.handleInput = function(input) {
		if (input.pressed('start')) {
			game.trigger(game.TestScreen);
		}
	};

	this.update = function(delta) {
		// just for fun, let's rotate mr rabbit a little
		bunny.rotation += 0.1;
	}

	this.enter = function() {
	};

	this.exit = function() {
	};
};