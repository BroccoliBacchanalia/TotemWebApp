import store from '../../redux/store';
import { firebaseOnce } from './firebaseActions';
import { updateGroup } from './groupActions';

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

export function userResign(user) {
  return store.dispatch({
    type: 'DATA_ON_RESIGN',
    userData: user
  });
}
