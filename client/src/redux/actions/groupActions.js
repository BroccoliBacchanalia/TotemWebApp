import store from '../../redux/store';

export function updateGroupName(name) {
  return store.dispatch({
    type: 'update_group_name',
    payload: { name }
  });
}

export function updateGroupKeys(keys) {
  return store.dispatch({
    type: 'update_keys',
    payload: { keys }
  }); 
}
