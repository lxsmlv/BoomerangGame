const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ResultGame extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }

  ResultGame.init({
    gameTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enemiesKilled: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Data',
  });

  return ResultGame;
};
