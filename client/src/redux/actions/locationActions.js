import firebase from 'firebase';
import { updateGroupMember } from './groupActions';
import { firebaseOn } from './firebaseActions';
import store from '../store';

//Listens to firebase for any changes in your group and returns the entire group
export function addUserListener(userId) {
  firebaseOn('/users/' + userId, (data) => {
    console.log('data from addUserListener', data);
    updateGroupMember(data, userId);
  });
};

//Grabs the location of the current user and updates firebase
export function geolocate() {
  function success(pos) {
    const uid = store.getState().user.uid;
    // const user = firebase.auth().currentUser
    if (uid === 'X2iuD3KrlHavWFC1GTOgqbObtY92') {
      firebase.database().ref(`users/${uid}/position`).set({
        lat: pos.coords.latitude,// - 3.0885707,
        lng: pos.coords.longitude// + 3.7440945
      });
    } else {
      firebase.database().ref(`users/${uid}/position`).set({
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
