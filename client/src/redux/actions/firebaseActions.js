import firebase from 'firebase';
import addUserListener from './locationActions';

export function firebaseOnce(url, callback) {
  const db = firebase.database();
  const ref = db.ref().child(url);

  ref.once('value', snapshot => (
    callback(snapshot.val())
  ));
}

export function firebaseSet(url, payload) {
	const db = firebase.database();
  db.ref(url).set(payload);
}

export function firebaseUpdate(url, payload) {
	const db = firebase.database();
	db.ref(url).update(payload);
}

export function firebaseOn(url, callback) {
  const db = firebase.database()
  db.ref(url).on('value', snapshot => (
    callback(snapshot.val())
  ));
}
