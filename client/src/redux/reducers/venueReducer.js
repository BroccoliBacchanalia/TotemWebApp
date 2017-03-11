const defaults = {
  venues: {},
  venue: {
    address: {},
    dates: {},
    emergency: {
      operator: 911
    },
    geofences: {},
    map: {},
    name: {},
    scheduleitems: []
  },
  geofences: {}
};

export default function configReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATE_VENUE_DATA': {
      const newState = { ...state };
      newState.venue = action.payload.venue;
      if (action.payload.venue.geofences) {
        newState.geofences = action.payload.venue.geofences;
      }
      return newState;
    }
    case 'UPDATE_VENUE_NAMES': {
      return {
        ...state,
        venues: action.payload.venues
      };
    }
  }

  return state;
};
