'use strict'; 
module.exports = function(app){
    var taskController = require('../controllers/task.controller');
    var authServices = require('../services/auth.services');

    app
    .route('/tasks')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)
    .delete(taskController.deleteTask);
   

    app
    .route('/getMyTasks')
    .get(authServices.authJwt, taskController.getMyTasks);
}