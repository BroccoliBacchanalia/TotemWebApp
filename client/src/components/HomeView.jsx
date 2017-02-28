import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import firebase from 'firebase'
import { geolocate, addUserListener, updateGroupKeys } from '../redux/actions';
/*  Components  */
import Group from './Group/Group.jsx';
import ChooseGroup from './InitConfig/ChooseGroup.jsx';
import ChooseVenue from './InitConfig/ChooseVenue.jsx';
import { signIn, signInSuccess, updateScheduleData, afterUpdatingData, defaultAgenda } from '../redux/actions/authenticationActions';
import { allStages, allDays } from '../redux/actions/venueScheduleActions';
import SignInButton from './Auth/SignInButton';

class HomeView extends React.Component {

  componentWillMount() {
    const props = this.props;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        geolocate();
        store.dispatch(signInSuccess(user.uid, user.displayName));
        firebase.database().ref('/groups/' + props.user.groupId)
        .on('value', (snapshot) => {
          const userKeys = snapshot.val().members;
          updateGroupKeys(userKeys);
          for (let userId in userKeys) {
            addUserListener(userId);
          }
        });
      }
    });
    //populate state with schedule data
    var db = firebase.database();
    var scheduleData;
    var ref = db.ref('/venues/-KdmcqUff2U8vDv-qfC1/scheduleitems/');
    ref.on("value", function(snapshot) {
      scheduleData  =  snapshot.val();
      updateScheduleData(scheduleData);

      var daysAndDates = allDays(scheduleData);
      var all_stages = allStages(scheduleData);
      var all_days = Object.keys(daysAndDates)

      afterUpdatingData(all_days, all_stages, daysAndDates)
      defaultAgenda();
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  }

  render() {
    const { auth, dispatch, group, user, venueSchedule } = this.props;
    const hasPendingInvites = Object.keys(user.pendingInvites).length > 0;
    //const hasGroup = null;
    const hasGroup = user.groupId !== null;

    return (
      !auth.isUserSignedIn ? <SignInButton onSignInClick={signIn} auth={ auth }/> :
      // !user.dataRetrieved ? <div>loading...</div> :
      !hasGroup && hasPendingInvites ? <ChooseGroup /> :
      !hasGroup ? <ChooseVenue /> : <Group/>
    );
  }
}


export default connect((store) => {
  return {
    user: store.user,
    nav: store.nav,
    group: store.group,
    auth: store.auth,
    venueSchedule: store.venueSchedule
  };
})(HomeView);
