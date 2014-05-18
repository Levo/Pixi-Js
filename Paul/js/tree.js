var game = game || {};

game.TreeDefaults = {
	lumber: 25,
	texture: 'sprites/tree.png',
	position: { x: 0, y: 0 },
};

game.Tree = function(lumber, position, texture) {
	this.lumber 	= lumber
	this.texture 	= PIXI.Texture.fromImage(texture);
	this.sprite 	= new PIXI.Sprite(texture);
	this.sprite.position.x = position.x;
	this.sprite.position.y = position.y;
};
