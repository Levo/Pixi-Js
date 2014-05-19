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

		if (input.pressed('chop')) {
			this.tree.chop();
		}
	};

	this.update = function(delta) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(delta, this);
		}
		this.lumberGUI.setText(lumberText());
	};

	this.enter = function() {
		this.paul = new game.Paul();
		this.tree = new game.Tree({ x: 150, y: 100 }, 24);
		this.wolf = new game.Wolf({ x: 250, y: 250});

		_.extend(game.Paul.prototype, game.Moving);

		this.entities.push(this.paul);
		this.entities.push(this.tree);
		this.entities.push(this.wolf);
	};

	this.exit = function() {
	};
};	