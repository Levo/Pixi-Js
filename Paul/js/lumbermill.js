var game = game || {};


game.MillTweens = function(entity){

	this.saw = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2}, 75 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.saw.rotation = this.x;
	    } )
	    .repeat(Infinity)

	this.bigcog = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2}, 75 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.bigcog.rotation = this.x;
	    } )
	    .repeat(Infinity)

	this.smallcog = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2}, 75 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.smallcog.rotation = this.x;
	    } )
	    .repeat(Infinity)

	this.millbox = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI}, 250 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.millbox.position.x = this.x;
	    } )
	    .repeat(Infinity)

	this.chimney = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI}, 250 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.chimney.position.y = this.x;
	    } )
	    .repeat(Infinity)

	this.bigsmoke = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 1.5}, 175 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.bigsmoke.rotation = this.x;
	    } )
	    .repeat(Infinity)	

	this.smallsmoke = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 1.5}, 175 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.smallsmoke.rotation = this.x;
	    } )
	    .repeat(Infinity)	


	this.StartMill = function(){
		this.saw.start();
		this.bigcog.start();
		this.smallcog.start();
		this.millbox.start();
		this.chimney.start();
		this.bigsmoke.start();
		this.smallsmoke.start();
	};

	this.StopMill = function(){
		this.saw.stop();
		this.bigcog.stop();
		this.smallcog.stop();
		this.millbox.stop();
		this.chimney.stop();
		this.bigsmoke.stop();
		this.smallsmoke.stop();
	};
};

