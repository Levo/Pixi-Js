var game = game || {};

game.Widget = function(textureName, x, y) {
	this.x = x;
	this.y = y;

	this.image  = PIXI.Texture.fromImage(textureName);
	this.sprite = new PIXI.Sprite(this.image); 
	this.sprite.position.x = x;
	this.sprite.position.y = y;

	game.stage.addChild(this.sprite);
};

game.TextWidget = function(text, x, y) {
	this.x = x;
	this.y = y;

	this.image = new PIXI.Text(text, game.font);
	this.image.position.x = x;
	this.image.position.y = y;

	game.stage.addChild(this.image);

	this.setText = function(text) {
		this.image.setText(text);
	};
}