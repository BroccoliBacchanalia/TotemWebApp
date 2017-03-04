import store from '../../redux/store';
import { firebaseOnce } from './firebaseActions';
import { updateGroup } from './groupActions';


export function addAgenda(agenda) {
  store.dispatch({
    type: 'ADD_AGENDA',
    payload: { agenda }
  });
}

export function removeAgenda(agenda) {
  store.dispatch({
    type: 'REMOVE_AGENDA',
    payload: { agenda }
  });
}

export function defaultAgenda() {
  const uid = store.getState().user.uid;
  const db = firebase.database();

  var updateRef = db.ref('users/'+ uid +'/agenda/');
  updateRef.on("value", function(snapshot) {

    let agenda  =  snapshot.val();
    agenda = Object.keys(agenda);
    agenda = agenda.slice(0,agenda.length-1);
    store.dispatch({type: 'DEFAULT_AGENDA', payload: { agenda } });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

export function updateUserData(data) {
  return store.dispatch({
    type: 'UPDATE_USER_DATA',
    payload: { data }
  })
}

export function updateUserGroupID(id) {
  store.dispatch({
    type: 'UPDATE_USER_GROUP_ID',
    payload: { id }
  });

  firebaseOnce('/groups/' + id, updateGroup);
}

export function initialUserData(user) {
  return store.dispatch({
    type: 'INITIAL_USER_DATA',
    userData: user
  });
}
