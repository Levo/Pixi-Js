var game = game || {};

game.WalkingState = function() {
	this.name = "Walking";
	this.walkingForce = 2000.0;
	this.handleInput = function(input, entity) {

		entity.force.x = entity.force.y = 0.0;

		if (game.input.keydown("walkleft")) {
			entity.force.x = -this.walkingForce;
			noInput = false;
		}
		else if (game.input.keydown("walkright")) {
			entity.force.x = this.walkingForce;
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

game.Paul = function() {
	// Loading all the textures for each body part
	this.bodytexture = PIXI.Texture.fromImage("sprites/body.png");
	this.headtexture = PIXI.Texture.fromImage("sprites/head.png");
	this.leftlegtexture = PIXI.Texture.fromImage("sprites/leg.png");
	this.rightlegtexture = PIXI.Texture.fromImage("sprites/leg.png");
	this.necktexture = PIXI.Texture.fromImage("sprites/neck.png");
	this.mustachetexture = PIXI.Texture.fromImage("sprites/mustache.png");

	// The body is the main ANCHOR of paul
	// All the parts will be centered around the body
	this.body = new PIXI.Sprite(this.bodytexture);
	this.head = new PIXI.Sprite(this.headtexture);
	this.rightleg = new PIXI.Sprite(this.rightlegtexture);
	this.leftleg = new PIXI.Sprite(this.leftlegtexture);
	this.neck = new PIXI.Sprite(this.necktexture);
	this.mustache = new PIXI.Sprite(this.mustachetexture);

	// Adding all the parts to the body
	this.body.addChild(this.neck);
	this.body.addChild(this.head);
	this.body.addChild(this.rightleg);
	this.body.addChild(this.leftleg);
	this.body.addChild(this.mustache);

	// Anchoring and position of the body
	this.body.anchor.x = 0.5;
	this.body.anchor.y = 0.5;
	this.body.position.x = game.renderer.width / 2.0;
	this.body.position.y = game.renderer.height / 2.0;

	// Anchoring and positioning of the parts relative to the body
	// Head
	this.head.anchor.x = 0.5;
	this.head.anchor.y = 2.0;

	// Neck
	this.neck.anchor.x = 0.5;
	this.neck.anchor.y = 2.65;

	// Mustache
	this.mustache.anchor.x = 0.35;
	this.mustache.anchor.y = 4.0;

	// Right Leg
	this.rightleg.anchor.x = -0.5;
	this.rightleg.anchor.y = -1;

	// Left Leg
	this.leftleg.anchor.x = 1.5;
	this.leftleg.anchor.y = -1;

	// Add to stage
	game.stage.addChild(this.body);

	this.stateText = new PIXI.Text("", game.font);
	this.stateText.anchor.x = 0.5;
	this.stateText.anchor.y = 0.5;
	this.stateText.position.x = game.renderer.width / 2.0;
	this.stateText.position.y = game.renderer.height - this.stateText.height;
	game.stage.addChild(this.stateText);

	this.currentState = new game.WalkingState();

	this.stateText.setText(this.currentState.name);

	this.handleInput = function(input) {
		this.currentState.handleInput(input, this);
	};

	this.update = function(delta) {
		this.currentState.update(delta, this);
		this.updateSteering(delta);
	};
};
