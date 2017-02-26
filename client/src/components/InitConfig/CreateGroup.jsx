import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { updateGroupName } from '../../redux/actions/groupActions';
import { updateGroupId } from '../../redux/actions/userActions';

const CreateGroup = (props) => (
	<div>
	  <div>Create a Group</div>
    <input
      type="text"
      placeholder="Group Name"
      onChange={(e) => updateGroupName(e.target.value)}
    />
    <button onClick={submit.bind(this, props)}>
      Create
    </button>
	</div>
);

function submit({ user, group, push }) {
	const updates = {};
  const db = firebase.database();
	const groupKey = db.ref().child('/groups/').push().key;
  const groupData = {
    name: group.name,
    members: {},
		venueId: user.venueId
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
