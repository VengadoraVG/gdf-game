var Enemy = (function () {
  var Instance = (function () {
    return {
      isActive : function () {
        return this.alpha === 1;
      }
    };
  })();
  
  return {
    create : function (x,y, attackSurfaces, opponent) {
      var enemy = Character.create(x,y, 'enemy'),
          key,
          weapon;

      game.physics.arcade.enable(enemy);
      zOrder.putInLayer(enemy, 'ENEMIES');
      enemy.weapons = EnemyWeapon.createAll(enemy, attackSurfaces);
      enemy.opponent = opponent;

      util.inheritFunctions(enemy, Instance);

      return enemy;
    }
  };
})();
