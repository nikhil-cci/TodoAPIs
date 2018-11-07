'use strict';
module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define('Designation', {
    title: DataTypes.STRING
  }, {    
    freezeTableName: true
});
  Designation.associate = function(models) {
    // associations can be defined here
  };
  return Designation;
};