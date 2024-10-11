class Boomerang {
  constructor({ position }) {
    this.skin = '🌀';
    this.position = position;
  }

  fly(enemy) {
    const interval = setInterval(() => {
      // Если бумеранг достиг целевой позиции, остановить
      if (this.position >= enemy.position) {
        clearInterval(interval); // Остановить движение к врагу

        // Проверяем, убивает ли бумеранг врага
        if (this.position === enemy.position) {
          enemy.die(); // Убить врага
        }

        this.return(enemy); // Вернуться обратно
      } else {
        this.moveRight(); // Двигаемся вправо
      }
    }, 50); // Задержка в 100 мс для движения
  }

  return(enemy) {
    const interval = setInterval(() => {
      // Если бумеранг вернулся на исходную позицию, остановить
      if (this.position <= 0) {
        clearInterval(interval); // Остановить возврат
      } else {
        this.moveLeft(); // Двигаемся влево
        if (this.position === enemy.position) {
          enemy.die(); // Убить врага
        }
      }
    }, 50); // Задержка в 100 мс для возврата
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
