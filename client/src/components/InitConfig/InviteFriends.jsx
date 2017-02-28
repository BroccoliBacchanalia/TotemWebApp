import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';
import $ from 'jquery';
import firebase from 'firebase';

class InviteFriends extends React.Component {
 constructor(props){
  super(props);
 }

sendPendingInvite (){
  let checkedUsers = $('input:checkbox:checked').map((item)=>{
    return $('input:checkbox:checked')[item].value
  }).get();
  let id = this.props.groupId;
  let name = this.props.groupName;
  let pendingInvites = {}
  pendingInvites[id] = name;
  
  let db = firebase.database();

  for (var i = 0; i < checkedUsers.length; i++) {
    db.ref(`users/${ checkedUsers[i] }/pendingInvites`).update(pendingInvites);
  }
}

  render(){

  return(
  <div className="custom-container">
    <div className={localStyles.header}>
			<h3>Invite Your Friends</h3>
		</div>
    <div className={styles.scrollView}>
      <form id="check_table">
        {this.props.friendList.map((friend, index) => (
          <div
            key={index}
            className={localStyles.iFriend}>
            <input type="checkbox" name={friend.label} value={friend.firebaseId}/>
            <h4>{friend.label}</h4>
          </div>
        ))}
      </form>
    </div>
    <div className={localStyles.iFooter}>
      <Link to="/">
        <button onClick={this.sendPendingInvite.bind(this)}>Invite</button>
      </Link>
      <div>
        <Link to="/">
          Skip
        </Link>
      </div>
    </div>
  </div>
)
}
}

export default connect((store) => {
	return {
		friendList: store.user.friendList.data,
    groupId: store.user.groupId,
    groupName: store.user.groupName
	}
})(InviteFriends)

