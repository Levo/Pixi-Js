var game = game || {};

game.HP = {
	initHealth: function() {
		this.hp = 10;
	},
	takeDamage: function(dmg, entity) {
		this.hp -= dmg;
		this.core.tint = 0x7F0000;
		if (this.hp <= 0) {
			this.onDeath(entity);
		}
	},
	onDeath: function(entity) {
		// The entitiy must have this kill function or it would break
		this.kill();
	}
};