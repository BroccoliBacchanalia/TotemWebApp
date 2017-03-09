import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store.js';
import firebase from 'firebase';

/*  Components  */
import MapViewer from './MapViewer/MapViewer';
import ChooseVenue from './InitConfig/ChooseVenue.jsx';
import SignInButton from './Auth/SignInButton';
import Loading from './Auth/Loading';

/* Actions */
import { signIn, signInSuccess, getUserData } from '../redux/actions/authenticationActions';
import { geolocate } from '../redux/actions';

export class HomeView extends React.Component {

  componentWillMount() {
    const props = this.props;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        geolocate();
        signInSuccess(user.uid, user.displayName);
        getUserData(user.uid);
      }
    });
  }

  render() {
  
    const { auth, user } = this.props;
    const hasPendingInvites = Object.keys(user.pendingInvites).length > 0;
    const hasGroup = !!user.groupId;

    return (
      !auth.isUserSignedIn ? <SignInButton onSignInClick={signIn} /> :
      !user.dataRetrieved ? <Loading /> :
      !hasGroup ? <ChooseVenue /> : <MapViewer />
    );
  }
}

export default connect((store) => {
  return {
    user: store.user,
    auth: store.auth
  };
})(HomeView);
