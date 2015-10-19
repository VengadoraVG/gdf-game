var You = (function () {
  var Instance = (function () {
    var die = function () {
      this.kill();
    };

    return {
      update : function () {
        var movement = this.control;
        this.dad.update.call(this);

        this.body.velocity.x = 0;

        if (movement.left.isDown) {
          this.body.velocity.x = - this.speed;
          this.scale.x = -1;
        }
        if (movement.right.isDown) {
          this.body.velocity.x = this.speed;
          this.scale.x = 1;
        }
        if (movement.up.isDown && this.body.blocked.down) {
          this.body.velocity.y = this.jumpSpeed;
        }
      },

      takeDamage : function () {
        if (!this.isDying()) {
          this.startDying();
        }
      },

      startDying : function () {
        this.dyingTween = game.add.tween(this)
          .to({alpha: 0}, 250, Phaser.Easing.Linear.In, true);
        game.time.events.add(250, die, this);
      },

      isDying : function () {
        return this.dyingTween && this.dyingTween.isRunning;
      },

      isActive : function () {
        return !this.isDying() && this.alive;
      }
    };
  })();  
  
  return {
    create : function (x,y) {
      var you = Character.create(x,y, 'you');

      you.control = game.input.keyboard.createCursorKeys();
      you.jumpSpeed = config.you.jumpSpeed;
      you.speed = config.you.speed;
      you.weapon = Weapon.create(you);

      util.inheritFunctions(you, Instance);
      zOrder.putInLayer(you, 'PC');
      
      return you;
    }
  };
})();
