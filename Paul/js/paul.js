var game = game || {};

game.Paul = function() {
	this.texture = PIXI.Texture.fromImage("sprites/flannel.png");
	this.sprite = new PIXI.Sprite(this.texture);
	this.sprite.anchor = 0.5;
	this.sprite.anchor = 0.5;
	this.sprite.position.x = game.renderer.width / 2.0;
	this.sprite.position.y = game.renderer.width / 2.0;

	// Add to stage
	game.stage.addChild(this.sprite);

	this.handleInput = function(input) {

	};

	this.update = function(delta) {

	};
};
