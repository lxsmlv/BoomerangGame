/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'GameData',
      [
        {
          gameTime: 90,
          enemiesKilled: 50,
          userId: 1,
        },
        {
          gameTime: 50,
          enemiesKilled: 30,
          userId: 2,
        },
        {
          gameTime: 50,
          enemiesKilled: 5,
          userId: 3,
        },
        {
          gameTime: 400,
          enemiesKilled: 40,
          userId: 4,
        },
        {
          gameTime: 500,
          enemiesKilled: 50,
          userId: 5,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GameData', null, {});
  },
};
