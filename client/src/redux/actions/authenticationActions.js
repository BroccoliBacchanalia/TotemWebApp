import firebase from 'firebase';
import axios from 'axios';
import store from '../../redux/store';

let accessToken;
let databaseGroup =[];
let currentUserId;
const authConfig = {
  facebookPermissions: ['public_profile', 'email', 'user_friends']
};

export function defaultAgenda() {
  let uid = firebase.auth().currentUser.uid;
  var db = firebase.database();
  
  var updateRef = db.ref('users/'+ uid +'/agenda/');
  updateRef.on("value", function(snapshot) {
   
    let agenda  =  snapshot.val();
    agenda = Object.keys(agenda);
    agenda = agenda.slice(0,agenda.length-1);
    console.log("DEFAULT AGENDA: ", agenda);  
    store.dispatch({type: 'default_agenda', payload: { agenda } });  
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

export function updateScheduleData (scheduleData) {
  store.dispatch({
    type: 'UPDATE_SCHEDULE_DATA',
     payload: { 
      scheduleData: scheduleData
      }
    })
}

export function afterUpdatingData(allDays, allStages, daysAndDates) {
  console.log("im actions stages: ", allStages);
  store.dispatch({
    type: 'AFTER_UPDATING_DATA',
     payload: { 
      allStages: allStages,
      allDays: allDays,
      daysAndDates: daysAndDates
      }
    })
}

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
    let temp = {};
    let db = firebase.database();

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
    db.ref(`users/${ currentUserId }/friends`).set(friendsWithAccounts)
    store.dispatch({type: 'UPDATE_FRIENDS', friends: friendsWithAccounts})
  }).catch((error) => {
    console.log('Error getting friends from facebook', error);
  })
}

export function stillSignedIn(uid) {
  let firebaseData;
  let db = firebase.database();
  let ref = db.ref();
  let userRef = ref.child(`users/${ uid }`)
  userRef.once('value', snap => {
    return firebaseData = snap.val()
  }).then(data => {
      store.dispatch({type: 'DATA_ON_RESIGN', userData: data.val()})
    }
  ).then(() =>{
      store.dispatch({type: 'DATA_RETRIEVED'})
    }
  )
}

function updateUserData(){
  let userDataFromFirebase;
  let db = firebase.database();
  let ref = db.ref();
  let usersRef = ref.child(`users/${ currentUserId }`)
  usersRef.once('value', snap =>{
    userDataFromFirebase = snap.val()
  }).then(
      store.dispatch({type: 'UPDATE_USER_DATA', pendingInvites: userDataFromFirebase.pendingInvites})
  ).then(
      store.dispatch({type: 'DATA_RECEIVED'})
  )

}

export function signIn() {
  const dispatch = store.dispatch;
  const provider = new firebase.auth.FacebookAuthProvider();
  dispatch(signInInProgress());

  authConfig.facebookPermissions.forEach(permission => provider.addScope(permission));

    firebase.auth().signInWithPopup(provider)
    // firebase.auth().signInWithRedirect(provider)
    // firebase.auth().getRedirectResult()
      .then((result) => {
        accessToken = result.credential.accessToken;
        const { user: { uid, displayName, photoURL, email } } = result;
        currentUserId = uid;

        firebase.database().ref(`users/${ uid }`).update({
          label: displayName,
          img: photoURL,
          email: email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
          agenda: {null: "null"},
          venueId: "null",
          groupId: "null",
          pendingInvites: "null",
        });

      })
      .then(getUsers)
      .then(updateUserData)
      .catch(error => {
        dispatch(signInError(error.message))
      });

}
