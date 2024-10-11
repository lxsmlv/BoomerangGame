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

  play() {
    setInterval(() => {
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 100);
  }
}

module.exports = Game;
