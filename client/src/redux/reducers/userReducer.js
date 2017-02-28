const mockFBFriends = require('./mock_fb_friend_list');

const defaults = {
  api_url: 'http://localhost:8000',
  uid: null,
  name: null,
  venueId: '-KdmcqUff2U8vDv-qfC1', //Outside lands //null
  groupId: '-KdSF7i59sk07XoRgcYo', //group 'Ballers' //null
  groupName: 'Ballers',
  pendingInvites: {
    '-Ke1KPMGhecHUQQFV-ko' : 'ballers',
    'ldkjjkflie' : 'awesomes',
  },
  friendList: mockFBFriends,
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
    case 'data_retreived': {
      return { ...state, dataRetrieved: true};
    }
    case 'update_user_data': {
      return { ...state, pendingInvites: action.pendingInvites };
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
