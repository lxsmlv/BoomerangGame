// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.enemy = new Enemy({ position: 30 });
    this.boomerang = new Boomerang({ position: 0 });
    this.hero = new Hero({ position: 5, boomerang: this.boomerang }); // Герою можно аргументом передать бумеранг.
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
    this.killedEnemy = 0;
    this.gameTime = 0;
  }

  regenerateTrack() {
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  play() {
    setInterval(() => {
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 100);
  }
}

module.exports = Game;
