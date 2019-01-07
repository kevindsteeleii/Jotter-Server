'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
  };
  return Notebook;
};