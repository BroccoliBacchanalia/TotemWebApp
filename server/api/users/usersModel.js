const db = require('../database.js');

const User = db.define('user', {
  fb_id: {
    type: Sequelize.STRING,
    unique: true
  },
  friends: {
    //references fb_id of friends
  },
  venue_group: {
    //reference venue group ID
  }
});

module.exports = User;
