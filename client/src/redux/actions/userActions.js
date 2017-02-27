import store from '../../redux/store';

export function sendGroupInvite (group) {
  
}

export function updateUserId(id) {
  return store.dispatch({
    type: 'update_userId',
    payload: { id }
  });
}

export function updateVenueId(id) {
  return store.dispatch({
    type: 'update_venueId',
    payload: { id }
  });
}

export function updateGroupId(id) {
  return store.dispatch({
    type: 'update_groupId',
    payload: { id }
  });
}
