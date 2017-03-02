import store from '../../redux/store';
import firebase from 'firebase';


export function setDefaultChat(key) {
  console.log("INSIDE CHAT ACTIONS", key);
  let defaultGroupName = getGroupName(key)
  console.log("DEFAULT GROUP NAME", defaultGroupName);
  store.dispatch({
    type: 'DEAFULT_CHAT_GROUP',
     payload: { defaultGroupName }
  });
}

function getGroupName(key) {
  //fetch new groupname 
  const uid = store.getState().user.uid;
  const db = firebase.database();

  var groupName = db.ref('groups/'+ key +'/name/');
  groupName.on("value", function(snapshot) {
    return snapshot.val();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}