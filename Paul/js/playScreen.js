game.PlayScreen = function() {

	var self = this;
	var lumberText = function() {
		return 'Lumber : ' + self.lumber;
	};

	var paperText = function() {
		return 'Paper : ' + self.paper;
	};
	this.treepositions = [];
	this.entities = [];
	this.enemies = [];
	this.lumber = 0;
	this.paper = 0;

	this.lumberGUI = new game.TextWidget(lumberText(), game.renderer.width * 0.25, 0.0);
	this.PaperGUI = new game.TextWidget(paperText(), game.renderer.width * 0.35, 0.0);

	this.createtreepositions = function(){
		var position = {x:null,y:null}	
		var offsetX = -50;
		var offsetY = -50;
		var rows = 4;
		var columns = 8;
		// Creates 3 rows
		for (var w = 1; w < (rows+1); w++) {
			position.y = (w*170) + offsetY;
			for (var i = 1; i < (columns+1); i++) {
				position.x = (i*150) + offsetX;
				this.treepositions.push(position);
				var tree = new game.Tree({x:position.x, y:position.y}, 24);
				this.entities.push(tree);
			};
		};
	};

	this.nearPaul = function(e) {
		//console.log(this.paul.position());
		//console.log(e.position());
		var d = game.subtract(this.paul.position(), e.position());
		var l = game.length(d);

		// if we are within 
		return (l < 50);
	};

	this.getLumberGUIPosition = function() {
		return { x: this.lumberGUI.sprite.position.x, y: this.lumberGUI.sprite.position.y };
	};

	this.getPaperGUIPosition = function() {
		return { x: this.PaperGUI.sprite.position.x, y: this.PaperGUI.sprite.position.y };
	};

	this.handleInput = function(input) {
		this.paul.handleInput(input);
	};

	this.update = function(delta) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(delta, this);
		}
		for (var i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update(delta, this);
		};
		this.lumberGUI.setText(lumberText());
		this.PaperGUI.setText(paperText());
	};

	this.enter = function() {
		this.lumbermill = new game.LumberMill({x: game.renderer.width/2, y: (game.renderer.height/2) - 35});
		// Fills the tree position array with the spawn locations of the trees
		this.createtreepositions();
		this.paul = new game.Paul();
		//this.tree = new game.Tree({ x: 500, y: 500 }, 24);
		
		this.entities.push(this.lumbermill);
		this.entities.push(this.paul);
		//this.entities.push(this.tree);

		// spawn a wolf along left edge of screen
		var self = this;
		this.wolfSpawner = new game.Spawner(game.Wolf, 1000, 'y', function(w) {
			self.enemies.push(w);
		});
		this.wolfSpawner.start();

		// spawn a bear on the top of the screen
		this.bearSpawner = new game.Spawner(game.Bear, 8000, 'x', function(w) {
			self.enemies.push(w);
		});
		this.bearSpawner.start();
	};

	this.exit = function() {
		this.wolfSpawner.stop();
		this.bearSpawner.stop();
	};
};	