var Ray = (function () {
  var Instance = (function () {
    var getReady = function () {
      this.fired = false;
      this.alpha = 0;
    };

    var forceShoot = function (ray, target) {
      if (!this.fired) {
        var i,
            weapon = this.source;

        target.takeDamage();

        this.alpha = this.intensity;
        this.fired = true;
        game.time.events.add(500, getReady, this);

        for (i=0; i < weapon.ray.length; i++ ) {
          weapon.ray[i].alpha = weapon.ray[i].intensity;
          weapon.ray[i].fired = true;
          game.time.events.add(500, getReady, weapon.ray[i]);
        }
      }
    };

    return {
      update : function () {
        if (this.source.owner.isActive() &&
            this.source.owner.opponent.isActive()) {
          game.physics.arcade.overlap(this, this.source.owner.opponent,
                                      forceShoot, null, this);
          this.x = this.source.x +
            util.directionHash[this.source.direction][X] *
            config.ray.width * this.index;

          this.y = this.source.y +
            util.directionHash[this.source.direction][Y] *
            config.ray.height * this.index;
        }
      }
    };
  })();

  return {
    create : function (weapon) {
      var i = weapon.x,
          j = weapon.y,
          counter,
          ray;

      weapon.ray = [];


      for (counter = 0; counter < config.ray.range; counter++) {
        ray = game.add.sprite(i,j, 'enemy-hit');
        game.physics.arcade.enable(ray);
        ray.anchor.set(0.5, 1);
        ray.rotation = weapon.rotation;
        ray.intensity = 1/(counter + 1);
        ray.alpha = 0;

        util.inheritFunctions(ray, Instance);

        ray.source = weapon;
        ray.index = counter;

        weapon.ray.push(ray);

        i += util.directionHash[weapon.direction][X] * config.ray.width;
        j += util.directionHash[weapon.direction][Y] * config.ray.height;
      }

      return weapon.ray;
    }
  };
})();
