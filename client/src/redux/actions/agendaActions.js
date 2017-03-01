import store from '../store.js';
import firebase from 'firebase';

export function removeAgenda(agenda) {
  store.dispatch({
    type: 'REMOVE_AGENDA',
    payload: { agenda }
  });
}

export function addAgenda(agenda) {
  store.dispatch({
    type: 'ADD_AGENDA',
    payload: { agenda }
  });
}

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
