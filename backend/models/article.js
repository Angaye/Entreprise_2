'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Article.hasMany(models.Comment);
      models.Article.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: 'UserId'
        }
      })
    }
  };
  Article.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};