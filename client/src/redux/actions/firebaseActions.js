import firebase from 'firebase';

export function firebaseGetOnce(url, callback) {
  const db = firebase.database();
  const ref = db.ref().child(url);

  ref.once('value', snap => {
    callback(snap.val());
  });
}

export function firebaseSet(url, payload) {
  const db = firebase.database();
  db.ref(url).set(payload);
}
