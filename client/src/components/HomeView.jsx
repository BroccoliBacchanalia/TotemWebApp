import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import firebase from 'firebase'
import { geolocate, addUserListener, updateGroupKeys } from '../redux/actions';
/*  Components  */
import Group from './Group/Group.jsx';
import ChooseGroup from './InitConfig/ChooseGroup.jsx';
import ChooseVenue from './InitConfig/ChooseVenue.jsx';
import { signIn, signInSuccess } from '../redux/actions/authenticationActions';
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
  }

  render() {
    const { auth, dispatch, group, user } = this.props;
    const hasPendingInvites = Object.keys(user.pendingInvites).length > 0;
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
  };
})(HomeView);
