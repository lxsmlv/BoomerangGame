/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Enemies', [
      {
        emoji: '👾',
      },
      {
        emoji: '💀',
      },
      {
        emoji: '👹',
      },
      {
        emoji: '👻',
      },
      {
        emoji: '👽',
      },
      {
        emoji: '👿',
      },
      {
        emoji: '💩',
      },
      {
        emoji: '🤡',
      },
      {
        emoji: '🤺',
      },
      {
        emoji: '🧛',
      },
      {
        emoji: '🧟',
      },
      {
        emoji: '🎃',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Enemies', null, {});
  },
};
