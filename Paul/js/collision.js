var game = game || {};

game.Collision = {
	collidesWith: function(sphere) {
		var xd = this.collisionSphere.position.x - sphere.position.x;
	    var yd = this.collisionSphere.position.y - sphere.position.y;

	    var sumRadius = this.collisionSphere.radius + sphere.radius;
	    var sqrRadius = sumRadius * sumRadius;

	    var distSqr = (xd * xd) + (yd * yd);

	    if (distSqr <= sqrRadius)
	    {
	        return true;
	    }

	    return false;
	},
	drawDebugCollision: function() {
		this.debugSphere.clear();

		if (game.drawDebug) {
			this.debugSphere.visible = true;

			this.debugSphere.lineStyle(0);
			this.debugSphere.beginFill(0xFFFF0B, 0.1);
			this.debugSphere.drawCircle(this.collisionSphere.position.x, this.collisionSphere.position.y, this.collisionSphere.radius);
		}
	},
	initCollision: function(position, radius) {
		this.collisionSphere = {
			// center the sphere on the center of the object
			position: position,
			// pick the longest side of the throwing axe sprite for the radius
			radius: radius
		};

		this.debugSphere = new PIXI.Graphics();
		game.stage.addChild(this.debugSphere);
		this.debugSphere.visible = false;
	},
	removeCollision: function() {
		this.debugSphere.visible = false;
		game.stage.removeChild(this.debugSphere);
	}
};