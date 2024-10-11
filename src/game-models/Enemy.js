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

  static async create() {
    const enemy = new Enemy(); // Создаём экземпляр врага
    await enemy.initialize(); // Инициализируем его
    return enemy; // Возвращаем инициализированный экземпляр
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
