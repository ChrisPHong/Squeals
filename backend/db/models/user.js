'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    image: { 
      allowNull: false,
        type: DataTypes.STRING },
    bio: { 
        type: DataTypes.STRING},
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Business, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.Like, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
    User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
  };

  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, username, email, image } = this; // context will be the User instance
    return { id, username, email, image };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password, image, bio }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      bio,
      image
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
