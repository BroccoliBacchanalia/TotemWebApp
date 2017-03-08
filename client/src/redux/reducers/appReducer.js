const defaults = {
  visible: false,
  active: true,
  friendsModal: false,
  emergencyModal: false,
  totemModal: false,
  speedDial: false,
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
    case 'OPEN_MENU': {
      return { ...state, visible: true };
    }
    case 'CLOSE_MENU': {
      return { ...state, visible: false };
    }
    case 'TOGGLE_EMERGENCY_FRIENDS' : {
      if (!state.friendsModal) return { ...state, friendsModal: true };
      return { ...state, friendsModal: false };
    }
    case 'TOGGLE_EMERGENCY_SERVICES' : {
      if (!state.emergencyModal) return { ...state, emergencyModal: true };
      return { ...state, emergencyModal: false };
    }
    case 'TOGGLE_TOTEM_MODAL' : {
      return { ...state, totemModal: action.payload };
    }
  }
  return state;
};
