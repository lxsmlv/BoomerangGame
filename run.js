const Game = require('./src/Game');
const Enemy = require('./src/game-models/Enemy'); // Убедитесь, что путь правильный

(async () => {
  const enemy = await Enemy.create(); // Создаём и инициализируем врага
  const game = new Game({ trackLength: 30, enemy }); // Передаём врага в игру
  // Запуск игры и другие действия
  game.play();
})();
