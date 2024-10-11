const Hero = require('./game-models/Hero');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

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
      this.hero.die();
    }
  }

  checkEnemy() {
    if (!this.enemy.isAlive) { // Если враг мёртв
      this.enemy = new Enemy({ position: 30 }); // Создать нового врага
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
    }, 10); // Интервал для обновления игры

    this.enemyMovementInterval = setInterval(() => {
      this.enemy.moveLeft();
    }, 150); // Интервал для движения врага
  }
}

module.exports = Game;
