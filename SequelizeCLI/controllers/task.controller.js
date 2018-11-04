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

module.exports = {
    getAllTasks
  };
  