import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { updateGroupName, updateUserGroupID, firebaseUpdate, firebaseKeyGen, firebaseOnce, firebaseSet } from '../../redux/actions';
import Loading from '../Auth/Loading';
import localStyles from './ConfigStyles.css';

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      group: {},
      loading: true
    }
  }

  componentWillMount() {
    firebaseOnce('groups/', (groups) => {
      this.setState({
        group: groups,
        loading: false
      })
    })
  }

  render() {
    const { user, group } = this.props;
    const groupKeys = Object.keys(groupFinder(user));

    return this.state.loading ? <Loading /> : (
    	<div>
    	  <div className={localStyles.header}>
    			<h3>Join or Create a Group</h3>
    		</div>
    		<div className={localStyles.cgBody}>
    			<div className="ui input focus">
    				<input
    					type="text"
    					placeholder="Group Name"
    					onChange={(e) => {
                updateGroupName(e.target.value)
              }}
    				/>
    			</div>
    		  <div>
    			  <Button
    					onClick={submit.bind(this, user, group)}
    					disabled={group.groupName.length < 1}
    				>
    					<Link to='/group'>
    						Create
    					</Link>
    			  </Button>
    		  </div>
    		</div>
        {groupKeys.map((groupKey, index) => {
          return (
            <Link to='/group' key={index}>
              <div onClick={() => { joinGroup(user, groupKey) }}>{this.state.group[groupKey].groupName}</div>
            </Link>
          );
        })}
    	</div>
    );
  }
}


function groupFinder(user) {
  const friendsArray = user.friendList.data;
  const groupKeys = {};
  for (let i = 0; i < friendsArray.length - 1; i++) {
    if (friendsArray[i].groupId) {
      groupKeys[friendsArray[i].groupId] = true;
    }
  }
  return groupKeys;
}


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

function joinGroup(user, groupKey) {
  const uid = user.uid;
  firebaseSet(`/users/${uid}/groupId`, groupKey);
  firebaseSet(`/groups/${groupKey}/memberKeys/${uid}/`, user.name)
    .then(updateUserGroupID(groupKey))
}

export default connect((store) => {
  return {
    user: store.user,
    group: store.group
  };
})(CreateGroup);
