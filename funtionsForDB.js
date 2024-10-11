const User = require('./db/models/User'); // Убедитесь, что путь корректный
const Data = require('./db/models/Data'); // Убедитесь, что путь корректный
const Enemy = require('./db/models/Enemy'); // Убедитесь, что путь корректный

async function getEnemy() {
  try {
    // Получаем общее количество врагов в базе данных
    const totalEnemies = await Enemy.count();

    // Генерируем случайный ID на основе общего количества врагов
    const randomId = Math.floor(Math.random() * totalEnemies) + 1;
    const enemy = await Enemy.findOne({ where: { id: randomId } });

    if (enemy) {
      return enemy.emoji; // Возвращаем emoji врага
    }
    console.log('Враг не найден');
    return null; // Возвращаем null, если враг не найден
  } catch (error) {
    console.error('Ошибка при получении врага из базы:', error);
    return null; // Возвращаем null в случае ошибки
  }
}

async function getUserStat(userId) {
  try {
    const gameResult = await Data.findOne({ where: { userId } });
    if (gameResult) {
      console.log(`Результат игры с ID ${gameId}: Время - ${gameResult.gameTime}, Убито врагов - ${gameResult.killedEnemy}`);
    } else {
      console.log('Результат не найден.');
    }
  } catch (err) {
    console.error('Ошибка при получении результатов игры:', err);
  }
}

async function checkUser(name) {
  try {
    // Проверяем, существует ли пользователь с указанным именем
    const existingUser = await User.findOne({ where: { name } });

    if (existingUser) {
      console.log(`Пользователь "${name}" найден. Запускаем игру...`);
      // Запускаем игру для существующего пользователя
      return existingUser.id; // Возвращаем ID для использования в run.js
    }
    console.log(`Пользователь "${name}" не найден. Создаем нового пользователя...`);
    // Если пользователя нет, создаем нового
    const newUser = await User.create({ name });
    console.log(`Создан новый пользователь "${newUser.name}". Запускаем игру...`);
    return newUser.id; // Возвращаем ID для использования в run.js
  } catch (err) {
    console.error('Ошибка при проверке или создании пользователя:', err);
    throw err; // Бросаем ошибку для обработки в run.js
  }
}

async function gameOver(userId, gameTime = 0, killedEnemy = 0) {
  try {
    const result = await Data.create({ gameTime, killedEnemy, userId });
    console.log(`Игра окончена!\nСчет: ${gameTime}\nКоличество убитых врагов: ${killedEnemy}\nВаш результат сохранен под номером ${result.id}`);
  } catch (err) {
    console.error('Ошибка при выводе результатов игры:', err);
  }
}

module.exports = {
  getEnemy,
  getUserStat,
  checkUser,
  gameOver,
};
