'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.belongsTo(models.User, {foreignKey: 'userId'})
    Business.hasMany(models.Review, {foreignKey: 'businessId', onDelete: 'CASCADE', hooks: true})
  };
  return Business;
};
