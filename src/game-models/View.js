class View {
  static render(track, enemiesKilled) {
    console.clear();
    console.log('Кнопка A - влево, Кнопка D - вправо, Кнопка P - бумеранг, Кнопка E - выйти из игры');
    console.log(`Количество убитых врагов: ${enemiesKilled}`);
    track.forEach((row) => console.log(row.join('')));
  }
}
module.exports = View;
