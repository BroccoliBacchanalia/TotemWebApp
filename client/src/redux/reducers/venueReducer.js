const mockVenueData = require('./mock_venue_data');
const defaults = {
  venues: mockVenueData,
  geofences: mockVenueData["-KdmcqUff2U8vDv-qfC1"].geofences,
};

export default function configReducer(state = defaults, action) {
  switch(action.type) {
    case 'UPDATE_VENUES': {
      return { ...state, venues: action.payload.venues };
    }
    case 'UPDATE_GEOFENCES':
  }
  return state;
};

function objToArray(obj) {
  const result = [];
  for (let key in obj) {
    const newObj = { ...obj[key], key: key };
    result.push(newObj);
  }
  return result;
}

function arrToObj(arr) {
  const result = {};
  for (let item of arr) {
    result[item.key] = item;
  }
  return result;
}
