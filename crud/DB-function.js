const { Enemies, User, resultGame } = require('../db/models');

async function emojiEnemies() {
  try {
    const randomId = Math.floor(Math.random() * 12) + 1;
    const enemy = await Enemies.findOne({ where: { id: randomId } });
    return enemy.emoji;
  } catch (err) {
    console.error('Ошибка!!!!!', err);
  }
}

const name = process.argv[2];

async function checkNameUser(name) {
  try {
    const checkUser = await User.findOne({ where: { name } });
    if (checkUser) {
      resultGame(checkUser.id);
    } else {
      const newUser = await User.create({ name });
      resultGame(newUser.id);
    }
  } catch (err) {
    console.error(err);
  }
}

async function resultOver(user_id, gameTime = 0, killedEnemy = 0) {
  try {
    await resultGame.create({ gameTime, killedEnemy, user_id });
    console.log(`Игра окончена!\nСчет:${gameTime}\nКоличество убитых врагов:${killedEnemy}\nВаш результат сохранен под номером ${resultGame.id}`);
  } catch (err) {
    console.error(err);
  }
}

async function getResultGameID(name) {
  try {
    if (typeof Number(name) === 'number') {
      const p = await resultGame.findOne({ where: { id: name } });
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  emojiEnemies, checkNameUser, resultGame, getResultGameID,
};
