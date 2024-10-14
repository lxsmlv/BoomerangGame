module.exports = class Boomerang {
  constructor({ position, trackLength, hero }) {
    this.skin = '🪃';
    this.position = position;
    this.trackLength = trackLength;
    this.hero = hero;
    this.flying = false;
  }

  fly() {
    this.flying = true;
    // Целевая позиция 5 клеток вперед
    const targetPosition = Math.min(this.position + 7, this.trackLength);

    const interval = setInterval(() => {
      // Если бумеранг достиг целевой позиции, остановить
      if (this.position >= targetPosition) {
        clearInterval(interval); // Остановить движение к врагу
        this.return(); // Вернуться обратно
      } else {
        this.moveRight(); // Двигаемся вправо
      }
    }, 50); // Задержка в 100 мс для движения
  }

  return() {
    const interval = setInterval(() => {
      // Получаем актуальную позицию героя
      const currentHeroPosition = this.hero.position;

      // Если бумеранг вернулся на исходную позицию, остановить
      if (this.position <= currentHeroPosition) {
        clearInterval(interval); // Остановить возврат
        this.flying = false;
      } else {
        this.moveLeft(); // Двигаемся влево
      }
    }, 50); // Задержка в 100 мс для возврата
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
};
