import store from '../../redux/store';
import {
  firebaseOn,
  firebaseOnce,
  firebaseUpdate,
  firebaseRemove
} from './firebaseActions';
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

  firebaseOn('/groups/' + id, updateGroup);
}

export function initialUserData(user) {
  return store.dispatch({
    type: 'INITIAL_USER_DATA',
    userData: user
  });
}

export function updateFacebookUsername(name) {
  return store.dispatch({
    type: 'UPDATE_FB_USERNAME',
    payload: { name } 
  });
}

export function addAgendaItem(key) {
  const uid = store.getState().user.uid;
  const updates = {};

  updates[`users/${ uid }/agenda/${key}`] = true;
  firebaseUpdate(updates);

  //fetch new agenda
  firebaseOnce('users/'+ uid +'/agenda/', (agenda) => {
    agenda = Object.keys(agenda);
    addAgenda(agenda);
  });
}

export function removeAgendaItem(key) {
  const uid = store.getState().user.uid;
  const agendaPath = 'users/' + uid + '/agenda/';

  firebaseRemove(agendaPath + key)
  .then(() => {
   // fetch data after removing agenda
    firebaseOnce(agendaPath, (agenda) => {
      if (agenda) agenda = Object.keys(agenda);
      removeAgenda(agenda);
    });
  });
}
