const Hero = require('./Hero');
const Boomerang = require('./Boomerang');
const Enemy = require('./Enemy');
const View = require('./View');
const { getEnemy, delay } = require('../../funtionsForDB');

module.exports = class Game {
  constructor({ trackLength, trackHeight, enemiesCount }) {
    this.trackLength = trackLength;
    this.trackHeight = trackHeight;
    this.startPositionX = 0;
    this.startPositionY = 0;
    this.hero = new Hero({
      position: { x: this.startPositionX, y: this.startPositionY },
      trackLength: this.trackLength,
      trackHeight: this.trackHeight,
    });
    this.boomerang = new Boomerang({
      position: { x: this.startPositionX, y: this.startPositionY },
      trackLength: this.trackLength,
      trackHeight: this.trackHeight,
      hero: this.hero,
    });
    this.enemies = [];
    this.track = [];
    this.enemiesKilled = 0;
    this.startTime = 0;
    this.gameTime = 0;
    this.gameOver = false;
    this.userStopGame = false;
    this.gameUpdateInterval = null;
    this.enemyMovementInterval = null;
    this.generateEnemies(enemiesCount);
    this.regenerateTrack();
    setInterval(() => this.regenerateEnemies(enemiesCount), 2000);
  }

  stopGame() {
    this.userStopGame = true;
    this.gameOver = true;
  }

  async generateEnemies(count) {
    const enemyPromises = []; // Массив для хранения промиссов

    for (let i = 0; i < count; i += 1) {
      const randomX = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Случайное число от 20 до 30
      const randomY = Math.floor(Math.random() * (5 - 0 + 1)); // Случайное число от 0 до 5
      enemyPromises.push(getEnemy().then((newEnemy) => {
        const enemy = new Enemy({ enemy: newEnemy, position: { x: randomX, y: randomY } });
        this.enemies.push(enemy);
      }));
    }

    // Ожидаем завершения всех промиссов
    await Promise.all(enemyPromises);
  }

  async regenerateEnemies(count) {
    // Проверяем, сколько врагов нужно добавить
    while (this.enemies.length < count) {
      const randomX = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Случайное число от 20 до 30
      const randomY = Math.floor(Math.random() * (5 - 0 + 1)); // Случайное число от 0 до 5

      // Получаем врага асинхронно и сразу добавляем его, не блокируя игровой процесс
      getEnemy().then((newEnemy) => {
        const enemy = new Enemy({ enemy: newEnemy, position: { x: randomX, y: randomY } });
        this.enemies.push(enemy);
      }).catch((err) => {
        console.error('Ошибка при генерации врага:', err);
      });

      // Для избежания полной блокировки добавим небольшую задержку между генерациями врагов
      await delay(100); // Это позволит игре обновляться
    }
  }

  regenerateTrack() {
    // Очищаем поле
    this.track = new Array(this.trackHeight).fill().map(() => new Array(this.trackLength).fill(' '));

    this.enemies.forEach((enemy) => {
      if (enemy.position.y >= 0 && enemy.position.y < this.trackHeight
          && enemy.position.x >= 0 && enemy.position.x < this.trackLength) {
        this.track[enemy.position.y][enemy.position.x] = enemy.skin;
      }
    });

    // Проверяем позиции и обновляем поля только в допустимых пределах
    if (this.boomerang.position.y >= 0 && this.boomerang.position.y < this.trackHeight
        && this.boomerang.position.x >= 0 && this.boomerang.position.x < this.trackLength) {
      this.track[this.boomerang.position.y][this.boomerang.position.x] = this.boomerang.skin;
    }
    if (this.hero.position.y >= 0 && this.hero.position.y < this.trackHeight
        && this.hero.position.x >= 0 && this.hero.position.x < this.trackLength) {
      this.track[this.hero.position.y][this.hero.position.x] = this.hero.skin;
    }
  }

  async check() {
    // Проверяем столкновения героя с врагами
    this.enemies.forEach((enemy) => {
      if (this.hero.position.x === enemy.position.x && this.hero.position.y === enemy.position.y) {
        this.hero.die(); // Убийство героя
        this.gameOver = true; // Устанавливаем флаг завершения игры
      }

      // удаление врагов, которые вышли за поле игры
      if (enemy.position.x < 0) {
        enemy.die(); this.enemies = this.enemies.filter((e) => e !== enemy);
      }

      // удаление врагов, которых достиг бумеранг
      if (this.boomerang.position.x === enemy.position.x && this.boomerang.position.y === enemy.position.y) {
        enemy.die();
        this.enemiesKilled += 1;
        // Удаляем поверженного врага из массива
        this.enemies = this.enemies.filter((e) => e !== enemy);
      }
    });
  }

  async play() {
    return new Promise((resolve) => {
      // Запуск счетчика времени
      this.startTime = Date.now();

      // Запускаем интервал движения врага
      this.enemyMovementInterval = setInterval(() => {
        this.enemies.forEach((enemy) => enemy.moveLeft()); // Двигаем всех врагов
      }, 200); // Интервал для движения врагов

      // Запускаем интервал для обновления игры
      this.gameUpdateInterval = setInterval(() => {
        // Проверка условия смерти героя или врага
        this.check();

        // Обновление позиций всех участников на поле игры
        this.regenerateTrack();

        // Обновление поля игры
        View.render(this.track, this.enemiesKilled);

        // Проверка окончания игры
        if (this.gameOver) {
          clearInterval(this.gameUpdateInterval); // Останавливаем интервал обновления игры
          clearInterval(this.enemyMovementInterval); // Останавливаем интервал движения врага
          this.gameTime = Math.floor((Date.now() - this.startTime) / 1000);
          if (this.userStopGame) { console.log('Вы остановили игру'); }
          resolve(); // Завершаем промис
        }
      }, 10); // Интервал для обновления игры
    });
  }
};
