'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskGroup = sequelize.define('TaskGroup', {
    name: DataTypes.STRING,
    dueDate: DataTypes.DATE
  }, {
    freezeTableName: true
  });
  TaskGroup.associate = function(models) {
    // associations can be defined here
    // associations can be defined here
    TaskGroup.hasMany(models.Task, {
        foreignKey: 'groupId'
      });
  };
  return TaskGroup;
};