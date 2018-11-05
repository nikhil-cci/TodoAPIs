'use strict'; 
module.exports = function(app){
    var taskController = require('../controllers/task.controller');

    app
    .route('/tasks')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)
    .delete(taskController.deleteTask);
   

    app
    .route('/getMyTasks')
    .get(taskController.getMyTasks);
}