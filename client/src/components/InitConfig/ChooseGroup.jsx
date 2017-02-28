import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../redux/store.js';
import { selectGroup, skipGroup } from '../../redux/actions/venueActions.js'
import { updateGroupId } from '../../redux/actions/userActions';
import firebase from 'firebase';


class ChooseGroup extends React.Component {
  constructor(props, context) {
    super(props);
  }

  removeGroupFromPendingInvites() {
    let userId = this.props.userId;
    let db = firebase.database();
    db.ref(`users/${ userId }/pendingInvites`).set({
      pendingInvites: ''
    });
  }

  render(){
    const groupKeys = Object.keys(this.props.groupList);
    const router = this.context.router;

  	return (
  		<div>
  		  <div>Choose Your Group</div>
        <ul>
          {groupKeys.map((key, index) => (
            <li key={index} onClick={() => {
              updateGroupId.call(this, key);
              this.removeGroupFromPendingInvites();
              router.push('/');
            }}>
              {this.props.groupList[key]}
            </li>
          ))}
        </ul>
        <Link to="/choosevenue">
          Skip
        </Link>
  		</div>
  	);
  }
}

ChooseGroup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect((store) => {
	return {
		groupList: store.user.pendingInvites,
    userId : store.user.uid,
    groupId: store.user.groupId,
    groupName: store.user.groupName
	}
})(ChooseGroup)
