'use strict'
const Sequelize = require('sequelize');
const db = require('../../db/database.js');

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING
  },
  venue_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = Group;
