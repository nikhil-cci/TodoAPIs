'use strict'; 
module.exports = function(app){
    var userController = require('../controllers/user.controller');
    var authServices = require('../services/auth.services');

    app
    .route('/users')
    .get(authServices.authJwt ,userController.getUsers)
    .post(userController.createUser)
    .put(userController.updateUserDetails);

    app
    .route('/users/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUserById);

    app
    .route('/login')
    .post(authServices.authLocal, userController.login)
}