exports.project = function(pm) {
  var f = pm.filters(require('pm-spritesheet'));

  return {
    spritesheet: {
      files: 'explosionsprite/*.png',
      dev: [
        f.spritesheet({filename: 'SpriteSheet.png', root: 'explosionsprite/', jsonStyle:'texturePacker'})
      ]
    }
  };

};