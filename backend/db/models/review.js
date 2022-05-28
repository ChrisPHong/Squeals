'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
    Review.belongsTo(models.Business, {foreignKey: 'businessId', onDelete: 'CASCADE', hooks: true})
  };
  return Review;
};
