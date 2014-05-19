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

	this.sprite = new PIXI.Text(text, game.font);
	this.sprite.position.x = x;
	this.sprite.position.y = y;

	game.stage.addChild(this.sprite);

	this.setText = function(text) {
		this.sprite.setText(text);
	};
}