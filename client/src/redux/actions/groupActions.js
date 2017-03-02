import store from '../../redux/store';
import { addUserListener } from './locationActions';

export function updateGroup(group) {
  store.dispatch({
    type: 'UPDATE_GROUP',
    payload: { group }
  });

  for (let userId in group.members) {
    addUserListener(userId);
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
