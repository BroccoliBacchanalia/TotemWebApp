import store from '../../redux/store';

export function updateGroup(group) {
  return store.dispatch({
    type: 'UPDATE_GROUP',
    payload: { group }
  });
}

export function updateGroupKeys(keys) {
  return store.dispatch({
    type: 'UPDATE_KEYS',
    payload: { keys }
  });
}
