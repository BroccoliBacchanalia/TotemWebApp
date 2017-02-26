import React from 'react';
import { connect } from 'react-redux';
import GroupRow from './GroupRow.jsx';
import GroupSort from './GroupSort.jsx';
import store from '../../redux/store.js';
import localStyles from './GroupStyles.css'

const GroupView = ({ user, users }) => {
  return (
    <div className="custom-container">
      <div className={localStyles.fixed}>
        <GroupSort/>
        {Object.keys(users).map((userKey, index) => {
          //Anchor current user info at top of view
          const friend = users[userKey];
          if (userKey === user.uid) {
            return (
              <GroupRow key={index} friend={friend} />
            );
          }
        })}
      </div>
      <div className={localStyles.friendView}>
        {Object.keys(users).map((userKey, index) => {
          const friend = users[userKey];
          if (userKey !== user.uid) {
            return (
              <GroupRow key={index} friend={friend} />
            );
          }
        })}
      </div>
      <div className="footerBtn">
        <button>Add a Friend</button>
      </div>
    </div>
  );
}

export default connect((store) => {
  return {
    user: store.user,
    users: store.group.users
  };
})(GroupView);
