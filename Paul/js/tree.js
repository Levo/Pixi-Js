var game = game || {};

game.Tree = function() {
	this.texture = PIXI.Texture.fromImage("sprites/trunk.png");
	this.textureBottom = PIXI.Texture.fromImage("sprites/bottom.png");
	this.textureMiddle = PIXI.Texture.fromImage("sprites/middle.png");
	this.textureTop = PIXI.Texture.fromImage("sprites/top.png");

	// Trunk
	this.trunk = new PIXI.Sprite(this.texture);
	// Top
	this.top = new PIXI.Sprite(this.textureTop);
	// Middle
	this.middle = new PIXI.Sprite(this.textureMiddle);
	// Bottom
	this.bottom = new PIXI.Sprite(this.textureBottom);

	// Adding the 3 parts to the trunk
	// Order matters for the layering
	this.trunk.addChild(this.bottom);
	this.trunk.addChild(this.middle);
	this.trunk.addChild(this.top);

	// Trunk Anchor
	this.trunk.anchor.x = 0.5;
	this.trunk.anchor.y = 0.35;
	this.trunk.position.x = 150;
	this.trunk.position.y = 100;

	// Anchoring the 3 tree parts

	// Top
	this.top.anchor.x = 0.5;
	this.top.anchor.y = 1.70;
	this.top.position.x = 0;
	this.top.position.y = 0;


	// Middle
	this.middle.anchor.x = 0.5;
	this.middle.anchor.y = 1.35;
	this.middle.position.x = 0;
	this.middle.position.y = 0;

	// Bottom
	this.bottom.anchor.x = 0.5;
	this.bottom.anchor.y = 1;
	this.bottom.position.x = 0;
	this.bottom.position.y = 0;

	// Add to stage
	game.stage.addChild(this.trunk);
	
	var tree = this;

	var TopShake = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 800 )
	    .easing( TWEEN.Easing.Bounce.In )
	    .onUpdate( function () {
	        tree.top.position.y = this.x;
	    } )
	   	.onComplete( function() {
	        this.x = 0;
	        TopShake.start();
	    } )

    var MiddleShake = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 650 )
	    .easing( TWEEN.Easing.Bounce.In )
	    .onUpdate( function () {
	        tree.middle.position.y = this.x;
	    } )
	   	.onComplete( function() {
	        this.x = 0;
	        MiddleShake.start();
    } )

   	var BottomShake = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 700 )
	    .easing( TWEEN.Easing.Bounce.In )
	    .onUpdate( function () {
	        tree.bottom.position.y = this.x;
	    } )
	   	.onComplete( function() {
	        this.x = 0;
	        BottomShake.start();
    } )

   	var TrunkShake = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 1080 )
	    .easing( TWEEN.Easing.Elastic.Out )
	    .onUpdate( function () {
	        tree.trunk.position.y = this.x + 100;
	    } )
	   	.onComplete( function() {
	        this.x = 0;
	        TrunkShake.start();
    } )

	TrunkShake.start();
	TopShake.start();
	MiddleShake.start();
	BottomShake.start();

	this.handleInput = function(input) {

	};

	this.update = function(delta) {

	};
};
