const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enemies extends Model {
    static associate(models) {
    }
  }

  Enemies.init({
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Enemy', // Имя модели в PascalCase
  });

  return Enemies;
};
