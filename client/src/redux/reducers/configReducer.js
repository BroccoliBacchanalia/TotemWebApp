const defaults = {
  text: '',
  venueSelected: '',
  groupJoined: '',
  createGroup: '',
  friendsList: '',
  group:{
    pendingInvites: {
    	'asdfdsaffds' : 'chuck'
    }
  },
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
    },
    { id: 'burn123',
      name: 'Burning Man',
      address: {
        line1: 'Black Rock Desert',
        line2: '',
        line3: '',
        city: 'Black Rock Desert',
        state: 'NV',
        zip: '',
        country: 'USA'
      }
    }
  ]
};

export default function configReducer(state = defaults, action) {
  switch(action.type) {
    case 'update_text': {
      return { ...state, text: action.payload.text };
    }
    case 'choose_group': {
      return { ...state, groupJoined: action.payload.group, venueSelected: 'groupVenue' };
    }
    case 'choose_venue': {
      return { ...state, venueSelected: action.payload.venue };
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