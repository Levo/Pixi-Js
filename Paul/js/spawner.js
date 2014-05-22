var game = game || {};

game.Spawner = function(type, interval, axis, spawncallback) {
	this.type 		= type;				// object we want to create ie. game.Wolf or game.Bear
	this.interval 	= interval;			// how often we want to spawn these objects.  in millseconds.
	this.axis 		= axis;				// {x,y} object of where we should spawn each object.
	this.ID			= null;				// the ID returned by window.setInterval().  used to stop.
	this.callback	= spawncallback;	// callback that gives back the newly created object.

	var self = this;
	var spawn = function() {
		var spawnPosition = { x: 0, y: 0 };
		
		// [0, 1) value
		var v = Math.random();
		
		if (self.axis === 'x') {
			// randomly pick top of bottom of the screen
			var y = v < 0.5 ? 0 : game.renderer.height
			//pick a random location along a x axis
			spawnPosition = { x: game.renderer.width * v, y: y};
		}
		else if (self.axis === 'y') {
			// randomly pick right or left of the screen
			var x = v < 0.5 ? 0 : game.renderer.width;
			//pick a random location along a y axis
			spawnPosition = { x: x, y: game.renderer.height * v };
		}

		// create a new object
		var o = new self.type(spawnPosition);
		// let the caller know we have created it
		self.callback(o);
	};

	this.start = function() {
		if (this.ID === null) {
			this.ID = window.setInterval(spawn, this.interval);		
		}
	};

	this.stop = function() {
		window.clearInterval(this.ID);
	};
};