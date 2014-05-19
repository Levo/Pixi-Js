game.PlayScreen = function() {

	var self = this;
	var lumberText = function() {
		return 'Lumber - ' + self.lumber;
	};

	this.entities = [];
	this.lumber = 0;

	this.lumberGUI = new game.TextWidget(lumberText(), game.renderer.width * 0.25, 0.0);

	this.handleInput = function(input) {
		this.paul.handleInput(input);
	};

	this.update = function(delta) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(delta);
		}

		this.lumberGUI.setText(lumberText());
	};

	this.enter = function() {
		this.paul = new game.Paul();
		this.tree = new game.Tree({ x: 150, y: 100 }, 24);

		_.extend(game.Paul.prototype, game.Moving);

		this.entities.push(this.paul);
		this.entities.push(this.tree);
	};

	this.exit = function() {
	};
};	