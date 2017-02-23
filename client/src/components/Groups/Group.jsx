import React from 'react';
import GroupRow from './GroupRow.jsx';
import GroupSort from './GroupSort.jsx';
import store from '../../store.jsx';

const GroupView = ({ dispatch, users, userID }) => (
  <View style={{ flex: 1 }}>
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
    <ScrollView>
      {Object.keys(users).map((userKey, index) => {
        const friend = users[userKey];
        if (userKey !== userID) {
          return (
            <GroupRow key={index} friend={friend} />
          );
        }
      })}
    </ScrollView>
    <ButtonFull
      onPress={function(){console.log('add a friend')}}
      title='Add a Friend'
    />
  </View>
);

export default GroupView;
