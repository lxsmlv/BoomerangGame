const keypress = require('keypress');
const Game = require('./src/game-models/Game');
const keyboard = require('./src/keyboard');
const {
  getEnemy,
  getUserStat,
  checkUser,
  getTop,
  gameOver,
  delay,
} = require('./funtionsForDB');

// Инициализация keypress
keypress(process.stdin);
process.stdin.setRawMode(true);

// Запрос имени пользователя
function askForUserName() {
  return new Promise((resolve) => {
    console.log('Пожалуйста, введите ваше имя:');
    let userName = '';

    const onKeypress = (ch, key) => {
      if ((key && key.name === 'return') || (key && key.name === 'enter')) {
        // Удаляем обработчик нажатий клавиш
        process.stdin.removeListener('keypress', onKeypress);
        console.clear();
        resolve(userName); // Возвращаем имя
      } else if (key && key.name === 'backspace') {
        userName = userName.slice(0, -1);
        process.stdout.write(`\r${' '.repeat(process.stdout.columns)}\r`); // Очищаем строку
        process.stdout.write(`${userName}`); // Печатаем текущее имя
      } else if (key) {
        userName += ch || ''; // Добавляем введенный символ к имени
        process.stdout.write(ch || ''); // Выводим символ на экран
      }
    };

    process.stdin.on('keypress', onKeypress); // Добавляем обработчик
    process.stdin.resume(); // Начинаем прослушивание stdin
  });
}

// Непосредственно сама игра
async function startGame(name) {
  console.clear();
  console.log('Начинаем игру...');

  // await delay(1000);

  // Генерируем экземпляр игры
  const game = new Game({ trackLength: 30, trackHeight: 6, enemiesCount: 10 });

  // Навешиваем обработчик событий на клавиатуру
  keyboard(game);

  // Запускаем игру
  await game.play();

  // После завершения игры вывод данных и обновление их в БД
  const { gameTime } = game;
  const { enemiesKilled } = game;

  await delay(300);
  await gameOver(name, gameTime, enemiesKilled);
  process.exit();
}

// Функция меню
function showMenu() {
  console.log('===========================================');
  console.log('Нажмите "n", чтобы начать новую игру');
  console.log('Нажмите "s", чтобы посмотреть свою статистику');
  console.log('Нажмите "t", чтобы посмотреть ТОП-5 игроков');
  console.log('Нажмите "q", чтобы выйти');
  console.log('===========================================');
}

// Обработка выбора меню
async function handleMenuSelection(userName) {
  // Обработка выбора пользователя с помощью switch
  const onKeypressMenu = async (ch, key) => {
    if (key) {
      // Прерывание программы по нажатию Ctrl+C
      if (key.ctrl && key.name === 'c') {
        console.log('Программа завершена.');
        process.exit();
      }

      switch (key.name) {
        case 'n':
          console.log('Запуск новой игры...');
          process.stdin.removeListener('keypress', onKeypressMenu);
          await startGame(userName);
          // Удаляем обработчик нажатий клавиш после завершения обработки выбора
          break;

        case 's':
          console.log(`Статистика для ${userName}:`);
          await getUserStat(userName);
          break;

        case 'q':
          console.clear();
          console.log('Программа завершена.');
          process.exit(0);
          break;

        case 't':
          console.log('Топ-5 игроков!');
          await getTop();
          break;

        case 'return':
        case 'enter':
          console.clear();
          showMenu();
          break;

        default:
          console.log('Некорректный выбор, попробуйте снова.');
      }
    }
  };

  process.stdin.on('keypress', onKeypressMenu); // Добавляем обработчик
}

// Основная функция
async function main() {
  // Запрос имени пользователя
  const userName = await askForUserName();
  await checkUser(userName);
  // Показать меню при старте
  showMenu();
  // Запрос выбора в меню
  await handleMenuSelection(userName);
}

// Запускаем основную функцию
main();
