var game = game || {};

game.HP = {
	initHealth: function(hp) {
		this.hp = hp;
	},
	takeDamage: function(dmg) {
		this.hp -= dmg;
		this.core.tint = 0x7F0000;
		if (this.hp <= 0) {
			var deathsound = new Audio("sounds/death.wav");
			deathsound.play();
			// Turns off the collision detection between the throwing axe and itself
			this.enemy = false;
			// Stops it from chasing paul
			this.maxSpeed = 0;
			// Stops the walking tweens
			this.walkingtweens.StopWalking();
			this.currentState = null;
			this.kill();
		}
	}
};