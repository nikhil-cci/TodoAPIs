'use strict'; 
module.exports = function(app){
    var userController = require('../controllers/user.controller');

    app
    .route('/users')
    .get(userController.getUsers)
    .post(userController.createUser)
    .put(userController.updateUserDetails);

    app
    .route('/users/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUserById);

    app
    .route('/login')
    .post(userController.login)
} 