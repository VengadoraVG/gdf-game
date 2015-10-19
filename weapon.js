var Weapon = (function () {
  var Instance = (function () {

    return {
      update : function () {
        var key;

        this.x = this.owner.x;
        this.y = this.owner.y;

        if (!this.animations.currentAnim.isPlaying) {
          this.alpha = 0;
          this.animations.play('none');
        }
      },

      attackOnCommand : function () {
        for (key in this.control) {
          if (this.control[key].isDown) {
            this.rotation = util.rotationHash[key];
            this.alpha = 1;
            this.animations.play('attack');
          }
        }

        return this.alpha === 1;
      }
    };
  })();
  
  return {
    create : function (owner) {
      var weapon = game.add.sprite(owner.x,owner.y, 'weapon'),
          key;
      weapon.anchor.set(0.5, 1);
      weapon.animations.add('none', [0]);
      weapon.animations.add('attack', [0,1], 8, false);
      weapon.animations.play('none');
      weapon.alpha = 0;
      weapon.owner = owner;

      weapon.control = {
        up : game.input.keyboard.addKey(Phaser.Keyboard.W),
        right : game.input.keyboard.addKey(Phaser.Keyboard.D),
        down : game.input.keyboard.addKey(Phaser.Keyboard.S),
        left : game.input.keyboard.addKey(Phaser.Keyboard.A)
      };

      util.inheritFunctions(weapon, Instance);

      for (key in weapon.control) {
        weapon.control[key].onDown.add(Instance.attackOnCommand, weapon);
      }

      zOrder.putInLayer(weapon, 'PC_RAY');

      return weapon;
    }
  };
})();
