var game = game || {};

game.Tree = function(position, lumber) {
	this.lumber = lumber;

	this.texture = PIXI.Texture.fromImage("sprites/trunk.png");
	this.textureBottom = PIXI.Texture.fromImage("sprites/bottom.png");
	this.textureMiddle = PIXI.Texture.fromImage("sprites/middle.png");
	this.textureTop = PIXI.Texture.fromImage("sprites/top.png");
	this.textureAreaSkew = PIXI.Texture.fromImage("sprites/areaskew.png");

	// Trunk
	this.trunk = new PIXI.Sprite(this.texture);
	// Top
	this.top = new PIXI.Sprite(this.textureTop);
	// Middle
	this.middle = new PIXI.Sprite(this.textureMiddle);
	// Bottom
	this.bottom = new PIXI.Sprite(this.textureBottom);
	// Area skew
	this.area = new PIXI.Sprite(this.textureAreaSkew);

	// Adding the 3 parts to the trunk
	// Order matters for the layering
	this.trunk.addChild(this.bottom);
	this.trunk.addChild(this.middle);
	this.trunk.addChild(this.top);

	// Trunk Anchor
	this.trunk.anchor.x = 0.5;
	this.trunk.anchor.y = 0.35;
	this.trunk.position.x = position.x;
	this.trunk.position.y = position.y;

	this.area.anchor.x = 0.0;
	this.area.anchor.y = 0.0;
	this.area.position.y = this.trunk.position.y - 40;
	this.area.position.x = this.trunk.position.x - 72;
	this.area.alpha  = 0.3;


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
	game.stage.addChildAt(this.area,1);
	game.stage.addChildAt(this.trunk,1);
	
	var tree = this;

    var MiddleShake = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 650 )
	    .easing( TWEEN.Easing.Bounce.In )
	    .onUpdate( function () {
	        tree.middle.position.y = this.x;
	    } )
	   	.repeat(Infinity);

   	var BottomShake = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 700 )
	    .easing( TWEEN.Easing.Bounce.In )
	    .onUpdate( function () {
	        tree.bottom.position.y = this.x;
	    } )
	    .repeat(Infinity);

   	var TrunkShake = new TWEEN.Tween( { x: 0.0 })
	    .to( { x: Math.PI * 2.0 }, 1080 )
	    .easing( TWEEN.Easing.Elastic.Out )
	    .onUpdate( function () {
	        tree.trunk.position.y = this.x + 100;
	    } )
	    .onComplete( function() {
	    	this.x = 0;
	    	TrunkShake.start();
	    	tree.removeLumber();
	    	
	    } );
	   	//.repeat(Infinity);

	this.removeLumber = function() {
    	tree.lumber -= 2;

    	// this is hacky
    	// add lumber to the current screens lumber count
    	// this assumes the current screen has this property. : (
    	game.state.currentScreen.lumber += 2;

    	if(tree.lumber === 16){
    		tree.trunk.removeChild(tree.top);
    		MiddleShake.stop();
    	}
    	else if(tree.lumber === 8){
    		tree.removepart(tree.middle, MiddleShake);
    		BottomShake.stop();
    	}
    	else if(tree.lumber === 0){
    		tree.removepart(tree.bottom, BottomShake);
    		TrunkShake.stop();
    		game.stage.removeChild(tree.trunk);
    		return;
    	}	
	};

	// State
	this.chopping = false;
	this.chop = function() {
		TrunkShake.start();
		MiddleShake.start();
		BottomShake.start();

		this.chopping = true;
	};

	this.stopChopping = function() {
		TrunkShake.stop();
		MiddleShake.stop();
		BottomShake.stop();

		this.chopping = false;
	};

	this.removepart = function(portion, tween){
		this.trunk.removeChild(portion);
		tween.stop();
	};

	this.handleInput = function(input) {

	};

	this.update = function(delta, screen) {
		var LengthOfLegs = 32;
		var x = screen.paul.core.position.x;
		var y = screen.paul.core.position.y + LengthOfLegs;
		if (this.area.getBounds().contains(x, y)) {
			if (!this.chopping) {
				this.chop();
			}
		}
		else {
			this.stopChopping();
		}
	};

};
