game.PlayScreen = function() {

	var self = this;
	var lumberText = function() {
		return 'Lumber - ' + self.lumber;
	};

	this.entities = [];
	this.lumber = 0;

	this.lumberGUI = new game.TextWidget(lumberText(), game.renderer.width * 0.25, 0.0);

	this.getLumberGUIPosition = function() {
		return { x: this.lumberGUI.sprite.position.x, y: this.lumberGUI.sprite.position.y };
	};

	this.handleInput = function(input) {
		this.paul.handleInput(input);

		if (input.pressed('chop')) {
    		this.tree.makeLumberSprite({ x: this.tree.area.position.x, y: this.tree.area.position.y}, this.getLumberGUIPosition(), 1000);
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
		this.lumbermill = new game.LumberMill({x: 150, y:550});
		this.paul = new game.Paul();
		this.tree = new game.Tree({ x: 500, y: 500 }, 24);
		this.wolf = new game.Wolf({ x: 250, y: 250});
		this.bear = new game.Bear({ x: 350, y: 350});
		
		this.entities.push(this.lumbermill);
		this.entities.push(this.paul);
		this.entities.push(this.tree);
		this.entities.push(this.wolf);
		this.entities.push(this.bear);
	};

	this.exit = function() {
	};
};	