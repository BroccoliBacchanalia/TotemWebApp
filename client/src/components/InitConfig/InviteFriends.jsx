import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';
import $ from 'jquery';

const InviteFriends = ( { friendList }) => (
  <div className="custom-container">
    <div className={localStyles.header}>
			<h3>Invite Your Friends</h3>
		</div>
    <div className={styles.scrollView}>
      <form id="check_table">
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
      <Link to="/">
        <button id='invite_button'>Invite</button>
      </Link>
      <div>
        <Link to="/">
          Skip
        </Link>
      </div>
    </div>
  </div>
);

$('#invite_button').click(e=>{
  e.preventDefault();

})

const sendPendingInvite = () => {
  
}

export default connect((store) => {
	return {
		friendList: store.user.friendList
	}
})(InviteFriends)

