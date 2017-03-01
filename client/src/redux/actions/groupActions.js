import store from '../../redux/store';

export function updateGroupName(name) {
  return store.dispatch({
    type: 'UPDATE_GROUP_NAME',
    payload: { name }
  });
}

export function updateGroupKeys(keys) {
  return store.dispatch({
    type: 'UPDATE_KEYS',
    payload: { keys }
  }); 
}
