// Враг.
const { emojiEnemies } = require('../../crud/DB-function');

class Enemy {
  constructor({ position }) {
    this.skin = '🤠';
    this.position = position;
    this.isAlive = true;
  }

  async initialize() {
    this.skin = await emojiEnemies();
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = null;
    this.isAlive = false;
  }
}

module.exports = Enemy;

// вот так надо будет объявлять Enemy
// (async () => {
//   const p = new Enemy();
//   await p.initialize();
// })();
