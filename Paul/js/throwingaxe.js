var game = game || {};

game.ThrowingAxe = function(position) {
	this.texture = PIXI.Texture.fromImage("sprites/throwingaxe.png");
	this.sprite = new PIXI.Sprite(this.texture);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = position.x;
	this.sprite.position.y = position.y;

	// Add to stage
	game.stage.addChild(this.sprite);

	this.handleInput = function(input) {

	};

	this.update = function(delta) {

	};
};
