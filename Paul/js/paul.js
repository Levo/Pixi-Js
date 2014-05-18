var game = game || {};

var Moving = {
	velocity: { x: 0.0, y: 0.0 },
	heading: { x: 0.0, y: 0.0 },
	mass: 1.0,
	maxSpeed: 10.0,
};

game.WalkingState = function() {
	this.name = "Walking";
	this.handleInput = function(input) {

	};
	this.update = function(delta) {

	};
};

game.Paul = function() {
	this.texture = PIXI.Texture.fromImage("sprites/flannel.png");
	this.sprite = new PIXI.Sprite(this.texture);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = game.renderer.width / 2.0;
	this.sprite.position.y = game.renderer.height / 2.0;

	// Add to stage
	game.stage.addChild(this.sprite);

	this.stateText = new PIXI.Text("", game.font);
	this.stateText.anchor.x = 0.5;
	this.stateText.anchor.y = 0.5;
	this.stateText.position.x = game.renderer.width / 2.0;
	this.stateText.position.y = game.renderer.height - this.stateText.height;
	game.stage.addChild(this.stateText);

	this.currentState = new game.WalkingState();

	this.stateText.setText(this.currentState.name);

	this.handleInput = function(input) {
		this.currentState.handleInput(input);
	};

	this.update = function(delta) {
		this.currentState.update(delta);
	};
};
