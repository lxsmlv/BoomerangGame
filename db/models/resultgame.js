const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class resultGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  resultGame.init({
    gameTime: DataTypes.INTEGER,
    enemiesKilled: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'resultGame',
  });
  return resultGame;
};
