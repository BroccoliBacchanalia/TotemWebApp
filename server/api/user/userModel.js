const Sequelize = require('sequelize');
const db = require('../../db/database');
const Group = require('../group/groupModel');

const User = db.define('user', {
  fb_id: {
    type: Sequelize.STRING,
    unique: true
  },
  group_id: {
    type: Sequelize.INTEGER,
    model: 'group',
    key: 'id'
  }
});

Group.hasMany(User);

db.sync();

module.exports = User;
