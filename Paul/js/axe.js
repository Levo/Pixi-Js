var game = game || {};

game.Axe = function(position) {
	this.texture = PIXI.Texture.fromImage("sprites/throwingaxe.png");
	this.sprite = new PIXI.Sprite(this.texture);
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = position.x;
	this.sprite.position.y = position.y;

	this.attack = false;

	// Add to stage
	game.stage.addChild(this.sprite);

	// How much damage the axe does
	this.dmg = 10;

	this.initCollision(this.sprite, 15);

	// removal function if needed
	this.remove = function(){
		this.removeCollision();
		game.stage.removeChild(this.sprite);
		var i = game.state.currentScreen.entities.indexOf(this);
		game.state.currentScreen.entities.splice(i,1);
	};

	this.handleInput = function(input) {

	};

	this.positionofcollision = function(){
		// Moves the collision sphere depending on what way you are facing
		// Trying to get the position of the sphere on the blade of the axe
		// There has to be a better way of doing this? I can't figure out how
		if(this.sprite.scale.x === -1){
			this.collisionSphere.position.x = this.sprite.position.x - 10;
			this.collisionSphere.position.y = this.sprite.position.y - 25;
		}
		else if(this.sprite.scale.x === 1){
			this.collisionSphere.position.x = this.sprite.position.x + 10;
			this.collisionSphere.position.y = this.sprite.position.y - 25;
		}
	};

	this.checkcollision = function(screen){
		// Only checks the animals inside the enemies array
		for (var i = 0; i < screen.enemies.length; i++) {
			var e = screen.enemies[i];
			// e.core assumes the entity has a core sprite. : (
			if (e.enemy && this.collidesWith(e.collisionSphere)) {
				// apply dmg to what we hit.
				e.takeDamage(this.dmg,e);
			}
		}
	};

	this.update = function(delta, screen) {
		this.positionofcollision();

		if(this.attack){
			this.checkcollision(screen);
		}

		this.drawDebugCollision();
	};
};

_.extend(game.Axe.prototype, game.Collision);