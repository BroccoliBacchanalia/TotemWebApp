const mockFBFriends = require('./mock_fb_friend_list');

const defaults = {
  api_url: 'http://localhost:8000',
  uid: null,
  name: null,
  venueId: null, //'-KdmcqUff2U8vDv-qfC1', //Outside lands
  groupId: null, //'-KdSF7i59sk07XoRgcYo', //group 'Ballers'
  groupName: 'Ballers',
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
      return { ...state, venueId: action.id };
    }
    case 'UPDATE_GROUP_ID': {
      return { ...state, groupId: action.payload.id };
    }
    case 'UPDATE_FRIENDS': {
      return { ...state, friendList: action.friendList };
    }
    case 'DATA_ON_RESIGN': {
      if(action.userData.pendingInvites !== undefined) {
        return {
          ...state,
          friendList: action.userData.friends,
          pendingInvites: action.userData.pendingInvites
        };
      }
      return { ...state, friendList: action.userData.friends };
    }
    case 'UPDATE_GROUP_NAME': {
      return { ...state, groupName: action.payload.name }
    }
  }
  return state;
};
