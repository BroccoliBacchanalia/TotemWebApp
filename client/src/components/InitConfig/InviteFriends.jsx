import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';
<<<<<<< HEAD
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';

////Operating under the assumption that groupList is an array
const InviteFriends = ( { friendList }) => (
  <div className="custom-container">
    <div className={localStyles.header}>
			<h3>Invite Your Friends</h3>
		</div>
    <div className={styles.scrollView}>
      <form>
        {friendList.map((friend, index) => (
          <div
            key={index}
            className={localStyles.iFriend}>
            <input type="checkbox" name={friend.name} value={friend.id}/>
            <h4>{friend.name}</h4>
          </div>
        ))}
      </form>
    </div>
    <div className={localStyles.iFooter}>
      {/* Call to firebase to record pending invites */}
      <Link to="/">
        <button>Invite</button>
      </Link>
      <div>
        <Link to="/">
          Skip
        </Link>
      </div>
    </div>
  </div>
);

export default connect((store) => {
	return {
		friendList: store.user.friendList
	}
})(InviteFriends)

