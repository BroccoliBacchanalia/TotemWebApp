import React from 'react';
// import GroupRow from './GroupRow.jsx';
import GroupSort from './GroupSort.jsx';
import store from '../../redux/store.js';

const GroupView = ({ dispatch, users, userID }) => (
  <div>
    <GroupSort dispatch={dispatch}/>
    {/* {Object.keys(users).map((userKey, index) => {
      //Anchor current user info at top of view
      const friend = users[userKey];
      if (userKey === userID) {
        return (
          <GroupRow key={index} friend={friend} />
        );
      }
    })}
    {Object.keys(users).map((userKey, index) => {
      const friend = users[userKey];
      if (userKey !== userID) {
        return (
          <GroupRow key={index} friend={friend} />
        );
      }
    })} */}
    <div>
      <div>
        <p>Add a Friend</p>
      </div>
    </div>
  </div>
);

export default GroupView;
