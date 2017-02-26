import firebase from 'firebase';
import { geolocate, groupInfoListener, updateUsers } from './';
import axios from 'axios';
import store from '../../redux/store';

const authConfig = {
  facebookPermissions: ['public_profile', 'email', 'user_friends']
};

let accessToken;
let databaseGroup =[];


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
  let ref = firebase.database().ref();
  let usersRef = ref.child('/users')
    usersRef.once('value', snap => {
      databaseGroup.push(snap.val())
    }).then(getFriends)
}

function getFriends() {
  var endpoint = "https://graph.facebook.com/me/taggable_friends?access_token=" + accessToken;

  axios.get(endpoint).then((data) =>{
    let faceBookFriends = data.data;
    let firebaseArray = [];
    let firebaseData = {};
    for(let key in databaseGroup[0]) {
      firebaseArray.push(databaseGroup[0][key])
    }
    firebaseData['data'] = firebaseArray;
    let friendsWithAccounts = {
      data: []
    }
    console.log('FIRE', firebaseData)
    for (let i = 0; i < firebaseData.data.length-1; i++) {
      for (let x = 0; x < faceBookFriends.data.length-1; x++) {
        if (firebaseData.data[i].label === faceBookFriends.data[x].name) {
          friendsWithAccounts.data.push(faceBookFriends.data[x]);
        }
      }
    }
    console.log(friendsWithAccounts)

    store.dispatch({type: 'UPDATE_FRIENDS', friends: friendsWithAccounts})
  }).catch((error) => {
    console.log('Error getting friends from facebook');
  })
}

export function signIn() {
  const dispatch = store.dispatch;
  const provider = new firebase.auth.FacebookAuthProvider();
  dispatch(signInInProgress());

  // authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));
  provider.addScope('public_profile');
  provider.addScope('email');
  provider.addScope('user_friends');

    firebase.auth().signInWithPopup(provider)
    // firebase.auth().signInWithRedirect(provider)
    // firebase.auth().getRedirectResult()
      .then((result) => {
        accessToken = result.credential.accessToken;
        const { user: { uid, displayName, photoURL, email } } = result;

        firebase.database().ref(`users/${ uid }`).set({
          label: displayName,
          img: photoURL,
          email: email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
          agenda: {null: "null"}
        });
  
        dispatch(signInSuccess(uid, accessToken));
      })
      .then(getUsers)
      //.then(geolocate)
      //.then(groupInfoListener)
      // .then(users => {
      //   console.log('check',users)
      //   dispatch(updateUsers(users)
      // })

      .catch(error => {
        dispatch(signInError(error.message))
      });

}
