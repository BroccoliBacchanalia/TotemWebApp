import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { updateGroupName } from '../../redux/actions/groupActions';
import { updateUserGroupID } from '../../redux/actions/userActions';
import { firebaseUpdate, firebaseKeyGen } from '../../redux/actions/firebaseActions';
import localStyles from './ConfigStyles.css';

const CreateGroup = ({ user, group }) => (
	<div>
	  <div className={localStyles.header}>
			<h3>Create a Group</h3>
		</div>
		<div className={localStyles.cgBody}>
			<div className="ui input focus">
				<input
					type="text"
					placeholder="Group Name"
					onChange={(e) => updateGroupName(e.target.value)}
				/>
			</div>
		  <div>
			  <Button
					onClick={submit.bind(this, user, group)}
					disabled={user.groupName.length < 1}
				>
					<Link to='/invite'>
						Create
					</Link>
			  </Button>
		  </div>
		</div>
	</div>
);

function submit(user, group) {
	const updates = {};
	const groupKey = firebaseKeyGen('/groups/');
  const groupData = {
    groupName: group.groupName,
    memberKeys: {},
		venueId: group.venueId
  };

  groupData.memberKeys[user.uid] = user.name;
	updates['/groups/' + groupKey] = groupData;

  updateUserGroupID(groupKey);
	firebaseUpdate(updates);
}

export default connect((store) => {
  return {
    user: store.user,
    group: store.group
  };
})(CreateGroup);
