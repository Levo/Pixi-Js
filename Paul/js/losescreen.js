game.loseScreen = function() {

	var self = this;
	
	this.entities = [];

	var loseText = function() {
		return 'YOU LOST'
	};

	this.winGUI = new game.TextWidget(loseText, game.renderer.width*0.5, game.renderer.height*0.5);

	this.handleInput = function(input) {

	};

	this.update = function(delta) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(delta, this);
		}
		this.winGUI.setText(loseText());
	};

	this.enter = function() {
		
	};

	this.exit = function() {

	};
};	