'use strict';

//const User = require('../models/user')
const db = require('../models/index')

var getAllTasks = function(req,res){

    db.Task.findAll({
        include: [
            {
                model: db.User
            }
        ]
    }).then(tasks => {
        if (tasks == null) res.status(500);
        else {
            res.status(200);
            res.json(tasks);
        }
    })
}

var createTask = function(req,res){
    
    var user = new db.Task(req.body);
    user.save();
    res.status(201);
    res.send(user);
}

var getMyTasks = function(req,res){
   
    db.Task.findAll({
        where: {
            userId : req.user.id
        },
        include: [
            {
                model: db.User
            },
            {
                model: db.Priority
            }
        ]
    }).then(tasks => {
        if (tasks == null) res.status(500);
        else {
            res.status(200);
            res.json(tasks);
        }
    })
}

var deleteTask = function(req,res){
    db.Task.destroy({
        where: {
            id: req.query.id
        }
    }).then((value) => {
        res.status(204).send({});
    })
}

module.exports = {
    getAllTasks,
    createTask,
    getMyTasks,
    deleteTask
  };
  