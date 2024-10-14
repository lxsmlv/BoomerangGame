class Enemy {
  constructor({ enemy, position }) {
    this.skin = enemy.emoji;
    this.position = position;
  }

  moveLeft() {
    // Идём влево.
    this.position.x -= 1;
  }

  die() {
    this.position.x = -5;
    this.position.y = -5;
  }
}

module.exports = Enemy;
