import React from 'react';
import store from '../../redux/store.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserGroupID } from '../../redux/actions/userActions';
import { setDefaultChat } from '../../redux/actions/chatActions';
import { firebaseOnce, firebaseSet } from '../../redux/actions/firebaseActions';
import styles from '../Styles.css';
import localStyles from './ConfigStyles.css';

class ChooseGroup extends React.Component {
  render(){
    const groupKeys = Object.keys(this.props.groupList);

    return (
      <div className="custom-container">
        <div className={ localStyles.header }>
          <h3>Choose Your Group</h3>
        </div>
        <div className={styles.scrollView + ' ' + localStyles.cRow}>
          {groupKeys.map((key, index) => (
            <Link key={index} to='/map'>
              <div
                key={index}
                className={styles.row}
                onClick={() => {
                  updateUserGroupID(key);
                  this.removeGroupFromPendingInvites(key);
                }}>
                { this.props.groupList[key] }
              </div>
            </Link>
          ))}
        </div>
        <div className={ localStyles.cFooter }>
          <div>
            <Link to="/choosevenue">
              Skip
            </Link>
          </div>
        </div>
      </div>
    );
  }

  removeGroupFromPendingInvites(key) {
    let userId = this.props.userId;

    firebaseOnce(`users/${ userId }/pendingInvites`, (invites)=> {
      delete invites[key];
      firebaseSet(`users/${ userId }/pendingInvites`, invites);
    });
  }
}

export default connect((store) => {
	return {
		groupList: store.user.pendingInvites,
    userId : store.user.uid,
    userName : store.user.name
	}
})(ChooseGroup)
