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
	this.mouseX = 0;
	this.mouseY = 0;
	this.isattacking = false;
	this.direction = 0;
	this.angle = 0;
	this.canstop = 1;

	// Call init moving to set up properties that the moving behavior requires
	this.initMoving();
		
	// The tween rate in seconds for attacking:  1000 would be 1 second until he can attack again
	this.attackrate = 800;

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

	this.axe = new game.Axe({x: this.core.position.x, y: this.core.position.y});
	this.axe.sprite.anchor.x = 0.5;
	this.axe.sprite.anchor.y = 1.0;
	game.state.currentScreen.entities.push(this.axe);

	var paul = this;

	// this event will trigger when the mouse is pressed
	game.stage.mousedown = function(data){
		// Gets the mouse coordinates relative to the game stage
		var coordinates = data.getLocalPosition(this);

		if(!paul.isattacking){
			paul.swingaxe(paul);
		}
		paul.axe.attack = true;
		paul.isattacking = true;
	}

	game.stage.mousemove = function(data){
		// Gets the mouse coordinates relative to the game stage
		var coordinates = data.getLocalPosition(this);
		paul.mouseX = coordinates.x;
		paul.mouseY = coordinates.y;
	}

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
		// This takes the position of paul's core, scale(the direction he's facing), and the mouse coordinates, spin direction
		// Creates the axe
		var currentaxe = new game.ThrowingAxe({x: posX, y: posY}, scale, mouseX, mouseY, spindirection);

		// Adds the axe to the entities in the currentScreen to be updated
		game.state.currentScreen.entities.push(currentaxe);
	};

	this.swingaxe = function(entity){
		// Gets the direction
		var direction = this.getspindirection(this.mouseX, this.core.position.x, this.core.scale.x);
		var axeswing = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: direction*Math.PI * 2.0 }, entity.attackrate )
	    .easing( TWEEN.Easing.Linear.None )
	    .onUpdate( function () {
	    	// Makes the axe always face the initial direction
	    	entity.axe.sprite.scale.x = direction;

	    	// Rotates the axe and swings it in a circle
	    	// The -direction makes the axe rotate in the same way its swinging
	    	entity.axe.sprite.position.x = -direction*(Math.cos(this.x)*25) + entity.axe.sprite.position.x;
	    	entity.axe.sprite.position.y = -direction*(Math.sin(this.x)*25) + entity.axe.sprite.position.y;

	    	// Rotates the axe 30 degrees
	    	entity.axe.sprite.rotation = this.x/6;

	    	// Look inside this.positonaxe();
	    	entity.canstop = 0;
	    } )
		.onComplete(function() {
			// Resets the axe's rotation to normal
		 	entity.axe.sprite.rotation = 0;
		 	// Look inside this.positionaxe();
		 	entity.canstop = 1;
		 	// Allows paul to attack again
		 	entity.axe.attack = false;
		 	entity.isattacking = false;
		})

	    axeswing.start();
	};

	this.positionaxe = function(){
		// Finds the correct direction the axe should be facing
		this.direction = this.getspindirection(this.mouseX, this.core.position.x, this.core.scale.x);
		// Finds the angle from the Mouse to the core of paul
		this.angle = Math.atan2(this.mouseY - this.core.position.y, this.mouseX - this.core.position.x);
		// Direction of the axe
		this.axe.sprite.scale.x = this.direction;

		// Rotates the axe around paul with the mouse movement
		// This.canstop is a variable that goes to 0
		// This.canstop turns off the rotation of the axe with the mouse when he is attacking

		// Long story short, if paul is attacking the direction of the axe will always face the intital direction,
		// And you can't rotate the axe around paul with the mouse if he is attacking
		// So the swinging will always follow the same path until its complete
		this.axe.sprite.position.x = (Math.cos(this.angle)*25 * this.canstop) + this.core.position.x;
		this.axe.sprite.position.y = (Math.sin(this.angle)*25 * this.canstop) + this.core.position.y;
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
		if (input.pressed('throwaxe')) {
			// Gets the direction the axe should spin
			var spindirection = this.getspindirection(this.mouseX, this.core.position.x, this.core.scale.x);

			// Calls throwaxe function
			this.throwaxe(this.core.position.x, this.core.position.y, this.core.scale.x,this.mouseX,this.mouseY, spindirection);
		}
	};

	this.update = function(delta, screen) {
		this.currentState.update(delta, this);
		this.checkbounds();
		this.positionaxe();
		this.updateSteering(delta);
	};
};

// Extend paul and wolf with the moving behavior functions
_.extend(game.Paul.prototype, game.Moving);