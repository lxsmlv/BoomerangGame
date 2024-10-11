// Основной файл.

const Game = require('./src/Game');

// запуск runInteractiveConsole в файле keyboard
require('./src/keyboard');

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 30,
});

// Запуск игры.
game.play();
