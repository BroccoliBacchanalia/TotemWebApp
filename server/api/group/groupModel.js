'use strict'
const Sequelize = require('sequelize');
const db = require('../../db/database.js');

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Group;
