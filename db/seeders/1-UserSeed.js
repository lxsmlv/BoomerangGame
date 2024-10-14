/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Sanya',
      },
      {
        name: 'Polina174',
      },
      {
        name: 'Timurchik',
      },
      {
        name: 'Denis',
      },
      {
        name: 'Orel',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
