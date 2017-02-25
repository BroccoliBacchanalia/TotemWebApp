import firebase from 'firebase';
import { geolocate, groupInfoListener, updateUsers } from './';
import axios from 'axios';
import store from '../../redux/store';

const authConfig = {
  facebookPermissions: ['public_profile', 'email', 'user_friends']
};

let accessToken;

function signInSuccess(uid, token) {
  return {
    type: 'SIGNIN_SUCCESS',
    uid: uid,
    token: token
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

function getFriends() {
  var endpoint = "https://graph.facebook.com/me/taggable_friends?access_token=" + accessToken;

  axios.get(endpoint).then((data) =>{
    store.dispatch({type: 'UPDATE_FRIENDS', friends: data.data})
  }).catch((error) => {
    console.log('Error getting friends from facebook');
  })
}


export function signIn() {
  const dispatch = store.dispatch;
  const provider = new firebase.auth.FacebookAuthProvider();
  dispatch(signInInProgress());

  authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));

    firebase.auth().signInWithPopup(provider)
    // firebase.auth().signInWithRedirect(provider);
    // firebase.auth().getRedirectResult()
      .then((result) => {
        accessToken =result.credential.accessToken;
        const { user: { uid, displayName, photoURL, email } } = result;


        firebase.database().ref(`users/${ uid }`).set({
          label: displayName,
          img: photoURL,
          email: email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
          agenda: {null: "null"}
        });
        
        // let ref = firebase.database().ref('query-data');
        // let usersRef = ref.child('users')
        // let databaseGroup;
        // usersRef.on('value', snap => {
        //   console.log('user!!', snap.val())
        // })
        // groupsRef.on('value', function(snapshot) {
        //   snapshot.forEach(function(childSnapshot) {
        //     console.log('child', childSnapshot)
        //     databaseGroup = childSnapshot.val();
        //   })
        // })
       // console.log('DATATATATATATATATA', databaseGroup)

        dispatch(signInSuccess(uid, accessToken));
      })
      .then(getFriends)
      .then(geolocate)
      .then(groupInfoListener)
      // .then(users => {
      //   console.log('check',users)
      //   dispatch(updateUsers(users)
      // })
      
      .catch(error => {
        dispatch(signInError(error.message))
      });

}
