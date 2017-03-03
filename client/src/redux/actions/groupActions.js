import store from '../../redux/store';
import { firebaseOnce } from './firebaseActions';
import { addUserListener } from './locationActions';
import { updateVenue } from './venueActions';

export function updateGroup(group) {
  store.dispatch({
    type: 'UPDATE_GROUP',
    payload: { group }
  });

  for (let key in group.memberKeys) {
    addUserListener(key);
  }

  if (group.venueId) {
    firebaseOnce('/venues/' + group.venueId, updateVenue);
  }
}

export function updateGroupName(name) {
  return store.dispatch({
    type: 'UPDATE_GROUP_NAME',
    payload: { name }
  });
}

export function updateVenueId(id) {
  return store.dispatch({
    type: 'UPDATE_VENUE_ID',
    payload: { id }
  });
}

export function updateGroupKeys(keys) {
  return store.dispatch({
    type: 'UPDATE_KEYS',
    payload: { keys }
  });
}

export function updateGroupMember(user, uid) {
  return store.dispatch({
    type: 'UPDATING_GROUP_MEMBER',
    payload: { user, uid }
  });
}
