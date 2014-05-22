var game = game || {};

game.HP = {
	initHealth: function(hp) {
		this.hp = hp;
	},
	takeDamage: function(dmg) {
		this.hp -= dmg;
		this.core.tint = 0x7F0000;
		if (this.hp <= 0) {
			//this.onDeath(entity);
			var death = new Audio("sounds/death.wav");
			death.play();
			this.kill();
		}
	},
	onDeath: function(entity) {
		// The entitiy must have this kill function or it would break
		this.kill();
	}
};