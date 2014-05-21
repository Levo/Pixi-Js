var game = game || {};

game.HP = {
	initMoving: function() {
		this.hp = 10;
	},
	takeDamage: function(dmg, entity) {
		this.hp -= dmg;
		this.tint = 0x7F0000;
		if (this.hp < 0) {
			this.onDeath();
		}
	},
	onDeath: function() {
		game.removeObject(this);
	}
};