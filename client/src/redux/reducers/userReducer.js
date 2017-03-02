const mockFBFriends = require('./mock_fb_friend_list');

const defaults = {
  api_url: 'http://localhost:8000',
  uid: null,
  name: null,
  venueId: null, //'-KdmcqUff2U8vDv-qfC1', //Outside lands
  groupId: null, //'-KdSF7i59sk07XoRgcYo', //group 'Ballers'
  groupName: '',
  pendingInvites: {},
  friendList: mockFBFriends,
  dataRetrieved: false
};

export default function appReducer(state = defaults, action) {
  switch(action.type) {
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
        groupId: null
      };
    case 'DATA_RETRIEVED': {
      return { ...state, dataRetrieved: true };
    }
    case 'UPDATE_USER_DATA': {
      return { ...state, pendingInvites: action.pendingInvites };
    }
    case 'UPDATE_VENUE_ID': {
      return { ...state, venueId: action.payload.id };
    }
    case 'UPDATE_GROUP_ID': {
      return { ...state, groupId: action.payload.groupId };
    }
    case 'UPDATE_FRIENDS': {
      return { ...state, friendList: action.friendList };
    }
    case 'DATA_ON_RESIGN': {
      const newState = { ...state }
      if (action.userData.pendingInvites) {
        newState.pendingInvites = action.userData.pendingInvites
      }
      if (action.userData.friends) {
        newState.friendList = action.userData.friends
      }
      return newState;
    }
  }
  return state;
};
