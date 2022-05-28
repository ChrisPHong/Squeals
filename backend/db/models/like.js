'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
    Like.belongsTo(models.Business, {foreignKey: 'businessId', onDelete: 'CASCADE', hooks: true})

  };
  return Like;
};
