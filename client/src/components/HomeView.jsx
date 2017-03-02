import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import firebase from 'firebase'
import { geolocate, addUserListener, updateGroupKeys } from '../redux/actions';
/*  Components  */
import MapViewer from './MapViewer/MapViewer';
import ChooseGroup from './InitConfig/ChooseGroup.jsx';
import ChooseVenue from './InitConfig/ChooseVenue.jsx';
import { signIn, signInSuccess, stillSignedIn } from '../redux/actions/authenticationActions';
import { allStages, allDays, updateScheduleData, afterUpdatingData } from '../redux/actions/venueScheduleActions';
import { defaultAgenda } from '../redux/actions/agendaActions';
import SignInButton from './Auth/SignInButton';
import Loading from './Auth/Loading';

class HomeView extends React.Component {

  componentWillMount() {
    const props = this.props;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        geolocate();
        store.dispatch(signInSuccess(user.uid, user.displayName));
        stillSignedIn(user.uid)

        if (props.user.groupId) {
          console.log(props.user.groupId, 'group id in homeview');
          firebase.database().ref('/groups/' + props.user.groupId)
          .on('value', (snapshot) => {
            const userKeys = snapshot.val().members;
            console.log('snapshot from group search', userKeys)
            updateGroupKeys(userKeys);
            for (let userId in userKeys) {
              addUserListener(userId);
            }
          });
        }
      }
    });
    //populate state with schedule data
    var db = firebase.database();
    var scheduleData;
    //var ref = db.ref(`/venues/${ props.group.venueID }/scheduleitems/`);
    var ref = db.ref(`/venues/-KdqnkqC4Sz0L4yh9-Jb/scheduleitems/`);
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
    const hasGroup = user.groupId;
    console.log('!!!!!', hasPendingInvites, !hasGroup)

    return (
      !auth.isUserSignedIn ? <SignInButton onSignInClick={ signIn } auth={ auth }/> :
      !user.dataRetrieved ? <Loading /> :
      hasPendingInvites && !hasGroup ? <ChooseGroup /> :
      !hasGroup ? <ChooseVenue /> : <MapViewer />
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
