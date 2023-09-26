'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.Article, {
        foreignKey: {
          allowNull: false,
          name: 'ArticleId'
        }
      })
    }
  };
  Comment.init({
    ArticleId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    post: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};