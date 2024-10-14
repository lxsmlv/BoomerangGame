const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GameData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  GameData.init({
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
    modelName: 'GameData',
  });
  return GameData;
};
