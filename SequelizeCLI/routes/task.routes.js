'use strict'; 
module.exports = function(app){
    var taskController = require('../controllers/task.controller');

    app
    .route('/tasks')
    .get(taskController.getAllTasks)
    .post(taskController.createTask);

}