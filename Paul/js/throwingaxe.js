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

	// How much dmg the axe does
	this.dmg = 5;

	this.initCollision(this.sprite.position, Math.max(this.sprite.width, this.sprite.height));

	this.path = function(){
		// The path the axe will follow from the calculated angle
		this.sprite.position.x += Math.cos(this.angle) * this.speed;
		this.sprite.position.y += Math.sin(this.angle) * this.speed;

		// This rotates the axe in radians
		this.sprite.rotation += (this.rotationspeed) * this.spindirection;
	};

	this.remove = function() {
		this.removeCollision();
		game.stage.removeChild(this.sprite);
		var i = game.state.currentScreen.entities.indexOf(this);
		game.state.currentScreen.entities.splice(i,1);
	};

	this.checkbounds = function(){
		if(this.sprite.position.x > game.renderer.width || this.sprite.position.x < 0 || this.sprite.position.y > game.renderer.height || this.sprite.position.y < 0){
			this.remove();
		}
	};

	this.handleInput = function(input) {

	};

	this.update = function(delta, screen) {
		// Movement of the axe
		this.path();

		// Checking Bounds for deleting the object
		this.checkbounds();

		// Only checks the animals inside the enemies array
		for (var i = 0; i < screen.enemies.length; i++) {
			var e = screen.enemies[i];
			// e.core assumes the entity has a core sprite. : (
			if (e.enemy && this.collidesWith(e.collisionSphere)) {
				// apply dmg to what we hit.
				e.takeDamage(this.dmg);

				// the axe hit so remove it
				this.remove();
			}
		}

		this.drawDebugCollision();
	};
};

_.extend(game.ThrowingAxe.prototype, game.Collision);
