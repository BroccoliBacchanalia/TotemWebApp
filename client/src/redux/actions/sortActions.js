import { getGeofence } from './locationActions';
import store from '../../redux/store';

export function sortUsers(method) {
  return store.dispatch({
    type: 'USERS_SORT',
    payload: { method: sortMethods[method] }
  });
}

export const sortMethods = {
  sortAZ: function sortAZ(a, b) {
    if(a.label < b.label) return -1;
    if(a.label > b.label) return 1;
    return 0;
  },

  geofence: function sortGeofence(a, b) {
    const fenceA = getGeofence(a.position).name;
    const fenceB = getGeofence(b.position).name;

    if(fenceA < fenceB) return -1;
    if(fenceA > fenceB) return 1;
    return 0;
  },

  proximity: function sortProximity(a, b) {
    const users = store.getState().group.members;
    const uid = store.getState().user.uid;
    const userCoords = users[uid].position;
    const aDiff = getDistance(userCoords, a.position);
    const bDiff = getDistance(userCoords, b.position);

    return aDiff - bDiff;
  }
}

function getDistance(base, target) {
  return Math.abs(base.lat - target.lat)
    + Math.abs(base.lng - target.lng);
}
