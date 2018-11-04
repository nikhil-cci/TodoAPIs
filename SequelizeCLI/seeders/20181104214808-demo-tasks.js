'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkInsert('Task', [{
        title: 'Fill Ace',
        description: 'Fill ace by the end of the day',
        userId: '1',
        priorityId : 2
      },
      {
        title: 'Rest APIs',
        description: 'Complete APIs for todo app',
        userId: '2',
        priorityId : 1
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      Example:
      return queryInterface.bulkDelete('Task', null, {});
  }
};
