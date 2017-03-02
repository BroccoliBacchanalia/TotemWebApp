import store from '../../redux/store';
import { firebaseGetOnce } from './firebaseActions';
import { updateGroup } from './groupActions';

export function updateUserData(data) {
  return store.dispatch({
    type: 'UPDATE_USER_DATA',
    payload: { data }
  })
}

export function updateVenueId(id) {
  return store.dispatch({
    type: 'UPDATE_VENUE_ID',
    payload: { id }
  });
}

export function updateGroupId(id) {
  store.dispatch({
    type: 'UPDATE_GROUP_ID',
    payload: { id }
  });

  firebaseGetOnce('/groups/' + id, updateGroup);
}

export function userResign(user) {
  return store.dispatch({
    type: 'DATA_ON_RESIGN',
    userData: user
  });
}
