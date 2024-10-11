const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enemies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enemies.init({
    emoji: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Enemies',
  });
  return Enemies;
};
