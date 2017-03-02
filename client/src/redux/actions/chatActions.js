import store from '../../redux/store';
import firebase from 'firebase';

export function setDefaultChat(key) {
   //fetch new groupname 
  const uid = store.getState().user.uid;
  const db = firebase.database();

  var groupName = db.ref('groups/'+ key +'/name/');
  groupName.on("value", function(snapshot) {
    let defaultGroupName = snapshot.val();
    //dispatch after fetching the group name
    let defaultGroupKey = key;
      store.dispatch({
      type: 'DEAFULT_CHAT_GROUP',
       payload: { defaultGroupName, defaultGroupKey }
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}
