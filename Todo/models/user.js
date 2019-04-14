'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    designationId: DataTypes.INTEGER
  }, {
      freezeTableName: true
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      foreignKey: 'userId'
    });

    User.belongsTo(models.Designation)
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }


  return User;
};