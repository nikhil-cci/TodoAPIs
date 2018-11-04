'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    priorityId: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    timestamps: false
});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};