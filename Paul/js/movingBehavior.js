var game = game || {};

(function() {

	var length = function(vector) {
		return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	};

	var normalize = function(vector) {
		var l = length(vector);
		return { x: vector.x / l, y: vector.y / l };
	};

	var truncate = function(vector, max) {
		if (length(vector) > max) {
			var n = normalize(vector);
			n.x *= max;
			n.y *= max;
			return n;
		}
		return vector; 
	};

	game.Moving = {
		force: { x: 0.0, y: 0.0 },
		velocity: { x: 0.0, y: 0.0 },
		heading: { x: 0.0, y: 0.0 },
		mass: 1.0,
		maxSpeed: 200.0,
		updateSteering: function(delta, entity) {
			var SteeringForce = this.force;

			// acceleration = force / mass
			var acceleration = { x: 0, y: 0 }; 
			acceleration.x = SteeringForce.x / this.mass;
			acceleration.y = SteeringForce.y / this.mass;

			// update velocity
			this.velocity.x += acceleration.x * delta;
			this.velocity.y += acceleration.y * delta;

			// don't execeed max speed
			this.velocity = truncate(this.velocity, this.maxSpeed);

			// update position.
			// assume this has a position on the sprite
			// object. this sort of blows.
			this.sprite.position.x += this.velocity.x * delta;
			this.sprite.position.y += this.velocity.y * delta;
		}
	};
})();
