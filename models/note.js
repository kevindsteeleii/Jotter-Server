'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};