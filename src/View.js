class View {
  render(track) {
    // Тут всё рисуем.
    console.clear();
    console.log(track.join(''));
  }
}
module.exports = View;
