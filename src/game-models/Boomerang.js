class Boomerang {
  constructor({ position }) {
    this.skin = '🌀';
    this.position = position;
  }

  fly(targetPosition) {
    const interval = setInterval(() => {
      // Если бумеранг достиг целевой позиции, остановить
      if (this.position >= targetPosition) {
        clearInterval(interval); // Остановить движение к врагу
        this.return(); // Вернуться обратно
      } else {
        this.moveRight(); // Двигаемся вправо
      }
    }, 100); // Задержка в 100 мс для движения
  }

  return() {
    const interval = setInterval(() => {
      // Если бумеранг вернулся на исходную позицию, остановить
      if (this.position <= 0) {
        clearInterval(interval); // Остановить возврат
      } else {
        this.moveLeft(); // Двигаемся влево
      }
    }, 100); // Задержка в 100 мс для возврата
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;
