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
		game.stage.removeChild(entity.core);
		var i = game.state.currentScreen.enemies.indexOf(entity);
		game.state.currentScreen.enemies.splice(i,1);	
	}
};