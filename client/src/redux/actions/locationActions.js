import firebase from 'firebase';
import store from '../store';

export function updateUsers(users) {
  return {
    type: 'updating_location',
    payload: { users }
  }
}

//Listens to firebase for any changes in your group and returns the entire group
export function groupInfoListener() {
  return firebase.database().ref().child('users')
  .on('value', snapshot => {
    store.dispatch(updateUsers(snapshot.val()));
  });
};

//Grabs the location of the current user and updates firebase
export function geolocate() {
  function success(pos) {
    console.log(pos);
    const user = firebase.auth().currentUser
      firebase.database().ref(`users/${user.uid}/position`).set({
        lat: pos.coords.latitude - 0.0161225,
        lng: pos.coords.longitude - 0.0857576
      });
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 60000
  };

  navigator.geolocation.watchPosition(success, error, options);
}

export function getGeofence(coordinates) {
  const geoFences = store.getState().location.geoFences;
  for (let fence of geoFences) {
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
