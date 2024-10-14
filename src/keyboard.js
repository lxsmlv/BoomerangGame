const keypress = require('keypress');

module.exports = function keyboard(game) {
  const actions = {
    a: () => { game.hero.moveLeft(); game.boomerang.moveLeft(); },
    d: () => { game.hero.moveRight(); game.boomerang.moveRight(); },
    p: () => { if (!game.boomerang.flying) { game.boomerang.fly(); } },
    e: () => game.stopGame(),
  };

  process.stdin.resume(); // Начинаем прослушивание stdin

  function runInteractiveConsole() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        // Вызывает команду, соответствующую нажатой кнопке.
        if (Object.prototype.hasOwnProperty.call(actions, key.name)) {
          actions[key.name]();
        }
        // Прерывание программы.
        if (key.ctrl && key.name === 'c') {
          console.log('Программа завершена.');
          process.exit();
        }
      }
    });
  }

  runInteractiveConsole();
};
