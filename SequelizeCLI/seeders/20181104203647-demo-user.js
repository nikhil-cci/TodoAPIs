'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkInsert('User', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        designationId: '0'
      },
      {
        firstName: 'Nikhil',
        lastName: 'Gaonkar',
        email: 'nik@demo.com',
        designationId: '0'
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkDelete('User', null, {});
    
  }
};
