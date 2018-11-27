'use strict'; 
module.exports = function(app){
    var taskController = require('../controllers/task.controller');

    app
    .route('/tasks')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)
    .delete(taskController.deleteTask);
   
    app
    .route('/getTasksByGroupId/:groupId')
    .get(taskController.getTasksByGroupId);

    app
    .route('/getMyTasks')
    .get(taskController.getMyTasks);

    app
    .route('/tasks/groups')
    .get(taskController.getAllTaskGroups)
    .post(taskController.createTaskGroup)
    .delete(taskController.deleteTaskGroup);
   
}