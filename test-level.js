var testLevel = (function () {
  var Instance = (function () {
    return {
      create : function () {
        this.dad.create.call(this);

        this.enemy = Enemy.create(300,315, {
          // up : true,
          right : true,
          left : true,
          down : true
        }, this.pc, this);

        this.floatingEnemy = Enemy.create(700, 70, {
          down : true,
          left : true
        }, this.pc, this);

      },
      update : function () {
        this.dad.update.call(this);
      },
      render : function () {
      }
    };
  })();

  var level = Level.create({
    name : 'test-level',
    directory : 'assets/test-map.json',
    pc : {
      x : 100,
      y : 100
    },
    enemies : [
      {
        x : 300,
        y : 315,
        weapons : {
          right : true,
          left : true,
          down : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      }, {
        x : 700,
        y : 70,
        weapons : {
          down : true,
          left : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      }
    ]
  });
  util.inheritFunctions(level, Instance);
  
  return level;
})();

var game = new Phaser.Game(770, 630, Phaser.AUTO, 'game');
game.state.add('test-level', testLevel);
game.state.start('test-level'); 

