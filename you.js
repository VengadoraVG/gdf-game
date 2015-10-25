var You = (function () {
  var Instance = (function () {
    var updateEnd = function () {
      var worldRectangle =
          new Phaser.Rectangle(0,0, game.world.width, game.world.height);

      if (!worldRectangle.containsRect(this)) {
        this.level.end();
      }
    };

    return {
      update : function () {
        var movement = this.control;
        updateEnd.call(this);
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
      },

      canUse : function (weapon) {
        return weapon.index === this.energy-1;
      },

      jump : function () {
        if (this.body.blocked.down) {
          this.body.velocity.y = -this.jumpSpeed;
        }
      },
    };
  })();
  
  return {
    create : function (x,y, level) {
      var you = Character.create(x,y, 'you', level);

      you.body.setSize(you.width/2, you.height/2, 0, you.height/4);
      you.control = game.input.keyboard.createCursorKeys();
      you.jumpSpeed = Math.sqrt(2 * config.you.jumpHeight *
                                config.world.gravity);
      you.speed = config.you.speed;
      you.weapon = WeaponSystem.create(you);

      you.rangedAttack = RangedAttack.create(you);
      you.energy = 3;

      util.inheritFunctions(you, Instance);
      you.control.up.onDown.add(you.jump, you);

      zOrder.putInLayer(you, 'PC');
      
      return you;
    }
  };
})();
