var Enemy = (function () {
  var Instance = (function () {
    return {
      isActive : function () {
        return this.alpha === 1;
      }
    };
  })();
  
  return {
    create : function (x,y, attackSurfaces, opponent, level) {
      var enemy = Character.create(x,y, 'enemy', level);

      game.physics.arcade.enable(enemy);
      zOrder.putInLayer(enemy, 'ENEMIES');
      enemy.weapons = EnemyWeapon.createAll(enemy, attackSurfaces);
      enemy.opponent = opponent;

      enemy.body.allowGravity = false;

      util.inheritFunctions(enemy, Instance);

      level.enemies.push(enemy);

      return enemy;
    }
  };
})();
