const Game = require('./src/game-models/Game');
const keyboard = require('./src/keyboard');
const {
  getEnemy,
  getUserStat,
  checkUser,
  gameOver,
} = require('./funtionsForDB');

const nameOrId = process.argv[2];

async function startGame(userId) {
  console.log('Начинаем игру...');

  // Генерируем врага с помощью getEnemy
  const enemy = await getEnemy();
  // Генерируем экземпляр игры
  const game = new Game({ trackLength: 30, enemy });
  keyboard(game);
  // Запускаем игру
  game.play();

  // После завершения игры вывод данных и обновление их в БД
  const gameTime = 0; // Убедитесь, что у вас есть фактическое значение
  const killedEnemy = 0; // Убедитесь, что у вас есть фактическое значение
  await gameOver(userId, gameTime, killedEnemy);
}

async function main() {
  if (!Number.isNaN(nameOrId)) {
    await getUserStat(Number(nameOrId));
  } else {
    const userId = await checkUser(nameOrId); // Получаем ID пользователя
    await startGame(userId);
  }
}

// Запуск программы
main();