game.LumberMill = function(position) {
	// All the textures
	this.areatexture = PIXI.Texture.fromImage("sprites/lumbermillarea.png");
	this.coretexture = PIXI.Texture.fromImage("sprites/core.png");
	this.millbodytexture = PIXI.Texture.fromImage("sprites/millbody.png");
	this.bigsmoketexture = PIXI.Texture.fromImage("sprites/bigsmoke.png");
	this.smallsmoketexture = PIXI.Texture.fromImage("sprites/smallsmoke.png");
	this.chimneytexture = PIXI.Texture.fromImage("sprites/chimney.png");
	this.sawtexture = PIXI.Texture.fromImage("sprites/saw.png");
	this.millboxtexture = PIXI.Texture.fromImage("sprites/millbox.png");
	this.bigcogtexture = PIXI.Texture.fromImage("sprites/bigcog.png");
	this.smallcogtexture = PIXI.Texture.fromImage("sprites/smallcog.png");
	this.papertexture = PIXI.Texture.fromImage("sprites/paper.png");

	// Creating each sprite body part
	this.area = new PIXI.Sprite(this.areatexture);
	this.core = new PIXI.Sprite(this.coretexture);
	this.body = new PIXI.Sprite(this.millbodytexture);
	this.bigsmoke = new PIXI.Sprite(this.bigsmoketexture);
	this.smallsmoke = new PIXI.Sprite(this.smallsmoketexture);
	this.chimney =  new PIXI.Sprite(this.chimneytexture);
	this.saw = new PIXI.Sprite(this.sawtexture);
	this.millbox = new PIXI.Sprite(this.millboxtexture);
	this.bigcog = new PIXI.Sprite(this.bigcogtexture);
	this.smallcog = new PIXI.Sprite(this.smallcogtexture);
	
	// Anchoring the core of the mill
	this.core.anchor.x = 0.5;
	this.core.anchor.y = 0.5;
	this.core.position.x = position.x;
	this.core.position.y = position.y;

	// Chimney
	this.chimney.anchor.x = -1.5;
	this.chimney.anchor.y = 1.0;

	// Mill/Saw Box
	this.millbox.anchor.x = -1.85;
	this.millbox.anchor.y = -1.5;

	// Saw
	this.saw.anchor.x = 0.5;
	this.saw.anchor.y = 0.5;
	this.saw.position.x = this.core.position.x + 110;
	this.saw.position.y = this.core.position.y + 25;

	// Big Smoke
	this.bigsmoke.anchor.x = 0.5;//0.0;
	this.bigsmoke.anchor.y = 0.5;//1.4;
	this.bigsmoke.position.x = this.core.position.x + 15;
	this.bigsmoke.position.y = this.core.position.y - 35;
	// Small Smoke
	this.smallsmoke.anchor.x = 0.5;//-0.5;
	this.smallsmoke.anchor.y = 0.5;//1.4;
	this.smallsmoke.position.x = this.core.position.x + 25;
	this.smallsmoke.position.y = this.core.position.y - 25;

	// Big Cog
	this.bigcog.anchor.x = 0.5;//-1.2;
	this.bigcog.anchor.y = 0.5;//-0.3;
	this.bigcog.position.x = this.core.position.x + 50;
	this.bigcog.position.y = this.core.position.y + 25;
	// Small Cog
	this.smallcog.anchor.x = 0.5;//-0.6;
	this.smallcog.anchor.y = 0.5;//-0.7;
	this.smallcog.position.x = this.core.position.x + 25;
	this.smallcog.position.y = this.core.position.y + 35;
	
	//Area
	this.area.anchor.x = 0.5;
	this.area.anchor.y = 0.5;
	this.area.position.x = this.core.position.x + 65;
	this.area.position.y = this.core.position.y + 41;

	// Add to stage and core
	game.stage.addChild(this.area);
	game.stage.addChild(this.saw);
	game.stage.addChild(this.bigsmoke);
	game.stage.addChild(this.smallsmoke);
	this.core.addChild(this.body);
	this.core.addChild(this.millbox);
	this.core.addChild(this.chimney);
	game.stage.addChild(this.core);
	game.stage.addChild(this.bigcog);
	game.stage.addChild(this.smallcog);


	this.milltweens = new game.MillTweens(this);
	this.milltweens.StartMill();

	var mill = this;

    var millbody = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2}, 250 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	mill.body.position.y = this.x;
	    } )
	    .onComplete( function() {
	    	this.x = 0;
	    	// Calls itself to start again
	    	millbody.start();
	 		// Read Inside this.removelumber
	    	mill.removelumber();
	    } )

	this.makePaperSprite = function(start, end, t) {
		var sprite = new PIXI.Sprite(this.papertexture);
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
							 	if (game.stage.children.indexOf(sprite) !== -1)
							 		game.stage.removeChild(sprite);
							 })
							 .start();
	};


	this.destroy = function(){
		this.milltweens.StopMill();
		game.stage.removeChild(this.saw);
		game.stage.removeChild(this.bigsmoke);
		game.stage.removeChild(this.smallsmoke);
		game.stage.removeChild(this.core);
		game.stage.removeChild(this.bigcog);
		game.stage.removeChild(this.smallcog);
		game.stage.removeChild(this.area);
	};

	this.removelumber = function(){
		// This function removes lumber from the screen
		// and adds paper
		// Right now it needs 3 lumber to create 1 paper.
		if(game.state.currentScreen.lumber >= 3){
			game.state.currentScreen.lumber -= 3;
			game.state.currentScreen.paper += 1;

			var paper = new Audio("sounds/papersound.wav");
			paper.play();

			// makes the paper sprite, same as the log sprite
			this.makePaperSprite({ x: this.area.position.x, y: this.area.position.y}, game.state.currentScreen.getPaperGUIPosition() , 1000);

		}
	};

	// Same as the tree chopping code
	// The tween animations are breaking for some reason
	// Need to fix it
	this.makingpaper = false;
	this.makepaper = function() {
		// Starts the millbody tween
		millbody.start();
		this.makingpaper = true;
	};

	this.stoppaper = function() {
		millbody.stop();
		this.makingpaper = false;
	};

	this.handleInput = function(input) {

	};

	this.update = function(delta, screen) {
		var p = screen.paul.position();

		// Checks if paul is in the area bounds
		if (this.area.getBounds().contains(p.x, p.y)) {
			if (!this.makingpaper) {
				this.makepaper();
				this.area.alpha = 0.5;
			}
		}
		else {
			this.stoppaper();
			this.area.alpha = 0.0;

		}
	};
};
