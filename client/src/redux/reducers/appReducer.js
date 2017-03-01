const defaults = {
  visible: false,
  active: true,
  friendsModal: false,
  emergencyModal: false,
  menuItems: [
    { path: '/', label: 'Map' },
    { path: '/group', label: 'Rabble'},
    { path: '/agenda', label: 'Personal Agenda'},
    { path: '/schedule', label: 'Schedule/Set List'},
    { path: '/emergency', label: 'Emergency Info'},
    { path: '/choosevenue', label: 'Choose Venue'},
    { path: '/create', label: 'Create Group'},
    { path: '/invite', label: 'Invite Friends'},
  ]
};

export default function appReducer(state = defaults, action) {
  switch(action.type) {
    case 'TOGGLE_MENU': {
      if (!state.visible) return { ...state, visible: true };
      return { ...state, visible: false };
    }
    case 'TOGGLE_DIMMER' : {
      if (!state.active) return { ...state, active: true };
      return { ...state, active: false };
    }   
    case 'TOGGLE_EMERGENCY_FRIENDS' : {
      if (!state.friendsModal) return { ...state, friendsModal: true };
      return { ...state, friendsModal: false };
    }  
    case 'TOGGLE_EMERGENCY_SERVICES' : {
      if (!state.emergencyModal) return { ...state, emergencyModal: true };
      return { ...state, emergencyModal: false };
    }
  }
  return state;
};
