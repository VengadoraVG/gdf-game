 var Level = (function () {

  var Instance = (function () {
    return {
      preload : function () {
        game.load.spritesheet('you', 'assets/you.png', 35, 35);
        game.load.spritesheet('0hit', 'assets/0hit.png', 35, 70);
        game.load.spritesheet('1hit', 'assets/1hit.png', 35, 105);
        game.load.spritesheet('2hit', 'assets/2hit.png', 35, 140);
        game.load.spritesheet('arrow', 'assets/arrow.png', 13,36);
        game.load.spritesheet('shot', 'assets/shot.png', 15,15);
        game.load.spritesheet('enemy', 'assets/enemy.png', 35,35);
        game.load.spritesheet('enemy-hit', 'assets/enemy-hit.png', 35,35);

        game.load.tilemap(this.mapInfo.name, this.mapInfo.directory,
                          null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tile', 'assets/tile.png');
      },
      create : function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = config.world.gravity;
        game.stage.backgroundColor = '#111'

        this.tilemap = Map.create(this.mapInfo.name, 'tile',
                                  this.mapInfo.width, this.mapInfo.height);
        this.pc = You.create(this.mapInfo.pc.x, this.mapInfo.pc.y, this);
        // create the enemies!!1 :O
      },
      update : function () {
        zOrder.sort();
      },
      end : function () {
        game.state.start(this.nextLevel);
      }
    };
  })();

  return {
    create : function (mapInfo) {
      var level = {
        enemies : []
      };
      level.mapInfo = mapInfo;
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
