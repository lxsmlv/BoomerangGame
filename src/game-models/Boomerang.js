module.exports = class Boomerang {
  constructor({
    position, trackLength, trackHeight, hero,
  }) {
    this.skin = '🪃';
    this.position = position;
    this.trackLength = trackLength;
    this.trackHeight = trackHeight;
    this.hero = hero;
    this.flying = false;
  }

  fly() {
    this.flying = true;
    // Целевая позиция 5 клеток вперед
    const targetPosition = Math.min(this.position.x + 7, this.trackLength - 1);

    const interval = setInterval(() => {
      // Если бумеранг достиг целевой позиции, остановить
      if (this.position.x >= targetPosition) {
        clearInterval(interval); // Остановить движение к врагу
        this.return(); // Вернуться обратно
      } else {
        this.moveRight(); // Двигаемся вправо
      }
    }, 30); // Задержка в 100 мс для движения
  }

  return() {
    const interval = setInterval(() => {
      // Получаем актуальную позицию героя
      const currentHeroPosition = this.hero.position.x;

      // Если бумеранг вернулся на исходную позицию, остановить
      if (this.position.x <= currentHeroPosition) {
        clearInterval(interval); // Остановить возврат
        this.flying = false;
      } else {
        this.moveLeft(); // Двигаемся влево
      }
    }, 30); // Задержка в 100 мс для возврата
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
};
