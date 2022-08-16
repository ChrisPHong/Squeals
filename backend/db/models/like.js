'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, {foreignKey: 'userId', hooks: true})
    Like.belongsTo(models.Business, {foreignKey: 'businessId', hooks: true})

  };
  return Like;
};
