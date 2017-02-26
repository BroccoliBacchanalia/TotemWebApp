const mockVenueData = require('./mock_venue_data');
const defaults = {
  text: '',
  groupJoined: '',
  createGroup: '',
  friendsList: '',
  venues: mockVenueData
};

export default function configReducer(state = defaults, action) {
  switch(action.type) {
    case 'update_text': {
      return { ...state, text: action.payload.text };
    }
    case 'skip_venue': {
      return { ...state, venueSelected: 'skipped' };
    }
    case 'skip_create_group': {
      return { ...state, createGroup: 'skipped' };
    }
    case 'skip_group': {
      return { ...state, groupJoined: 'skipped' };
    }
  }
  return state;
};
