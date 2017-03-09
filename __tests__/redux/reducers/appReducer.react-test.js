import appReducer from '../../../client/src/redux/reducers/appReducer.js';

describe('Application State Reducer', () => {

  describe('Initial State', () => {
    test('should return the initial state', () => {
      expect(appReducer(undefined, {}))
      .toEqual({
        "active": true,
        "emergencyModal": false,
        "friendsModal": false,
        "menuItems": [
          {"label": "Map", "path": "/"},
          {"label": "Rabble", "path": "/group"},
          {"label": "Personal Agenda", "path": "/agenda"},
          {"label": "Schedule/Set List", "path": "/schedule"},
          {"label": "Emergency Info", "path": "/emergency"},
          {"label": "Choose Venue", "path": "/choosevenue"},
          {"label": "Create Group", "path": "/create"},
          {"label": "Invite Friends", "path": "/invite"}
        ], 
        "speedDial": false,
        "totemModal": false,
        "visible": false
      })
    })
  })
  describe('Toggling sidebar menu', () => {
    test('should change the "visible" state to true when false', () => {
      expect(appReducer(undefined, {type: 'OPEN_MENU'}).visible)
      .toBeTruthy();
    })
    test('should change the "visible" state to false when true', () => {
      expect(appReducer(undefined, {type: 'CLOSE_MENU'}).visible)
      .toBeFalsy();
    })
  })
  describe('Toggling emergency friends modal', () => {
    test('should change the "friendsModal" state to true false', () => {
      expect(appReducer(undefined, {type: 'TOGGLE_EMERGENCY_FRIENDS'}).friendsModal)
      .toBeTruthy();
    })
    test('should change the "friendsModal" state to false when true', () => {
      const testState = { friendsModal: true };
      expect(appReducer(testState, {type: 'TOGGLE_EMERGENCY_FRIENDS'}).friendsModal)
      .toBeFalsy();
    })
  })
  describe('Toggling emergency services modal', () => {
    test('should change the "emergencyModal" state to true when false', () => {
      expect(appReducer(undefined, {type: 'TOGGLE_EMERGENCY_SERVICES'}).emergencyModal)
      .toBeTruthy();
    })
    test('should change the "emergencyModal" state to false when true', () => {
      const testState = { emergencyModal: true };
      expect(appReducer(testState, {type: 'TOGGLE_EMERGENCY_SERVICES'}).emergencyModal)
      .toBeFalsy();
    })
  })
})