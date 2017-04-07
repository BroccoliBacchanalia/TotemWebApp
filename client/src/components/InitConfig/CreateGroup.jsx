import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import JoinGroup from './JoinGroup'
import { updateGroupName, updateUserGroupID, firebaseUpdate, firebaseKeyGen, firebaseOnce, firebaseSet } from '../../redux/actions';
import Loading from '../Auth/Loading';
import localStyles from './ConfigStyles.css';

const groupKeys = {};
class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groups: false,
      hasLoaded: false
    }
  }

  componentWillMount() {
    const { user } = this.props;
    const friendKeys = Object.keys(user.friendList);
    firebaseOnce('groups/', (groups) => {
      for (let i = 0; i < friendKeys.length; i++) {
        firebaseOnce(`users/${friendKeys[i]}`, (data) => {
          if (data.groupId) groupKeys[data.groupId] = true;
          if (i === friendKeys.length - 1) {
            this.setState({
              groups: groups,
              hasLoaded: true
            })
          }
        })
      }  
    })
  }

  render() {
    const { user, group } = this.props;

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
        {Object.keys(groupKeys).map((groupKey, index) => {
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
                      return index === collection.length - 1 ? friend : friend + ', ';
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
