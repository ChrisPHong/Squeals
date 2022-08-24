'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    label: DataTypes.STRING,
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, {foreignKey: 'userId', hooks: true})
    Like.belongsTo(models.Review, {foreignKey: 'reviewId', hooks: true})

  };
  return Like;
};
