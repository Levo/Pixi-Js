var game = game || {};

game.WalkTest = function() {

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage("sprites/flannel.png");
	var bunntex = PIXI.Texture.fromImage("sprites/bunny.png");

	// create a new Sprite using the texture
	var paul = new PIXI.Sprite(texture);
	var bunny = new PIXI.Sprite(bunntex);
	paul.addChild(bunny);

	paul.anchor.x = 0.5;
	paul.anchor.y = 0.5;

	// move the sprite t the center of the screen
	paul.position.x = game.renderer.width / 2.0;;
	paul.position.y = game.renderer.height / 2.0;;

	game.stage.addChild(paul);

	var tweening = false;

	this.handleInput = function(input) {
		//console.log(tweening);
		if (!tweening && (input.pressed('walkleft') || input.pressed('walkright'))) {
			tweening = true;
			var tween = new TWEEN.Tween( { x: 0.0 } )
	            .to( { x: Math.PI * 2.0 }, 500 )
	            //.easing( TWEEN.Easing.Cubic.Out )
	            .onUpdate( function () {
					paul.position.y = Math.sin(this.x) * 10.0;
					paul.position.y += game.renderer.height / 2.0;
	            } )
	            .onComplete( function() {
	            	tweening = false;
	            } )
	            .start();
		}
	};

	this.update = function(delta) {
	};

	this.enter = function() {
	};

	this.exit = function() {
	};
};
