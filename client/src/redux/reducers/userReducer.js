const mockFBFriends = require('./mock_fb_friend_list');

const defaults = {
  api_url: 'http://localhost:8000',
  userId: 'aiRJiwP8s6USzeNQXKNp21Q8Hjc2',
  venueId: '',
  groupId: '',
  friendList: '',
  listOfUserAccounts: '',
  uid: null,
  name: null,
  venueId: null, //'-KdmcqUff2U8vDv-qfC1', //Outside lands
  groupId: null, //'-KdSF7i59sk07XoRgcYo', //group 'Ballers'
  pendingInvites: {
    'asdfdsaffds' : 'chuck',
    'ldkjjkflie' : 'awesomes',
  },
  fbFriends: mockFBFriends,
  dataRetrieved: false
};

export default function appReducer(state = defaults, action) {
  switch(action.type) {
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name
      };
    case 'update_userId': {
      return { ...state, uid: action.payload.id };
    }
    case 'update_venueId': {
      return { ...state, venueId: action.payload.id };
    }
    case 'update_groupId': {
      return { ...state, groupId: action.payload.id };
    }
    case 'UPDATE_FRIENDS': {
      return {...state, friendList: action.friends };
      }
  }
  return state;
};
