/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Сашка Самойлов',
      },
      {
        name: 'Полина Павлова',
      },
      {
        name: 'Тимурчик',
      },
      {
        name: 'Тимур',
      },
      {
        name: 'Денис',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
