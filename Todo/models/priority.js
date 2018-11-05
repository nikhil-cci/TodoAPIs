'use strict';
module.exports = (sequelize, DataTypes) => {
  const Priority = sequelize.define('Priority', {
    title: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false
});
  Priority.associate = function(models) {
    // associations can be defined here
  };
  return Priority;
};