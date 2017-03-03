import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateGroupName } from '../../redux/actions/groupActions';
import { updateGroupId } from '../../redux/actions/userActions';
import localStyles from './ConfigStyles.css';
import store from '../../redux/store';
import { firebasePush } from '../../redux/actions/firebaseActions';

const CreateGroup = (props) => (
	<div>
	  <div className={localStyles.header}>
			<h3>Create a Group</h3>
		</div>
		<div className={localStyles.cgBody}>
			<input
				type="text"
				placeholder="Group Name"
				onChange={(e) => updateGroupName(e.target.value)}
			/>
		  <div>
			  <button onClick={submit.bind(this, props)}>
				  Create
			  </button>
		  </div>
		</div>
	</div>
);

function submit({ user, group, push }) {
	if (user.groupName.length < 1) {
		return alert('Please enter a group name');
	}
	const updates = {};
  const db = firebase.database();
	const groupKey = db.ref().child('/groups/').push().key;
  const groupData = {
    groupName: group.groupName,
    members: {},
		venueId: group.venueId
  };
  groupData.members[user.uid] = user.name;
	updates['/groups/' + groupKey] = groupData;

  updateGroupId(groupKey);
	db.ref().update(updates);
  push('/invite');
}

export default connect((store) => {
  return {
    user: store.user,
    group: store.group
  };
})(CreateGroup);
