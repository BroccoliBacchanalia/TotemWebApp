import firebase from 'firebase';
import axios from 'axios';
import store from '../../redux/store';
import { updateGroupId, userResign } from './userActions';
import { firebaseGetOnce, firebaseSet } from './firebaseActions';
import { updateGroup } from './groupActions';
const dispatch = store.dispatch;

let accessToken;
let databaseGroup =[];
let currentUserId;
const authConfig = {
  facebookPermissions: ['public_profile', 'email', 'user_friends']
};

export function signInSuccess(uid, displayName) {
  return {
    type: 'SIGNIN_SUCCESS',
    payload: {
      uid: uid,
      name: displayName
    }
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

function getUsers() {
  firebaseGetOnce('/users', (data) => {
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

export function stillSignedIn(uid) {
  firebaseGetOnce(`users/${ uid }`, (data) => {
    console.log(data, 'data in stillsigned in')
    userResign(data);
    updateGroupId(data.groupId);
    firebaseGetOnce('/groups/' + data.groupId, updateGroup);
    dispatch({ type: 'DATA_RETRIEVED' });
  });
}

function updateUserData() {
  firebaseGetOnce(`users/${currentUserId}`, (data) => {
    dispatch({
      type: 'UPDATE_USER_DATA',
      pendingInvites: data.pendingInvites
    });
    dispatch({ type: 'DATA_RECEIVED' });
  });
}

export function signIn() {
  const provider = new firebase.auth.FacebookAuthProvider();
  dispatch(signInInProgress());

  authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    console.log(result, 'result in signin permissions section')
    accessToken = result.credential.accessToken;
    const { user: { uid, displayName, photoURL, email } } = result;
    currentUserId = uid;

    firebase.database().ref(`users/${ uid }`).update({
      label: displayName,
      img: photoURL,
      email: email,
      lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
      agenda: { null: "null" },
      venueId: '',
      groupId: '',
    });

  })
  .then(getUsers)
  .then(updateUserData)
  .catch(error => {
    dispatch(signInError(error.message))
  });
}
