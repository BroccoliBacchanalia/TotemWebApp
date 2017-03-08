import firebase from 'firebase';

export function firebaseOn(url, callback) {
  const db = firebase.database()
  return db.ref(url).on('value', snapshot => (
    callback(snapshot.val())
  ));
}

export function firebaseOnce(url, callback) {
  const db = firebase.database();
  const ref = db.ref().child(url);

  return ref.once('value', snapshot => (
    callback(snapshot.val())
  ));
}

export function firebaseSet(url, payload) {
  return firebase.database().ref(url).set(payload);
}

export function firebaseRemove(url) {
  return firebase.database().ref(url).remove();
}

export function firebaseUpdate(updates) {
  return firebase.database().ref().update(updates);
}

export function firebaseKeyGen(path) {
  return firebase.database().ref().child(path).push().key;
}
