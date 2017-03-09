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
    // HR: 37.783780, -122.409033

    if (uid === 'KrSypCuwkBdEiH2JAJgOGxZN8m52') {
      firebaseSet(`users/${uid}/position`, {
        timestamp: pos.timestamp,
        lat: pos.coords.latitude - (pos.coords.latitude - 33.679914), // Sahara
        lng: pos.coords.longitude - (pos.coords.longitude - (-116.236626)) // Sahara
      });
    } else if (uid === 'rjjbJvO2utOdizeLz6wsjlJSelG2') {
      firebaseSet(`users/${uid}/position`, {
        timestamp: pos.timestamp,
        lat: pos.coords.latitude - (37.783780 - 33.681317), // Mojave
        lng: pos.coords.longitude - (-122.409033 - (-116.236942)) // Mojave
      });
    } else if (uid === 'EaO2LdDD1TelYHPc4N4ObbUvkw83') {
      firebaseSet(`users/${uid}/position`, {
        timestamp: pos.timestamp,
        lat: pos.coords.latitude - (pos.coords.latitude - 33.6829),
        lng: pos.coords.longitude - (pos.coords.longitude - (-116.2383))
      });
    } else {
      firebaseSet(`users/${uid}/position`, {
        timestamp: pos.timestamp,
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

  navigator.geolocation.getCurrentPosition(success, error, options);

  setInterval(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, 20000);
}

export function getGeofence(coordinates) {
  const geofences = store.getState().venue.geofences;
  const basecamp = store.getState().group.totem.coords;

  if (inFenceRadius(basecamp, coordinates)) return {
    name: 'Basecamp',
    key: 'basecamp'
  };

  for (let key in geofences) {
    const fence = geofences[key];

    if (inFenceRadius(fence, coordinates)) {
      fence.key = key;
      return { name: fence.name, key };
    }
  }

  return { name: '', key: null };
}

function inFenceRadius(fence, coordinates) {
  const degrees = getDegrees(fence.radius);
  const latDiff = Math.abs(fence.lat - coordinates.lat);
  const longDiff = Math.abs(fence.lng - coordinates.lng);

  return latDiff < degrees && longDiff < degrees;
}

function getDegrees(meters) {
  return meters / 100000;
}
