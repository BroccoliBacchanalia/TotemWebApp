const defaults = {
  venues: {},
  venue: {
    address: {},
    dates: {},
    emergency: {
      operator: 7605555555
    },
    geofences: {},
    map: {},
    name: {},
    scheduleitems: []
  },
  
};

export default function configReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATE_VENUE_DATA': {
      return {
        ...state,
        venue: action.payload.venue,
        geofences: action.payload.venue.geofences
      };
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
