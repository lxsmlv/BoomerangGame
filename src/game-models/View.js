class View {
  static render(track, hero, enemiesKilled, enemy, trackLength) {
    console.clear();
    console.log('Кнопка A - влево, Кнопка D - вправо, Кнопка P - бумеранг, Кнопка E - выйти из игры');
    console.log(`Количество убитых врагов: ${enemiesKilled}`);
    // console.log(`Ваш герой: ${hero.position}`);
    console.log(track.join(''));
    // console.log(enemy);
    // console.log(trackLength);
  }
}
module.exports = View;
