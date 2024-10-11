class View {
  render(track) {
    // Тут всё рисуем.
    console.clear();
    console.log('Кнопка A - влево, Кнопка D - вправо, Кнопка P - использование бумеранга');
    console.log(track.join(''));
  }
}
module.exports = View;
