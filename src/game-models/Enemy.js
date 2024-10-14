class Enemy {
  constructor({ enemy, position }) {
    this.skin = enemy.emoji;
    this.position = position;
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.position = null;
  }
}

module.exports = Enemy;
