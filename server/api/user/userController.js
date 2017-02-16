'use strict'
const User = require('./userModel');

const controller = {

  signin: function(req, res, next) {
    //TODO
  },

  create: function(req, res, next) {
    User.findOrCreate({
      where: {
        fb_id: req.body.fb_id
      },
      // defaults: {
      //   password: password
      // }
    }).spread(function(user, created) {
      console.log('user in create user', user);
      console.log('created in create user', created);
      if (created) {
        console.log('User was successfully created');
        return res.sendStatus(201);
      }
      return res.sendStatus(500);
    }).catch(function(err) {
      console.log('error in create user', err);
      return res.sendStatus(500);
    });
  },

  authenticate: function(req, res, next) {
    //TODO
  }

};

module.exports = controller;
