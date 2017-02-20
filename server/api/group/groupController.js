'use strict'
const Group = require('./groupModel');

const controller = {
  retrieve: function(req, res, next) {
    //TODO
  },
  create: function(req, res, next) {
    console.log('group post req received');
    console.log(req.body);

    Group.create({
      name: req.body.groupName
    }).then(function(group, created) {
      console.log('group created, id: ', group.dataValues.id);
      return res.json(group.dataValues.id);
    }).catch(function(err) {
      console.log('error in create user:', err.errors[0].message);
      return res.status(500).send(err.errors[0].message);
    });
  }
};

module.exports = controller;
