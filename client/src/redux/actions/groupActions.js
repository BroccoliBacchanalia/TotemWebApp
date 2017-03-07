import store from '../../redux/store';
import { firebaseOnce, firebaseSet } from './firebaseActions';
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
  } else {
    /* Add code to render map on user's current location */

    store.dispatch({ type: 'DATA_RETRIEVED_FROM_FIREBASE' });
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

export function showGroupMemberInfo(uid) {
  return store.dispatch({
    type: 'SHOW_NAME',
    payload: uid
  });
}

export function updateTotemCoords(coords, groupId) {
  store.dispatch({
    type: 'UPDATE_TOTEM_COORDS',
    payload: { coords }
  });

  firebaseSet(`/groups/${groupId}/totemCoords`, coords);
}
