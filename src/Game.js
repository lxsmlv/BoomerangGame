const Hero = require('./game-models/Hero');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const Enemy = require('./game-models/Enemy'); // Убедитесь, что путь правильный

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.
class Game {
  constructor({ trackLength, enemy }) { // Принимаем enemy как параметр
    this.trackLength = trackLength;
    this.enemy = enemy; // Присваиваем переданного врага
    this.boomerang = new Boomerang({ position: 0 });
    this.hero = new Hero({ position: 0, boomerang: this.boomerang });
    this.view = new View();
    this.track = [];
    this.killedEnemy = 0;
    this.gameTime = 0;
    this.regenerateTrack();
  }

  regenerateTrack() {
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
    this.track[this.hero.position] = this.hero.skin;
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die(this.killedEnemy, this.gameTime);
    }
  }

  async checkEnemy() {
    if (!this.enemy.isAlive) { // Если враг мёртв
      this.killedEnemy += 1;
      this.enemy = await Enemy.create(); // Создать нового врага
    }
  }

  play() {
    // Запускаем интервал для движения врага
    this.enemyMovementInterval = setInterval(() => {
      this.enemy.moveLeft();
    }, 250); // Интервал для движения врага

    // Запускаем интервал для обновления игры
    this.gameUpdateInterval = setInterval(() => {
      this.check();
      this.checkEnemy();
      this.regenerateTrack();
      this.view.render(this.track);
      this.gameTime += 10;
    }, 10); // Интервал для обновления игры

    this.enemyMovementInterval = setInterval(() => {
      this.enemy.moveLeft();
    }, 150); // Интервал для движения врага
  }
}

module.exports = Game;
