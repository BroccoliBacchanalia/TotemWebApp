const db = require('../../db/database.js');

const Friends = db.define('friends', {
  base_user_id: {
    //TODO
  },
  target_user_id: {
    //TODO
  }
});

module.exports = Friends;
