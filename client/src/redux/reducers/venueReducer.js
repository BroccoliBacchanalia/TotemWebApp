const defaults = {
  venues: {},
  venue: {},
  geofences: {}
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
