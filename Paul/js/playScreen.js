game.PlayScreen = function() {

	var self = this;
	var lumberText = function() {
		return 'Lumber : ' + self.lumber;
	};

	var paperText = function() {
		return 'Paper : ' + self.paper;
	};

	this.entities = [];
	this.lumber = 0;
	this.paper = 0;

	this.lumberGUI = new game.TextWidget(lumberText(), game.renderer.width * 0.25, 0.0);
	this.PaperGUI = new game.TextWidget(paperText(), game.renderer.width * 0.35, 0.0);

	this.getLumberGUIPosition = function() {
		return { x: this.lumberGUI.sprite.position.x, y: this.lumberGUI.sprite.position.y };
	};

	this.getPaperGUIPosition = function() {
		return { x: this.PaperGUI.sprite.position.x, y: this.PaperGUI.sprite.position.y };
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
		this.PaperGUI.setText(paperText());

		game.drawCircle(100, 100, 25);
	};

	this.enter = function() {
		this.lumbermill = new game.LumberMill({x: 150, y:550});
		this.paul = new game.Paul();
		this.tree = new game.Tree({ x: 500, y: 500 }, 24);
		
		this.entities.push(this.lumbermill);
		this.entities.push(this.paul);
		this.entities.push(this.tree);

		var self = this;
		this.wolfSpawner = new game.Spawner(game.Wolf, 1, 1000, { x: 250, y: 250 }, function(w) {
			self.entities.push(w);
		});
		this.wolfSpawner.start();

		this.bearSpawner = new game.Spawner(game.Bear, 1, 8000, { x: 350, y: 350 }, function(w) {
			self.entities.push(w);
		});
		this.bearSpawner.start();
	};

	this.exit = function() {
		this.wolfSpawner.stop();
		this.bearSpawner.stop();
	};
};	