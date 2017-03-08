import React from 'react';
import { connect } from 'react-redux';
import GroupRow from './GroupRow.jsx';
import GroupSort from './GroupSort.jsx';
import store from '../../redux/store.js';
import localStyles from './GroupStyles.css';
import styles from '../Styles.css'
import { Item, Button, Grid } from 'semantic-ui-react'

const GroupView = ({ user, users }) => (
  <div>
    <div className={localStyles.sortToolbar} >
      <GroupSort />
    </div>
    <div style={{ height: window.innerHeight - 197 }} className={styles.scrollView}>
      <Grid
        celled
        className={localStyles.grid}
      >
        {Object.keys(users).map((userKey, index) => {
          //Anchor current user info at top of view
          const friend = users[userKey];
          if (userKey === user.uid) {
            return (
              <GroupRow key={index} friend={friend} uid={userKey} />
            );
          }
        })}
        {Object.keys(users).map((userKey, index) => {
          const friend = users[userKey];
          if (friend && userKey !== user.uid) {
            return (
              <GroupRow key={index} friend={friend} uid={userKey} />
            );
          }
        })}
      </Grid>
    </div>
    <div className="footerContainer">
      <div className="footerBtn" >
        <Button className={localStyles.gButton}>Add a Friend</Button>
      </div>
    </div>
  </div>
);

export default connect((store) => {
  return {
    user: store.user,
    users: store.group.members
  };
})(GroupView);
