'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkInsert('Task', [
      {
        title: 'Rest APIs',
        description: 'Complete APIs for todo app',
        userId: '2',
        priorityId : 1
      },
      {
        title: 'Random',
        description: 'Random description',
        userId: '2',
        priorityId : 1
      },
      {
        title: 'Another task',
        description: 'Another task description',
        userId: '2',
        priorityId : 3
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
