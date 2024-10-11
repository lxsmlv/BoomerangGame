/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Сашка Самойлов',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Полина Павлова',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Тимурчик',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Тимур',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Денис',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
