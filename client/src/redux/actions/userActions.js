import store from '../../redux/store';

export function updateUserData(data) {
  return store.dispatch({
    type: 'UPDATE_USER_DATA',
    payload: { data }
  })
}

export function updateUserId(id) {
  return store.dispatch({
    type: 'UPDATE_USER_ID',
    payload: { id }
  });
}

export function updateVenueId(id) {
  return store.dispatch({
    type: 'UPDATE_VENUE_ID',
    payload: { id }
  });
}

export function updateGroupId(id) {
  return store.dispatch({
    type: 'UPDATE_GROUP_ID',
    payload: { id }
  });
}
