// Основной файл.
// Запускает игру.
const Game = require('./src/Game');

// Импортируем и запускаем управление
const game = new Game({
  trackLength: 30,
});

require('./src/keyboard')(game); // Передаем экземпляр game в keyboard

// Запуск игры.
game.play();
