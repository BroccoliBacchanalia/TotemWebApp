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
    // Add code to render map on user's current location

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

export function closeInfoWindows() {
  return store.dispatch({
    type: 'CLOSE_INFO_WINDOWS'
  });
}

export function showGroupMemberInfo(uid) {
  return store.dispatch({
    type: 'SHOW_NAME',
    payload: uid
  });
}

export function toggleTotemInfo() {
  return store.dispatch({
    type: 'TOGGLE_TOTEM_INFO'
  });
}

export function placeTotemOnClick(bool) {
  return store.dispatch({
    type: 'PLACE_TOTEM',
    payload: bool
  });
}

export function updateMeetupTime(time) {
  return store.dispatch({
    type: 'UPDATE_MEETUP_TIME',
    payload: { time }
  });
}

export function updateTotem(coords, groupId) {
  store.dispatch({
    type: 'UPDATE_TOTEM_COORDS',
    payload: { coords }
  });
  const totem = store.getState().group.totem;
  firebaseSet(`/groups/${groupId}/totem`, totem);
}
