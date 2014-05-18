game.PlayScreen = function() {
	this.entities = [];

	this.paul = new game.Paul();

	this.entities.push(this.paul);

	this.handleInput = function(input) {
		this.paul.handleInput(input);
	};

	this.update = function(delta) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(delta);
		}
	}

	this.enter = function() {
	};

	this.exit = function() {
	};
};