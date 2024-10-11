const keypress = require('keypress');

// Теперь мы экспортируем функцию, которая принимает экземпляр game
module.exports = function (game) {
  const keyboard = {
    a: () => game.hero.moveLeft(),
    d: () => game.hero.moveRight(game.track),
    p: () => game.hero.attack(),
  };

  function runInteractiveConsole() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        // Вызывает команду, соответствующую нажатой кнопке.
        if (key.name in keyboard) {
          keyboard[key.name]();
        }
        // Прерывание программы.
        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
      }
    });
    process.stdin.setRawMode(true); // включение сырого режима
    process.stdin.resume(); // начинаем прослушивание stdin
  }

  runInteractiveConsole();
};
