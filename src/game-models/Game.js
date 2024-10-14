const Hero = require('./Hero');
const Boomerang = require('./Boomerang');
const Enemy = require('./Enemy');
const View = require('./View');
const { getEnemy, delay } = require('../../funtionsForDB');

module.exports = class Game {
  constructor({ trackLength, enemy }) {
    this.trackLength = trackLength;
    this.startPosition = 0;
    this.hero = new Hero({
      position: this.startPosition,
      trackLength: this.trackLength,
    });
    this.boomerang = new Boomerang({
      position: this.startPosition,
      trackLength: this.trackLength,
      hero: this.hero,
    });
    this.enemy = new Enemy({ enemy, position: 30 });
    this.track = [];
    this.enemiesKilled = 0;
    this.startTime = 0;
    this.gameTime = 0;
    this.gameOver = false;
    this.userStopGame = false;
    this.gameUpdateInterval = null;
    this.enemyMovementInterval = null;
    this.regenerateTrack();
  }

  stopGame() {
    this.userStopGame = true;
    this.gameOver = true;
  }

  regenerateTrack() {
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
    this.track[this.hero.position] = this.hero.skin;
  }

  async check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die(); // Убийство героя
      this.gameOver = true; // Устанавливаем флаг завершения игры
      return;
    }
    if (this.boomerang.position === this.enemy.position) {
      this.enemy.die();
      this.enemiesKilled += 1;
      await delay(2000);
      const newEnemy = await getEnemy();
      this.enemy = new Enemy({ enemy: newEnemy, position: 30 });
    }
  }

  async play() {
    return new Promise((resolve) => {
      // Запуск счетчика времени
      this.startTime = Date.now();

      // Запускаем интервал движения врага
      this.enemyMovementInterval = setInterval(() => {
        this.enemy.moveLeft();
      }, 200); // Интервал для движения врага

      // Запускаем интервал для обновления игры
      this.gameUpdateInterval = setInterval(() => {
        // Проверка условия смерти героя или врага
        this.check();

        // Обновление позиций всех участников на поле игры
        this.regenerateTrack();

        // Обновление поля игры
        View.render(this.track, this.hero, this.enemiesKilled, this.enemy, this.trackLength);

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
