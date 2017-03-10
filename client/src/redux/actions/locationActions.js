import firebase from 'firebase';
import store from '../store';
import { updateGroupMember } from './groupActions';
import { setGeofence } from './userActions';
import { firebaseOn, firebaseSet } from './firebaseActions';

//Listens to firebase for any changes in your group and returns the entire group
export function addUserListener(userId) {
  firebaseOn('/users/' + userId, (data) => {
    updateGroupMember(data, userId);
  });
};

//Grabs the location of the current user and updates firebase
export function geolocate() {
  function success(pos) {
    const uid = store.getState().user.uid;

    /********************* TESTING ONLY *********************/
    console.log(pos);
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;
    const hrLat = 37.7837693;
    const hrLng = -122.4090728;

    switch(uid) {
      case 'KrSypCuwkBdEiH2JAJgOGxZN8m52': {
        lat -= (hrLat - 33.679914); // Sahara
        lng -= (hrLng - (-116.236626)); // Sahara
        break;
      }
      case 'BSxDfzp6vwdLEP0g5xqjXpL6zDF3': {
        // lat -= (hrLat - 33.6798); // Sahara
        // lng -= (hrLng - (-116.236626)); // Sahara
        lat -= (hrLat - 33.6809343); // Heineken House
        lng -= (hrLng - (-116.238377)); // Heineken House
        break;
      }
      case 'nJU5dy4GSjgirgWMENAYeCQYMcG2': {
        lat -= (hrLat - 33.6829);
        lng -= (hrLng - (-116.2383));
        break;
      }
      default : {
        lat  -= (hrLat - 33.684409); // Coachella stage
        lng -= (hrLng - (-116.239769)); // Coachella stage
      }
    }
    /*****************************************************/

    // const lat = pos.coords.latitude; // uncoment in prod
    // const lng = pos.coords.longitude; // uncoment in prod
    const geofence = getGeofence({ lat, lng });

    firebaseSet(`users/${uid}/geofence`, geofence);
    firebaseSet(`users/${uid}/position`, {
      timestamp: pos.timestamp,
      lat,
      lng
    });
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
  }, 4000);
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
