// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
const Boomerang = require("./game-models/Boomerang");
const View = require("./View");

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero({ position: 0 }); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy({ position: 30 });
    this.boomerang = new Boomerang({ position: 30 });
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
  }

  moveHero(direction) {
    if (direction === 'left') {
      this.hero.position = Math.max(0, this.hero.position - 1); // Двигаем влево
    } else if (direction === 'right') {
      this.hero.position = Math.min(this.trackLength - 1, this.hero.position + 1); // Двигаем вправо
    }
  }

  regenerateTrack() {
    this.track = new Array(this.trackLength).fill(" ");
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
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    });
  }
}

module.exports = Game;
