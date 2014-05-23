var game = game || {};

game.WalkingState = function() {
	this.name = "Walking";
	this.walkingForce = 2000.0;
	this.handleInput = function(input, entity) {

		entity.force.x = entity.force.y = 0.0;

		if (game.input.keydown("walkleft")) {
			entity.force.x = -this.walkingForce;
			entity.core.scale.x = -1;
			noInput = false;
		}
		else if (game.input.keydown("walkright")) {
			entity.force.x = this.walkingForce;
			entity.core.scale.x = 1;
		}

		if (game.input.keydown("walkup")) {
			entity.force.y = -this.walkingForce;
		}
		else if (game.input.keydown("walkdown")) {
			entity.force.y = this.walkingForce;
		}

		// this comparison seems to work OK.
		if (entity.force.x === 0.0 && entity.force.y === 0.0) {
			entity.velocity.x = entity.velocity.y = 0.0;
		}

	};
	this.update = function(delta, entity) {

	};
};

game.WalkingTweens = function(entity){

   	this.head = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 850 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.head.y = this.x;
	    } )
	    .repeat(Infinity
)
    this.body = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 800 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.body.y = this.x;
	    } )
	    .repeat(Infinity)

    this.neck = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0 }, 850 )
	    .easing( TWEEN.Easing.Circular.InOut )
	    .onUpdate( function () {
	    	entity.neck.y = this.x;
	    } )
	    .repeat(Infinity)

    this.mustache = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2.0}, 850 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.mustache.y = this.x;
	    } )
	    .repeat(Infinity)

    this.leftleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI / 24}, 750 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.leftleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.rightleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 24}, 750 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.rightleg.rotation = this.x;
	    } )
	    .repeat(Infinity)


	this.StartWalking = function(){
		this.head.start();
		this.body.start();
		this.neck.start();
		this.mustache.start();
		this.leftleg.start();
		this.rightleg.start();
	};

	this.StopWalking = function(){
		this.head.stop();
		this.body.stop();
		this.neck.stop();
		this.mustache.stop();
		this.leftleg.stop();
		this.rightleg.stop();
	};

};

game.Paul = function() {
	// Call init moving to set up properties that the moving behavior requires
	this.initMoving();
	this.initHealth(100);
	
	// Loading all the textures for each body part
	this.coretexture = PIXI.Texture.fromImage("sprites/core.png");
	this.bodytexture = PIXI.Texture.fromImage("sprites/body.png");
	this.headtexture = PIXI.Texture.fromImage("sprites/head.png");
	this.leftlegtexture = PIXI.Texture.fromImage("sprites/leg.png");
	this.rightlegtexture = PIXI.Texture.fromImage("sprites/leg.png");
	this.necktexture = PIXI.Texture.fromImage("sprites/neck.png");
	this.mustachetexture = PIXI.Texture.fromImage("sprites/mustache.png");

	// Core is the center/anchor of Paul
	// All the parts will be centered around the core
	this.core = new PIXI.Sprite(this.coretexture);
	this.neck = new PIXI.Sprite(this.necktexture);
	this.body = new PIXI.Sprite(this.bodytexture);
	this.head = new PIXI.Sprite(this.headtexture);
	this.rightleg = new PIXI.Sprite(this.rightlegtexture);
	this.leftleg = new PIXI.Sprite(this.leftlegtexture);
	this.mustache = new PIXI.Sprite(this.mustachetexture);

	// Adding all the parts to the core
	this.core.addChild(this.rightleg);
	this.core.addChild(this.leftleg);
	this.core.addChild(this.neck);
	this.core.addChild(this.body);
	this.core.addChild(this.head);
	this.core.addChild(this.mustache);

	// Anchoring and positioning of the core
	this.core.anchor.x = 0.5;
	this.core.anchor.y = 0.5;
	this.core.position.x = game.renderer.width / 2.0;
	this.core.position.y = game.renderer.height / 2.0;

	// Anchoring and positioning of the parts relative to the core
	// Head
	this.head.anchor.x = 0.5;
	this.head.anchor.y = 2.0;

	// Neck
	this.neck.anchor.x = 0.5;
	this.neck.anchor.y = 2.65;

	// Body
	this.body.anchor.x = 0.5;
	this.body.anchor.y = 0.5;

	// Mustache
	this.mustache.anchor.x = 0.35;
	this.mustache.anchor.y = 4.0;

	// Right Leg
	this.rightleg.anchor.x = -0.45;
	this.rightleg.anchor.y = -1.1;

	// Left Leg
	this.leftleg.anchor.x = 1.45;
	this.leftleg.anchor.y = -1.1;

	// Add to stage
	game.stage.addChild(this.core);

	this.stateText = new PIXI.Text("", game.font);
	this.stateText.anchor.x = 0.5;
	this.stateText.anchor.y = 0.5;
	this.stateText.position.x = game.renderer.width / 2.0;
	this.stateText.position.y = game.renderer.height - this.stateText.height;
	game.stage.addChild(this.stateText);

	this.walkingtweens = new game.WalkingTweens(this);

	this.walkingtweens.StartWalking();

	this.currentState = new game.WalkingState();

	this.stateText.setText(this.currentState.name);

	this.position = function() {
		var LengthOfLegs = 32;

		var x = this.core.position.x;
		var y = this.core.position.y + LengthOfLegs;

		return { x: x, y: y };
	};

	// This function checks which side the mouse is on relative to the core and checks what way paul is facing
	// Depending on what way he is facing and what side the mouse is on it will give the correct direction of spin
	this.getspindirection = function(mouseX, posX, scale){
		if(mouseX > posX && scale === -1){
			return 1;
		}
		else if(mouseX < posX && scale === 1)
		{
			return -1;
		}
		else if(mouseX > posX && scale === 1){
			return 1;
		}
		else if(mouseX < posX && scale === -1)
		{
			return -1;
		}
	}

	this.throwaxe = function(posX, posY,scale, mouseX, mouseY, spindirection){

		var throwingaxe = new Audio("sounds/throwingaxe.wav");
    	throwingaxe.play();

		// This takes the position of paul's core, scale(the direction he's facing), and the mouse coordinates, spin direction
		// Creates the axe
		var currentaxe = new game.ThrowingAxe({x: posX, y: posY}, scale, mouseX, mouseY, spindirection);

		// Adds the axe to the entities in the currentScreen to be updated
		game.state.currentScreen.entities.push(currentaxe);
	};


	this.checkbounds = function(){
		if(this.core.position.x < 0){
			this.velocity.x = 1000;
		}
		else if(this.core.position.y > game.renderer.height){
			this.velocity.y = -1000;
		}
		else if(this.core.position.y < 0){
			this.velocity.y = 1000;
		}
		else if(this.core.position.x > game.renderer.width){
			this.velocity.x = -1000;
		}
	};

	this.handleInput = function(input) {
		this.currentState.handleInput(input, this);
	};

	this.update = function(delta, screen) {
		// pick a 0.0 - 1.0 value
		// if you have 0 lumber t will be 1.0 and you will move at full speed
		// if you have 12 lumber t will be at 0.0 and you will move 75% speed
		// clamp the t value so it doesn't go below zero.
		var t = Math.max((12.0 - screen.lumber) / 12.0, 0.0);

		// linear interpolate between .75 - 1.0 scale
		// based on t.
		this.maxSpeedScale = .75 + t * (1.0 - .75);
		
		this.currentState.update(delta, this);
		this.checkbounds();		this.updateSteering(delta);
	};
};

// Extend paul and wolf with the moving behavior functions
_.extend(game.Paul.prototype, game.Moving);
_.extend(game.Paul.prototype, game.HP);