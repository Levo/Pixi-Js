var game = game || {};

game.Collision = {
	collidesWith: function(sphere) {
		var xd = this.collisionSphere.x - sphere.x;
	    var yd = this.collisionSphere.y - sphere.y;

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
		if (game.drawDebug) {
			game.stage.addChild(graphics);	
		}
	},
	initCollision: function(position, radius) {
		this.collisionSphere = {
			// center the sphere on the center of the object
			x: position.x, 
			y: position.y,
			// pick the longest side of the throwing axe sprite for the radius
			radius: radius
		};

		this.debugSphere = new PIXI.Graphics();
		this.debugSphere.lineStyle(0);
		this.debugSphere.beginFill(0xFFFF0B, 0.5);
		this.debugSphere.drawCircle(this.collisionSphere.x, this.collisionSphere.y, this.collisionSphere.radius);
	}
};