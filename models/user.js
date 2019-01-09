'use strict';
const bcrypt = require('bcrypt');
let saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        saltRounds = 10;
        user.password = bcrypt.hashSync(user.password, saltRounds);
      }
    }
  });
  User.prototype.validPass = function (plainTextPass) {
    return bcrypt.compareSync(plainTextPass, this.password)
  }

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Notebook, { as: 'Notebooks', onDelete: 'cascade', hooks: true})
  };
  return User;
};