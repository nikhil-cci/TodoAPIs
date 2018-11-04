'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    designationId: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    timestamps: false
});
  User.associate = function(models) {
    // associations can be defined here
    //User.hasOne(models.Designation)
    User.hasMany(models.Task);
  };
  return User;
};