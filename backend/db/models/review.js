'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey: 'userId', hooks: true})
    Review.belongsTo(models.Business, {foreignKey: 'businessId', hooks: true})
    Review.hasMany(models.Like, {foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true})

  };
  return Review;
};
