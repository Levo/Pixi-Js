var game = game || {};

game.ThrowingAxe = function(position, scale, mouseX, mouseY, spindirection) {
	this.texture = PIXI.Texture.fromImage("sprites/throwingaxe.png");
	this.sprite = new PIXI.Sprite(this.texture);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = position.x;
	this.sprite.position.y = position.y;

	// Mouse Coordinates
	this.mouseX = mouseX;
	this.mouseY = mouseY;

	// Paul and the axe will face the same direction when he throws the axe
	this.sprite.scale.x = scale;

	// How fast the axe will move
	this.speed = 5;

	// The direction of spin
	this.spindirection = spindirection;

	// speed of rotation
	this.rotationspeed = Math.PI/8;

	// Calculates the angle from the core of paul to the mouse position
	this.angle = Math.atan2(mouseY - this.sprite.position.y, mouseX - this.sprite.position.x);

	// Add to stage
	game.stage.addChild(this.sprite);

	this.path = function(){
		// The path the axe will follow from the calculated angle
		this.sprite.position.x += Math.cos(this.angle) * this.speed;
		this.sprite.position.y += Math.sin(this.angle) * this.speed;

		// This rotates the axe in radians
		this.sprite.rotation += (this.rotationspeed) * this.spindirection;
	};

	this.checkbounds = function(){
		if(this.sprite.position.x > game.renderer.width || this.sprite.position.x < 0 || this.sprite.position.y > game.renderer.height || this.sprite.position.y < 0){

		}
	};

	this.destory = function(){
		game.stage.removeChild(this.sprite);
	};

	this.handleInput = function(input) {

	};

	this.update = function(delta) {
		// Movement of the axe
		this.path();

		// Checking Bounds for deleting the object
		this.checkbounds();
	};
};
