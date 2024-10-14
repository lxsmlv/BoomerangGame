module.exports = class Hero {
  constructor({ position, trackLength, trackHeight }) {
    this.skin = '💃';
    this.position = position;
    this.trackLength = trackLength;
    this.trackHeight = trackHeight;
  }

  moveLeft() {
    if (this.position.x !== 0) {
      this.position.x -= 1;
    }
  }

  moveRight() {
    if (this.position.x < this.trackLength - 1) {
      this.position.x += 1;
    }
  }

  moveUp() {
    if (this.position.y > 0) {
      this.position.y -= 1;
    }
  }

  moveDown() {
    if (this.position.y < this.trackHeight - 1) {
      this.position.y += 1;
    }
  }

  die() {
    this.skin = '💀';
  }
};
