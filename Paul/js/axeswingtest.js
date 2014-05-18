var game = game || {};

(function(){

	game.TestAxeSwing = function() {

		// create a texture from an image path
		var texture = PIXI.Texture.fromImage("sprites/bunny.png");

		// create a new Sprite using the texture
		var bunny = new PIXI.Sprite(texture);

		// center the sprites anchor point
		bunny.anchor.x = 1.0;
		bunny.anchor.y = 1.0   ;

		// move the sprite t the center of the screen
		bunny.position.x = 250;
		bunny.position.y = 150;

		game.stage.addChild(bunny);

		this.handleInput = function(input) {
			if (input.pressed('chop')) {
				var tween = new TWEEN.Tween( { } )
		            .to( { }, 1000 )
		            .easing( TWEEN.Easing.Elastic.InOut )
		            .onUpdate( function () {
		            	bunny.rotation -= 0.1;
		            } )
		            .start();
			}
		};

		this.update = function() {

		};

		this.enter = function() {

		};

		this.exit = function() {

		};
	};

})();