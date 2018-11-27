'use strict';

//const User = require('../models/user')
const db = require('../models/index')
const constants = require('../utils/constants');

var getAllTasks = function(req,res){

    db.Task.findAll({
        include: [
            {
                model: db.User
            },
            {
                model: db.TaskGroup
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
    
    db.Task.create(req.body).then((task) => {
        res.status(200).json(task);
    },
    (err) => {
        console.log(err)
        res.status(500).json(constants.DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE
            .replace(constants.DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE_KEY_MESSAGE, err.parent.sqlMessage));
    })
}

var getMyTasks = function(req,res){
   
    db.Task.findAll({
        where: {
            userId : req.query.userId
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

//Task Groups
var getAllTaskGroups = function(req,res){
    db.TaskGroup.findAll({}).then(taskGroups => {
        if (taskGroups == null) res.status(500);
        else {
            res.status(200);
            res.json(taskGroups);
        }
    })
}

var createTaskGroup = function(req,res){
    db.TaskGroup.create(req.body).then((taskGroup) => {
        //console.log(taskGroup);
        res.json(taskGroup);
    },
    (err) => {
        console.log(err)
        res.json(constants.DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE
            .replace(constants.DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE_KEY_MESSAGE, err.parent.sqlMessage));
    })
}

var deleteTaskGroup = function(req,res){
    db.TaskGroup.destroy({
        where: {
            id: req.query.id
        }
    }).then((value) => {
        res.status(204).send({});
    })
}

var getTasksByGroupId = function(req,res){
    db.Task.findAll({

        where: {
            groupId: req.params.groupId
        },

        include: [
            {
                model: db.User
            },
            {
                model: db.TaskGroup
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

module.exports = {
    getAllTasks,
    createTask,
    getMyTasks,
    deleteTask,
    getAllTaskGroups,
    getTasksByGroupId,
    createTaskGroup,
    deleteTaskGroup
  };
  