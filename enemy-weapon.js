var EnemyWeapon = (function () {
  var Instance = (function () {
    var forceShoot = function (target) {
    };
    return {
      update : function () {
        var i=0;

        this.x = this.owner.x;
        this.y = this.owner.y;

        // for (i=0; i<this.ray.length; i++) {
        //   game.physics.arcade.overlap(this.ray[i],
        //                               this.owner.opponent,
        //                               forceShoot, this);
        //   this.ray[i].x = this.x +
        //     util.directionHash[this.direction][X] * config.ray.width * i;
        //   this.ray[i].y = this.y +
        //     util.directionHash[this.direction][Y] * config.ray.height * i;
        // }
      },
    };
  })();

  return {
    createAll : function (owner, attackSurfaces) {
      var weapons = {},
          weapon;

      for (key in attackSurfaces) {
        weapon = game.add.sprite(owner.x,owner.y, 'enemy');
        weapon.animations.add('weapon', [1]).play();
        weapon.anchor.set(0.5, 0.5);
        weapon.rotation = util.rotationHash[key];

        weapon.direction = key;
        weapon.owner = owner;
        util.inheritFunctions(weapon, Instance);
        weapon.ray = Ray.create(weapon);

        weapons[key] =  weapon;
        zOrder.putInLayer(weapon, 'WEAPON');
      }

      return weapon;
    }
  }
})();
