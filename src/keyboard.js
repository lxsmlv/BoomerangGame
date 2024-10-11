const keypress = require('keypress');
const game = require('../run'); // Замените на фактический путь

const keyboard = {
  a: () => game.moveHero('left'),
  d: () => game.moveHero('right'),
  // w: () => console.log('e'),
  // s: () => console.log('r'),
  // Enter: () => console.log('t'),
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
  process.stdin.setRawMode(true); // включение сырого режима, то есть нажатие кнопок не дожидается нажатия Enter, а сразу передается в программу
}

runInteractiveConsole();
