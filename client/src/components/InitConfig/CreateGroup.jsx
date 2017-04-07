import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import JoinGroup from './JoinGroup'
import { updateGroupName, updateUserGroupID, firebaseUpdate, firebaseKeyGen, firebaseOnce, firebaseSet } from '../../redux/actions';
import Loading from '../Auth/Loading';
import localStyles from './ConfigStyles.css';

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: false,
      hasLoaded: false
    }
  }

  componentWillMount() {
    firebaseOnce('groups/', (groups) => {
      this.setState({
        groups: groups,
        hasLoaded: true
      })
    })
  }

  render() {
    console.log(this.props);
    const { user, group } = this.props;
    const groupKeys = Object.keys(groupFinder(user));
    let friends = [];

    return (!this.state.hasLoaded || !this.state.groups) ? <Loading /> : (
    	<div>
        <div className={localStyles.coachellaBG}>
          <img src='img/coachellaGroup.jpg' />
        </div>
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

    		  <div className={localStyles.createButton}>
    			  <Button
    					onClick={onCreateGroup.bind(this, user, group)}
    					disabled={group.groupName.length < 1}>
    					<Link to='/group'>
    						Create
    					</Link>
    			  </Button>
    		  </div>
    		</div>
        {groupKeys.map((groupKey, index) => {
          const firebaseGroup = this.state.groups[groupKey];
          return !firebaseGroup ? '' : (
            <Link to='/group' key={index}>
            {console.log(firebaseGroup)}
              <div
                className={localStyles.gCardContainer}
                onClick={() => joinGroup(user, groupKey)}
              >
                <JoinGroup
                  groupName={firebaseGroup.groupName}
                  friendsInGroup={
                    Object.values(firebaseGroup.memberKeys).map((friend, index, collection) => {
                      return index === collection.length ? friend : friend + ', ';
                    })
                  }
                  membersInGroup={Object.keys(firebaseGroup.memberKeys).length}
                />
              </div>
            </Link>
          );
        })}
    	</div>
    );
  }
}

function groupFinder(user) {
  const friendKeys = user.friendList;
  const groupKeys = {};
  for (let key in friendKeys) {
    console.log('friendKey', key)
    console.log('------------------------')


    firebaseOnce(`users/${key}`, (data) => {
      if (data.groupId) groupKeys[data.groupId] = true;
      console.log(key, data)
      console.log('groupKeys found', groupKeys)
    })
  }
  return groupKeys;
}


function onCreateGroup(user, group) {
	const updates = {};
  const groupKey = firebaseKeyGen('/groups/');
  const groupData = {
    groupName: group.groupName,
    memberKeys: {},
		venueId: group.venueId
  };

  groupData.memberKeys[user.uid] = user.name;
	updates['/groups/' + groupKey] = groupData;

  firebaseSet(`/users/${user.uid}/groupId`, groupKey);
	firebaseUpdate(updates).then(() => updateUserGroupID(groupKey));
}

function joinGroup(user, groupKey) {
  const uid = user.uid;

  firebaseSet(`/users/${uid}/groupId`, groupKey);
  firebaseSet(`/groups/${groupKey}/memberKeys/${uid}/`, user.name)
    .then(() => updateUserGroupID(groupKey));
}

export default connect((store) => {
  return {
    user: store.user,
    group: store.group
  };
})(CreateGroup);
