import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';

////Operating under the assumption that groupList is an array
const InviteFriends = ( { fbFriends }) => (
  <div>
    <div>Invite Friends</div>
    <form>
      {fbFriends.map((friend, index) => (
        <input type="checkbox" name={friend.name} value={friend.id}/>
      ))}
    </form>
    <Link to="/">
      {/* Call to firebase to record pending invites */}
      Invite
    </Link>
    <Link to="/">
      Skip
    </Link>
  </div>
);

export default connect((store) => {
	return {
		fbFriends: store.user.fbFriends
	}
})(InviteFriends)
