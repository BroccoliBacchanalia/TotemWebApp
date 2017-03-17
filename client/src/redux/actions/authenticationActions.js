import firebase from 'firebase';
import axios from 'axios';
import store from '../../redux/store';

/*  Actions */
import { updateUserGroupID, initialUserData, updateFacebookUserID } from './userActions';
import { firebaseOnce, firebaseSet } from './firebaseActions';
import { updateVenueNames } from './venueActions';

const dispatch = store.dispatch;
let accessToken;
let databaseGroup = {};
let currentUserId;
const authConfig = {
  facebookPermissions: ['public_profile', 'email', 'user_friends']
};

export function signInSuccess(uid, displayName) {
  return dispatch({
    type: 'SIGNIN_SUCCESS',
    payload: {
      uid: uid,
      name: displayName
    }
  });
}

function signInInProgress() {
  return dispatch({
    type: 'SIGNIN'
  });
}

function signInError(errorMessage) {
  return dispatch({
    type: 'SIGNIN_ERROR',
    errorMessage: errorMessage
  });
}

function getUsers() {
  return firebaseOnce('/users', (fireUsers) => {
    getFriends(fireUsers);
  });
}

export function getFriends(fireUsers) {
  const endpoint = "https://graph.facebook.com/me/friends?access_token=" + accessToken;
  axios.get(endpoint).then((facebookData) =>{
    const facebookFriends = facebookData.data.data;
    const firebaseDataWithFacebookUidKeys = {};
    let friendsWithAccounts = { data: [] }

    for (let key in fireUsers) {
      firebaseDataWithFacebookUidKeys[fireUsers[key].facebookUID] = key;
    }

    for (let i = 0; i < facebookFriends.length; i++) {
      let friendKey = firebaseDataWithFacebookUidKeys[facebookFriends[i].id];
      delete fireUsers[friendKey].friends;
      friendsWithAccounts.data.push(fireUsers[friendKey]);
    }
    //saves user friends in the database
    firebaseSet(`users/${currentUserId}/friends`, friendsWithAccounts);
  }).catch((error) => {
    console.log('Error getting friends from facebook', error);
  });
}

export function getUserData(id) {
  firebaseOnce(`users/${id}`, (data) => {
    const hasGroup = !!data.groupId;
    initialUserData(data);
    if (hasGroup) {
      updateUserGroupID(data.groupId);
    }
    dispatch({ type: 'UPDATE_FB_USERNAME', payload: { name: data.facebookUsername }});
    getVenueNames(hasGroup);
  });
}

function getVenueNames(hasGroup) {
  firebaseOnce('venues/names', (venues) => {
    updateVenueNames(venues);
    if (!hasGroup) {
      dispatch({ type: 'DATA_RETRIEVED_FROM_FIREBASE' });
    }
  });
}

export function signIn() {
  const provider = new firebase.auth.FacebookAuthProvider();
  signInInProgress();

  authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));

  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    accessToken = result.credential.accessToken;
    const { user: { uid, displayName, photoURL, email } } = result;
    currentUserId = uid;

    firebaseSet(`users/${uid}/label`, displayName);
    firebaseSet(`users/${uid}/facebookUID`, result.user.providerData[0].uid);
    firebaseSet(`users/${uid}/img`, photoURL);
    firebaseSet(`users/${uid}/email`, email);
    firebaseSet(`users/${uid}/lastTimeLoggedIn`, firebase.database.ServerValue.TIMESTAMP);
  })
  .then(getUsers)
  .catch(error => signInError(error.message));
}
