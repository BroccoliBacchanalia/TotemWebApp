import firebase from 'firebase';
import { geolocate, groupInfoListener, updateUsers } from './';

const authConfig = {
  facebookPermissions: ['public_profile', 'email']
};


function signInSuccess(uid) {
  return {
    type: 'SIGNIN_SUCCESS',
    uid: uid
  }
}

function signInInProgress() {
  return {
    type: 'SIGNIN'
  }
}

function signInError(errorMessage) {
  return {
    type: 'SIGNIN_ERROR',
    errorMessage: errorMessage
  }
}


export function signIn() {
  return (dispatch) => {
    dispatch(signInInProgress());

    const provider = new firebase.auth.FacebookAuthProvider();

    authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));

    firebase.auth().signInWithPopup(provider)
    // firebase.auth().signInWithRedirect(provider);
    // firebase.auth().getRedirectResult()
      .then((result) => {
        const { user: { uid, displayName, photoURL, email } } = result;

        firebase.database().ref(`users/${ uid }`).set({
          displayName: displayName,
          photoURL: photoURL,
          email: email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
        });

        dispatch(signInSuccess(uid));
      })
      .then(() => geolocate())
      .then(() => groupInfoListener())
      .then((users) => dispatch(updateUsers(users)))
      .catch((error) => {
        dispatch(signInError(error.message))
      });
  }
}
