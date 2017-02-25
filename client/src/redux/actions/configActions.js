import store from '../store.js';
export function updateText(text) {
  return {
    type: 'update_text',
    payload: { text }
  }
}

export function selectGroup(group) {
	store.dispatch({type: 'choose_group', payload: { group }})
}

export function skipLogin(){
	store.dispatch({type: 'skip_login'})
}
