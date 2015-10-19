var testLevel = (function () {
  var Instance = (function () {
    return {
      create : function () {
        this.dad.create.call(this);
        this.pc = You.create(100,100);
        this.enemy = Enemy.create(200,200, {
          up : true,
          right : true,
          // left : true,
          down : true
        }, this.pc);
      },
      update : function () {
        this.dad.update.call(this);
      }
    };
  })();

  var level = Level.create();
  util.inheritFunctions(level, Instance);
  
  return level;
})();

var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game');
game.state.add('test-level', testLevel);
game.state.start('test-level'); 

