const defaults = {
  agenda: [],
  uid: null,
  name: null,
  groupId: null,
  pendingInvites: {},
  friendList: [],
  dataRetrieved: false,
  facebookUsername: null,
  facebookUID: null
};

export default function userReducer(state = defaults, action) {
  switch(action.type) {
    case 'REMOVE_AGENDA': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'ADD_AGENDA': {
      return { ...state, agenda: action.payload.agenda };
    }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
        groupId: null
      };
    case 'DATA_RETRIEVED_FROM_FIREBASE': {
      return { ...state, dataRetrieved: true };
    }
    case 'UPDATE_USER_GROUP_ID': {
      return { ...state, groupId: action.payload.id };
    }
    case 'UPDATE_FRIENDS': {
      return { ...state, friendList: action.friendList };
    }
    case 'UPDATE_GROUP_NAME': {
      return { ...state, groupName: action.payload.name }
    }
    case 'UPDATE_FB_USERNAME': {
      return { ...state, facebookUsername: action.payload.name }
    }
    case 'INITIAL_USER_DATA': {
      const newState = { ...state }
      if (action.userData.pendingInvites) {
        newState.pendingInvites = action.userData.pendingInvites
      }
      if (action.userData.friends) {
        newState.friendList = action.userData.friends
      }
      if (action.userData.agenda) {
        newState.agenda = Object.keys(action.userData.agenda)
      }
      return newState;
    }
  }
  return state;
};
