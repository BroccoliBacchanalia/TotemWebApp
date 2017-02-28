import firebase from 'firebase';
import axios from 'axios';
import store from '../../redux/store';

const authConfig = {
  facebookPermissions: ['public_profile', 'email', 'user_friends']
};

let accessToken;
let databaseGroup =[];

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
  console.log("INSIDE DEFAULT AGENDA");
}

export function updateScheduleData (scheduleData) {
  store.dispatch({
    type: 'update_scheduleData',
     payload: { 
      scheduleData: scheduleData
      }
    })
}

export function afterUpdatingData(allDays, allStages, daysAndDates) {
  console.log("im actions stages: ", allStages);
  store.dispatch({
    type: 'after_updatingData',
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

    for(let key in databaseGroup[0]) {
      databaseGroup[0][key]['firebaseId'] = key
      firebaseArray.push(databaseGroup[0][key])
    }
    firebaseData['data'] = firebaseArray;
    let friendsWithAccounts = {
      data: []
    }
    for (let i = 0; i < firebaseData.data.length-1; i++) {
      for (let x = 0; x < faceBookFriends.data.length-1; x++) {
        if (firebaseData.data[i].label === faceBookFriends.data[x].name) {
          friendsWithAccounts.data.push(firebaseData.data[i]);
        }
      }
    }

    store.dispatch({type: 'UPDATE_FRIENDS', friends: friendsWithAccounts})
  }).catch((error) => {
    console.log('Error getting friends from facebook', error);
  })
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

        firebase.database().ref(`users/${ uid }`).set({
          label: displayName,
          img: photoURL,
          email: email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
          agenda: {null: "null"},
          pendingInvites: '',
        });


      })
      .then(getUsers)
      .catch(error => {
        dispatch(signInError(error.message))
      });

}
