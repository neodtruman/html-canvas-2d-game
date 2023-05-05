window.onload = function () {
  const canvas = document.getElementById("game-canvas");

  // Create Game object
  const game = new Game(canvas);
  game.start();
};
