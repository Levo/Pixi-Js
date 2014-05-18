var Input = (function() {
	var keysdown = {};
	var keysup	 = {};

	var keydown = function(event) {
		keysdown[event.keyCode] = true;
	};

	var keyup = function(event) {
		keysup[event.keyCode] 	= true;
		keysdown[event.keyCode] = false;
	};

	var Input = function(buttons) {
		this.keymap = buttons;

		document.addEventListener('keydown', keydown);
		document.addEventListener('keyup', keyup);
	};

	Input.prototype.pressed = function(keystring) {
		var keyCode = this.keymap[keystring];
		return keysdown[keyCode];
	};

	Input.prototype.keydown = function(keystring) {
		var keyCode = this.keymap[keystring];
		return keysdown[keyCode];
	};

	return Input;
})();