import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';
import $ from 'jquery';

class InviteFriends extends React.Component {
 constructor(props){
  super(props);
 }

sendPendingInvite (){
   console.log('CLICKED', $('input:checkbox:checked'))

  let checkedUsers = $('input:checkbox:checked').map((item)=>{
    return $('input:checkbox:checked')[item].value
  }).get();
}

  render(){

    console.log('FRIEND', this.props.friendList)
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
     
        <button onClick={this.sendPendingInvite.bind(this)}>Invite</button>
 
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
		friendList: store.user.friendList.data
	}
})(InviteFriends)
// sendPendingInvite.bind(this)
 // <Link to="/">
 //      </Link>