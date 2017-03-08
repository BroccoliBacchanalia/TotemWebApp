import firebase from 'firebase';
import axios from 'axios';
import store from '../../redux/store';

/*  Actions */
import { updateUserGroupID, initialUserData } from './userActions';
import { firebaseOnce, firebaseSet } from './firebaseActions';
import { updateGroup } from './groupActions';
import { updateVenueNames } from './venueActions';

const dispatch = store.dispatch;
let accessToken;
let databaseGroup =[];
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
  return firebaseOnce('/users', (data) => {
    databaseGroup.push(data);
    getFriends();
  });
}

function getFriends() {
  var endpoint = "https://graph.facebook.com/me/taggable_friends?access_token=" + accessToken;

  axios.get(endpoint).then((data) =>{
    let faceBookFriends = data.data;
    let firebaseArray = [];
    let firebaseData = {};
    let temp = {};
    let friendObject = {};

    for(let key in databaseGroup[0]) {
      databaseGroup[0][key]['firebaseId'] = key
      firebaseArray.push(databaseGroup[0][key])
    }
    firebaseData['data'] = firebaseArray;
    let friendsWithAccounts = {
      data: []
    }
    //fills out friendsWithAccounts to have facebook friends that are also totem users
    for (let i = 0; i < firebaseData.data.length-1; i++) {
      for (let x = 0; x < faceBookFriends.data.length-1; x++) {
        if (firebaseData.data[i].label === faceBookFriends.data[x].name) {
          //filters out their friend list so not to create an infinite loop
          delete firebaseData.data[i].friends;
          friendsWithAccounts.data.push(firebaseData.data[i]);
        }
      }
    }
    //saves user friends in the database
    firebaseSet(`users/${currentUserId}/friends`, friendsWithAccounts);
    dispatch({ type: 'UPDATE_FRIENDS', friends: friendsWithAccounts });
  }).catch((error) => {
    console.log('Error getting friends from facebook', error);
  });
}

export function getUserData(id) {
  firebaseOnce(`users/${id}`, (data) => {
    initialUserData(data);
    if (!!data.groupId) {
      updateUserGroupID(data.groupId);
    }
    getVenueNames(!data.groupId);
  });
}

function getVenueNames(finished) {
  firebaseOnce('venues/names', (venues) => {
    updateVenueNames(venues);
    if (finished) {
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
    firebaseSet(`users/${uid}/img`, photoURL);
    firebaseSet(`users/${uid}/email`, email);
    firebaseSet(`users/${uid}/lastTimeLoggedIn`, firebase.database.ServerValue.TIMESTAMP);
  })
  .then(getUsers)
  .catch(error => signInError(error.message));
}
