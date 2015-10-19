var Character = (function () {

  var Instance = (function () {
    return {
      update : function () {

      },
      takeDamage : function () {
        console.log('ouch!');
      }
    };
  })();

  return {
    create : function (x,y, key) {
      var character = game.add.sprite(x,y, key);
      game.physics.arcade.enable(character);
      character.anchor.set(0.5);

      util.inheritFunctions(character, Instance);

      return character;
    }
  };
})();
