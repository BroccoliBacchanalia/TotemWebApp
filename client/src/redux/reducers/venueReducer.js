const defaults = {
  text: '',
  selectedId: '',
  venues: [
    { id: 'osl123',
      name: 'Outside Lands Music and Art Festival',
      address: {
        line1: 'Golden Gate Park',
        line2: '',
        line3: '',
        city: 'San Francisco',
        state: 'CA',
        zip: '94122',
        country: 'USA'
      }
    },
    { id: 'coach123',
      name: 'Coachella Valley Music and Arts Festival',
      address: {
        line1: 'Empire Polo Club',
        line2: '81-800 Avenue 51',
        line3: '',
        city: 'Indio',
        state: 'CA',
        zip: '92201',
        country: 'USA'
      }
    }
  ]
};

export default function venueReducer(state = defaults, action) {
  switch(action.type) {
    case 'update_text': {
      return { ...state, text: action.payload.text };
    }
    case 'choose_venue': {
      console.log(action.payload.id);
      return { ...state, selectedId: action.payload.id };
    }
  }
  return state;
};
