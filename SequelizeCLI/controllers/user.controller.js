'use strict';

//const User = require('../models/user')
const db = require('../models/index')

var getUsers = function(req,res){

    db.User.findAll({
        include: [
            {
               model: db.Task,
            },
            {
                model: db.Designation
            }
        ]
    }).then(users => {

        if (users == null) res.status(500);
        else {
            res.status(200);
            res.json(users);
        }
    })
}

var createUser = function(req,res){
    
    var user = new db.User(req.body);

    if (!req.body.email) {
        res.status(400);
        res.send('Email is empty');
    } else {
        user.save();
        res.status(201);
        res.send(user);
    }
}

var getUserById = function(req,res){
    db.User.findById(req.params.id, {
        include: [
            {
               model: db.Task
            }
        ]
    }).then(user => {
        if (user == null) res.status(500);
        else {
          res.status(201);
          res.json(user);
        }
    });
}

var deleteUserById = function(req,res){
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then((value) => {
        res.status(204).send({});
    })
}

var updateUserDetails = function(req,res){
    db.User.update(req.body
        ,{
            where: {
                id: req.body.id
            }
        }).then((value)=>{
            res.status(200);
            res.send({});
        });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserDetails
  };
  