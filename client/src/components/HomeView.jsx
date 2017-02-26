import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import firebase from 'firebase'
import { geolocate, groupInfoListener, updateUsers } from '../redux/Actions';
/*  Components  */
import Group from './Group/Group.jsx';
import ChooseGroup from './InitConfig/ChooseGroup.jsx';
import ChooseVenue from './InitConfig/ChooseVenue.jsx';
import { signIn, signInSuccess } from '../redux/actions/authenticationActions';
import SignInButton from './Auth/SignInButton';

class HomeView extends React.Component {

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        geolocate()
        groupInfoListener()
        store.dispatch(signInSuccess(user.uid));
        // signIn()
      }
    });
  }

  render() {
    const { auth, dispatch, location, user } = this.props;
    const hasPendingInvites = Object.keys(user.pendingInvites).length > 0;
    const hasGroup = user.groupId !== null;
    return (
      !auth.isUserSignedIn ? <SignInButton onSignInClick={signIn} auth={ auth }/> :
      // !user.dataRetrieved ? <div>loading...</div> :
      !hasGroup && hasPendingInvites ? <ChooseGroup /> :
      !hasGroup ? <ChooseVenue /> :
      <div>
        <Group
          dispatch={dispatch}
          users={location.users}
          userID={user.userId}
        />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    user: store.user,
    nav: store.nav,
    location: store.location,
    auth: store.auth,
  };
})(HomeView);
