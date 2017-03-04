import store from '../store.js';
import firebase from 'firebase';

export function toggleAddRemove() {
  store.dispatch({
    type: "TOGGLE"
  });
}

