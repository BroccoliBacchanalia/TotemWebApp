import firebase from 'firebase';
import { updateGroupMember } from './groupActions';
import { firebaseOn, firebaseSet } from './firebaseActions';
import store from '../store';

//Listens to firebase for any changes in your group and returns the entire group
export function addUserListener(userId) {
  firebaseOn('/users/' + userId, (data) => {
    updateGroupMember(data, userId);
  });
};

//Grabs the location of the current user and updates firebase
export function geolocate() {
  function success(pos) {
    console.log(pos);
    const uid = store.getState().user.uid;
    if (uid === 'X2iuD3KrlHavWFC1GTOgqbObtY92') {
      firebaseSet(`users/${uid}/position`, {
        lat: pos.coords.latitude - (pos.coords.latitude - 33.679914), // Sahara
        lng: pos.coords.longitude - (pos.coords.longitude - (-116.236626)) // Sahara
      });
    } else if (uid === 'NpheOU9bI5TQUDF44VgteQbXuvn2') {
      firebaseSet(`users/${uid}/position`, {
        lat: pos.coords.latitude - (pos.coords.latitude - 33.681017), // Mojave
        lng: pos.coords.longitude - (pos.coords.longitude - (-116.236942)) // Mojave
      });
    } else {
      firebaseSet(`users/${uid}/position`, {
        lat: pos.coords.latitude  - (pos.coords.latitude - 33.684409), // Coachella stage
        lng: pos.coords.longitude - (pos.coords.longitude - (-116.239769)) // Coachella stage
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
  const geofences = store.getState().venue.geofences;

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
