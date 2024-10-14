const {
  User,
  Enemy,
  GameData,
  sequelize,
} = require('./db/models'); // Убедитесь, что путь корректный

async function checkDatabaseConnection() {
  try {
    // Проверяем подключение к базе данных
    await sequelize.authenticate();
    console.log('Соединение с базой данных успешно установлено.');

    // Выполняем простой запрос для проверки
    const result = await sequelize.query('SELECT 1+1 AS result');
    console.log('Результат запроса:', result[0]);
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  } finally {
    // Закрываем соединение с базой данных
    await sequelize.close();
    console.log('Соединение с базой данных закрыто.');
  }
}
// checkDatabaseConnection();

async function getEnemy() {
  try {
    // Получаем общее количество врагов в базе данных
    const totalEnemies = await Enemy.count();

    // Генерируем случайный ID на основе общего количества врагов
    const randomId = Math.floor(Math.random() * totalEnemies) + 1;
    const enemy = await Enemy.findOne({ where: { id: randomId } });
    return enemy; // Возвращаем emoji врага
  } catch (error) {
    console.error('Ошибка при получении врага из базы данных:', error);
    return null; // Возвращаем null в случае ошибки
  }
}
// getEnemy();

async function getUserStat(name) {
  try {
    const user = await User.findOne({ where: { name } });
    const gameResult = await GameData.findOne({ where: { userId: user.id } });
    if (gameResult) {
      console.log(`Предыдущий результат игры: Время игры - ${gameResult.gameTime} сек., Убито врагов - ${gameResult.enemiesKilled}`);
    } else {
      console.log('Результат не найден.');
    }
  } catch (err) {
    console.error('Ошибка при получении результатов игры:', err);
  }
}
// getUserStat(1);

async function checkUser(name) {
  try {
    const [user, created] = await User.findOrCreate({
      where: { name },
      defaults: { name },
    });

    if (created) {
      console.log(`Создан новый пользователь c именем ${user.name}`);
    } else {
      console.log(`Пользователь ${user.name} найден.`);
    }
  } catch (err) {
    console.error('Ошибка при проверке или создании пользователя:', err);
  }
}
// checkUser('Тимур');

async function getTop() {
  try {
    const data = await GameData.findAll({
      order: [['gameTime', 'DESC']], // Сортировка по полю gameTime в порядке убывания
      limit: 5, // Ограничение на 5 лучших игроков
    });

    const topOfGameTime = data.map((el) => el.get({ plain: true }));
    const arrUserAndGameTime = []; // Инициализация строки для результата

    // Проход по массиву топ-игроков
    for (const record of topOfGameTime) {
      const player = await User.findOne({ where: { id: record.userId } });
      arrUserAndGameTime.push(`Игрок ${player.name} продержался ${record.gameTime} секунд`);
    }
    const result = arrUserAndGameTime.join('\n');
    console.log(result); // Выводим список топ-игроков
  } catch (error) {
    console.error('Ошибка при получении топа:', error);
  }
}

async function gameOver(name, gameTime = 0, enemiesKilled = 0) {
  try {
    const user = await User.findOne({ where: { name } });
    const [result, created] = await GameData.findOrCreate({
      where: { userId: user.id },
      defaults: { gameTime, enemiesKilled },
    });

    if (created) {
      // Если запись была создана
      console.log(`Игра окончена! Время игры: ${gameTime} сек.\nКоличество убитых врагов: ${enemiesKilled}\nВаш результат сохранен под именем ${user.name}`);
    } else {
      // Если запись была найдена, обновляем её
      result.gameTime = gameTime;
      result.enemiesKilled = enemiesKilled;
      await result.save(); // Сохраняем изменения
      console.log(`Игра окончена! Время игры: ${gameTime} ceк.\nКоличество убитых врагов: ${enemiesKilled}\nВаш результат обновлен под именем ${user.name}`);
    }
  } catch (err) {
    console.error('Ошибка при выводе и сохранении результатов игры:', err);
  } finally {
    // Закрываем соединение с базой данных
    await sequelize.close();
    console.log('Соединение с базой данных закрыто.');
  }
}
// gameOver(1);

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(); // разрешаем промис после задержки
    }, ms);
  });
}

module.exports = {
  getEnemy,
  getUserStat,
  checkUser,
  getTop,
  gameOver,
  delay,
};
