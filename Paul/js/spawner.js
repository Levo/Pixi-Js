var game = game || {};

game.Spawner = function(type, max, interval, location, spawncallback) {
	this.type 		= type;				// object we want to create ie. game.Wolf or game.Bear
	this.max		= max;				// max number of objects to spawn.
	this.interval 	= interval;			// how often we want to spawn these objects.  in millseconds.
	this.location 	= location;			// {x,y} object of where we should spawn each object.
	this.ID			= null;				// the ID returned by window.setInterval().  used to stop.
	this.callback	= spawncallback;	// callback that gives back the newly created object.

	this.count		= 0					// number of objects spawned.

	var self = this;
	var spawn = function() {
		// create a new object
		var o = new self.type(location);
		// let the caller know we have created it
		self.callback(o);

		self.count++;
		if (self.count >= self.max) {
			self.stop();
		}
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