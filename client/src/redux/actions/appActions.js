import store from '../../redux/store';

export function toggleMenu() {
  store.dispatch({
    type: 'TOGGLE_MENU',
  });
}

export function toggleDimmer() {
  store.dispatch({
    type: 'TOGGLE_DIMMER',
  });
}

export function toggleEmergencyFriends() {
  store.dispatch({
    type: 'TOGGLE_EMERGENCY_FRIENDS',
  });
}

export function toggleEmergencyServices() {
  store.dispatch({
    type: 'TOGGLE_EMERGENCY_SERVICES',
  });
}

export function toggleSpeedDial() {
  store.dispatch({
    type: 'TOGGLE_SPEED_DIAL',
  });
}