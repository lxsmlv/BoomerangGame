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

  attack(enemy) {
    this.boomerang.fly(enemy);
  }

  die(killedEnemy, gameTime) {
    this.skin = '💀';
    console.log('Ты умер!💀');
    console.log(`Убито врагов: ${killedEnemy}`);
    console.log(`Время игры: ${gameTime / 1000} секунд`);
    process.exit();
  }
}

module.exports = Hero;
