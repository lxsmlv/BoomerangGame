module.exports = class Hero {
  constructor({ position, trackLength }) {
    this.skin = '💃';
    this.position = position;
    this.trackLength = trackLength;
  }

  moveLeft() {
    if (this.position !== 0) {
      this.position -= 1;
    }
  }

  moveRight() {
    if (this.position < this.trackLength) {
      this.position += 1;
    }
  }

  die() {
    this.skin = '💀';
  }
};
