import store from '../../redux/store';

export function updateGroup(name) {
  return store.dispatch({
    type: 'UPDATE_GROUP',
    payload: { name }
  });
}

export function updateGroupKeys(keys) {
  return store.dispatch({
    type: 'UPDATE_KEYS',
    payload: { keys }
  });
}
