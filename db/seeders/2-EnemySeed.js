/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Enemies', [
      {
        emoji: '👾',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '💀',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '👹',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '👻',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '👽',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '👿',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '💩',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '🤡',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '🤺',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '🧛',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '🧟',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        emoji: '🎃',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Enemies', null, {});
  },
};
