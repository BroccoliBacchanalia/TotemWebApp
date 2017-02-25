import React from 'react';
import GroupRow from './GroupRow.jsx';
import GroupSort from './GroupSort.jsx';
import store from '../../redux/store.js';
import localStyles from './GroupStyles.css'

const GroupView = ({ dispatch, users, userID }) => (
  <div className="custom-container">
    <div className={localStyles.fixed}>
      <GroupSort dispatch={dispatch}/>
      {Object.keys(users).map((userKey, index) => {
        //Anchor current user info at top of view
        const friend = users[userKey];
        if (userKey === userID) {
          return (
            <GroupRow key={index} friend={friend} />
          );
        }
      })}
    </div>
    <div className={localStyles.friendView}>
      {Object.keys(users).map((userKey, index) => {
        const friend = users[userKey];
        if (userKey !== userID) {
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

export default GroupView;
