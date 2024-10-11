class Hero {
  constructor({ position, boomerang }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.boomerang = boomerang;
  }

  moveLeft() {
    if (this.position !== 0) {
      this.position -= 1;
    }
  }

  moveRight(track) {
    if (this.position < track.length) {
      this.position += 1;
    }
  }

  attack() {
    this.boomerang.fly();
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
