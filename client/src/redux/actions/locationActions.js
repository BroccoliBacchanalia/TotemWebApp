import firebase from 'firebase';
import store from '../store';

export function updateUser(user, uid) {
  return store.dispatch({
    type: 'updating_user_loc',
    payload: { user, uid }
  });
}

//Listens to firebase for any changes in your group and returns the entire group
export function addUserListener(userId) {
  return firebase.database().ref().child('/users/' + userId)
  .on('value', snapshot => {
    updateUser(snapshot.val(), userId);
  });
};

//Grabs the location of the current user and updates firebase
export function geolocate() {
  function success(pos) {
    console.log(pos);
    const user = firebase.auth().currentUser
    if (user.uid === 'guLTmuSUVjYZWEXm9rtF2cAvePa2') {
      firebase.database().ref(`users/${user.uid}/position`).set({
        lat: pos.coords.latitude - 0.0161225 + .0022278,
        lng: pos.coords.longitude - 0.0857576 + .010937
      });
    } else {
      firebase.database().ref(`users/${user.uid}/position`).set({
        lat: pos.coords.latitude - 0.0161225,
        lng: pos.coords.longitude - 0.0857576
      });

    }
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  navigator.geolocation.watchPosition(success, error, options);
}

export function getGeofence(coordinates) {
  const geofences = store.getState().venues.geofences;

  for (let key in geofences) {
    const fence = geofences[key];
    const degrees = getDegrees(fence.radius);
    const latDiff = Math.abs(fence.latitude - coordinates.lat);
    const longDiff = Math.abs(fence.longitude - coordinates.lng);

    if (latDiff < degrees && longDiff < degrees) {
      return fence.name;
    }
  }
  return '';
}

function getDegrees(meters) {
  return meters / 100000;
}
