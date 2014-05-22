game.endScreen = function() {

	var self = this;
	
	this.entities = [];

	var winText = function() {
		return 'YOU WIN'
	};

	this.winGUI = new game.TextWidget(winText, game.renderer.width*0.5, game.renderer.height*0.5);

	this.handleInput = function(input) {

	};

	this.update = function(delta) {
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(delta, this);
		}
		this.winGUI.setText(winText());
	};

	this.enter = function() {
		
	};

	this.exit = function() {

	};
};	