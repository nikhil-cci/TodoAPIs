'use strict';

const Joi = require('joi');
const validationSchemas = require('../utils/validationSchemas');
const constants = require('../utils/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const User = require('../models/user')
const db = require('../models/index')

var getUsers = function (req, res) {

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

var createUser = function (req, res) {

    Joi.validate(req.body, validationSchemas.createUserSchema, (err, value) => {
        res.status(200);
        if (err) {
            if (err.details.length !== 0) {
                console.log(err.details[0].message);
                res.json(err.details[0]);
            } else {
                res.json(constants.DEFAULT_ERROR_MESSAGE_JSON);
            }
        } else {
            bcrypt.hash(req.body.password, constants.saltRounds, (err, encrypted) => {
                req.body.password = encrypted;
                db.User.create(req.body).then((user) => {
                    console.log(user);
                    res.json(user);
                },
                    (err) => {
                        console.log(err)
                        res.json(constants.DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE
                            .replace(constants.DEFAULT_ERROR_MESSAGE_JSON_TEMPLATE_KEY_MESSAGE, err.parent.sqlMessage));
                    })
            });
        }
    });
}

var getUserById = function (req, res) {
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

var deleteUserById = function (req, res) {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then((value) => {
        res.status(204).send({});
    })
}

var updateUserDetails = function (req, res) {
    db.User.update(req.body
        , {
            where: {
                id: req.body.id
            }
        }).then((value) => {
            res.status(200);
            res.send({});
        });
}

var login = function login(req, res, next) {
    Joi.validate(req.body, validationSchemas.loginUserSchema, (err, value) => {
        res.status(200);
        if (err) {
            if (err.details.length !== 0) {
                console.log(err.details[0].message);
                res.json(err.details[0]);
            } else {
                res.json(constants.DEFAULT_ERROR_MESSAGE_JSON);
            }
        } else {
            // db.User.findAll({
            //     where : {
            //         email: req.body.email
            //     }
            // }).then(users => {
            //     if(users.length !== 0){
            //         bcrypt.compare(req.body.password, users[0].password, (err, same)=>{
            //             if(same){
            //                 res.send("Logged in successfully")
            //             }else{
            //                 res.send("Incorrect password")
            //             }
            //         })
            //     }else{
            //         res.send('user not found')
            //     }
            // },
            // (err) => {
            //     console.log(err)
            //     res.send('err.parent.sqlMessage')
            // })

            res.status(200).json(toAuthJSON(req.user.email));
            //return next();

        } ``
    });
}

function createToken(email) {
    return jwt.sign(
        {
            email: email,
        },
        constants.JWT_SECRET,
    );
}

function toAuthJSON(email) {
    return {
        email: email,
        token: `JWT ${createToken(email)}`,
    };
}

async function authenticateUser(user, password) {
    const match = await bcrypt.compare(password, user.password);
    return match;
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserDetails,
    login,
    authenticateUser
};
