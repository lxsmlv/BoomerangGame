/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'resultGames',
      [
        {
          gameTime: 90,
          enemiesKilled: 50,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameTime: 200,
          enemiesKilled: 180,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameTime: 50,
          enemiesKilled: 30,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameTime: 50,
          enemiesKilled: 5,
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameTime: 900,
          enemiesKilled: 140,
          user_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameTime: 400,
          enemiesKilled: 40,
          user_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameTime: 500,
          enemiesKilled: 50,
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          gameTime: 500,
          enemiesKilled: 50,
          user_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('resultGames', null, {});
  },
};
