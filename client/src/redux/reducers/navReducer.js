const defaults = {
  fullMenu: false,
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

export default function navReducer(state = defaults, action) {
  switch(action.type) {
    case 'toggle_menu': {
      const hide = action.payload.hide || !state.fullMenu;
      return { ...state, fullMenu: hide };
    }
  }
  return state;
};
