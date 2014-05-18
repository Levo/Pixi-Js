var game = game || {};

game.TestScreen = function() {

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage("sprites/bunny.png");

	// create a new Sprite using the texture
	var bunny = new PIXI.Sprite(texture);

	// center the sprites anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite t the center of the screen
	bunny.position.x = 250;
	bunny.position.y = 150;

	game.stage.addChild(bunny);

	this.handleInput = function(input) {

	};

	this.update = function() {
		// just for fun, let's rotate mr rabbit a little
		bunny.rotation -= 0.1;
	};

	this.enter = function() {

	};

	this.exit = function() {

	};
};