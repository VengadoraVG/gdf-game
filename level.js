var Level = (function () {

  var Instance = (function () {
    return {
      preload : function () {
        game.load.spritesheet('you', 'assets/you.png', 35, 35);
        game.load.spritesheet('weapon', 'assets/hit.png', 35, 70);
        game.load.spritesheet('enemy', 'assets/enemy.png', 35,35);
        game.load.spritesheet('enemy-hit', 'assets/enemy-hit.png', 35,35);
      },
      create : function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
      },
      update : function () {
        zOrder.sort();
      }
    };
  })();

  return {
    create : function () {
      var level = {};
      util.inheritFunctions(level, Instance);
      /**
       * The floor of the world. Every character collides with this.
       * @abstract
       * @prop {Phaser.TilemapLayer}
       */
      level.floor = null;
      return level;
    }
  };
})();
