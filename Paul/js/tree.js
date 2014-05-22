var game = game || {};

game.Tree = function(position, lumber) {
	this.lumber = lumber;
	this.initialY = position.y;

	this.texture = PIXI.Texture.fromImage("sprites/trunk.png");
	this.textureBottom = PIXI.Texture.fromImage("sprites/bottom.png");
	this.textureMiddle = PIXI.Texture.fromImage("sprites/middle.png");
	this.textureTop = PIXI.Texture.fromImage("sprites/top.png");
	this.textureAreaSkew = PIXI.Texture.fromImage("sprites/areaskew.png");
	this.lumberTexture = PIXI.Texture.fromImage("sprites/lumber.png");

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
	this.area.alpha  = 0.5;


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
	game.stage.addChildAt(this.trunk,1);
	game.stage.addChildAt(this.area,1);
	
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
	    .to( { x: Math.PI * 2.0 }, 650 )
	    .easing( TWEEN.Easing.Elastic.Out )
	    .onUpdate( function () {
	        tree.trunk.position.y = this.x + tree.initialY;
	    } )
	    .onComplete( function() {
	    	this.x = 0;
	    	//console.log(tree.area.getBounds());
	    	TrunkShake.start();
	    	tree.removeLumber();
	    } );
	   	//.repeat(Infinity);

	// Spawns a lumber sprite and makes a tween to make it go
	// from (x, y) to (x1, y1) over t milliseconds.
	this.makeLumberSprite = function(start, end, t) {
		var sprite = new PIXI.Sprite(this.lumberTexture);
		sprite.position.x = start.x;
		sprite.position.y = start.y;

		game.stage.addChild(sprite);

		var tween = new TWEEN.Tween({ x: sprite.position.x, y: sprite.position.y })
							 .to({ x: end.x, y: end.y }, t)
							 .easing(TWEEN.Easing.Linear.None)
							 .onUpdate(function() {
							 	sprite.position.x = this.x;
							 	sprite.position.y = this.y;
							 })
							 .onComplete(function() {
							 	game.stage.removeChild(sprite);
							 })
							 .start();
	};

	this.removeLumber = function() {


    
		// This just stop from giving lumber if this gets called and it does.
		// For some reason tree.area gets removed but the bounds are still there so
		// you can walk back into the chop area and it will call this.chop(); and start up trunkshake.start(); again
		// the area bounds need to be cleared, i would of thought they would be removed or 0,0 or something when the object gets removed.
		if(tree.lumber > 0){
	    	tree.lumber -= 2;
	    	this.makeLumberSprite({ x: this.area.position.x, y: this.area.position.y}, game.state.currentScreen.getLumberGUIPosition() , 450);
	    	var treeChop = new Audio("sounds/treechop.wav");
	    	treeChop.play();

	    	// this is hacky
	    	// add lumber to the current screens lumber count
	    	// this assumes the current screen has this property. : (
	    	game.state.currentScreen.lumber += 2;
    	}
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
    		// This gets called again because of this.chop() gets called and this.chop() gets called because of the area.bounds aren't clearing
    		game.stage.removeChild(tree.area);
    		game.stage.removeChild(tree.trunk);
    		var i = game.state.currentScreen.entities.indexOf(tree);
    		game.state.currentScreen.entities.splice(i, 1);
    		TrunkShake.stop();
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

		var p = screen.paul.position();

		if (this.area.getBounds().contains(p.x, p.y)) {
			if (!this.chopping) {
				this.chop();
				this.area.alpha = 0.5;
			}
		}
		else {
			this.stopChopping();
			this.area.alpha = 0.0;

		}
	};

};
