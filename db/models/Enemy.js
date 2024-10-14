const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enemy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enemy.init({
    emoji: {
      type: DataTypes.STRING,
      allowNull: false, // Это должно быть внутри описания поля "emoji"
    },
  }, {
    sequelize,
    modelName: 'Enemy',
  });
  return Enemy;
};
