import firebase from '../firebase';

export function sortUsers(method) {
  return {
    type: 'users_sort',
    payload: { method }
  }
}

export function updateUsers(users) {
  console.log('users updated', users);
  return {
    type: 'updating_location',
    payload: { users }
  }
}

export function getGroupLoc() {
  return firebase.database().ref().child('users')
  .on('value', snapshot => {
    return snapshot.val();
  });
};

export function geolocate() {
  function success(pos) {
    console.log(pos.coords);
    const user = firebase.auth().currentUser
      firebase.database().ref(`users/${user.uid}/coordinates`).set({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
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

export function getGeofence(coordinates, geoFences) {
  for (let fence of geoFences) {
    const degrees = getDegrees(fence.radius);
    const latDiff = Math.abs(fence.latitude - coordinates.latitude);
    const longDiff = Math.abs(fence.longitude - coordinates.longitude);

    if (latDiff < degrees && longDiff < degrees) {
      return fence.name;
    }
  }
  return '';
}

function getDegrees(meters) {
  return meters / 100000;
}
