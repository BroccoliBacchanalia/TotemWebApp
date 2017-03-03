const mockVenueData = require('./mock_venue_data');

const defaults = {
  venues: mockVenueData,
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
  }
  return state;
};
