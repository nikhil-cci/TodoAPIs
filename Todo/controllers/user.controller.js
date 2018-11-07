'use strict';

const Joi = require('joi');
const validationSchemas = require('../utils/validationSchemas');
const constants = require('../utils/constants');

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

    Joi.validate(req.body, validationSchemas.createUserSchema, (err, value)=>{
        res.status(200);
        if(err){
            if(err.details.length !== 0){
                console.log(err.details[0].message);
                res.json(err.details[0]);
            }else{
                res.json(constants.DEFAULT_ERROR_MESSAGE_JSON);
            }
        }else{
            db.User.create(req.body).then((user, err) => {
                if(err){
                    console.log(err)
                    res.json(err);
                }else{
                    console.log(user);
                    res.json(user);
                }
            })
        }
    });
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
  