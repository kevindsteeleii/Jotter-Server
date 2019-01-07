'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: 'UserId', targetKey: 'id'})
    Notebook.hasMany(models.Note, {as: 'Notes', onDelete: 'cascade', hooks:true})
  };
  return Notebook;
};