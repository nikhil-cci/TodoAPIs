'use strict';

//const User = require('../models/user')
const db = require('../models/index')

var getAllTasks = function(req,res){

    db.Task.findAll().then(tasks => {
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
            userId : req.query.userId
        }
    }).then(tasks => {
        if (tasks == null) res.status(500);
        else {
            res.status(200);
            res.json(tasks);
        }
    })
}

module.exports = {
    getAllTasks,
    createTask,
    getMyTasks
  };
  