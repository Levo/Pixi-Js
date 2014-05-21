var game = game || {};

game.Spawner = function(type, interval, location, spawncallback) {
	this.type 		= type;				// object we want to create ie. game.Wolf or game.Bear
	this.interval 	= interval;			// how often we want to spawn these objects.  in millseconds.
	this.location 	= location;			// {x,y} object of where we should spawn each object.
	this.ID			= null;				// the ID returned by window.setInterval().  used to stop.
	this.callback	= spawncallback;	// callback that gives back the newly created object.

	var self = this;
	var spawn = function() {
		// create a new object
		var o = new self.type(location);
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